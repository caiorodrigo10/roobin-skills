# Create Research Prompt (Roobin MCP)

> Criar prompts de pesquisa estruturados e salvar no Roobin MCP

## Roobin MCP Integration

**Tools:**
- `mcp__roobin__search_documents` - Buscar contexto existente
- `mcp__roobin__manage_document` - Salvar research prompt

## When to Use

**Use este task quando:**
- Precisa de deep research sobre mercado/tecnologia
- Validação de hipóteses de produto
- Análise competitiva
- Pesquisa de usuário
- Exploração de opções estratégicas

## Research Focus Options

1. **Product Validation Research** - Validar hipóteses e market fit
2. **Market Opportunity Research** - Tamanho de mercado, crescimento
3. **User & Customer Research** - Personas, jobs-to-be-done
4. **Competitive Intelligence** - Análise de concorrentes
5. **Technology & Innovation** - Tendências, avaliação técnica
6. **Industry & Ecosystem** - Value chains, parceiros
7. **Strategic Options** - Direções estratégicas, business models
8. **Risk & Feasibility** - Riscos, viabilidade
9. **Custom Research** - Objetivos definidos pelo usuário

## Workflow

### 1. Gather Context

Buscar documentos existentes:
```
mcp__roobin__search_documents:
  project_id: "{project_id}"
  query: "prd OR brief OR architecture"
```

### 2. Select Research Focus

Perguntar ao usuário qual tipo de pesquisa:
- Apresentar opções numeradas
- Permitir seleção múltipla se necessário

### 3. Define Research Objectives

Colaborar com usuário para definir:
- [ ] Objetivo principal da pesquisa
- [ ] Decisões que a pesquisa vai informar
- [ ] Critérios de sucesso
- [ ] Constraints e limitações

### 4. Generate Research Prompt

```
mcp__roobin__manage_document:
  action: create
  project_id: "{project_id}"
  title: "Research Prompt: {research_title}"
  content: |
    ## Research Objective
    {clear statement of what this research aims to achieve}

    ## Background Context
    {relevant information from project brief, PRD, or other inputs}

    ## Research Questions

    ### Primary Questions (Must Answer)
    1. {specific, actionable question}
    2. {specific, actionable question}
    3. {specific, actionable question}

    ### Secondary Questions (Nice to Have)
    1. {supporting question}
    2. {supporting question}

    ## Research Methodology

    ### Information Sources
    - {specific source types and priorities}
    - {databases, reports, experts}

    ### Analysis Frameworks
    - {specific frameworks to apply}
    - {comparison criteria}

    ### Data Requirements
    - {quality, recency, credibility needs}

    ## Expected Deliverables

    ### Executive Summary
    - Key findings and insights
    - Critical implications
    - Recommended actions

    ### Detailed Analysis
    {specific sections needed based on research type}

    ### Supporting Materials
    - Data tables
    - Comparison matrices
    - Source documentation

    ## Success Criteria
    {how to evaluate if research achieved its objectives}

    ## Timeline and Priority
    {if applicable, any time constraints}
  type: "brief"
```

### 5. Review and Refine

Apresentar prompt completo ao usuário:
- [ ] Objetivos estão claros?
- [ ] Perguntas cobrem todas as preocupações?
- [ ] Escopo está apropriado?
- [ ] Output requirements são suficientes?

### 6. Execution Guidance

Após criar o prompt, orientar:

**Opções de execução:**
1. **AI Research Assistant** - Usar prompt com modelo de IA com capacidades de pesquisa
2. **Human Research** - Framework para pesquisa manual
3. **Hybrid** - Combinar AI e pesquisa humana

## Research Prompt Types by Focus

### Product Validation
- Hipóteses a testar
- Sinais de validação/invalidação
- Metrics de sucesso

### Market Opportunity
- TAM/SAM/SOM
- Segmentos de mercado
- Timing e maturidade

### Competitive Intelligence
- Competitors diretos e indiretos
- Feature comparison
- Positioning e pricing

### Technology Research
- Build vs Buy vs Partner
- Tech stack evaluation
- Emerging technologies

## Output

```
Research Prompt Created:

Document ID: {doc_id}
Title: Research Prompt: {title}
Type: brief

Research Focus: {selected_focus}
Primary Questions: {count}
Secondary Questions: {count}

Next Steps:
1. Review prompt no Roobin
2. Executar pesquisa (AI/Human/Hybrid)
3. Documentar findings em novo documento
```

## Success Criteria

- [ ] Research prompt salvo no Roobin MCP
- [ ] Objetivos claros e específicos
- [ ] Perguntas actionable
- [ ] Metodologia definida
- [ ] Deliverables especificados
- [ ] Nenhum arquivo .md local criado
