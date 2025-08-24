import mongoose, { Schema, Document } from "mongoose";

export type DoseStatus = "Pending" | "Taken" | "Missed";

export interface IScheduledDose extends Document {
  userId: mongoose.Types.ObjectId;
  medicineId: mongoose.Types.ObjectId;
  dateTime: Date;                
  status: DoseStatus;             
  reminderEnabled: boolean;
  reminderBefore: number;         
}

const ScheduledDoseSchema = new Schema<IScheduledDose>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    medicineId: { type: Schema.Types.ObjectId, ref: "Medicine", required: true },
    dateTime: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Taken", "Missed"], default: "Pending" },
    reminderEnabled: { type: Boolean, default: true },
    reminderBefore: { type: Number, default: 10 },
  },
  { timestamps: true }
);

ScheduledDoseSchema.index({ userId: 1, dateTime: 1, status: 1 });
ScheduledDoseSchema.index({ medicineId: 1, dateTime: 1, status: 1 });

export const ScheduledDose = mongoose.model<IScheduledDose>(
  "ScheduledDose",
  ScheduledDoseSchema
);
