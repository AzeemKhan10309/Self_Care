import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  addEmergencyContact,
  getEmergencyContacts,
  getEmergencyContactById,
  updateEmergencyContact,
  deleteEmergencyContact
} from "../../controllers/EmergancyContacts/EmergancyContactsController.js";

const router = express.Router();

router.post("/", authMiddleware, addEmergencyContact);
router.get("/", authMiddleware, getEmergencyContacts);
router.get("/:id", authMiddleware, getEmergencyContactById);
router.put("/:id", authMiddleware, updateEmergencyContact);
router.delete("/:id", authMiddleware, deleteEmergencyContact);

export default router;
