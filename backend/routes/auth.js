const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Signup - generate and send OTP
router.post("/signup", async (req, res) => {
  const { username } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Generate OTP and expiry (5 mins)
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    // Hash OTP before saving
    const hashedOTP = await bcrypt.hash(otp, 10);

    // Create user with OTP info
    const newUser = await User.create({
      username,
      otp: hashedOTP,
      otpExpires,
    });

    // For development: log OTP. Replace with SMS sending logic in production
    console.log(`OTP for ${username}: ${otp}`);

    res.status(201).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify OTP endpoint
router.post("/verify-otp", async (req, res) => {
  const { username, otp } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({ message: "No OTP found for user" });
    }

    if (user.otpExpires < new Date()) {
      return res.status(410).json({ message: "OTP expired" });
    }

    const isValidOtp = await bcrypt.compare(otp, user.otp);
    if (!isValidOtp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    // Clear OTP fields after successful verification
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ message: "OTP verified", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
