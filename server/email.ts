/**
 * Email Service - Envio de alertas e notificações
 */

import nodemailer from "nodemailer";
import * as db from "./db";

// Configuração do serviço de email (será injetada via env)
const EMAIL_SERVICE = process.env.EMAIL_SERVICE || "gmail";
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@fusion-sajo.com";

let transporter: nodemailer.Transporter | null = null;

/**
 * Inicializar transporter de email
 */
function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    if (EMAIL_SERVICE === "gmail") {
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASSWORD,
        },
      });
    } else {
      // Configuração genérica SMTP
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASSWORD,
        },
      });
    }
  }
  return transporter;
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Enviar email genérico
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

/**
 * Enviar alerta de prazo crítico
 */
export async function sendCriticalDeadlineAlert(
  userId: number,
  reportId: number,
  userEmail: string,
  deadlineTitle: string,
  deadlineDate: Date,
  actionRequired: string
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">⚠️ Alerta de Prazo Crítico</h2>
      <p>Olá,</p>
      <p>Identificamos um prazo crítico em seu diagnóstico FUSION-SAJO que requer sua atenção:</p>
      
      <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; margin: 20px 0;">
        <p style="margin: 0; font-weight: bold; color: #7f1d1d;">${deadlineTitle}</p>
        <p style="margin: 8px 0; color: #991b1b;">
          <strong>Data:</strong> ${deadlineDate.toLocaleDateString("pt-BR")}
        </p>
        <p style="margin: 8px 0; color: #991b1b;">
          <strong>Ação Recomendada:</strong> ${actionRequired}
        </p>
      </div>

      <p>Este alerta foi gerado automaticamente baseado na análise de seu diagnóstico.</p>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://fusion-sajo.manus.space/reports/${reportId}" 
           style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Ver Relatório Completo
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
      <p style="color: #6b7280; font-size: 12px;">
        FUSION-SAJO | Diagnósticos Personalizados<br>
        Este é um alerta automático. Não responda este email.
      </p>
    </div>
  `;

  const success = await sendEmail({
    to: userEmail,
    subject: `⚠️ Alerta Crítico: ${deadlineTitle}`,
    html,
    text: `Alerta de prazo crítico: ${deadlineTitle} em ${deadlineDate.toLocaleDateString("pt-BR")}`,
  });

  if (success) {
    await db.createEmailAlert(
      userId,
      reportId,
      "prazo_critico",
      deadlineTitle,
      actionRequired
    );
  }

  return success;
}

/**
 * Enviar alerta de audiência judicial
 */
export async function sendHearingAlert(
  userId: number,
  reportId: number,
  userEmail: string,
  hearingTitle: string,
  hearingDate: Date,
  location: string
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #ea580c;">📅 Alerta de Audiência Judicial</h2>
      <p>Olá,</p>
      <p>Você tem uma audiência judicial agendada que foi identificada em seu diagnóstico:</p>
      
      <div style="background-color: #fed7aa; border-left: 4px solid #ea580c; padding: 16px; margin: 20px 0;">
        <p style="margin: 0; font-weight: bold; color: #92400e;">${hearingTitle}</p>
        <p style="margin: 8px 0; color: #b45309;">
          <strong>Data e Hora:</strong> ${hearingDate.toLocaleDateString("pt-BR")} ${hearingDate.toLocaleTimeString("pt-BR")}
        </p>
        <p style="margin: 8px 0; color: #b45309;">
          <strong>Local:</strong> ${location}
        </p>
      </div>

      <p><strong>Recomendações:</strong></p>
      <ul style="color: #6b7280;">
        <li>Compareça com antecedência</li>
        <li>Leve toda a documentação necessária</li>
        <li>Consulte seu advogado se necessário</li>
      </ul>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://fusion-sajo.manus.space/reports/${reportId}" 
           style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Ver Detalhes
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
      <p style="color: #6b7280; font-size: 12px;">
        FUSION-SAJO | Diagnósticos Personalizados<br>
        Este é um alerta automático. Não responda este email.
      </p>
    </div>
  `;

  const success = await sendEmail({
    to: userEmail,
    subject: `📅 Alerta: ${hearingTitle}`,
    html,
    text: `Audiência judicial: ${hearingTitle} em ${hearingDate.toLocaleDateString("pt-BR")}`,
  });

  if (success) {
    await db.createEmailAlert(
      userId,
      reportId,
      "audiencia",
      hearingTitle,
      `Audiência em ${location}`
    );
  }

  return success;
}

/**
 * Enviar relatório gerado
 */
export async function sendReportNotification(
  userId: number,
  reportId: number,
  userEmail: string,
  userName: string
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #059669;">✅ Seu Relatório FUSION-SAJO está Pronto!</h2>
      <p>Olá ${userName},</p>
      <p>Seu diagnóstico foi processado com sucesso e seu relatório personalizado está disponível para visualização.</p>
      
      <div style="background-color: #ecfdf5; border-left: 4px solid #059669; padding: 16px; margin: 20px 0;">
        <p style="margin: 0; color: #065f46;">
          Seu relatório contém:
        </p>
        <ul style="color: #065f46; margin: 8px 0;">
          <li>Resumo executivo personalizado</li>
          <li>Ações recomendadas para 7 dias</li>
          <li>Plano de ação para 90 dias</li>
          <li>Insights com inteligência artificial</li>
          <li>Calendário de prazos críticos</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://fusion-sajo.manus.space/reports/${reportId}" 
           style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Acessar Relatório
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
      <p style="color: #6b7280; font-size: 12px;">
        FUSION-SAJO | Diagnósticos Personalizados<br>
        Este é um alerta automático. Não responda este email.
      </p>
    </div>
  `;

  return await sendEmail({
    to: userEmail,
    subject: "✅ Seu Relatório FUSION-SAJO está Pronto!",
    html,
    text: "Seu relatório personalizado está disponível para visualização.",
  });
}
