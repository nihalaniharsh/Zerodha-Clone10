const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  otp: { type: String }, // store plain or hashed OTP
  otpExpires: { type: Date }, // optional: expire OTP after X mins
});

module.exports = mongoose.model("User", userSchema);
