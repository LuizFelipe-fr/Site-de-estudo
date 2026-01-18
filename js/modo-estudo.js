const questoes = {
    matematica: [
        {
            pergunta: "Quanto é 25% de 200?",
            opcoes: ["25", "40", "50", "75"],
            resposta: 2,
            explicacao: "25% é o mesmo que 1/4. 200 ÷ 4 = 50."
        },
        {
            pergunta: "Quanto é 7 × 8?",
            opcoes: ["54", "56", "64", "48"],
            resposta: 1,
            explicacao: "7 vezes 8 é igual a 56."
        }
    ],

    portugues: [
        {
            pergunta: "Qual palavra está escrita corretamente?",
            opcoes: ["Excessão", "Exeção", "Exceção", "Excessao"],
            resposta: 2,
            explicacao: "A forma correta é 'Exceção', com Ç."
        }
    ],

    geral: [
        {
            pergunta: "Qual é a capital do Brasil?",
            opcoes: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
            resposta: 1,
            explicacao: "Brasília é a capital do Brasil desde 1960."
        }
    ]
};

let listaAtual = [];
let indice = 0;
let respondeu = false;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const feedbackEl = document.getElementById("feedback");
const btnProxima = document.getElementById("btnProxima");

function iniciarEstudo(materia) {
    listaAtual = [...questoes[materia]].sort(() => Math.random() - 0.5);
    indice = 0;

    document.getElementById("escolhaMateria").style.display = "none";
    document.getElementById("estudoContainer").style.display = "block";

    carregarPergunta();
}

function carregarPergunta() {
    const q = listaAtual[indice];
    perguntaEl.textContent = q.pergunta;
    opcoesEl.innerHTML = "";
    feedbackEl.innerHTML = "";
    btnProxima.disabled = true;
    respondeu = false;

    q.opcoes.forEach((op, i) => {
        const btn = document.createElement("button");
        btn.textContent = op;

        btn.onclick = () => verificarResposta(i, btn);
        opcoesEl.appendChild(btn);
    });
}

function verificarResposta(indiceResposta, botao) {
    if (respondeu) return;
    respondeu = true;

    const q = listaAtual[indice];
    btnProxima.disabled = false;

    document.querySelectorAll("#opcoes button").forEach(b => b.disabled = true);

    if (indiceResposta === q.resposta) {
        botao.classList.add("correta");
        feedbackEl.innerHTML = `<p class="ok">✅ Correto!</p>`;
    } else {
        botao.classList.add("errada");
        feedbackEl.innerHTML = `
            <p class="erro">❌ Errado</p>
            <p class="explicacao">💡 ${q.explicacao}</p>
        `;
    }
}

function proximaPergunta() {
    indice++;

    if (indice < listaAtual.length) {
        carregarPergunta();
    } else {
        perguntaEl.textContent = "🎉 Você terminou essa matéria!";
        opcoesEl.innerHTML = "";
        feedbackEl.innerHTML = "<p>Continue estudando, você está evoluindo 👏</p>";
        btnProxima.style.display = "none";
    }
}
