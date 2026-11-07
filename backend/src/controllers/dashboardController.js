const dashboardService = require('../services/dashboardService');

function obterResumoConsumo(req, res) {
    try {
        const resumo = dashboardService.obterResumoConsumo();

        return res.status(200).json(resumo);

    } catch (error) {
        console.error('Erro ao obter resumo do consumo:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao obter os dados do dashboard.'
        });
    }
}

module.exports = {
    obterResumoConsumo
};