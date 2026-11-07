const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');

// Rota para consultar o resumo do consumo
router.get('/consumo', dashboardController.obterResumoConsumo);

module.exports = router;