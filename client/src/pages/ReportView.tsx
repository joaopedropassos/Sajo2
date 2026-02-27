import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation, useRoute } from "wouter";
import { Loader2, ChevronLeft, Download, Share2 } from "lucide-react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

export default function ReportView() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [, params] = useRoute("/reports/:id");
  const reportId = params?.id ? parseInt(params.id) : null;

  const { data: report, isLoading } = trpc.report.getById.useQuery(
    { id: reportId! },
    { enabled: isAuthenticated && !!reportId }
  );

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  if (!reportId) {
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

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="mb-4"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Relatório não encontrado
            </h1>
          </div>
        </header>
      </div>
    );
  }

  const handleDownload = () => {
    toast.success("Download iniciado...");
    // Implementar download de PDF
  };

  const handleShare = () => {
    toast.success("Link copiado para a área de transferência!");
    // Implementar compartilhamento
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Relatório FUSION-SAJO
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Gerado em {new Date(report.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Executive Summary */}
          {report.executiveSummary && (
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle>Resumo Executivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  {typeof report.executiveSummary === 'string' && <Streamdown>{report.executiveSummary}</Streamdown>}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Technical Diagnosis */}
          {report.technicalDiagnosis && report.technicalDiagnosis as any && (
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle>Diagnóstico Técnico</CardTitle>
                <CardDescription>
                  Paradigmas identificados e análise detalhada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  {typeof report.technicalDiagnosis === 'string' && <Streamdown>{report.technicalDiagnosis}</Streamdown>}
                </div>
              </CardContent>
            </Card>
          )}

          {/* LLM Insights */}
          {report.llmInsights && report.llmInsights as any && (
            <Card className="border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <CardHeader>
                <CardTitle>💡 Insights com IA</CardTitle>
                <CardDescription>
                  Recomendações personalizadas baseadas em inteligência artificial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  {typeof report.llmInsights === 'string' && <Streamdown>{report.llmInsights}</Streamdown>}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions 7d */}
          {report.actions7d && Array.isArray(report.actions7d) && report.actions7d.length > 0 && (
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle>📋 Ações para os Próximos 7 Dias</CardTitle>
                <CardDescription>
                  Prioridades imediatas para sua situação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {report.actions7d.map((action, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Actions 90d */}
          {report.actions90d && Array.isArray(report.actions90d) && report.actions90d.length > 0 && (
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle>🎯 Plano para 90 Dias</CardTitle>
                <CardDescription>
                  Objetivos de médio prazo e transformação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {report.actions90d.map((action, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-sm font-semibold text-purple-600 dark:text-purple-400">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Avoid List */}
          {report.avoidList && Array.isArray(report.avoidList) && report.avoidList.length > 0 && (
            <Card className="border-slate-200 dark:border-slate-800 border-red-200 dark:border-red-900/30">
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">⚠️ Coisas a Evitar</CardTitle>
                <CardDescription>
                  Padrões e comportamentos que podem prejudicar seu progresso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.avoidList.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-red-700 dark:text-red-400">
                      <span className="flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Financial Scenarios */}
          {report.financialScenarios && report.financialScenarios as any && (
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle>💰 Cenários Financeiros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  {typeof report.financialScenarios === 'string' && <Streamdown>{report.financialScenarios}</Streamdown>}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Juridical Scenarios */}
          {report.juridicalScenarios && report.juridicalScenarios as any && (
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle>⚖️ Cenários Jurídicos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  {typeof report.juridicalScenarios === 'string' && <Streamdown>{report.juridicalScenarios}</Streamdown>}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Calendar Table */}
          {report.calendarTable && Array.isArray(report.calendarTable) && report.calendarTable.length > 0 && (
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle>📅 Calendário de Prazos Críticos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="text-left py-2 px-4 font-semibold">Data</th>
                        <th className="text-left py-2 px-4 font-semibold">Evento</th>
                        <th className="text-left py-2 px-4 font-semibold">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.calendarTable.map((event: any, idx) => (
                        <tr key={idx} className="border-b border-slate-200 dark:border-slate-800">
                          <td className="py-2 px-4">{event.date}</td>
                          <td className="py-2 px-4">{event.title}</td>
                          <td className="py-2 px-4 text-indigo-600 dark:text-indigo-400">{event.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Pronto para transformar sua vida?
          </h3>
          <p className="text-indigo-100 mb-6">
            Comece a implementar as ações recomendadas hoje mesmo.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-indigo-600 hover:bg-slate-100"
            onClick={() => navigate("/dashboard")}
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}
