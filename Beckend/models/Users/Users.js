import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, default: null },
    gender: { type: String, enum: ["male", "female", "other"], default: null },
    weight: { type: Number, default: null },
    height: { type: Number, default: null },
    dob: { type: Date, default: null },
    isProfileComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
