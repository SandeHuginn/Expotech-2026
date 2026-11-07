const express = require('express');
const router = express.Router();

const aparelhosController = require('../controllers/aparelhosController');

// Rota para consultar o ranking dos aparelhos
router.get('/', aparelhosController.obterRankingAparelhos);

module.exports = router;
