import DoseLog from "../models/DoseLog.js";

export const createDoseLog = async (req, res) => {
  try {
    const { medicineId, dependentId, date, status } = req.body;

    if (!medicineId || !dependentId || !date || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const doseLog = new DoseLog({
      medicineId,
      dependentId,
      date,
      status
    });

    const savedLog = await doseLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(500).json({ message: "Failed to create dose log", error: error.message });
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
