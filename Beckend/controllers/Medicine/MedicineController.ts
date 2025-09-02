import { Request, Response } from "express";
import Medicine,{IMedicine} from "../../Models/Medicine/ModelMedicine.js";
import mongoose from "mongoose";
import { AuthRequest } from "../../types/express.js";
import { ScheduledDose } from "../../Models/SheduleDose/ScheduledDose.js";
import { generateScheduleForMedicine, recomputeFutureSchedule } from "../../Services/scheduler.js";
const ROLLING_DAYS = 7;


export const updateMedicine = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const med = await Medicine.findByIdAndUpdate(id, req.body, { new: true });
    if (!med) return res.status(404).json({ error: "Medicine not found" });

    await recomputeFutureSchedule(new mongoose.Types.ObjectId(id), ROLLING_DAYS);

    res.json({ medicine: med });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await Medicine.findByIdAndDelete(id);
    await ScheduledDose.deleteMany({ medicineId: id });

    res.json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


export const addMedicine = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    let selectedDaysArray: number[] = [];
    if (req.body.selectedDays) {
      selectedDaysArray =
        typeof req.body.selectedDays === "string"
          ? JSON.parse(req.body.selectedDays)
          : req.body.selectedDays;
      selectedDaysArray = selectedDaysArray.map(Number);
    }

    let timesArray: string[] = [];
    if (req.body.times) {
      const rawTimes =
        typeof req.body.times === "string" ? JSON.parse(req.body.times) : req.body.times;

      timesArray = rawTimes.map((t: string) => {
        const date = new Date(t);
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
      });
    }

    const medData: Partial<IMedicine> = {
      ...req.body,
      userId: new mongoose.Types.ObjectId(userId),
      selectedDays: selectedDaysArray,
      times: timesArray,
    };

    const med = await Medicine.create(medData);

    const from = new Date();
    const to = new Date();
    to.setDate(to.getDate() + ROLLING_DAYS);

    const createdDoses = await generateScheduleForMedicine(med, from, to);


    res.status(201).json({ medicine: med, scheduledDoses: createdDoses.length });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



export const getallmedicinebyid = async (req: Request, res: Response) => {
  try {
    const { ownerType, ownerId, medicineId } = req.query;

    if (!ownerType || !ownerId || !medicineId) {
      return res.status(400).json({ error: "Missing ownerType, ownerId, or medicineId" });
    }

    let medicine;

    if (ownerType === "user") {
      medicine = await Medicine.findOne({ _id: medicineId, userId: ownerId });
    } else if (ownerType === "dependent") {
      medicine = await Medicine.findOne({ _id: medicineId, dependentId: ownerId });
    } else {
      return res.status(400).json({ error: "Invalid owner type" });
    }

    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.status(200).json({ medicine });
  } catch (error) {
    console.error("Error fetching medicine:", error);
    res.status(500).json({ error: "Server error" });
  }
};


