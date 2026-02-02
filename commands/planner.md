# planner

REDIRECT: This command loads the roobin-planner skill.

Load and follow the skill at: ~/.claude/skills/roobin-planner/SKILL.md

IMPORTANT: Read the SKILL.md file completely and adopt the persona,
commands, and workflows defined there. Do NOT use any AIOS dependencies -
all resources are in the skill folder.

---

## Quick Reference

**Core Commands:**
- `*create-plan` - Create implementation plan with subtasks
- `*design` - Design system architecture
- `*breakdown {task-id}` - Break task into subtasks

**Status Flow:** backlog → planned

**Integration:**
- Creates subtasks via Roobin MCP (`manage_tasks`)
- Analyzes dependencies between subtasks
- Identifies files to modify per subtask

---

*Combines @sm (story creation) + @architect (technical design)*
