import { IMedicine } from "../Models/Medicine/ModelMedicine.js";
import { ScheduledDose, IScheduledDose } from "../Models/SheduleDose/ScheduledDose.js";
import mongoose from "mongoose";
import Medicine from "../Models/Medicine/ModelMedicine.js";

export const generateScheduleForMedicine = async (
  med: IMedicine,
  fromDate: Date,
  toDate: Date
) => {
  const docs: Partial<IScheduledDose>[] = [];

  // Normalize startDate
  const startDate = med.startDate
    ? (typeof med.startDate === "string" ? new Date(med.startDate) : med.startDate)
    : fromDate;

  const start = new Date(Math.max(fromDate.getTime(), startDate.getTime()));

  // Normalize endDate
  const endDate = med.endDate
    ? (typeof med.endDate === "string" ? new Date(med.endDate) : med.endDate)
    : toDate;

  const end = new Date(Math.min(toDate.getTime(), endDate.getTime()));

  if (start > end) return;

  for (
    let day = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    day <= end;
    day.setDate(day.getDate() + 1)
  ) {
    const dow = day.getDay(); // 0..6
    if (!med.selectedDays.includes(dow)) continue;

    for (const t of med.times) {
      const dateTime = new Date(day);
      const [hh, mm] = t.split(":").map(Number);
      dateTime.setHours(hh ?? 0, mm ?? 0, 0, 0);

      docs.push({
        userId: med.userId as any,
        medicineId: med._id as any,
        dateTime,
        status: "Pending",
        reminderEnabled: med.reminderEnabled,
        reminderBefore: med.reminderBefore,
      });

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

  // Safely normalize startDate
  const medStartDate = med.startDate
    ? (typeof med.startDate === "string" ? new Date(med.startDate) : med.startDate)
    : now;

  const fromDate =
    maxExisting.length > 0
      ? new Date(
          new Date(maxExisting[0].dateTime).setDate(
            maxExisting[0].dateTime.getDate() + 1
          )
        )
      : new Date(Math.max(now.getTime(), medStartDate.getTime()));

  const toDate = new Date(now);
  toDate.setDate(toDate.getDate() + daysAhead);

  await generateScheduleForMedicine(med, fromDate, toDate);
};
