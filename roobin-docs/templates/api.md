# API: {Nome do Recurso}

## Base URL
`{base_url}`

## Autenticação
{Descrição do método de autenticação}

## Endpoints

### {METHOD} {/endpoint}

**Descrição**: {O que faz}

**Headers**:
| Header | Valor | Obrigatório |
|--------|-------|-------------|
| Authorization | Bearer {token} | Sim |

**Request Body**:
```json
{
  "campo": "tipo - descrição"
}
```

**Response 200**:
```json
{
  "campo": "valor"
}
```

**Response 400**:
```json
{
  "error": "mensagem"
}
```

**Exemplo cURL**:
```bash
curl -X {METHOD} "{base_url}{endpoint}" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"campo": "valor"}'
```

## Códigos de Erro

| Código | Significado |
|--------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

## Rate Limits
{Descrição dos limites}
