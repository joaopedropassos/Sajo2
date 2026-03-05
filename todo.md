# FUSION-SAJO Platform - TODO

## Fase 1: Arquitetura e Banco de Dados
- [x] Definir esquema de banco de dados (users, diagnostics, reports, payments, documents)
- [x] Criar tabelas Drizzle para paradigmas, respostas de usuários e histórico
- [ ] Configurar integração com Mercado Pago ou Stripe
- [ ] Estruturar sistema de armazenamento de documentos (S3)

## Fase 2: Autenticação e Dashboard
- [x] Implementar autenticação OAuth (Manus)
- [x] Criar dashboard do usuário com histórico de diagnósticos
- [x] Implementar visualização de relatórios anteriores
- [x] Criar interface de entrada de dados (formulário multi-etapa)
- [x] Design visual elegante e profissional (tema claro/escuro)

## Fase 3: Motor de Análise FUSION-SAJO
- [x] Parsear catálogo FUSION-SAJO em estrutura de dados
- [x] Implementar engine de matching de paradigmas
- [x] Criar lógica de geração de blocos de relatório
- [ ] Implementar calendário de prazos críticos
- [ ] Gerar ações 7d e 90d baseadas em paradigmas

## Fase 4: Pagamentos, LLM e Integrações
- [x] Integrar Pix de R$ 20 por diagnóstico
- [x] Simplificar formulário para dados básicos (nascimento, local, horário de verão)
- [x] Implementar análise astrológica para perfil de personalidade
- [x] Criar fluxo de preview + pagamento + relatório completo
- [x] Integrar LLM para enriquecer relatórios com insights
- [x] Configurar envio de emails com alertas de prazos

## Fase 5: Testes e Refinamentos
- [ ] Testes unitários para motor de análise
- [ ] Testes de integração de pagamentos
- [ ] Refinamentos visuais e UX
- [ ] Validação de segurança e conformidade
- [ ] Documentação e entrega final


## CI/CD com GitHub Actions
- [x] Criar workflow de testes automáticos (vitest)
- [x] Implementar validação de TypeScript
- [x] Adicionar linting (ESLint/Prettier)
- [x] Configurar build automático
- [ ] Testar fluxo completo de CI/CD

## SEO e Otimizações
- [x] Adicionar título SEO otimizado (30-60 caracteres)
- [x] Adicionar meta description (50-160 caracteres)
- [x] Adicionar palavras-chave no conteúdo
- [x] Otimizar estrutura HTML com tags semânticas
- [x] Adicionar schema JSON-LD para SEO estruturado
- [x] Melhorar h1 com palavras-chave astrológicas
