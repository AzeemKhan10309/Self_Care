import express from "express";
import {  approveUser, assignDoctorOrTrainer } from "../../controllers/Admin/AdminController";
import { authMiddleware, authorizeRoles } from "../../middleware/authMiddleware";

const router = express.Router();


// Admin approves doctor/trainer
router.put("/approve/:userId", authMiddleware, authorizeRoles("admin"), approveUser);

// Assign doctor/trainer to a user
router.put("/assign", authMiddleware, authorizeRoles("admin"), assignDoctorOrTrainer);

export default router;
