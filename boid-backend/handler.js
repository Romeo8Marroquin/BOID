'use strict';
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to mongo');
})
.catch(err => {
  console.log(err);
});

module.exports = {
  register: require('./functions/register'),
  login: require('./functions/login'),
  verify: require('./functions/verify'),

  request: require('./functions/request.js'),
  createConversation: require('./functions/createConversation.js'),
  deleteConversation: require('./functions/deleteConversation.js'),
  getConversations: require('./functions/getConversations.js'),
  getRequests: require('./functions/getRequests.js'),
}