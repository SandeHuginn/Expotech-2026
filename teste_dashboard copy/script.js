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
        elementoGrafico.style.background = `conic-gradient(${partesGradient.join(', ')})`;
    }
}

window.onload = function() {
    atualizarGrafico([40, 35, 25], ["#ff6384", "#36a2eb", "#cc65fe"]);
};

function mudarDados() {
    atualizarGrafico([15, 65, 20], ["#ff6384", "#36a2eb", "#cc65fe"]);
}

/* --- LÓGICA DO MENU SUSPENSO --- */
function toggleMenu(event, menuId) {
    event.stopPropagation(); // Impede que o clique feche imediatamente
    
    // Fecha todos os outros menus abertos antes
    const menus = document.querySelectorAll('.dropdown-menu');
    menus.forEach(menu => {
        if (menu.id !== menuId) {
            menu.classList.remove('show');
        }
    });

    // Alterna o menu atual
    const menuAtual = document.getElementById(menuId);
    if (menuAtual) {
        menuAtual.classList.toggle('show');
    }
}

// Fecha o menu ao clicar em qualquer outra parte da página
window.addEventListener('click', function() {
    const menus = document.querySelectorAll('.dropdown-menu');
    menus.keyframes = menus.forEach(menu => menu.classList.remove('show'));
});