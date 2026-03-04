# 🚀 Workflow de Desenvolvimento FUSION-SAJO

## Fluxo Automático: Antigravity → Git → Manus → Site ao Vivo

### 📋 Passo 1: Desenvolver no Antigravity (VS Code)

Abra o projeto no **Antigravity** e faça suas alterações:

```bash
# Exemplo de alterações:
# - Editar client/src/pages/Home.tsx
# - Modificar estilos em client/src/index.css
# - Atualizar componentes em client/src/components/
# - Adicionar novas funcionalidades em server/routers.ts
```

**Prompt para gerar mudanças:**
```
Você é um desenvolvedor expert em React/TypeScript/Tailwind CSS para a plataforma FUSION-SAJO.

Contexto:
- Stack: React 19 + Tailwind 4 + Express + tRPC + Drizzle ORM
- Tema: Diagnósticos astrológicos personalizados com análise de paradigmas
- Pagamento: Pix de R$ 20 por diagnóstico
- Design: Elegante, profissional, tema claro/escuro

Tarefa: [DESCREVA O QUE VOCÊ QUER MELHORAR]

Requisitos:
1. Manter compatibilidade com arquitetura existente
2. Usar componentes shadcn/ui quando possível
3. Seguir padrão de código do projeto
4. Adicionar testes unitários se necessário
5. Validar TypeScript antes de fazer commit

Gere o código completo pronto para produção.
```

---

### 📝 Passo 2: Salvar no Git (Terminal do Antigravity)

Após fazer as alterações, execute no terminal integrado:

```bash
# 1. Adicionar todas as mudanças
git add .

# 2. Fazer commit com mensagem descritiva
git commit -m "Melhorias na home" 
# Exemplos de mensagens:
# - "Melhorias na home"
# - "Adicionar novo componente de checkout"
# - "Corrigir erro de validação no formulário"
# - "Otimizar performance do dashboard"

# 3. Fazer push para o repositório remoto
git push origin main
```

---

### 🔄 Passo 3: Manus Detecta e Atualiza Automaticamente

Após o `git push`, o Manus:

1. ✅ Detecta as mudanças no repositório
2. ✅ Valida TypeScript e build
3. ✅ Executa testes unitários
4. ✅ Reinicia o servidor de desenvolvimento
5. ✅ Atualiza o site ao vivo

**Tempo de atualização:** ~30-60 segundos

---

### 🌐 Passo 4: Site Mostra as Mudanças

O site ao vivo em **https://fusionsajo-tv5nf8xq.manus.space** será atualizado automaticamente com suas mudanças!

---

## 📚 Estrutura do Projeto

```
fusion-sajo-app/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── pages/            # Páginas (Home, Dashboard, DiagnosticForm, etc)
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── lib/trpc.ts       # Cliente tRPC
│   │   └── index.css         # Estilos globais
│   └── index.html            # HTML base
├── server/                    # Backend Express + tRPC
│   ├── routers.ts            # Procedimentos tRPC
│   ├── db.ts                 # Funções de banco de dados
│   ├── astrology.ts          # Análise astrológica
│   ├── pix-payment.ts        # Integração Pix
│   ├── llm-insights.ts       # Enriquecimento com IA
│   └── email.ts              # Alertas por email
├── drizzle/                   # Migrações do banco de dados
│   └── schema.ts             # Definição das tabelas
├── shared/                    # Código compartilhado
│   └── paradigms.ts          # Catálogo FUSION-SAJO
└── todo.md                    # Tarefas do projeto
```

---

## 🛠️ Comandos Úteis

```bash
# Verificar status do Git
git status

# Ver histórico de commits
git log --oneline -10

# Desfazer última alteração (antes de fazer push)
git reset --soft HEAD~1

# Verificar tipos TypeScript
pnpm check

# Executar testes
pnpm test

# Iniciar servidor de desenvolvimento local
pnpm dev
```

---

## ✅ Checklist Antes de Fazer Push

- [ ] Código funciona localmente (`pnpm dev`)
- [ ] Sem erros de TypeScript (`pnpm check`)
- [ ] Testes passam (`pnpm test`)
- [ ] Commit com mensagem descritiva
- [ ] Push para `origin main`

---

## 🚨 Troubleshooting

**Problema:** Git push falha com erro de autenticação
```bash
# Solução: Verificar configuração do Git
git remote -v
# Deve mostrar: origin https://github.com/joaopedropassostocantins/Sajo2.git
```

**Problema:** Mudanças não aparecem no site
```bash
# Solução: Esperar 60 segundos e recarregar a página
# Se persistir, verificar logs do Manus
```

**Problema:** Erro de TypeScript bloqueia push
```bash
# Solução: Executar pnpm check localmente e corrigir erros
pnpm check
```

---

## 📞 Suporte

Para dúvidas sobre o workflow ou problemas, consulte:
- **Documentação do Manus**: https://help.manus.im
- **GitHub do projeto**: https://github.com/joaopedropassostocantins/Sajo2
- **Logs do servidor**: Verificar no painel do Manus

---

**Última atualização:** 04/03/2026
**Versão do projeto:** 6c0f80ce
