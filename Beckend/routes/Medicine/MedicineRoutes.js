import express from "express";
import {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
} from "../../controllers/Medicine/MedicineController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createMedicine);
router.get("/", authMiddleware, getAllMedicines);
router.get("/:id", authMiddleware, getMedicineById);
router.put("/:id", authMiddleware, updateMedicine);
router.delete("/:id", authMiddleware, deleteMedicine);

export default router;
