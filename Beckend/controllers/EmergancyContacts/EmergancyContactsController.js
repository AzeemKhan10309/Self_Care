import EmergencyContact from "../../models/EmergancyContacts/EmergancyContacts.js";

export const addEmergencyContact = async (req, res) => {
  try {
    const { name, phoneNumber, relation } = req.body;

    if (!name || !phoneNumber || !relation) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await EmergencyContact.create({
      userId: req.user.id, 
      name,
      phoneNumber,
      relation
    });

    res.status(201).json({ message: "Emergency contact added successfully", contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getEmergencyContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ userId: req.user.id });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmergencyContactById = async (req, res) => {
  try {
    const contact = await EmergencyContact.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmergencyContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found or not yours" });
    }

    res.status(200).json({ message: "Emergency contact updated", contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEmergencyContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found or not yours" });
    }

    res.status(200).json({ message: "Emergency contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
