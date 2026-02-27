/**
 * LLM Insights Service - Enriquecimento de relatórios com IA
 */

import { invokeLLM } from "./_core/llm";
import { paradigmsCatalog } from "@shared/paradigms";

interface InsightRequest {
  paradigmIds: string[];
  userState: Record<string, number>;
  diagnosticTitle: string;
  diagnosticDescription?: string;
}

/**
 * Gerar insights personalizados com LLM
 */
export async function generatePersonalizedInsights(request: InsightRequest): Promise<string> {
  const paradigms = request.paradigmIds
    .map(id => paradigmsCatalog[id])
    .filter(Boolean);

  const paradigmDescriptions = paradigms
    .map(p => `- ${p.id}: ${p.description || p.area}`)
    .join("\n");

  const userStateDescription = Object.entries(request.userState)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");

  const prompt = `
Você é um especialista em análise de vida e bem-estar usando o método FUSION-SAJO.

O usuário passou por um diagnóstico e os seguintes paradigmas foram identificados:

${paradigmDescriptions}

Seu estado atual:
${userStateDescription}

Diagnóstico: "${request.diagnosticTitle}"
${request.diagnosticDescription ? `Descrição: "${request.diagnosticDescription}"` : ""}

Por favor, forneça:
1. Um resumo executivo personalizado (2-3 parágrafos) explicando a situação do usuário
2. 3-5 insights principais baseados nos paradigmas identificados
3. Recomendações específicas e acionáveis para os próximos 30 dias
4. Alertas sobre possíveis armadilhas ou padrões a evitar

Mantenha um tom profissional, empático e motivador. Seja específico e prático.
`;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em análise de vida e bem-estar usando o método FUSION-SAJO. Forneça insights personalizados, práticos e motivadores.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content === "string") {
      return content;
    }

    return "Insights não disponíveis no momento.";
  } catch (error) {
    console.error("Error generating LLM insights:", error);
    return "Erro ao gerar insights com IA. Por favor, tente novamente.";
  }
}

/**
 * Gerar recomendações de ações para 7 dias
 */
export async function generateActions7d(request: InsightRequest): Promise<string[]> {
  const paradigms = request.paradigmIds
    .map(id => paradigmsCatalog[id])
    .filter(Boolean);

  const allActions = new Set<string>();
  paradigms.forEach(p => p?.actions7d.forEach(a => allActions.add(a)));

  return Array.from(allActions);
}

/**
 * Gerar recomendações de ações para 90 dias
 */
export async function generateActions90d(request: InsightRequest): Promise<string[]> {
  const paradigms = request.paradigmIds
    .map(id => paradigmsCatalog[id])
    .filter(Boolean);

  const allActions = new Set<string>();
  paradigms.forEach(p => p?.actions90d.forEach(a => allActions.add(a)));

  return Array.from(allActions);
}

/**
 * Gerar lista de coisas a evitar
 */
export async function generateAvoidList(request: InsightRequest): Promise<string[]> {
  const paradigms = request.paradigmIds
    .map(id => paradigmsCatalog[id])
    .filter(Boolean);

  const avoidItems = new Set<string>();
  paradigms.forEach(p => p?.avoid.forEach(a => avoidItems.add(a)));

  return Array.from(avoidItems);
}

/**
 * Gerar cenários financeiros com LLM
 */
export async function generateFinancialScenarios(request: InsightRequest): Promise<string> {
  const cashflowSeverity = request.userState.cashflow_severity || 0;
  const volatility = request.userState.volatility || 0;

  const prompt = `
Baseado na situação financeira do usuário:
- Severidade de fluxo de caixa: ${cashflowSeverity}/10
- Volatilidade: ${volatility}/10

Gere 3 cenários financeiros:
1. Cenário Pessimista (se as coisas piorarem)
2. Cenário Realista (continuação do padrão atual)
3. Cenário Otimista (com as ações recomendadas)

Para cada cenário, descreva:
- Situação esperada
- Impacto na vida
- Ações recomendadas

Seja prático e realista.
`;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em planejamento financeiro. Forneça cenários realistas e acionáveis.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content === "string") {
      return content;
    }

    return "Cenários não disponíveis no momento.";
  } catch (error) {
    console.error("Error generating financial scenarios:", error);
    return "Erro ao gerar cenários financeiros. Por favor, tente novamente.";
  }
}

/**
 * Gerar cenários jurídicos com LLM
 */
export async function generateJuridicalScenarios(request: InsightRequest): Promise<string> {
  const urgency = request.userState.urgency || 0;

  if (urgency < 5) {
    return "Nenhum cenário jurídico crítico identificado no momento.";
  }

  const prompt = `
O usuário tem uma urgência jurídica de ${urgency}/10.

Gere uma análise dos possíveis cenários jurídicos:
1. Cenário de Resolução Rápida
2. Cenário de Litígio Prolongado
3. Cenário de Acordo/Negociação

Para cada cenário:
- Descrição
- Prazos esperados
- Ações recomendadas
- Documentação necessária

Seja prático e baseado em experiência jurídica.
`;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em planejamento jurídico. Forneça análises realistas e acionáveis.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content === "string") {
      return content;
    }

    return "Cenários não disponíveis no momento.";
  } catch (error) {
    console.error("Error generating juridical scenarios:", error);
    return "Erro ao gerar cenários jurídicos. Por favor, tente novamente.";
  }
}
