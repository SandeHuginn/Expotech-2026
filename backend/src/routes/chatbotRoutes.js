
const express = require('express');
const router = express.Router();

const chatbotController = require('../controllers/chatbotController');

// Recebe as mensagens enviadas pelo Dialogflow.
router.post('/webhook', chatbotController.processarMensagem);

module.exports = router;
