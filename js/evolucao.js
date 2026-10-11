function renderizarEvolucao(animar) {
    const dados = obterProgresso();
    const aproveitamento = aproveitamentoGeral();

    const valores = {
        evSimulados: { valor: dados.simulados, sufixo: "" },
        evAcertos: { valor: dados.acertos, sufixo: "" },
        evErros: { valor: dados.erros, sufixo: "" },
        evPercentual: { valor: aproveitamento, sufixo: "%" },
        evMelhor: { valor: dados.melhorAproveitamento, sufixo: "%" }
    };

    Object.entries(valores).forEach(([id, { valor, sufixo }]) => {
        const el = document.getElementById(id);
        el.dataset.contador = valor;
        el.dataset.sufixo = sufixo;
        el.textContent = sufixo === "%" ? "0%" : "0";
    });

    if (animar && typeof window.animarContadores === "function") {
        window.animarContadores();
    } else {
        Object.entries(valores).forEach(([id, { valor, sufixo }]) => {
            document.getElementById(id).textContent = valor + sufixo;
        });
    }

    requestAnimationFrame(() => {
        document.getElementById("anelEvolucao").style.setProperty("--valor", aproveitamento);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const painel = document.querySelector(".evolucao");

    if ("IntersectionObserver" in window && painel) {
        renderizarEvolucao(false);
        const observador = new IntersectionObserver((entradas, obs) => {
            entradas.forEach(entrada => {
                if (!entrada.isIntersecting) return;
                renderizarEvolucao(true);
                obs.disconnect();
            });
        }, { threshold: 0.4 });
        observador.observe(painel);
    } else {
        renderizarEvolucao(false);
    }

    document.getElementById("btnResetar").addEventListener("click", () => {
        if (!confirm("Tem certeza que deseja apagar toda a sua evolução?")) return;
        resetarProgresso();
        renderizarEvolucao(true);
    });
});
