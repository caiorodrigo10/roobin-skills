# Create Story from Epic (Roobin MCP)

> Criar stories a partir de um epic existente no Roobin MCP

## Roobin MCP Integration

**Tool:** `mcp__roobin__manage_tasks`

```yaml
action: create
project_id: "{project_id}"
parent_id: "{epic_id}"
title: "Story: {story_title}"
description: "{story_content}"
type: "story"
status: "backlog"
priority: "medium"
```

## When to Use

**Use este task quando:**
- Epic já existe no Roobin MCP
- Story precisa ser criada como subtask do epic
- Enhancement em sistema existente (brownfield)
- Story pode ser completada em uma sessão de desenvolvimento

**Use create-epic quando:**
- Epic ainda não existe
- Precisa criar o epic primeiro

## Workflow

### 1. Locate Epic in Roobin MCP

Buscar o epic pai:

```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  type: "epic"
  status: "backlog"
```

### 2. Gather Context

Buscar documentos relacionados:

```
mcp__roobin__search_documents:
  project_id: "{project_id}"
  query: "{epic_title} OR architecture"
```

**Perguntar ao usuário se necessário:**
- [ ] Qual funcionalidade existente pode ser afetada?
- [ ] Quais padrões seguir (com exemplos)?
- [ ] Quais constraints técnicas existem?

### 3. Create Story in Roobin MCP

```
mcp__roobin__manage_tasks:
  action: create
  project_id: "{project_id}"
  parent_id: "{epic_task_id}"
  title: "Story: {Story Title}"
  description: |
    ## User Story
    As a {user_type},
    I want {capability},
    so that {benefit}.

    ## Context
    - Parent Epic: {epic_title}
    - Enhancement Type: {feature/bugfix/integration}
    - Existing System Impact: {assessment}

    ## Acceptance Criteria
    1. {Primary functional requirement}
    2. {Secondary functional requirement}
    3. Existing functionality remains unchanged
    4. Integration with {system} maintains current behavior
    5. Tests pass (existing and new)

    ## Technical Notes
    - Integration approach: {approach}
    - Patterns to follow: {patterns}
    - Key constraints: {constraints}

    ## Tasks
    - [ ] Analyze existing implementation
    - [ ] Implement new functionality
    - [ ] Verify existing functionality
    - [ ] Add tests

    ## Risk Assessment
    - Primary Risk: {main risk}
    - Mitigation: {how to address}
    - Rollback Plan: {how to undo}

    ## Risk Level
    {LOW|MEDIUM|HIGH}
  type: "story"
  status: "backlog"
  priority: "{low|medium|high}"
```

### 4. Risk-Based Quality Gates

**LOW RISK** (isolated bug fix, documentation):
- Pre-Commit review apenas

**MEDIUM RISK** (new feature, some integration):
- Pre-Commit + Pre-PR validation
- Integration tests required

**HIGH RISK** (core functionality, many integration points):
- Pre-Commit + Pre-PR + Pre-Deployment
- Feature flag recomendado
- Rollback procedure documentado

### 5. Story Structure

Cada story deve incluir:

| Campo | Descrição |
|-------|-----------|
| User Story | As a / I want / So that |
| Context | Epic pai, tipo de enhancement |
| Acceptance Criteria | Lista numerada de critérios testáveis |
| Technical Notes | Contexto técnico para implementação |
| Risk Level | LOW, MEDIUM, ou HIGH |

## Output

```
Story criada com sucesso:
- Story ID: {story_id}
- Title: {story_title}
- Parent Epic: {epic_id} - {epic_title}
- Risk Level: {risk_level}
- Status: backlog

Próximos passos:
1. Revisar story no Roobin
2. Ajustar se necessário
3. Iniciar implementação com roobin-dev
```

## Success Criteria

- [ ] Story criada no Roobin MCP com ID válido
- [ ] Story vinculada ao epic pai correto (parent_id)
- [ ] Acceptance criteria claros e testáveis
- [ ] Risk level definido
- [ ] Nenhum arquivo .md local criado
