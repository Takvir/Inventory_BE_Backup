// routes/auth.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// routes/auth.js
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const { token, user_type } = await userModel.authenticateUser(username, password);
        res.json({ token, user_type });
    } catch (error) {
        console.error('Authentication error:', error.message); // Log the error message
        res.status(401).json({ error: 'Invalid credentials' });
    }
});



module.exports = router;
