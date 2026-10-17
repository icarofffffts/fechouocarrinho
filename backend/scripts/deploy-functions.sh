#!/usr/bin/env bash
# ============================================================================
# Fechou o Carrinho — deploy das Edge Functions
#
# O stack Supabase self-hosted lê os workers de /opt/supabase/docker/volumes/
# functions (montado em /home/deno/functions no container supabase-edge-functions).
# O serviço `main` cria um worker por requisição, então NÃO é preciso recriar
# o container: basta sincronizar os arquivos.
#
# Uso (no VPS):
#   bash backend/scripts/deploy-functions.sh
#   FUNCTIONS_DIR=/caminho/volumes/functions bash backend/scripts/deploy-functions.sh
# ============================================================================
set -euo pipefail

FUNCTIONS_DIR="${FUNCTIONS_DIR:-/opt/supabase/docker/volumes/functions}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="$HERE/functions"
STAMP="$(date +%Y%m%d-%H%M%S)"

[ -d "$FUNCTIONS_DIR" ] || { echo "!! FUNCTIONS_DIR inexistente: $FUNCTIONS_DIR"; exit 1; }

for fn_dir in "$SRC_DIR"/*/; do
  name="$(basename "$fn_dir")"
  [ -f "$fn_dir/index.ts" ] || continue
  dest="$FUNCTIONS_DIR/$name"
  if [ -d "$dest" ]; then
    cp -a "$dest" "$dest.bak-$STAMP"
  fi
  mkdir -p "$dest"
  cp -a "$fn_dir." "$dest/"
  echo "== $name -> $dest"
done

echo
echo "== funções disponíveis:"
ls -1 "$FUNCTIONS_DIR" | sed 's/^/   /'
echo
echo "== smoke test:"
echo "   curl -s https://supabase.arxdevs.xyz/functions/v1/validate-price | jq ."
echo "   curl -s -X POST https://supabase.arxdevs.xyz/functions/v1/validate-price \\"
echo "        -H 'Content-Type: application/json' \\"
echo "        -d '{\"ean\":\"7891000315507\",\"price\":5.79,\"supermarket\":\"epa-mg\",\"state\":\"MG\"}' | jq ."
