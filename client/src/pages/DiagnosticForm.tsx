import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function DiagnosticForm() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Dados financeiros
  const [cashflowSeverity, setCashflowSeverity] = useState(5);
  const [financialStress, setFinancialStress] = useState(5);
  const [volatility, setVolatility] = useState(5);

  // Dados de saúde
  const [sleep, setSleep] = useState(7);
  const [healthStress, setHealthStress] = useState(5);
  const [healthLoad, setHealthLoad] = useState(5);

  // Dados de relacionamento
  const [supportNetwork, setSupportNetwork] = useState(5);
  const [relationshipStrain, setRelationshipStrain] = useState(3);

  // Dados de vida
  const [dependents, setDependents] = useState(0);
  const [urgency, setUrgency] = useState(3);

  const createDiagnosticMutation = trpc.diagnostic.create.useMutation();
  const updateDiagnosticMutation = trpc.diagnostic.updateData.useMutation();

  const handleCreateAndUpdate = async () => {
    if (!title.trim()) {
      toast.error("Por favor, insira um título para o diagnóstico");
      return;
    }

    try {
      // Criar diagnóstico
      const result = await createDiagnosticMutation.mutateAsync({
        title,
        description,
      });

      // Atualizar com dados
      // Nota: Precisamos obter o ID do diagnóstico criado
      // Por enquanto, vamos apenas navegar para o dashboard
      toast.success("Diagnóstico criado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erro ao criar diagnóstico");
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  const totalSteps = 4;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Novo Diagnóstico
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Etapa {step} de {totalSteps}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>
              {step === 1 && "Informações Básicas"}
              {step === 2 && "Situação Financeira"}
              {step === 3 && "Saúde e Bem-estar"}
              {step === 4 && "Vida e Relacionamentos"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Comece descrevendo seu diagnóstico"}
              {step === 2 && "Avalie sua situação financeira"}
              {step === 3 && "Descreva seu estado de saúde e bem-estar"}
              {step === 4 && "Conte-nos sobre seus relacionamentos e vida"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Título do Diagnóstico</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Diagnóstico Pessoal - Fevereiro 2026"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição (Opcional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva brevemente sua situação atual..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-2 min-h-32"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Financial */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="flex justify-between">
                    <span>Severidade do Fluxo de Caixa</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{cashflowSeverity}</span>
                  </Label>
                  <Slider
                    value={[cashflowSeverity]}
                    onValueChange={(value) => setCashflowSeverity(value[0])}
                    min={0}
                    max={10}
                    step={1}
                    className="mt-2"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                    0 = Excelente | 10 = Crítico
                  </p>
                </div>

                <div>
                  <Label className="flex justify-between">
                    <span>Estresse Financeiro</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{financialStress}</span>
                  </Label>
                  <Slider
                    value={[financialStress]}
                    onValueChange={(value) => setFinancialStress(value[0])}
                    min={0}
                    max={10}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="flex justify-between">
                    <span>Volatilidade Financeira</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{volatility}</span>
                  </Label>
                  <Slider
                    value={[volatility]}
                    onValueChange={(value) => setVolatility(value[0])}
                    min={0}
                    max={10}
                    step={1}
                    className="mt-2"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                    Variação de renda/despesas ao longo do mês
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Health */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="flex justify-between">
                    <span>Horas de Sono por Noite</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{sleep}h</span>
                  </Label>
                  <Slider
                    value={[sleep]}
                    onValueChange={(value) => setSleep(value[0])}
                    min={0}
                    max={12}
                    step={0.5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="flex justify-between">
                    <span>Nível de Estresse Geral</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{healthStress}</span>
                  </Label>
                  <Slider
                    value={[healthStress]}
                    onValueChange={(value) => setHealthStress(value[0])}
                    min={0}
                    max={10}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="flex justify-between">
                    <span>Carga de Saúde</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{healthLoad}</span>
                  </Label>
                  <Slider
                    value={[healthLoad]}
                    onValueChange={(value) => setHealthLoad(value[0])}
                    min={0}
                    max={10}
                    step={1}
                    className="mt-2"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                    Doenças crônicas, tratamentos, problemas de saúde
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Life & Relationships */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="flex justify-between">
                    <span>Rede de Apoio</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{supportNetwork}</span>
                  </Label>
                  <Slider
                    value={[supportNetwork]}
                    onValueChange={(value) => setSupportNetwork(value[0])}
                    min={0}
                    max={10}
                    step={1}
                    className="mt-2"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                    Quantidade e qualidade de relacionamentos de apoio
                  </p>
                </div>

                <div>
                  <Label className="flex justify-between">
                    <span>Tensão em Relacionamentos</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{relationshipStrain}</span>
                  </Label>
                  <Slider
                    value={[relationshipStrain]}
                    onValueChange={(value) => setRelationshipStrain(value[0])}
                    min={0}
                    max={10}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="flex justify-between">
                    <span>Número de Dependentes</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{dependents}</span>
                  </Label>
                  <Slider
                    value={[dependents]}
                    onValueChange={(value) => setDependents(value[0])}
                    min={0}
                    max={10}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="flex justify-between">
                    <span>Urgência Geral</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{urgency}</span>
                  </Label>
                  <Slider
                    value={[urgency]}
                    onValueChange={(value) => setUrgency(value[0])}
                    min={0}
                    max={10}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>

              {step < totalSteps ? (
                <Button
                  onClick={() => setStep(Math.min(totalSteps, step + 1))}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Próximo
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleCreateAndUpdate}
                  disabled={createDiagnosticMutation.isPending}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {createDiagnosticMutation.isPending && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Criar Diagnóstico
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
