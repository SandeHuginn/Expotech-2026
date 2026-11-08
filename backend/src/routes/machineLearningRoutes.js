
const express = require('express');
const router = express.Router();

const machineLearningController = require('../controllers/machineLearningController');

// Solicita a análise de consumo de um aparelho.
router.post('/analisar-consumo', machineLearningController.analisar);

module.exports = router;
