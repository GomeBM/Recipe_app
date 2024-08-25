const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const router = express.Router();

//REGISTER A NEW USER
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res.json({
        success: false,
        message: "A user with this email adress already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      password: hashedPassword,
      email,
    });
    const savedUser = await newUser.save();

    res.status(201).json({ success: true, user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//LOGIN TO EXISTING USER
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    res.json({ success: false, message: "Please fill in all fields" });
  }
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      console.log("Invalid email");
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ name: user.username }, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      message: "Login successful",
      name: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log("Server error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

//OPTION:ADD DELETE USER ROUTE

module.exports = router;
