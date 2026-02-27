import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";
import { Loader2, ChevronLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function BirthDataForm() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("12:00");
  const [birthCity, setBirthCity] = useState("");
  const [isDaylightSaving, setIsDaylightSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createDiagnosticMutation = trpc.diagnostic.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!birthDate || !birthCity) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setIsLoading(true);

    try {
      // Criar diagnóstico com dados astrológicos
      const result = await createDiagnosticMutation.mutateAsync({
        title: `Diagnóstico Astrológico - ${new Date(birthDate).toLocaleDateString("pt-BR")}`,
        description: `Nascimento: ${birthCity} em ${birthDate} às ${birthTime}`,
        birthDate: new Date(birthDate),
        birthTime,
        birthCity,
        isDaylightSaving,
      });

      toast.success("Dados coletados com sucesso!");
      // Navegar para preview do diagnóstico
      navigate(`/diagnostic/${result.id}/preview`);
    } catch (error) {
      toast.error("Erro ao processar dados. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Seu Perfil Astrológico
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Descubra sua personalidade através dos astros
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-slate-200 dark:border-slate-800 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <CardTitle>Dados de Nascimento</CardTitle>
            <CardDescription>
              Forneça suas informações de nascimento para gerar seu perfil astrológico personalizado
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Birth Date */}
              <div>
                <Label htmlFor="birthDate" className="text-base font-semibold">
                  Data de Nascimento *
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                  className="mt-2 h-10"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Ex: 15/03/1990
                </p>
              </div>

              {/* Birth Time */}
              <div>
                <Label htmlFor="birthTime" className="text-base font-semibold">
                  Hora de Nascimento *
                </Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  required
                  className="mt-2 h-10"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Formato: HH:mm (ex: 14:30)
                </p>
              </div>

              {/* Birth City */}
              <div>
                <Label htmlFor="birthCity" className="text-base font-semibold">
                  Cidade de Nascimento *
                </Label>
                <Input
                  id="birthCity"
                  type="text"
                  placeholder="Ex: São Paulo, SP"
                  value={birthCity}
                  onChange={(e) => setBirthCity(e.target.value)}
                  required
                  className="mt-2"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Cidade, Estado, País
                </p>
              </div>

              {/* Daylight Saving */}
              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <Checkbox
                  id="isDaylightSaving"
                  checked={isDaylightSaving}
                  onCheckedChange={(checked) => setIsDaylightSaving(checked as boolean)}
                />
                <Label
                  htmlFor="isDaylightSaving"
                  className="text-sm font-medium cursor-pointer flex-1"
                >
                  Havia horário de verão na data de nascimento?
                </Label>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>💡 Dica:</strong> Quanto mais precisos forem seus dados de nascimento, mais preciso será seu perfil astrológico. Se não souber a hora exata, use 12:00 (meio-dia).
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                >
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isLoading ? "Processando..." : "Gerar Perfil Astrológico"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg">Signo Solar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Sua essência e identidade central
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg">Signo Lunar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Suas emoções e mundo interior
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg">Ascendente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Como você é percebido pelos outros
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
