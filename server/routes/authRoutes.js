const express = require('express');
const router = express.Router();
const { test, registerUser ,loginUser} = require('../controllers/authController');


// Use CORS middleware to allow cross-origin requests
const cors = require('cors');
router.use(cors({
  credentials: true,
  origin: '*', // Your frontend URL
}));

// Route for testing
router.get('/', test);

// Route for user registration
router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;
