const dashboardData = require('../data/dashboardData');

function obterResumoConsumo() {
    const consumoAtual = dashboardData.consumoAtualKwh;
    const consumoAnterior = dashboardData.consumoAnteriorKwh;
    const tarifa = dashboardData.tarifaPorKwh;

    const gastoAtual = consumoAtual * tarifa;
    const gastoAnterior = consumoAnterior * tarifa;

    const diferencaConsumo = consumoAtual - consumoAnterior;

    const variacaoPercentual =
        (diferencaConsumo / consumoAnterior) * 100;

    return {
        periodo: dashboardData.periodo,

        consumo: {
            atualKwh: consumoAtual,
            anteriorKwh: consumoAnterior,
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