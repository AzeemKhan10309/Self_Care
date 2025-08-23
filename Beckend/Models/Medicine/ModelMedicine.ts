import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IMedicine extends Document {
 _id: Types.ObjectId | string;
  name: string;
  description?: string;
  type: "Tablet" | "Syrup" | "Injection" | "Drop";
  dosage: number;
  unit: string;
  startDate: string;
  endDate?: string; 
  times: string[]; 
  selectedDays: number[];
  reminderEnabled: boolean;
  reminderBefore: number;
  repeat: boolean;
  notes?: string;
  image?: string;
  userId: mongoose.Schema.Types.ObjectId;
  dependentId?: mongoose.Schema.Types.ObjectId;
  takenHistory: {
    date?: string;
    status: boolean;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const medicineSchema: Schema<IMedicine> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ["Tablet", "Syrup", "Injection", "Drop"], required: true },
    dosage: { type: Number, required: true },
    unit: { type: String, required: true },
    startDate: { type: String, required: true }, 
    endDate: { type: String },
    times: [{ type: String }], 
    selectedDays: { type: [Number], default: [] },
    reminderEnabled: { type: Boolean, default: true },
    reminderBefore: { type: Number, default: 10 },
    repeat: { type: Boolean, default: true },
    notes: { type: String },
    image: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dependentId: { type: Schema.Types.ObjectId, ref: "Dependent" },
    takenHistory: [
      {
        date: { type: String }, 
        status: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Medicine: Model<IMedicine> = mongoose.model<IMedicine>("Medicine", medicineSchema);

export default Medicine;
