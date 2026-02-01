# Sync Story (Roobin MCP)

> Atualizar story no Roobin MCP após mudanças

## Roobin MCP Integration

**Tool:** `mcp__roobin__manage_tasks`

```yaml
mcp__roobin__manage_tasks:
  action: update
  task_id: "{story_id}"
  status: "{new_status}"
  description: "{updated_description}"
```

## When to Use

**Use este task quando:**
- Story teve mudanças que precisam ser sincronizadas
- Status da story mudou (backlog → planned → doing → done)
- Acceptance criteria foram atualizados
- Descrição ou technical notes mudaram
- Após completar trabalho em uma story

## Workflow

### 1. Load Current Story State

```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  task_id: "{story_id}"
```

### 2. Update Story

**Atualizar status:**
```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{story_id}"
  status: "{new_status}"
```

**Atualizar descrição:**
```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{story_id}"
  description: "{updated_description}"
```

**Atualizar múltiplos campos:**
```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{story_id}"
  status: "{status}"
  priority: "{priority}"
  description: "{description}"
```

### 3. Common Status Updates

| From | To | When |
|------|-----|------|
| backlog | planned | Story aprovada para sprint |
| planned | doing | Trabalho iniciado |
| doing | ai-review | Implementação completa, aguardando review |
| ai-review | human-review | AI review completo |
| human-review | done | Review aprovado |
| doing | backlog | Trabalho pausado/bloqueado |

### 4. Add Progress Notes

Se story tem progresso parcial:
```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{story_id}"
  description: |
    {original_description}

    ---
    ## Progress Notes

    ### {date}
    - {progress_item_1}
    - {progress_item_2}

    **Status:** {current_status}
    **Blocker:** {if any}
```

### 5. Create Comment for Significant Updates

Para updates significativos, criar comentário:
```
mcp__roobin__create_comment:
  task_id: "{story_id}"
  content: |
    ## Status Update - {date}

    **From:** {old_status}
    **To:** {new_status}

    ### Changes Made
    - {change_1}
    - {change_2}

    ### Next Steps
    - {next_step_1}
```

## Sync Scenarios

### Starting Work
```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{story_id}"
  status: "doing"
```

### Completing Implementation
```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{story_id}"
  status: "ai-review"
```

### After Review Approval
```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{story_id}"
  status: "done"
```

### Blocking/Pausing
```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{story_id}"
  status: "backlog"
  description: |
    {original}

    ---
    **BLOCKED:** {reason}
    **Blocked since:** {date}
```

## Output

```
Story Synced:

ID: {story_id}
Title: {story_title}

Updates Applied:
- Status: {old_status} → {new_status}
- Priority: {if changed}
- Description: {if updated}

Timestamp: {sync_time}

Story está atualizada no Roobin MCP.
```

## Success Criteria

- [ ] Story atualizada no Roobin MCP
- [ ] Status correto
- [ ] Mudanças refletidas corretamente
- [ ] Histórico preservado (via comments se necessário)
- [ ] Nenhum arquivo .md local criado
