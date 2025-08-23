import mongoose, { Document, Schema } from "mongoose";

export interface IDoseLog extends Document {
  medicineId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  dependentId?: mongoose.Types.ObjectId;
  date: Date;
  status: "Taken" | "Missed";
  time: Date;
   taken: boolean;
}

const DoseLogSchema: Schema<IDoseLog> = new mongoose.Schema(
  {
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dependentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    date: { type: Date, required: true },
      taken: { type: Boolean, default: false },
    time: { type: Date, required: true },
  },
  { timestamps: true }
);

const DoseLog = mongoose.model<IDoseLog>("DoseLog", DoseLogSchema);
export default DoseLog;
