
const API_MACHINE_LEARNING = 'http://127.0.0.1:5000';

// Envia os consumos de um aparelho para a API Python.
async function analisarConsumo(aparelho, consumos) {
    try {
        // Envia os dados para o serviço Python.
        const resposta = await fetch(
            `${API_MACHINE_LEARNING}/api/analisar-consumo`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    aparelho,
                    consumos
                })
            }
        );

        // Verifica se a API Python respondeu corretamente.
        if (!resposta.ok) {
            throw new Error(`Erro na API de Machine Learning: ${resposta.status}`);
        }

        // Converte a resposta JSON em objeto JavaScript.
        const resultado = await resposta.json();

        return resultado;

    } catch (erro) {
        console.error('Erro ao analisar consumo:', erro.message);
        throw erro;
    }
}

module.exports = {
    analisarConsumo
};
