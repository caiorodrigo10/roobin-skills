# Full Feature Flow

## Overview

Complete workflow for implementing a new feature from request to deployment.

## Flow Diagram

```
User Request
     │
     ▼
┌─────────────────┐
│ 1. ANALYZE      │  Orchestrator understands scope
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. PLAN         │  → roobin-planner (if complex)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. EXECUTE      │  → roobin-dev (parallelized)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. REVIEW       │  → roobin-reviewer
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
  Pass      Fail
    │         │
    ▼         ▼
┌─────────┐ ┌─────────┐
│ DEPLOY  │ │ FIX     │
│ roobin- │ │ roobin- │
│ ops     │ │ dev     │
└────┬────┘ └────┬────┘
     │           │
     │      (back to REVIEW)
     ▼
  PR Created
```

## Phase 1: Analyze

**Owner:** Orchestrator (you)

### Actions
1. Receive task from user
2. Identify task type: feature
3. Assess complexity:
   - Simple: 1-2 files, clear scope → skip planning
   - Complex: 3+ files, unclear scope → needs planning
4. Check for existing tasks in Roobin MCP

### Decision Matrix

| Complexity | Action |
|------------|--------|
| Simple (obvious implementation) | Skip to Phase 3 |
| Medium (clear but multi-file) | Quick plan, then Phase 3 |
| Complex (unclear or architectural) | Full Phase 2 |

## Phase 2: Plan

**Delegate to:** roobin-planner

### Delegation Prompt

```markdown
Read ~/.claude/skills/roobin-planner/SKILL.md and follow the instructions.

## Command
Create implementation plan for: {feature_description}

## Project
- Project ID: {project_id}

## Requirements
{user_requirements}

## Expected Output
1. Structured plan with subtasks
2. Subtasks created in Roobin MCP
3. Dependency analysis
4. List of affected files

## On Completion
- Move task to "planned"
- Return list of subtask IDs
```

### Expected Return
- List of subtask IDs
- Dependency graph (which subtasks depend on others)
- Estimated files per subtask

## Phase 3: Execute

**Delegate to:** roobin-dev (one per subtask)

### Parallelization Rules

1. **Identify independent subtasks** - no shared files, no dependencies
2. **Group for parallel execution** - max 3-4 parallel subagents
3. **Wait for completion** before dependent subtasks

### Delegation Pattern

```markdown
# Turn 1: Parallel independent subtasks
Task tool 1: [Subtask A - independent]
Task tool 2: [Subtask B - independent]
Task tool 3: [Subtask C - independent]

# Turn 2: Wait for returns

# Turn 3: Dependent subtasks
Task tool 1: [Subtask D - depends on A]
Task tool 2: [Subtask E - depends on B, C]
```

### Delegation Prompt per Subtask

```markdown
Read ~/.claude/skills/roobin-dev/SKILL.md and follow the instructions.

## Command
Implement subtask: {subtask_description}

## Identifiers
- Subtask ID: {subtask_id}

## Context
- Files: {files}
- Patterns: {patterns}
- Dependencies: {deps}

## Success Criteria
- [ ] {criteria}

## On Completion
- Move to status "ai-review"
- Return modified files
```

## Phase 4: Review

**Delegate to:** roobin-reviewer

### Delegation Prompt

```markdown
Read ~/.claude/skills/roobin-reviewer/SKILL.md and follow the instructions.

## Command
Review feature implementation: {task_id}

## Modified Files
{list_of_modified_files}

## Type
Feature implementation

## Expected Output
- Score 0-100
- Issues found
- Suggestions
```

### Score Handling

| Score | Action |
|-------|--------|
| >= 90 | Proceed to Phase 5 |
| 50-89 | Create fix subtasks, back to Phase 3 |
| < 50 | Escalate to human review |

### Fix Loop (if needed)

```markdown
# If score < 90:

1. Collect issues from reviewer
2. Create fix subtasks (one per issue)
3. Delegate fixes to roobin-dev
4. Re-run review
5. Repeat until >= 90
```

## Phase 5: Deploy

**Delegate to:** roobin-ops

### Delegation Prompt

```markdown
Read ~/.claude/skills/roobin-ops/SKILL.md and follow the instructions.

## Command
Run pre-push and create PR for: {feature_name}

## Changes
- Task ID: {task_id}
- Files: {modified_files}

## PR Info
- Branch: feature/{feature_slug}
- Base: main
- Title: feat: {feature_title}

## On Completion
- Return PR URL
```

### Success Criteria
- All checks pass (types, lint, build)
- PR created successfully
- Branch pushed to remote

## Phase 6: Report

**Owner:** Orchestrator (you)

### Report to User

```markdown
## Feature Implemented ✅

**{feature_name}**

### Summary
- {n} subtasks completed
- {m} files modified
- Review score: {score}/100

### PR
{pr_url}

### Next Steps
- Wait for CI/CD
- Human code review
- Merge when approved
```

## Complete Example

### User Request
"Implement status filter in Kanban"

### Phase 1: Analyze
- Type: Feature
- Complexity: Medium (multiple components)
- Decision: Quick plan needed

### Phase 2: Plan
Delegate to roobin-planner:
- Subtask A: FilterDropdown component
- Subtask B: useStatusFilter hook
- Subtask C: KanbanBoard integration
- Dependencies: C depends on A, B

### Phase 3: Execute
Turn 1:
- Delegate A to roobin-dev
- Delegate B to roobin-dev

Turn 2:
- Wait for A, B

Turn 3:
- Delegate C to roobin-dev

### Phase 4: Review
- Delegate to roobin-reviewer
- Score: 92/100
- Proceed

### Phase 5: Deploy
- Delegate to roobin-ops
- PR created: github.com/repo/pull/123

### Phase 6: Report
"Feature implemented. PR: github.com/repo/pull/123"
