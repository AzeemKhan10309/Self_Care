import { Router } from "express";
import { checkUsername, register, login, getUser ,updateUser } from "../../controllers/User/UserController.js";
import { profileUpload } from "../../middleware/upload.js";

const router = Router();

router.get("/check-username/:username", checkUsername);
router.put("/:id", profileUpload.single("profileImage"), updateUser);

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUser);

export default router;
