const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const hbs = require("hbs");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = process.env.UPLOAD_DIR || "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use('/uploads', express.static(path.join(__dirname, uploadDir)));
app.use(express.json());
app.use(cors());

// Handlebars setup
hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.set('view engine', 'hbs');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    extName && mimeType ? cb(null, true) : cb(new Error("Invalid file type"));
  }
});

// Routes
app.get("/", (req, res) => res.send("Server is working"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));

// Render views
app.get("/home", (req, res) => res.render("home", { title: "Home Page" }));

// File upload routes
app.post("/profile", upload.single("avatar"), (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.render("profile", { imageUrl });
}, (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send(err.message);
  }
  next(err);  // Pass the error to the custom error handler
});

app.post("/photos/upload", upload.array("photos", 12), (req, res, next) => {
  if (!req.files.length) {
    return res.status(400).send("No files uploaded.");
  }
  const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
  res.render("gallery", { imageUrls });
}, (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send(err.message);
  }
  next(err);  // Pass the error to the custom error handler
});

// Error Handling
app.use((req, res, next) => {
  res.status(404).render("404", { message: "Page not found" });
});
app.use(errorHandler);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
