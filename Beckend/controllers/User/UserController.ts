import type { Request, Response } from "express";
import type { IUser } from "../../Models/User/UserModel.ts";
import User from "../../Models/User/UserModel.js";
import { generateToken } from "../../utils/apiResponse.js";
import mongoose from "mongoose";
import { AuthRequest } from "../../middleware/authMiddleware.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const checkUsername = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    if (!username) return res.status(400).json({ error: true, message: "Username is required" });

    const user = await User.findOne({ username });
    if (!user) return res.json({ available: true });

    const suggestions = [
      username + Math.floor(Math.random() * 100),
      username + "_user",
      username + "123",
    ];

    return res.json({ available: false, suggestions });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return res.status(500).json({ error: true, message });
  }
};

export const register = async (req: Request, res: Response) => {
    console.log("Register request body:", req.body);
  try {
    const { name, username, email, password, phone, collectInfo } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const existingUser = await User.findOne<IUser>({ username });
    if (existingUser) return res.status(400).json({ error: true, message: "Username already taken" });

    const user = new User({
      name,
      username,
      email,
      password,
      phone,
      ...collectInfo,
    });

    await user.save();

    const token = generateToken((user._id as mongoose.Types.ObjectId).toString());

    res.status(201).json({ user, token });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    res.status(500).json({ error: true, message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
        console.log("Login request body:", req.body); 

    const { email, password } = req.body;

    const user = await User.findOne<IUser>({ email });
    if (!user) return res.status(400).json({ error: true, message: "Invalid credentials" });


    const token = generateToken((user._id as mongoose.Types.ObjectId).toString());

    res.json({ user, token });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    res.status(500).json({ error: true, message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: true, message: "User not found" });
    res.json({ user });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return res.status(500).json({ error: true, message });
  }
};
interface UpdateUserBody {
  dob?: string;
  email?: string;
  height?: string;
  location?: string;
  name?: string;
  phone?: string;
  weight?: string;
  profileImage?: string;
}

export const updateUser = async (
  req: Request<{ id: string }, any, UpdateUserBody>, 
  res: Response
) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ error: "User ID missing" });

    const { dob, email, height, location, name, phone, weight } = req.body;

    const updateData: Partial<UpdateUserBody> = {};

    if (dob) updateData.dob = new Date(dob).toISOString();
    if (email) updateData.email = email;
    if (height) updateData.height = height;
    if (location) updateData.location = location;
    if (name) updateData.name = name.trim();
    if (phone) updateData.phone = phone;
    if (weight) updateData.weight = weight;

    if (req.file) {
      updateData.profileImage = `${req.protocol}://${req.get("host")}/uploads/profile_images/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const sendOtpForPasswordReset = async (req: Request, res: Response) => {
  try {
    console.log("📩 Send OTP request body:", req.body);
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset OTP",
        html: `<p>Your OTP is <b>${otp}</b> (valid for 10 minutes).</p>`,
      });
      console.log(`✅ OTP email sent to ${email}`);
      return res.status(200).json({ message: "OTP sent to your email" });
    } catch (mailError: any) {
      console.error("❌ Email sending failed:", mailError.message);
      return res.status(500).json({ message: "Failed to send email" });
    }
  } catch (error: any) {
    console.error("❌ Server error in sendOtpForPasswordReset:", error.message);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
      resetOtp: otp,
      resetOtpExpire: { $gt: new Date() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPasswordWithOtp = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;

    console.log("Incoming password reset request:", {
      email,
      newPassword: newPassword ? "****" : null,
    });

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save({ validateBeforeSave: false });

    console.log("✅ Password updated successfully for:", email);
    res.json({ success: true, message: "Password updated successfully" });
  } catch (error: any) {
    console.error("resetPassword Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



