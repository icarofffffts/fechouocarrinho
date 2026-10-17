# Fechou o Carrinho — Especificação da API

API pública e Edge Functions do **Fechou o Carrinho**, hospedadas na VPS `185.111.156.178` (`/opt/supabase`, PostgreSQL 15 + PostgREST + Edge Functions Deno Runtime).

> **Atenção**: Todos os dados do app vivem no schema **`fechouocarrinho`** (não no `public`).  
> O PostgREST exige o header `Accept-Profile: fechouocarrinho` nas requisições `GET` e `Content-Profile: fechouocarrinho` nas requisições de escrita (`POST`, `PATCH`, `DELETE`). Sem esses headers, o PostgREST responderá pelo schema padrão retornando erro `404` (`PGRST205`).

---

## 1. Configuração e Autenticação

| Parâmetro | Valor |
| --- | --- |
| **Base URL** | `https://supabase.arxdevs.xyz` |
| **Schema PostgREST** | `fechouocarrinho` |
| **Anon Key (Pública - App Android)** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc4MzgxNzgyLCJleHAiOjIwOTM3NDE3ODJ9.K4fBz3HC_CoeNdUwWCvIsdo4I8Z5OmJJcSB5Pzx6Dfw` |
| **Studio Supabase** | `https://studio.supabase.arxdevs.xyz` |

### Cabeçalhos Padrão para Requisições

```http
apikey: <ANON_KEY>
Authorization: Bearer <ANON_KEY>
Accept-Profile: fechouocarrinho
Content-Profile: fechouocarrinho
Content-Type: application/json
```

---

## 2. Catálogo de Supermercados (`GET /rest/v1/supermarkets`)

Retorna a lista de supermercados cadastrados e verificados. O schema suporta pesquisa por estado (usando operadores de array do PostgREST).

### Headers Necessários
- `apikey: <ANON_KEY>`
- `Authorization: Bearer <ANON_KEY>`
- `Accept-Profile: fechouocarrinho`

### Exemplo de Requisição (Mercados de MG)

```bash
curl -s "https://supabase.arxdevs.xyz/rest/v1/supermarkets?select=id,slug,name,states,city,is_verified&states=cs.%7BMG%7D&order=slug.asc" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc4MzgxNzgyLCJleHAiOjIwOTM3NDE3ODJ9.K4fBz3HC_CoeNdUwWCvIsdo4I8Z5OmJJcSB5Pzx6Dfw" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc4MzgxNzgyLCJleHAiOjIwOTM3NDE3ODJ9.K4fBz3HC_CoeNdUwWCvIsdo4I8Z5OmJJcSB5Pzx6Dfw" \
  -H "Accept-Profile: fechouocarrinho"
```

### Exemplo de Resposta (HTTP 200 OK)

```json
[
  {
    "id": "11a4a983-a1b9-4d0e-825e-7b05d47c022c",
    "slug": "apoio-mineiro-mg",
    "name": "Apoio Mineiro",
    "states": ["MG"],
    "city": "Várias cidades • MG",
    "is_verified": true
  },
  {
    "id": "31ad0781-2839-4f86-b747-1617c3807c87",
    "slug": "bh-supermercados-mg",
    "name": "BH Supermercados",
    "states": ["MG"],
    "city": "Várias cidades • MG",
    "is_verified": true
  },
  {
    "id": "c7b1855e-1958-4199-a3fb-ca506aaf6d57",
    "slug": "carrefour-mg",
    "name": "Carrefour",
    "states": ["MG", "SP", "RJ"],
    "city": "Várias cidades • MG/SP/RJ",
    "is_verified": true
  },
  {
    "id": "2bceb784-571c-48a7-814d-2846b580c04a",
    "slug": "epa-mg",
    "name": "EPA Supermercados",
    "states": ["MG"],
    "city": "Várias cidades • MG",
    "is_verified": true
  },
  {
    "id": "1648e6ae-e82f-4829-b9b7-3e5974383593",
    "slug": "mart-minas-mg",
    "name": "Mart Minas",
    "states": ["MG"],
    "city": "Várias cidades • MG",
    "is_verified": true
  },
  {
    "id": "c290a45d-46e2-4ae8-aa23-fbc0eaf62021",
    "slug": "supernosso-mg",
    "name": "Supernosso",
    "states": ["MG"],
    "city": "Várias cidades • MG",
    "is_verified": true
  },
  {
    "id": "a8353209-d17f-4266-b370-d51e34028094",
    "slug": "verdemar-mg",
    "name": "Verdemar",
    "states": ["MG"],
    "city": "Várias cidades • MG",
    "is_verified": true
  }
]
```

### Filtros Adicionais Úteis
- **Mercados em MG ou SP**: `?states=ov.%7BMG,SP%7D` (overlap)
- **Busca por slug específico**: `?slug=eq.epa-mg`
- **Busca por nome (parcial)**: `?name=ilike.*supermercado*`

---

## 3. Registrar Preço (`POST /rest/v1/prices`)

Este endpoint permite registrar novos preços coletados (via OCR de cupom fiscal/etiqueta, inserção manual ou contribuição comunitária).

### Segurança e Validação por RLS (Row Level Security)
O PostgREST aceita submissões com a `ANON_KEY` pública do aplicativo, garantindo a integridade via regras estritas de banco de dados:
1. **Preço válido**: `price > 0` e `<= 99999.99`.
2. **Anti-escalonamento de privilégio**: `is_verified` é obrigatoriamente `false` no envio anônimo/comunitário. Apenas o `service_role` ou curadoria pode aprovar como verificado.
3. **Origem válida**: `source` deve ser um entre `ocr_scan`, `manual` ou `community`. O valor `scraped` é estritamente bloqueado para o cliente mobile/web (reservado ao pipeline oficial de scraping).
4. **Validação de EAN**: Se informado, o código deve possuir 8, 12, 13 ou 14 dígitos com dígito verificador módulo 10 (padrão GS1) válido.
5. **UF Brasileira**: `state` deve pertencer à lista canônica das 27 UFs brasileiras (ex: `MG`, `SP`, `RJ`).
6. **Autoria protegida**: `user_id` deve ser `null` para envio anônimo, ou corresponder ao `auth.uid()` do JWT do usuário autenticado.

### Campos do Payload

| Campo | Tipo | Obrigatório | Descrição / Regra |
| --- | --- | --- | --- |
| `price` | `number` | **Sim** | Valor do item (`> 0` e `<= 99999.99`). |
| `supermarket_id` | `UUID` | Recomendado | ID do supermercado (chave estrangeira para `supermarkets.id`). |
| `ean` | `string` | Opcional* | Código de barras (EAN-8, UPC-12, EAN-13 ou GTIN-14) com checksum válido. |
| `product_name` | `string` | Opcional* | Nome legível do produto (1 a 200 caracteres). *Informe ao menos `ean` ou `product_name`. |
| `state` | `string` | Recomendado | Sigla do estado com 2 caracteres (ex: `MG`). |
| `city` | `string` | Opcional | Nome do município (até 120 caracteres). |
| `source` | `string` | Não (default `manual`) | `ocr_scan`, `manual` ou `community`. |
| `scan_image_hash` | `string` | Opcional | Hash SHA-256 do recorte da imagem/cupom para deduplicação. |
| `is_verified` | `boolean` | Opcional | Sempre `false` (tentar enviar `true` resulta em `401 Unauthorized`). |
| `user_id` | `UUID` | Opcional | `null` ou o UID do JWT. |

### Exemplo de Requisição (POST)

```bash
curl -s -X POST "https://supabase.arxdevs.xyz/rest/v1/prices?select=id,price,product_name,ean,source,is_verified,created_at" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc4MzgxNzgyLCJleHAiOjIwOTM3NDE3ODJ9.K4fBz3HC_CoeNdUwWCvIsdo4I8Z5OmJJcSB5Pzx6Dfw" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc4MzgxNzgyLCJleHAiOjIwOTM3NDE3ODJ9.K4fBz3HC_CoeNdUwWCvIsdo4I8Z5OmJJcSB5Pzx6Dfw" \
  -H "Accept-Profile: fechouocarrinho" \
  -H "Content-Profile: fechouocarrinho" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "ean": "7891000315507",
    "product_name": "Leite Integral 1L",
    "price": 5.49,
    "state": "MG",
    "city": "Belo Horizonte",
    "source": "ocr_scan",
    "supermarket_id": "2bceb784-571c-48a7-814d-2846b580c04a",
    "scan_image_hash": "a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890"
  }'
```

### Exemplo de Resposta de Sucesso (HTTP 201 Created)

```json
[
  {
    "id": "e8e6fb1c-d7cf-4e59-8692-0de9517e0ef7",
    "price": 5.49,
    "product_name": "Leite Integral 1L",
    "ean": "7891000315507",
    "source": "ocr_scan",
    "is_verified": false,
    "created_at": "2026-10-17T21:44:11.839414+00:00"
  }
]
```

---

## 4. Consulta de Preços Registrados

### Últimos Preços por EAN e Estado (`GET /rest/v1/prices`)

```bash
curl -s "https://supabase.arxdevs.xyz/rest/v1/prices?ean=eq.7891000315507&state=eq.MG&select=id,price,product_name,supermarket_id,source,created_at&order=created_at.desc&limit=10" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc4MzgxNzgyLCJleHAiOjIwOTM3NDE3ODJ9.K4fBz3HC_CoeNdUwWCvIsdo4I8Z5OmJJcSB5Pzx6Dfw" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc4MzgxNzgyLCJleHAiOjIwOTM3NDE3ODJ9.K4fBz3HC_CoeNdUwWCvIsdo4I8Z5OmJJcSB5Pzx6Dfw" \
  -H "Accept-Profile: fechouocarrinho"
```

### View Agregada: Menor/Último Preço por Supermercado (`GET /rest/v1/latest_prices`)

A view `latest_prices` pré-agrega os dados por `(ean, supermarket_id)` com `security_invoker = true`:

```bash
curl -s "https://supabase.arxdevs.xyz/rest/v1/latest_prices?ean=eq.7891000315507&select=ean,product_name,price,supermarket_slug,supermarket_name,state,created_at" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc4MzgxNzgyLCJleHAiOjIwOTM3NDE3ODJ9.K4fBz3HC_CoeNdUwWCvIsdo4I8Z5OmJJcSB5Pzx6Dfw" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc4MzgxNzgyLCJleHAiOjIwOTM3NDE3ODJ9.K4fBz3HC_CoeNdUwWCvIsdo4I8Z5OmJJcSB5Pzx6Dfw" \
  -H "Accept-Profile: fechouocarrinho"
```

---

## 5. Rota Confiável com IA / Estatística (`POST /functions/v1/validate-price`)

Além da gravação direta no banco via PostgREST, o backend fornece uma **Edge Function** que executa detecção de anomalias estatísticas (outlier detection) contra a mediana histórica de preços, deduplicação de fotos de cupom e validação de código de barras.

### Requisição com gravação automática (`commit: true`)

```bash
curl -s -X POST "https://supabase.arxdevs.xyz/functions/v1/validate-price" \
  -H "Content-Type: application/json" \
  -d '{
    "ean": "7891000315507",
    "product_name": "Leite Integral 1L",
    "price": 5.79,
    "supermarket": "epa-mg",
    "state": "MG",
    "city": "Belo Horizonte",
    "source": "ocr_scan",
    "scan_image_hash": "b2c3d4e5...",
    "commit": true
  }'
```

### Resposta

```json
{
  "ok": true,
  "verdict": "accept",
  "score": 1,
  "reasons": [],
  "stats": { "samples": 14, "median": 5.49, "min": 4.99, "max": 6.2 },
  "normalized": {
    "ean": "7891000315507",
    "price": 5.79,
    "source": "ocr_scan",
    "is_verified": false
  },
  "committed": true,
  "price": {
    "id": "c1f7a83d-3b99-4c22-b5e1-0c58e8e7a022",
    "created_at": "2026-10-17T21:44:15.123456+00:00"
  }
}
```

---

## 6. Tabela de Códigos e Erros

| HTTP Status | Código Postgres / PostgREST | Motivo |
| --- | --- | --- |
| **200 OK** | - | Leitura bem-sucedida ou dry-run aceito |
| **201 Created** | - | Inserção de preço realizada com sucesso |
| **400 Bad Request** | `23514` (Check Violation) | Violação de constraint (preço <= 0, UF inválida, EAN malformado) |
| **401 / 403 Forbidden** | `42501` (Insufficient Privilege) | Tentativa de auto-aprovação (`is_verified: true`), fonte não permitida ou tabela restrita |
| **404 Not Found** | `PGRST205` | Falta do header `Accept-Profile: fechouocarrinho` ou supermercado não encontrado |
| **409 Conflict** | - | Foto de cupom já enviada nas últimas 24h (`duplicate_scan`) |
