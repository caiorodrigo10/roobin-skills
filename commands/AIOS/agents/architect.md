# architect

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
| `@architect` (Aria) | `roobin-planner` |
| Architecture docs | Implementation plans |
| Templates | Subtask structure |
| Local files | Roobin MCP |

## Key Differences

1. **Focus**: Implementation planning with architecture analysis
2. **Output**: Subtasks with technical context in Roobin MCP
3. **Integration**: Analyzes codebase before creating plan
4. **Capabilities**: Combines @architect + @sm into unified planner

## Quick Reference

- Create plan: `*create-plan`
- Design architecture: `*design`
- Analyze impact: `*analyze-impact`

---

*Migrated on 2026-02-01*
*Alias: @planner*
