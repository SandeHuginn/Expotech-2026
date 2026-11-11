
const conexao = require('../config/database');

// Consulta a tarifa configurada no MySQL.
async function obterTarifa() {
    const [linhas] = await conexao.query(`
        SELECT tarifa_kwh
        FROM configuracoes_energia
        WHERE id = 1
    `);

    if (linhas.length === 0) {
        throw new Error('Tarifa de energia não configurada.');
    }

    return Number(linhas[0].tarifa_kwh);
}

// Calcula os indicadores de consumo e gasto.
async function obterResumoConsumo() {
    const tarifa = await obterTarifa();

    // Consumo cadastrado dos aparelhos, sem período definido.
    const [aparelhos] = await conexao.query(`
        SELECT COALESCE(SUM(consumo_kwh), 0) AS total
        FROM aparelhos
    `);

    // Histórico: últimos 30 dias e 30 dias anteriores.
    const [leituras] = await conexao.query(`
        SELECT
            COUNT(CASE
                WHEN data_leitura >= CURDATE() - INTERVAL 29 DAY
                THEN 1 END
            ) AS quantidadeAtual,

            COUNT(CASE
                WHEN data_leitura >= CURDATE() - INTERVAL 59 DAY
                 AND data_leitura < CURDATE() - INTERVAL 29 DAY
                THEN 1 END
            ) AS quantidadeAnterior,

            COALESCE(SUM(CASE
                WHEN data_leitura >= CURDATE() - INTERVAL 29 DAY
                THEN consumo_kwh ELSE 0 END
            ), 0) AS consumoAtual,

            COALESCE(SUM(CASE
                WHEN data_leitura >= CURDATE() - INTERVAL 59 DAY
                 AND data_leitura < CURDATE() - INTERVAL 29 DAY
                THEN consumo_kwh ELSE 0 END
            ), 0) AS consumoAnterior
        FROM leituras_consumo
        WHERE data_leitura BETWEEN
            CURDATE() - INTERVAL 59 DAY AND CURDATE()
    `);

    const historicoDisponivel =
        Number(leituras[0].quantidadeAtual) > 0;

    const anteriorDisponivel =
        Number(leituras[0].quantidadeAnterior) > 0;

    const consumoAtual = historicoDisponivel
        ? Number(leituras[0].consumoAtual)
        : Number(aparelhos[0].total);

    const consumoAnterior = anteriorDisponivel
        ? Number(leituras[0].consumoAnterior)
        : null;

    const diferenca = consumoAnterior === null
        ? null
        : consumoAtual - consumoAnterior;

    const variacao = consumoAnterior === null ||
        consumoAnterior === 0
        ? null
        : (diferenca / consumoAnterior) * 100;

    const arredondar = valor =>
        valor === null ? null : Number(valor.toFixed(2));

    return {
        periodo: historicoDisponivel
            ? 'Últimos 30 dias'
            : 'Consumo cadastrado (sem histórico)',

        historicoDisponivel,
        comparacaoDisponivel:
            historicoDisponivel && anteriorDisponivel,

        consumo: {
            atualKwh: arredondar(consumoAtual),
            anteriorKwh: arredondar(consumoAnterior),
            diferencaKwh: arredondar(diferenca),
            variacaoPercentual: arredondar(variacao)
        },

        gasto: {
            atualReais: arredondar(consumoAtual * tarifa),
            anteriorReais: consumoAnterior === null
                ? null
                : arredondar(consumoAnterior * tarifa)
        }
    };
}

module.exports = {
    obterResumoConsumo,
    obterTarifa
};
