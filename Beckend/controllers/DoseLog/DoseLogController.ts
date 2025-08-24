import { Request, Response } from "express";
import DoseLog from "../../Models/DoseLog/DoseLog.js";
import Medicine, { IMedicine } from "../../Models/Medicine/ModelMedicine.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";
import { ScheduledDose } from "../../Models/SheduleDose/ScheduledDose.js";


const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};


export const createDoseLog = async (req: AuthRequest, res: Response) => {
  try {
    const { medicineId, dependentId, status, time } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }
    const userId = req.user._id;

    if (!time) return res.status(400).json({ error: "Time is required" });

    // Parse "HH:mm AM/PM" or "HH:mm" into Date
    const now = new Date();
    const timeParts = time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)?/i);
    if (!timeParts) return res.status(400).json({ error: "Invalid time format" });

    let hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    const meridiem = timeParts[3]?.toUpperCase();

    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    const doseTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      0,
      0
    );

    // 1️⃣ Check for existing log at same time
    const existingLog = await DoseLog.findOne({
      medicineId,
      userId,
      date: doseTime,
    });

    if (existingLog) {
      return res.status(400).json({ error: "Dose already logged for this time" });
    }

    // 2️⃣ Create new dose log
    const doseLog = await DoseLog.create({
      medicineId,
      userId,
      dependentId: dependentId || null,
      date: doseTime,
      time: doseTime,
      taken: status === "Taken",
    });

    return res.status(201).json(doseLog);
  } catch (err) {
    console.error("💥 Error creating dose log:", err);
    return res.status(500).json({ error: "Failed to create dose log" });
  }
};



export const markDoseTaken = async (req: Request, res: Response) => {
  try {

    const id = req.params.id;
    console.log("Marking dose as taken:", id);
    const updated = await ScheduledDose.findByIdAndUpdate(
      id,
      { status: "Taken" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Dose not found" });
    res.json({ dose: updated });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const markDoseMissed = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Marking dose as missed:", id);
    const updated = await ScheduledDose.findByIdAndUpdate(
      id,
      { status: "Missed" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Dose not found" });
    res.json({ dose: updated });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

import { format } from "date-fns";

export const getTodayDoses = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const today = new Date();
    const todayStart = new Date(today.setHours(0, 0, 0, 0));
    const todayEnd = new Date(today.setHours(23, 59, 59, 999));

const doses = await ScheduledDose.find({
  userId,
  dateTime: { $gte: todayStart, $lte: todayEnd },
  status: "Pending",
}).populate("medicineId", "name type dosage unit");
    // Map response
   const todayDoses = doses.map((dose) => {
  const med: any = dose.medicineId;
  return {
    _id: dose._id, // scheduled dose id
    name: med.name,
    dosage: med.dosage,
    unit: med.unit,
    times: [
      { 
        time: formatTime(dose.dateTime), // scheduled dose time
        status: dose.status,             // <-- use actual status
      }
    ],
  };
});

    res.json({ todayDoses });
  } catch (err) {
    console.error("Error fetching today doses:", err);
    res.status(500).json({ error: "Server error" });
  }
};




export const getNextDose = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?._id;
    console.log("Fetching next dose for user:", userId);

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const now = new Date();

    const next = await ScheduledDose.findOne({
      userId,
      dateTime: { $gte: now },
      status: "Pending",
    })
      .sort({ dateTime: 1 })
      .populate<{ medicineId: IMedicine }>(
        "medicineId",
        "name dosage unit type description"
      ) // 👈 tell TS: medicineId is IMedicine
      .lean();

    if (!next) return res.json({ nextDose: null });

    const med = next.medicineId as unknown as IMedicine; // 👈 safely cast

    const formatted = {
      _id: next._id,
      dateTime: next.dateTime,
      formattedTime: format(new Date(next.dateTime), "hh:mm a"),
      status: next.status,
      reminderBefore: next.reminderBefore,
      reminderEnabled: next.reminderEnabled,
      medicine: med
        ? {
            id: med._id,
            name: med.name,
            dosage: med.dosage,
            unit: med.unit,
            type: med.type,
            description: med.description,
          }
        : null,
    };

    res.json({ nextDose: formatted });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
