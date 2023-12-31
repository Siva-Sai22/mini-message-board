const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: { type: String, required: true, maxlength: 100 },
    user: { type: String, required: true, maxlength: 15 },
    time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('message',messageSchema);