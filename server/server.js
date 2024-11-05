//Framework Configuration
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
// const hbs = require("hbs");
const path = require("path");
const multer = require("multer");
const upload = multer({dest:'./uploads' });

const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(errorHandler);


const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.set('view engine', 'hbs');

app.use('/api/register', require("./routes/userRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
//ROUTES BELOW
app.get('/',(req,res)=>{
    res.send("working");
});

app.get('/home', (req, res) => {
    res.render("home", {
        title: "Dynamic Home Page",
        message: "Welcome to the dynamic home page!",
        user: {
            name: "John Doe",
            age: 30
        }
    });
})

app.get('/allusers', (req, res) => {
    // Mock array of user objects (replace with real data from a database)
    const users = [
        { name: "John Doe", age: 30, email: "johndoe@example.com", role: "Admin" },
        { name: "Jane Smith", age: 25, email: "janesmith@example.com", role: "User" },
        { name: "Alice Johnson", age: 28, email: "alicejohnson@example.com", role: "Moderator" }
    ];
    // Pass the users array to the view
    res.render('users', { users });
});


app.post("/profile", upload.single("avatar"),function(req, res, next) {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/home");
})

app.listen(port, () =>{
    console.log(`Server running in port http://localhost:${port}`);
});