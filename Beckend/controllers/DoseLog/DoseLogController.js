import DoseLog from "../../models/DoseLog/DoseLog.js";
import Medicine from "../../models/Medicine/Medicine.js";

export const createDoseLog = async (req, res) => {
  try {
    const { medicineId, userId, dependentId, time, status } = req.body;

    if (!medicineId || !userId || !time || !status) {
      return res.status(400).json({ error: true, message: "Missing required fields" });
    }

    if (!["Taken", "Missed"].includes(status)) {
      return res.status(400).json({ error: true, message: "Invalid status" });
    }

    const logTime = new Date(time);
    const logDate = new Date(time);
    logDate.setHours(0, 0, 0, 0); // normalize to start of day

    // Check if log already exists for this exact time
    let existingLog = await DoseLog.findOne({
      medicineId,
      userId,
      dependentId: dependentId || null,
      time: logTime,
    });

    if (existingLog) {
      existingLog.status = status;
      await existingLog.save();
      await existingLog.populate("medicineId userId dependentId");
      return res.json({ success: true, log: existingLog });
    }

    // Create new log
    const newLog = await DoseLog.create({
      medicineId,
      userId,
      dependentId: dependentId || null,
      time: logTime,
      status,
      date: logDate,
    });
    await newLog.populate("medicineId userId dependentId");

    // Update medicine times if it repeats
    const medicine = await Medicine.findById(medicineId);
    if (medicine && medicine.repeat) {
      const updatedTimes = medicine.times.map(t => {
        let doseTime = new Date(typeof t === "string" ? t : t.$date);

        // Only update the logged time
        if (doseTime.getTime() === logTime.getTime()) {
          let nextTime = new Date(doseTime);

          if (medicine.selectedDays?.length) {
            // Weekly repeat
            const today = doseTime.getDay(); // 0 = Sunday
            let daysAhead = 1;
            while (!medicine.selectedDays.includes((today + daysAhead) % 7)) daysAhead++;
            nextTime.setDate(doseTime.getDate() + daysAhead);
          } else {
            // Daily repeat
            nextTime.setDate(doseTime.getDate() + 1);
          }

          return nextTime.toISOString();
        }

        return doseTime.toISOString();
      });

      medicine.times = updatedTimes;
      await medicine.save();
    }

    res.json({ success: true, log: newLog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: "Something went wrong" });
  }
};


export const getAllDoseLogs = async (req, res) => {
  try {
    const logs = await DoseLog.find()
      .populate("medicineId", "name dose timing repeatPattern")
      .populate("dependentId", "name");
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dose logs", error: error.message });
  }
};

export const getDoseLogsByDependent = async (req, res) => {
  try {
    const logs = await DoseLog.find({ dependentId: req.params.dependentId })
      .populate("medicineId", "name dose timing repeatPattern")
      .populate("dependentId", "name");
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dose logs", error: error.message });
  }
};

export const updateDoseLog = async (req, res) => {
  try {
    const updatedLog = await DoseLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLog) {
      return res.status(404).json({ message: "Dose log not found" });
    }

    res.status(200).json(updatedLog);
  } catch (error) {
    res.status(500).json({ message: "Failed to update dose log", error: error.message });
  }
};

export const deleteDoseLog = async (req, res) => {
  try {
    const deletedLog = await DoseLog.findByIdAndDelete(req.params.id);

    if (!deletedLog) {
      return res.status(404).json({ message: "Dose log not found" });
    }

    res.status(200).json({ message: "Dose log deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete dose log", error: error.message });
  }
};
export const getDoseLogsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // start and end of selected date
    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

    const logs = await DoseLog.find({
      userId: req.user.id,
      date: { $gte: startOfDay, $lte: endOfDay }, // ✅ use "date" instead of createdAt
    })
      .populate("medicineId", "name dose timing repeatPattern")
      .populate("dependentId", "name");

    res.status(200).json(logs);
  } catch (error) {
    console.error("Failed to fetch dose logs", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};




