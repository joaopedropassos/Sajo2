/**
 * Payment Service - Integração com Mercado Pago
 * Suporta Pix e Cartão de Crédito
 */

import axios from "axios";

interface CreatePaymentRequest {
  amount: number;
  currency?: string;
  paymentMethod: "pix" | "credit_card";
  description: string;
  externalReference: string;
  notificationUrl?: string;
}

interface PaymentResponse {
  id: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  paymentUrl?: string;
  qrCode?: string;
  qrCodeUrl?: string;
}

// Configuração do Mercado Pago (será injetada via env)
const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;
const MERCADO_PAGO_API_BASE = "https://api.mercadopago.com/v1";

/**
 * Criar pagamento com Pix
 */
export async function createPixPayment(request: CreatePaymentRequest): Promise<PaymentResponse> {
  if (!MERCADO_PAGO_ACCESS_TOKEN) {
    throw new Error("Mercado Pago access token not configured");
  }

  try {
    const response = await axios.post(
      `${MERCADO_PAGO_API_BASE}/payments`,
      {
        transaction_amount: request.amount,
        description: request.description,
        external_reference: request.externalReference,
        payment_method_id: "pix",
        payer: {
          email: "customer@example.com", // Será preenchido dinamicamente
        },
        notification_url: request.notificationUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      id: response.data.id,
      status: response.data.status,
      qrCode: response.data.point_of_interaction?.transaction_data?.qr_code,
      qrCodeUrl: response.data.point_of_interaction?.transaction_data?.qr_code_url,
    };
  } catch (error) {
    console.error("Error creating Pix payment:", error);
    throw new Error("Failed to create Pix payment");
  }
}

/**
 * Criar pagamento com Cartão de Crédito
 */
export async function createCreditCardPayment(
  request: CreatePaymentRequest & {
    cardToken: string;
    installments?: number;
  }
): Promise<PaymentResponse> {
  if (!MERCADO_PAGO_ACCESS_TOKEN) {
    throw new Error("Mercado Pago access token not configured");
  }

  try {
    const response = await axios.post(
      `${MERCADO_PAGO_API_BASE}/payments`,
      {
        transaction_amount: request.amount,
        description: request.description,
        external_reference: request.externalReference,
        payment_method_id: "credit_card",
        token: request.cardToken,
        installments: request.installments || 1,
        payer: {
          email: "customer@example.com", // Será preenchido dinamicamente
        },
        notification_url: request.notificationUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      id: response.data.id,
      status: response.data.status,
    };
  } catch (error) {
    console.error("Error creating credit card payment:", error);
    throw new Error("Failed to create credit card payment");
  }
}

/**
 * Obter status do pagamento
 */
export async function getPaymentStatus(paymentId: string): Promise<PaymentResponse> {
  if (!MERCADO_PAGO_ACCESS_TOKEN) {
    throw new Error("Mercado Pago access token not configured");
  }

  try {
    const response = await axios.get(
      `${MERCADO_PAGO_API_BASE}/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      }
    );

    return {
      id: response.data.id,
      status: response.data.status,
    };
  } catch (error) {
    console.error("Error getting payment status:", error);
    throw new Error("Failed to get payment status");
  }
}

/**
 * Verificar webhook do Mercado Pago
 */
export function verifyMercadoPagoWebhook(
  signature: string,
  timestamp: string,
  body: string
): boolean {
  // Implementar verificação de assinatura do Mercado Pago
  // Por enquanto, retornar true para desenvolvimento
  return true;
}
