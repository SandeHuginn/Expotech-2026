
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
                "#ff6384",
                "#36a2eb"
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
}

// Mantém o gráfico original
function atualizarGrafico(valores, cores) {
    const total = valores.reduce((acc, val) => acc + val, 0);

    let acumulado = 0;
    let partesGradient = [];

    for (let i = 0; i < valores.length; i++) {
        let inicio = (acumulado / total) * 100;
        acumulado += valores[i];
        let fim = (acumulado / total) * 100;

        partesGradient.push(`${cores[i]} ${inicio}% ${fim}%`);
    }

    const elementoGrafico = document.getElementById("graficoPizza");

    if (elementoGrafico) {
        elementoGrafico.style.background =
            `conic-gradient(${partesGradient.join(', ')})`;
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