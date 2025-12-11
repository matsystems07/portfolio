// server/controllers/chatController.js
const { chatWithAI } = require('./aiController');

exports.handleChat = async (req, res, next) => {
  return chatWithAI(req, res, next);
};
