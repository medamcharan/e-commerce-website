// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatController');

router.post('/', handleChat); // Handle POST requests for chat

module.exports = router;
