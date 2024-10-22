const express = require('express');
const cors = require("cors");
const app = express();

// Import the example route
const exampleRoute = require('./routes/example');

// Middleware to use the example route
app.use('/example', exampleRoute);
app.use(express.json());
app.use(cors());

// Start the server on a different port
const port = process.env.PORT || 8080;  // Changed to port 8080
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

