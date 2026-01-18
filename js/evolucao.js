function carregarEvolucao() {
    const dados = JSON.parse(localStorage.getItem("evolucao")) || {
        simulados: 0,
        acertos: 0,
        erros: 0
    };

    const total = dados.acertos + dados.erros;
    const percentual = total > 0 ? Math.round((dados.acertos / total) * 100) : 0;

    document.getElementById("evSimulados").textContent = dados.simulados;
    document.getElementById("evAcertos").textContent = dados.acertos;
    document.getElementById("evErros").textContent = dados.erros;
    document.getElementById("evPercentual").textContent = percentual + "%";
    document.getElementById("evBarra").style.width = percentual + "%";
}


function resetarEvolucao() {
    console.log("Reset clicado");

    localStorage.removeItem("evolucao");

    carregarEvolucao();

}

document.addEventListener("DOMContentLoaded", carregarEvolucao);
