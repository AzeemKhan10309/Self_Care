import mongoose from "mongoose";

const EmergencyContactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  relation: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

export default mongoose.model("EmergencyContact", EmergencyContactSchema);
