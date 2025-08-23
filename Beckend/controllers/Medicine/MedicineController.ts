import { Request, Response } from "express";
import Medicine, { IMedicine } from "../../Models/Medicine/ModelMedicine.js";
import mongoose from "mongoose";
import { AuthRequest } from "../../types/express.js";
import DoseLog, { IDoseLog } from "../../Models/DoseLog/DoseLog.js";
export const addMedicine = async (req: AuthRequest, res: Response) => {
  console.log("💊 req.body:", req.body);
  console.log("📷 req.file:", req.file);

  try {
    const {
      medicine,
      description,
      type,
      dosage,
      unit,
      startDate,
      endDate,
      times,
      selectedDays,
      reminderEnabled,
      reminderBefore,
      repeat,
      notes,
    } = req.body;

    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    if (!medicine || !type || !dosage || !unit || !startDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Convert types
    const parsedDosage = Number(dosage);
    const parsedReminderBefore = Number(reminderBefore) || 10;

    // Parse times safely (store as "HH:mm")
    let parsedTimes: string[] =
      typeof times === "string" ? JSON.parse(times) : (times as string[]);
    parsedTimes = parsedTimes.map((t) => {
      const d = new Date(t);
      return d.toISOString().substring(11, 16); // "HH:mm"
    });

    // Parse selectedDays safely
    let parsedDays: number[] =
      typeof selectedDays === "string"
        ? JSON.parse(selectedDays)
        : (selectedDays as number[]);

    // ✅ Optional: auto-add today if not included
    const todayDay = new Date().getDay();
    if (!parsedDays.includes(todayDay)) parsedDays.push(todayDay);

    // Convert start/end to Date objects
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : undefined;

    const reminder = reminderEnabled === "true" || reminderEnabled === true;
    const repeatFlag = repeat === "true" || repeat === true;
    const imagePath = req.file?.path;

    const newMedicine: IMedicine = new Medicine({
      name: medicine,
      description,
      type,
      dosage: parsedDosage,
      unit,
      startDate: start,  // ✅ Date object
      endDate: end,      // ✅ Date object
      times: parsedTimes,
      selectedDays: parsedDays, // ✅ includes today automatically
      reminderEnabled: reminder,
      reminderBefore: parsedReminderBefore,
      repeat: repeatFlag,
      notes,
      image: imagePath,
      userId: new mongoose.Types.ObjectId(userId),
      takenHistory: [],
    });

    await newMedicine.save();
    console.log("✅ New Medicine saved:", newMedicine);
    return res
      .status(201)
      .json({ message: "Medicine saved successfully", medicine: newMedicine });
  } catch (err) {
    console.error("💥 Backend Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


export const getTodayMedicines = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(todayStart);
    todayEnd.setHours(23, 59, 59, 999);

    // 1️⃣ Fetch medicines
    const medicines: IMedicine[] = await Medicine.find({
      userId,
      reminderEnabled: true,
      startDate: { $lte: now },
      $or: [{ endDate: { $exists: false } }, { endDate: { $gte: now } }],
    });

    // 2️⃣ Fetch all dose logs for this user
    const doseLogs = await DoseLog.find({ userId });

    const todayMedicines: any[] = [];
    const futureDoses: { med: IMedicine; doseTime: Date }[] = [];

    for (const med of medicines) {
      // Loop for next 7 days
      for (let d = 0; d < 7; d++) {
        const day = new Date(now);
        day.setDate(now.getDate() + d);

        if (!med.selectedDays.includes(day.getDay())) continue;

        for (const t of med.times) {
          const doseTime = parseTimeString(t, day);
          if (!doseTime) continue;

          const logged = doseLogs.find(
            log =>
              log.medicineId.toString() === med._id.toString() &&
              isSameTime(log.time, doseTime)
          );

          // 2a️⃣ Past doses not logged → mark as Missed
          if (!logged && doseTime < now) {
            await DoseLog.create({
              medicineId: med._id,
              userId,
              date: doseTime,
              time: doseTime,
              status: "Missed",
              taken: false,
            });
            continue; // Don't add to todayMedicines
          }

          // 2b️⃣ Today's pending doses → only if not logged
          if (!logged && doseTime >= todayStart && doseTime <= todayEnd) {
            todayMedicines.push({
              medId: med._id,
              name: med.name,
              dosage: med.dosage,
              unit: med.unit,
              status: "Pending",
              ...formatDose(doseTime),
            });
          }

          // 2c️⃣ Future doses → for nextDose calculation
          if (!logged && doseTime > now) {
            futureDoses.push({ med, doseTime });
          }
        }
      }
    }

    // 3️⃣ Compute nextDose (earliest future dose)
    futureDoses.sort((a, b) => a.doseTime.getTime() - b.doseTime.getTime());
    const nextDoseItem = futureDoses[0];
    const nextDose = nextDoseItem
      ? {
          medId: nextDoseItem.med._id,
          name: nextDoseItem.med.name,
          dosage: nextDoseItem.med.dosage,
          unit: nextDoseItem.med.unit,
          status: "Pending",
          ...formatDose(nextDoseItem.doseTime),
        }
      : null;

    return res.json({
      todayMedicines,
      nextDose,
    });

  } catch (err) {
    console.error("💥 getTodayMedicines error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

function parseTimeString(t: string, day: Date): Date | undefined {
    // t is "HH:mm", day is a Date object
    const [hours, minutes] = t.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return undefined;
    const result = new Date(day);
    result.setHours(hours, minutes, 0, 0);
    return result;
}

// Compare two dates for equality at the minute level
function isSameTime(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate() &&
        a.getHours() === b.getHours() &&
        a.getMinutes() === b.getMinutes()
    );
}

// Formats a Date object into an object with date and time strings
function formatDose(doseTime: Date) {
    return {
        date: doseTime.toISOString().substring(0, 10), // "YYYY-MM-DD"
        time: doseTime.toISOString().substring(11, 16), // "HH:mm"
    };
}
