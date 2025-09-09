import type { Request, Response } from "express";
import User from "../../Models/User/UserModel.js";

import { Types } from "mongoose";


export const approveUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "doctor" || user.role === "trainer") {
      user.approved = true;
      await user.save();
      return res.json({ message: "User approved successfully", user });
    } else {
      return res.status(400).json({ message: "Only doctors/trainers need approval" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};

export const assignDoctorOrTrainer = async (req: Request, res: Response) => {
  try {
    const { userId, doctorId, trainerId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (doctorId) {
      const doctor = await User.findById(doctorId);
      if (!doctor || doctor.role !== "doctor" || !doctor.approved) {
        return res.status(400).json({ message: "Invalid or unapproved doctor" });
      }
      user.assignedDoctor = doctor._id as Types.ObjectId;
    }

    if (trainerId) {
      const trainer = await User.findById(trainerId);
      if (!trainer || trainer.role !== "trainer" || !trainer.approved) {
        return res.status(400).json({ message: "Invalid or unapproved trainer" });
      }
      user.assignedTrainer = trainer._id as Types.ObjectId;
    }

    await user.save();
    return res.json({ message: "Assignments updated successfully", user });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};

