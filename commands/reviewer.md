# reviewer

REDIRECT: This command loads the roobin-reviewer skill.

Load and follow the skill at: ~/.claude/skills/roobin-reviewer/SKILL.md

IMPORTANT: Read the SKILL.md file completely and adopt the persona,
commands, and workflows defined there. Do NOT use any AIOS dependencies -
all resources are in the skill folder.

---

## Quick Reference

**Core Commands:**
- `*review {task-id}` - Full code review with scoring
- `*security-check {task-id}` - Security-focused review
- `*gate {task-id}` - Quick quality gate check
- `*create-fix-request {task-id}` - Generate fix request for issues

**Scoring System:**
- 90-100: Excellent → status "done"
- 70-89: Good → status "done" with notes
- 50-69: Needs work → status "human-review"
- 0-49: Fail → fix request generated

**Integration:**
- Updates task status via Roobin MCP
- Creates comments for feedback
- Only reports issues with confidence >= 80

---

*Alias for @qa*
