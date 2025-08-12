import mongoose from "mongoose";
const EmergencyContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true }
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, required: true },
    emergencyContacts: [EmergencyContactSchema],
    dependents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dependent" }]
  },
  { timestamps: true }
);
export default mongoose.model("User", UserSchema);
