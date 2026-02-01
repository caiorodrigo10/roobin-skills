# Shard Document (Roobin MCP)

> Dividir documento grande em múltiplos documentos menores no Roobin MCP

## Roobin MCP Integration

**Tools:**
- `mcp__roobin__search_documents` - Buscar documento fonte
- `mcp__roobin__manage_document` - Criar documentos shardados

## When to Use

**Use este task quando:**
- PRD muito grande precisa ser dividido em seções
- Documento de arquitetura precisa ser modularizado
- Facilitar navegação e manutenção de documentos extensos

## Workflow

### 1. Load Source Document

```
mcp__roobin__search_documents:
  project_id: "{project_id}"
  query: "{document_title}"
```

### 2. Analyze Structure

Identificar seções de nível 2 (## headings) no documento:
- Cada ## heading se torna um documento separado
- Conteúdo até o próximo ## é incluído
- Preservar formatação, código, diagramas

### 3. Create Sharded Documents

Para cada seção:

```
mcp__roobin__manage_document:
  action: create
  project_id: "{project_id}"
  title: "{parent_title} - {section_title}"
  content: |
    # {section_title}

    {section_content}

    ---
    *Sharded from: {parent_document_title}*
  type: "{same_as_parent}"
```

### 4. Create Index Document

```
mcp__roobin__manage_document:
  action: create
  project_id: "{project_id}"
  title: "{parent_title} - Index"
  content: |
    # {parent_title}

    {original_introduction}

    ## Sections

    Este documento foi dividido nas seguintes partes:

    | Section | Document ID | Description |
    |---------|-------------|-------------|
    | {section_1} | {doc_id_1} | {brief_desc} |
    | {section_2} | {doc_id_2} | {brief_desc} |
    | {section_3} | {doc_id_3} | {brief_desc} |

    ---
    *Index document for sharded content*
  type: "{same_as_parent}"
```

### 5. Preserve Special Content

**Importante preservar:**
- Code blocks (```)
- Mermaid diagrams
- Tables
- Lists with nesting
- Inline code
- Links and references
- Template placeholders {{}}

### 6. Heading Level Adjustment

Ao criar shards:
- ## (level 2) → # (level 1)
- ### (level 3) → ## (level 2)
- #### (level 4) → ### (level 3)

## Output

```
Document Sharding Complete:

Source: {original_document_title}
Shards Created: {count}

Documents:
1. {section_1_title} - ID: {doc_id_1}
2. {section_2_title} - ID: {doc_id_2}
3. {section_3_title} - ID: {doc_id_3}

Index Document: {index_doc_id}

Todos os documentos foram salvos no Roobin MCP.
```

## Naming Convention

| Original Heading (PT) | Document Title (EN) |
|-----------------------|---------------------|
| Visão do Produto | Product Vision |
| Pilha Tecnológica | Tech Stack |
| Requisitos Funcionais | Functional Requirements |
| Arquitetura | Architecture |
| Estratégia de Testes | Testing Strategy |

## Success Criteria

- [ ] Documento fonte identificado no Roobin MCP
- [ ] Todas as seções extraídas corretamente
- [ ] Documentos shardados criados no Roobin MCP
- [ ] Index document criado com links
- [ ] Heading levels ajustados
- [ ] Conteúdo especial preservado (código, diagramas)
- [ ] Nenhum arquivo .md local criado
