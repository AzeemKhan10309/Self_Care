import mongoose from "mongoose";

const DoseLogSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ["Taken", "Missed"],
    default: "Missed",
  },
  time: { type: Date, required: true },
});

export default mongoose.model("DoseLog", DoseLogSchema);
