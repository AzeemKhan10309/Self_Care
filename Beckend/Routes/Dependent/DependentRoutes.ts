import express from "express";
import { dependentUpload } from "../../middleware/upload.js";
import {
  createDependent,
  getUserDependents,
  getDependentById,
  updateDependent,
  deleteDependent,
} from "../../controllers/Dependent/DenpendentController.js";

const router = express.Router();

router.post("/", dependentUpload.single("Dependentpicture"), createDependent);
router.get("/user/:userId", getUserDependents);   
router.get("/:id", getDependentById);             
router.put("/:id", dependentUpload.single("Dependentpicture"), updateDependent);
router.delete("/:id", deleteDependent);

export default router;
