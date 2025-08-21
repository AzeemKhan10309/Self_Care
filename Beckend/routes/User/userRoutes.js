import express from "express";
import { registerUser, loginUser , UserInfo, updateUserProfile} from "../../controllers/UserController/UserController.js";
import authMiddleware from "../../middlewares/authMiddleware.js"
const router = express.Router();



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id" ,authMiddleware,UserInfo)
router.put("/:userId", updateUserProfile);

export default router;
