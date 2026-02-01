# Correct Course (Roobin MCP)

> Analisar e corrigir desvios em stories/epics usando o Roobin MCP

## Roobin MCP Integration

**Tools:**
- `mcp__roobin__search_tasks` - Buscar tasks afetadas
- `mcp__roobin__manage_tasks` - Atualizar tasks com correções
- `mcp__roobin__search_documents` - Buscar documentos de referência
- `mcp__roobin__manage_document` - Criar documento de proposta de mudança

## When to Use

**Use este task quando:**
- Mudança de requisitos impacta stories existentes
- Desvio identificado durante implementação
- Scope creep detectado
- Necessidade de re-priorização

## Workflow

### 1. Identify Affected Items

```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  query: "{affected_area}"
```

### 2. Gather Context

```
mcp__roobin__search_documents:
  project_id: "{project_id}"
  query: "prd OR architecture OR {related_topic}"
```

### 3. Impact Analysis

**Checklist de Análise:**

- [ ] Qual é o change trigger?
- [ ] Quais epics/stories são afetados?
- [ ] Qual o impacto no MVP?
- [ ] Há conflitos com decisões anteriores?

**Perguntas ao usuário (se necessário):**
- Qual a severidade da mudança?
- Há deadline afetado?
- Quais stakeholders precisam ser notificados?

### 4. Evaluate Paths

**Opções de resolução:**

1. **Adjust Scope** - Reduzir escopo para acomodar mudança
2. **Rollback Elements** - Desfazer mudanças parciais
3. **Re-scope Features** - Redefinir features afetadas
4. **Defer to Later** - Adiar para sprint futura
5. **Escalate to PM** - Requer decisão de product

### 5. Create Change Proposal

```
mcp__roobin__manage_document:
  action: create
  project_id: "{project_id}"
  title: "Change Proposal: {change_title}"
  content: |
    ## Sprint Change Proposal

    ### Change Trigger
    {description of what triggered this change}

    ### Impact Analysis

    #### Affected Items
    | ID | Title | Impact Level |
    |----|-------|--------------|
    | {task_id} | {title} | HIGH/MEDIUM/LOW |

    #### MVP Impact
    {assessment of impact on MVP}

    ### Recommended Path
    {chosen resolution path}

    ### Proposed Changes

    #### Task Updates
    | Task ID | Current State | Proposed State |
    |---------|---------------|----------------|
    | {id} | {current} | {proposed} |

    #### New Tasks (if any)
    - {new_task_1}
    - {new_task_2}

    #### Tasks to Remove/Defer (if any)
    - {task_to_defer}

    ### Risk Assessment
    - Primary Risk: {risk}
    - Mitigation: {mitigation}
    - Rollback Plan: {rollback}

    ### Approval Required
    - [ ] PM approval
    - [ ] Tech lead approval
    - [ ] Stakeholder notification
  type: "spec"
```

### 6. Apply Approved Changes

Após aprovação, atualizar tasks:

```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{task_id}"
  title: "{updated_title}"
  description: "{updated_description}"
  status: "{updated_status}"
  priority: "{updated_priority}"
```

Para tasks a serem removidas/adiadas:
```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{task_id}"
  status: "backlog"  # ou delete se apropriado
```

## Change Categories

### Minor Course Correction
- Pequenos ajustes em acceptance criteria
- Clarificação de requisitos
- **Ação:** Atualizar task diretamente

### Moderate Change
- Mudança de escopo em 1-2 stories
- Nova dependência identificada
- **Ação:** Criar change proposal, aguardar aprovação

### Major Pivot
- Mudança arquitetural
- Re-priorização significativa
- **Ação:** Escalar para PM/Architect, criar documento detalhado

## Output

```
Course Correction Complete:

Change Proposal Created:
- Document ID: {doc_id}
- Title: Change Proposal: {title}

Affected Items: {count}
- HIGH impact: {high_count}
- MEDIUM impact: {medium_count}
- LOW impact: {low_count}

Recommended Path: {path}

Next Steps:
1. Review change proposal no Roobin
2. Obter aprovações necessárias
3. Executar mudanças aprovadas
```

## Success Criteria

- [ ] Impact analysis completo
- [ ] Change proposal criado no Roobin MCP
- [ ] Todas as tasks afetadas identificadas
- [ ] Path forward definido
- [ ] Nenhum arquivo .md local criado
