const User = require('../models/user');

const test = (req, res) => {
    res.json('Test is working');
}

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const exist = await User.findOne({ email });

        if (exist) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Directly save the plain text password (not secure)
        const user = new User({ username, email, password, role });
        await user.save();

        res.json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Directly compare the plain text password (not secure)
        if (user.password !== password) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        res.json({ success: true, message: 'Login successful' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
}

module.exports = {
    test,
    registerUser,
    loginUser
}
