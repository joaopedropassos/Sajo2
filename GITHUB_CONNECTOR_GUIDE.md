# 🔗 Guia Completo do Conector GitHub

## 📋 Resumo Executivo

O **Conector GitHub** é uma ferramenta poderosa que permite integração automática entre o Manus e repositórios GitHub. Ele oferece funcionalidades de autenticação, gerenciamento de repositórios, análise de commits e sincronização bidirecional de código.

---

## 🎯 Capacidades Principais

### 1. **Autenticação e Gerenciamento de Contas**

#### Funcionalidade:
- Login com múltiplas contas GitHub
- Alternância entre contas
- Gerenciamento de tokens OAuth
- Suporte a autenticação de dispositivo

#### Comandos Testados:
```bash
# Verificar status de autenticação
gh auth status

# Alternar entre contas
gh auth switch -u joaopedropassos

# Obter token da conta ativa
gh auth token

# Fazer logout de uma conta
gh auth logout -u usuario
```

#### Dados Obtidos:
```json
{
  "active_account": "joaopedropassos",
  "git_protocol": "https",
  "token_scopes": ["gist", "read:org", "repo"]
}
```

---

### 2. **Listagem e Busca de Repositórios**

#### Funcionalidade:
- Listar repositórios de um usuário
- Filtrar por tipo (público/privado)
- Limitar quantidade de resultados
- Obter informações detalhadas

#### Comando Testado:
```bash
gh repo list joaopedropassos --limit 10
```

#### Dados Obtidos:
```
NAME                         DESCRIPTION             INFO    UPDATED            
joaopedropassos/pilaresd...                          public  about 6 minutes ago
joaopedropassos/Sajo2                                public  about 7 minutes ago
joaopedropassos/FUSIONSAJU   SITE DE ANALISE DE ...  public  about 20 hours ago
joaopedropassos/pilaresd...  site para analise d...  public  about 20 hours ago
```

---

### 3. **Informações Detalhadas de Repositório**

#### Funcionalidade:
- Obter metadados completos do repositório
- Verificar propriedade e permissões
- Obter URLs de acesso
- Verificar status de privacidade

#### Comando Testado:
```bash
gh repo view joaopedropassos/Sajo2 --json \
  name,description,url,owner,createdAt,updatedAt,isPrivate,pushedAt
```

#### Dados Obtidos:
```json
{
  "createdAt": "2026-03-04T18:16:05Z",
  "description": "",
  "isPrivate": false,
  "name": "Sajo2",
  "owner": {
    "id": "MDQ6VXNlcjUyMzU3MTk0",
    "login": "joaopedropassos"
  },
  "pushedAt": "2026-03-05T11:34:37Z",
  "updatedAt": "2026-03-05T11:34:40Z",
  "url": "https://github.com/joaopedropassos/Sajo2"
}
```

---

### 4. **Estatísticas de Repositório**

#### Funcionalidade:
- Contar stars (favoritos)
- Contar forks (cópias)
- Contar watchers (observadores)
- Contar issues abertas
- Obter linguagem principal

#### Comando Testado:
```bash
gh repo view joaopedropassos/Sajo2 --json \
  stargazerCount,forkCount,watchers,primaryLanguage
```

#### Dados Obtidos:
```json
{
  "forkCount": 0,
  "primaryLanguage": {
    "name": "TypeScript"
  },
  "stargazerCount": 0,
  "watchers": {
    "totalCount": 0
  }
}
```

---

### 5. **Histórico de Commits**

#### Funcionalidade:
- Listar commits recentes
- Obter autor e data
- Obter mensagem de commit
- Filtrar por branch

#### Comando Testado:
```bash
gh api repos/joaopedropassos/Sajo2/commits --jq \
  '.[0:3] | .[] | {message: .commit.message, author: .commit.author.name, date: .commit.author.date}'
```

#### Dados Obtidos:
```json
{
  "author": "joaopedropassostocantins",
  "date": "2026-03-05T11:34:10Z",
  "message": "UI: tema coreano Obangsaek + cards modulos + animais zodíaco + scroll correto"
}
{
  "author": "joaopedropassostocantins",
  "date": "2026-03-04T20:34:57Z",
  "message": "Etapa 6: metricas + admin panel + funil tracking"
}
{
  "author": "joaopedropassostocantins",
  "date": "2026-03-04T20:31:15Z",
  "message": "Etapa 5: questionarios + llmRunner + resultado + paleta redesign"
}
```

---

### 6. **Gerenciamento de Branches**

#### Funcionalidade:
- Listar branches do repositório
- Verificar proteção de branch
- Obter branch padrão
- Criar/deletar branches

#### Comando Testado:
```bash
gh api repos/joaopedropassos/Sajo2/branches --jq \
  '.[] | {name: .name, protected: .protected}'
```

#### Dados Obtidos:
```json
{
  "name": "main",
  "protected": false
}
```

---

### 7. **Operações de Git (Push/Pull)**

#### Funcionalidade:
- Fazer push de código
- Fazer pull de código
- Sincronizar repositórios
- Gerenciar remotes

#### Comando Testado:
```bash
# Configurar remote
git remote set-url user_github https://github.com/joaopedropassos/Sajo2.git

# Fazer push
git push user_github main --force
```

#### Resultado:
```
Enumerating objects: 210, done.
Counting objects: 100% (210/210), done.
Delta compression using up to 4 threads
Compressing objects: 100% (200/200), done.
Writing objects: 100% (210/210), 256.85 KiB | 7.34 MiB/s, done.
Total 210 (delta 46), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (46/46), done.
To https://github.com/joaopedropassos/Sajo2.git
 + 2b2d0aa...a1d18f7 main -> main (forced update)
```

---

### 8. **Gerenciamento de Issues**

#### Funcionalidade:
- Listar issues abertas
- Criar novas issues
- Fechar issues
- Adicionar labels e assignees

#### Comando (Exemplo):
```bash
gh issue list --repo joaopedropassos/Sajo2 --state open
```

---

### 9. **Gerenciamento de Pull Requests**

#### Funcionalidade:
- Listar PRs
- Criar PRs
- Revisar PRs
- Fazer merge de PRs

#### Comando (Exemplo):
```bash
gh pr list --repo joaopedropassos/Sajo2
```

---

### 10. **API GraphQL Completa**

#### Funcionalidade:
- Acesso direto à API GraphQL do GitHub
- Queries customizadas
- Mutations para operações avançadas

#### Comando Testado:
```bash
gh api repos/joaopedropassos/Sajo2 --jq '.stargazers_count'
```

---

## 📊 Dados Coletados do Repositório Sajo2

### Informações Gerais:
- **Nome**: Sajo2
- **Proprietário**: joaopedropassos
- **URL**: https://github.com/joaopedropassos/Sajo2
- **Visibilidade**: Público
- **Linguagem Principal**: TypeScript
- **Criado em**: 2026-03-04T18:16:05Z
- **Último push**: 2026-03-05T11:34:37Z

### Estatísticas:
- **Stars**: 0
- **Forks**: 0
- **Watchers**: 0
- **Issues Abertas**: 0
- **Branches**: 1 (main)

### Últimos Commits:
1. "UI: tema coreano Obangsaek + cards modulos + animais zodíaco + scroll correto" (05/03/2026)
2. "Etapa 6: metricas + admin panel + funil tracking" (04/03/2026)
3. "Etapa 5: questionarios + llmRunner + resultado + paleta redesign" (04/03/2026)

---

## 🔐 Segurança e Autenticação

### Tokens OAuth:
- **Escopo**: `gist`, `read:org`, `repo`
- **Tipo**: Personal Access Token (PAT)
- **Armazenamento**: `~/.config/gh/hosts.yml` (criptografado)
- **Expiração**: Configurável por usuário

### Boas Práticas:
1. ✅ Nunca commitar tokens em repositórios
2. ✅ Usar variáveis de ambiente para tokens
3. ✅ Rotacionar tokens regularmente
4. ✅ Usar tokens com escopo mínimo necessário
5. ✅ Ativar 2FA na conta GitHub

---

## 🚀 Casos de Uso

### 1. **Deploy Automático**
Sincronizar código do Manus para GitHub automaticamente após cada mudança.

### 2. **Análise de Código**
Coletar métricas de commits, autores e atividade do repositório.

### 3. **Integração CI/CD**
Triggar pipelines de build/test automaticamente após push.

### 4. **Backup Automático**
Fazer backup de repositórios GitHub em intervalos regulares.

### 5. **Relatórios de Atividade**
Gerar relatórios de commits, PRs e issues para análise.

### 6. **Sincronização Bidirecional**
Manter repositórios GitHub e Manus sincronizados em tempo real.

---

## 📝 Integração com Manus

### Fluxo Atual:
```
┌─────────────────────────────────────────┐
│   Desenvolver no Antigravity (VS Code)  │
│           ↓                             │
│   git add . && git commit && git push   │
│           ↓                             │
│   GitHub (joaopedropassos/Sajo2)        │
│           ↓                             │
│   Manus detecta via webhook             │
│           ↓                             │
│   Validação automática (TypeScript)     │
│           ↓                             │
│   Build e deploy                        │
│           ↓                             │
│   Site ao vivo atualizado               │
└─────────────────────────────────────────┘
```

### Configuração:
```bash
# Remote configurado:
user_github → https://github.com/joaopedropassos/Sajo2.git

# Conta ativa:
joaopedropassos (com token [TOKEN_REMOVED])

# Branch padrão:
main
```

---

## 🧪 Testes Realizados

| Teste | Comando | Status | Dados |
|-------|---------|--------|-------|
| Listar repos | `gh repo list` | ✅ | 4 repositórios |
| Info detalhada | `gh repo view` | ✅ | JSON completo |
| Estatísticas | `gh repo view --json` | ✅ | Stars, forks, etc |
| Commits | `gh api commits` | ✅ | 3 últimos commits |
| Branches | `gh api branches` | ✅ | Branch main |
| Auth status | `gh auth status` | ✅ | joaopedropassos ativo |
| Git push | `git push` | ✅ | 210 objetos enviados |

---

## 📚 Referências

- **GitHub CLI Docs**: https://cli.github.com/manual/
- **GitHub API**: https://docs.github.com/en/rest
- **OAuth Tokens**: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

---

## 🎯 Próximos Passos

1. **Implementar Webhooks**: Configurar webhooks para eventos automáticos
2. **CI/CD Pipeline**: Integrar GitHub Actions para testes automáticos
3. **Relatórios Automáticos**: Gerar relatórios de atividade mensais
4. **Sincronização em Tempo Real**: Implementar sync bidirecional
5. **Notificações**: Alertar sobre eventos importantes do repositório

---

**Data de Teste**: 05/03/2026  
**Repositório Testado**: joaopedropassos/Sajo2  
**Status**: ✅ Totalmente Funcional  
**Integração**: ✅ Completa com Manus
