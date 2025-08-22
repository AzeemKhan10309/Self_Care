import express from "express";
import {
  createDoseLog,
  getAllDoseLogs,
  getDoseLogsByDependent,
  updateDoseLog,
  deleteDoseLog,
  getDoseLogsByDate
} from "../../controllers/DoseLog/DoseLogController.js";
import authMiddleware from "../../middlewares/authMiddleware.js"
const router = express.Router();

router.post("/", authMiddleware, createDoseLog);
router.get("/by-date", authMiddleware, getDoseLogsByDate);
router.get("/", authMiddleware,getAllDoseLogs);

router.get("/dependent/:dependentId", getDoseLogsByDependent);

router.put("/:id",authMiddleware, updateDoseLog);

router.delete("/:id", authMiddleware,deleteDoseLog);

export default router;
