# Create Brownfield Story (Roobin MCP)

> Criar story para projetos brownfield e salvar no Roobin MCP

## Roobin MCP Integration

**Tool:** `mcp__roobin__manage_tasks`

```yaml
action: create
project_id: "{project_id}"
title: "Story: {story_title}"
description: "{story_content}"
type: "story"
status: "backlog"
priority: "medium"
parent_id: "{epic_id}"  # opcional, se pertencer a um epic
```

## When to Use

**Use este task quando:**
- Projeto brownfield com documentação não-padrão
- Story precisa ser criada a partir de epic existente
- Contexto técnico precisa ser coletado do usuário
- Enhancement em sistema existente

**Use create-epic quando:**
- Precisa criar o epic primeiro
- Enhancement requer 2-3 stories coordenadas

## Workflow

### 1. Context Gathering

Buscar contexto no Roobin MCP:

```
mcp__roobin__search_documents:
  project_id: "{project_id}"
  query: "architecture OR prd OR technical"
```

```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  type: "epic"
  status: "backlog"
```

### 2. Gather Essential Information

**Perguntar ao usuário se não encontrado:**

- [ ] Qual funcionalidade existente pode ser afetada?
- [ ] Quais são os pontos de integração?
- [ ] Quais padrões seguir (com exemplos)?
- [ ] Quais constraints técnicas existem?
- [ ] Há "gotchas" ou workarounds conhecidos?

### 3. Create Story in Roobin MCP

```
mcp__roobin__manage_tasks:
  action: create
  project_id: "{project_id}"
  title: "Story: {Enhancement Title}"
  description: |
    ## User Story
    As a {user_type},
    I want {enhancement_capability},
    so that {value_delivered}.

    ## Context
    - Source: {documentation type used}
    - Enhancement Type: {feature/bugfix/integration}
    - Existing System Impact: {assessment}

    ## Acceptance Criteria
    1. {New functionality works as specified}
    2. Existing {affected feature} continues to work unchanged
    3. Integration with {existing system} maintains current behavior
    4. No regression in {related area}
    5. Performance remains within acceptable bounds

    ## Technical Guidance
    ### Existing System Context
    {extracted from documentation}

    ### Integration Approach
    {patterns to follow}

    ### Technical Constraints
    {constraints identified}

    ## Tasks
    - [ ] Analyze existing implementation
    - [ ] Implement new functionality
    - [ ] Verify existing functionality
    - [ ] Add tests

    ## Risk Assessment
    - Primary Risk: {main risk}
    - Mitigation: {how to address}
    - Rollback Plan: {how to undo}

    ## Risk Level
    {LOW|MEDIUM|HIGH}
  type: "story"
  status: "backlog"
  priority: "{low|medium|high}"
  parent_id: "{epic_id}"  # se aplicável
```

### 4. Risk-Based Quality Gates

**LOW RISK** (isolated bug fix, documentation):
- Pre-Commit review apenas

**MEDIUM RISK** (new feature, some integration):
- Pre-Commit + Pre-PR validation
- Integration tests required

**HIGH RISK** (core functionality, many integration points):
- Pre-Commit + Pre-PR + Pre-Deployment
- Feature flag recomendado
- Rollback procedure documentado
- Phased rollout strategy

### 5. Brownfield-Specific Considerations

**Database Changes:**
- Verificar compatibilidade com dados existentes
- Testar migration em cópia de produção
- RLS policies consistentes

**API Changes:**
- Backward compatibility obrigatória
- Contract versioning se breaking change
- Testes com clientes existentes

**UI Changes:**
- Design system compliance
- Accessibility preservation
- User workflow continuity

## Output

```
Story criada com sucesso:
- Story ID: {story_id}
- Title: {story_title}
- Parent Epic: {epic_id} (se aplicável)
- Risk Level: {risk_level}
- Status: backlog

Integration Points Identified:
- {point 1}
- {point 2}

Próximos passos:
1. Revisar story no Roobin
2. Ajustar se necessário
3. Iniciar implementação com roobin-dev
```

## Success Criteria

- [ ] Story criada no Roobin MCP com ID válido
- [ ] Acceptance criteria incluem verificação de funcionalidade existente
- [ ] Risk level definido
- [ ] Integration points documentados
- [ ] Rollback plan definido para MEDIUM/HIGH risk
- [ ] Nenhum arquivo .md local criado
