const express = require('express');
const router = express.Router();

const comodosController = require('../controllers/comodosController');

// Lista todos os cômodos.
router.get('/', comodosController.listarComodos);

// Consulta um cômodo específico pelo nome.
router.get('/:nome', comodosController.obterComodo);

module.exports = router;
