const aparelhosService = require('../services/aparelhosService');

// Verifica se o ID informado na URL é um número inteiro positivo.
function validarId(idRecebido) {
    const id = Number(idRecebido);

    if (!Number.isInteger(id) || id <= 0) {
        return null;
    }

    return id;
}

// Verifica se os dados enviados para cadastrar ou atualizar
// um aparelho possuem nome, cômodo e consumo válidos.
function validarDadosAparelho(dados) {
    const nome = typeof dados.nome === 'string'
        ? dados.nome.trim()
        : '';

    const comodo = typeof dados.comodo === 'string'
        ? dados.comodo.trim()
        : '';

    const consumoKwh = Number(dados.consumoKwh);

    if (
        !nome ||
        !comodo ||
        dados.consumoKwh === undefined ||
        dados.consumoKwh === null ||
        !Number.isFinite(consumoKwh) ||
        consumoKwh < 0
    ) {
        return null;
    }

    return {
        nome,
        comodo,
        consumoKwh
    };
}

// READ: retorna o ranking dos três aparelhos de maior consumo.
async function obterRankingAparelhos(req, res) {
    try {
        const ranking = await aparelhosService.obterRankingAparelhos();

        return res.status(200).json({
            quantidade: ranking.length,
            aparelhos: ranking
        });

    } catch (error) {
        console.error('Erro ao obter ranking de aparelhos:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao obter o ranking de aparelhos.'
        });
    }
}

// READ: retorna todos os aparelhos cadastrados.
async function listarAparelhos(req, res) {
    try {
        const aparelhos = await aparelhosService.listarAparelhos();

        return res.status(200).json({
            quantidade: aparelhos.length,
            aparelhos
        });

    } catch (error) {
        console.error('Erro ao listar aparelhos:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao listar os aparelhos.'
        });
    }
}

// READ: consulta um aparelho específico pelo ID.
async function obterAparelho(req, res) {
    const id = validarId(req.params.id);

    if (id === null) {
        return res.status(400).json({
            mensagem: 'ID inválido.'
        });
    }

    try {
        const aparelho = await aparelhosService.obterAparelhoPorId(id);

        if (!aparelho) {
            return res.status(404).json({
                mensagem: 'Aparelho não encontrado.'
            });
        }

        return res.status(200).json(aparelho);

    } catch (error) {
        console.error('Erro ao consultar aparelho:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao consultar o aparelho.'
        });
    }
}

// CREATE: recebe os dados enviados por POST e cadastra um aparelho.
async function criarAparelho(req, res) {
    const dados = validarDadosAparelho(req.body);

    if (!dados) {
        return res.status(400).json({
            mensagem: 'Informe nome, cômodo e consumoKwh válido (maior ou igual a zero).'
        });
    }

    try {
        const aparelho = await aparelhosService.criarAparelho(dados);

        return res.status(201).json({
            mensagem: 'Aparelho cadastrado com sucesso.',
            aparelho
        });

    } catch (error) {
        console.error('Erro ao cadastrar aparelho:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao cadastrar o aparelho.'
        });
    }
}

// UPDATE: recebe o ID e os novos dados para atualizar o aparelho.
async function atualizarAparelho(req, res) {
    const id = validarId(req.params.id);
    const dados = validarDadosAparelho(req.body);

    if (id === null) {
        return res.status(400).json({
            mensagem: 'ID inválido.'
        });
    }

    if (!dados) {
        return res.status(400).json({
            mensagem: 'Informe nome, cômodo e consumoKwh válido (maior ou igual a zero).'
        });
    }

    try {
        const aparelho = await aparelhosService.atualizarAparelho(id, dados);

        if (!aparelho) {
            return res.status(404).json({
                mensagem: 'Aparelho não encontrado.'
            });
        }

        return res.status(200).json({
            mensagem: 'Aparelho atualizado com sucesso.',
            aparelho
        });

    } catch (error) {
        console.error('Erro ao atualizar aparelho:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao atualizar o aparelho.'
        });
    }
}

// DELETE: remove o aparelho correspondente ao ID informado.
async function excluirAparelho(req, res) {
    const id = validarId(req.params.id);

    if (id === null) {
        return res.status(400).json({
            mensagem: 'ID inválido.'
        });
    }

    try {
        const excluido = await aparelhosService.excluirAparelho(id);

        if (!excluido) {
            return res.status(404).json({
                mensagem: 'Aparelho não encontrado.'
            });
        }

        return res.status(200).json({
            mensagem: 'Aparelho excluído com sucesso.'
        });

    } catch (error) {
        console.error('Erro ao excluir aparelho:', error);

        return res.status(500).json({
            mensagem: 'Erro interno ao excluir o aparelho.'
        });
    }
}

// Disponibiliza as funções para o arquivo de rotas.
module.exports = {
    obterRankingAparelhos,
    listarAparelhos,
    obterAparelho,
    criarAparelho,
    atualizarAparelho,
    excluirAparelho
};