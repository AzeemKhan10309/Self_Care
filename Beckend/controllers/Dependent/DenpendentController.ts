import { Request, Response } from "express";
import Dependent from "../../Models/Dependent/DependentModel.js";
import User from "../../Models/User/UserModel.js";
import { Types } from "mongoose";
import Medicine from "../../Models/Medicine/ModelMedicine.js";
export const createDependent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, name, relation, age } = req.body as {
      userId: string;
      name: string;
      relation: string;
      age: number;
    };

    if (!Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Invalid userId" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const picture = req.file ? `/uploads/${req.file.filename}` : undefined;

    const dependent = new Dependent({
      userId,
      name,
      relation,
      age,
      picture,
    });

    await dependent.save();
    res.status(201).json(dependent);
  } catch (error: any) {
console.error("❌ Dependent creation error:", error.message);
  res.status(500).json({ message: error.message || "Something went wrong" });
}  
};

export const updateDependent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid dependent id" });
      return;
    }

    if (req.file) {
      updates.picture = `/uploads/${req.file.filename}`;
    }

    const dependent = await Dependent.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!dependent) {
      res.status(404).json({ message: "Dependent not found" });
      return;
    }

    res.status(200).json(dependent);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserDependents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Invalid userId" });
      return;
    }

    const dependents = await Dependent.find({ userId }).populate("userId", "name email");
    res.status(200).json(dependents);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDependentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid dependent id" });
    }

    const dependent = await Dependent.findById(id).populate("userId", "name email");
    if (!dependent) {
      return res.status(404).json({ message: "Dependent not found" });
    }

    const medicines = await Medicine.find({ dependentId: id });

    res.status(200).json({
      ...dependent.toObject(),
      medicines, 
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteDependent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid dependent id" });
      return;
    }

    const dependent = await Dependent.findByIdAndDelete(id);

    if (!dependent) {
      res.status(404).json({ message: "Dependent not found" });
      return;
    }

    res.status(200).json({ message: "Dependent deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};