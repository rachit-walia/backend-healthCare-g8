// FRAMEWORK CONFIGURATION
// --- Always Import/Require on top ---
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb=require('./config/dbConnection')
const exampleRoute = require('./routes/example');

// env file config
dotenv.config();

// Connect to the database
connectDb();

const app = express();
const port = process.env.PORT || 8080;  // Default to port 8080

// Middleware configuration
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());  // Enable CORS for security

// Route configuration
app.use('/example', exampleRoute);  // Route for '/example'

// Health check route
app.get('/', (req, res) => {
    res.send("Server is working");
});

// APP CONFIG START
app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});
