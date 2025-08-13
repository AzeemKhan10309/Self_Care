import mongoose from "mongoose";
const EmergencyContactSchema = new mongoose.Schema({
  name: { type: String, required: false },
  phoneNumber: { type: String, required: false },
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    emergencyContacts: [EmergencyContactSchema],
    dependents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dependent" }]
  },
  { timestamps: true }
);
export default mongoose.model("User", UserSchema);
