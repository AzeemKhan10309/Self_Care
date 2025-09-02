import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDependent extends Document {
  userId: Types.ObjectId;
  name: string;
  relation: "Father" | "Mother" | "Son" | "Daughter" | "Spouse" | "Other";
  age: number;
  picture?: string; 
  createdAt: Date;
  updatedAt: Date;
}

const DependentSchema = new Schema<IDependent>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    relation: {
      type: String,
      required: true,
      enum: ["Father", "Mother", "Son", "Daughter", "Spouse", "Other"],
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120,
    },
    picture: {
      type: String,
      trim: true,
      default: "https://yourapp.com/default-avatar.png", 
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

DependentSchema.index({ userId: 1, name: 1 }, { unique: true });

const Dependent = mongoose.model<IDependent>("Dependent", DependentSchema);
export default Dependent;
