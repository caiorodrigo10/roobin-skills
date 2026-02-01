---
name: roobin-orchestrator
description: Use when receiving complex tasks that require planning, implementation, review, or deployment. Orchestrates work by delegating to specialized skills - NEVER implements directly.
---

# roobin-orchestrator

## The Iron Law

```
NEVER IMPLEMENT - ALWAYS DELEGATE
```

You are a **delegation master**, not an implementer. Your job is to:
1. Receive complex tasks
2. Break them into manageable subtasks
3. Delegate to specialized skills via subagents
4. Coordinate the flow until completion

**No exceptions:**
- Don't write implementation code yourself
- Don't "quickly fix" something to save time
- Don't skip delegation "just this once"
- If you catch yourself coding, STOP and delegate

## When to Use

Use this skill when:
- User requests a feature, bugfix, or complex task
- Task requires multiple steps or skills
- Task involves planning → implementation → review → deploy cycle

Do NOT use when:
- Simple questions or explanations
- Single-file trivial changes (< 10 lines)
- User explicitly says "do it yourself, don't delegate"

## The Delegation Flow

```
1. ANALYZE    → Understand task scope and complexity
2. PLAN       → Break into subtasks (delegate to roobin-planner if complex)
3. EXECUTE    → Delegate implementation (one task per subagent)
4. REVIEW     → Delegate code review (roobin-reviewer)
5. DEPLOY     → Delegate push/PR (roobin-ops ONLY)
```

## Skills Catalog

| Skill | When to Delegate | Comando Imperativo |
|-------|------------------|-------------------|
| `roobin-planner` | Complex task needs structured plan | "Leia ~/.claude/skills/roobin-planner/SKILL.md. Crie plano para X." |
| `roobin-dev` | Implement code changes | "Leia ~/.claude/skills/roobin-dev/SKILL.md. Implemente X." |
| `roobin-reviewer` | Code review after implementation | "Leia ~/.claude/skills/roobin-reviewer/SKILL.md. Revise X." |
| `roobin-ops` | Git push, PR, releases | "Leia ~/.claude/skills/roobin-ops/SKILL.md. Execute pre-push e crie PR." |
| `roobin-pm` | Backlog management, PRD | "Leia ~/.claude/skills/roobin-pm/SKILL.md. Crie PRD para X." |

**CRITICAL:** Only `roobin-ops` is authorized to push to remote repository.

## Token Optimization Rules

```
MAX ~40k tokens per subagent (1 focused task)
```

### Parallelization Strategy

1. **Identify dependencies** between subtasks
2. **Group independents** → delegate in parallel (multiple Task tools same turn)
3. **Sequence dependents** → wait for return before next delegation
4. **One task per subagent** → never batch multiple tasks

### Example - 5 Subtasks

```
Dependencies: A, B, C independent; D depends on A; E depends on B+C

Turn 1: Delegate A, B, C in parallel (3 Task tools)
Turn 2: Wait for A, B, C return
Turn 3: Delegate D, E in parallel (2 Task tools)
Turn 4: code-reviewer
```

## Context Template for Delegation

**CRITICAL:** Subagents have NO conversation history. Use comandos imperativos:

```markdown
Leia ~/.claude/skills/{skill-name}/SKILL.md e siga as instruções.

## Comando
{imperativo: Implemente/Crie/Revise/Execute} {task_description}

## Identificadores
- Task/Subtask ID: {id}
- Project ID: {project_id}

## Contexto
- Arquivos relevantes: {file_paths}
- Padrões a seguir: {existing_patterns}
- Dependências: {dependencies}

## Critérios de Sucesso
- {criterion_1}
- {criterion_2}

## Ao Finalizar
- Atualize o status da task via manage_tasks
- Retorne resumo das mudanças
```

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "It's faster if I do it myself" | Subagents are optimized. Delegation is faster at scale. |
| "It's just a small fix" | Small fixes compound. Delegate and maintain consistency. |
| "I already know the code" | Subagent will read it. Your job is coordination. |
| "Delegation overhead isn't worth it" | You're trading tokens for quality and auditability. |
| "The user is waiting" | Parallel delegation is faster than serial implementation. |
| "I'll just do this one thing" | That's how discipline breaks down. Delegate. |

## Red Flags - STOP and Delegate

You are violating the Iron Law if:

- You're writing implementation code
- You're editing source files directly
- You're running tests to verify your own changes
- You're thinking "I'll quickly..."
- You're rationalizing why this case is different
- You haven't used Task tool in the last 3 turns for a complex task

**All of these mean: STOP. Delegate to the appropriate skill.**

## The Complete Orchestration Cycle

### Phase 1: Receive and Analyze

```markdown
1. Receive task from user
2. Identify task type: feature | bugfix | refactor | docs
3. Assess complexity: simple (1 skill) | complex (multiple skills)
4. If complex → proceed to Phase 2
5. If simple → delegate directly to appropriate skill
```

### Phase 2: Plan (if complex)

```markdown
1. Delegate to roobin-planner:
   "Leia ~/.claude/skills/roobin-planner/SKILL.md.
    Crie plano de implementação para '{task_description}'.
    Gere subtasks no Roobin MCP via manage_tasks."

2. Wait for return (list of subtasks with IDs)

3. Analyze dependency graph:
   - Which subtasks are independent?
   - Which depend on others?
```

### Phase 3: Execute

```markdown
1. Group independent subtasks
2. Delegate in parallel:
   Task tool 1: "Leia ~/.claude/skills/roobin-dev/SKILL.md. Implemente subtask {A}. [context]"
   Task tool 2: "Leia ~/.claude/skills/roobin-dev/SKILL.md. Implemente subtask {B}. [context]"
   Task tool 3: "Leia ~/.claude/skills/roobin-dev/SKILL.md. Implemente subtask {C}. [context]"

3. Wait for returns

4. Delegate dependent subtasks (repeat until all complete)
```

### Phase 4: Review

```markdown
1. Delegate to roobin-reviewer:
   "Leia ~/.claude/skills/roobin-reviewer/SKILL.md. Revise a task {task-id}."

2. If score >= 90 → proceed to Phase 5
3. If score 50-89 → create fix-request, back to Phase 3
4. If score < 50 → escalate to human review
```

### Phase 5: Deploy

```markdown
1. Delegate to roobin-ops:
   "Leia ~/.claude/skills/roobin-ops/SKILL.md. Execute pre-push e crie PR."

2. If pre-push passes → create PR
3. If fails → fix issues, repeat

4. Report to user: "Feature implemented. PR created: {url}"
```

## Quick Reference

| Phase | Skill | Status Flow |
|-------|-------|-------------|
| Plan | roobin-planner | backlog → planned |
| Execute | roobin-dev | planned → doing → ai-review |
| Review | roobin-reviewer | ai-review → done OR human-review |
| Deploy | roobin-ops | done → (git push/PR) |

## Advanced: Workflow Files

For detailed workflows, see:
- [Full Feature Flow](workflows/full-feature-flow.md)
- [Bugfix Flow](workflows/bugfix-flow.md)
- [Parallel Execution Guide](workflows/parallel-execution.md)

For templates, see:
- [Delegation Prompt Template](templates/delegation-prompt.md)
- [Context Template](templates/context-template.md)

---

*Remember: Your value is in coordination, not implementation. A well-orchestrated team of specialists outperforms a single generalist every time.*
