
const express = require('express');
const router = express.Router();

const chatbotController = require('../controllers/chatbotController');

// Recebe as mensagens enviadas pelo Dialogflow.
router.post('/webhook', chatbotController.processarMensagem);

// Recebe mensagens enviadas pelo frontend.
router.post('/mensagem', chatbotController.enviarMensagem);

module.exports = router;
