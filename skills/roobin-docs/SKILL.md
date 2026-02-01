---
name: roobin-docs
description: Documentar features, criar e atualizar documentação no Roobin MCP. Use ao finalizar tasks de feature/improvement, ao corrigir bugs em features documentadas, ou quando o usuário mencionar documentar, doc, atualizar documentação.
---

# Roobin Docs

## Overview

Criação e atualização de documentação de features no Roobin MCP.

**Core principle:** Sempre versionar antes de atualizar. Sempre publicar direto. Inferir tipo pelo contexto.

**Announce at start:** "Estou usando roobin-docs para [criar/atualizar] a documentação."

## The Iron Laws

```
SEMPRE VERSIONAR ANTES DE UPDATE
SEMPRE PUBLICAR DIRETO (status: published)
PERGUNTAR SOBRE DOC AO FINALIZAR FEATURE
BUSCAR DOC EXISTENTE AO FINALIZAR BUG
```

## When to Use

- ✓ Ao finalizar task de feature/improvement → perguntar se quer documentar
- ✓ Ao finalizar task de bug → buscar doc relacionada e perguntar se quer atualizar
- ✓ Usuário menciona "documentar", "doc", "atualizar documentação"
- ✗ Não use para gerenciamento de tasks (use roobin-tasks)

## Common Rationalizations That Mean You're About To Fail

- "Não precisa documentar, é feature pequena" → ERRADO. Pergunte ao usuário.
- "Vou atualizar sem versionar" → ERRADO. Sempre crie versão antes.
- "Vou criar como draft" → ERRADO. Publique direto.
- "Sei qual template usar" → ERRADO. Infira pelo contexto ou pergunte.

---

## Configuração

### Projeto e Usuário
Obter `project_id` e `user_id` do CLAUDE.md do projeto atual. Se não existir, perguntar ao usuário ou listar projetos com `list_projects()`.

### Defaults
| Campo | Default |
|-------|---------|
| `status` | `"published"` |
| `author` | `"Agent AI"` |
| `is_pinned` | `false` |

---

## Gatilhos Automáticos

### 1. Ao finalizar task de feature/improvement

```
✓ Task "Implementar dark mode" → review

ℹ Quer documentar essa feature? (s/n)
```

### 2. Ao finalizar task de bug

```
✓ Task "Corrigir erro no dark mode" → done

ℹ Encontrei documentação existente: "Dark Mode" (guides)
ℹ Quer atualizar a documentação? (s/n)
```

---

## Tipos de Documento (Folders)

O Roobin organiza documentos em **folders** (pastas). Use o campo `document_type` para definir a pasta:

| Folder | Descrição | Quando usar | Template |
|--------|-----------|-------------|----------|
| `planning` | PRDs, roadmaps, estratégia | Requisitos de produto, planejamento | [planning.md](templates/planning.md) |
| `architecture` | ADRs, diagramas, decisões técnicas | Arquitetura, design de sistema | [architecture.md](templates/architecture.md) |
| `specs` | Especificações, APIs, contratos | Specs técnicas, documentação de API | [specs.md](templates/specs.md), [specs-api.md](templates/specs-api.md) |
| `guides` | Tutoriais, how-tos, documentação | Guias de uso, onboarding | [guides.md](templates/guides.md) |
| `research` | Análises, descobertas, estudos | Pesquisa de usuário, análise técnica | - |
| `quality` | Testes, QA, qualidade | Planos de teste, relatórios de QA | - |
| `reports` | Reuniões, status, relatórios | Atas, status reports | - |
| `general` | Notas, misc | Anotações gerais, rascunhos | - |

### Inferência Automática de Folder

| Contexto da task | Folder inferido |
|------------------|-----------------|
| Feature de UI/UX | `guides` |
| Feature de API/backend | `specs` |
| Feature de arquitetura | `architecture` |
| Planejamento/requisitos | `planning` |
| Testes/QA | `quality` |
| Pesquisa/análise | `research` |
| Reunião/status | `reports` |
| Default | `general` |

---

## Fluxo de Trabalho

### Criar Documentação

1. Anunciar uso da skill
2. Obter project_id do CLAUDE.md ou perguntar
3. Inferir tipo ou perguntar ao usuário
4. Carregar template apropriado de [templates/](templates/)
5. Preencher template com informações da feature
6. Criar documento com status `published`

### Atualizar Documentação

1. Anunciar uso da skill
2. Buscar documento existente
3. **CRIAR VERSÃO** antes de modificar
4. Atualizar documento
5. Confirmar mudanças

---

## Versionamento

### Regra: SEMPRE criar versão antes de update

```
✓ Versão 3 criada: "Atualização após correção de bug no login"
✓ Documento "Sistema de Autenticação" atualizado
```

---

## Integração com roobin-tasks

A skill `roobin-tasks` deixa contexto quando finaliza task:
- Título da task
- Tipo da task (feature, bug, improvement)
- Status final (review, done)

A skill `roobin-docs` lê esse contexto e:
1. Se `type: feature/improvement` → Pergunta se quer documentar
2. Se `type: bug` → Busca doc relacionada e pergunta se quer atualizar

---

## Formato de Output

### Criação
```
✓ Documentação criada:
  - [doc-123] {Título}
  - Tipo: {type} | Status: published
  - Seções: {lista de seções principais}
```

### Atualização
```
✓ Versão 3 salva: "{change_summary}"
✓ Documentação atualizada:
  - [doc-123] {Título}
  - Mudanças: {resumo das alterações}
```

### Busca
```
ℹ Documentação encontrada para "{feature}":
  - [doc-123] {Título} (specs, v3)
  - Última atualização: {data}
```

---

## Diagramas Mermaid

O Roobin suporta diagramas Mermaid renderizados visualmente nos documentos. **Use sempre que documentar arquitetura, fluxos, ou design system.**

### Sintaxe Básica

Envolver código Mermaid em bloco de código com linguagem `mermaid`:

````
```mermaid
graph TD
    A[Início] --> B[Processo]
    B --> C[Fim]
```
````

### Tipos de Diagrama Recomendados

| Tipo | Uso | Exemplo |
|------|-----|---------|
| `graph TD` | Fluxos verticais (top-down) | Arquitetura de componentes |
| `graph LR` | Fluxos horizontais (left-right) | Pipelines, CI/CD |
| `sequenceDiagram` | Interações entre sistemas | Fluxos de API, auth |
| `erDiagram` | Modelo de dados | Schema de banco |
| `flowchart` | Decisões e branches | Lógica de negócio |

### Exemplos por Contexto

#### Arquitetura de Sistema
```mermaid
graph TB
    subgraph Frontend
        WEB[roobin-web]
    end

    subgraph Backend
        API[API Server]
        DB[(Database)]
    end

    WEB --> API
    API --> DB
```

#### Fluxo de Requisição
```mermaid
sequenceDiagram
    participant User
    participant API
    participant DB

    User->>API: Request
    API->>DB: Query
    DB-->>API: Result
    API-->>User: Response
```

#### Modelo de Dados
```mermaid
erDiagram
    users ||--o{ projects : owns
    projects ||--o{ tasks : contains
    tasks ||--o{ comments : has

    users {
        uuid id PK
        string email
    }

    projects {
        uuid id PK
        uuid user_id FK
        string name
    }
```

#### Fluxo de Decisão
```mermaid
flowchart TD
    A[Início] --> B{Condição?}
    B -->|Sim| C[Ação 1]
    B -->|Não| D[Ação 2]
    C --> E[Fim]
    D --> E
```

### Regras de Sintaxe Importantes

| ❌ Evitar | ✅ Usar | Motivo |
|-----------|---------|--------|
| `HOME[/home]` | `HOME[home]` | `/` é operador especial |
| `Node["texto"]` | `Node[texto]` | Aspas só se necessário |
| `A --> B (info)` | `A --> B` | Parênteses em labels causam erro |
| `subgraph "Nome"` | `subgraph Nome` | Aspas podem causar problemas |

### Quando Usar Mermaid

- ✓ Documentação de arquitetura (`architecture`)
- ✓ Especificações com fluxos (`specs`)
- ✓ Documentação de API com sequências (`specs`)
- ✓ Guias com fluxos de usuário (`guides`)
- ✓ Qualquer doc que beneficie de visualização

### Temas

O Mermaid renderiza automaticamente no tema correto (dark/light) baseado no tema do Roobin.

---

## Tools MCP Roobin

| Ação | Tool |
|------|------|
| Buscar | `mcp__roobin__search_documents` |
| Criar | `mcp__roobin__manage_document` (action: create) |
| Atualizar | `mcp__roobin__manage_document` (action: update) |
| Versionar | `mcp__roobin__manage_version` (action: create) |
| Ver versões | `mcp__roobin__find_versions` |

### Parâmetros de manage_document

```yaml
mcp__roobin__manage_document:
  action: "create"  # create | update | delete
  project_id: "{project_id}"
  title: "Título do documento"
  content:
    markdown: |
      # Conteúdo em markdown

      Suporta rich blocks:
      - <toggle title="...">content</toggle>
      - <callout type="info|warning|tip|error">content</callout>
      - <quote author="..." source="...">content</quote>
      - <embed url="..."/>
  document_type: "specs"  # planning|architecture|specs|guides|research|quality|reports|general
  status: "published"     # draft|published|archived
  tags: ["tag1", "tag2"]
  is_pinned: false
```

### Parâmetros de search_documents

```yaml
mcp__roobin__search_documents:
  project_id: "{project_id}"
  query: "termo de busca"       # busca por título/conteúdo
  document_id: "{document_id}"  # busca direta por ID
  document_type: "specs"        # filtrar por folder
```

---

## Checklist

- [ ] Anunciei uso da skill
- [ ] Obtive project_id do CLAUDE.md ou perguntei
- [ ] Inferi tipo ou perguntei ao usuário
- [ ] Usei template apropriado
- [ ] Incluí diagramas Mermaid para arquitetura/fluxos
- [ ] Versionei antes de atualizar (se update)
- [ ] Publiquei direto (status: published)
