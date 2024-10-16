import User from "../model/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please enter a strong password (at least 8 characters)",
        });
    }

    // Hash the password before saving the new user
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password,
      role: role || "customer", // Default to "customer" if no role is provided
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for email:", email,password);

    // Find the user by email (case-insensitive)
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log(user);
    
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare passwords
    const isMatch = await user.isPasswordCorrect(password)
    console.log(isMatch);
    
    if (!isMatch) {
      return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
    }
    
    console.log("matched");
    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Send success response
    return res.json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { registerUser, loginUser };
