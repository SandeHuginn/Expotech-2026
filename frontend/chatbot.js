
const API_URL = 'http://localhost:3000/api/chatbot/mensagem';

// Elementos da página.
const campoMensagem = document.getElementById('campoMensagem');
const botaoEnviar = document.getElementById('botaoEnviar');
const chatConversa = document.getElementById('chatConversa');
const historicoMensagens = document.getElementById('historicoMensagens');

// Identificador que mantém a conversa na mesma sessão do Dialogflow.
let sessionId = null;

// Adiciona uma mensagem na área principal e no histórico.
function adicionarMensagem(texto, tipo) {
    const mensagem = document.createElement('div');

    mensagem.classList.add('mensagem', `mensagem-${tipo}`);

    // textContent evita interpretar o conteúdo como HTML.
    mensagem.textContent = texto;

    chatConversa.appendChild(mensagem);

    // Registra a mensagem no histórico.
    const registro = document.createElement('div');
    registro.textContent = `${tipo === 'usuario' ? 'Você' : 'Assistente'}: ${texto}`;

    historicoMensagens.appendChild(registro);

    // Mantém as mensagens mais recentes visíveis.
    chatConversa.scrollTop = chatConversa.scrollHeight;
    historicoMensagens.scrollTop = historicoMensagens.scrollHeight;
}

// Envia a mensagem para o backend.
async function enviarMensagem() {
    const mensagem = campoMensagem.value.trim();

    // Impede o envio de mensagens vazias.
    if (!mensagem) {
        return;
    }

    adicionarMensagem(mensagem, 'usuario');

    campoMensagem.value = '';
    botaoEnviar.disabled = true;

    try {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mensagem: mensagem,
                sessionId: sessionId
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || 'Erro ao enviar mensagem.');
        }

        // Guarda o identificador da sessão para as próximas mensagens.
        sessionId = dados.sessionId;

        adicionarMensagem(dados.resposta, 'bot');

    } catch (erro) {
        console.error('Erro na comunicação com o chatbot:', erro);

        adicionarMensagem(
            'Não foi possível comunicar com o assistente. Verifique se o backend está funcionando.',
            'bot'
        );

    } finally {
        botaoEnviar.disabled = false;
        campoMensagem.focus();
    }
}

// Envia ao clicar no botão.
botaoEnviar.addEventListener('click', enviarMensagem);

// Também permite enviar pressionando Enter.
campoMensagem.addEventListener('keydown', function(evento) {
    if (evento.key === 'Enter') {
        enviarMensagem();
    }
});