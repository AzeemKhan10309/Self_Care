import { Router } from "express";
import { 
    checkUsername, 
    register, 
    login, 
    getUser,
    updateUser,
    sendOtpForPasswordReset,
    verifyOtp,
    resetPasswordWithOtp
} from "../../controllers/User/UserController.js";
import { profileUpload } from "../../middleware/upload.js";


const router = Router();

router.get("/check-username/:username", checkUsername);

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUser);

router.post("/send-otp", sendOtpForPasswordReset);
router.post("/verify-otp", verifyOtp);

router.put("/reset-password", resetPasswordWithOtp);

router.put("/:id", profileUpload.single("profileImage"), updateUser);



export default router;
