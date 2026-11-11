
const machineLearningService =
    require('../services/machineLearningService');

async function analisar(req, res) {
    try {
        const {
            aparelhoId,
            aparelho,
            consumos
        } = req.body || {};

        let nomeAparelho = aparelho;
        let listaConsumos = consumos;

        // Se informar ID, consulta o histórico no MySQL.
        if (aparelhoId !== undefined) {
            const id = Number(aparelhoId);

            if (!Number.isSafeInteger(id) || id <= 0) {
                return res.status(400).json({
                    erro: 'ID do aparelho inválido.'
                });
            }

            const historico =
                await machineLearningService.buscarHistorico(id);

            if (!historico) {
                return res.status(404).json({
                    erro: 'Aparelho não encontrado.'
                });
            }

            nomeAparelho = historico.aparelho;
            listaConsumos = historico.consumos;
        }

        // Validação dos dados recebidos.
        if (
            typeof nomeAparelho !== 'string' ||
            !nomeAparelho.trim() ||
            !Array.isArray(listaConsumos) ||
            listaConsumos.length < 5 ||
            listaConsumos.some(valor =>
                typeof valor !== 'number' ||
                !Number.isFinite(valor) ||
                valor < 0
            )
        ) {
            return res.status(400).json({
                erro: 'Informe um aparelho e pelo menos 5 consumos numéricos válidos.'
            });
        }

        const resultado =
            await machineLearningService.analisarConsumo(
                nomeAparelho,
                listaConsumos
            );

        return res.status(200).json(resultado);

    } catch (erro) {
        console.error('Erro no Machine Learning:', erro);

        return res.status(502).json({
            erro: 'Falha ao consultar o banco ou a API Python.'
        });
    }
}

module.exports = {
    analisar
};
