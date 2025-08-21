import express from "express";

import { registerUser, loginUser , UserInfo, UserAvailablity,updateUserProfile} from "../../controllers/UserController/UserController.js";
import authMiddleware from "../../middlewares/authMiddleware.js"
const router = express.Router();



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id" ,UserInfo)
router.get("/:id" ,authMiddleware,UserInfo)
router.put("/:userId", updateUserProfile);
router.get("/check-username/:username", UserAvailablity)
router.put("/:userId",authMiddleware, updateUserProfile);

export default router;
