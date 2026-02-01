# Delegation Prompt Template

## Formato de Delegação com Comandos Imperativos

Use este template ao delegar para skills Roobin via Task tool. **Sempre use comandos imperativos.**

```markdown
Leia ~/.claude/skills/{skill-name}/SKILL.md e siga as instruções.

## Comando
{VERBO IMPERATIVO}: {descrição específica da ação}

## Identificadores
- Task/Subtask ID: {id}
- Project ID: {project_id}

## Contexto
- Arquivos relevantes: {file_paths}
- Padrões a seguir: {existing_patterns}
- Dependências: {dependencies}

## Critérios de Sucesso
- [ ] {criterion_1}
- [ ] {criterion_2}

## Ao Finalizar
- Atualize o status da task via manage_tasks para "{next_status}"
- Retorne resumo das mudanças
- Liste arquivos criados/modificados
```

## Verbos Imperativos por Skill

| Skill | Verbos | Exemplo |
|-------|--------|---------|
| `roobin-planner` | Crie, Planeje, Defina | "Crie plano de implementação para X" |
| `roobin-dev` | Implemente, Corrija, Refatore | "Implemente o componente Y" |
| `roobin-reviewer` | Revise, Analise, Avalie | "Revise os arquivos modificados" |
| `roobin-ops` | Execute, Publique, Crie | "Execute pre-push e crie PR" |
| `roobin-pm` | Crie, Priorize, Valide | "Crie PRD para a feature Z" |

## Templates por Skill

### roobin-planner

```markdown
Leia ~/.claude/skills/roobin-planner/SKILL.md e siga as instruções.

## Comando
Crie plano de implementação para: {task_description}

## Projeto
- Project ID: {project_id}
- Task ID: {task_id} (se existente)

## Requisitos
{requirements_summary}

## Output Esperado
- Plano estruturado com subtasks
- Subtasks criadas no Roobin MCP via manage_tasks
- Análise de dependências entre subtasks
- Estimativa de complexidade por subtask

## Ao Finalizar
- Mova a task principal para status "planned"
- Retorne lista de subtask IDs criadas
```

### roobin-dev

```markdown
Leia ~/.claude/skills/roobin-dev/SKILL.md e siga as instruções.

## Comando
Implemente: {subtask_description}

## Identificadores
- Subtask ID: {subtask_id}
- Parent Task ID: {parent_task_id}
- Project ID: {project_id}

## Contexto
- Arquivos a modificar: {files_to_modify}
- Arquivos de referência: {reference_files}
- Padrões existentes: {patterns}

## Detalhes Técnicos
{technical_requirements}

## Critérios de Sucesso
- [ ] {functional_criterion}
- [ ] Código segue padrões do projeto
- [ ] Sem erros de TypeScript (pnpm check:types)
- [ ] Sem erros de lint (pnpm lint)

## Ao Finalizar
- Mova a subtask para status "ai-review"
- Retorne lista de arquivos modificados
- Inclua resumo das mudanças
```

### roobin-reviewer

```markdown
Leia ~/.claude/skills/roobin-reviewer/SKILL.md e siga as instruções.

## Comando
Revise o código da task: {task_id}

## Escopo
- Arquivos modificados: {modified_files}
- Tipo de mudança: {change_type} (feature/bugfix/refactor)

## Critérios de Review
- Qualidade do código
- Segurança (OWASP top 10)
- Performance
- Manutenibilidade
- Aderência aos padrões do projeto

## Output Esperado
- Score 0-100
- Lista de issues encontradas (se houver)
- Sugestões de melhoria

## Após Review
- Se score >= 90: mova para "done"
- Se score 50-89: crie fix-request, mantenha em "ai-review"
- Se score < 50: mova para "human-review"
```

### roobin-ops

```markdown
Leia ~/.claude/skills/roobin-ops/SKILL.md e siga as instruções.

## Comando
Execute pre-push e crie PR para: {feature_name}

## Mudanças
- Task ID: {task_id}
- Arquivos modificados: {modified_files}
- Descrição: {change_description}

## Pre-Push Checklist
- [ ] pnpm check:types passa
- [ ] pnpm lint passa
- [ ] pnpm build passa
- [ ] Testes passam (se aplicável)

## Detalhes do PR
- Branch: {branch_name}
- Base: {base_branch}
- Title: {pr_title}

## Ao Finalizar
- Retorne URL do PR criado
- Confirme que push foi bem sucedido
```

## Regras de Contexto

### Sempre Incluir
1. **Comando para ler SKILL.md** - caminho completo
2. **Verbo imperativo** - ação clara e específica
3. **Identificação da task** - ID ou descrição completa
4. **Arquivos relevantes** - o que ler/modificar
5. **Critérios de sucesso** - como saber quando terminou
6. **Próximo status** - qual status definir ao completar

### Nunca Incluir
1. Histórico completo da conversa
2. Múltiplas tasks não relacionadas
3. Instruções vagas ("melhore isso")
4. Suposições sobre o que o subagent sabe

### Budget de Tokens
- Mantenha o prompt de delegação abaixo de 500 tokens
- Foque em informação acionável
- Referencie arquivos ao invés de colar conteúdo
