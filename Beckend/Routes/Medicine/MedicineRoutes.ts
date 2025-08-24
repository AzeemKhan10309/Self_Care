import express from "express";
import { addMedicine  ,getallmedicinebyid, updateMedicine, deleteMedicine} from "../../controllers/Medicine/MedicineController.js";
import { medicineUpload } from "../../middleware/upload.js";
import authMiddleware from "../../middleware/authMiddleware.js"; 
const router = express.Router();

router.post("/addMedicine", authMiddleware, medicineUpload.single("image"), addMedicine);
router.get("/user/:id", authMiddleware, getallmedicinebyid);
router.put("/medicines/:id", authMiddleware, updateMedicine);
router.delete("/medicines/:id", authMiddleware, deleteMedicine);
export default router;
