#!/usr/bin/env bash
# ============================================================================
# Fechou o Carrinho — testes de integração da API pública
#
# Exercita o caminho REAL do app Android / site:
#   PostgREST  -> apikey = ANON_KEY + Accept-Profile: fechouocarrinho
#   Functions  -> /functions/v1/{validate-price,scrape-supermarket}
#
# Uso (no VPS):
#   bash scripts/test-api.sh
#   BASE_URL=http://localhost:8001 bash scripts/test-api.sh
#
# Sai com código 1 se qualquer verificação falhar.
# ============================================================================
set -uo pipefail

BASE_URL="${BASE_URL:-https://supabase.arxdevs.xyz}"
ENV_FILE="${ENV_FILE:-/opt/supabase/docker/.env}"
PROFILE="fechouocarrinho"
MARKER="apitest-$(date +%s)"

if [ -z "${ANON_KEY:-}" ] && [ -f "$ENV_FILE" ]; then
  ANON_KEY=$(grep -E '^ANON_KEY=' "$ENV_FILE" | head -1 | cut -d= -f2-)
fi
if [ -z "${SERVICE_ROLE_KEY:-}" ] && [ -f "$ENV_FILE" ]; then
  SERVICE_ROLE_KEY=$(grep -E '^SERVICE_ROLE_KEY=' "$ENV_FILE" | head -1 | cut -d= -f2-)
fi

if [ -z "${ANON_KEY:-}" ]; then
  echo "ANON_KEY não encontrada (env ou $ENV_FILE)"; exit 2
fi

PASS=0; FAIL=0
LAST_STATUS=""; LAST_BODY=""

pass() { printf 'PASS  %s (HTTP %s)\n' "$1" "$LAST_STATUS"; PASS=$((PASS + 1)); }
fail() { printf 'FAIL  %s\n      %s\n' "$1" "${2:-}"; FAIL=$((FAIL + 1)); }
title() { printf '\n\033[1m%s\033[0m\n' "$1"; }

call() { # method path [json] [extra curl args...]
  local method="$1" path="$2" data="${3-}"
  if [ "$#" -ge 3 ]; then shift 3; else shift "$#"; fi
  local prof="$PROFILE"
  local -a extra=()
  while [ "$#" -gt 0 ]; do
    if [ "$1" = "-H" ] && [[ "${2-}" =~ ^Accept-Profile:\ *(.*)$ ]]; then
      prof="${BASH_REMATCH[1]}"
      shift 2
    else
      extra+=("$1")
      shift 1
    fi
  done
  local out; out=$(mktemp)
  local -a hdrs=(
    -H "apikey: $ANON_KEY"
    -H "Authorization: Bearer $ANON_KEY"
    -H "Accept-Profile: $prof"
    -H "Content-Profile: $prof"
    -H 'Content-Type: application/json'
  )
  if [ -n "$data" ]; then
    LAST_STATUS=$(curl -sS -o "$out" -w '%{http_code}' -X "$method" "$BASE_URL$path" "${hdrs[@]}" "${extra[@]}" -d "$data")
  else
    LAST_STATUS=$(curl -sS -o "$out" -w '%{http_code}' -X "$method" "$BASE_URL$path" "${hdrs[@]}" "${extra[@]}")
  fi
  LAST_BODY=$(cat "$out"); rm -f "$out"
}

call_service() { # method path json  -> usa service_role (admin)
  local method="$1" path="$2" data="${3-}"
  local out; out=$(mktemp)
  LAST_STATUS=$(curl -sS -o "$out" -w '%{http_code}' -X "$method" "$BASE_URL$path" \
    -H "apikey: $SERVICE_ROLE_KEY" -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
    -H "Accept-Profile: $PROFILE" -H "Content-Profile: $PROFILE" \
    -H 'Content-Type: application/json' -d "$data")
  LAST_BODY=$(cat "$out"); rm -f "$out"
}

expect_status() { # label wanted
  if [ "$LAST_STATUS" = "$2" ]; then pass "$1"; else fail "$1" "esperado HTTP $2, obtido $LAST_STATUS -> $LAST_BODY"; fi
}
expect_status_in() { # label "401 403"
  case " $2 " in *" $LAST_STATUS "*) pass "$1";; *) fail "$1" "esperado [$2], obtido $LAST_STATUS -> $LAST_BODY";; esac
}
expect_json() { # label jq_expr expected
  local got; got=$(printf '%s' "$LAST_BODY" | jq -r "$2" 2>/dev/null)
  if [ "$got" = "$3" ]; then pass "$1"; else fail "$1" "jq '$2' = '$got', esperado '$3' -> $LAST_BODY"; fi
}

printf 'Base: %s\nPerfil: %s\n' "$BASE_URL" "$PROFILE"

# id do EPA (MG) usado nos testes de escrita
call GET '/rest/v1/supermarkets?select=id&slug=eq.epa-mg&limit=1'
EPA_ID=$(printf '%s' "$LAST_BODY" | jq -r '.[0].id // empty')
if [ -z "$EPA_ID" ]; then
  echo "não foi possível resolver o mercado epa-mg: HTTP $LAST_STATUS $LAST_BODY"; exit 2
fi
printf 'Mercado EPA (MG): %s\n' "$EPA_ID"

# ---------------------------------------------------------------------------
title '1. PostgREST — catálogo público (Accept-Profile: fechouocarrinho)'
call GET '/rest/v1/supermarkets?select=slug,name,states,is_verified&states=cs.%7BMG%7D&order=slug.asc'
expect_status 'GET /supermarkets?states=cs.{MG}' 200
expect_json 'retorna os 7 mercados de MG' 'length' '7'
expect_json 'todos declaram MG em states' '[.[] | .states | index("MG") != null] | all' 'true'

call GET '/rest/v1/supermarkets?select=slug&limit=1' '' -H 'Accept-Profile: public'
expect_status_in 'schema public não expõe supermarkets (isolamento)' '400 404 406'

# ---------------------------------------------------------------------------
title '2. PostgREST — leitura de preços e views'
call GET '/rest/v1/prices?select=id,price,state,source&limit=5'
expect_status 'GET /prices' 200
call GET '/rest/v1/latest_prices?select=ean,price&limit=5'
expect_status 'GET /latest_prices (view agregada)' 200
call GET '/rest/v1/releases?select=version_name,is_latest&is_latest=eq.true'
expect_status 'GET /releases (check de update do APK)' 200

# ---------------------------------------------------------------------------
title '3. PostgREST — escrita anônima em /prices (RLS)'
call POST '/rest/v1/prices?select=id,price,source,is_verified' \
  "{\"ean\":\"7891000315507\",\"product_name\":\"Leite Integral 1L\",\"price\":5.49,\"state\":\"MG\",\"city\":\"Belo Horizonte\",\"source\":\"ocr_scan\",\"supermarket_id\":\"$EPA_ID\",\"scan_image_hash\":\"$MARKER\"}" \
  -H 'Prefer: return=representation'
expect_status_in 'POST /prices válido é aceito' '200 201'
expect_json 'preço gravado como não verificado' '.[0].is_verified' 'false'

call POST '/rest/v1/prices?select=id' '{"price":0,"source":"manual"}'
expect_status_in 'POST /prices com price=0 é bloqueado' '400 401 403'
call POST '/rest/v1/prices?select=id' '{"price":9.9,"source":"manual","is_verified":true}'
expect_status_in 'POST /prices não pode auto-verificar' '400 401 403'
call POST '/rest/v1/prices?select=id' '{"price":9.9,"source":"scraped"}'
expect_status_in 'POST /prices não pode usar source=scraped' '400 401 403'
call POST '/rest/v1/prices?select=id' '{"price":9.9,"source":"manual","state":"XX"}'
expect_status_in 'POST /prices não aceita UF inválida' '400 401 403'
call POST '/rest/v1/prices?select=id' '{"price":9.9,"source":"manual","ean":"7891000315500"}'
expect_status_in 'POST /prices rejeita EAN com DV inválido' '400 401 403'
call POST '/rest/v1/prices?select=id' '{"price":9.9,"source":"manual","ean":"123"}'
expect_status_in 'POST /prices rejeita EAN curto' '400 401 403'

# ---------------------------------------------------------------------------
title '4. PostgREST — dados privados e tabelas privilegiadas'
call GET '/rest/v1/shopping_lists?select=id'
expect_status 'GET /shopping_lists com anon' 200
expect_json 'anon não vê nenhuma lista (RLS)' 'length' '0'
call GET '/rest/v1/list_items?select=id'
expect_status 'GET /list_items com anon' 200
expect_json 'anon não vê nenhum item (RLS)' 'length' '0'
call POST '/rest/v1/shopping_lists?select=id' '{"name":"lista anonima"}'
expect_status_in 'anon não cria lista (sem JWT)' '400 401 403'
call POST '/rest/v1/releases?select=id' '{"version_code":99,"version_name":"9.9.9","apk_url":"/x.apk"}'
expect_status_in 'anon não publica release' '400 401 403'
call PATCH '/rest/v1/products?id=eq.00000000-0000-0000-0000-000000000000' '{"name":"hack"}'
expect_status_in 'anon não edita catálogo de produtos' '400 401 403'

# ---------------------------------------------------------------------------
title '5. Edge Function — validate-price'
call GET '/functions/v1/validate-price'
expect_status 'GET /functions/v1/validate-price (contrato)' 200
expect_json 'função reporta ok' '.ok' 'true'

call POST '/functions/v1/validate-price' \
  "{\"ean\":\"7891000315507\",\"product_name\":\"Leite Integral 1L\",\"price\":5.79,\"supermarket\":\"epa-mg\",\"state\":\"MG\",\"source\":\"ocr_scan\",\"scan_image_hash\":\"$MARKER-v\"}"
expect_status 'POST validate-price (dry-run)' 200
expect_json 'veredito aceito' '.verdict' 'accept'
expect_json 'não gravou sem commit=true' '.committed' 'false'
expect_json 'resposta inclui payload normalizado' '.normalized.price' '5.79'

call POST '/functions/v1/validate-price' '{"ean":"7891000315500","price":5.79}'
expect_status 'EAN inválido -> 400' 400
expect_json 'erro de validação' '.error' 'validation_error'

call POST '/functions/v1/validate-price' '{"ean":"7891000315507","price":-3}'
expect_status 'preço negativo -> 400' 400

call POST '/functions/v1/validate-price' '{"ean":"7891000315507","price":5.79,"source":"scraped"}'
expect_status 'source=scraped -> 400' 400

call POST '/functions/v1/validate-price' \
  "{\"ean\":\"7891000315507\",\"product_name\":\"Leite Integral 1L\",\"price\":5.99,\"supermarket\":\"epa-mg\",\"state\":\"MG\",\"source\":\"ocr_scan\",\"scan_image_hash\":\"$MARKER-c\",\"commit\":true}"
expect_status_in 'POST validate-price commit=true grava' '200 201'
expect_json 'preço gravado' '.committed' 'true'

call POST '/functions/v1/validate-price' \
  "{\"price\":5.5,\"ean\":\"7891000315507\",\"supermarket\":\"nao-existe\",\"commit\":false}"
expect_status 'mercado inexistente -> 404' 404

# ---------------------------------------------------------------------------
title '6. Edge Function — scrape-supermarket (stub privilegiado)'
call GET '/functions/v1/scrape-supermarket'
expect_status_in 'GET sem auth -> 401' '401 403'
call POST '/functions/v1/scrape-supermarket' '{"supermarket":"epa-mg"}'
expect_status_in 'POST sem auth -> 401' '401 403'

if [ -n "${SERVICE_ROLE_KEY:-}" ]; then
  LAST_STATUS=$(curl -sS -o /tmp/.foq-scrape -w '%{http_code}' -X POST \
    "$BASE_URL/functions/v1/scrape-supermarket" \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY" -H 'Content-Type: application/json' \
    -d '{"supermarket":"epa-mg","strategy":"html","limit":20}')
  LAST_BODY=$(cat /tmp/.foq-scrape); rm -f /tmp/.foq-scrape
  expect_status 'POST com service_role -> 501 (coletor ainda não ligado)' 501
  expect_json 'stub devolve status explícito' '.status' 'not_implemented'
  expect_json 'plano de coleta é montado' '.plan.supermarket.slug' 'epa-mg'

  LAST_STATUS=$(curl -sS -o /tmp/.foq-scrape2 -w '%{http_code}' -X POST \
    "$BASE_URL/functions/v1/scrape-supermarket" \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY" -H 'Content-Type: application/json' \
    -d '{"supermarket":"nao-existe"}')
  LAST_BODY=$(cat /tmp/.foq-scrape2); rm -f /tmp/.foq-scrape2
  expect_status 'mercado inexistente -> 404' 404
else
  printf 'SKIP  testes com service_role (chave indisponível)\n'
fi

# ---------------------------------------------------------------------------
title '7. Limpeza das linhas de teste'
if [ -n "${SERVICE_ROLE_KEY:-}" ]; then
  call_service DELETE "/rest/v1/prices?scan_image_hash=like.$MARKER*"
  expect_status_in 'linhas de teste removidas' '200 204'
fi

printf '\n\033[1mResumo: %d PASS / %d FAIL\033[0m\n' "$PASS" "$FAIL"
[ "$FAIL" -eq 0 ]
