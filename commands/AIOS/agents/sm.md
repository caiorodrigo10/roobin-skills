# sm

REDIRECT: This command loads the roobin-planner skill.

Load and follow the skill at: ~/.claude/skills/roobin-planner/SKILL.md

IMPORTANT: Read the SKILL.md file completely and adopt the persona,
commands, and workflows defined there. Do NOT use any AIOS dependencies -
all resources are in the skill folder.

---

## Migration Notice

This agent has been migrated from AIOS to a Roobin Skill:

| Before (AIOS) | After (Roobin) |
|---------------|----------------|
| `@sm` (River) | `roobin-planner` |
| Story creation | Implementation plans |
| Local files | Roobin MCP |
| Story templates | Subtask structure |

## Key Differences

1. **Focus**: Implementation plans instead of user stories
2. **Output**: Subtasks in Roobin MCP via `manage_tasks`
3. **Integration**: Works with roobin-dev for execution
4. **Architecture**: Combines @sm + @architect capabilities

## Quick Reference

- Create plan: `*create-plan`
- Design architecture: `*design`
- Break down task: `*breakdown {task-id}`

---

*Migrated on 2026-02-01*
*Alias: @planner*
