import express from "express";
import {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  markMedicineTaken,
  getMedicineHistory,
  getMedicinesByDependent,
  getTodayMedicines,
  toggleReminder,
} from "../../controllers/Medicine/MedicineController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createMedicine);
router.get("/", authMiddleware, getAllMedicines);
router.get("/:id", authMiddleware, getMedicineById);
router.put("/:id", authMiddleware, updateMedicine);
router.delete("/:id", authMiddleware, deleteMedicine);
router.post("/:id/taken", authMiddleware, markMedicineTaken);
router.get("/:id/history", authMiddleware, getMedicineHistory);
router.get("/dependent/:dependentId", authMiddleware, getMedicinesByDependent);
router.get("/today/list", authMiddleware, getTodayMedicines);
router.patch("/:id/reminder", authMiddleware, toggleReminder);

export default router;
