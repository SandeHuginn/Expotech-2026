// Importa o serviço responsável pelos cálculos do dashboard.
const dashboardService = require('../services/dashboardService');

// Recebe a requisição e retorna os indicadores de consumo.
async function obterResumoConsumo(req, res) {
    try {
        // Aguarda a consulta ao banco e os cálculos do serviço.
        const resumo = await dashboardService.obterResumoConsumo();

        // Envia os dados ao frontend em formato JSON.
        return res.status(200).json(resumo);

    } catch (error) {
        // Registra o erro no terminal do servidor.
        console.error('Erro ao obter resumo do consumo:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao obter os dados do dashboard.'
        });
    }
}

module.exports = {
    obterResumoConsumo
};