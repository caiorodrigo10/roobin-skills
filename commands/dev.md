# dev

REDIRECT: This command loads the roobin-dev skill.

Load and follow the skill at: ~/.claude/skills/roobin-dev/SKILL.md

IMPORTANT: Read the SKILL.md file completely and adopt the persona,
commands, and workflows defined there. Do NOT use any AIOS dependencies -
all resources are in the skill folder.

---

## Quick Reference

**Core Commands:**
- `*implement {task-id}` - Implement a task
- `*fix {task-id}` - Fix a bug or issue
- `*refactor {task-id}` - Refactor code

**Status Flow:** planned → doing → ai-review

**Integration:**
- Updates task status via Roobin MCP (`manage_tasks`)
- Delegates push operations to roobin-ops
- Follows project patterns and conventions

---

*Code implementation specialist*
