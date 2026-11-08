// Importa a conexão com o MySQL.
const conexao = require('../config/database');

// Importa os valores simulados ainda utilizados pelo dashboard.
const dashboardData = require('../data/dashboardData');

// Calcula os indicadores de consumo e gasto apresentados no dashboard.
async function obterResumoConsumo() {

    // Soma o consumo de todos os aparelhos cadastrados no banco.
    const [linhas] = await conexao.query(`
        SELECT COALESCE(SUM(consumo_kwh), 0) AS consumoAtualKwh
        FROM aparelhos
    `);

    const consumoAtual = Number(linhas[0].consumoAtualKwh);

    // Valores de referência que ainda são simulados.
    const consumoAnterior = dashboardData.consumoAnteriorKwh;
    const tarifa = dashboardData.tarifaPorKwh;

    // Calcula o gasto estimado utilizando a tarifa configurada.
    const gastoAtual = consumoAtual * tarifa;
    const gastoAnterior = consumoAnterior * tarifa;

    // Calcula a diferença entre consumo atual e anterior.
    const diferencaConsumo = consumoAtual - consumoAnterior;

    // Evita divisão por zero no cálculo percentual.
    const variacaoPercentual = consumoAnterior === 0
        ? 0
        : (diferencaConsumo / consumoAnterior) * 100;

    // Retorna os dados organizados para o frontend.
    return {
        periodo: dashboardData.periodo,

        consumo: {
            atualKwh: Number(consumoAtual.toFixed(2)),
            anteriorKwh: Number(consumoAnterior.toFixed(2)),
            diferencaKwh: Number(diferencaConsumo.toFixed(2)),
            variacaoPercentual: Number(variacaoPercentual.toFixed(2))
        },

        gasto: {
            atualReais: Number(gastoAtual.toFixed(2)),
            anteriorReais: Number(gastoAnterior.toFixed(2))
        }
    };
}

module.exports = {
    obterResumoConsumo
};