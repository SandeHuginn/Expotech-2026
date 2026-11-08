
const { analisarConsumo } = require('../services/machineLearningService');

// Recebe a solicitação de análise de consumo.
async function analisar(req, res) {
    try {
        const { aparelho, consumos } = req.body;

        // Verifica se os dados obrigatórios foram enviados.
        if (!aparelho || !Array.isArray(consumos) || consumos.length === 0) {
            return res.status(400).json({
                erro: 'Informe o aparelho e uma lista de consumos.'
            });
        }

        // Solicita a análise ao serviço de Machine Learning.
        const resultado = await analisarConsumo(aparelho, consumos);

        return res.status(200).json(resultado);

    } catch (erro) {
        console.error('Erro no controller de Machine Learning:', erro.message);

        return res.status(500).json({
            erro: 'Não foi possível realizar a análise de consumo.'
        });
    }
}

module.exports = {
    analisar
};
