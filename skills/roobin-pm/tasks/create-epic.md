# Create Epic (Roobin MCP)

> Criar epic como task pai no Roobin MCP com stories como subtasks

## Roobin MCP Integration

**Tool:** `mcp__roobin__manage_tasks`

```yaml
# Criar Epic (task pai)
action: create
project_id: "{project_id}"
title: "Epic: {epic_title}"
description: "{epic_description}"
type: "epic"
status: "backlog"
priority: "high"

# Criar Stories como subtasks
action: create
project_id: "{project_id}"
parent_id: "{epic_task_id}"
title: "Story: {story_title}"
description: "{story_description}"
type: "story"
status: "backlog"
```

## When to Use

**Use este task quando:**
- Enhancement pode ser completado em 1-3 stories
- Não requer mudanças arquiteturais significativas
- Segue padrões existentes do projeto
- Complexidade de integração é baixa

**Use PRD completo quando:**
- Requer múltiplas stories coordenadas
- Planejamento arquitetural é necessário
- Trabalho de integração significativo

## Workflow

### 1. Project Analysis

Antes de criar o epic, reunir informações:

**Contexto do Projeto:**
- [ ] Propósito e funcionalidade atual entendidos
- [ ] Stack tecnológico identificado
- [ ] Padrões arquiteturais anotados
- [ ] Pontos de integração identificados

**Escopo do Enhancement:**
- [ ] Enhancement claramente definido
- [ ] Impacto na funcionalidade existente avaliado
- [ ] Critérios de sucesso estabelecidos

### 2. Create Epic in Roobin MCP

```
mcp__roobin__manage_tasks:
  action: create
  project_id: "{project_id}"
  title: "Epic: {Enhancement Name}"
  description: |
    ## Goal
    {1-2 sentences describing what the epic will accomplish}

    ## Context
    - Current functionality: {brief description}
    - Technology stack: {relevant technologies}
    - Integration points: {where new work connects}

    ## Success Criteria
    - {measurable outcome 1}
    - {measurable outcome 2}

    ## Risk Mitigation
    - Primary Risk: {main risk}
    - Mitigation: {how to address}
    - Rollback Plan: {how to undo}
  type: "epic"
  status: "backlog"
  priority: "high"
```

### 3. Create Stories as Subtasks

Para cada story (1-3 máximo):

```
mcp__roobin__manage_tasks:
  action: create
  project_id: "{project_id}"
  parent_id: "{epic_task_id}"  # ID do epic criado
  title: "Story: {Story Title}"
  description: |
    ## User Story
    As a {user_type},
    I want {capability},
    so that {benefit}.

    ## Acceptance Criteria
    1. {criterion 1}
    2. {criterion 2}
    3. Existing functionality remains unchanged

    ## Technical Notes
    - Integration approach: {approach}
    - Patterns to follow: {patterns}
    - Risk level: {LOW|MEDIUM|HIGH}
  type: "story"
  status: "backlog"
  priority: "medium"
```

### 4. Story Structure

Cada story deve incluir:

| Campo | Descrição |
|-------|-----------|
| User Story | As a / I want / So that |
| Acceptance Criteria | Lista numerada de critérios testáveis |
| Technical Notes | Contexto técnico para implementação |
| Risk Level | LOW, MEDIUM, ou HIGH |
| Integration Points | Onde conecta com sistema existente |

### 5. Quality Planning

Para cada story, definir quality gates:

**LOW RISK:**
- Pre-Commit review apenas

**MEDIUM RISK:**
- Pre-Commit + Pre-PR validation

**HIGH RISK:**
- Pre-Commit + Pre-PR + Pre-Deployment
- Feature flag recomendado
- Rollback procedure documentado

## Output

Após criação:

```
Epic criado com sucesso:
- Epic ID: {epic_id}
- Title: {epic_title}
- Stories criadas: {count}

Stories:
1. Story ID: {story_1_id} - {story_1_title}
2. Story ID: {story_2_id} - {story_2_title}
3. Story ID: {story_3_id} - {story_3_title}

Próximos passos:
- Revisar stories no Roobin
- Ajustar prioridades se necessário
- Iniciar implementação com roobin-dev
```

## Success Criteria

- [ ] Epic criado no Roobin MCP com ID válido
- [ ] 1-3 stories criadas como subtasks do epic
- [ ] Cada story tem acceptance criteria claros
- [ ] Risk levels definidos para cada story
- [ ] Nenhum arquivo .md local criado
