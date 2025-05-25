const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userQuery: String,
    botResponse: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', chatSchema);
