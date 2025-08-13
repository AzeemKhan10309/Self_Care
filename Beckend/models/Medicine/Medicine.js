import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dose: { type: String, required: true },
  timing: { type: String, required: true },
  repeatPattern: {
    type: String,
    enum: ["daily", "weekly", "alternate"],
    required: true
  },
  dependentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dependent",
    required: true
  }
}, { timestamps: true }); 

export default mongoose.model("Medicine", MedicineSchema);
