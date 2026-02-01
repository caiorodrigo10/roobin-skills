# Create Document (Roobin MCP)

> Criar documentos (PRD, specs, briefs) e salvar no Roobin MCP

## Roobin MCP Integration

**Tool:** `mcp__roobin__manage_document`

```yaml
action: create
project_id: "{project_id}"
title: "{document_title}"
content: "{markdown_content}"
type: "prd|spec|brief|architecture|other"
```

## Execution Modes

1. **YOLO Mode** - Processo autônomo, mínima interação
2. **Interactive Mode** [DEFAULT] - Checkpoints de decisão, elicitação
3. **Pre-Flight** - Planejamento completo antes de executar

## Workflow

### 1. Template Selection

Listar templates disponíveis em `./templates/`:
- `prd-tmpl.yaml` - Product Requirements Document
- `brownfield-prd-tmpl.yaml` - PRD para projetos existentes
- `story-tmpl.yaml` - User Story
- `project-brief-tmpl.yaml` - Project Brief

Perguntar ao usuário qual template usar se não especificado.

### 2. Template Processing

Para cada seção do template YAML:

1. **Ler instrução** da seção
2. **Gerar conteúdo** seguindo a instrução
3. **Se `elicit: true`:**
   - Apresentar conteúdo + rationale
   - Oferecer opções 1-9:
     - 1: Prosseguir para próxima seção
     - 2-9: Métodos de elicitação (questionar, expandir, simplificar, etc.)
   - AGUARDAR resposta do usuário
4. **Continuar** até completar todas as seções

### 3. Save to Roobin MCP

Ao finalizar documento:

```
mcp__roobin__manage_document:
  action: create
  project_id: "{project_id}"
  title: "{nome_do_documento}"
  content: "{conteudo_markdown_completo}"
  type: "prd"  # ou spec, brief, etc.
```

**Confirmar criação** mostrando:
- Document ID retornado
- Título
- Tipo
- Preview das primeiras linhas

### 4. Search Existing Documents

Antes de criar, verificar se já existe:

```
mcp__roobin__search_documents:
  project_id: "{project_id}"
  query: "{nome_similar}"
```

Se existir documento similar, perguntar ao usuário:
- Atualizar documento existente
- Criar novo documento

### 5. Update Existing Document

Para atualizar:

```
mcp__roobin__manage_document:
  action: update
  document_id: "{id_do_documento}"
  content: "{novo_conteudo}"
```

## Elicitation Methods

Quando usuário escolhe opção 2-9:

| Opção | Método | Ação |
|-------|--------|------|
| 2 | Challenge | Questionar premissas do conteúdo |
| 3 | Expand | Adicionar mais detalhes |
| 4 | Simplify | Reduzir complexidade |
| 5 | Examples | Adicionar exemplos concretos |
| 6 | Risks | Identificar riscos e mitigações |
| 7 | Alternatives | Explorar alternativas |
| 8 | Dependencies | Mapear dependências |
| 9 | User Perspective | Reescrever do ponto de vista do usuário |

## Output

- **Documento salvo** no Roobin MCP
- **Document ID** para referência futura
- **Não criar arquivos .md locais** - tudo via MCP

## Success Criteria

- [ ] Template processado completamente
- [ ] Todas as seções com `elicit: true` tiveram interação do usuário
- [ ] Documento salvo no Roobin MCP com sucesso
- [ ] Document ID retornado e comunicado ao usuário
