const express = require("express");
const router = express.Router();
const { registerDoctor, getAllDoctors, getDoctorById } = require("../controllers/doctorController");

// Define `/register` route before `/:id` to avoid route conflicts
router.post("/register", registerDoctor);

// Get all doctors
router.get("/", getAllDoctors);

// Get a doctor by ID (define after `/register` to avoid conflicts)
router.get("/:id", getDoctorById);

module.exports = router;
