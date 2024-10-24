const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes'); // Import user routes

// env file config
dotenv.config();

// Connect to the database
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};

connectDb();

const app = express();
const port = process.env.PORT || 3001; // Set port to 3001

// Middleware configuration
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for security

// Route configuration
app.use('/api', userRoutes); // Import user routes under the /api path

// Health check route
app.get('/', (req, res) => {
    res.send("Server is working");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// APP CONFIG START
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
