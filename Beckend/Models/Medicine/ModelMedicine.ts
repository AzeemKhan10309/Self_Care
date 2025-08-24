import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMedicine extends Document {
  userId: mongoose.Types.ObjectId;
  dependentId?: mongoose.Types.ObjectId;

  name: string;
  description?: string;
  type: "Tablet" | "Syrup" | "Injection" | "Drop";
  dosage: number;
  unit: string;

  startDate: Date;
  endDate: Date;

  times: string[];          // e.g. ["08:00 AM", "08:00 PM"]
  selectedDays: number[];   // e.g. [1,2,3,4,5] => Mon-Fri

  reminderEnabled: boolean;
  reminderBefore: number;   // in minutes
  repeat: boolean;

  notes?: string;
  image?: string;

  takenHistory: {
    date: Date;
    status: boolean;
  }[];

  createdAt?: Date;
  updatedAt?: Date;
}

const MedicineSchema = new Schema<IMedicine>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dependentId: { type: Schema.Types.ObjectId, ref: "Dependent" },

    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ["Tablet", "Syrup", "Injection", "Drop"], required: true },
    dosage: { type: Number, required: true },
    unit: { type: String, required: true },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    times: { type: [String], required: true },
    selectedDays: { type: [Number], required: true },

    reminderEnabled: { type: Boolean, default: true },
    reminderBefore: { type: Number, default: 10 },
    repeat: { type: Boolean, default: true },

    notes: { type: String },
    image: { type: String },

    takenHistory: [
      {
        date: { type: Date, required: true },
        status: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

// Index for fast queries (by user + date range)
MedicineSchema.index({ userId: 1, startDate: 1, endDate: 1 });

const Medicine: Model<IMedicine> = mongoose.model<IMedicine>("Medicine", MedicineSchema);
export default Medicine;
