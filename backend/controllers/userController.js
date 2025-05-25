const User = require('../models/UserSchema');  // ✅ Make sure this is here and correct
const { generateAndSendIDCard } = require('./idCardController');

exports.registerUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();

        await generateAndSendIDCard(newUser);

        res.status(201).json({ message: 'User registered and ID card sent to email', user: newUser });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Error registering user or sending ID card', error: error.message });
    }
};
