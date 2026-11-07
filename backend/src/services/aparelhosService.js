
const aparelhosData = require('../data/aparelhosData');

// Retorna os três aparelhos com maior consumo
function obterRankingAparelhos() {

    // Cria uma cópia dos dados para não alterar a lista original
    const aparelhosOrdenados = [...aparelhosData];

    // Ordena os aparelhos pelo consumo, do maior para o menor
    aparelhosOrdenados.sort((a, b) => {
        return b.consumoKwh - a.consumoKwh;
    });

    // Seleciona somente os três primeiros
    const ranking = aparelhosOrdenados.slice(0, 3);

    return ranking;
}

module.exports = {
    obterRankingAparelhos
};
