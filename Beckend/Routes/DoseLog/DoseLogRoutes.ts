import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js"; 
import {createDoseLog} from "../../controllers/DoseLog/DoseLogController.js";

const router = express.Router();

router.post("/create", authMiddleware, createDoseLog);

export default router;
