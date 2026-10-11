function renderizarEvolucao() {
    const dados = obterProgresso();
    const aproveitamento = aproveitamentoGeral();

    document.getElementById("evSimulados").textContent = dados.simulados;
    document.getElementById("evAcertos").textContent = dados.acertos;
    document.getElementById("evErros").textContent = dados.erros;
    document.getElementById("evPercentual").textContent = aproveitamento + "%";
    document.getElementById("evMelhor").textContent = dados.melhorAproveitamento + "%";
    document.getElementById("anelEvolucao").style.setProperty("--valor", aproveitamento);
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarEvolucao();

    document.getElementById("btnResetar").addEventListener("click", () => {
        const confirmado = confirm("Tem certeza que deseja apagar toda a sua evolução?");
        if (!confirmado) return;

        resetarProgresso();
        renderizarEvolucao();
    });
});
