
const conexao = require('../config/database');

const API_MACHINE_LEARNING =
    process.env.ML_API_URL || 'http://127.0.0.1:5000';

// Busca os consumos históricos de um aparelho.
async function buscarHistorico(aparelhoId) {
    const [aparelhos] = await conexao.execute(
        'SELECT id, nome FROM aparelhos WHERE id = ?',
        [aparelhoId]
    );

    if (aparelhos.length === 0) {
        return null;
    }

    const [leituras] = await conexao.execute(`
        SELECT data_leitura, consumo_kwh
        FROM leituras_consumo
        WHERE aparelho_id = ?
        ORDER BY data_leitura ASC
    `, [aparelhoId]);

    return {
        aparelho: aparelhos[0].nome,
        consumos: leituras.map(
            leitura => Number(leitura.consumo_kwh)
        )
    };
}

// Envia os dados para a API Python.
async function analisarConsumo(aparelho, consumos) {
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
            }),
            signal: AbortSignal.timeout(15000)
        }
    );

    const resultado = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            resultado.erro || 'Erro na API de Machine Learning.'
        );
    }

    return resultado;
}

module.exports = {
    analisarConsumo,
    buscarHistorico
};
