import Medicine  from "../Models/Medicine/ModelMedicine.js";
import { extendRollingWindowForMedicine } from "../Services/scheduler.js";

export const startRollingWindowExtender = () => {
  const DAY_MS = 24 * 60 * 60 * 1000;

  const run = async () => {
    const meds = await Medicine.find({});
    for (const med of meds) {
      await extendRollingWindowForMedicine(med._id as import("mongodb").ObjectId, 14); // keep 14 days ahead
    }
  };

  run().catch(console.error);
  setInterval(() => run().catch(console.error), DAY_MS);
};
