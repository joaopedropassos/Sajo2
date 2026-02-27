/**
 * Pix Payment Service - Integração com Pix estático
 * Usa a chave Pix fornecida para gerar QR codes e processar pagamentos
 */

interface PixPaymentRequest {
  amount: number;
  description: string;
  externalReference: string;
}

interface PixPaymentResponse {
  qrCode: string;
  copyPaste: string;
  externalReference: string;
  amount: number;
}

// Chave Pix estática (QR Code)
const PIX_STATIC_QR_CODE =
  "00020126580014BR.GOB.BCB.PIX01364c8c18a0-cac9-4589-9057-43403da03bfe520400005303986540520.005802BR5925Joao Pedro Pereira Passos6009SAO PAULO61080540900062290525DESTINOABENCOADOTEAGUARDA6304E26A";

/**
 * Gerar QR Code Pix para pagamento
 * Nota: Em produção, você usaria uma biblioteca como qrcode para gerar a imagem
 */
export function generatePixQRCode(request: PixPaymentRequest): PixPaymentResponse {
  // Para desenvolvimento, retornamos o QR code estático
  // Em produção, você integraria com a API do Banco para gerar QR codes dinâmicos

  return {
    qrCode: PIX_STATIC_QR_CODE,
    copyPaste: PIX_STATIC_QR_CODE,
    externalReference: request.externalReference,
    amount: request.amount,
  };
}

/**
 * Validar se um pagamento foi confirmado
 * Nota: Em produção, você integraria com webhooks do banco para confirmar pagamentos
 */
export async function validatePixPayment(
  externalReference: string
): Promise<boolean> {
  // Em desenvolvimento, simular confirmação após 5 segundos
  // Em produção, verificar com o banco via API ou webhook

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 5000);
  });
}

/**
 * Obter informações do Pix
 */
export function getPixInfo(): {
  key: string;
  holder: string;
  bank: string;
  amount: number;
} {
  return {
    key: "00020126580014BR.GOB.BCB.PIX01364c8c18a0-cac9-4589-9057-43403da03bfe520400005303986540520.005802BR5925Joao Pedro Pereira Passos6009SAO PAULO61080540900062290525DESTINOABENCOADOTEAGUARDA6304E26A",
    holder: "João Pedro Pereira Passos",
    bank: "Banco do Brasil",
    amount: 20.0,
  };
}

/**
 * Formatar valor para Pix (em centavos)
 */
export function formatPixAmount(amount: number): string {
  return (amount * 100).toFixed(0);
}
