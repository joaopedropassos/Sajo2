/**
 * FUSION-SAJO Paradigm Catalog - Parsed Data Structure
 * Extracted and structured from the original YAML catalog
 */

export interface Paradigm {
  id: string;
  area: "vida" | "financeira" | "juridica" | "saude" | "relacionamento";
  triggers: string[];
  tags: string[];
  stateConditions: Record<string, unknown>;
  requiredEvidence: string[];
  outputBlocks: string[];
  actions7d: string[];
  actions90d: string[];
  avoid: string[];
  calendarRules: Record<string, unknown>[];
  description?: string;
}

export const paradigmsCatalog: Record<string, Paradigm> = {
  V01: {
    id: "V01",
    area: "vida",
    triggers: ["mínimo existencial", "sem comida", "sem remédio", "salário indisponível"],
    tags: ["SUBSISTENCIA_CRITICA", "CAIXA_ZERADO"],
    stateConditions: { cashflow_severity: ">=8", stress: ">=6" },
    requiredEvidence: ["extrato_bancario", "contracheque", "decisao_judicial", "BLOQUEIO", "RETENCAO", "SALDO_ZERADO"],
    outputBlocks: ["EXEC_SUMMARY", "ACTIONS_7D", "ACTIONS_90D", "CALENDAR_TABLE", "EVIDENCE_MAP"],
    actions7d: [
      "Orçamento sobrevivência (piso)",
      "Ativar rede (3 contatos)",
      "Congelar gastos não essenciais"
    ],
    actions90d: [
      "Micro-reserva (1–2 semanas)",
      "Sistema diário de gastos"
    ],
    avoid: ["Nova dívida p/ consumo", "Discussões em canal informal"],
    calendarRules: [
      { when: "PRAZO_CRITICO ou AUDIENCIA", then: "label_life: alta_pressao, action_hint: reduzir variância; executar" }
    ],
    description: "Situação de subsistência crítica com caixa zerado e estresse elevado"
  },

  V02: {
    id: "V02",
    area: "vida",
    triggers: ["acidente", "internação", "perda súbita", "evento inesperado"],
    tags: ["SHOCK_EVENT"],
    stateConditions: { shock_event: true, urgency: ">=7" },
    requiredEvidence: ["laudo_medico", "nota_hospitalar", "boletim_ocorrencia"],
    outputBlocks: ["EXEC_SUMMARY", "ACTIONS_7D", "CALENDAR_TABLE"],
    actions7d: [
      "Protocolo 72h (saúde/caixa/comunicação)",
      "Delegar tarefas",
      "Decisões reversíveis apenas"
    ],
    actions90d: [
      "Plano de contingência",
      "Revisão de rotinas e seguros"
    ],
    avoid: ["Decisão financeira irreversível na crise"],
    calendarRules: [],
    description: "Evento de choque (acidente, internação, perda) com urgência alta"
  },

  V03: {
    id: "V03",
    area: "vida",
    triggers: ["burnout", "exausto", "sem dormir", "esgotamento"],
    tags: ["BURNOUT"],
    stateConditions: { sleep: "<=4", stress: ">=7" },
    requiredEvidence: ["atestado", "prontuario"],
    outputBlocks: ["EXEC_SUMMARY", "ACTIONS_7D", "ACTIONS_90D"],
    actions7d: [
      "Higiene do sono 14 dias",
      "Caminhada 20min/dia",
      "Corte de multitarefa"
    ],
    actions90d: [
      "Terapia/grupo",
      "Redesenho de carga/agenda"
    ],
    avoid: ["Aumentar carga por orgulho"],
    calendarRules: [],
    description: "Burnout com sono crítico (≤4h) e estresse elevado (≥7)"
  },

  V04: {
    id: "V04",
    area: "vida",
    triggers: ["picos e quedas", "ciclo", "sempre volta", "instabilidade"],
    tags: ["CICLO_VOLATIL"],
    stateConditions: { volatility: ">=6" },
    requiredEvidence: ["extrato_bancario", "VARIACAO_MENSAL"],
    outputBlocks: ["EXEC_SUMMARY", "ACTIONS_7D", "CALENDAR_TABLE"],
    actions7d: [
      "Travas de gasto (teto)",
      "Mapa de gatilhos (3+)",
      "Regra pausa 48h"
    ],
    actions90d: [
      "Reserva + envelopes",
      "Revisão mensal anti-ciclo"
    ],
    avoid: ["Decidir em euforia/desespero"],
    calendarRules: [],
    description: "Ciclo volátil com variação mensal alta (≥6)"
  },

  V05: {
    id: "V05",
    area: "vida",
    triggers: ["sozinho", "sem apoio", "ninguém ajuda"],
    tags: ["REDE_BAIXA"],
    stateConditions: { support_network: "<=3" },
    requiredEvidence: [],
    outputBlocks: ["EXEC_SUMMARY", "ACTIONS_7D", "ACTIONS_90D"],
    actions7d: [
      "Lista 10 pessoas",
      "Ativar 2 contatos",
      "Entrar em 1 grupo"
    ],
    actions90d: [
      "Rotina social mínima semanal",
      "Rede de 5 apoios fortes"
    ],
    avoid: ["Isolamento prolongado"],
    calendarRules: [],
    description: "Rede de apoio baixa (≤3 contatos)"
  },

  V06: {
    id: "V06",
    area: "vida",
    triggers: ["briga", "discussão", "conflito em casa"],
    tags: ["CONFLITO_FAMILIAR"],
    stateConditions: { relationship_strain: ">=6" },
    requiredEvidence: [],
    outputBlocks: ["EXEC_SUMMARY", "ACTIONS_7D"],
    actions7d: [
      "Protocolo de conflito (pausa)",
      "Linguagem neutra",
      "Acordos mínimos"
    ],
    actions90d: [
      "Mediação/terapia (se aplicável)",
      "Rotina de reconexão"
    ],
    avoid: ["Resolver sob adrenalina"],
    calendarRules: [],
    description: "Conflito familiar com tensão elevada (≥6)"
  },

  V07: {
    id: "V07",
    area: "vida",
    triggers: ["arrimo", "dependente", "mãe doente", "filhos"],
    tags: ["RESPONSABILIDADE_ALTA"],
    stateConditions: { dependents: ">=1" },
    requiredEvidence: ["decl_dependentes"],
    outputBlocks: ["EXEC_SUMMARY", "SCENARIOS_FIN"],
    actions7d: [
      "Priorizar despesas fixas",
      "Cortar risco",
      "Planejar piso de caixa"
    ],
    actions90d: [
      "Revisar benefícios/direitos",
      "Reforçar rede de apoio"
    ],
    avoid: ["Compromissos sem folga"],
    calendarRules: [],
    description: "Responsabilidade alta com dependentes (≥1)"
  },

  V08: {
    id: "V08",
    area: "vida",
    triggers: ["prazo", "audiência", "intimação", "urgente"],
    tags: ["PRAZO_CRITICO", "AUDIENCIA"],
    stateConditions: { urgency: ">=6" },
    requiredEvidence: ["intimacao", "decisao_judicial", "PRAZO", "AUDIENCIA"],
    outputBlocks: ["EXEC_SUMMARY", "CALENDAR_TABLE", "ACTIONS_7D"],
    actions7d: [
      "Cronograma com alarmes",
      "Checklist anexos",
      "Canal único de comunicação"
    ],
    actions90d: [
      "Sistema permanente de prazos"
    ],
    avoid: ["Comunicação dispersa"],
    calendarRules: [],
    description: "Prazo crítico ou audiência com urgência alta (≥6)"
  },

  V09: {
    id: "V09",
    area: "vida",
    triggers: ["não sei quanto devo", "perdi o controle", "confuso"],
    tags: ["ENTROPIA_INFO"],
    stateConditions: { info_entropy: ">=6" },
    requiredEvidence: [],
    outputBlocks: ["EXEC_SUMMARY", "ACTIONS_7D"],
    actions7d: [
      "Inventário 48h (dívidas/receitas)",
      "Planilha mestre",
      "Linha do tempo"
    ],
    actions90d: [
      "Auditoria mensal",
      "Automatizar lançamentos"
    ],
    avoid: ["Assinar sem ler"],
    calendarRules: [],
    description: "Entropia informacional com desorganização (≥6)"
  },

  V10: {
    id: "V10",
    area: "vida",
    triggers: ["dependo de", "emprestado", "ajuda"],
    tags: ["DEPENDENCIA_TERCEIROS"],
    stateConditions: { external_dependency: ">=6" },
    requiredEvidence: [],
    outputBlocks: ["EXEC_SUMMARY", "SCENARIOS_FIN"],
    actions7d: [
      "Meta redução dependência 10%",
      "Formalizar apoio com prazo",
      "Cortar vazamentos"
    ],
    actions90d: [
      "Autonomia gradual",
      "Renda compatível e estável"
    ],
    avoid: ["Promessas vagas"],
    calendarRules: [],
    description: "Dependência de terceiros elevada (≥6)"
  },

  V11: {
    id: "V11",
    area: "vida",
    triggers: ["mudança", "viagem", "deslocamento"],
    tags: ["LOGISTICA"],
    stateConditions: { logistics_risk: ">=5" },
    requiredEvidence: ["passagem", "reserva"],
    outputBlocks: ["EXEC_SUMMARY", "CALENDAR_TABLE"],
    actions7d: [
      "Plano de continuidade",
      "Backup de documentos",
      "Caixa extra p/ logística"
    ],
    actions90d: [
      "Rotina estável pós-mudança"
    ],
    avoid: ["Viajar sem reserva"],
    calendarRules: [],
    description: "Risco logístico com mudança/viagem (≥5)"
  },

  V12: {
    id: "V12",
    area: "vida",
    triggers: ["banco", "órgão", "autoridade", "instituição"],
    tags: ["CONFLITO_AUTORIDADE"],
    stateConditions: { authority_conflict: ">=6" },
    requiredEvidence: ["protocolo", "reclamacao", "peticao"],
    outputBlocks: ["EXEC_SUMMARY", "EVIDENCE_MAP"],
    actions7d: [
      "Tom técnico",
      "Documentar tudo",
      "Evitar telefonema sem protocolo"
    ],
    actions90d: [
      "Escalonar (admin→judicial)",
      "Blindar reputação"
    ],
    avoid: ["Explodir em público/redes"],
    calendarRules: [],
    description: "Conflito com autoridade/instituição (≥6)"
  },

  V13: {
    id: "V13",
    area: "vida",
    triggers: ["dor crônica", "tratamento", "saúde"],
    tags: ["SAUDE_ALTA"],
    stateConditions: { health_load: ">=6" },
    requiredEvidence: ["exame", "laudo_medico"],
    outputBlocks: ["EXEC_SUMMARY", "ACTIONS_7D"],
    actions7d: [
      "Agenda mínima de cuidado",
      "Sono e hidratação",
      "Reduzir estressores"
    ],
    actions90d: [
      "Acompanhamento regular",
      "Plano de energia"
    ],
    avoid: ["Negligenciar sinais"],
    calendarRules: [],
    description: "Saúde crítica com carga alta (≥6)"
  },

  V14: {
    id: "V14",
    area: "vida",
    triggers: ["recuperar tudo rápido", "preciso de milagre", "agora"],
    tags: ["URGENCIA_PSIC"],
    stateConditions: { risk_pressure: ">=6" },
    requiredEvidence: [],
    outputBlocks: ["EXEC_SUMMARY", "SCENARIOS_FIN"],
    actions7d: [
      "Desalavancar metas",
      "3 marcos realistas",
      "Congelar decisões grandes"
    ],
    actions90d: [
      "Plano incremental",
      "Revisão mensal"
    ],
    avoid: ["All-in financeiro"],
    calendarRules: [],
    description: "Urgência psicológica com pressão de risco (≥6)"
  },

  V15: {
    id: "V15",
    area: "vida",
    triggers: ["perseguição", "sempre injustiça", "me sabotam"],
    tags: ["TRAUMA_INST"],
    stateConditions: { threat_bias: ">=6" },
    requiredEvidence: [],
    outputBlocks: ["EXEC_SUMMARY", "EVIDENCE_MAP"],
    actions7d: [
      "Separar fatos/hipóteses",
      "Buscar evidência",
      "Tom técnico"
    ],
    actions90d: [
      "Apoio psicológico",
      "Validação externa"
    ],
    avoid: ["Confirmação de bias"],
    calendarRules: [],
    description: "Trauma institucional com viés de ameaça (≥6)"
  },

  V16: {
    id: "V16",
    area: "vida",
    triggers: ["vício", "compulsão", "hábito ruim"],
    tags: ["COMPULSAO"],
    stateConditions: { compulsion_risk: ">=6" },
    requiredEvidence: [],
    outputBlocks: ["EXEC_SUMMARY", "ACTIONS_7D", "ACTIONS_90D"],
    actions7d: [
      "Identificar gatilho",
      "Substituição imediata",
      "Ativar rede"
    ],
    actions90d: [
      "Terapia comportamental",
      "Rotina anti-compulsão"
    ],
    avoid: ["Culpa/vergonha"],
    calendarRules: [],
    description: "Compulsão ou vício com risco elevado (≥6)"
  },

  V17: {
    id: "V17",
    area: "vida",
    triggers: ["objetivo claro", "meta definida", "próximo passo"],
    tags: ["MOMENTUM_POSITIVO"],
    stateConditions: { clarity: ">=7", momentum: ">=6" },
    requiredEvidence: [],
    outputBlocks: ["EXEC_SUMMARY", "ACTIONS_7D", "ACTIONS_90D"],
    actions7d: [
      "Executar primeiro passo",
      "Documentar progresso",
      "Celebrar pequenas vitórias"
    ],
    actions90d: [
      "Revisar e ajustar",
      "Expandir escopo"
    ],
    avoid: ["Perfecionismo paralisante"],
    calendarRules: [],
    description: "Momentum positivo com clareza de objetivo (≥7)"
  },

  V18: {
    id: "V18",
    area: "vida",
    triggers: ["mudança de perspectiva", "insight", "virada"],
    tags: ["TRANSFORMACAO"],
    stateConditions: { transformation_readiness: ">=6" },
    requiredEvidence: [],
    outputBlocks: ["EXEC_SUMMARY", "SCENARIOS_FIN"],
    actions7d: [
      "Consolidar novo entendimento",
      "Comunicar mudança",
      "Primeiros passos"
    ],
    actions90d: [
      "Integrar novo padrão",
      "Revisar crenças limitantes"
    ],
    avoid: ["Voltar ao padrão antigo"],
    calendarRules: [],
    description: "Transformação com prontidão para mudança (≥6)"
  },

  V19: {
    id: "V19",
    area: "vida",
    triggers: ["luto", "perda", "morte", "fim"],
    tags: ["LUTO"],
    stateConditions: { grief_intensity: ">=6" },
    requiredEvidence: [],
    outputBlocks: ["EXEC_SUMMARY", "ACTIONS_7D"],
    actions7d: [
      "Permitir sentimento",
      "Ativar rede",
      "Cuidado básico"
    ],
    actions90d: [
      "Apoio profissional",
      "Ritualização",
      "Ressignificação"
    ],
    avoid: ["Suprimir emoção"],
    calendarRules: [],
    description: "Luto com intensidade elevada (≥6)"
  },

  V20: {
    id: "V20",
    area: "vida",
    triggers: ["celebração", "conquista", "êxito"],
    tags: ["CELEBRACAO"],
    stateConditions: { achievement: ">=7", satisfaction: ">=7" },
    requiredEvidence: [],
    outputBlocks: ["EXEC_SUMMARY"],
    actions7d: [
      "Reconhecer conquista",
      "Compartilhar com rede",
      "Descanso merecido"
    ],
    actions90d: [
      "Consolidar aprendizado",
      "Próximo objetivo"
    ],
    avoid: ["Minimizar êxito"],
    calendarRules: [],
    description: "Celebração com alta satisfação (≥7)"
  },
};

/**
 * Função para encontrar paradigmas relevantes baseado em dados do usuário
 */
export function findRelevantParadigms(userState: Record<string, number>): string[] {
  const relevant: string[] = [];

  for (const [paradigmId, paradigm] of Object.entries(paradigmsCatalog)) {
    // Verificar condições de estado
    let matches = true;
    for (const [key, condition] of Object.entries(paradigm.stateConditions)) {
      const userValue = userState[key] ?? 0;
      
      if (typeof condition === "string") {
        if (condition.includes(">=")) {
          const threshold = parseInt(condition.split(">=")[1]);
          if (userValue < threshold) matches = false;
        } else if (condition.includes("<=")) {
          const threshold = parseInt(condition.split("<=")[1]);
          if (userValue > threshold) matches = false;
        } else if (condition.includes("==")) {
          const threshold = parseInt(condition.split("==")[1]);
          if (userValue !== threshold) matches = false;
        }
      }
    }

    if (matches) {
      relevant.push(paradigmId);
    }
  }

  return relevant;
}

export function getParadigm(id: string): Paradigm | undefined {
  return paradigmsCatalog[id];
}

export function getParadigmsByArea(area: string): Paradigm[] {
  return Object.values(paradigmsCatalog).filter(p => p.area === area);
}
