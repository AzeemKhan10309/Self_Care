import express from "express";
import { addMedicine ,updateMedicine, deleteMedicine,getallmedicinebyid ,getAllMedicinesByOwnerId} from "../../controllers/Medicine/MedicineController.js";
import { medicineUpload } from "../../middleware/upload.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addMedicine", authMiddleware, medicineUpload.single("image"), addMedicine);
router.put("/:id", authMiddleware, medicineUpload.single("image"), updateMedicine);
router.delete("/:id", authMiddleware, deleteMedicine);
router.get("/getallmedicinebyid", authMiddleware, getallmedicinebyid);
router.get("/getall", authMiddleware, getAllMedicinesByOwnerId);
export default router;