import { Request, Response } from "express";
import DoseLog from "../../Models/DoseLog/DoseLog.js";
import  { IMedicine } from "../../Models/Medicine/ModelMedicine.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";
import { ScheduledDose } from "../../Models/SheduleDose/ScheduledDose.js";
import { format } from "date-fns";



interface TodayMedicine {
  _id: string;
  name: string;
  dosage: number;
  unit: string;
  times: { _id: string; time: string; status: "Pending" | "Taken" | "Missed" }[];
}

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

    const existingLog = await DoseLog.findOne({
      medicineId,
      userId,
      date: doseTime,
    });

    if (existingLog) {
      return res.status(400).json({ error: "Dose already logged for this time" });
    }

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

export const getDoseLogsByDate = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: true, message: "Unauthorized" });
    }

    const { date } = req.query;
    console.log("Requested date:", date);

    if (!date) {
      return res
        .status(400)
        .json({ error: true, message: "Date is required (YYYY-MM-DD)" });
    }

    // Build start & end of day in local server time
    const startOfDay = new Date(date as string);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date as string);
    endOfDay.setHours(23, 59, 59, 999);

    console.log("Query range:", startOfDay.toISOString(), endOfDay.toISOString());

    // Fetch logs
    const logs = await DoseLog.find({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    })
      .populate<{ medicineId: IMedicine }>(
        "medicineId",
        "name description type dosage unit"
      )
      .sort({ time: 1 });

    // Format logs for frontend
    const formattedLogs = logs.map((log) => ({
      _id: log._id,
      time: log.time,
      status: log.taken ? "Taken" : "Missed",
      medicineId: log.medicineId,
      quantity: log.medicineId?.dosage || 0,
    }));

    console.log("Fetched dose logs:", formattedLogs);
    return res.json(formattedLogs);
  } catch (err: any) {
    console.error("Error fetching dose logs:", err.message, err.stack);
    // Always return an array so frontend doesn't crash
    return res.status(500).json([]);
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
    ).populate("medicineId");

    if (!updated) return res.status(404).json({ error: "Dose not found" });

    const doseDate = new Date(updated.dateTime);
    const dateOnly = new Date(doseDate.toISOString().split("T")[0]); 
    const timeOnly = doseDate; 

    await DoseLog.findOneAndUpdate(
      { medicineId: updated.medicineId, time: timeOnly, userId: updated.userId },
      {
        medicineId: updated.medicineId,
        userId: updated.userId,
        date: dateOnly,
        time: timeOnly,
        taken: true,
      },
      { upsert: true, new: true }
    );

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
    ).populate("medicineId");

    if (!updated) return res.status(404).json({ error: "Dose not found" });

    const doseDate = new Date(updated.dateTime);
    const dateOnly = new Date(doseDate.toISOString().split("T")[0]);
    const timeOnly = doseDate;

    await DoseLog.findOneAndUpdate(
      { medicineId: updated.medicineId, time: timeOnly, userId: updated.userId },
      {
        medicineId: updated.medicineId,
        userId: updated.userId,
        date: dateOnly,
        time: timeOnly,
        taken: false,
      },
      { upsert: true, new: true }
    );

    res.json({ dose: updated });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/*
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
const todayDoses: TodayMedicine[] = (doses ?? []).map((dose: any) => ({
  _id: dose._id,
  name: dose.medicineId?.name,
  dosage: dose.medicineId?.dosage,
  unit: dose.medicineId?.unit,
  times: [
    {
      time: formatTime(dose.dateTime),
      status: dose.status || "Pending",
    },
  ],
}));



    res.json({ todayDoses });
  } catch (err) {
    console.error("Error fetching today doses:", err);
    res.status(500).json({ error: "Server error" });
  }
};
*/
export const getTodayDoses = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: true, message: "Unauthorized" });

    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const todayEnd = new Date(now.setHours(23, 59, 59, 999));

    const doses = await ScheduledDose.find({
      userId,
      dateTime: { $gte: todayStart, $lte: todayEnd },
      status: "Pending",
    })
      .populate("medicineId", "name dosage unit")
      .lean();

    const todayDosesMap = new Map<string, TodayMedicine>();

    doses.forEach((dose: any) => {
      const med = dose.medicineId as {
        _id: string;
        name: string;
        dosage: number;
        unit: string;
      };
      if (!med) return;

      const medId = med._id.toString();
      if (!todayDosesMap.has(medId)) {
        todayDosesMap.set(medId, {
          _id: medId,
          name: med.name,
          dosage: med.dosage,
          unit: med.unit,
          times: [],
        });
      }

      todayDosesMap.get(medId)?.times.push({
        _id: dose._id.toString(),
        time: format(new Date(dose.dateTime), "hh:mm a"),
        status: dose.status || "Pending",
      });
    });

    const todayDoses = Array.from(todayDosesMap.values());
    todayDoses.forEach(med => {
      med.times.sort(
        (a, b) =>
          new Date(`1970-01-01 ${a.time}`).getTime() - new Date(`1970-01-01 ${b.time}`).getTime()
      );
    });

    const next = await ScheduledDose.findOne({
      userId,
      dateTime: { $gte: new Date() },
      status: "Pending",
    })
      .sort({ dateTime: 1 })
      .populate("medicineId", "name dosage unit")
      .lean();

    const nextDose = next
      ? {
          _id: next._id,
          time: format(new Date(next.dateTime), "hh:mm a"),
          medicine: next.medicineId
            ? {
                name: (next.medicineId as any).name,
                dosage: (next.medicineId as any).dosage,
                unit: (next.medicineId as any).unit,
              }
            : null,
        }
      : null;

    res.json({ todayDoses, nextDose });
  } catch (err: any) {
    console.error("Error fetching doses:", err.message, err.stack);
    res.status(500).json({ error: true, message: "Server error" });
  }
};

/*
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
      ) 
      .lean();

    if (!next) return res.json({ nextDose: null });

    const med = next.medicineId as unknown as IMedicine; 

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
}; */
