import mongoose, { Schema, Document } from "mongoose";

export interface ITrainerProfile extends Document {
  user: mongoose.Types.ObjectId; 
  expertise: string;
  certification?: string;
  gymAddress?: string;
  experienceYears?: number;
}

const TrainerProfileSchema = new Schema<ITrainerProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    expertise: { type: String, required: true },
    certification: { type: String },
    gymAddress: { type: String },
    experienceYears: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model<ITrainerProfile>("TrainerProfile", TrainerProfileSchema);
