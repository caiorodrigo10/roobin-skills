# Delegation Prompt Template

## Delegation Format with Imperative Commands

Use this template when delegating to Roobin skills via Task tool. **Always use imperative commands.**

```markdown
Read ~/.claude/skills/{skill-name}/SKILL.md and follow the instructions.

## Command
{IMPERATIVE VERB}: {specific action description}

## Identifiers
- Task/Subtask ID: {id}
- Project ID: {project_id}

## Context
- Relevant files: {file_paths}
- Patterns to follow: {existing_patterns}
- Dependencies: {dependencies}

## Success Criteria
- [ ] {criterion_1}
- [ ] {criterion_2}

## On Completion
- Update task status via manage_tasks to "{next_status}"
- Return summary of changes
- List files created/modified
```

## Imperative Verbs by Skill

| Skill | Verbs | Example |
|-------|-------|---------|
| `roobin-planner` | Create, Plan, Define | "Create implementation plan for X" |
| `roobin-dev` | Implement, Fix, Refactor | "Implement component Y" |
| `roobin-reviewer` | Review, Analyze, Evaluate | "Review modified files" |
| `roobin-ops` | Run, Publish, Create | "Run pre-push and create PR" |
| `roobin-pm` | Create, Prioritize, Validate | "Create PRD for feature Z" |

## Skill-Specific Templates

### roobin-planner

```markdown
Read ~/.claude/skills/roobin-planner/SKILL.md and follow the instructions.

## Command
Create implementation plan for: {task_description}

## Project
- Project ID: {project_id}
- Task ID: {task_id} (if existing)

## Requirements
{requirements_summary}

## Expected Output
- Structured plan with subtasks
- Subtasks created in Roobin MCP via manage_tasks
- Dependency analysis between subtasks
- Complexity estimate per subtask

## On Completion
- Move main task to status "planned"
- Return list of created subtask IDs
```

### roobin-dev

```markdown
Read ~/.claude/skills/roobin-dev/SKILL.md and follow the instructions.

## Command
Implement: {subtask_description}

## Identifiers
- Subtask ID: {subtask_id}
- Parent Task ID: {parent_task_id}
- Project ID: {project_id}

## Context
- Files to modify: {files_to_modify}
- Reference files: {reference_files}
- Existing patterns: {patterns}

## Technical Details
{technical_requirements}

## Success Criteria
- [ ] {functional_criterion}
- [ ] Code follows project patterns
- [ ] No TypeScript errors (pnpm check:types)
- [ ] No lint errors (pnpm lint)

## On Completion
- Move subtask to status "ai-review"
- Return list of modified files
- Include summary of changes
```

### roobin-reviewer

```markdown
Read ~/.claude/skills/roobin-reviewer/SKILL.md and follow the instructions.

## Command
Review code for task: {task_id}

## Scope
- Modified files: {modified_files}
- Change type: {change_type} (feature/bugfix/refactor)

## Review Criteria
- Code quality
- Security (OWASP top 10)
- Performance
- Maintainability
- Adherence to project patterns

## Expected Output
- Score 0-100
- List of issues found (if any)
- Improvement suggestions

## After Review
- If score >= 90: move to "done"
- If score 50-89: create fix-request, keep in "ai-review"
- If score < 50: move to "human-review"
```

### roobin-ops

```markdown
Read ~/.claude/skills/roobin-ops/SKILL.md and follow the instructions.

## Command
Run pre-push and create PR for: {feature_name}

## Changes
- Task ID: {task_id}
- Modified files: {modified_files}
- Description: {change_description}

## Pre-Push Checklist
- [ ] pnpm check:types passes
- [ ] pnpm lint passes
- [ ] pnpm build passes
- [ ] Tests pass (if applicable)

## PR Details
- Branch: {branch_name}
- Base: {base_branch}
- Title: {pr_title}

## On Completion
- Return created PR URL
- Confirm push was successful
```

## Context Rules

### Always Include
1. **Command to read SKILL.md** - full path
2. **Imperative verb** - clear and specific action
3. **Task identification** - ID or complete description
4. **Relevant files** - what to read/modify
5. **Success criteria** - how to know when done
6. **Next status** - what status to set on completion

### Never Include
1. Full conversation history
2. Multiple unrelated tasks
3. Vague instructions ("make it better")
4. Assumptions about what subagent knows

### Token Budget
- Keep delegation prompt under 500 tokens
- Focus on actionable information
- Reference files instead of pasting content
