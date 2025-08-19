import express from "express";
<<<<<<< Updated upstream
import { registerUser, loginUser } from "../../controllers/UserController/UserController.js";

=======
import { registerUser, loginUser , UserInfo, checkUsername} from "../../controllers/UserController/UserController.js";
import authMiddleware from "../../middlewares/authMiddleware.js"
>>>>>>> Stashed changes
const router = express.Router();
router.post("/register", registerUser);
router.get("/check-username", checkUsername);
router.post("/login", loginUser);
 

export default router;
