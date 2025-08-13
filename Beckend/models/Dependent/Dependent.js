import mongoose from "mongoose";

const DependentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  relation: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model("Dependent", DependentSchema);