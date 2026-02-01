# Validate Story (Roobin MCP)

> Validar qualidade de story antes da implementação

## Roobin MCP Integration

**Tools:**
- `mcp__roobin__search_tasks` - Buscar story para validar
- `mcp__roobin__manage_tasks` - Atualizar story após validação
- `mcp__roobin__search_documents` - Buscar documentos de referência

## When to Use

**Use este task quando:**
- Story draft precisa ser validada antes da implementação
- Verificar se story está completa e pronta para desenvolvimento
- Garantir que acceptance criteria são claros e testáveis
- Validar alinhamento com epic e arquitetura

## Workflow

### 1. Load Story from Roobin MCP

```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  task_id: "{story_id}"
```

### 2. Load Reference Documents

```
mcp__roobin__search_documents:
  project_id: "{project_id}"
  query: "architecture OR prd"
```

### 3. Validation Checklist

#### Template Completeness
- [ ] User Story format presente (As a / I want / So that)
- [ ] Acceptance Criteria definidos (mínimo 3)
- [ ] Technical Notes presentes
- [ ] Risk Level definido (LOW/MEDIUM/HIGH)
- [ ] Tasks listadas

#### Clarity & Actionability
- [ ] Requisitos são claros e não ambíguos
- [ ] Acceptance criteria são testáveis
- [ ] Tasks são actionable
- [ ] Dependências estão documentadas

#### Architecture Alignment
- [ ] Story alinha com arquitetura do projeto
- [ ] Padrões existentes são referenciados
- [ ] Integration points estão claros

#### Anti-Hallucination Check
- [ ] Todas as claims técnicas são verificáveis
- [ ] Referências a documentos são válidas
- [ ] Nenhum detalhe inventado

### 4. Generate Validation Report

```markdown
# Story Validation Report

## Story: {story_title}
**ID:** {story_id}
**Epic:** {parent_epic}

## Validation Results

### Template Compliance
| Check | Status | Notes |
|-------|--------|-------|
| User Story Format | ✅/❌ | {notes} |
| Acceptance Criteria | ✅/❌ | {notes} |
| Technical Notes | ✅/❌ | {notes} |
| Risk Level | ✅/❌ | {notes} |

### Critical Issues (Must Fix)
{list of critical issues}

### Should-Fix Issues
{list of important improvements}

### Nice-to-Have
{optional enhancements}

## Final Assessment
- **Status:** GO / NO-GO
- **Readiness Score:** {1-10}
- **Confidence Level:** High/Medium/Low
```

### 5. Update Story Status (if approved)

Se validação passar:
```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{story_id}"
  status: "planned"
```

Se validação falhar, adicionar comentário:
```
mcp__roobin__create_comment:
  task_id: "{story_id}"
  content: |
    ## Validation Failed

    Issues encontradas:
    - {issue_1}
    - {issue_2}

    Ações necessárias:
    - {action_1}
    - {action_2}
```

## Validation Criteria by Risk Level

### LOW RISK Stories
- Basic template compliance
- Clear acceptance criteria
- Simple validation

### MEDIUM RISK Stories
- Full template compliance
- Integration points documented
- Technical notes complete
- Rollback plan defined

### HIGH RISK Stories
- All MEDIUM requirements
- Architecture alignment verified
- Feature flag strategy
- Comprehensive rollback plan
- Performance considerations

## Output

```
Story Validation Complete:
- Story ID: {story_id}
- Title: {story_title}
- Status: {GO|NO-GO}
- Readiness Score: {score}/10

{if GO}
Story está pronta para implementação.
Status atualizado para: planned

{if NO-GO}
Issues encontradas: {count}
- Critical: {critical_count}
- Should-Fix: {should_fix_count}

Ações necessárias antes de prosseguir:
{list of actions}
```

## Success Criteria

- [ ] Story validada contra checklist completo
- [ ] Validation report gerado
- [ ] Issues críticas identificadas (se houver)
- [ ] Status atualizado no Roobin MCP (se aprovada)
- [ ] Nenhum arquivo .md local criado
