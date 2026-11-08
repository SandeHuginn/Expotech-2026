const express = require('express');
const router = express.Router();

// Importa o controller responsável pelos indicadores.
const dashboardController = require('../controllers/dashboardController');

// GET: fornece os dados de consumo utilizados pelo dashboard.
router.get('/consumo', dashboardController.obterResumoConsumo);

module.exports = router;