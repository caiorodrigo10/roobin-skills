# Manage Backlog (Roobin MCP)

> Gerenciar backlog de stories e tasks no Roobin MCP

## Roobin MCP Integration

**Tools:**
- `mcp__roobin__search_tasks` - Buscar e listar tasks
- `mcp__roobin__manage_tasks` - Criar, atualizar, deletar tasks

```yaml
# Search tasks
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  type: "story"  # epic, story, subtask
  status: "backlog"  # backlog, planned, doing, ai-review, human-review, done

# Update task
mcp__roobin__manage_tasks:
  action: update
  task_id: "{task_id}"
  status: "{new_status}"
  priority: "{new_priority}"
```

## Operations

### 1. List Backlog Items

**Por Status:**
```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  status: "backlog"
```

**Por Tipo:**
```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  type: "story"
```

**Por Prioridade:**
```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  priority: "high"
```

### 2. Add Backlog Item

```
mcp__roobin__manage_tasks:
  action: create
  project_id: "{project_id}"
  title: "{item_title}"
  description: |
    ## Description
    {detailed_description}

    ## Source
    - Origin: {qa-review|development|pm-prioritization}
    - Related Story: {story_id}

    ## Effort Estimate
    {estimate}
  type: "{epic|story|subtask}"
  status: "backlog"
  priority: "{low|medium|high}"
  parent_id: "{parent_task_id}"  # se aplicável
```

### 3. Update Backlog Item Status

```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{task_id}"
  status: "{new_status}"
```

**Status Values:**
- `backlog` - Not started, waiting in queue
- `planned` - Scheduled for sprint/iteration
- `doing` - Currently being worked on
- `ai-review` - AI review in progress
- `human-review` - Waiting for human review
- `done` - Completed

### 4. Prioritize Item

```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{task_id}"
  priority: "{low|medium|high}"
```

### 5. Generate Backlog Review

**Workflow:**

1. **Buscar todos os items:**
```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  status: "backlog"
```

2. **Gerar relatório:**
```markdown
# Backlog Review - {date}

## Summary
- Total Items: {count}
- High Priority: {high_count}
- Medium Priority: {medium_count}
- Low Priority: {low_count}

## Items by Priority

### 🔴 HIGH
| ID | Title | Type | Age |
|----|-------|------|-----|
| {id} | {title} | {type} | {days} |

### 🟡 MEDIUM
| ID | Title | Type | Age |
|----|-------|------|-----|
| {id} | {title} | {type} | {days} |

### 🟢 LOW
| ID | Title | Type | Age |
|----|-------|------|-----|
| {id} | {title} | {type} | {days} |

## Recommendations
- {recommendation_1}
- {recommendation_2}
```

### 6. Schedule for Sprint

```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{task_id}"
  status: "planned"
```

## Commands

| Command | Description |
|---------|-------------|
| `*backlog-add` | Add item to backlog |
| `*backlog-review` | Generate backlog review for sprint planning |
| `*backlog-summary` | Quick summary of backlog status |
| `*backlog-prioritize` | Re-prioritize backlog item |
| `*backlog-schedule` | Move item to planned status |

## Backlog Item Lifecycle

```
┌──────────┐
│ backlog  │ ← New items enter here
└────┬─────┘
     │ (scheduled)
     ▼
┌──────────┐
│ planned  │ ← Scheduled for sprint
└────┬─────┘
     │ (started)
     ▼
┌──────────┐
│  doing   │ ← Actively being worked
└────┬─────┘
     │
     ├─► ai-review ──► human-review ──► done
     │
     └─► done (if no review needed)
```

## Best Practices

1. **Be Specific**: Clear, actionable descriptions
2. **Size Appropriately**: Break large items into smaller ones
3. **Review Regularly**: Weekly reviews keep backlog healthy
4. **Track Dependencies**: Note blockers and dependencies
5. **Use Priorities**: HIGH, MEDIUM, LOW for planning

## Output

```
Backlog atualizado:
- Items no backlog: {count}
- Items high priority: {high_count}
- Próximo item recomendado: {next_item_title}

Ações realizadas:
- {action_1}
- {action_2}
```

## Success Criteria

- [ ] Operação realizada no Roobin MCP com sucesso
- [ ] Status/prioridade atualizado corretamente
- [ ] Nenhum arquivo .md local criado
- [ ] Backlog consistente e organizado
