import express from "express";
import multer from "multer";

import {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  getTodaysMedicines
 
} from "../../controllers/Medicine/MedicineController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createMedicine);
router.get("/today", authMiddleware, getTodaysMedicines);

router.get("/", authMiddleware, getAllMedicines);
router.get("/:id", authMiddleware, getMedicineById);
router.put("/:id", authMiddleware, updateMedicine);
router.delete("/:id", authMiddleware, deleteMedicine);

export default router;