const express = require('express');
const router = express.Router();

// Example registration route
router.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Simulating user registration logic (in real-world app, you'd save this to a database)
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields!' });
    }

    // Send a success response
    res.status(201).json({ message: 'User registered successfully!', user: { firstName, lastName, email } });
});

module.exports = router;
