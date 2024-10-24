const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel"); // Adjust the path based on your structure

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, age, bloodGroup, gender, phoneNumber } = req.body;

    // Check if all fields are provided
    if (!firstName || !lastName || !email || !password || !age || !bloodGroup || !gender || !phoneNumber) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        age,
        bloodGroup,
        gender,
        phoneNumber,
    });

    // Respond with the user information, excluding the password
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            bloodGroup: user.bloodGroup,
            gender: user.gender,
            phoneNumber: user.phoneNumber,
        }
    });
});

// Exporting the controller methods
module.exports = { registerUser };
