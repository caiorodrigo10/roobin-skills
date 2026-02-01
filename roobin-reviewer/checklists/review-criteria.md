# Review Criteria

> Consolidated criteria for comprehensive code review

## Review Process

### Phase 1: Context Gathering

1. **Task Context**
   - `mcp__roobin__search_tasks(task_id)` - Get task details
   - Check `needs_human_review` flag
   - Read acceptance criteria

2. **Project Context**
   - `mcp__roobin__knowledge_base(query)` - Project patterns
   - `mcp__supabase__list_tables` - Schema if relevant
   - Check CLAUDE.md for project rules

3. **Code Context**
   - `git diff` - Changes to review
   - Related files and dependencies

### Phase 2: Analysis Categories

| Category | Weight | Focus |
|----------|--------|-------|
| Security | 20% | Vulnerabilities, auth, data exposure |
| Quality | 20% | Patterns, duplication, error handling |
| Functionality | 25% | Requirements, edge cases, regressions |
| Performance | 10% | N+1, memory, algorithms |
| Tests | 15% | Coverage, passing, edge cases |
| Maintainability | 10% | Structure, extensibility |

### Phase 3: Finding Classification

#### Confidence Filter
```
Only report issues with confidence >= 80

0-25:  Likely false positive → IGNORE
26-50: Nitpick not in CLAUDE.md → IGNORE
51-75: Low impact → IGNORE
76-90: Important, verified → REPORT
91-100: Critical/explicit violation → REPORT
```

#### Severity Classification

| Severity | Points | Blocks Approval | Action |
|----------|--------|-----------------|--------|
| Critical | -20 | Yes | Must fix before merge |
| Major | -10 | Yes | Should fix before merge |
| Minor | -5 | No | Can fix later |
| Suggestion | -2 | No | Nice to have |

### Phase 4: Score Calculation

```
score = 100 - sum(deductions)

where:
  - Each critical finding: -20
  - Each major finding: -10
  - Each minor finding: -5
  - Each suggestion: -2

minimum: 0
maximum: 100
```

### Phase 5: Status Decision

```yaml
# Rule 1: Check needs_human_review flag FIRST
if task.needs_human_review == true:
  next_status = "human-review"  # ALWAYS, regardless of score

# Rule 2: Score-based decision
else:
  if score >= 90 AND no_critical_or_major:
    next_status = "done"        # Auto-approve
  elif score >= 70:
    next_status = "human-review" # Needs human look
  elif score >= 50:
    next_status = "ai-review"    # Minor fixes needed
  else:
    next_status = "doing"        # Major issues, back to dev
```

### Phase 6: Update Task

```yaml
actions:
  1. Create comment with review summary:
     mcp__roobin__create_comment(
       entity_type: "task",
       entity_id: task_id,
       content: review_markdown
     )

  2. Update task with review result:
     mcp__roobin__manage_tasks(
       action: "update",
       task_id: task_id,
       ai_review_result: review_json
     )

  3. Move to appropriate status:
     mcp__roobin__manage_tasks(
       action: "move",
       task_id: task_id,
       status: next_status
     )
```

---

## Output Format

### JSON Structure

```json
{
  "approved": true,
  "score": 85,
  "next_status": "human-review",
  "findings": [
    {
      "severity": "minor",
      "category": "quality",
      "message": "Duplicacao de logica em processItems()",
      "suggestion": "Extrair para funcao auxiliar",
      "file": "src/services/processor.ts",
      "line": 45,
      "confidence": 85
    }
  ],
  "summary": "Codigo funcional com pequenas melhorias sugeridas.",
  "highlights": [
    "Boa cobertura de testes",
    "Error handling completo"
  ],
  "recommendations": [
    "Considerar refatoracao do processItems"
  ]
}
```

### Markdown Report

```markdown
## Review Report: Task {task_id}

**Score: {score}/100** | **Status: {next_status}**

### Findings

1. **[{SEVERITY}]** {message}
   - File: {file}:{line}
   - Fix: {suggestion}

### Highlights
- {positive aspects}

### Recommendations
- {suggested improvements}

---
*Reviewed by Quinn (roobin-reviewer)*
```

---

## Quick Reference

### Approval Rules
- `approved: true` only if NO critical/major findings
- `approved: false` if ANY critical or major finding exists

### Status Mapping
| Score | Status | Meaning |
|-------|--------|---------|
| 90-100 | done | Ready to merge |
| 70-89 | human-review | Needs human approval |
| 50-69 | ai-review | Minor fixes, retry review |
| 0-49 | doing | Major issues, back to dev |

### needs_human_review Override
- If `task.needs_human_review == true`: ALWAYS → `human-review`
- This flag takes precedence over score-based decisions

---

*Core reference for roobin-reviewer analysis*
