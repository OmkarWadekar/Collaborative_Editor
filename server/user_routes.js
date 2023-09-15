import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import JWT module

import User from './userSchema.js'; // Replace with the correct path
import document from './schema/documentSchema.js';

const router = express.Router();

const SECRET_KEY = 'JSONWebtoken'; // Replace with a secure secret key

// Registration route
// router.post('/register', async (req, res) => {
router.post('/api/users/register', async (req, res) => {
    console.log("in post method backend ");
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password are required.' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user data to MongoDB using the User model
        const newUser = await User.create({ username, password: hashedPassword });

        // Create a new document for the user and associate it with their username
        const newDocument = await document.create({ _id: newUser._id, data: '' });

        res.status(200).json({ message: 'Registration successful.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error....' });
    }
});

// Login route
router.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password are required.' });

    try {
        // Fetch the user from MongoDB based on the username
        const user = await User.findOne({ username });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ username: user.username }, SECRET_KEY);

        // Send the token to the client
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export default router;




// import express from 'express';
// import bcrypt from 'bcrypt';

// import User from './userSchema.js'; // Replace with the correct path


// const router = express.Router();

// // Registration route
// router.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) return res.status(400).json({ error: 'Username and password are required.' });

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Save the user data to MongoDB using the User model
//         const newUser = await User.create({ username, password: hashedPassword });

//         res.status(200).json({ message: 'Registration successful.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error.' });
//     }
// });

// // Login route
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) return res.status(400).json({ error: 'Username and password are required.' });

//     try {
//         // Fetch the user from MongoDB based on the username
//         const user = await User.findOne({ username });

//         if (!user || !bcrypt.compareSync(password, user.password)) {
//             return res.status(401).json({ error: 'Invalid credentials.' });
//         }

//         // Generate a JWT token
//         const token = jwt.sign({ username: user.username }, SECRET_KEY);

//         // Send the token to the client
//         res.json({ token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error.' });
//     }
// });



// export default router;
