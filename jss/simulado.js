const perguntas = [

    { pergunta: "Qual é o valor de x em 2x + 10 = 18?", opcoes: ["3", "4", "5", "6"], resposta: 1 },
    { pergunta: "Qual é a raiz quadrada de 196?", opcoes: ["12", "13", "14", "15"], resposta: 2 },
    { pergunta: "Qual número é primo?", opcoes: ["21", "27", "29", "33"], resposta: 2 },
    { pergunta: "Quanto é 30% de 200?", opcoes: ["30", "40", "60", "80"], resposta: 2 },
    { pergunta: "Qual é o MMC de 6 e 8?", opcoes: ["12", "18", "24", "48"], resposta: 2 },
    { pergunta: "Assinale a palavra correta:", opcoes: ["Excessão", "Exeção", "Exceção", "Excessao"], resposta: 2 }
];

while (perguntas.length < 100) {
    const i = perguntas.length + 1;
    perguntas.push({
        pergunta: `Questão extra ${i}: quanto é ${i} + ${i + 1}?`,
        opcoes: [`${i}`, `${i + 1}`, `${i + (i + 1)}`, `${i + (i + 2)}`],
        resposta: 2
    });
}

let perguntasAtivas = [];
let indiceAtual = 0;
let acertos = 0;
let respostaSelecionada = null;
let tempoTotal = 0;
let intervaloTempo = null;
let evolucaoSalva = false;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const botaoProximo = document.getElementById("proximo");
const barra = document.getElementById("barraProgresso");
const contador = document.getElementById("contadorQuestoes");
const tempoEl = document.getElementById("tempo");

function formatarTempo(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function iniciarTimer() {
    clearInterval(intervaloTempo);
    intervaloTempo = setInterval(() => {
        tempoTotal--;
        tempoEl.textContent = `⏱️ Tempo: ${formatarTempo(tempoTotal)}`;
        if (tempoTotal <= 0) finalizarSimulado();
    }, 1000);
}

function iniciarSimulado(qtd) {
    evolucaoSalva = false;

    perguntasAtivas = [...perguntas].sort(() => Math.random() - 0.5).slice(0, qtd);
    indiceAtual = 0;
    acertos = 0;
    respostaSelecionada = null;

    tempoTotal = qtd * 60;
    tempoEl.textContent = `⏱️ Tempo: ${formatarTempo(tempoTotal)}`;
    iniciarTimer();

    document.getElementById("escolhaSimulado").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";

    botaoProximo.disabled = true;
    botaoProximo.style.display = "inline-block";
    botaoProximo.textContent = "Próxima";

    carregarPergunta();
}

function carregarPergunta() {
    const q = perguntasAtivas[indiceAtual];
    perguntaEl.textContent = q.pergunta;
    opcoesEl.innerHTML = "";
    respostaSelecionada = null;

    q.opcoes.forEach((op, i) => {
        const btn = document.createElement("button");
        btn.textContent = op;
        btn.onclick = () => {
            respostaSelecionada = i;
            document.querySelectorAll("#opcoes button").forEach(b => b.classList.remove("selecionado"));
            btn.classList.add("selecionado");
            botaoProximo.disabled = false;
        };
        opcoesEl.appendChild(btn);
    });

    contador.textContent = `Questão ${indiceAtual + 1} de ${perguntasAtivas.length}`;
    barra.style.width = `${((indiceAtual + 1) / perguntasAtivas.length) * 100}%`;
}

botaoProximo.onclick = () => {
    if (respostaSelecionada === perguntasAtivas[indiceAtual].resposta) acertos++;
    indiceAtual++;

    if (indiceAtual < perguntasAtivas.length) {
        botaoProximo.disabled = true;
        botaoProximo.textContent = indiceAtual === perguntasAtivas.length - 1 ? "Finalizar" : "Próxima";
        carregarPergunta();
    } else {
        finalizarSimulado();
    }
};

function finalizarSimulado() {
    clearInterval(intervaloTempo);
    salvarEvolucao(acertos, perguntasAtivas.length);

    perguntaEl.textContent = "⏱️ Simulado encerrado!";
    opcoesEl.innerHTML = `<p>Você acertou ${acertos} de ${perguntasAtivas.length} questões.</p>`;
    botaoProximo.style.display = "none";
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

function resetarEvolucao() {
    localStorage.removeItem("evolucao");
    evolucaoSalva = false;
    alert("Evolução resetada com sucesso!");
}

document.querySelectorAll(".btn-qtd").forEach(btn => {
    btn.onclick = () => iniciarSimulado(Number(btn.dataset.qtd));
});
