import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, diagnostics, reports, payments, documents, emailAlerts } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Diagnósticos
 */
export async function createDiagnostic(userId: number, title: string, description?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(diagnostics).values({
    userId,
    title,
    description,
    status: "draft",
  });

  // Retornar o ID do diagnóstico criado
  const insertedId = (result as any).insertId || (result as any)[0]?.insertId;
  return insertedId || 0;
}

export async function updateDiagnosticData(diagnosticId: number, data: Record<string, unknown>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.update(diagnostics)
    .set({
      financialData: data.financialData,
      healthData: data.healthData,
      relationshipData: data.relationshipData,
      lifeData: data.lifeData,
      juridicalData: data.juridicalData,
      identifiedParadigms: data.identifiedParadigms,
      status: "completed",
    })
    .where(eq(diagnostics.id, diagnosticId));
}

export async function getDiagnosticsByUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select().from(diagnostics)
    .where(eq(diagnostics.userId, userId))
    .orderBy(diagnostics.createdAt);
}

export async function getDiagnosticById(diagnosticId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select().from(diagnostics)
    .where(eq(diagnostics.id, diagnosticId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Relatórios
 */
export async function createReport(diagnosticId: number, userId: number, reportData: Record<string, unknown>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(reports).values({
    diagnosticId,
    userId,
    executiveSummary: reportData.executiveSummary as string,
    technicalDiagnosis: reportData.technicalDiagnosis as string,
    financialScenarios: reportData.financialScenarios as string,
    juridicalScenarios: reportData.juridicalScenarios as string,
    calendarTable: reportData.calendarTable,
    actions7d: reportData.actions7d,
    actions90d: reportData.actions90d,
    avoidList: reportData.avoidList,
    evidenceMap: reportData.evidenceMap,
    auditLogHints: reportData.auditLogHints,
    llmInsights: reportData.llmInsights as string,
  });
}

export async function getReportsByUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select().from(reports)
    .where(eq(reports.userId, userId))
    .orderBy(reports.createdAt);
}

export async function getReportById(reportId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select().from(reports)
    .where(eq(reports.id, reportId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Pagamentos
 */
export async function createPayment(diagnosticId: number, userId: number, amount: string, paymentMethod: "pix" | "credit_card") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(payments).values({
    diagnosticId,
    userId,
    amount,
    currency: "BRL",
    paymentMethod,
    status: "pending",
  });
}

export async function updatePaymentStatus(paymentId: number, status: "completed" | "failed" | "refunded", externalPaymentId?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: Record<string, unknown> = { status };
  if (externalPaymentId) updateData.externalPaymentId = externalPaymentId;

  return await db.update(payments)
    .set(updateData)
    .where(eq(payments.id, paymentId));
}

export async function getPaymentsByUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select().from(payments)
    .where(eq(payments.userId, userId))
    .orderBy(payments.createdAt);
}

export async function getPaymentByDiagnostic(diagnosticId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select().from(payments)
    .where(eq(payments.diagnosticId, diagnosticId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Documentos
 */
export async function createDocument(diagnosticId: number, userId: number, filename: string, fileType: string, s3Key: string, s3Url: string, documentType?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(documents).values({
    diagnosticId,
    userId,
    filename,
    fileType,
    s3Key,
    s3Url,
    documentType,
  });
}

export async function getDocumentsByDiagnostic(diagnosticId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select().from(documents)
    .where(eq(documents.diagnosticId, diagnosticId))
    .orderBy(documents.createdAt);
}

/**
 * Email Alerts
 */
export async function createEmailAlert(userId: number, reportId: number, alertType: string, alertTitle: string, alertContent: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(emailAlerts).values({
    userId,
    reportId,
    alertType,
    alertTitle,
    alertContent,
  });
}

export async function getEmailAlertsByUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select().from(emailAlerts)
    .where(eq(emailAlerts.userId, userId))
    .orderBy(emailAlerts.sentAt);
}
