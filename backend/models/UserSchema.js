const mongoose = require('mongoose');

// Function to generate a random 3-digit number
function generateRandomIdNumber() {
    return Math.floor(100 + Math.random() * 900).toString(); // 100–999
}

const userSchema = new mongoose.Schema({
    fullName: String,
    cnic: String,
    email: String,
    phone: String,
    address: String,
    course: {
        type: [String],
        default: []
    },
    idNumber: {
        type: String,
        default: generateRandomIdNumber,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', userSchema);
