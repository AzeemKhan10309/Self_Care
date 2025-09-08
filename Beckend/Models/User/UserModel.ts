import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
  dob?: Date;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  profileImage?: string;
  resetOtp?: string;
  resetOtpExpire?: Date;

  role: "user" | "doctor" | "trainer" | "admin";
  approved: boolean;
  assignedDoctor?: mongoose.Types.ObjectId;
  assignedTrainer?: mongoose.Types.ObjectId;

  comparePassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    dob: { type: Date },
    age: { type: Number },
    gender: { type: String },
    weight: { type: Number },
    height: { type: Number },
    profileImage: { type: String },

    resetOtp: { type: String },
    resetOtpExpire: { type: Date },

    role: {
      type: String,
      enum: ["user", "doctor", "trainer", "admin"],
      default: "user",
    },
    approved: { type: Boolean, default: false },

    assignedDoctor: { type: Schema.Types.ObjectId, ref: "User" },
    assignedTrainer: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
