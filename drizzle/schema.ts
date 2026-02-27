import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Diagnósticos: armazena entrada de dados do usuário
 */
export const diagnostics = mysqlTable("diagnostics", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  
  // Dados estruturados do diagnóstico
  financialData: json("financialData"), // cashflow_severity, stress, etc
  healthData: json("healthData"), // sleep, stress, health_load, etc
  relationshipData: json("relationshipData"), // support_network, relationship_strain, etc
  lifeData: json("lifeData"), // volatility, urgency, dependents, etc
  juridicalData: json("juridicalData"), // urgency, threat_bias, etc
  
  // Paradigmas identificados
  identifiedParadigms: json("identifiedParadigms"), // Array de IDs dos paradigmas (V01, V02, etc)
  
  status: mysqlEnum("status", ["draft", "completed", "paid"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Diagnostic = typeof diagnostics.$inferSelect;
export type InsertDiagnostic = typeof diagnostics.$inferInsert;

/**
 * Relatórios: armazena relatórios gerados
 */
export const reports = mysqlTable("reports", {
  id: int("id").autoincrement().primaryKey(),
  diagnosticId: int("diagnosticId").notNull(),
  userId: int("userId").notNull(),
  
  // Conteúdo do relatório
  executiveSummary: text("executiveSummary"),
  technicalDiagnosis: text("technicalDiagnosis"),
  financialScenarios: text("financialScenarios"),
  juridicalScenarios: text("juridicalScenarios"),
  calendarTable: json("calendarTable"), // Array de eventos críticos
  actions7d: json("actions7d"), // Array de ações para 7 dias
  actions90d: json("actions90d"), // Array de ações para 90 dias
  avoidList: json("avoidList"), // Array de coisas a evitar
  evidenceMap: json("evidenceMap"), // Mapa de evidências
  auditLogHints: json("auditLogHints"), // Dicas de auditoria
  
  // Enriquecimento com LLM
  llmInsights: text("llmInsights"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;

/**
 * Pagamentos: rastreia transações
 */
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  diagnosticId: int("diagnosticId").notNull(),
  userId: int("userId").notNull(),
  
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("BRL").notNull(),
  
  // Integração com Mercado Pago / Stripe
  paymentMethod: mysqlEnum("paymentMethod", ["pix", "credit_card"]).notNull(),
  externalPaymentId: varchar("externalPaymentId", { length: 255 }), // ID do Mercado Pago ou Stripe
  
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

/**
 * Documentos: armazena referências a documentos de evidência
 */
export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(),
  diagnosticId: int("diagnosticId").notNull(),
  userId: int("userId").notNull(),
  
  filename: varchar("filename", { length: 255 }).notNull(),
  fileType: varchar("fileType", { length: 50 }).notNull(), // pdf, jpg, png, etc
  s3Key: varchar("s3Key", { length: 500 }).notNull(), // Chave no S3
  s3Url: text("s3Url").notNull(), // URL pública do S3
  
  documentType: varchar("documentType", { length: 100 }), // extrato_bancario, laudo_medico, etc
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;

/**
 * Alertas de Email: rastreia alertas enviados
 */
export const emailAlerts = mysqlTable("emailAlerts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  reportId: int("reportId").notNull(),
  
  alertType: varchar("alertType", { length: 100 }).notNull(), // prazo_critico, audiencia, etc
  alertTitle: varchar("alertTitle", { length: 255 }).notNull(),
  alertContent: text("alertContent").notNull(),
  
  sentAt: timestamp("sentAt").defaultNow().notNull(),
  readAt: timestamp("readAt"),
});

export type EmailAlert = typeof emailAlerts.$inferSelect;
export type InsertEmailAlert = typeof emailAlerts.$inferInsert;
