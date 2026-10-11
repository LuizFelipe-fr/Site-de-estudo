const LETRAS = ["A", "B", "C", "D", "E"];

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const resto = segundos % 60;
    return `${String(minutos).padStart(2, "0")}:${String(resto).padStart(2, "0")}`;
}

function criarQuiz(config) {
    const el = {
        quiz: document.getElementById("quiz"),
        resultado: document.getElementById("resultado"),
        contador: document.getElementById("contador"),
        tempo: document.getElementById("tempo"),
        barra: document.getElementById("barra"),
        pergunta: document.getElementById("pergunta"),
        opcoes: document.getElementById("opcoes"),
        feedback: document.getElementById("feedback"),
        proximo: document.getElementById("proximo")
    };

    const opcoes = {
        feedbackImediato: false,
        salvar: true,
        permitirRefazer: false,
        aoRefazer: null,
        aoSelecionar: null,
        ...config
    };

    let questoes = [];
    let indice = 0;
    let selecionada = null;
    let respondeu = false;
    let respostas = [];
    let tempoRestante = 0;
    let temporizador = null;
    let ultimoTempo = 0;

    function iniciar(lista, tempoSegundos) {
        questoes = lista;
        indice = 0;
        respostas = [];
        el.quiz.classList.remove("oculto");
        el.resultado.classList.add("oculto");
        el.proximo.style.display = "";

        const tempo = tempoSegundos !== undefined ? tempoSegundos : opcoes.tempoSegundos;
        ultimoTempo = tempo;

        if (el.tempo) {
            el.tempo.style.display = tempo > 0 ? "" : "none";
        }

        if (tempo > 0) {
            tempoRestante = tempo;
            iniciarTemporizador();
        }

        carregarPergunta();
    }

    function iniciarTemporizador() {
        clearInterval(temporizador);
        atualizarTempo();

        temporizador = setInterval(() => {
            tempoRestante -= 1;
            atualizarTempo();

            if (tempoRestante <= 0) {
                clearInterval(temporizador);
                finalizar(true);
            }
        }, 1000);
    }

    function atualizarTempo() {
        if (!el.tempo) return;
        el.tempo.textContent = `⏱️ ${formatarTempo(tempoRestante)}`;
        el.tempo.classList.toggle("tempo--critico", tempoRestante <= 30);
    }

    function carregarPergunta() {
        const questao = questoes[indice];
        selecionada = null;
        respondeu = false;

        el.pergunta.textContent = questao.pergunta;
        el.opcoes.innerHTML = "";
        el.feedback.innerHTML = "";
        el.proximo.disabled = true;
        el.proximo.textContent = indice === questoes.length - 1 ? "Finalizar" : "Próxima";

        el.contador.textContent = `Questão ${indice + 1} de ${questoes.length}`;
        el.barra.style.width = `${(indice / questoes.length) * 100}%`;

        questao.opcoes.forEach((texto, i) => {
            const botao = document.createElement("button");
            botao.type = "button";
            botao.textContent = texto;
            botao.dataset.letra = LETRAS[i];
            botao.addEventListener("click", () => selecionar(i, botao));
            el.opcoes.appendChild(botao);
        });
    }

    function selecionar(i, botao) {
        if (respondeu) return;
        selecionada = i;

        el.opcoes.querySelectorAll("button").forEach(b => b.classList.remove("selecionada"));
        botao.classList.add("selecionada");
        el.proximo.disabled = false;

        if (opcoes.feedbackImediato) {
            revelarResposta();
        }
    }

    function revelarResposta() {
        respondeu = true;
        const questao = questoes[indice];
        const botoes = el.opcoes.querySelectorAll("button");

        botoes.forEach((b, i) => {
            b.disabled = true;
            b.classList.remove("selecionada");
            if (i === questao.correta) b.classList.add("correta");
            else if (i === selecionada) b.classList.add("errada");
        });

        const acertou = selecionada === questao.correta;
        el.feedback.innerHTML = acertou
            ? `<p class="feedback__status ok">✅ Resposta correta!</p>`
            : `<p class="feedback__status nao">❌ Resposta incorreta.</p>
               <p class="feedback__explicacao">💡 ${questao.explicacao}</p>`;
    }

    el.proximo.addEventListener("click", () => {
        respostas.push({ questao: questoes[indice], selecionada });

        if (indice < questoes.length - 1) {
            indice += 1;
            carregarPergunta();
        } else {
            clearInterval(temporizador);
            finalizar(false);
        }
    });

    function finalizar(tempoEsgotado) {
        clearInterval(temporizador);

        const acertos = respostas.filter(r => r.selecionada === r.questao.correta).length;
        const total = questoes.length;

        if (opcoes.salvar) {
            registrarResultado(acertos, total);
        }

        el.quiz.classList.add("oculto");
        el.resultado.classList.remove("oculto");
        el.resultado.innerHTML = montarResultado(acertos, total, tempoEsgotado);
        el.resultado.scrollIntoView({ behavior: "smooth", block: "start" });
        conectarBotoesResultado();
    }

    function montarResultado(acertos, total, tempoEsgotado) {
        const percentual = total > 0 ? Math.round((acertos / total) * 100) : 0;
        const erros = total - acertos;

        let mensagem;
        if (tempoEsgotado) mensagem = "O tempo acabou, mas o que você respondeu conta!";
        else if (percentual >= 80) mensagem = "Excelente desempenho! Você está muito bem preparado.";
        else if (percentual >= 50) mensagem = "Bom trabalho! Revise os erros para melhorar ainda mais.";
        else mensagem = "Continue praticando. Cada tentativa te deixa mais perto.";

        const revisao = respostas.map((r, i) => {
            const acertou = r.selecionada === r.questao.correta;
            const suaResposta = r.selecionada !== null
                ? r.questao.opcoes[r.selecionada]
                : "Não respondida";

            return `
                <div class="revisao__item revisao__item--${acertou ? "ok" : "nao"}">
                    <p class="revisao__pergunta">${i + 1}. ${r.questao.pergunta}</p>
                    <p class="revisao__linha">Sua resposta: <strong>${suaResposta}</strong></p>
                    ${acertou ? "" : `<p class="revisao__linha">Correta: <strong>${r.questao.opcoes[r.questao.correta]}</strong></p>`}
                </div>`;
        }).join("");

        return `
            <div class="anel" style="--valor: ${percentual}">
                <div class="anel__texto">
                    <strong>${percentual}%</strong>
                    <span>aproveitamento</span>
                </div>
            </div>
            <h2>${tempoEsgotado ? "⏱️ Tempo esgotado!" : "Simulado concluído!"}</h2>
            <p class="resultado__mensagem">${mensagem}</p>

            <div class="resultado__placar">
                <div class="estatistica estatistica--sucesso">
                    <strong>${acertos}</strong><span>Acertos</span>
                </div>
                <div class="estatistica estatistica--erro">
                    <strong>${erros}</strong><span>Erros</span>
                </div>
                <div class="estatistica">
                    <strong>${total}</strong><span>Questões</span>
                </div>
            </div>

            <div class="quiz__rodape" style="justify-content: center;">
                ${opcoes.permitirRefazer ? `<button class="btn btn--primario" data-acao="refazer">Refazer</button>` : ""}
                ${opcoes.aoSelecionar ? `<button class="btn btn--fantasma" data-acao="selecionar">Escolher de novo</button>` : ""}
                <a class="btn btn--fantasma" href="index.html">Voltar ao início</a>
            </div>

            <div class="revisao">
                <h3>Revisão das questões</h3>
                ${revisao}
            </div>`;
    }

    function conectarBotoesResultado() {
        const refazer = el.resultado.querySelector("[data-acao='refazer']");
        if (refazer) {
            refazer.addEventListener("click", () => {
                const novas = opcoes.aoRefazer ? opcoes.aoRefazer() : questoes;
                iniciar(novas, ultimoTempo);
            });
        }

        const selecionar = el.resultado.querySelector("[data-acao='selecionar']");
        if (selecionar) {
            selecionar.addEventListener("click", () => {
                el.quiz.classList.add("oculto");
                el.resultado.classList.add("oculto");
                opcoes.aoSelecionar();
            });
        }
    }

    return { iniciar };
}
