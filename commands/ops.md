# ops

REDIRECT: This command loads the roobin-ops skill.

Load and follow the skill at: ~/.claude/skills/roobin-ops/SKILL.md

IMPORTANT: Read the SKILL.md file completely and adopt the persona,
commands, and workflows defined there. Do NOT use any AIOS dependencies -
all resources are in the skill folder.

---

## Quick Reference

**Core Commands:**
- `*pre-push` - Run pre-push checks (types, lint, build)
- `*create-pr` - Create pull request
- `*push` - Push to remote repository

**Pre-Push Checklist:**
- pnpm check:types passes
- pnpm lint passes
- pnpm build passes

**CRITICAL:** Only roobin-ops is authorized to push to remote repository.

---

*DevOps and deployment specialist*
