# Full Feature Flow

## Overview

Complete workflow for implementing a new feature from request to deployment.

## Flow Diagram

```
User Request
     │
     ▼
┌─────────────────┐
│ 1. ANALYZE      │  Orchestrator understands scope
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. PLAN         │  → roobin-planner (if complex)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. EXECUTE      │  → roobin-dev (parallelized)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. REVIEW       │  → roobin-reviewer
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
  Pass      Fail
    │         │
    ▼         ▼
┌─────────┐ ┌─────────┐
│ DEPLOY  │ │ FIX     │
│ roobin- │ │ roobin- │
│ ops     │ │ dev     │
└────┬────┘ └────┬────┘
     │           │
     │      (back to REVIEW)
     ▼
  PR Created
```

## Phase 1: Analyze

**Owner:** Orchestrator (you)

### Actions
1. Receive task from user
2. Identify task type: feature
3. Assess complexity:
   - Simple: 1-2 files, clear scope → skip planning
   - Complex: 3+ files, unclear scope → needs planning
4. Check for existing tasks in Roobin MCP

### Decision Matrix

| Complexity | Action |
|------------|--------|
| Simple (obvious implementation) | Skip to Phase 3 |
| Medium (clear but multi-file) | Quick plan, then Phase 3 |
| Complex (unclear or architectural) | Full Phase 2 |

## Phase 2: Plan

**Delegate to:** roobin-planner

### Delegation Prompt

```markdown
Leia ~/.claude/skills/roobin-planner/SKILL.md e siga as instruções.

## Comando
Crie plano de implementação para: {feature_description}

## Projeto
- Project ID: {project_id}

## Requisitos
{user_requirements}

## Output Esperado
1. Plano estruturado com subtasks
2. Subtasks criadas no Roobin MCP
3. Análise de dependências
4. Lista de arquivos afetados

## Ao Finalizar
- Mova a task para "planned"
- Retorne lista de subtask IDs
```

### Expected Return
- List of subtask IDs
- Dependency graph (which subtasks depend on others)
- Estimated files per subtask

## Phase 3: Execute

**Delegate to:** roobin-dev (one per subtask)

### Parallelization Rules

1. **Identify independent subtasks** - no shared files, no dependencies
2. **Group for parallel execution** - max 3-4 parallel subagents
3. **Wait for completion** before dependent subtasks

### Delegation Pattern

```markdown
# Turn 1: Parallel independent subtasks
Task tool 1: [Subtask A - independent]
Task tool 2: [Subtask B - independent]
Task tool 3: [Subtask C - independent]

# Turn 2: Wait for returns

# Turn 3: Dependent subtasks
Task tool 1: [Subtask D - depends on A]
Task tool 2: [Subtask E - depends on B, C]
```

### Delegation Prompt per Subtask

```markdown
Leia ~/.claude/skills/roobin-dev/SKILL.md e siga as instruções.

## Comando
Implemente a subtask: {subtask_description}

## Identificadores
- Subtask ID: {subtask_id}

## Contexto
- Arquivos: {files}
- Padrões: {patterns}
- Dependências: {deps}

## Critérios de Sucesso
- [ ] {criteria}

## Ao Finalizar
- Mova para status "ai-review"
- Retorne arquivos modificados
```

## Phase 4: Review

**Delegate to:** roobin-reviewer

### Delegation Prompt

```markdown
Leia ~/.claude/skills/roobin-reviewer/SKILL.md e siga as instruções.

## Comando
Revise a implementação da feature: {task_id}

## Arquivos Modificados
{list_of_modified_files}

## Tipo
Feature implementation

## Output Esperado
- Score 0-100
- Issues encontradas
- Sugestões
```

### Score Handling

| Score | Action |
|-------|--------|
| >= 90 | Proceed to Phase 5 |
| 50-89 | Create fix subtasks, back to Phase 3 |
| < 50 | Escalate to human review |

### Fix Loop (if needed)

```markdown
# If score < 90:

1. Collect issues from reviewer
2. Create fix subtasks (one per issue)
3. Delegate fixes to roobin-dev
4. Re-run review
5. Repeat until >= 90
```

## Phase 5: Deploy

**Delegate to:** roobin-ops

### Delegation Prompt

```markdown
Leia ~/.claude/skills/roobin-ops/SKILL.md e siga as instruções.

## Comando
Execute pre-push e crie PR para: {feature_name}

## Mudanças
- Task ID: {task_id}
- Arquivos: {modified_files}

## PR Info
- Branch: feature/{feature_slug}
- Base: main
- Title: feat: {feature_title}

## Ao Finalizar
- Retorne URL do PR
```

### Success Criteria
- All checks pass (types, lint, build)
- PR created successfully
- Branch pushed to remote

## Phase 6: Report

**Owner:** Orchestrator (you)

### Report to User

```markdown
## Feature Implementada ✅

**{feature_name}**

### Resumo
- {n} subtasks completadas
- {m} arquivos modificados
- Score de review: {score}/100

### PR
{pr_url}

### Próximos Passos
- Aguardar CI/CD
- Code review por humano
- Merge quando aprovado
```

## Complete Example

### User Request
"Implementar filtro de status no Kanban"

### Phase 1: Analyze
- Type: Feature
- Complexity: Medium (multiple components)
- Decision: Quick plan needed

### Phase 2: Plan
Delegate to roobin-planner:
- Subtask A: Componente FilterDropdown
- Subtask B: Hook useStatusFilter
- Subtask C: Integração no KanbanBoard
- Dependencies: C depends on A, B

### Phase 3: Execute
Turn 1:
- Delegate A to roobin-dev
- Delegate B to roobin-dev

Turn 2:
- Wait for A, B

Turn 3:
- Delegate C to roobin-dev

### Phase 4: Review
- Delegate to roobin-reviewer
- Score: 92/100
- Proceed

### Phase 5: Deploy
- Delegate to roobin-ops
- PR created: github.com/repo/pull/123

### Phase 6: Report
"Feature implementada. PR: github.com/repo/pull/123"
