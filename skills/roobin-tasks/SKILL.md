---
name: roobin-tasks
description: Create, update, and manage tasks and subtasks in Roobin MCP. Use when user mentions task, create task, update status, done, finished, subtask, or any project task management.
---

# Roobin Tasks

## Overview

Complete task and subtask management in Roobin MCP with session context.

**Core principle:** Every task must have a description. Parent tasks go to review, never auto-done.

**Announce at start:** "I'm using roobin-tasks to [create/update/manage] the tasks."

## The Iron Laws

```
NO TASK WITHOUT DESCRIPTION
NO DONE WITHOUT GOING THROUGH REVIEW
PARENT TASK NEVER GOES TO DONE AUTOMATICALLY
```

## When to Use

- ✓ User mentions "task", "create task"
- ✓ User says "done", "finished", "update status"
- ✓ User wants "subtask", "break into tasks"
- ✓ Any project task management
- ✗ Don't use for documentation (use roobin-docs)

## Common Rationalizations That Mean You're About To Fail

- "It's just a simple task, no need for description" → WRONG. Every task needs one.
- "I already know the status, no need to check" → WRONG. Confirm in Roobin.
- "I can move directly to done" → WRONG. Parent task goes to review first.
- "I'll create without asking about subtasks" → WRONG. If it looks complex, ask.

---

## Configuration

### Project and User
Get `project_id` and `user_id` from CLAUDE.md of the current project. If not present, ask the user or list projects with `list_projects()`.

### Defaults for Creation
| Field | Default | Rule |
|-------|---------|------|
| `status` | `"planned"` | Always starts in planned |
| `priority` | `"medium"` | Infer: urgent=high, later=low |
| `assignee` | `"Agent AI"` | Technical tasks. `"User"` for decisions |
| `type` | Inferred or `"feature"` | See inference below |
| `estimated_complexity` | Inferred or `"medium"` | Based on scope |

### Type Inference
| Keywords | Type |
|----------|------|
| "bug", "error", "fix", "correct" | `bug` |
| "improve", "optimize", "refactor" | `improvement` |
| "research", "investigate", "analyze" | `research` |
| "document", "doc", "readme" | `documentation` |
| "config", "setup", "CI/CD" | `chore` |
| Default | `feature` |

---

## Business Rules

### Task Creation

1. **REQUIRED**: Every task must have a `description`
   - If user doesn't provide → ask or infer from context

2. **Auto-detection of subtasks**: If task seems complex, suggest breaking it down
   - Indicators: multiple steps, "and also", lists, "first X then Y"
   - Ask: "This task seems complex. Do you want to break it into subtasks?"

3. **Contextual fields** (fill when applicable):
   - `files_affected`: Code tasks when paths are known
   - `dependencies`: When task depends on another
   - `context`: Additional information

### Status Flow

```
backlog → planned → doing → review → done
```

### Update Rules

| Situation | Action |
|-----------|--------|
| Subtask finished | → `done` automatically |
| Parent task finished | → `review` (NEVER auto-done) |
| Parent task to done | ONLY if user explicitly requests |
| Trying to skip review | Block: "Must go through review first" |

### Session Context

Keep in memory during conversation:

1. **Current task in `doing`** → Know which to update when user says "done"
2. **Next task suggestion** → After finishing, suggest next `planned`
3. **Unblocked dependencies** → Notify when dependent task is freed

---

## Output Format

### Creation
```
✓ Created:
  - [abc123] Implement login (planned, high, feature)
    └─ [def456] Create form (planned, medium)
    └─ [ghi789] Validate credentials (planned, medium)
```

### Update
```
✓ Updated:
  - [abc123] Implement login: planned → doing

ℹ Context: Working on "Implement login"
```

### Completion
```
✓ Completed:
  - [def456] Create form → done

✓ Parent task updated:
  - [abc123] Implement login → review

ℹ Next suggested: [mno345] Implement logout (planned, medium)
```

---

## Roobin MCP Tools

| Action | Tool |
|--------|------|
| Search | `search_tasks(project_id, query/status/task_id)` |
| Create | `manage_tasks(action="create", project_id, tasks=[...])` |
| Subtasks | `manage_tasks(action="create", project_id, parent_task_id, tasks=[...])` |
| Update | `manage_tasks(action="update", project_id, updates=[...])` |
| Move | `manage_tasks(action="move", project_id, task_ids, new_status)` |

---

## Checklist

- [ ] Announced skill usage
- [ ] Got project_id from CLAUDE.md or asked
- [ ] Every task has description
- [ ] Suggested subtasks if task is complex
- [ ] Parent task went to review (not done)
- [ ] Suggested next task after completion
