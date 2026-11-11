
const dashboardService = require('../services/dashboardService');
const comodosService = require('../services/comodosService');

// Recebe as mensagens enviadas pelo Dialogflow.
async function processarMensagem(req, res) {

    // Extrai a intenção identificada pelo Dialogflow.
    const nomeIntencao = req.body?.queryResult?.intent?.displayName;

    // Extrai os parâmetros identificados na pergunta.
    const parametros = req.body?.queryResult?.parameters || {};

    // Verifica se o Dialogflow enviou uma intenção válida.
    if (!nomeIntencao) {
        return res.status(400).json({
            fulfillmentText: 'Não consegui identificar sua solicitação.'
        });
    }

    try {

        // Consulta o consumo geral da residência.
        if (nomeIntencao === 'ConsultarConsumoGeral') {

            const resumo = await dashboardService.obterResumoConsumo();

            const resposta =
                `O consumo atual da residência é de ${resumo.consumo.atualKwh} kWh. ` +
                `O gasto estimado é de R$ ${resumo.gasto.atualReais.toFixed(2)}.`;

            return res.status(200).json({
                fulfillmentText: resposta
            });
        }

        // Consulta o consumo de um cômodo específico.
        if (nomeIntencao === 'ConsultarConsumoComodo') {

            const nomeComodo = parametros.comodo;

            // Verifica se o nome do cômodo foi informado.
            if (!nomeComodo) {
                return res.status(200).json({
                    fulfillmentText: 'Não consegui identificar o cômodo que você deseja consultar.'
                });
            }

            // Busca os dados do cômodo.
            const comodo = await comodosService.obterComodoPorNome(nomeComodo);

            // Verifica se o cômodo existe.
            if (!comodo) {
                return res.status(200).json({
                    fulfillmentText: `Não encontrei informações sobre o cômodo ${nomeComodo}.`
                });
            }

            // Monta a resposta com os dados encontrados.

            const resposta =
                `O cômodo ${comodo.nome} possui ${comodo.quantidadeAparelhos} ` +
                `${comodo.quantidadeAparelhos === 1 ? 'aparelho' : 'aparelhos'}. ` +
                `O consumo total é de ${comodo.consumoTotalKwh} kWh, ` +
                `com gasto estimado de R$ ${comodo.gastoEstimadoReais.toFixed(2)}.`;


            return res.status(200).json({
                fulfillmentText: resposta
            });
        }

        // Responde quando a intenção ainda não foi implementada.
        return res.status(200).json({
            fulfillmentText: 'Ainda não consigo atender a essa solicitação.'
        });

    } catch (error) {

        console.error('Erro ao processar mensagem do chatbot:', error);

        return res.status(500).json({
            fulfillmentText: 'Desculpe, não consegui consultar essas informações no momento.'
        });
    }
}

module.exports = {
    processarMensagem
};
