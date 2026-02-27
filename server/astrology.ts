/**
 * Astrology Service - Análise de personalidade baseada em data/hora de nascimento
 * Calcula signos solares, lunares e ascendentes para gerar perfil de personalidade
 */

interface BirthData {
  date: Date; // Data de nascimento
  time: string; // HH:mm formato
  latitude: number; // Latitude do local de nascimento
  longitude: number; // Longitude do local de nascimento
  timezone: number; // Offset de timezone em horas
  isDaylightSaving: boolean; // Se estava em horário de verão
}

interface AstrologyProfile {
  sunSign: string;
  moonSign: string;
  ascendant: string;
  personalityProfile: string;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
}

/**
 * Signos do Zodíaco com datas
 */
const ZODIAC_SIGNS = [
  { name: "Áries", start: [3, 21], end: [4, 19] },
  { name: "Touro", start: [4, 20], end: [5, 20] },
  { name: "Gêmeos", start: [5, 21], end: [6, 20] },
  { name: "Câncer", start: [6, 21], end: [7, 22] },
  { name: "Leão", start: [7, 23], end: [8, 22] },
  { name: "Virgem", start: [8, 23], end: [9, 22] },
  { name: "Libra", start: [9, 23], end: [10, 22] },
  { name: "Escorpião", start: [10, 23], end: [11, 21] },
  { name: "Sagitário", start: [11, 22], end: [12, 21] },
  { name: "Capricórnio", start: [12, 22], end: [1, 19] },
  { name: "Aquário", start: [1, 20], end: [2, 18] },
  { name: "Peixes", start: [2, 19], end: [3, 20] },
];

/**
 * Obter signo solar baseado na data
 */
function getSunSign(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  for (const sign of ZODIAC_SIGNS) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;

    if (startMonth === endMonth) {
      if (month === startMonth && day >= startDay && day <= endDay) {
        return sign.name;
      }
    } else {
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay)
      ) {
        return sign.name;
      }
    }
  }

  return "Desconhecido";
}

/**
 * Calcular signo lunar (simplificado)
 * Nota: Cálculo real requer efemérides lunares. Esta é uma aproximação.
 */
function getMoonSign(date: Date): string {
  // Usar o dia do mês como base para uma aproximação
  const dayOfMonth = date.getDate();
  const signIndex = Math.floor((dayOfMonth / 30) * 12) % 12;
  return ZODIAC_SIGNS[signIndex].name;
}

/**
 * Calcular ascendente (simplificado)
 * Nota: Cálculo real requer hora exata e coordenadas. Esta é uma aproximação.
 */
function getAscendant(birthData: BirthData): string {
  const [hours, minutes] = birthData.time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  const signIndex = Math.floor((totalMinutes / 1440) * 12) % 12;
  return ZODIAC_SIGNS[signIndex].name;
}

/**
 * Gerar perfil de personalidade baseado em signos astrológicos
 */
function generatePersonalityProfile(
  sunSign: string,
  moonSign: string,
  ascendant: string
): string {
  const profiles: Record<string, string> = {
    Áries:
      "Dinâmico, corajoso e apaixonado. Você é um líder natural com grande energia e determinação.",
    Touro:
      "Estável, prático e confiável. Você valoriza segurança e aprecia as coisas boas da vida.",
    Gêmeos:
      "Comunicativo, curioso e versátil. Você adora aprender e compartilhar conhecimento.",
    Câncer:
      "Sensível, intuitivo e protetor. Você valoriza a família e as conexões emocionais profundas.",
    Leão:
      "Confiante, criativo e generoso. Você é um natural performer que inspira os outros.",
    Virgem:
      "Analítico, prático e dedicado. Você busca perfeição e ajuda os outros com seus talentos.",
    Libra:
      "Equilibrado, diplomático e social. Você busca harmonia e valoriza relacionamentos.",
    Escorpião:
      "Intenso, misterioso e transformador. Você tem grande poder de regeneração e profundidade.",
    Sagitário:
      "Otimista, aventureiro e sábio. Você busca conhecimento e expansão contínua.",
    Capricórnio:
      "Responsável, ambicioso e disciplinado. Você trabalha duro para atingir seus objetivos.",
    Aquário:
      "Inovador, humanitário e independente. Você pensa diferente e busca mudanças positivas.",
    Peixes:
      "Criativo, empático e espiritual. Você tem grande imaginação e sensibilidade emocional.",
  };

  const sunProfile = profiles[sunSign] || "Personalidade única e especial.";
  const moonProfile = profiles[moonSign] || "";
  const ascendantProfile = profiles[ascendant] || "";

  return `${sunProfile} Emocionalmente, ${moonProfile.toLowerCase()} Na sua apresentação ao mundo, ${ascendantProfile.toLowerCase()}`;
}

/**
 * Gerar força e desafios baseado nos signos
 */
function getStrengthsAndChallenges(sunSign: string): {
  strengths: string[];
  challenges: string[];
} {
  const signTraits: Record<
    string,
    { strengths: string[]; challenges: string[] }
  > = {
    Áries: {
      strengths: [
        "Coragem",
        "Iniciativa",
        "Paixão",
        "Liderança",
        "Determinação",
      ],
      challenges: [
        "Impulsividade",
        "Impaciência",
        "Agressividade",
        "Egoísmo",
        "Falta de reflexão",
      ],
    },
    Touro: {
      strengths: [
        "Estabilidade",
        "Lealdade",
        "Praticidade",
        "Paciência",
        "Confiabilidade",
      ],
      challenges: [
        "Teimosia",
        "Possessividade",
        "Aversão à mudança",
        "Materialismo",
        "Inflexibilidade",
      ],
    },
    Gêmeos: {
      strengths: [
        "Comunicação",
        "Inteligência",
        "Adaptabilidade",
        "Curiosidade",
        "Versatilidade",
      ],
      challenges: [
        "Superficialidade",
        "Inconstância",
        "Ansiedade",
        "Falta de foco",
        "Indecisão",
      ],
    },
    Câncer: {
      strengths: [
        "Intuição",
        "Empatia",
        "Proteção",
        "Sensibilidade",
        "Lealdade",
      ],
      challenges: [
        "Insegurança",
        "Possessividade",
        "Mau humor",
        "Dependência emocional",
        "Ressentimento",
      ],
    },
    Leão: {
      strengths: [
        "Confiança",
        "Criatividade",
        "Generosidade",
        "Carisma",
        "Coragem",
      ],
      challenges: [
        "Arrogância",
        "Ego inflado",
        "Necessidade de atenção",
        "Orgulho",
        "Dramatização",
      ],
    },
    Virgem: {
      strengths: [
        "Análise",
        "Praticidade",
        "Dedicação",
        "Precisão",
        "Humildade",
      ],
      challenges: [
        "Crítica excessiva",
        "Perfeccionismo",
        "Ansiedade",
        "Frieza emocional",
        "Preocupação exagerada",
      ],
    },
    Libra: {
      strengths: [
        "Diplomacia",
        "Justiça",
        "Sociabilidade",
        "Equilíbrio",
        "Charme",
      ],
      challenges: [
        "Indecisão",
        "Superficialidade",
        "Dependência de aprovação",
        "Passividade",
        "Falta de compromisso",
      ],
    },
    Escorpião: {
      strengths: [
        "Intensidade",
        "Determinação",
        "Transformação",
        "Profundidade",
        "Poder",
      ],
      challenges: [
        "Ciúmes",
        "Obsessão",
        "Ressentimento",
        "Controle",
        "Destrutividade",
      ],
    },
    Sagitário: {
      strengths: [
        "Otimismo",
        "Aventura",
        "Sabedoria",
        "Generosidade",
        "Expansão",
      ],
      challenges: [
        "Imprudência",
        "Falta de tato",
        "Irresponsabilidade",
        "Exagero",
        "Falta de profundidade",
      ],
    },
    Capricórnio: {
      strengths: [
        "Responsabilidade",
        "Ambição",
        "Disciplina",
        "Pragmatismo",
        "Persistência",
      ],
      challenges: [
        "Pessimismo",
        "Frieza",
        "Rigidez",
        "Falta de diversão",
        "Avareza",
      ],
    },
    Aquário: {
      strengths: [
        "Inovação",
        "Humanitarismo",
        "Independência",
        "Inteligência",
        "Originalidade",
      ],
      challenges: [
        "Distanciamento emocional",
        "Rebeldia",
        "Impessoalidade",
        "Excentricidade",
        "Desapego",
      ],
    },
    Peixes: {
      strengths: [
        "Criatividade",
        "Empatia",
        "Espiritualidade",
        "Intuição",
        "Compaixão",
      ],
      challenges: [
        "Escapismo",
        "Ingenuidade",
        "Falta de limites",
        "Ilusão",
        "Vítimismo",
      ],
    },
  };

  return (
    signTraits[sunSign] || {
      strengths: ["Qualidades únicas"],
      challenges: ["Áreas de crescimento"],
    }
  );
}

/**
 * Gerar recomendações baseado nos signos
 */
function getRecommendations(sunSign: string, moonSign: string): string[] {
  const baseRecommendations: Record<string, string[]> = {
    Áries: [
      "Pratique paciência e reflexão antes de agir",
      "Canalize sua energia em projetos criativos",
      "Aprenda a ouvir os outros com atenção",
    ],
    Touro: [
      "Abra-se para novas experiências e mudanças",
      "Cultive flexibilidade em seus relacionamentos",
      "Explore novos interesses além do conforto",
    ],
    Gêmeos: [
      "Desenvolva profundidade em seus conhecimentos",
      "Pratique consistência em seus compromissos",
      "Cultive relacionamentos mais significativos",
    ],
    Câncer: [
      "Trabalhe na independência emocional",
      "Estabeleça limites saudáveis",
      "Cultive autoconfiança e autossuficiência",
    ],
    Leão: [
      "Pratique humildade e escuta",
      "Canalize seu carisma para ajudar outros",
      "Trabalhe a segurança interna além da admiração",
    ],
    Virgem: [
      "Relaxe o perfeccionismo",
      "Cultive aceitação e compaixão",
      "Aprenda a celebrar as imperfeições",
    ],
    Libra: [
      "Desenvolva decisão e firmeza",
      "Cultive autossuficiência",
      "Trabalhe na autoconfiança independente",
    ],
    Escorpião: [
      "Pratique perdão e desapego",
      "Cultive confiança nos outros",
      "Trabalhe a transformação positiva",
    ],
    Sagitário: [
      "Desenvolva responsabilidade e compromisso",
      "Cultive profundidade em seus conhecimentos",
      "Aprenda a considerar as consequências",
    ],
    Capricórnio: [
      "Cultive diversão e leveza",
      "Abra-se para conexões emocionais",
      "Trabalhe a espontaneidade",
    ],
    Aquário: [
      "Desenvolva conexões emocionais genuínas",
      "Cultive empatia e compreensão",
      "Trabalhe a abertura emocional",
    ],
    Peixes: [
      "Estabeleça limites e realismo",
      "Cultive discernimento e objetividade",
      "Trabalhe a autoproteção emocional",
    ],
  };

  return baseRecommendations[sunSign] || [
    "Cultive autoconhecimento",
    "Trabalhe seu desenvolvimento pessoal",
    "Busque equilíbrio em todas as áreas",
  ];
}

/**
 * Gerar perfil astrológico completo
 */
export function generateAstrologyProfile(birthData: BirthData): AstrologyProfile {
  const sunSign = getSunSign(birthData.date);
  const moonSign = getMoonSign(birthData.date);
  const ascendant = getAscendant(birthData);

  const personalityProfile = generatePersonalityProfile(
    sunSign,
    moonSign,
    ascendant
  );
  const { strengths, challenges } = getStrengthsAndChallenges(sunSign);
  const recommendations = getRecommendations(sunSign, moonSign);

  return {
    sunSign,
    moonSign,
    ascendant,
    personalityProfile,
    strengths,
    challenges,
    recommendations,
  };
}

/**
 * Gerar resumo executivo astrológico
 */
export function generateAstrologyExecutiveSummary(profile: AstrologyProfile): string {
  return `
## Seu Perfil Astrológico

**Signo Solar (Essência):** ${profile.sunSign}  
**Signo Lunar (Emoções):** ${profile.moonSign}  
**Ascendente (Apresentação):** ${profile.ascendant}

### Sua Personalidade

${profile.personalityProfile}

### Seus Pontos Fortes

${profile.strengths.map((s) => `- ${s}`).join("\n")}

### Áreas de Desenvolvimento

${profile.challenges.map((c) => `- ${c}`).join("\n")}

### Recomendações Personalizadas

${profile.recommendations.map((r) => `- ${r}`).join("\n")}
`;
}
