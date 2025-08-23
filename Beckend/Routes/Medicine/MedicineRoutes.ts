import express from "express";
import { addMedicine ,getTodayMedicines } from "../../controllers/Medicine/MedicineController.js";
import { medicineUpload } from "../../middleware/upload.js";
import authMiddleware from "../../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/addMedicine", authMiddleware, medicineUpload.single("image"), addMedicine);
router.get("/today", authMiddleware, getTodayMedicines);

export default router;
