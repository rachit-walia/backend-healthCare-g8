const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/registerController"); // Assuming your register controller
const { loginUser } = require("../controllers/loginController"); // Import login controller

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser); // New login route

module.exports = router;
