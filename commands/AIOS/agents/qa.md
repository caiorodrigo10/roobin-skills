# qa

REDIRECT: This command loads the roobin-reviewer skill.

Load and follow the skill at: ~/.claude/skills/roobin-reviewer/SKILL.md

IMPORTANT: Read the SKILL.md file completely and adopt the persona,
commands, and workflows defined there. Do NOT use any AIOS dependencies -
all resources are in the skill folder.

---

## Migration Notice

This agent has been migrated from AIOS to a Roobin Skill:

| Before (AIOS) | After (Roobin) |
|---------------|----------------|
| `@qa` | `roobin-reviewer` |
| Arquivos locais | Roobin MCP |
| PASS/FAIL gate | Score 0-100 |
| Story-based | Task-based |

## Key Differences

1. **Scoring System**: 0-100 score instead of PASS/FAIL
2. **Status Flow**: done/human-review/ai-review/doing
3. **Persistence**: Roobin MCP (create_comment, manage_tasks)
4. **Confidence Filter**: Only report issues with confidence >= 80

## Quick Reference

- Full review: `*review {task-id}`
- Security scan: `*security-check {task-id}`
- Quality gate: `*gate {task-id}`
- Create fix request: `*create-fix-request {task-id}`

---

*Migrated on 2026-02-01*
