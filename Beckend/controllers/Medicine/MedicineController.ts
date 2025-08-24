import { Request, Response } from "express";
import Medicine, { IMedicine } from "../../Models/Medicine/ModelMedicine.js";
import mongoose from "mongoose";
import { AuthRequest } from "../../types/express.js";
import { ScheduledDose } from "../../Models/SheduleDose/ScheduledDose.js";
import { generateScheduleForMedicine, recomputeFutureSchedule } from "../../Services/scheduler.js";
const ROLLING_DAYS = 14;


export const updateMedicine = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const med = await Medicine.findByIdAndUpdate(id, req.body, { new: true });
    if (!med) return res.status(404).json({ error: "Medicine not found" });

    // Recompute future schedule window
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
  console.log("💊 req.body:", req.body);
  console.log("📷 req.file:", req.file);

  try {
    const userId = (req as any).user?._id; // from your Auth middleware
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const med = await Medicine.create({ ...req.body, userId });

    // Pre-generate doses for next 14 days (or until med.endDate)
    const from = new Date();
    const to = new Date();
    to.setDate(to.getDate() + ROLLING_DAYS);
    await generateScheduleForMedicine(med, from, to);

    res.status(201).json({ medicine: med });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


export const getallmedicinebyid = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ error: "User ID missing" });

    const medicines = await Medicine.find({ userId });
    res.status(200).json({ medicines });
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res.status(500).json({ error: "Server error" });
  }
};

