import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3, Brain, Clock, Lock, Zap } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (isAuthenticated && user) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">FUSION-SAJO</span>
          </div>
          <a href={getLoginUrl()}>
            <Button variant="outline">Entrar</Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Diagnósticos Personalizados para sua Vida
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Análise profunda e inteligente de sua situação financeira, jurídica, saúde e relacionamentos. Receba recomendações acionáveis baseadas em paradigmas comprovados.
            </p>
            <div className="flex gap-4">
              <a href={getLoginUrl()}>
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  Começar Diagnóstico Astrológico <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-3xl opacity-20"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Análise Financeira Completa</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Paradigmas Inteligentes</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Ações 7d e 90d</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Zap className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Insights com IA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Recursos Poderosos
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Tudo que você precisa para entender e transformar sua situação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Brain className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-2" />
              <CardTitle>Análise Inteligente</CardTitle>
              <CardDescription>Motor de análise baseado em 20+ paradigmas comprovados</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Identifica automaticamente sua situação e recomenda ações específicas para sua vida.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
              <CardTitle>Relatórios Detalhados</CardTitle>
              <CardDescription>Diagnósticos completos com cenários e calendários</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Receba relatórios executivos com blocos de análise, ações prioritárias e evidências.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
              <CardTitle>Plano de Ação</CardTitle>
              <CardDescription>Ações estruturadas para 7 e 90 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Saiba exatamente o que fazer agora e nos próximos meses para transformar sua vida.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Lock className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
              <CardTitle>Segurança de Dados</CardTitle>
              <CardDescription>Seus dados são protegidos com criptografia</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Privacidade garantida com os mais altos padrões de segurança da indústria.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mb-2" />
              <CardTitle>Insights com IA</CardTitle>
              <CardDescription>Recomendações personalizadas com inteligência artificial</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Receba insights contextualizados baseados em sua situação específica.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-red-600 dark:text-red-400 mb-2" />
              <CardTitle>Histórico Completo</CardTitle>
              <CardDescription>Acompanhe sua evolução ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Acesse todos os seus diagnósticos anteriores e veja seu progresso.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pronto para transformar sua vida?
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Comece seu diagnóstico FUSION-SAJO hoje e receba um plano de ação personalizado.
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-slate-100">
              Começar Agora <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span className="font-semibold text-slate-900 dark:text-white">FUSION-SAJO</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © 2026 FUSION-SAJO. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
