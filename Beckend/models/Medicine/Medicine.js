import mongoose from "mongoose";


const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },

  type: { type: String, enum: ["Tablet", "Syrup", "Injection", "Drop"], required: true },
    dosage: { type: Number, required: true },
    unit: { type: String, required: true },

    startDate: { type: Date, required: true },
    endDate: { type: Date },

    times: [Date],
selectedDays: {
  type: [Number], 
  default: []
},
    reminderEnabled: { type: Boolean, default: true },
    reminderBefore: { type: Number, default: 10 },
    repeat: { type: Boolean, default: true },

    notes: { type: String },
    image: { type: String },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dependentId: { type: mongoose.Schema.Types.ObjectId, ref: "Dependent", required: false },

    takenHistory: [
      {
        date: { type: Date },
        status: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Medicine", medicineSchema);