// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/userModel"); // Correct path to modules

// Register a new user
router.post("/register", async (req, res) => {
    console.log("Request Received");
    try {
        const { firstName, lastName, email, password, phoneNumber, age, bloodGroup, gender } = req.body;

        // Check if all required fields are provided
        if (!firstName || !lastName || !email || !password || !phoneNumber || !age || !bloodGroup || !gender) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        // Create a new user instance
        const newUser = new User({
            firstName,
            lastName,
            email,
            password, // The password should be hashed before saving it to the database
            phoneNumber,
            age,
            bloodGroup,
            gender
        });

        await newUser.save();

        // Success response
        res.status(201).json({ message: `User ${firstName} ${lastName} registered successfully!` });
    } catch (error) {
        // Error response
        res.status(400).json({ message: "Error registering user", error: error.message });
    }
});

module.exports = router;