import express from "express";
import { addMedicine ,updateMedicine, deleteMedicine,getallmedicinebyid} from "../../controllers/Medicine/MedicineController.js";
import { medicineUpload } from "../../middleware/upload.js";
import authMiddleware from "../../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/addMedicine", authMiddleware, medicineUpload.single("image"), addMedicine);

export default router;