const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    created: { type: Date, default: new Date() }
});

module.exports = mongoose.model('user', userSchema);