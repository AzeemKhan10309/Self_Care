import { IMedicine } from "../Models/Medicine/ModelMedicine.js";
import { ScheduledDose, IScheduledDose } from "../Models/SheduleDose/ScheduledDose.js";
import mongoose from "mongoose";
import Medicine from "../Models/Medicine/ModelMedicine.js";

export const generateScheduleForMedicine = async (
  med: IMedicine,
  fromDate: Date,
  toDate: Date
) => {
  const doses: Partial<IScheduledDose>[] = [];

  const startDate = med.startDate
    ? (typeof med.startDate === "string" ? new Date(med.startDate) : med.startDate)
    : fromDate;

  const start = new Date(Math.max(fromDate.getTime(), startDate.getTime()));

  const endDate = med.endDate
    ? (typeof med.endDate === "string" ? new Date(med.endDate) : med.endDate)
    : toDate;

  const end = new Date(Math.min(toDate.getTime(), endDate.getTime()));

  if (start > end) return [];

  for (
    let day = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    day <= end;
    day.setDate(day.getDate() + 1)
  ) {
    const dow = day.getDay();
    if (!med.selectedDays.includes(dow)) continue;

    for (const t of med.times) {
      const dateTime = new Date(day);
      const [hh, mm] = t.split(":").map(Number);
      dateTime.setHours(hh ?? 0, mm ?? 0, 0, 0);

      doses.push({
        userId: med.userId as any,
        medicineId: med._id as any,
        dateTime,
        status: "Pending",
        reminderEnabled: med.reminderEnabled,
        reminderBefore: med.reminderBefore,
      });

      console.log("Generated dose:", dateTime.toString(), "for medicine:", med.name);
    }
  }

  if (doses.length > 0) {
    await ScheduledDose.insertMany(doses, { ordered: false });
  }

  return doses;
};

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

// Extend rolling window for medicine
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

  const medStartDate = med.startDate
    ? (typeof med.startDate === "string" ? new Date(med.startDate) : med.startDate)
    : now;

  const fromDate =
    maxExisting.length > 0
      ? new Date(maxExisting[0].dateTime.getTime() + 24 * 60 * 60 * 1000)
      : new Date(Math.max(now.getTime(), medStartDate.getTime()));

  const toDate = new Date(now);
  toDate.setDate(toDate.getDate() + daysAhead);

  await generateScheduleForMedicine(med, fromDate, toDate);
};
