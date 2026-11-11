
const { listarAparelhos } = require('./aparelhosService');
const { obterTarifa } = require('./dashboardService');

function normalizarNome(nome) {
    return nome
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

async function listarComodos() {
    const aparelhos = await listarAparelhos();
    const tarifa = await obterTarifa();

    const comodosMap = new Map();

    aparelhos.forEach(aparelho => {
        const nomeComodo = aparelho.comodo.trim();
        const chave = normalizarNome(nomeComodo);

        if (!comodosMap.has(chave)) {
            comodosMap.set(chave, {
                nome: nomeComodo,
                quantidadeAparelhos: 0,
                consumoTotalKwh: 0,
                aparelhos: []
            });
        }

        const comodo = comodosMap.get(chave);

        comodo.quantidadeAparelhos++;
        comodo.consumoTotalKwh += aparelho.consumoKwh;
        comodo.aparelhos.push(aparelho);
    });

    return Array.from(comodosMap.values())
        .map(comodo => ({
            ...comodo,
            consumoTotalKwh: Number(
                comodo.consumoTotalKwh.toFixed(2)
            ),
            gastoEstimadoReais: Number(
                (comodo.consumoTotalKwh * tarifa).toFixed(2)
            )
        }))
        .sort((a, b) =>
            a.nome.localeCompare(b.nome, 'pt-BR')
        );
}

async function obterComodoPorNome(nome) {
    const comodos = await listarComodos();

    return comodos.find(
        comodo =>
            normalizarNome(comodo.nome) === normalizarNome(nome)
    ) || null;
}

module.exports = {
    listarComodos,
    obterComodoPorNome
};
