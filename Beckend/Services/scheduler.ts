import { IMedicine } from "../Models/Medicine/ModelMedicine.js";
import { ScheduledDose, IScheduledDose } from "../Models/SheduleDose/ScheduledDose.js";
import mongoose from "mongoose";
import Medicine from "../Models/Medicine/ModelMedicine.js";


export async function generateScheduleForMedicine(medicine: any, fromDate: Date, toDate: Date) {
  const { startDate, endDate, times, selectedDays } = medicine;
  const doses: any[] = [];

  let current = new Date(Math.max(new Date(startDate).getTime(), fromDate.getTime()));
  const end = new Date(Math.min(new Date(endDate).getTime(), toDate.getTime()));

  current.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  while (current <= end) {
    const dow = current.getDay();
    if (!selectedDays.includes(dow)) {
      current.setDate(current.getDate() + 1);
      continue;
    }

   for (const time of times) {
  const [hours, minutes] = time.split(":").map(Number);
  const doseDate = new Date(current);
  doseDate.setHours(hours, minutes, 0, 0);

  doses.push({
    userId: medicine.userId,
    medicineId: medicine._id,
    dateTime: doseDate,
    status: "Pending",
    reminderEnabled: medicine.reminderEnabled,
    reminderBefore: medicine.reminderBefore,
  });

  console.log("Generated dose:", doseDate.toString(), "for medicine:", medicine.name); // ✅ inside loop
}


    current.setDate(current.getDate() + 1);
  }

  if (doses.length > 0) {
    await ScheduledDose.insertMany(doses, { ordered: false });
  }

  return doses;
}


export const recomputeFutureSchedule = async (
  medicineId: mongoose.Types.ObjectId,
  rollingDays = 14
) => {
  const med = await Medicine.findById(medicineId);
  if (!med) return;

  const now = new Date();

  await ScheduledDose.deleteMany({
    medicineId: med._id,
    status: "Pending",
    dateTime: { $gte: now },
  });

  const toDate = new Date(now);
  toDate.setDate(toDate.getDate() + rollingDays);

  await generateScheduleForMedicine(med, now, toDate);
};

export const extendRollingWindowForMedicine = async (
  medicineId: mongoose.Types.ObjectId,
  daysAhead = 14
) => {
  const med = await Medicine.findById(medicineId);
  if (!med) return;

  const now = new Date();
  const maxExisting = await ScheduledDose
    .find({ medicineId: med._id })
    .sort({ dateTime: -1 })
    .limit(1);

  const fromDate =
    maxExisting.length > 0
      ? new Date(new Date(maxExisting[0].dateTime).setDate(maxExisting[0].dateTime.getDate() + 1))
      : new Date(Math.max(now.getTime(), med.startDate.getTime()));

  const toDate = new Date(now);
  toDate.setDate(toDate.getDate() + daysAhead);

  await generateScheduleForMedicine(med, fromDate, toDate);
};
