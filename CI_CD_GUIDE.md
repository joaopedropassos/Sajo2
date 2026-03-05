# 🚀 Guia de CI/CD com GitHub Actions

## 📋 Visão Geral

Este projeto implementa um **pipeline de CI/CD completo** usando GitHub Actions que executa automaticamente:

1. ✅ **Validação de código** (TypeScript, formatação)
2. ✅ **Testes unitários** (vitest)
3. ✅ **Build automático**
4. ✅ **Relatórios de status**

---

## 🎯 Workflows Implementados

### 1. **ci-cd.yml** - Pipeline Completo (Principal)

Executa todos os passos em paralelo com dependências:

```
┌─────────────────────────────────────────────┐
│         Push para main/develop              │
└────────────────┬────────────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
    ▼                         ▼
┌─────────────┐         ┌──────────┐
│  Validate   │         │   Test   │
│ (TypeScript)│         │ (vitest) │
└──────┬──────┘         └────┬─────┘
       │                     │
       └──────────┬──────────┘
                  │
                  ▼
            ┌──────────┐
            │  Build   │
            │(pnpm run)│
            └────┬─────┘
                 │
                 ▼
            ┌──────────┐
            │  Report  │
            │ (Status) │
            └──────────┘
```

**Triggers:**
- Push para `main` ou `develop`
- Pull requests para `main` ou `develop`

**Jobs:**
1. **validate** - TypeScript check + Prettier format check
2. **test** - Executa `pnpm test` com vitest
3. **build** - Executa `pnpm run build`
4. **report** - Relatório final com comentário no PR

---

### 2. **test.yml** - Testes Automáticos

Executa apenas testes com cobertura:

```yaml
Triggers: push, pull_request
Passos:
  1. Checkout código
  2. Setup Node.js 20.x
  3. Install pnpm
  4. Install dependencies
  5. Run tests (vitest)
  6. Upload coverage (codecov)
```

**Saída:**
- Relatório de cobertura no Codecov
- Artefatos salvos por 7 dias

---

### 3. **typecheck.yml** - Validação TypeScript

Valida tipos TypeScript sem executar testes:

```yaml
Triggers: push, pull_request
Passos:
  1. Checkout código
  2. Setup Node.js
  3. Install dependencies
  4. Run: pnpm check
```

**Saída:**
- Erros de tipo reportados
- Bloqueia merge se houver erros

---

### 4. **lint.yml** - Linting e Formatação

Verifica formatação de código com Prettier:

```yaml
Triggers: push, pull_request
Passos:
  1. Checkout código
  2. Setup Node.js
  3. Install dependencies
  4. Check formatting: pnpm format --check
```

**Saída:**
- Erros de formatação reportados
- Instrução para rodar `pnpm format` localmente

---

### 5. **build.yml** - Build Automático

Compila a aplicação para produção:

```yaml
Triggers: push, pull_request
Passos:
  1. Checkout código
  2. Setup Node.js
  3. Install dependencies
  4. Build: pnpm run build
  5. Verify dist/ directory
  6. Upload artifacts
```

**Saída:**
- Artefatos de build salvos
- Tamanho do build reportado

---

## 📊 Fluxo de Execução Completo

### Quando você faz `git push`:

```
1. GitHub detecta push
   ↓
2. Inicia workflow ci-cd.yml
   ├─ Job: validate (paralelo)
   │  ├─ TypeScript check
   │  └─ Format check
   │
   ├─ Job: test (após validate)
   │  ├─ Run vitest
   │  └─ Upload coverage
   │
   ├─ Job: build (após validate)
   │  ├─ Build application
   │  └─ Verify dist/
   │
   └─ Job: report (após test + build)
      ├─ Check all status
      └─ Post comment no PR
   ↓
3. Resultado final:
   ✅ All checks passed OR ❌ Some checks failed
```

---

## 🔍 Dados Coletados e Exibidos

### Durante Execução:

| Métrica | Fonte | Exibição |
|---------|-------|----------|
| **Erros TypeScript** | `pnpm check` | Logs do workflow |
| **Testes Passando** | `pnpm test` | Logs + Codecov |
| **Cobertura** | vitest | Codecov badge |
| **Tamanho Build** | `du -sh dist/` | Logs |
| **Tempo Execução** | GitHub Actions | Workflow page |

### Exemplo de Saída:

```
✅ Validate Code
  ├─ TypeScript validation: PASSED
  └─ Format check: PASSED

✅ Run Tests
  ├─ Unit tests: 20 passed, 0 failed
  └─ Coverage: 85%

✅ Build Application
  ├─ Build successful
  └─ Build size: 256 KB

✅ CI/CD Report
  └─ All checks passed!
```

---

## 🛠️ Como Usar

### 1. **Fazer Push de Código**

```bash
git add .
git commit -m "Adicionar nova feature"
git push origin main
```

### 2. **Monitorar Execução**

Acesse: `https://github.com/joaopedropassos/Sajo2/actions`

Ou clique na aba **Actions** no repositório.

### 3. **Visualizar Detalhes**

Clique no workflow em execução para ver:
- Status de cada job
- Logs detalhados
- Tempo de execução
- Artefatos gerados

### 4. **Corrigir Erros**

Se algum job falhar:

```bash
# Verificar localmente
pnpm check          # TypeScript
pnpm format --check # Formatação
pnpm test          # Testes
pnpm run build     # Build

# Corrigir formatação
pnpm format

# Fazer commit e push novamente
git add .
git commit -m "Fix: corrigir erros de CI/CD"
git push origin main
```

---

## 📈 Métricas e Relatórios

### Codecov Integration

Após cada push, cobertura de testes é enviada para [Codecov](https://codecov.io):

```bash
# Visualizar cobertura
https://codecov.io/gh/joaopedropassos/Sajo2
```

### GitHub Actions Dashboard

Visualizar histórico de execuções:

```
https://github.com/joaopedropassos/Sajo2/actions
```

---

## 🔐 Segurança

### Proteção de Branch

Recomendações para `main`:

1. ✅ Require status checks to pass before merging
   - ci-cd.yml (all jobs)
   - test.yml
   - typecheck.yml

2. ✅ Require code reviews before merging
   - Mínimo 1 aprovação

3. ✅ Dismiss stale pull request approvals
   - Quando novo commit é feito

4. ✅ Require branches to be up to date

---

## 📝 Customizações

### Adicionar Novo Workflow

Crie arquivo em `.github/workflows/novo.yml`:

```yaml
name: Novo Workflow

on:
  push:
    branches: [main]

jobs:
  job-name:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Seu passo
        run: seu comando
```

### Modificar Triggers

```yaml
on:
  push:
    branches: [main, develop, staging]
    paths:
      - 'src/**'
      - 'package.json'
  schedule:
    - cron: '0 0 * * *'  # Diariamente
```

### Adicionar Notificações

```yaml
- name: Notify Slack
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 🚨 Troubleshooting

### Workflow não executa

**Problema:** Nenhum workflow aparece na aba Actions

**Solução:**
1. Verifique se arquivo está em `.github/workflows/`
2. Verifique sintaxe YAML
3. Faça um novo push para triggar

### Testes falhando

**Problema:** `pnpm test` falha no CI mas passa localmente

**Solução:**
1. Verifique NODE_ENV
2. Limpe node_modules: `rm -rf node_modules && pnpm install`
3. Verifique variáveis de ambiente

### Build falhando

**Problema:** `pnpm run build` falha

**Solução:**
1. Execute localmente: `pnpm run build`
2. Verifique erros de TypeScript
3. Verifique dependências faltantes

---

## 📚 Referências

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Codecov Integration](https://docs.github.com/en/code-security/code-scanning-and-analysis/integrating-with-code-scanning)

---

## ✅ Checklist de Implementação

- [x] Criar `.github/workflows/` directory
- [x] Implementar ci-cd.yml (pipeline completo)
- [x] Implementar test.yml (testes)
- [x] Implementar typecheck.yml (TypeScript)
- [x] Implementar lint.yml (formatação)
- [x] Implementar build.yml (build)
- [x] Documentar CI/CD
- [ ] Configurar Codecov
- [ ] Configurar proteção de branch
- [ ] Testar fluxo completo

---

**Data de Implementação:** 05/03/2026  
**Status:** ✅ Pronto para Uso  
**Repositório:** joaopedropassos/Sajo2  
**Branch:** main
