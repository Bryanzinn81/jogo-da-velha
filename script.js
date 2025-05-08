const quadradosC = document.querySelectorAll(".quadrado");
const resetar = document.getElementById("reset");
const vezAtual = document.getElementById("vezAtual");
const placar = document.getElementById("placar");

let jogoTravado = false;
let jogadorAtual = "X";
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let pontos = { X: 0, O: 0 };

function registrarEventos(quadrado) {
    quadrado.addEventListener("click", click);
    quadrado.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
            click({ target: e.target });
        }
    });
}
quadradosC.forEach(registrarEventos);

function click(event) {
    const quadrado = event.target;
    const index = quadrado.dataset.index;

    if (jogoTravado || tabuleiro[index] !== "") return;

    aplicarJogada(index, quadrado);

    if (verificaVitoria()) {
        pontos[jogadorAtual]++;
        placar.textContent = `Placar - X: ${pontos.X} | O: ${pontos.O}`;
        vezAtual.textContent = `Jogador ${jogadorAtual} venceu! Reiniciando em 3 segundos...`;
        jogoTravado = true;
        setTimeout(resetarJogo, 3000);
        return;
    }

    if (!tabuleiro.includes("")) {
        vezAtual.textContent = "Empate! Reiniciando em 3 segundos...";
        jogoTravado = true;
        setTimeout(resetarJogo, 3000);
        return;
    }

    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    vezAtual.textContent = `Vez do jogador: ${jogadorAtual}`;
}


function aplicarJogada(index, quadrado) {
    tabuleiro[index] = jogadorAtual;
    quadrado.textContent = jogadorAtual;
    quadrado.classList.add(`jogador-${jogadorAtual.toLowerCase()}`);
}

function verificaVitoria() {
    const combinacoes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let [a, b, c] of combinacoes) {
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            quadradosC[a].classList.add("vencedor");
            quadradosC[b].classList.add("vencedor");
            quadradosC[c].classList.add("vencedor");
            return true;
        }
    }
    return false;
}

function resetarJogo() {
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    quadradosC.forEach(quadrado => {
        quadrado.textContent = "";
        quadrado.classList.remove("vencedor", "jogador-x", "jogador-o");
    });
    jogadorAtual = "X";
    vezAtual.textContent = `Vez do jogador: ${jogadorAtual}`;
    jogoTravado = false;

}

resetar.addEventListener("click", resetarJogo);
