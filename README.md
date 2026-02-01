# Roobin Skills

> A collection of powerful Claude Code skills for AI-driven software development workflows.

## Overview

Roobin Skills is a comprehensive skill system designed for [Claude Code](https://claude.ai/code) that implements a complete software development lifecycle through specialized AI agents. Each skill is self-contained and optimized for specific tasks, enabling efficient delegation and parallel execution.

## Repository Structure

```
roobin-skills/
├── README.md
├── LICENSE
└── skills/
    ├── roobin-orchestrator/   # Master delegator
    ├── roobin-planner/        # Implementation planning
    ├── roobin-dev/            # Code implementation
    ├── roobin-reviewer/       # Code review (0-100 scoring)
    ├── roobin-ops/            # Git operations & deployment
    ├── roobin-tasks/          # Task management
    └── roobin-docs/           # Documentation
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   roobin-orchestrator                       │
│            (Master delegator - NEVER implements)            │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ roobin-planner│   │  roobin-dev   │   │roobin-reviewer│
│   (Planning)  │   │(Implementation)│   │ (Code Review) │
└───────────────┘   └───────────────┘   └───────────────┘
                              │
                              ▼
                    ┌───────────────┐
                    │  roobin-ops   │
                    │  (Deployment) │
                    └───────────────┘
```

## Skills

### Core Skills

| Skill | Purpose | Key Commands |
|-------|---------|--------------|
| **roobin-orchestrator** | Master delegator - coordinates all other skills | Delegation flow |
| **roobin-planner** | Creates implementation plans with subtasks | `*create-plan`, `*design` |
| **roobin-dev** | Implements code following best practices | `*develop`, `*implement` |
| **roobin-reviewer** | Code review with quality scoring (0-100) | `*review`, `*gate` |
| **roobin-ops** | Git operations, PRs, releases | `*pre-push`, `*create-pr` |

### Utility Skills

| Skill | Purpose |
|-------|---------|
| **roobin-tasks** | Task and subtask management via Roobin MCP |
| **roobin-docs** | Documentation creation and updates |

## Installation

### Option 1: Copy All Skills

```bash
# Clone the repository
git clone https://github.com/caiorodrigo10/roobin-skills.git

# Copy skills to Claude Code skills directory
cp -r roobin-skills/skills/* ~/.claude/skills/
```

### Option 2: Symlink Individual Skills

```bash
# Clone the repository
git clone https://github.com/caiorodrigo10/roobin-skills.git ~/roobin-skills

# Symlink specific skills
ln -s ~/roobin-skills/skills/roobin-orchestrator ~/.claude/skills/roobin-orchestrator
ln -s ~/roobin-skills/skills/roobin-planner ~/.claude/skills/roobin-planner
ln -s ~/roobin-skills/skills/roobin-dev ~/.claude/skills/roobin-dev
ln -s ~/roobin-skills/skills/roobin-reviewer ~/.claude/skills/roobin-reviewer
ln -s ~/roobin-skills/skills/roobin-ops ~/.claude/skills/roobin-ops
```

### Option 3: Symlink Entire Skills Folder

```bash
# Clone the repository
git clone https://github.com/caiorodrigo10/roobin-skills.git ~/roobin-skills

# Symlink all skills at once (backup existing first)
mv ~/.claude/skills ~/.claude/skills.backup
ln -s ~/roobin-skills/skills ~/.claude/skills
```

## Usage

### Activating Skills

Skills are automatically activated based on context, or you can invoke them directly:

```
# Using slash commands (if configured)
@orchestrator   → Activates roobin-orchestrator
@planner        → Activates roobin-planner
@dev            → Activates roobin-dev
@reviewer       → Activates roobin-reviewer
@devops         → Activates roobin-ops
```

### Workflow Example

1. **User requests a feature**
2. **Orchestrator** analyzes and delegates to **Planner**
3. **Planner** creates subtasks with dependencies
4. **Orchestrator** delegates implementation to **Dev** (parallelized)
5. **Reviewer** scores the code (must be >= 90 to pass)
6. **Ops** pushes code and creates PR

## Skill Structure

Each skill follows a consistent structure:

```
skills/skill-name/
├── SKILL.md              # Main skill definition (required)
├── tasks/                # Task workflows
├── workflows/            # Multi-step processes
├── templates/            # Output templates
├── checklists/           # Quality checklists
├── scripts/              # Utility scripts
└── data/                 # Reference data
```

### SKILL.md Format

```markdown
---
name: skill-name
description: Use when [activation triggers]
---

# Skill Name

## The Iron Law
[Core principle that must never be violated]

## When to Use
[Activation conditions]

## Commands
[Available commands with * prefix]

## Common Rationalizations
[Excuses and their counters]

## Red Flags
[Signs of skill violation]
```

## Core Principles

### The Orchestrator's Iron Law

```
NEVER IMPLEMENT - ALWAYS DELEGATE
```

The orchestrator coordinates work but never writes implementation code directly.

### Token Optimization

```
MAX ~40k tokens per subagent (one focused task)
```

- One task per subagent for optimal performance
- Parallelize independent tasks
- Sequence dependent tasks

### Quality Gates

- **Score >= 90**: Approved, proceed to deploy
- **Score 50-89**: Needs fixes, back to dev
- **Score < 50**: Escalate to human review

## Integration with Roobin MCP

These skills are designed to work with the [Roobin MCP Server](https://github.com/caiorodrigo10/roobin-mcp) for:

- Task management (`manage_tasks`, `search_tasks`)
- Document management (`manage_document`, `search_documents`)
- Activity tracking (`list_activities`)
- Comments and feedback (`create_comment`, `list_comments`)

## Skill Descriptions

### roobin-orchestrator

The master delegator that coordinates all development workflows. It analyzes incoming tasks, breaks them into subtasks, and delegates to specialized skills. **Never implements directly**.

**Key Features:**
- Dependency analysis for parallel execution
- Token-optimized delegation (40k per subagent)
- Complete workflow management (plan → dev → review → deploy)

### roobin-planner

Combines story creation and technical architecture into implementation plans. Creates structured subtasks with dependency mapping.

**Key Features:**
- Implementation plan creation
- Architecture analysis
- Subtask generation with Roobin MCP integration

### roobin-dev

Implements code following best practices. Works on one task at a time, updates status via MCP, and delegates to ops for push operations.

**Key Features:**
- Task-focused implementation
- Best practices enforcement
- Status tracking via Roobin MCP

### roobin-reviewer

Code review with quantitative scoring (0-100). Analyzes quality, security, performance, and maintainability.

**Key Features:**
- Objective scoring system
- Security-focused review
- Confidence-filtered feedback (>= 80% confidence)

### roobin-ops

Handles all git operations, PR creation, and releases. **Only skill authorized to push to remote**.

**Key Features:**
- Pre-push quality checks
- PR automation
- Release management

## Contributing

Contributions are welcome! Please follow the skill creation guidelines:

1. Use the standard SKILL.md format
2. Include clear activation triggers in description
3. Define an "Iron Law" for discipline skills
4. Add rationalization tables and red flags
5. Test with pressure scenarios

## License

MIT License - See [LICENSE](LICENSE) for details.

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Skill Authoring Best Practices](https://docs.anthropic.com/claude-code/skills)
- [Roobin MCP Server](https://github.com/caiorodrigo10/roobin-mcp)

---

*Built with Claude Code skills framework*
