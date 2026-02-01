# Delegation Prompt Template

## Standard Delegation Format

Use this template when delegating to any Roobin skill via Task tool.

```markdown
Ative a skill {skill-name} lendo ~/.claude/skills/{skill-name}/SKILL.md

## Task
{task_description}

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
- [ ] {criterion_3}

## After Completion
- Update task status via manage_tasks to "{next_status}"
- Return summary of changes made
- List any new files created/modified
```

## Skill-Specific Templates

### roobin-planner

```markdown
Ative a skill roobin-planner lendo ~/.claude/skills/roobin-planner/SKILL.md

## Task
Criar plano de implementação para: {task_description}

## Project
- Project ID: {project_id}
- Task ID: {task_id} (se existente)

## Requirements
{requirements_summary}

## Expected Output
- Plano estruturado com subtasks
- Subtasks criadas no Roobin MCP via manage_tasks
- Análise de dependências entre subtasks
- Estimativa de complexidade por subtask

## After Completion
- Mover task principal para status "planned"
- Retornar lista de subtask IDs criadas
```

### roobin-dev

```markdown
Ative a skill roobin-dev lendo ~/.claude/skills/roobin-dev/SKILL.md

## Task
Implementar: {subtask_description}

## Identifiers
- Subtask ID: {subtask_id}
- Parent Task ID: {parent_task_id}
- Project ID: {project_id}

## Context
- Arquivos a modificar: {files_to_modify}
- Arquivos de referência: {reference_files}
- Padrões existentes: {patterns}

## Technical Details
{technical_requirements}

## Success Criteria
- [ ] {functional_criterion}
- [ ] Código segue padrões do projeto
- [ ] Sem erros de TypeScript (pnpm check:types)
- [ ] Sem erros de lint (pnpm lint)

## After Completion
- Mover subtask para status "ai-review"
- Retornar lista de arquivos modificados
- Incluir resumo das mudanças
```

### roobin-reviewer

```markdown
Ative a skill roobin-reviewer lendo ~/.claude/skills/roobin-reviewer/SKILL.md

## Task
Review código da task: {task_id}

## Scope
- Arquivos modificados: {modified_files}
- Tipo de mudança: {change_type} (feature/bugfix/refactor)

## Review Criteria
- Qualidade do código
- Segurança (OWASP top 10)
- Performance
- Manutenibilidade
- Aderência aos padrões do projeto

## Expected Output
- Score 0-100
- Lista de issues encontradas (se houver)
- Sugestões de melhoria

## After Review
- Se score >= 90: mover para "done"
- Se score 50-89: criar fix-request, manter em "ai-review"
- Se score < 50: mover para "human-review"
```

### roobin-ops

```markdown
Ative a skill roobin-ops lendo ~/.claude/skills/roobin-ops/SKILL.md

## Task
Executar pre-push e criar PR

## Changes
- Task ID: {task_id}
- Arquivos modificados: {modified_files}
- Descrição: {change_description}

## Pre-Push Checklist
- [ ] pnpm check:types passa
- [ ] pnpm lint passa
- [ ] pnpm build passa
- [ ] Testes passam (se aplicável)

## PR Details
- Branch: {branch_name}
- Base: {base_branch}
- Title: {pr_title}

## After Completion
- Retornar URL do PR criado
- Confirmar que push foi bem sucedido
```

## Context Passing Rules

### Always Include
1. **Skill activation** - Full path to SKILL.md
2. **Task identification** - ID or complete description
3. **Relevant files** - What to read/modify
4. **Success criteria** - How to know when done
5. **Next status** - What status to set after completion

### Never Include
1. Full conversation history
2. Multiple unrelated tasks
3. Vague instructions ("make it better")
4. Assumptions about what subagent knows

### Token Budget
- Keep delegation prompt under 500 tokens
- Focus on actionable information
- Reference files instead of pasting content
