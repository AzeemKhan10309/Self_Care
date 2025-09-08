import mongoose, { Schema, Document } from "mongoose";

export interface IDoctorProfile extends Document {
  user: mongoose.Types.ObjectId; // Reference to User
  specialization: string;
  clinicAddress?: string;
  experienceYears?: number;
  qualifications?: string[];
}

const DoctorProfileSchema = new Schema<IDoctorProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    specialization: { type: String, required: true },
    clinicAddress: { type: String },
    experienceYears: { type: Number },
    qualifications: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IDoctorProfile>("DoctorProfile", DoctorProfileSchema);
