// Importa a conexão com o banco de dados.
const conexao = require('../config/database');

// Converte os dados recebidos do MySQL para o formato utilizado pela API.
function formatarAparelho(aparelho) {
    if (!aparelho) {
        return null;
    }

    return {
        id: aparelho.id,
        nome: aparelho.nome,
        comodo: aparelho.comodo,
        consumoKwh: Number(aparelho.consumo_kwh)
    };
}

// READ: consulta os três aparelhos com maior consumo.
async function obterRankingAparelhos() {
    const [linhas] = await conexao.query(`
        SELECT id, nome, comodo, consumo_kwh
        FROM aparelhos
        ORDER BY consumo_kwh DESC
        LIMIT 3
    `);

    return linhas.map(formatarAparelho);
}

// READ: consulta todos os aparelhos cadastrados.
async function listarAparelhos() {
    const [linhas] = await conexao.query(`
        SELECT id, nome, comodo, consumo_kwh
        FROM aparelhos
        ORDER BY id
    `);

    return linhas.map(formatarAparelho);
}

// READ: procura um aparelho específico pelo ID.
async function obterAparelhoPorId(id) {
    const [linhas] = await conexao.execute(
        `SELECT id, nome, comodo, consumo_kwh
         FROM aparelhos
         WHERE id = ?`,
        [id]
    );

    return formatarAparelho(linhas[0]);
}

// CREATE: insere um novo aparelho no banco de dados.
async function criarAparelho(aparelho) {
    const [resultado] = await conexao.execute(
        `INSERT INTO aparelhos (nome, comodo, consumo_kwh)
         VALUES (?, ?, ?)`,
        [
            aparelho.nome,
            aparelho.comodo,
            aparelho.consumoKwh
        ]
    );

    // Consulta o aparelho recém-cadastrado para retornar seus dados.
    return obterAparelhoPorId(resultado.insertId);
}

// UPDATE: atualiza os dados de um aparelho existente.
async function atualizarAparelho(id, aparelho) {
    await conexao.execute(
        `UPDATE aparelhos
         SET nome = ?, comodo = ?, consumo_kwh = ?
         WHERE id = ?`,
        [
            aparelho.nome,
            aparelho.comodo,
            aparelho.consumoKwh,
            id
        ]
    );

    // Retorna os dados atualizados ou null se o ID não existir.
    return obterAparelhoPorId(id);
}

// DELETE: exclui um aparelho pelo ID.
async function excluirAparelho(id) {
    const [resultado] = await conexao.execute(
        'DELETE FROM aparelhos WHERE id = ?',
        [id]
    );

    // Retorna true se algum registro foi excluído.
    return resultado.affectedRows > 0;
}

// Exporta as funções para utilização pelo controller.
module.exports = {
    obterRankingAparelhos,
    listarAparelhos,
    obterAparelhoPorId,
    criarAparelho,
    atualizarAparelho,
    excluirAparelho
};