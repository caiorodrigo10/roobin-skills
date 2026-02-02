# tasks

REDIRECT: This command loads the roobin-tasks skill.

Load and follow the skill at: ~/.claude/skills/roobin-tasks/SKILL.md

IMPORTANT: Read the SKILL.md file completely and adopt the persona,
commands, and workflows defined there. Do NOT use any AIOS dependencies -
all resources are in the skill folder.

---

## Quick Reference

**Core Commands:**
- `*create-task` - Create new task
- `*update-status {task-id}` - Update task status
- `*create-subtask {parent-id}` - Create subtask

**Status Flow:** backlog → planned → doing → review → done

**Iron Laws:**
- No task without description
- No done without going through review
- Parent task never goes to done automatically

**Integration:**
- Manages tasks via Roobin MCP (`manage_tasks`, `search_tasks`)
- Suggests next task after completion
- Auto-detects complex tasks for subtask breakdown

---

*Task management specialist*
