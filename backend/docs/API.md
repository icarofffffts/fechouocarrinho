# Fechou o Carrinho — API pública

Backend self-hosted na VPS `185.111.156.178` (`/opt/supabase`, Postgres 15 + PostgREST + Edge Functions).
Todos os dados de negócio vivem no schema **`fechouocarrinho`** — não no `public`.

| Item | Valor |
| --- | --- |
| Base URL | `https://supabase.arxdevs.xyz` |
| Schema PostgREST | `fechouocarrinho` |
| anon key (pública, vai no APK) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc4MzgxNzgyLCJleHAiOjIwOTM3NDE3ODJ9.K4fBz3HC_CoeNdUwWCvIsdo4I8Z5OmJJcSB5Pzx6Dfw` |
| Studio | `https://studio.supabase.arxdevs.xyz` |

`PGRST_DB_SCHEMAS=aurorakids,public,storage,automations,convites,arxdevs,shield,aegis,store,fechouocarrinho`
→ confirmado no container `supabase-rest`. Sem `Accept-Profile: fechouocarrinho` o PostgREST responde pelo schema `public` e **não enxerga** nossas tabelas (404).

---

## 1. Cabeçalhos obrigatórios

```http
apikey: <anon key>
Authorization: Bearer <anon key>
Accept-Profile: fechouocarrinho      # leitura (GET)
Content-Profile: fechouocarrinho     # escrita (POST/PATCH/DELETE/PUT)
Content-Type: application/json
Prefer: return=representation        # opcional: devolve a linha gravada
```

Erros comuns:

| HTTP | `code` | Significado |
| --- | --- | --- |
| 401/403 | `42501` | RLS/policy bloqueou a operação (ex.: `is_verified=true` no INSERT) |
| 400 | `23514` | constraint do banco (ex.: `price <= 0`, EAN fora do formato) |
| 404 | `PGRST205` | tabela/view não existe no schema do `Accept-Profile` |
| 406 | `PGRST106` | schema do `Accept-Profile` não está em `PGRST_DB_SCHEMAS` |

Limite de linhas por resposta: `PGRST_DB_MAX_ROWS=1000` (use `limit` + `offset`).

---

## 2. `GET /rest/v1/supermarkets` — catálogo de mercados

Mercados que declararam atuar em Minas Gerais (operador de array `cs` = *contains*):

```bash
curl -s 'https://supabase.arxdevs.xyz/rest/v1/supermarkets?states=cs.%7BMG%7D&select=slug,name,states,city,is_verified&order=slug.asc' \
  -H 'apikey: $ANON' -H 'Authorization: Bearer $ANON' \
  -H 'Accept-Profile: fechouocarrinho' | jq
```

```json
[
  { "slug": "apoio-mineiro-mg", "name": "Apoio Mineiro", "states": ["MG"], "city": "Várias cidades • MG", "is_verified": true },
  { "slug": "bh-supermercados-mg", "name": "BH Supermercados", "states": ["MG"], "city": "Várias cidades • MG", "is_verified": true },
  { "slug": "carrefour-mg", "name": "Carrefour", "states": ["MG","SP","RJ"], "city": "Várias cidades • MG/SP/RJ", "is_verified": true },
  { "slug": "epa-mg", "name": "EPA Supermercados", "states": ["MG"], "city": "Várias cidades • MG", "is_verified": true },
  { "slug": "mart-minas-mg", "name": "Mart Minas", "states": ["MG"], "city": "Várias cidades • MG", "is_verified": true },
  { "slug": "supernosso-mg", "name": "Supernosso", "states": ["MG"], "city": "Várias cidades • MG", "is_verified": true },
  { "slug": "verdemar-mg", "name": "Verdemar", "states": ["MG"], "city": "Várias cidades • MG", "is_verified": true }
]
```

Outros filtros úteis (sintaxe PostgREST):

| Objetivo | Query |
| --- | --- |
| Mercados de MG **ou** SP | `?states=ov.%7BMG,SP%7D` |
| Buscar por nome | `?name=ilike.*minsa*` |
| Por slug | `?slug=eq.epa-mg` |
| Apenas verificados | `?is_verified=is.true` |

---

## 3. `POST /rest/v1/prices` — registrar preço (caminho anônimo rápido)

O app Android grava direto no PostgREST com a anon key. O RLS garante integridade
sem exigir login — mas **não** deixamos auto-verificar, forjar autoria, usar
`source=scraped` nem gravar UF/EAN inválidos.

```bash
curl -s -X POST 'https://supabase.arxdevs.xyz/rest/v1/prices?select=id,price,source,is_verified,created_at' \
  -H 'apikey: $ANON' -H 'Authorization: Bearer $ANON' \
  -H 'Accept-Profile: fechouocarrinho' -H 'Content-Profile: fechouocarrinho' \
  -H 'Content-Type: application/json' -H 'Prefer: return=representation' \
  -d '{
        "ean": "7891000315507",
        "product_name": "Leite Integral 1L",
        "price": 5.49,
        "state": "MG",
        "city": "Belo Horizonte",
        "source": "ocr_scan",
        "supermarket_id": "b0d1c2ea-....",
        "scan_image_hash": "sha256-do-recorte-da-nota"
      }' | jq
```

Campos:

| Campo | Obrigatório | Regra |
| --- | --- | --- |
| `price` | sim | `> 0` e `<= 99999.99` |
| `source` | não (default `manual`) | `ocr_scan` \| `manual` \| `community` (`scraped` é reservado ao pipeline oficial) |
| `ean` | não* | 8/12/13/14 dígitos, format válido e dígito verificador mod-10 GS1 |
| `product_name` | não* | 1..200 caracteres (*informe ao menos `ean` ou `product_name`) |
| `state` | não | uma das 27 UFs |
| `supermarket_id` | recomendado | UUID de `supermarkets` |
| `city` | não | ≤ 120 caracteres |
| `scan_image_hash` | não | ≤ 128 chars; deduplica o mesmo cupom |
| `is_verified` | não | **sempre `false`** para anon/authenticated |
| `user_id` | não | `null` ou o próprio `auth.uid()` do JWT |

`PATCH`/`DELETE /rest/v1/prices?id=eq.<uuid>` só funcionam com JWT e apenas nas
próprias linhas (`user_id = auth.uid()`).

### Consultas de leitura

```bash
# últimos preços de um EAN em MG
curl -s 'https://supabase.arxdevs.xyz/rest/v1/prices?ean=eq.7891000315507&state=eq.MG&select=price,created_at,supermarket_id&order=created_at.desc&limit=20' ...
# último preço por EAN+mercado (view pré-agregada)
curl -s 'https://supabase.arxdevs.xyz/rest/v1/latest_prices?ean=eq.7891000315507&select=*' ...
```

---

## 4. `POST /functions/v1/validate-price` — validação de preços

Caminho **confiável**: além das regras do RLS, valida dígito verificador,
deduplica a foto, compara com o histórico (outlier) e grava com `service_role`
quando `commit: true`.

```bash
curl -s -X POST 'https://supabase.arxdevs.xyz/functions/v1/validate-price' \
  -H 'Content-Type: application/json' \
  -d '{
        "ean": "7891000315507",
        "product_name": "Leite Integral 1L",
        "price": 5.79,
        "supermarket": "epa-mg",
        "state": "MG",
        "city": "Belo Horizonte",
        "source": "ocr_scan",
        "scan_image_hash": "sha256-...",
        "commit": true
      }' | jq
```

```json
{
  "ok": true,
  "verdict": "accept",
  "score": 1,
  "reasons": [],
  "stats": { "samples": 12, "median": 5.49, "min": 4.99, "max": 6.2 },
  "normalized": { "ean": "7891000315507", "price": 5.79, "source": "ocr_scan", "is_verified": false },
  "committed": true,
  "price": { "id": "…", "created_at": "…" }
}
```

| `verdict` | Quando |
| --- | --- |
| `accept` | dentro da faixa histórica (0,4x–2,5x da mediana) ou primeira amostra |
| `review` | entre 0,2x–0,4x ou 2,5x–5x da mediana → revisão humana antes de confiar |
| `reject` | fora de 0,2x–5x da mediana, ou EAN inválido, ou foto duplicada (não grava) |

Status: `200` dry-run · `201` gravado · `400` payload inválido · `404` mercado inexistente · `409` `duplicate_scan` · `500` erro interno.
`GET /functions/v1/validate-price` devolve o contrato autodescrito.

---

## 5. `POST /functions/v1/scrape-supermarket` — scraping (stub privilegiado)

Interface já congelada; o coletor real ainda não está habilitado (responde `501`).

```bash
curl -s -X POST 'https://supabase.arxdevs.xyz/functions/v1/scrape-supermarket' \
  -H "Authorization: Bearer $SERVICE_ROLE" -H 'Content-Type: application/json' \
  -d '{"supermarket":"epa-mg","strategy":"html","limit":20,"dry_run":true}' | jq
```

```json
{
  "ok": false,
  "status": "not_implemented",
  "message": "Contrato validado. O coletor ainda não está habilitado…",
  "plan": {
    "supermarket": { "slug": "epa-mg", "name": "EPA Supermercados", "website": "…" },
    "strategy": "html", "limit": 20, "targets_provided": 0,
    "rate_limit": "máx. 1 req/s por host; 20 req por execução",
    "output_schema": { "ean": "string", "price": "number", "source": "scraped", "supermarket_id": "uuid" },
    "idempotency": "dedupe por (supermarket_id, ean, price, dia) antes de inserir"
  }
}
```

Autenticação: `Authorization: Bearer <service_role key>` **ou** header
`x-scraper-token: <SCRAPER_TOKEN>` (quando a env existir). Sem isso → `401`.

---

## 6. Modelo de dados

| Tabela / View | Leitura | Escrita anônima | Escrita com JWT |
| --- | --- | --- | --- |
| `supermarkets` | pública | `INSERT` (não verificado) | `UPDATE`/`DELETE` só do autor |
| `products` | pública | `INSERT` validado | — (só curadoria/service_role) |
| `prices` | pública | `INSERT` validado | `UPDATE`/`DELETE` só do autor |
| `releases` | pública | — | — (`service_role` publica) |
| `shopping_lists` | só do dono | — | CRUD do dono |
| `list_items` | só do dono | — | CRUD do dono |
| `list_totals` (view) | só do dono (`security_invoker`) | — | — |
| `latest_prices` (view) | pública | — | — |

Detalhes de RLS, grants e testes: [`RLS.md`](./RLS.md) e [`../tests/`](../tests/).
