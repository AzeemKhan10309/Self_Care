import mongoose from "mongoose";

const DoseLogSchema = new mongoose.Schema({
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
    required: true
  },
  dependentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dependent",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["Taken", "Missed"],
    required: true
  }
}, { timestamps: true });
export default mongoose.model("DoseLog", DoseLogSchema);
