import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/Users/Users.js";

export const registerUser = async (req, res) => {
  const { name, username, email, password, phone } = req.body;

  try {
    // ✅ Check for missing fields
    if (!name || !username || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save user (match field name to schema)
    const newUser = new User({
      name,
      username,
      email,
      passwordHash: hashedPassword, // use correct schema field name
      phone,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
}       
