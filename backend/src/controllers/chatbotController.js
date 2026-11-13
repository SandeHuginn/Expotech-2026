const dashboardService = require('../services/dashboardService');
const comodosService = require('../services/comodosService');
const chatbotService = require('../services/chatbotService');

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

        // Consulta o gasto de um cômodo mencionado anteriormente.
        if (nomeIntencao === 'ConsultarGastoComodo') {

            const nomeComodo = parametros.comodo;

            // Verifica se o contexto forneceu o nome do cômodo.
            if (!nomeComodo) {
                return res.status(200).json({
                    fulfillmentText: 'Não consegui identificar qual cômodo você deseja consultar.'
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

            // Retorna somente o gasto estimado.
            const resposta =
                `O gasto estimado do cômodo ${comodo.nome} é de ` +
                `R$ ${comodo.gastoEstimadoReais.toFixed(2)}.`;

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

// Recebe mensagens enviadas pelo frontend e consulta o Dialogflow.
async function enviarMensagem(req, res) {
    const { mensagem, sessionId } = req.body;

    // Verifica se a mensagem foi informada corretamente.
    if (!mensagem || typeof mensagem !== 'string' || !mensagem.trim()) {
        return res.status(400).json({
            mensagem: 'Digite uma mensagem antes de enviar.'
        });
    }

    try {
        const resultado = await chatbotService.enviarMensagem(
            mensagem.trim(),
            sessionId
        );

        return res.status(200).json(resultado);

    } catch (error) {
        console.error('Erro ao comunicar com o Dialogflow:', error);

        return res.status(500).json({
            mensagem: 'Não foi possível obter uma resposta do chatbot.'
        });
    }
}

module.exports = {
    processarMensagem,
    enviarMensagem
};