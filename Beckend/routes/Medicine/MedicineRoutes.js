import express from "express";
import { registerUser, loginUser } from "../controllers/UserController/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.router();
