import Medicine from "../../models/Medicine/Medicine.js";
import Dependent from "../../models/Dependent/Dependent.js";


export const createMedicine = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      dosage,
      unit,
      startDate,
      endDate,
      times,
      frequency,
      days,
      reminderEnabled,
      reminderBefore,
      repeat,
      notes,
      image,
      userId,
      dependentId
    } = req.body;

  
    if (!name || !type || !dosage || !unit || !startDate || !times || !userId || !dependentId) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    
    const dependentExists = await Dependent.findById(dependentId);
    if (!dependentExists) {
      return res.status(404).json({ message: "Dependent not found" });
    }

    const medicine = new Medicine({
      name,
      description,
      type,
      dosage,
      unit,
      startDate,
      endDate,
      times,
      frequency,
      days,
      reminderEnabled,
      reminderBefore,
      repeat,
      notes,
      image,
      userId,
      dependentId
    });

    const savedMedicine = await medicine.save();
    res.status(201).json(savedMedicine);
  } catch (error) {
    res.status(500).json({ message: "Failed to create medicine", error: error.message });
  }
};



export const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find()
      .populate("dependentId", "name") 
      .populate("userId", "username email"); 
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch medicines", error: error.message });
  }
};



export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id)
      .populate("dependentId", "name")
      .populate("userId", "username email");

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch medicine", error: error.message });
  }
};



export const updateMedicine = async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ message: "Failed to update medicine", error: error.message });
  }
};


export const deleteMedicine = async (req, res) => {
  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!deletedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete medicine", error: error.message });
  }
};


export const markMedicineTaken = async (req, res) => {
  try {
    const { id } = req.params; 
    const { date, status } = req.body; 

    const medicine = await Medicine.findById(id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    medicine.takenHistory.push({ date, status });
    await medicine.save();

    res.status(200).json({ message: "Medicine marked successfully", medicine });
  } catch (error) {
    res.status(500).json({ message: "Failed to update history", error: error.message });
  }
};


export const getMedicineHistory = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id).select("takenHistory name");
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json(medicine.takenHistory);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history", error: error.message });
  }
};

export const getMedicinesByDependent = async (req, res) => {
  try {
    const { dependentId } = req.params;

    const medicines = await Medicine.find({ dependentId }).populate("dependentId", "name");
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch medicines by dependent", error: error.message });
  }
};

export const getTodayMedicines = async (req, res) => {
  try {
    const today = new Date();
    const dayName = today.toLocaleString("en-US", { weekday: "long" }); 

    const medicines = await Medicine.find({
      startDate: { $lte: today },
      $or: [
        { endDate: { $gte: today } },
        { endDate: null }
      ],
      days: { $in: [dayName] } 
    }).populate("dependentId", "name");

    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch today's medicines", error: error.message });
  }
};

export const toggleReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reminderEnabled } = req.body;

    const medicine = await Medicine.findByIdAndUpdate(
      id,
      { reminderEnabled },
      { new: true }
    );

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json({ message: "Reminder updated", medicine });
  } catch (error) {
    res.status(500).json({ message: "Failed to update reminder", error: error.message });
  }
};
