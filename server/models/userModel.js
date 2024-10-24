const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true  // Trims extra whitespace
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Email should be unique
      lowercase: true,  // Converts email to lowercase before saving
      validate: {
        validator: function (v) {
          // Email validation using regular expression
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
    },
    age: {
      type: Number,
      required: true,
      min: 18,  // Minimum age requirement
      max: 100  // Maximum age limit
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],  // Only allows valid blood groups
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],  // Restrict gender options to these values
      required: true
    },
    phoneNumber: {
      type: Number,  // Storing phone number as a number
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          // Ensure the phone number is 10 digits
          return /^\d{10}$/.test(v.toString());
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 8  // Enforces a minimum password length
    }
  },
  {
    timestamps: true  // Adds createdAt and updatedAt timestamps
  }
);

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
