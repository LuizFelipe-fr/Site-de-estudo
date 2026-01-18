const perguntas = [
    {
        pergunta: "Qual é o valor de x na equação 2x + 6 = 14?",
        opcoes: ["3", "4", "5", "6"],
        resposta: 1
    },
    {
        pergunta: "Qual é a capital do Brasil?",
        opcoes: ["Rio de Janeiro", "Brasília", "São Paulo", "Belo Horizonte"],
        resposta: 1
    },
    {
        pergunta: "Quanto é 25% de 200?",
        opcoes: ["25", "40", "50", "75"],
        resposta: 2
    },
    {
        pergunta: "Qual dessas palavras está escrita corretamente?",
        opcoes: ["Excessão", "Exceção", "Exeção", "Excessao"],
        resposta: 1
    },
    {
        pergunta: "Qual é o resultado de 7 × 8?",
        opcoes: ["54", "56", "64", "48"],
        resposta: 1
    },
    {
        pergunta: "Quantos minutos há em 2 horas e meia?",
        opcoes: ["120", "130", "150", "180"],
        resposta: 2
    },
    {
        pergunta: "Qual figura geométrica possui todos os lados iguais?",
        opcoes: ["Retângulo", "Triângulo escaleno", "Quadrado", "Trapézio"],
        resposta: 2
    },
    {
        pergunta: "Qual é o maior planeta do sistema solar?",
        opcoes: ["Terra", "Marte", "Júpiter", "Saturno"],
        resposta: 2
    },
    {
        pergunta: "Qual é o resultado da raiz quadrada de 81?",
        opcoes: ["7", "8", "9", "10"],
        resposta: 2
    },
    {
        pergunta: "Qual é a função principal da fotossíntese?",
        opcoes: [
            "Produzir oxigênio",
            "Produzir alimento para a planta",
            "Absorver água",
            "Eliminar gás carbônico"
        ],
        resposta: 1
    }
];

let indiceAtual = 0;
let opcaoSelecionada = null;
let tempoTotal = 300;
let intervalo = null;
let totalAcertos = 0;
let evolucaoSalva = false;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const btnProximo = document.getElementById("proximo");
const contador = document.getElementById("contadorQuestoes");
const barra = document.getElementById("barraProgresso");
const btnRefazer = document.getElementById("refazer");
const tempoEl = document.getElementById("tempo");

document.querySelector(".simulado-rapido").insertBefore(perguntaEl, opcoesEl);

function formatarTempo(seg) {
    const m = Math.floor(seg / 60);
    const s = seg % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function iniciarTimer() {
    clearInterval(intervalo);

    tempoEl.textContent = `⏱️ Tempo: ${formatarTempo(tempoTotal)}`;

    intervalo = setInterval(() => {
        tempoTotal--;
        tempoEl.textContent = `⏱️ Tempo: ${formatarTempo(tempoTotal)}`;

        if (tempoTotal <= 0) {
            clearInterval(intervalo);
            finalizarSimulado(true);
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
        btn.type = "button";
        btn.textContent = opcao;

        btn.onclick = () => {
            document.querySelectorAll("#opcoes button").forEach(b => b.classList.remove("selecionado"));
            btn.classList.add("selecionado");
            opcaoSelecionada = index;
            btnProximo.disabled = false;
        };

        opcoesEl.appendChild(btn);
    });
}

function finalizarSimulado(tempoEsgotado = false) {
    salvarEvolucao(totalAcertos, perguntas.length);

    perguntaEl.textContent = tempoEsgotado
        ? "⏱️ Tempo esgotado!"
        : "✅ Simulado rápido finalizado!";

    opcoesEl.innerHTML = `<p>Você acertou ${totalAcertos} de ${perguntas.length}</p>`;
    btnProximo.style.display = "none";
    btnRefazer.style.display = "inline-block";
    contador.textContent = "";
    barra.style.width = "100%";
}

btnProximo.onclick = () => {
    if (opcaoSelecionada === perguntas[indiceAtual].resposta) {
        totalAcertos++;
    }

    if (indiceAtual < perguntas.length - 1) {
        indiceAtual++;
        carregarPergunta();
    } else {
        clearInterval(intervalo);
        finalizarSimulado();
    }
};

btnRefazer.onclick = () => {
    indiceAtual = 0;
    opcaoSelecionada = null;
    tempoTotal = 300;
    totalAcertos = 0;
    evolucaoSalva = false;

    btnRefazer.style.display = "none";
    btnProximo.style.display = "inline-block";
    barra.style.width = "0%";

    iniciarTimer();
    carregarPergunta();
};

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

function resetarEvolucao() {
    localStorage.removeItem("evolucao");
    alert("Evolução resetada com sucesso!");
}

iniciarTimer();
carregarPergunta();
