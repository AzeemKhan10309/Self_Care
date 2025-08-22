import Medicine from "../../models/Medicine/Medicine.js";
import DoseLog from "../../models/DoseLog/DoseLog.js";

export const createMedicine = async (req, res) => {
 try {
    const {
      medicine,
      description,
      type,
      dosage,
      unit,
      startDate,
      endDate,
      times,
      reminderEnabled,
      reminderBefore,
      repeat,
      notes,
      selectedDays
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newMedicine = new Medicine({
      name: medicine,
      description,
      type,
      dosage,
      unit,
      startDate,
      endDate,
      times: JSON.parse(times || "[]"),
      selectedDays: JSON.parse(selectedDays || "[]"),
      reminderEnabled,
      reminderBefore,
      repeat,
      notes,
      image,
       userId: req.user.id,
    });

    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    console.error("❌ Error saving medicine:", error);
    res.status(500).json({ message: "Failed to save medicine" });
  }
};




export const getAllMedicines = async (req, res) => {
  try {
const medicines = await Medicine.find({ userId: req.user.id })
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

export const getTodaysMedicines = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of today
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // start of tomorrow

    // Fetch all medicines of user
    let medicines = await Medicine.find({ userId })
      .populate("dependentId", "name")
      .populate("userId", "username email");

    // Filter out medicines already logged today
    const doseLogsToday = await DoseLog.find({
      userId,
      date: today,
    });

    const loggedMedicineIds = doseLogsToday.map(d => d.medicineId.toString());

    const todaysMedicines = medicines.filter(med => {
      const medTimes = med.times.map(t => new Date(typeof t === "string" ? t : t.$date));
      const isToday = medTimes.some(t => t >= today && t < tomorrow);
      
      // check repeating days
      let shouldShow = isToday;
      if (med.repeat && med.selectedDays?.length) {
        const todayDay = today.getDay(); // 0=Sunday
        shouldShow = med.selectedDays.includes(todayDay);
      }

      return shouldShow && !loggedMedicineIds.includes(med._id.toString());
    });

    res.status(200).json(todaysMedicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch today's medicines", error: error.message });
  }
};


