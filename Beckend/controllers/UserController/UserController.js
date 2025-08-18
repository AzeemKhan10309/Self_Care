import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/Users/Users.js";

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
  console.log(email,password)
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const UserInfo = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
