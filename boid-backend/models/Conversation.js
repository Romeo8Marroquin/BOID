const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    title: String,
    user: mongoose.Types.ObjectId,
    created: { type: Date, default: new Date() }
});

module.exports = mongoose.model('conversation', conversationSchema);