const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model so it can be used in other files
module.exports = User;