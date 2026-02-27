import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Plus, FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const { data: diagnostics, isLoading: diagnosticsLoading } = trpc.diagnostic.list.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: reports, isLoading: reportsLoading } = trpc.report.list.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: payments, isLoading: paymentsLoading } = trpc.payment.list.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  const isLoading = diagnosticsLoading || reportsLoading || paymentsLoading;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Bem-vindo, {user?.name || "Usuário"}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Gerencie seus diagnósticos e relatórios FUSION-SAJO
              </p>
            </div>
            <Button
              onClick={() => navigate("/diagnostic/new")}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Diagnóstico
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Diagnósticos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {diagnostics?.length || 0}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    Total de diagnósticos realizados
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Relatórios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {reports?.length || 0}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    Relatórios gerados
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Pagamentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {payments?.filter(p => p.status === "completed").length || 0}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    Diagnósticos pagos
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Diagnostics List */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Seus Diagnósticos
              </h2>

              {diagnostics && diagnostics.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {diagnostics.map((diagnostic) => {
                    const payment = payments?.find(p => p.diagnosticId === diagnostic.id);
                    const report = reports?.find(r => r.diagnosticId === diagnostic.id);

                    return (
                      <Card
                        key={diagnostic.id}
                        className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => navigate(`/diagnostic/${diagnostic.id}`)}
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{diagnostic.title}</CardTitle>
                              <CardDescription>{diagnostic.description}</CardDescription>
                            </div>
                            <div className="flex gap-2">
                              {diagnostic.status === "completed" && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Completo
                                </span>
                              )}
                              {diagnostic.status === "draft" && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-medium">
                                  <Clock className="w-3 h-3" />
                                  Rascunho
                                </span>
                              )}
                              {payment?.status === "pending" && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 text-xs font-medium">
                                  <AlertCircle className="w-3 h-3" />
                                  Aguardando Pagamento
                                </span>
                              )}
                              {report && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium">
                                  <FileText className="w-3 h-3" />
                                  Relatório
                                </span>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
                            <span>
                              Criado em {new Date(diagnostic.createdAt).toLocaleDateString("pt-BR")}
                            </span>
                            <Button variant="ghost" size="sm">
                              Ver Detalhes →
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="py-12 text-center">
                    <FileText className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Você ainda não tem diagnósticos. Comece um novo diagnóstico agora!
                    </p>
                    <Button
                      onClick={() => navigate("/diagnostic/new")}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Diagnóstico
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
