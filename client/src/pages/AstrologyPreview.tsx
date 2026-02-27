import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation, useRoute } from "wouter";
import { Loader2, ChevronLeft, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AstrologyPreview() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [, params] = useRoute("/diagnostic/:id/preview");
  const diagnosticId = params?.id ? parseInt(params.id) : null;
  const [copied, setCopied] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const { data: diagnostic, isLoading } = trpc.diagnostic.getById.useQuery(
    { id: diagnosticId! },
    { enabled: isAuthenticated && !!diagnosticId }
  );

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  if (!diagnosticId) {
    navigate("/dashboard");
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!diagnostic) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="mb-4"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Diagnóstico não encontrado
            </h1>
          </div>
        </header>
      </div>
    );
  }

  const copyToClipboard = () => {
    const pixKey =
      "00020126580014BR.GOB.BCB.PIX01364c8c18a0-cac9-4589-9057-43403da03bfe520400005303986540520.005802BR5925Joao Pedro Pereira Passos6009SAO PAULO61080540900062290525DESTINOABENCOADOTEAGUARDA6304E26A";
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Chave Pix copiada!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Seu Perfil Astrológico
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Preview - Desbloqueie o relatório completo com Pix
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Astrological Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sun Sign */}
            <Card className="border-slate-200 dark:border-slate-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <CardHeader>
                <CardTitle className="text-2xl">☀️ Seu Signo Solar</CardTitle>
                <CardDescription>Sua essência e identidade central</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  Leão
                </p>
                <p className="text-slate-700 dark:text-slate-300 mt-2">
                  Confiante, criativo e generoso. Você é um natural performer que inspira os outros.
                </p>
              </CardContent>
            </Card>

            {/* Moon Sign */}
            <Card className="border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardHeader>
                <CardTitle className="text-2xl">🌙 Seu Signo Lunar</CardTitle>
                <CardDescription>Suas emoções e mundo interior</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                  Escorpião
                </p>
                <p className="text-slate-700 dark:text-slate-300 mt-2">
                  Intenso, misterioso e transformador. Você tem grande poder de regeneração e profundidade emocional.
                </p>
              </CardContent>
            </Card>

            {/* Ascendant */}
            <Card className="border-slate-200 dark:border-slate-800 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
              <CardHeader>
                <CardTitle className="text-2xl">⬆️ Seu Ascendente</CardTitle>
                <CardDescription>Como você é percebido pelos outros</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-rose-600 dark:text-rose-400">
                  Libra
                </p>
                <p className="text-slate-700 dark:text-slate-300 mt-2">
                  Equilibrado, diplomático e social. Você busca harmonia e valoriza relacionamentos.
                </p>
              </CardContent>
            </Card>

            {/* Strengths */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle>💪 Seus Pontos Fortes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Confiança",
                    "Criatividade",
                    "Generosidade",
                    "Carisma",
                    "Coragem",
                    "Liderança",
                  ].map((strength, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-sm font-medium"
                    >
                      {strength}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Info */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>✨ Desbloqueie agora:</strong> Acesse o relatório completo com análise detalhada de suas áreas de desenvolvimento, recomendações personalizadas e muito mais!
              </p>
            </div>
          </div>

          {/* Right: Payment Section */}
          <div className="lg:col-span-1">
            <Card className="border-indigo-300 dark:border-indigo-700 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">🔓 Desbloqueie Agora</CardTitle>
                <CardDescription>Acesse o relatório completo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!showPayment ? (
                  <>
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                        Valor
                      </p>
                      <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        R$ 20,00
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        Pagamento único por diagnóstico
                      </p>
                    </div>

                    <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <p className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                        <span>Relatório completo com insights</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                        <span>Ações para 7 e 90 dias</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                        <span>Análise com IA personalizada</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                        <span>Calendário de prazos críticos</span>
                      </p>
                    </div>

                    <Button
                      onClick={() => setShowPayment(true)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                      size="lg"
                    >
                      Pagar com Pix
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                        Escaneie o QR Code
                      </p>
                      <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <p className="text-slate-500 dark:text-slate-400">QR Code Pix</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Ou copie a chave:
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value="00020126580014BR.GOB.BCB.PIX..."
                          readOnly
                          className="flex-1 px-3 py-2 text-xs bg-slate-100 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={copyToClipboard}
                          className="px-3"
                        >
                          {copied ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                      <p className="text-xs text-yellow-900 dark:text-yellow-100">
                        <strong>⏱️ Aguardando pagamento...</strong> Após confirmar o Pix, seu relatório será liberado automaticamente.
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setShowPayment(false)}
                      className="w-full"
                    >
                      Cancelar
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
