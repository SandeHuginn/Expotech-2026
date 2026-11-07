
// Endereço da API do backend
const API_URL = 'http://localhost:3000/api/dashboard/consumo';

// Busca os dados do backend
async function carregarResumoConsumo() {
    try {
        const resposta = await fetch(API_URL);

        // Verifica se a requisição foi bem-sucedida
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        // Converte a resposta para objeto JavaScript
        const dados = await resposta.json();

        console.log('Dados recebidos do backend:');
        console.log(dados);

        // Atualiza o gráfico com os dados recebidos do backend
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

        return dados;

    } catch (erro) {
        console.error('Não foi possível carregar os dados:', erro);
    }
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

// Inicia a comunicação com o backend
window.addEventListener('DOMContentLoaded', carregarResumoConsumo);
