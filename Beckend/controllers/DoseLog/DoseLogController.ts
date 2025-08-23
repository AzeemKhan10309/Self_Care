import { Request, Response } from "express";
import DoseLog from "../../Models/DoseLog/DoseLog.js";
import Medicine from "../../Models/Medicine/ModelMedicine.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";
import mongoose from "mongoose";

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


