const quadradosC = document.querySelectorAll(".quadrado");
const resetar = document.getElementById("reset");
let jogadorAtual = "X";
let tabuleiro = ["","","","","","","","",""];

quadradosC.forEach(quadrado => quadrado.addEventListener("click", click));


function click(event){
    const quadrado = event.target;
    const index = quadrado.dataset.index;

    if(tabuleiro[index] ===""){
        tabuleiro[index] = jogadorAtual;   
        quadrado.textContent = jogadorAtual;
    }
    console.log;
    Vitoria();
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    }
    console.log;

function Vitoria(){
    const parametrosV = [
        [0,1,2], [3,4,5],[6,7,8], [0,3,6], [1,4,7], [2,5,8],[0,4,8],[2,4,6]
    ];
    for (let i = 0; i < parametrosV.length; i++){
        let [a,b,c] = parametrosV[i];
        if(tabuleiro[a]&& tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]){
            alert(`Jogador ${tabuleiro[a]} venceu!!!!!`);
            resetarJogo();
            return;
        }
    }
    
    if(!tabuleiro.includes("")){
        alert("empate!!!!");
        resetarJogo();
    }
}



function resetarJogo(){
    tabuleiro = ["", "", "", "", "", "", "", "", ""]

    quadradosC.forEach(quadrado =>quadrado.textContent="");
    jogadorAtual = "X";
}
resetar.addEventListener("click",resetarJogo);