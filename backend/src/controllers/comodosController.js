const comodosService = require('../services/comodosService');

// Lista todos os cômodos.
async function listarComodos(req, res) {
    try {
        const comodos = await comodosService.listarComodos();

        return res.status(200).json({
            quantidade: comodos.length,
            comodos
        });
    } catch (error) {
        console.error('Erro ao listar cômodos:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao listar os cômodos.'
        });
    }
}

// Consulta um cômodo específico pelo nome.
async function obterComodo(req, res) {
    const { nome } = req.params;

    if (!nome || !nome.trim()) {
        return res.status(400).json({
            mensagem: 'O nome do cômodo é obrigatório.'
        });
    }

    try {
        const comodo = await comodosService.obterComodoPorNome(nome);

        if (!comodo) {
            return res.status(404).json({
                mensagem: 'Cômodo não encontrado.'
            });
        }

        return res.status(200).json(comodo);
    } catch (error) {
        console.error('Erro ao consultar cômodo:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao consultar o cômodo.'
        });
    }
}

module.exports = {
    listarComodos,
    obterComodo
};
