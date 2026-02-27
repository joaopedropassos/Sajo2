import { COOKIE_NAME } from "@shared/const";
import { generateAstrologyProfile, generateAstrologyExecutiveSummary } from "./astrology";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { findRelevantParadigms, getParadigm } from "@shared/paradigms";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Diagnósticos
  diagnostic: router({
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        birthDate: z.date().optional(),
        birthTime: z.string().optional(),
        birthCity: z.string().optional(),
        isDaylightSaving: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const id = await db.createDiagnostic(ctx.user.id, input.title, input.description);
        return { success: true, id };
      }),

    list: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getDiagnosticsByUser(ctx.user.id);
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const diagnostic = await db.getDiagnosticById(input.id);
        if (!diagnostic || diagnostic.userId !== ctx.user.id) {
          throw new Error("Diagnostic not found or access denied");
        }
        return diagnostic;
      }),

    updateData: protectedProcedure
      .input(z.object({
        id: z.number(),
        financialData: z.record(z.string(), z.unknown()).optional(),
        healthData: z.record(z.string(), z.unknown()).optional(),
        relationshipData: z.record(z.string(), z.unknown()).optional(),
        lifeData: z.record(z.string(), z.unknown()).optional(),
        juridicalData: z.record(z.string(), z.unknown()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const diagnostic = await db.getDiagnosticById(input.id);
        if (!diagnostic || diagnostic.userId !== ctx.user.id) {
          throw new Error("Diagnostic not found or access denied");
        }

        // Combinar todos os dados para encontrar paradigmas relevantes
        const allData: Record<string, number> = {};
        if (diagnostic.financialData) Object.assign(allData, diagnostic.financialData);
        if (diagnostic.healthData) Object.assign(allData, diagnostic.healthData);
        if (diagnostic.relationshipData) Object.assign(allData, diagnostic.relationshipData);
        if (diagnostic.lifeData) Object.assign(allData, diagnostic.lifeData);
        if (diagnostic.juridicalData) Object.assign(allData, diagnostic.juridicalData);
        if (input.financialData) Object.assign(allData, input.financialData);
        if (input.healthData) Object.assign(allData, input.healthData);
        if (input.relationshipData) Object.assign(allData, input.relationshipData);
        if (input.lifeData) Object.assign(allData, input.lifeData);
        if (input.juridicalData) Object.assign(allData, input.juridicalData);

        const identifiedParadigms = findRelevantParadigms(allData);

        const updatePayload: Record<string, unknown> = {
          financialData: { ...(typeof diagnostic.financialData === 'object' && diagnostic.financialData ? diagnostic.financialData : {}), ...(input.financialData || {}) },
          healthData: { ...(typeof diagnostic.healthData === 'object' && diagnostic.healthData ? diagnostic.healthData : {}), ...(input.healthData || {}) },
          relationshipData: { ...(typeof diagnostic.relationshipData === 'object' && diagnostic.relationshipData ? diagnostic.relationshipData : {}), ...(input.relationshipData || {}) },
          lifeData: { ...(typeof diagnostic.lifeData === 'object' && diagnostic.lifeData ? diagnostic.lifeData : {}), ...(input.lifeData || {}) },
          juridicalData: { ...(typeof diagnostic.juridicalData === 'object' && diagnostic.juridicalData ? diagnostic.juridicalData : {}), ...(input.juridicalData || {}) },
          identifiedParadigms,
        };
        await db.updateDiagnosticData(input.id, updatePayload);

        return { identifiedParadigms };
      }),
  }),

  // Relatórios
  report: router({
    generate: protectedProcedure
      .input(z.object({
        diagnosticId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        const diagnostic = await db.getDiagnosticById(input.diagnosticId);
        if (!diagnostic || diagnostic.userId !== ctx.user.id) {
          throw new Error("Diagnostic not found or access denied");
        }

        // Gerar relatório baseado nos paradigmas identificados
        const paradigmIds = (diagnostic.identifiedParadigms as string[]) || [];
        const paradigms = paradigmIds.map(id => getParadigm(id)).filter(Boolean);

        // Construir blocos do relatório
        const actions7d = new Set<string>();
        const actions90d = new Set<string>();
        const avoidList = new Set<string>();
        const calendarEvents: unknown[] = [];

        for (const paradigm of paradigms) {
          paradigm?.actions7d.forEach(a => actions7d.add(a));
          paradigm?.actions90d.forEach(a => actions90d.add(a));
          paradigm?.avoid.forEach(a => avoidList.add(a));
        }

        const executiveSummary = `Diagnóstico FUSION-SAJO identificou ${paradigmIds.length} paradigma(s) relevante(s) para sua situação.`;
        const technicalDiagnosis = `Paradigmas identificados: ${paradigmIds.join(", ")}`;

        const reportData = {
          executiveSummary,
          technicalDiagnosis,
          financialScenarios: "Análise de cenários financeiros baseada nos paradigmas.",
          juridicalScenarios: "Análise de cenários jurídicos baseada nos paradigmas.",
          calendarTable: calendarEvents,
          actions7d: Array.from(actions7d),
          actions90d: Array.from(actions90d),
          avoidList: Array.from(avoidList),
          evidenceMap: {},
          auditLogHints: [],
          llmInsights: "Insights enriquecidos com LLM (será preenchido após processamento).",
        };

        await db.createReport(input.diagnosticId, ctx.user.id, reportData);
        return { success: true };
      }),

    list: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getReportsByUser(ctx.user.id);
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const report = await db.getReportById(input.id);
        if (!report || report.userId !== ctx.user.id) {
          throw new Error("Report not found or access denied");
        }
        return report;
      }),
  }),

  // Pagamentos
  payment: router({
    create: protectedProcedure
      .input(z.object({
        diagnosticId: z.number(),
        amount: z.string(),
        paymentMethod: z.enum(["pix", "credit_card"]),
      }))
      .mutation(async ({ ctx, input }) => {
        const diagnostic = await db.getDiagnosticById(input.diagnosticId);
        if (!diagnostic || diagnostic.userId !== ctx.user.id) {
          throw new Error("Diagnostic not found or access denied");
        }

        await db.createPayment(
          input.diagnosticId,
          ctx.user.id,
          input.amount,
          input.paymentMethod
        );

        return { success: true };
      }),

    list: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getPaymentsByUser(ctx.user.id);
      }),

    getByDiagnostic: protectedProcedure
      .input(z.object({ diagnosticId: z.number() }))
      .query(async ({ ctx, input }) => {
        const diagnostic = await db.getDiagnosticById(input.diagnosticId);
        if (!diagnostic || diagnostic.userId !== ctx.user.id) {
          throw new Error("Diagnostic not found or access denied");
        }

        return await db.getPaymentByDiagnostic(input.diagnosticId);
      }),
  }),

  // Documentos
  document: router({
    list: protectedProcedure
      .input(z.object({ diagnosticId: z.number() }))
      .query(async ({ ctx, input }) => {
        const diagnostic = await db.getDiagnosticById(input.diagnosticId);
        if (!diagnostic || diagnostic.userId !== ctx.user.id) {
          throw new Error("Diagnostic not found or access denied");
        }

        return await db.getDocumentsByDiagnostic(input.diagnosticId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
