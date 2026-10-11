(function () {
    const CHAVE = "tema";
    const raiz = document.documentElement;

    function aplicar(tema) {
        raiz.setAttribute("data-tema", tema);
    }

    function temaSalvo() {
        return localStorage.getItem(CHAVE) || "claro";
    }

    aplicar(temaSalvo());

    document.addEventListener("DOMContentLoaded", () => {
        const botao = document.querySelector("[data-toggle-tema]");
        if (!botao) return;

        atualizarIcone(botao, temaSalvo());

        botao.addEventListener("click", () => {
            const novo = temaSalvo() === "claro" ? "escuro" : "claro";
            localStorage.setItem(CHAVE, novo);
            aplicar(novo);
            atualizarIcone(botao, novo);
        });
    });

    function atualizarIcone(botao, tema) {
        botao.textContent = tema === "claro" ? "🌙" : "☀️";
        botao.setAttribute(
            "aria-label",
            tema === "claro" ? "Ativar tema escuro" : "Ativar tema claro"
        );
    }
})();
