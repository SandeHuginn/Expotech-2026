
// Endereço da API do backend
const API_URL = 'http://localhost:3000/api/dashboard/consumo';

// Endereço da API do ranking de aparelhos
const APARELHOS_API_URL = 'http://localhost:3000/api/dashboard/aparelhos';

// Busca os dados do backend
async function carregarResumoConsumo() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        console.log('Dados recebidos do backend:');
        console.log(dados);

        // Atualiza o gráfico
        atualizarGrafico(
            [
                dados.consumo.atualKwh,
                dados.consumo.anteriorKwh
            ],
            [
                "#3b82f6",
                "#06b6d4"
            ]
        );

        // Atualiza os indicadores
        atualizarIndicadores(dados);

        return dados;

    } catch (erro) {
        console.error('Não foi possível carregar os dados:', erro);
    }
}

// Atualiza os valores numéricos da dashboard
function atualizarIndicadores(dados) {
    const consumoAtual = document.getElementById("consumoAtual");
    const gastoAtual = document.getElementById("gastoAtual");
    const variacaoConsumo = document.getElementById("variacaoConsumo");

    consumoAtual.textContent =
        `${dados.consumo.atualKwh.toLocaleString('pt-BR')} kWh`;

    gastoAtual.textContent =
        dados.gasto.atualReais.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

    const variacao = dados.consumo.variacaoPercentual;
    const sinal = variacao > 0 ? '+' : '';

    variacaoConsumo.textContent =
        `${sinal}${variacao.toLocaleString('pt-BR')}%`;


    // Atualiza os valores apresentados na legenda do gráfico geral.
    const consumoAtualGrafico = dados.consumo.atualKwh;
    const consumoAnteriorGrafico = dados.consumo.anteriorKwh;

    const totalConsumo = consumoAtualGrafico + consumoAnteriorGrafico;

    const percentualAtual = (consumoAtualGrafico / totalConsumo) * 100;
    const percentualAnterior = (consumoAnteriorGrafico / totalConsumo) * 100;

    document.getElementById('valorConsumoAtual').textContent =
        `${consumoAtualGrafico.toLocaleString('pt-BR')} kWh`;

    document.getElementById('percentualConsumoAtual').textContent =
        `${percentualAtual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`;

    document.getElementById('valorConsumoAnterior').textContent =
        `${consumoAnteriorGrafico.toLocaleString('pt-BR')} kWh`;

    document.getElementById('percentualConsumoAnterior').textContent =
        `${percentualAnterior.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`;

}

// Mantém o gráfico original
function atualizarGrafico(valores, cores) {
    const total = valores.reduce((acumulado, valor) => acumulado + valor, 0);

    // Evita divisão por zero caso não existam dados.
    if (total <= 0) {
        return;
    }

    const percentualAtual = (valores[0] / total) * 100;

    const elementoGrafico = document.getElementById("graficoPizza");

    if (elementoGrafico) {
        elementoGrafico.style.background = `
            conic-gradient(
                ${cores[0]} 0% ${percentualAtual}%,
                ${cores[1]} ${percentualAtual}% 100%
            )
        `;
    }
}



// Atualização manual do gráfico original
function mudarDados() {
    carregarResumoConsumo();
}

/* --- LÓGICA DO MENU SUSPENSO --- */

function toggleMenu(event, menuId) {
    event.stopPropagation();

    const menus = document.querySelectorAll('.dropdown-menu');

    menus.forEach(menu => {
        if (menu.id !== menuId) {
            menu.classList.remove('show');
        }
    });

    const menuAtual = document.getElementById(menuId);

    if (menuAtual) {
        menuAtual.classList.toggle('show');
    }
}

// Fecha os menus ao clicar fora deles
window.addEventListener('click', function() {
    const menus = document.querySelectorAll('.dropdown-menu');

    menus.forEach(menu => {
        menu.classList.remove('show');
    });
});


// Busca e apresenta o ranking dos aparelhos
async function carregarRankingAparelhos() {
    try {
        const resposta = await fetch(APARELHOS_API_URL);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        console.log('Ranking de aparelhos recebido:');
        console.log(dados);

        atualizarRankingAparelhos(dados.aparelhos);

    } catch (erro) {
        console.error('Não foi possível carregar o ranking:', erro);
    }
}

// Atualiza os aparelhos apresentados na dashboard
function atualizarRankingAparelhos(aparelhos) {
    const container = document.getElementById('rankingAparelhos');

    if (!container) {
        return;
    }

    // Limpa o conteúdo anterior
    container.innerHTML = '';

    aparelhos.forEach((aparelho, indice) => {

        // Cria o espaço visual de cada aparelho
        const elemento = document.createElement('div');
        elemento.classList.add('div_critico');

        // Cria a posição no ranking
        const posicao = document.createElement('strong');
        posicao.textContent = `${indice + 1}º lugar`;

        // Cria o nome do aparelho
        const nome = document.createElement('span');
        nome.textContent = aparelho.nome;

        // Cria o consumo do aparelho
        const consumo = document.createElement('span');
        consumo.textContent =
            `${aparelho.consumoKwh.toLocaleString('pt-BR')} kWh`;

        // Adiciona as informações ao elemento
        elemento.appendChild(posicao);
        elemento.appendChild(nome);
        elemento.appendChild(consumo);

        // Adiciona o aparelho à dashboard
        container.appendChild(elemento);
    });
}


// Inicia a comunicação com o backend
window.addEventListener('DOMContentLoaded', carregarResumoConsumo);
window.addEventListener('DOMContentLoaded', carregarRankingAparelhos);

// Consulta os dados de um cômodo específico no backend.
async function selecionarComodo(nomeComodo) {
    try {
        const resposta = await fetch(
            `http://localhost:3000/api/comodos/${encodeURIComponent(nomeComodo)}`
        );

        if (resposta.status === 404) {
            const area = document.getElementById('areaGraficoIndividual');
            const lista = document.getElementById('listaEquipamentos');

            if (area) {
                area.innerHTML = `
                    <h3>Cômodo não cadastrado</h3>
                    <p>O cômodo ${nomeComodo} ainda não possui cadastro no sistema.</p>
                `;
            }

            if (lista) {
                lista.innerHTML = 'Nenhum equipamento disponível.';
            }

            console.warn(`Cômodo não cadastrado: ${nomeComodo}`);
            return;
}

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
}

        const dados = await resposta.json();

        console.log('Dados do cômodo selecionado:');
        console.log(dados);

        atualizarGraficoIndividual(dados);
        atualizarEquipamentos(dados.aparelhos);

    } catch (erro) {
        console.error('Não foi possível carregar o cômodo:', erro);
        alert('Não foi possível carregar os dados deste cômodo.');
    }
}


// Atualiza as informações do cômodo selecionado.

// Atualiza o gráfico individual do cômodo selecionado.
function atualizarGraficoIndividual(dados) {
    const area = document.getElementById('areaGraficoIndividual');

    if (!area) {
        return;
    }

    // Limpa as informações do cômodo anterior.
    area.innerHTML = '';

    // Cria o título.
    const titulo = document.createElement('h3');
    titulo.textContent = `Consumo de ${dados.nome}`;

    // Cria o resumo do consumo.
    const consumo = document.createElement('p');
    consumo.textContent =
        `Consumo total: ${dados.consumoTotalKwh.toLocaleString('pt-BR')} kWh`;

    // Cria o resumo do gasto.
    const gasto = document.createElement('p');
    gasto.textContent =
        `Gasto estimado: ${dados.gastoEstimadoReais.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })}`;

    // Cria a área do gráfico.
    const grafico = document.createElement('div');
    grafico.classList.add('grafico-barras');

    // Identifica o maior consumo para calcular as proporções.
    const maiorConsumo = Math.max(
        ...dados.aparelhos.map(aparelho => aparelho.consumoKwh),
        0
    );

    // Cria uma barra para cada aparelho.
    dados.aparelhos.forEach(aparelho => {
        const item = document.createElement('div');
        item.classList.add('item-grafico');

        const nome = document.createElement('span');
        nome.classList.add('nome-grafico');
        nome.textContent = aparelho.nome;

        const barraFundo = document.createElement('div');
        barraFundo.classList.add('barra-fundo');

        const barra = document.createElement('div');
        barra.classList.add('barra-consumo');

        // Calcula o tamanho proporcional da barra.
        const porcentagem = maiorConsumo > 0
            ? (aparelho.consumoKwh / maiorConsumo) * 100
            : 0;

        barra.style.width = `${porcentagem}%`;

        const valor = document.createElement('span');
        valor.classList.add('valor-grafico');
        valor.textContent =
            `${aparelho.consumoKwh.toLocaleString('pt-BR')} kWh`;

        barraFundo.appendChild(barra);

        item.appendChild(nome);
        item.appendChild(barraFundo);
        item.appendChild(valor);

        grafico.appendChild(item);
    });

    // Adiciona todos os elementos à página.
    area.appendChild(titulo);
    area.appendChild(consumo);
    area.appendChild(gasto);
    area.appendChild(grafico);
}


// Atualiza a lista de equipamentos do cômodo.
function atualizarEquipamentos(aparelhos) {
    const lista = document.getElementById('listaEquipamentos');

    if (!lista) {
        return;
    }

    // Remove os cartões anteriores.
    lista.innerHTML = '';

    // Verifica se existem equipamentos cadastrados.
    if (aparelhos.length === 0) {
        lista.textContent = 'Nenhum equipamento cadastrado neste cômodo.';
        return;
    }

    aparelhos.forEach(aparelho => {
        const cartao = document.createElement('div');
        cartao.classList.add('equipamentos_comodos_card');

        const nome = document.createElement('span');
        nome.classList.add('nome_equipamento');
        nome.textContent = aparelho.nome;

        const consumo = document.createElement('span');
        consumo.textContent =
            `${aparelho.consumoKwh.toLocaleString('pt-BR')} kWh`;

        cartao.appendChild(nome);
        cartao.appendChild(consumo);

        lista.appendChild(cartao);
    });
}