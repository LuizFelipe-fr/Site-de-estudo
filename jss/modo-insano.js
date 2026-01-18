const perguntas = [
    {
        pergunta: "Qual é o valor de x em 3x = 12?",
        opcoes: ["2", "3", "4", "5"],
        resposta: 2
    },
    {
        pergunta: "Quanto é 15% de 200?",
        opcoes: ["20", "25", "30", "35"],
        resposta: 2
    },
    {
        pergunta: "Qual planeta é conhecido como planeta vermelho?",
        opcoes: ["Terra", "Marte", "Júpiter", "Vênus"],
        resposta: 1
    },
    {
        pergunta: "Qual é a raiz quadrada de 144?",
        opcoes: ["10", "11", "12", "13"],
        resposta: 2
    },

    { pergunta: "Qual é o valor de x em 2x + 10 = 18?", opcoes: ["3", "4", "5", "6"], resposta: 1 },
    { pergunta: "Qual é a raiz quadrada de 196?", opcoes: ["12", "13", "14", "15"], resposta: 2 },
    { pergunta: "Qual número é primo?", opcoes: ["21", "27", "29", "33"], resposta: 2 },
    { pergunta: "Quanto é 30% de 200?", opcoes: ["30", "40", "60", "80"], resposta: 2 },
    { pergunta: "Qual é o MMC de 6 e 8?", opcoes: ["12", "18", "24", "48"], resposta: 2 },
    { pergunta: "Assinale a palavra correta:", opcoes: ["Excessão", "Exeção", "Exceção", "Excessao"], resposta: 2 }
];

let indiceAtual = 0;
let acertos = 0;
let opcaoSelecionada = null;
let tempoTotal = 180;
let intervalo;
let evolucaoSalva = false;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const btnProximo = document.getElementById("proximo");
const contador = document.getElementById("contadorQuestoes");
const barra = document.getElementById("barraProgresso");
const tempoEl = document.getElementById("tempo");
const btnVoltarHome = document.getElementById("voltarHome");



function formatarTempo(seg) {
    const m = Math.floor(seg / 60);
    const s = seg % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function iniciarTimer() {
    tempoEl.textContent = `⏱️ ${formatarTempo(tempoTotal)}`;

    intervalo = setInterval(() => {
        tempoTotal--;
        tempoEl.textContent = `⏱️ ${formatarTempo(tempoTotal)}`;

        if (tempoTotal <= 0) {
            clearInterval(intervalo);
            finalizar();
        }
    }, 1000);
}

function carregarPergunta() {
    const q = perguntas[indiceAtual];

    perguntaEl.textContent = q.pergunta;
    opcoesEl.innerHTML = "";
    opcaoSelecionada = null;
    btnProximo.disabled = true;

    contador.textContent = `Questão ${indiceAtual + 1} de ${perguntas.length}`;
    barra.style.width = `${((indiceAtual + 1) / perguntas.length) * 100}%`;

    q.opcoes.forEach((opcao, index) => {
        const btn = document.createElement("button");
        btn.textContent = opcao;

        btn.onclick = () => {
            document.querySelectorAll("#opcoes button")
                .forEach(b => b.classList.remove("selecionado"));

            btn.classList.add("selecionado");
            opcaoSelecionada = index;
            btnProximo.disabled = false;
        };

        opcoesEl.appendChild(btn);
    });
}

btnProximo.onclick = () => {
    if (opcaoSelecionada === perguntas[indiceAtual].resposta) {
        acertos++;
    }

    if (indiceAtual < perguntas.length - 1) {
        indiceAtual++;
        carregarPergunta();
    } else {
        clearInterval(intervalo);
        finalizar();
    }
};

function finalizar() {
    salvarEvolucao(acertos, perguntas.length);

    perguntaEl.textContent = "🔥 MODO INSANO FINALIZADO";
    opcoesEl.innerHTML = `<p>Você acertou ${acertos} de ${perguntas.length}</p>`;

    btnProximo.style.display = "none";
    btnVoltarHome.style.display = "inline-block";

    contador.textContent = "";
    barra.style.width = "100%";
}


function salvarEvolucao(acertos, total) {
    if (evolucaoSalva) return;
    evolucaoSalva = true;

    let dados = JSON.parse(localStorage.getItem("evolucao")) || {
        simulados: 0,
        acertos: 0,
        erros: 0
    };

    dados.simulados++;
    dados.acertos += acertos;
    dados.erros += total - acertos;

    localStorage.setItem("evolucao", JSON.stringify(dados));
}

iniciarTimer();
carregarPergunta();
