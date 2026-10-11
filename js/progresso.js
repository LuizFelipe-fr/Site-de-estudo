const CHAVE_PROGRESSO = "progresso";

function obterProgresso() {
    const dados = JSON.parse(localStorage.getItem(CHAVE_PROGRESSO));

    return dados || {
        simulados: 0,
        acertos: 0,
        erros: 0,
        melhorAproveitamento: 0
    };
}

function registrarResultado(acertos, total) {
    const dados = obterProgresso();
    const erros = total - acertos;
    const aproveitamento = total > 0 ? Math.round((acertos / total) * 100) : 0;

    dados.simulados += 1;
    dados.acertos += acertos;
    dados.erros += erros;
    dados.melhorAproveitamento = Math.max(dados.melhorAproveitamento, aproveitamento);

    localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(dados));
}

function resetarProgresso() {
    localStorage.removeItem(CHAVE_PROGRESSO);
}

function aproveitamentoGeral() {
    const { acertos, erros } = obterProgresso();
    const total = acertos + erros;
    return total > 0 ? Math.round((acertos / total) * 100) : 0;
}
