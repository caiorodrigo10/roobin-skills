# Bugfix Flow

## Overview

Streamlined workflow for fixing bugs. Faster than feature flow, but maintains quality gates.

## Flow Diagram

```
Bug Report
     │
     ▼
┌─────────────────┐
│ 1. REPRODUCE    │  Orchestrator confirms bug
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. INVESTIGATE  │  → roobin-dev + systematic-debugging
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. FIX          │  → roobin-dev
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. VERIFY       │  → roobin-reviewer (quick review)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 5. DEPLOY       │  → roobin-ops
└─────────────────┘
```

## Phase 1: Reproduce

**Owner:** Orchestrator (you)

### Actions
1. Understand the reported bug
2. Identify reproduction steps
3. Confirm bug exists (or ask user to confirm)
4. Check for existing bug task in Roobin MCP

### Quick Assessment

| Scenario | Action |
|----------|--------|
| Clear reproduction | Proceed to Phase 2 |
| Unclear reproduction | Ask user for details |
| Cannot reproduce | Report to user, close |

## Phase 2: Investigate

**Delegate to:** roobin-dev with systematic-debugging

### Delegation Prompt

```markdown
Ative a skill roobin-dev lendo ~/.claude/skills/roobin-dev/SKILL.md

IMPORTANTE: Use systematic-debugging para investigação.

## Bug
{bug_description}

## Reprodução
{reproduction_steps}

## Sintomas
- {symptom_1}
- {symptom_2}

## Arquivos Suspeitos
- {likely_file_1}
- {likely_file_2}

## Expected Output
1. Root cause identificada
2. Arquivos afetados
3. Proposta de fix (NÃO implementar ainda)

## After Investigation
- Retornar análise completa
- Listar arquivos a modificar
- Propor solução
```

### Expected Return
- Root cause explanation
- Files that need changes
- Proposed fix approach

## Phase 3: Fix

**Delegate to:** roobin-dev

### Delegation Prompt

```markdown
Ative a skill roobin-dev lendo ~/.claude/skills/roobin-dev/SKILL.md

## Bug Fix
Implementar fix para: {bug_description}

## Root Cause
{root_cause_from_investigation}

## Solução Aprovada
{proposed_fix}

## Arquivos
- Modificar: {files_to_change}

## Success Criteria
- [ ] Bug não mais reproduzível
- [ ] Sem regressões nos arquivos afetados
- [ ] Testes passam (se existirem)

## After Fix
- Status → "ai-review"
- Retornar mudanças feitas
```

## Phase 4: Verify

**Delegate to:** roobin-reviewer (quick mode)

### Delegation Prompt

```markdown
Ative a skill roobin-reviewer lendo ~/.claude/skills/roobin-reviewer/SKILL.md

## Task
Quick review do bugfix: {bug_id}

## Arquivos Modificados
{modified_files}

## Focus Areas
- Fix resolve o bug reportado?
- Introduz regressões?
- Segue padrões do projeto?

## Mode
Quick review (foco em correção, não em melhorias)
```

### Score Handling (Bugfix)

| Score | Action |
|-------|--------|
| >= 80 | Proceed to Deploy (lower bar for bugfixes) |
| 50-79 | Minor fixes needed |
| < 50 | Major issues, re-investigate |

## Phase 5: Deploy

**Delegate to:** roobin-ops

### Delegation Prompt

```markdown
Ative a skill roobin-ops lendo ~/.claude/skills/roobin-ops/SKILL.md

## Task
Pre-push e criar PR para bugfix

## Bug
- ID: {bug_id}
- Descrição: {bug_description}

## Mudanças
- Arquivos: {modified_files}

## PR Info
- Branch: fix/{bug_slug}
- Base: main
- Title: fix: {bug_title}

## After Completion
- Retornar URL do PR
```

## Differences from Feature Flow

| Aspect | Feature Flow | Bugfix Flow |
|--------|--------------|-------------|
| Planning | Full planning phase | Skip planning |
| Investigation | Not required | Required (systematic-debugging) |
| Parallelization | Multiple subtasks | Usually single fix |
| Review threshold | >= 90 | >= 80 |
| Branch prefix | feature/ | fix/ |

## Hotfix Variant

For critical production bugs:

### Modified Flow

```
1. REPRODUCE (quick)
2. FIX (direct, no investigation phase)
3. VERIFY (minimal)
4. DEPLOY (immediate)
```

### Delegation for Hotfix

```markdown
Ative a skill roobin-dev lendo ~/.claude/skills/roobin-dev/SKILL.md

## HOTFIX - URGENT
{bug_description}

## Known Fix
{known_fix_if_available}

## Constraint
- Minimal changes only
- No refactoring
- Fix the symptom, optimize later

## After Fix
- Immediate review request
```

## Complete Example

### Bug Report
"Kanban não mostra tasks quando filtro está ativo"

### Phase 1: Reproduce
- Steps: Apply status filter → board shows empty
- Confirmed: Yes

### Phase 2: Investigate
Delegate to roobin-dev:
- Root cause: Filter state not syncing with query
- File: src/client/hooks/useKanbanFilter.ts
- Proposed fix: Add dependency to useEffect

### Phase 3: Fix
Delegate to roobin-dev:
- Apply proposed fix
- Status → ai-review

### Phase 4: Verify
Delegate to roobin-reviewer:
- Score: 88/100
- Proceed

### Phase 5: Deploy
Delegate to roobin-ops:
- PR created: github.com/repo/pull/124

### Report to User
```markdown
## Bug Corrigido ✅

**Kanban filter sync issue**

### Causa
Filter state não estava sincronizando com query params.

### Fix
Adicionado dependency no useEffect do useKanbanFilter.

### PR
github.com/repo/pull/124
```
