# Execute Checklist (Roobin MCP)

> Executar checklists de validação usando dados do Roobin MCP

## Roobin MCP Integration

**Tools:**
- `mcp__roobin__search_documents` - Buscar documentos para validar
- `mcp__roobin__search_tasks` - Buscar tasks relacionadas
- `mcp__roobin__create_comment` - Registrar resultados da validação

## When to Use

**Use este task quando:**
- PRD precisa ser validado contra PM checklist
- Story precisa ser validada contra PO checklist
- Mudança de requisitos requer change checklist
- Validação formal antes de prosseguir com implementação

## Available Checklists

Checklists disponíveis em `./checklists/`:
- `pm-checklist.md` - PM Requirements Checklist
- `po-master-checklist.md` - PO Master Validation Checklist
- `change-checklist.md` - Change Navigation Checklist

## Execution Modes

### 1. YOLO Mode (Recomendado para checklists)
- Processa todas as seções de uma vez
- Gera relatório consolidado
- Apresenta summary ao final

### 2. Interactive Mode
- Section by section
- Discussão de findings em cada seção
- Mais demorado, mas mais educativo

## Workflow

### 1. Select Checklist

Se não especificado, perguntar ao usuário:
```
Available checklists:
1. pm-checklist - Para validar PRDs
2. po-master-checklist - Para validar stories
3. change-checklist - Para navegar mudanças
```

### 2. Gather Documents from Roobin MCP

```
mcp__roobin__search_documents:
  project_id: "{project_id}"
  query: "{relevant_query}"  # prd, architecture, etc.
```

### 3. Gather Related Tasks

```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  type: "{epic|story}"
```

### 4. Process Checklist

Para cada item do checklist:

1. **Ler e entender** o requisito
2. **Buscar evidência** nos documentos/tasks
3. **Marcar status:**
   - ✅ PASS: Requirement clearly met
   - ❌ FAIL: Requirement not met
   - ⚠️ PARTIAL: Some aspects covered but needs improvement
   - N/A: Not applicable

### 5. Generate Validation Report

```markdown
# Checklist Validation Report

## Checklist: {checklist_name}
## Date: {date}

## Summary
- Total Items: {total}
- ✅ PASS: {pass_count} ({pass_percent}%)
- ❌ FAIL: {fail_count} ({fail_percent}%)
- ⚠️ PARTIAL: {partial_count} ({partial_percent}%)
- N/A: {na_count}

## Results by Section

### Section 1: {section_name}
| Item | Status | Notes |
|------|--------|-------|
| {item} | ✅/❌/⚠️ | {notes} |

### Section 2: {section_name}
...

## Failed Items (Must Fix)
1. {failed_item_1}: {reason}
2. {failed_item_2}: {reason}

## Partial Items (Should Improve)
1. {partial_item_1}: {recommendation}

## Recommendations
- {recommendation_1}
- {recommendation_2}

## Final Assessment
- **Status:** PASS / FAIL
- **Confidence:** High/Medium/Low
```

### 6. Register Results (Optional)

Se validando uma task específica:
```
mcp__roobin__create_comment:
  task_id: "{task_id}"
  content: |
    ## Checklist Validation: {checklist_name}

    **Status:** {PASS|FAIL}
    **Date:** {date}

    ### Summary
    - PASS: {pass_count}/{total}
    - FAIL: {fail_count}
    - PARTIAL: {partial_count}

    ### Issues Found
    {list of issues}

    ### Next Steps
    {recommendations}
```

## Checklist-Specific Guidelines

### PM Checklist (pm-checklist.md)
- Usado para validar PRDs
- Foca em completude de requisitos
- Verifica alinhamento estratégico

### PO Master Checklist (po-master-checklist.md)
- Usado para validar stories
- Verifica acceptance criteria
- Confirma readiness para desenvolvimento

### Change Checklist (change-checklist.md)
- Usado quando há mudança de requisitos
- Avalia impacto em epics/stories
- Guia decisão de path forward

## Output

```
Checklist Validation Complete:

Checklist: {name}
Status: {PASS|FAIL}

Summary:
- ✅ PASS: {count}/{total}
- ❌ FAIL: {count}
- ⚠️ PARTIAL: {count}

{if FAIL}
Critical Issues:
- {issue_1}
- {issue_2}

Ações necessárias:
- {action_1}
- {action_2}

{if PASS}
Validação completa. Pode prosseguir.
```

## Success Criteria

- [ ] Checklist processado completamente
- [ ] Todos os items avaliados com status
- [ ] Relatório de validação gerado
- [ ] Issues críticas identificadas (se houver)
- [ ] Resultados registrados no Roobin MCP (se aplicável)
