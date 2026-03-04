# 📝 Template de Prompt para Antigravity

Use este template quando for fazer melhorias no projeto. Copie, preencha e cole no Antigravity (ou em qualquer IA).

---

## 🎯 Prompt Base Otimizado

```
Você é um desenvolvedor expert em React/TypeScript/Tailwind CSS para a plataforma FUSION-SAJO.

## Contexto do Projeto

**Stack Tecnológico:**
- Frontend: React 19 + Tailwind CSS 4 + shadcn/ui
- Backend: Express 4 + tRPC 11 + Drizzle ORM
- Banco de Dados: MySQL/TiDB
- Autenticação: OAuth Manus
- Pagamentos: Pix (R$ 20 por diagnóstico)
- IA: LLM integrado para insights personalizados

**Funcionalidades Principais:**
- Diagnósticos astrológicos baseados em data/hora/local de nascimento
- Análise de 20 paradigmas FUSION-SAJO
- Geração de relatórios com ações 7d/90d
- Sistema de pagamento Pix
- Dashboard com histórico de diagnósticos
- Alertas por email para prazos críticos

**Design:**
- Tema elegante e profissional
- Suporte a tema claro/escuro
- Responsivo (mobile-first)
- Acessibilidade garantida

## Tarefa: [DESCREVA O QUE VOCÊ QUER FAZER]

### Exemplos de Tarefas:
- "Melhorar a página inicial com mais seções de recursos"
- "Adicionar novo componente de filtro de diagnósticos no dashboard"
- "Criar página de FAQ com schema JSON-LD para SEO"
- "Implementar notificações em tempo real com WebSocket"
- "Otimizar performance do formulário de diagnóstico"
- "Adicionar suporte a múltiplos idiomas (PT-BR, EN, ES)"

## Requisitos Obrigatórios:

1. **Arquitetura:**
   - Manter compatibilidade com estrutura existente
   - Usar tRPC para chamadas backend
   - Seguir padrão de código do projeto

2. **Frontend:**
   - Usar componentes shadcn/ui quando possível
   - Aplicar Tailwind CSS para estilos
   - Manter tema claro/escuro funcional
   - Garantir responsividade

3. **Backend:**
   - Adicionar procedimentos tRPC em server/routers.ts
   - Criar funções helper em server/db.ts se necessário
   - Adicionar validação com Zod

4. **Qualidade:**
   - Código TypeScript sem erros
   - Adicionar testes unitários em server/*.test.ts
   - Validar antes de fazer commit

5. **Documentação:**
   - Comentários no código onde necessário
   - Atualizar todo.md com novas tarefas

## Arquivos Principais para Editar:

- **Frontend:** client/src/pages/, client/src/components/
- **Backend:** server/routers.ts, server/db.ts
- **Estilos:** client/src/index.css
- **Banco de dados:** drizzle/schema.ts (se necessário)
- **Testes:** server/*.test.ts

## Entregar:

1. Código completo e pronto para produção
2. Testes unitários passando
3. TypeScript validado (sem erros)
4. Instruções de como usar a nova funcionalidade

---

Gere o código completo agora!
```

---

## 🔄 Fluxo Após Gerar o Código:

1. **Copie o código** gerado pela IA
2. **Cole nos arquivos** correspondentes no Antigravity
3. **Execute no terminal:**
   ```bash
   pnpm check      # Validar TypeScript
   pnpm test       # Executar testes
   pnpm dev        # Testar localmente
   ```
4. **Se tudo OK, faça commit:**
   ```bash
   git add .
   git commit -m "Descrição da melhoria"
   git push origin main
   ```
5. **Manus atualiza automaticamente** em ~60 segundos

---

## 💡 Dicas Importantes

- **Sempre validar TypeScript** antes de fazer push
- **Testar localmente** com `pnpm dev`
- **Usar mensagens de commit descritivas**
- **Manter commits pequenos e focados** em uma funcionalidade
- **Atualizar todo.md** com novas tarefas concluídas

---

## 📚 Referências Rápidas

**Componentes shadcn/ui disponíveis:**
- Button, Card, Dialog, Form, Input, Select, Textarea, etc.

**Hooks customizados:**
- `useAuth()` - Autenticação do usuário
- `useLocation()` - Navegação (wouter)
- `trpc.*` - Chamadas tRPC

**Padrões de código:**
```tsx
// Componente React
import { trpc } from "@/lib/trpc";

export default function MyComponent() {
  const { data, isLoading } = trpc.feature.useQuery();
  
  return <div>{/* JSX */}</div>;
}
```

```ts
// Procedimento tRPC
export const appRouter = router({
  feature: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      // Lógica aqui
    }),
});
```

---

**Última atualização:** 04/03/2026
