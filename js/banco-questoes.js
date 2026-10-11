const BANCO_QUESTOES = [
    {
        materia: "matematica",
        pergunta: "Qual é o valor de x na equação 2x + 6 = 14?",
        opcoes: ["2", "4", "5", "6"],
        correta: 1,
        explicacao: "2x = 14 - 6 = 8, logo x = 8 ÷ 2 = 4."
    },
    {
        materia: "matematica",
        pergunta: "Quanto é 25% de 200?",
        opcoes: ["25", "40", "50", "75"],
        correta: 2,
        explicacao: "25% equivale a 1/4. Então 200 ÷ 4 = 50."
    },
    {
        materia: "matematica",
        pergunta: "Qual é a raiz quadrada de 144?",
        opcoes: ["10", "11", "12", "13"],
        correta: 2,
        explicacao: "12 × 12 = 144, portanto a raiz quadrada de 144 é 12."
    },
    {
        materia: "matematica",
        pergunta: "Qual destes números é primo?",
        opcoes: ["21", "27", "29", "33"],
        correta: 2,
        explicacao: "29 só é divisível por 1 e por ele mesmo, logo é primo."
    },
    {
        materia: "matematica",
        pergunta: "Qual é o MMC de 6 e 8?",
        opcoes: ["12", "18", "24", "48"],
        correta: 2,
        explicacao: "Os múltiplos comuns de 6 e 8 começam em 24, o menor deles."
    },
    {
        materia: "matematica",
        pergunta: "Quanto é 7 × 8?",
        opcoes: ["54", "56", "64", "48"],
        correta: 1,
        explicacao: "7 vezes 8 é igual a 56."
    },
    {
        materia: "matematica",
        pergunta: "Quantos minutos há em 2 horas e meia?",
        opcoes: ["120", "130", "150", "180"],
        correta: 2,
        explicacao: "2 horas são 120 minutos. Somando os 30 minutos da meia hora, temos 150."
    },
    {
        materia: "matematica",
        pergunta: "Qual figura geométrica possui quatro lados iguais e quatro ângulos retos?",
        opcoes: ["Retângulo", "Losango", "Quadrado", "Trapézio"],
        correta: 2,
        explicacao: "O quadrado tem os quatro lados iguais e todos os ângulos de 90°."
    },
    {
        materia: "matematica",
        pergunta: "Um produto de R$ 80,00 recebeu desconto de 15%. Qual o valor final?",
        opcoes: ["R$ 65,00", "R$ 68,00", "R$ 70,00", "R$ 72,00"],
        correta: 1,
        explicacao: "15% de 80 é 12. Então 80 - 12 = 68 reais."
    },
    {
        materia: "matematica",
        pergunta: "Qual é o valor de 3² + 4²?",
        opcoes: ["12", "25", "49", "7"],
        correta: 1,
        explicacao: "3² = 9 e 4² = 16. Somando, 9 + 16 = 25."
    },

    {
        materia: "portugues",
        pergunta: "Qual palavra está escrita corretamente?",
        opcoes: ["Excessão", "Exeção", "Exceção", "Excessao"],
        correta: 2,
        explicacao: "A grafia correta é 'exceção', com ç e til."
    },
    {
        materia: "portugues",
        pergunta: "Assinale a frase com a concordância verbal correta.",
        opcoes: [
            "Fazem dois anos que estudo aqui.",
            "Faz dois anos que estudo aqui.",
            "Fazem dois anos que estudamos aqui.",
            "Fazes dois anos que estudo aqui."
        ],
        correta: 1,
        explicacao: "O verbo 'fazer' indicando tempo decorrido é impessoal e fica no singular: 'faz dois anos'."
    },
    {
        materia: "portugues",
        pergunta: "Qual é o antônimo de 'efêmero'?",
        opcoes: ["Passageiro", "Breve", "Duradouro", "Rápido"],
        correta: 2,
        explicacao: "'Efêmero' significa de curta duração; seu antônimo é 'duradouro'."
    },
    {
        materia: "portugues",
        pergunta: "Em 'O livro que comprei é ótimo', a palavra 'que' é um:",
        opcoes: ["Pronome relativo", "Pronome pessoal", "Advérbio", "Artigo"],
        correta: 0,
        explicacao: "'Que' retoma 'o livro' e introduz a oração, funcionando como pronome relativo."
    },
    {
        materia: "portugues",
        pergunta: "Qual alternativa apresenta uma palavra proparoxítona?",
        opcoes: ["Caju", "Sofá", "Lâmpada", "Café"],
        correta: 2,
        explicacao: "'Lâmpada' tem a sílaba tônica na antepenúltima sílaba, sendo proparoxítona."
    },
    {
        materia: "portugues",
        pergunta: "Qual é o plural de 'cidadão'?",
        opcoes: ["Cidadões", "Cidadãos", "Cidadães", "Cidadans"],
        correta: 1,
        explicacao: "O plural de 'cidadão' é 'cidadãos'."
    },
    {
        materia: "portugues",
        pergunta: "Na frase 'Ela chegou atrasada', a palavra 'atrasada' é:",
        opcoes: ["Substantivo", "Adjetivo", "Verbo", "Advérbio"],
        correta: 1,
        explicacao: "'Atrasada' caracteriza 'ela', funcionando como adjetivo."
    },
    {
        materia: "portugues",
        pergunta: "Qual opção usa a crase corretamente?",
        opcoes: [
            "Vou à escola.",
            "Vou à pé.",
            "Refiro-me à você.",
            "Cheguei à casa cedo."
        ],
        correta: 0,
        explicacao: "A crase ocorre em 'à escola' pela fusão da preposição 'a' com o artigo 'a'."
    },

    {
        materia: "ciencias",
        pergunta: "Qual é a função principal da fotossíntese?",
        opcoes: [
            "Absorver água do solo",
            "Produzir alimento para a planta",
            "Eliminar gás carbônico",
            "Resfriar a planta"
        ],
        correta: 1,
        explicacao: "Na fotossíntese a planta produz glicose, seu alimento, liberando oxigênio."
    },
    {
        materia: "ciencias",
        pergunta: "Qual planeta é conhecido como planeta vermelho?",
        opcoes: ["Terra", "Marte", "Júpiter", "Vênus"],
        correta: 1,
        explicacao: "Marte é chamado de planeta vermelho pela presença de óxido de ferro em sua superfície."
    },
    {
        materia: "ciencias",
        pergunta: "Qual é o maior planeta do Sistema Solar?",
        opcoes: ["Terra", "Marte", "Júpiter", "Saturno"],
        correta: 2,
        explicacao: "Júpiter é o maior planeta do Sistema Solar."
    },
    {
        materia: "ciencias",
        pergunta: "Qual gás os seres humanos liberam na respiração?",
        opcoes: ["Oxigênio", "Hidrogênio", "Gás carbônico", "Nitrogênio"],
        correta: 2,
        explicacao: "Na respiração liberamos gás carbônico (CO₂) e absorvemos oxigênio."
    },
    {
        materia: "ciencias",
        pergunta: "Qual é o estado físico da água a 0 °C ao nível do mar?",
        opcoes: ["Gasoso", "Líquido", "Sólido (congelamento)", "Plasma"],
        correta: 2,
        explicacao: "A 0 °C a água atinge seu ponto de congelamento, passando ao estado sólido."
    },
    {
        materia: "ciencias",
        pergunta: "Qual órgão é responsável por bombear o sangue pelo corpo?",
        opcoes: ["Pulmão", "Fígado", "Coração", "Rim"],
        correta: 2,
        explicacao: "O coração bombeia o sangue para todo o organismo."
    },
    {
        materia: "ciencias",
        pergunta: "A energia solar é uma fonte de energia:",
        opcoes: ["Não renovável", "Renovável", "Fóssil", "Nuclear"],
        correta: 1,
        explicacao: "A energia solar é renovável, pois o Sol é uma fonte praticamente inesgotável."
    },

    {
        materia: "geral",
        pergunta: "Qual é a capital do Brasil?",
        opcoes: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
        correta: 1,
        explicacao: "Brasília é a capital federal do Brasil desde 1960."
    },
    {
        materia: "geral",
        pergunta: "Em que continente fica o Egito?",
        opcoes: ["Ásia", "Europa", "África", "Oceania"],
        correta: 2,
        explicacao: "O Egito está localizado no nordeste do continente africano."
    },
    {
        materia: "geral",
        pergunta: "Quem proclamou a Independência do Brasil em 1822?",
        opcoes: ["Dom Pedro II", "Dom Pedro I", "Tiradentes", "Marechal Deodoro"],
        correta: 1,
        explicacao: "Dom Pedro I proclamou a Independência do Brasil em 7 de setembro de 1822."
    },
    {
        materia: "geral",
        pergunta: "Qual é o rio mais extenso do Brasil?",
        opcoes: ["Rio São Francisco", "Rio Tietê", "Rio Amazonas", "Rio Paraná"],
        correta: 2,
        explicacao: "O Rio Amazonas é o mais extenso e volumoso do Brasil."
    },
    {
        materia: "geral",
        pergunta: "Qual documento de 1988 é a atual lei máxima do Brasil?",
        opcoes: [
            "Código Civil",
            "Constituição Federal",
            "Lei Áurea",
            "Consolidação das Leis do Trabalho"
        ],
        correta: 1,
        explicacao: "A Constituição Federal de 1988 é a lei máxima que organiza o Estado brasileiro."
    },
    {
        materia: "geral",
        pergunta: "Quantos estados compõem a Federação brasileira?",
        opcoes: ["24", "25", "26", "27"],
        correta: 2,
        explicacao: "O Brasil possui 26 estados, além do Distrito Federal."
    },
    {
        materia: "geral",
        pergunta: "Qual é o idioma oficial do Brasil?",
        opcoes: ["Espanhol", "Português", "Inglês", "Tupi"],
        correta: 1,
        explicacao: "O idioma oficial do Brasil é o português."
    },
    {
        materia: "geral",
        pergunta: "O que o termo 'sustentabilidade' procura equilibrar?",
        opcoes: [
            "Apenas o lucro das empresas",
            "Meio ambiente, sociedade e economia",
            "Somente o consumo",
            "Apenas a tecnologia"
        ],
        correta: 1,
        explicacao: "Sustentabilidade busca equilibrar os aspectos ambiental, social e econômico."
    }
];

const MATERIAS = {
    matematica: { nome: "Matemática", icone: "📐" },
    portugues: { nome: "Português", icone: "📖" },
    ciencias: { nome: "Ciências", icone: "🔬" },
    geral: { nome: "Conhecimentos Gerais", icone: "🌍" }
};

function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function questoesPorMateria(materia) {
    return BANCO_QUESTOES.filter(q => q.materia === materia);
}

function sortearQuestoes(quantidade) {
    return embaralhar(BANCO_QUESTOES).slice(0, quantidade);
}
