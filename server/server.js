const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./userModel'); // Import the User model

// Initialize Express
console.log('Starting Express...');
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files from the public folder
app.use(express.static('../public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/loginDB', {
    useNewUrlParser: true, // optional, for compatibility with older versions
    useUnifiedTopology: true // optional, for compatibility with older versions
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Handle login requests
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.json({ success: false, message: 'Invalid username or password' });
        }

        // If you are using password hashing, make sure to compare hashed passwords
        // Example: const match = await bcrypt.compare(password, user.password);
        if (user.password !== password) { // Simple comparison, replace with hashed comparison if used
            return res.json({ success: false, message: 'Invalid username or password' });
        }

        return res.json({ success: true, username: username });
    } catch (err) {
        console.error('Error querying the database', err);
        return res.json({ success: false, message: 'An error occurred' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
