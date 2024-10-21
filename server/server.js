const express = require('express');
const app = express();

// Import the example route
const exampleRoute = require('./routes/example');

// Middleware to use the example route
app.use('/example', exampleRoute);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
