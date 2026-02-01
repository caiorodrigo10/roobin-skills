---
name: roobin-tasks
description: Criar, atualizar e gerenciar tasks e subtasks no Roobin MCP. Use quando o usuário mencionar tarefa, task, criar task, atualizar status, terminei, subtask, ou qualquer gerenciamento de tarefas do projeto.
---

# Roobin Tasks

## Overview

Gerenciamento completo de tasks e subtasks no Roobin MCP com contexto de sessão.

**Core principle:** Toda task deve ter description. Toda task mãe vai para review, nunca done automático.

**Announce at start:** "Estou usando roobin-tasks para [criar/atualizar/gerenciar] as tarefas."

## The Iron Laws

```
NENHUMA TASK SEM DESCRIPTION
NENHUM DONE SEM PASSAR POR REVIEW
TASK MÃE NUNCA VAI PARA DONE AUTOMATICAMENTE
```

## When to Use

- ✓ Usuário menciona "task", "tarefa", "criar task"
- ✓ Usuário diz "terminei", "finalizar", "atualizar status"
- ✓ Usuário quer "subtask", "quebrar em tarefas"
- ✓ Qualquer gerenciamento de tarefas do projeto
- ✗ Não use para documentação (use roobin-docs)

## Common Rationalizations That Mean You're About To Fail

- "É só uma task simples, não precisa de description" → ERRADO. Toda task precisa.
- "Já sei o status, não preciso verificar" → ERRADO. Confirme no Roobin.
- "Posso mover direto para done" → ERRADO. Task mãe vai para review primeiro.
- "Vou criar sem perguntar se quer subtasks" → ERRADO. Se parece complexa, pergunte.

---

## Configuração

### Projeto e Usuário
Obter `project_id` e `user_id` do CLAUDE.md do projeto atual. Se não existir, perguntar ao usuário ou listar projetos com `list_projects()`.

### Defaults para Criação
| Campo | Default | Regra |
|-------|---------|-------|
| `status` | `"planned"` | Sempre inicia em planned |
| `priority` | `"medium"` | Inferir: urgente=high, depois=low |
| `assignee` | `"Agent AI"` | Tasks técnicas. `"User"` para decisões |
| `type` | Inferido ou `"feature"` | Ver inferência abaixo |
| `estimated_complexity` | Inferido ou `"medium"` | Baseado no escopo |

### Inferência de Tipo
| Palavras-chave | Tipo |
|----------------|------|
| "bug", "erro", "fix", "corrigir" | `bug` |
| "melhorar", "otimizar", "refatorar" | `improvement` |
| "pesquisar", "investigar", "analisar" | `research` |
| "documentar", "doc", "readme" | `documentation` |
| "config", "setup", "CI/CD" | `chore` |
| Default | `feature` |

---

## Regras de Negócio

### Criação de Tasks

1. **OBRIGATÓRIO**: Toda task deve ter `description`
   - Se usuário não fornecer → perguntar ou inferir do contexto

2. **Auto-detecção de subtasks**: Se task parecer complexa, sugerir quebra
   - Indicadores: múltiplos passos, "e também", listas, "primeiro X depois Y"
   - Perguntar: "Essa task parece complexa. Quer quebrar em subtasks?"

3. **Campos contextuais** (preencher quando aplicável):
   - `files_affected`: Tasks de código quando paths conhecidos
   - `dependencies`: Quando task depende de outra
   - `context`: Informações adicionais

### Fluxo de Status

```
backlog → planned → doing → review → done
```

### Regras de Atualização

| Situação | Ação |
|----------|------|
| Subtask finalizada | → `done` automaticamente |
| Task mãe finalizada | → `review` (NUNCA done automático) |
| Task mãe para done | SOMENTE se usuário pedir explicitamente |
| Tentar pular review | Bloquear: "Precisa passar por review primeiro" |

### Contexto de Sessão

Manter em memória durante a conversa:

1. **Task atual em `doing`** → Saber qual atualizar quando usuário diz "terminei"
2. **Sugestão de próxima** → Após finalizar, sugerir próxima `planned`
3. **Dependências desbloqueadas** → Avisar quando task dependente liberar

---

## Formato de Output

### Criação
```
✓ Criadas:
  - [abc123] Implementar login (planned, high, feature)
    └─ [def456] Criar formulário (planned, medium)
    └─ [ghi789] Validar credenciais (planned, medium)
```

### Atualização
```
✓ Atualizada:
  - [abc123] Implementar login: planned → doing

ℹ Contexto: Trabalhando em "Implementar login"
```

### Finalização
```
✓ Finalizada:
  - [def456] Criar formulário → done

✓ Task mãe atualizada:
  - [abc123] Implementar login → review

ℹ Próxima sugerida: [mno345] Implementar logout (planned, medium)
```

---

## Tools MCP Roobin

| Ação | Tool |
|------|------|
| Buscar | `search_tasks(project_id, query/status/task_id)` |
| Criar | `manage_tasks(action="create", project_id, tasks=[...])` |
| Subtasks | `manage_tasks(action="create", project_id, parent_task_id, tasks=[...])` |
| Atualizar | `manage_tasks(action="update", project_id, updates=[...])` |
| Mover | `manage_tasks(action="move", project_id, task_ids, new_status)` |

---

## Checklist

- [ ] Anunciei uso da skill
- [ ] Obtive project_id do CLAUDE.md ou perguntei
- [ ] Toda task tem description
- [ ] Sugeri subtasks se task complexa
- [ ] Task mãe foi para review (não done)
- [ ] Sugeri próxima task após finalização
