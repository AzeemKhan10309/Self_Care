import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/Users/Users.js";

export const checkUsername = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }

    const exists = await User.findOne({ username });
    if (!exists) {
      return res.json({ available: true });
    }

    // Agar username already exist hai to random suggestions do
    const suggestions = [
      `${username}${Math.floor(100 + Math.random() * 900)}`,
      `${username}_${Math.floor(Math.random() * 1000)}`,
      `${username}X${Date.now().toString().slice(-3)}`,
    ];

    res.json({ available: false, suggestions });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, phone } = req.body;
    console.log(req.body);

    if (!name || !username || !email || !password || !phone) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }
console.log(req.body);


    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      email,
     password: passwordHash,
      phone
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Registration error:", error);
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
