const express = require("express");
const router = express.Router();
const { registerDoctor, getAllDoctors, getDoctorById } = require("../controllers/doctorController");

// Register a new doctor
router.post("/register", registerDoctor);

// Get all doctors
router.get("/", getAllDoctors);

// Get a doctor by ID
router.get("/:id", getDoctorById);

module.exports = router;
