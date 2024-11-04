const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure no duplicate emails
        trim: true, // Trim whitespace
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Ensure minimum password length
    },
    age: {
        type: Number,
        required: true,
        min: 0, // Minimum age
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Restrict to valid blood groups
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'], // Restrict to valid genders
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true, // Ensure no duplicate phone numbers
        trim: true, // Trim whitespace
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
