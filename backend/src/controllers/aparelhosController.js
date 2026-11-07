
const aparelhosService = require('../services/aparelhosService');

function obterRankingAparelhos(req, res) {
    try {
        const ranking = aparelhosService.obterRankingAparelhos();

        return res.status(200).json({
            quantidade: ranking.length,
            aparelhos: ranking
        });

    } catch (error) {
        console.error('Erro ao obter ranking de aparelhos:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao obter o ranking de aparelhos.'
        });
    }
}

module.exports = {
    obterRankingAparelhos
};
