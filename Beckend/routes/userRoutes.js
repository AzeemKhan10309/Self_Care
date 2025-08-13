import express from "express";
import { registerUser, loginUser } from "../controllers/UserController/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
// User registration route
router.post("/register", registerUser);
// User login route
router.post("/login", loginUser);
 

export default router;
