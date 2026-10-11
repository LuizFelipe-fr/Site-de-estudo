# Plataforma de Estudos

Plataforma web para preparação de vestibulares e concursos (Vestibulinho da ETEC, ENEM e outros), com simulados cronometrados, estudo por matéria e acompanhamento de evolução.

Projeto acadêmico desenvolvido na **UNINTER**, com foco em prática de desenvolvimento web usando HTML, CSS e JavaScript puro.

## Funcionalidades

- **Simulado** — monte provas de 10, 20 ou 30 questões sorteadas de todas as matérias, com tempo cronometrado e revisão completa ao final.
- **Simulado Rápido** — dez questões variadas em cinco minutos para o treino do dia a dia.
- **Modo Insano** — todas as questões em sequência, com pouco tempo por questão e sem voltar atrás.
- **Modo Estudo** — treino por matéria, sem tempo, com correção imediata e explicação de cada resposta.
- **Provas Anteriores** — download de provas reais de ETEC e ENEM.
- **Evolução** — número de simulados, acertos, erros, aproveitamento geral e melhor resultado, salvos no navegador.
- **Tema claro e escuro**, com preferência lembrada entre as visitas.

## Tecnologias

- HTML5
- CSS3 (design system com variáveis e tema escuro)
- JavaScript (Vanilla JS)

## Como executar

1. Clone este repositório.
2. Abra o arquivo `index.html` no navegador.

Não é necessário instalar dependências.

## Estrutura do projeto

```
Site-de-estudo
├── index.html              Página inicial com os modos e a evolução
├── simulado.html           Simulado cronometrado
├── simulado-rapido.html    Simulado de 10 questões
├── modo-insano.html        Desafio cronometrado
├── modo-estudo.html        Estudo por matéria
├── provas-anteriores.html  Downloads de provas
├── css
│   └── style.css           Design system e estilos
├── js
│   ├── banco-questoes.js    Banco de questões e utilitários
│   ├── quiz.js              Motor de quiz compartilhado
│   ├── progresso.js         Armazenamento da evolução
│   ├── evolucao.js          Painel de evolução da home
│   └── tema.js              Alternância de tema claro/escuro
└── provas                  Arquivos PDF das provas
```

## Como adicionar questões

Edite `js/banco-questoes.js` e inclua um objeto no array `BANCO_QUESTOES`:

```js
{
    materia: "matematica",
    pergunta: "Quanto é 25% de 200?",
    opcoes: ["25", "40", "50", "75"],
    correta: 2,
    explicacao: "25% equivale a 1/4. Então 200 ÷ 4 = 50."
}
```

O campo `correta` é o índice da alternativa certa (começando em 0). As matérias disponíveis são `matematica`, `portugues`, `ciencias` e `geral`.

## Autor

Projeto desenvolvido por Luiz, como atividade da faculdade UNINTER.
