# docs

REDIRECT: This command loads the roobin-docs skill.

Load and follow the skill at: ~/.claude/skills/roobin-docs/SKILL.md

IMPORTANT: Read the SKILL.md file completely and adopt the persona,
commands, and workflows defined there. Do NOT use any AIOS dependencies -
all resources are in the skill folder.

---

## Quick Reference

**Core Commands:**
- `*create-doc` - Create new documentation
- `*update-doc {doc-id}` - Update existing documentation
- `*search-docs {query}` - Search for documentation

**Document Types:**
- planning, architecture, specs, guides
- research, quality, reports, general

**Integration:**
- Creates/updates docs via Roobin MCP (`manage_document`)
- Always versions before updating
- Always publishes directly (status: published)

---

*Documentation specialist*
