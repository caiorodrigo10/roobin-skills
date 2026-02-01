# Pull Story (Roobin MCP)

> Buscar story do Roobin MCP para trabalhar

## Roobin MCP Integration

**Tool:** `mcp__roobin__search_tasks`

```yaml
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  task_id: "{story_id}"
```

## When to Use

**Use este task quando:**
- Iniciar trabalho em uma story
- Verificar estado atual de uma story
- Buscar detalhes de story para referência
- Sincronizar contexto antes de implementação

## Workflow

### 1. Search for Story

**Por ID:**
```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  task_id: "{story_id}"
```

**Por título/query:**
```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  query: "{search_term}"
  type: "story"
```

**Por status:**
```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  type: "story"
  status: "planned"  # próximas stories prontas para trabalho
```

### 2. Display Story Details

```markdown
# Story: {title}

**ID:** {story_id}
**Status:** {status}
**Priority:** {priority}
**Parent Epic:** {parent_id}

## Description
{description}

## Metadata
- Created: {created_at}
- Updated: {updated_at}
- Type: {type}
```

### 3. Related Context

Buscar documentos relacionados:
```
mcp__roobin__search_documents:
  project_id: "{project_id}"
  query: "{story_keywords}"
```

Buscar subtasks:
```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  parent_id: "{story_id}"
  type: "subtask"
```

### 4. List Available Stories

Para ver todas as stories disponíveis:
```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  type: "story"
  status: "backlog"
```

## Common Queries

### Next Story to Work On
```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  type: "story"
  status: "planned"
  priority: "high"
```

### Stories by Epic
```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  parent_id: "{epic_id}"
  type: "story"
```

### In-Progress Stories
```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  type: "story"
  status: "doing"
```

## Output

```
Story Retrieved:

ID: {story_id}
Title: {story_title}
Status: {status}
Priority: {priority}
Parent Epic: {epic_title}

Description:
{description_preview}

Related:
- Documents: {doc_count}
- Subtasks: {subtask_count}

Próximos passos:
1. Revisar acceptance criteria
2. Verificar dependências
3. Iniciar implementação com roobin-dev
```

## Success Criteria

- [ ] Story encontrada no Roobin MCP
- [ ] Detalhes exibidos corretamente
- [ ] Contexto relacionado identificado
- [ ] Pronto para iniciar trabalho
