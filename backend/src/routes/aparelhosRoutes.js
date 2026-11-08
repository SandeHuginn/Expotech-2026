const express = require('express');
const router = express.Router();

// Importa as funções responsáveis por atender às requisições.
const aparelhosController = require('../controllers/aparelhosController');

// GET: retorna os três aparelhos de maior consumo.
router.get('/', aparelhosController.obterRankingAparelhos);

// GET: retorna todos os aparelhos.
// Deve ficar antes de /:id para evitar conflito de rotas.
router.get('/todos', aparelhosController.listarAparelhos);

// GET: consulta um aparelho pelo ID.
router.get('/:id', aparelhosController.obterAparelho);

// POST: cadastra um novo aparelho.
router.post('/', aparelhosController.criarAparelho);

// PUT: atualiza um aparelho existente.
router.put('/:id', aparelhosController.atualizarAparelho);

// DELETE: remove um aparelho pelo ID.
router.delete('/:id', aparelhosController.excluirAparelho);

// Exporta as rotas para o servidor.
module.exports = router;