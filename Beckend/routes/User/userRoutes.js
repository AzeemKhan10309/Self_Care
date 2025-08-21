import express from "express";
import { registerUser, loginUser, UserInfo, UserAvailablity, updateUserProfile,  uploadProfileImage, } from "../../controllers/UserController/UserController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { upload } from "../../middlewares/upload.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-username/:username", UserAvailablity);

// Protected routes
router.get("/:id", authMiddleware, UserInfo);
router.put("/:userId", authMiddleware, uploadProfileImage, updateUserProfile);

export default router;
