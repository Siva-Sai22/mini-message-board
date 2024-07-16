const mongoose = require('mongoose');
const {DateTime} = require('luxon');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: { type: String, required: true, maxlength: 100 },
    user: { type: String, required: true, maxlength: 50 },
    time: { type: Date, default: Date.now }
});

messageSchema.virtual('nice_date').get(function(){
    return DateTime.fromJSDate(this.time).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
});

module.exports = mongoose.model('message',messageSchema);