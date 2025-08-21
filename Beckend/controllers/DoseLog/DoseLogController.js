import DoseLog from "../../models/DoseLog/DoseLog.js";

export const createDoseLog = async (req, res) => {
  try {
    const { medicineId, userId, dependentId, time, status } = req.body;

    if (!medicineId || !userId || !time || !status) {
      return res.status(400).json({ error: true, message: "Missing required fields" });
    }

    // Normalize date (store only date part for easier querying)
    const logDate = new Date(time);
    logDate.setHours(0, 0, 0, 0);

    // Check if log already exists
    const existingLog = await DoseLog.findOne({
      medicineId,
      userId,
      dependentId: dependentId || null,
      date: logDate,
    });

    if (existingLog) {
      // Update status if already exists
      existingLog.status = status; // "Taken" or "Missed"
      existingLog.time = time; // store exact time if needed
      await existingLog.save();
      return res.json({ success: true, log: existingLog });
    }

    // Create new log
    const newLog = await DoseLog.create({
      medicineId,
      userId,
      dependentId: dependentId || null,
      time,
      status, // "Taken" or "Missed"
      date: logDate,
    });

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
