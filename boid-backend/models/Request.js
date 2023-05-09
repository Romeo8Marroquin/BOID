const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    request: String,
    response: String,
    conversation: mongoose.Types.ObjectId,
    created: { type: Date, default: new Date() }
});

module.exports = mongoose.model('request', requestSchema);