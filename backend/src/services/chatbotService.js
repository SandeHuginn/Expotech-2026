const dialogflow = require('@google-cloud/dialogflow');
const { randomUUID } = require('crypto');

// Cliente responsável pela comunicação com o Dialogflow ES.
const sessionsClient = new dialogflow.SessionsClient();

// Envia uma mensagem ao agente e retorna sua resposta.
async function enviarMensagem(mensagem, sessionId) {
    const projectId = process.env.DIALOGFLOW_PROJECT_ID;

    if (!projectId) {
        throw new Error('ID do projeto Dialogflow não configurado.');
    }

    // Mantém a sessão da conversa ou cria uma nova.
    const identificadorSessao = sessionId || randomUUID();

    // Identifica a sessão dentro do projeto Google Cloud.
    const session = sessionsClient.projectAgentSessionPath(
        projectId,
        identificadorSessao
    );

    // Prepara a mensagem para o Dialogflow.
    const request = {
        session,
        queryInput: {
            text: {
                text: mensagem,
                languageCode: 'pt-BR'
            }
        }
    };

    // Envia a mensagem e aguarda a resposta do agente.
    const [response] = await sessionsClient.detectIntent(request);

    const resultado = response.queryResult;

    return {
        resposta: resultado.fulfillmentText ||
            'Não consegui formular uma resposta para essa mensagem.',
        intencao: resultado.intent?.displayName || null,
        sessionId: identificadorSessao
    };
}

module.exports = { enviarMensagem };
