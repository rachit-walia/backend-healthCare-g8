const express = require("express");
const connectDb = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const doctorRoutes = require("./routes/doctorRoutes");
const path = require("path");
const multer = require("multer");
// const upload = multer({ dest: "./uploads" });
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
connectDb();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix)+path.extname(file.originalname);
  },
});

const upload = multer({ storage: storage });
console.log(process.env.PRIVATE_KEY);

// App Config


// Middleware
app.use(express.json());
app.use(cors());
app.use(errorHandler);
// Serve static files from "uploads" folder

// View Engine
const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.set("view engine", "hbs");

// Routes
app.get('/', (req, res) => {
    res.send("working");
});

app.use('/api/users', userRoutes);

app.get("/home", (req, res) => {
    const user1 = { name: "rachit", age: "20" };
    const user2 = { name: "walia", age: "21" };
    res.render("home", { user1, user2 });
});

app.get("/allusers", (req, res) => {
    res.render("users", { users: [{ id: 1, username: "rachit", age: 23 }, { id: 2, username: "walia", age: 24 }] });
});

app.use("/api/doctors", doctorRoutes);

// Profile upload route
app.post("/profile", upload.single("avatar"), function (req, res, next) {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  console.log(req.body);
  console.log(req.file);

  const fileName = req.file.filename;
  const imageUrl = `/uploads/${fileName}`;
  return res.render("home", {
    imageUrl: imageUrl,
  });
});
// app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
// Server Start
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});