const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(errorHandler);

// Configure Handlebars
const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.set('view engine', 'hbs');

// Configure static files for image serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file uploads
const upload = multer({ dest: './uploads' });

// Routes
app.use('/api/register', require("./routes/userRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

// Homepage route
app.get('/', (req, res) => {
    res.send("working");
});

// Home view with dynamic content
app.get('/home', (req, res) => {
    res.render("home", {
        title: "Dynamic Home Page",
        message: "Welcome to the dynamic home page!",
        user: {
            name: "John Doe",
            age: 30
        },
        imageUrl: null // No image initially
    });
});

// Profile upload route
app.post("/profile", upload.single("avatar"), (req, res) => {
    if (req.file) {
        const filePath = `/uploads/${req.file.filename}`;
        res.render("home", {
            title: "Profile Uploaded",
            message: "Profile image uploaded successfully!",
            user: {
                name: "John Doe",
                age: 30
            },
            imageUrl: filePath // Pass image URL to render on the page
        });
    } else {
        res.status(400).send("No file uploaded.");
    }
});

// Route for all users (example data)
app.get('/allusers', (req, res) => {
    const users = [
        { name: "John Doe", age: 30, email: "johndoe@example.com", role: "Admin" },
        { name: "Jane Smith", age: 25, email: "janesmith@example.com", role: "User" },
        { name: "Alice Johnson", age: 28, email: "alicejohnson@example.com", role: "Moderator" }
    ];
    res.render('users', { users });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

