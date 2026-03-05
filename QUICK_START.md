# ⚡ Quick Start - Workflow Automático

## 🎯 Resumo em 4 Passos

### 1️⃣ Desenvolver no Antigravity
Abra o projeto no VS Code e faça suas alterações.

**Use este prompt:**
```
[Copie o conteúdo de PROMPT_TEMPLATE.md e preencha a tarefa]
```

---

### 2️⃣ Salvar no Git (Terminal do Antigravity)
```bash
git add .
git commit -m "Descrição da melhoria"
git push origin main
```

---

### 3️⃣ Manus Detecta e Atualiza
✅ Validação automática  
✅ Build automático  
✅ Testes automáticos  
✅ Servidor reinicia  

**Tempo:** ~60 segundos

---

### 4️⃣ Site Mostra as Mudanças
Seu site ao vivo em:  
🌐 **https://fusionsajo-tv5nf8xq.manus.space**

---

## 📋 Checklist Rápido

```bash
# Antes de fazer push:
pnpm check    # ✅ TypeScript OK?
pnpm test     # ✅ Testes passam?
pnpm dev      # ✅ Funciona localmente?

# Se tudo OK:
git add .
git commit -m "Melhoria: [descrição]"
git push origin main

# Pronto! Site atualiza automaticamente em 60 segundos
```

---

## 🚀 Exemplos de Tarefas

### Exemplo 1: Melhorar a Home
```
Melhore a página inicial adicionando:
- Seção de depoimentos de usuários
- Seção de FAQ com schema JSON-LD
- Botão de CTA mais destacado
- Animações suaves com Framer Motion
```

### Exemplo 2: Adicionar Filtro no Dashboard
```
Adicione filtro de diagnósticos no dashboard:
- Filtrar por data
- Filtrar por status (Rascunho, Pendente, Pago)
- Filtrar por paradigma
- Busca por texto
```

### Exemplo 3: Otimizar Performance
```
Otimize a performance do formulário:
- Lazy load de componentes
- Memoização de funções
- Debounce em inputs
- Validação em tempo real
```

---

## 🔗 Links Úteis

- 📖 **Workflow Completo:** [WORKFLOW.md](./WORKFLOW.md)
- 📝 **Prompt Template:** [PROMPT_TEMPLATE.md](./PROMPT_TEMPLATE.md)
- 📋 **Tarefas do Projeto:** [todo.md](./todo.md)
- 🌐 **Site ao Vivo:** https://fusionsajo-tv5nf8xq.manus.space
- 💾 **Repositório:** https://github.com/joaopedropassos/Sajo2

---

## ❓ FAQ Rápido

**P: Quanto tempo leva para as mudanças aparecerem?**  
R: ~60 segundos após fazer `git push`

**P: E se houver erro de build?**  
R: Verifique `pnpm check` e `pnpm test` localmente antes de fazer push

**P: Posso fazer rollback?**  
R: Sim! Use `git revert` ou entre em contato com suporte

**P: Como adiciono nova dependência?**  
R: Use `pnpm add nome-pacote` e faça commit

---

**Última atualização:** 04/03/2026  
**Versão:** 6c0f80ce
