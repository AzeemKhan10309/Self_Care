import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js"; 
import {createDoseLog,getTodayDoses,getNextDose,markDoseTaken,markDoseMissed,} from "../../controllers/DoseLog/DoseLogController.js";

const router = express.Router();

router.post("/create", authMiddleware, createDoseLog);
router.get("/doses/today", authMiddleware,getTodayDoses);
router.get("/doses/next",authMiddleware, getNextDose);
router.patch("/doses/:id/taken", markDoseTaken);
router.patch("/doses/:id/missed", markDoseMissed);
export default router;
