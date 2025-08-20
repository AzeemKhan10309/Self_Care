import mongoose from "mongoose";
import Dependent from "../../models/Dependent/Dependent.js";


const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },

    type: { type: String, required: true },
    dosage: { type: Number, required: true },
    unit: { type: String, required: true },

    startDate: { type: Date, required: true },
    endDate: { type: Date },

    times: [{ type: String, required: true }],
    frequency: { type: Number },
    days: [{ type: String }],

    reminderEnabled: { type: Boolean, default: true },
    reminderBefore: { type: Number, default: 10 },
    repeat: { type: Boolean, default: true },

    notes: { type: String },
    image: { type: String },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dependentId: { type: mongoose.Schema.Types.ObjectId, ref: "Dependent", required: false },

    takenHistory: [
      {
        date: { type: Date },
        status: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;   // ✅ Proper ESM export
