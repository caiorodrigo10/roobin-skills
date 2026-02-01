# Change Navigation Checklist

**Purpose:** To systematically guide the analysis and planning required when a significant change (pivot, tech issue, missing requirement, failed story) is identified during the workflow.

## Roobin MCP Integration

**Tools necessários:**
- `mcp__roobin__search_tasks` - Buscar epics/stories afetadas
- `mcp__roobin__search_documents` - Buscar PRD, architecture docs
- `mcp__roobin__manage_tasks` - Atualizar tasks afetadas
- `mcp__roobin__manage_document` - Criar change proposal

```yaml
# Buscar tasks afetadas
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  query: "{affected_area}"

# Buscar documentos de referência
mcp__roobin__search_documents:
  project_id: "{project_id}"
  query: "prd OR architecture"
```

## Initialization Instructions

**Este checklist é para MUDANÇAS SIGNIFICATIVAS que afetam a direção do projeto.**

Ajustes menores dentro de uma story não requerem este processo.

**Contexto necessário:**
- A story ou issue que disparou a mudança
- Estado atual do projeto (stories completas, epic atual)
- Acesso a PRD, architecture via Roobin MCP
- Entendimento do trabalho planejado restante

**APPROACH:**
Processo interativo com o usuário. Trabalhar cada seção juntos, discutindo implicações e opções. O usuário toma as decisões finais, mas forneça orientação expert sobre viabilidade técnica e impacto.

---

## 1. Understand the Trigger & Context

Buscar contexto no Roobin MCP:
```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  task_id: "{triggering_story_id}"
```

- [ ] **Identify Triggering Story:** Clearly identify the story (or stories) that revealed the issue
- [ ] **Define the Issue:** Articulate the core problem precisely
  - [ ] Is it a technical limitation/dead-end?
  - [ ] Is it a newly discovered requirement?
  - [ ] Is it a fundamental misunderstanding of existing requirements?
  - [ ] Is it a necessary pivot based on feedback or new information?
  - [ ] Is it a failed/abandoned story needing a new approach?
- [ ] **Assess Initial Impact:** Describe the immediate observed consequences
- [ ] **Gather Evidence:** Note any specific logs, error messages, user feedback

## 2. Epic Impact Assessment

Buscar epics relacionados:
```
mcp__roobin__search_tasks:
  project_id: "{project_id}"
  type: "epic"
```

- [ ] **Analyze Current Epic:**
  - [ ] Can the current epic containing the trigger story still be completed?
  - [ ] Does the current epic need modification (story changes, additions, removals)?
  - [ ] Should the current epic be abandoned or fundamentally redefined?
- [ ] **Analyze Future Epics:**
  - [ ] Review all remaining planned epics
  - [ ] Does the issue require changes to planned stories in future epics?
  - [ ] Does the issue invalidate any future epics?
  - [ ] Does the issue necessitate the creation of entirely new epics?
  - [ ] Should the order/priority of future epics be changed?
- [ ] **Summarize Epic Impact:** Briefly document the overall effect on the project's epic structure and flow

## 3. Artifact Conflict & Impact Analysis

Buscar documentos:
```
mcp__roobin__search_documents:
  project_id: "{project_id}"
  query: "prd OR architecture"
```

- [ ] **Review PRD:**
  - [ ] Does the issue conflict with the core goals or requirements stated in the PRD?
  - [ ] Does the PRD need clarification or updates based on the new understanding?
- [ ] **Review Architecture Document:**
  - [ ] Does the issue conflict with the documented architecture?
  - [ ] Are specific components/diagrams/sections impacted?
  - [ ] Does the technology list need updating?
  - [ ] Do data models or schemas need revision?
  - [ ] Are external API integrations affected?
- [ ] **Review Frontend Spec (if applicable):**
  - [ ] Does the issue conflict with the FE architecture, component library choice, or UI/UX design?
  - [ ] Are specific FE components or user flows impacted?
- [ ] **Summarize Artifact Impact:** List all artifacts requiring updates and the nature of the changes needed

## 4. Path Forward Evaluation

- [ ] **Option 1: Direct Adjustment / Integration:**
  - [ ] Can the issue be addressed by modifying/adding future stories within the existing plan?
  - [ ] Define the scope and nature of these adjustments
  - [ ] Assess feasibility, effort, and risks of this path
- [ ] **Option 2: Potential Rollback:**
  - [ ] Would reverting completed stories significantly simplify addressing the issue?
  - [ ] Identify specific stories/commits to consider for rollback
  - [ ] Assess the effort required for rollback
  - [ ] Assess the impact of rollback (lost work, data implications)
  - [ ] Compare the net benefit/cost vs. Direct Adjustment
- [ ] **Option 3: PRD MVP Review & Potential Re-scoping:**
  - [ ] Is the original PRD MVP still achievable given the issue and constraints?
  - [ ] Does the MVP scope need reduction (removing features/epics)?
  - [ ] Do the core MVP goals need modification?
  - [ ] Are alternative approaches needed to meet the original MVP intent?
  - [ ] **Extreme Case:** Does the issue necessitate a fundamental replan or potentially a new PRD V2?
- [ ] **Select Recommended Path:** Based on the evaluation, agree on the most viable path forward

## 5. Sprint Change Proposal Components

Criar change proposal no Roobin MCP:
```
mcp__roobin__manage_document:
  action: create
  project_id: "{project_id}"
  title: "Change Proposal: {change_title}"
  content: "{proposal_content}"
  type: "spec"
```

- [ ] **Identified Issue Summary:** Clear, concise problem statement
- [ ] **Epic Impact Summary:** How epics are affected
- [ ] **Artifact Adjustment Needs:** List of documents to change
- [ ] **Recommended Path Forward:** Chosen solution with rationale
- [ ] **PRD MVP Impact:** Changes to scope/goals (if any)
- [ ] **High-Level Action Plan:** Next steps for stories/updates
- [ ] **Agent Handoff Plan:** Identify roles needed (PM, Arch, Design Arch, PO)

## 6. Final Review & Handoff

Atualizar tasks afetadas:
```
mcp__roobin__manage_tasks:
  action: update
  task_id: "{task_id}"
  status: "{new_status}"
  description: "{updated_description}"
```

- [ ] **Review Checklist:** Confirm all relevant items were discussed
- [ ] **Review Sprint Change Proposal:** Ensure it accurately reflects the discussion and decisions
- [ ] **User Approval:** Obtain explicit user approval for the proposal
- [ ] **Confirm Next Steps:** Reiterate the handoff plan and the next actions to be taken

---

## Output Summary

Após completar o checklist, fornecer resumo:

```
Change Navigation Complete:

Issue: {description}
Recommended Path: {path}

Affected Items:
- Epics: {count}
- Stories: {count}
- Documents: {count}

Change Proposal Created:
- Document ID: {doc_id}

Next Steps:
1. {action_1}
2. {action_2}
3. {action_3}
```
