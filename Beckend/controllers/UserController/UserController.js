import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/Users/Users.js";
import path from "path";
import fs from "fs";
import multer from "multer";

export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, phone, collectInfo } = req.body;
    console.log("Request body:", req.body);

    if (!name || !username || !email || !password || !phone) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      email,
      password: passwordHash,
      phone,
      age: collectInfo?.age || null,
       gender: collectInfo?.gender ? collectInfo.gender.toLowerCase() : null,
      weight: collectInfo?.weight || null,
      height: collectInfo?.height || null,
      dob: collectInfo?.dob ? new Date(collectInfo.dob) : null,
      dob: collectInfo?.dob ? new Date(collectInfo.dob) : null,
      isProfileComplete: collectInfo ? true : false,
    });

    await newUser.save();

    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
      age: newUser.age,
      gender: newUser.gender,
      weight: newUser.weight,
      height: newUser.height,
      dob: newUser.dob,
      isProfileComplete: newUser.isProfileComplete,
    };

    res.status(201).json({ user: userResponse });

  } catch (error) {
    console.error("Registration errorr:", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password: pwd, ...userData } = user.toObject();

    res.json({
      message: "Login successful",
      token,
      user: userData, 
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const UserInfo = async (req, res) => {
  try {
       const user = await User.findById(req.params.id).select("-password");


    if (user) {
      console.log("User found:", user);
      res.json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/profile_images";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});
export const uploadProfileImage = multer({ storage }).single("profileImage");

export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    // If file was uploaded, add its path to updates
    if (req.file) {
      updates.profileImage = `${req.protocol}://${req.get("host")}/${
        req.file.path
      }`.replace(/\\/g, "/"); // ensures cross-platform path
    }

    // Convert numeric fields
    if (updates.weight) updates.weight = Number(updates.weight);
    if (updates.height) updates.height = Number(updates.height);
    if (updates.dob) updates.dob = new Date(updates.dob);

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


function generateSuggestions(username) {
  const cleanName = username.toLowerCase();
  const randomNum = () => Math.floor(1000 + Math.random() * 9000);

  return [
    `${cleanName}${randomNum()}`,
    `${cleanName}_123`,
    `${cleanName}_official`,
    `${cleanName}_dev`,
    `the_${cleanName}`,
    `${cleanName}_x`,
  ];
}

export const UserAvailablity = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username || username.trim() === "") {
      return res.status(400).json({ error: "Username is required" });
    }

    const existingUser = await User.findOne({ username: new RegExp(`^${username}$`, "i") });

    if (existingUser) {
      const suggestions = generateSuggestions(username);
      return res.json({
        available: false,
        message: "Username already taken",
        suggestions,
      });
    }

    res.json({
      available: true,
      message: "Username is available",
    });
  } catch (error) {
    console.error("Error checking username:", error);
    res.status(500).json({ error: "Server error" });
  }
};



