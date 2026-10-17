#!/usr/bin/env bash
# ============================================================================
# Fechou o Carrinho — aplicação das migrations no schema `fechouocarrinho`
#
# Usa o container `supabase-db` (Postgres 15) do stack self-hosted em
# /opt/supabase. Cada arquivo roda em uma transação própria e é idempotente.
#
# Uso (no VPS):
#   bash backend/scripts/apply-migrations.sh
#   DB_CONTAINER=supabase-db bash backend/scripts/apply-migrations.sh
#
# Sem argumentos: aplica migrations/ em ordem lexicográfica.
# Com argumentos: aplica apenas os arquivos indicados.
# ============================================================================
set -euo pipefail

DB_CONTAINER="${DB_CONTAINER:-supabase-db}"
DB_USER="${DB_USER:-postgres}"
DB_NAME="${DB_NAME:-postgres}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MIGRATIONS_DIR="$HERE/migrations"

if [ "$#" -gt 0 ]; then
  FILES=("$@")
else
  FILES=("$MIGRATIONS_DIR"/*.sql)
fi

echo "== container: $DB_CONTAINER   schema: fechouocarrinho"
docker exec "$DB_CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" -tAc \
  "SELECT version FROM fechouocarrinho.schema_migrations ORDER BY version" 2>/dev/null \
  | sed 's/^/   já aplicada: /' || echo "   (sem tabela schema_migrations ainda)"

for f in "${FILES[@]}"; do
  [ -f "$f" ] || { echo "!! arquivo não encontrado: $f"; exit 1; }
  echo "== aplicando $(basename "$f")"
  docker exec -i "$DB_CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" \
    -v ON_ERROR_STOP=1 --quiet < "$f"
done

echo "== ok: $(printf '%s\n' "${FILES[@]}" | wc -l) migration(s) aplicada(s)"
