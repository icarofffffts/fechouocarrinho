# RLS, policies e grants — schema `fechouocarrinho`

## Antes (estado encontrado em 17/10/2026)

```
relrowsecurity = false  em TODAS as 6 tabelas
pg_policies    = 0 linhas
anon/authenticated: INSERT, SELECT, UPDATE em TODAS as tabelas
```

Ou seja: qualquer pessoa com a anon key (que é pública, vai no APK) podia não só
ler, mas **inserir e alterar** qualquer tabela do schema. Sem RLS, os grants eram
a única barreira — e eles davam escrita.

## Depois (migrations `0002` + `0003`)

- RLS habilitado nas 6 tabelas (`relrowsecurity = true`), sem `FORCE ROW LEVEL
  SECURITY`, para que `service_role` (BYPASSRLS) e o owner continuem operando
  scrapers, Edge Functions e migrations.
- 19 policies (SELECT/INSERT/UPDATE/DELETE conforme a tabela).
- Grants reescritos em modelo **default-deny** + `ALTER DEFAULT PRIVILEGES` para
  tabelas futuras.
- Constraints de integridade que valem também para `service_role`.
- Views com `security_invoker = true` (herdam o RLS das tabelas base).

### Matriz de acesso

| Tabela | `anon` (sem login) | `authenticated` (com JWT) | `service_role` |
| --- | --- | --- | --- |
| `supermarkets` | SELECT · INSERT (não verificado) | + UPDATE/DELETE do próprio registro não verificado | tudo |
| `products` | SELECT · INSERT validado | idem | tudo |
| `prices` | SELECT · INSERT validado (autor nulo) | + UPDATE/DELETE próprios | tudo |
| `releases` | SELECT | SELECT | tudo |
| `shopping_lists` | SELECT (0 linhas) | CRUD apenas onde `user_id = auth.uid()` | tudo |
| `list_items` | SELECT (0 linhas) | CRUD se a lista pai for do usuário | tudo |
| `list_totals` | SELECT (0 linhas) | SELECT (só listas próprias) | tudo |
| `latest_prices` | SELECT | SELECT | tudo |

### Validações no INSERT de `prices` (policy `prices_insert_community`)

| Regra | Motivo |
| --- | --- |
| `price > 0 AND price <= 99999.99` | preço plausível (o app arredonda para 2 casas) |
| `COALESCE(is_verified,false) = false` | curaria só pela curadoria/`service_role` |
| `user_id IS NULL OR user_id = auth.uid()` | impede forjar autoria |
| `source IN ('ocr_scan','manual','community')` | `scraped` reservado ao coletor oficial |
| `fechouocarrinho.is_ean(ean)` | formato + dígito verificador mod-10 GS1 |
| `fechouocarrinho.is_br_uf(state)` | UF entre as 27 válidas |
| `product_name` 1..200, `scan_image_hash` ≤ 128 | antilixo/antiflood |

### Por que listas exigem JWT

`shopping_lists`/`list_items` não têm coluna de dispositivo. A alternativa segura
é usar **Supabase Anonymous Sign-In**: o app chama `/auth/v1/signup` (anonymous)
uma vez, recebe um JWT com `role=authenticated` e um `sub` estável, e o RLS
isola a lista por `user_id = auth.uid()`. Com a anon key pura (`role=anon`), as
policies não liberam listas — a leitura volta `[]` e a escrita é negada.

## Como testar

```bash
# 1) Testes de role, dentro do Postgres (ROLLBACK no fim, não persiste nada)
docker exec -i supabase-db psql -U postgres -d postgres -v ON_ERROR_STOP=1 \
  < backend/tests/rls_policies_test.sql

# 2) Testes de integração via anon key real (HTTP)
bash backend/scripts/test-api.sh
```

Verificação manual rápida:

```sql
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname='fechouocarrinho';
SELECT tablename, policyname, cmd, roles::text FROM pg_policies
  WHERE schemaname='fechouocarrinho' ORDER BY tablename, cmd;
```

## Operação

- `service_role` continua com acesso total (BYPASSRLS) — usado pelo
  `validate-price` (commit), pelo futuro coletor de scraping e por scripts admin.
- Para promover um preço a "verificado": `UPDATE … SET is_verified = true` com
  `service_role` ou pelo Studio.
- Novas tabelas no schema nascem com `SELECT` para `anon`/`authenticated` e
  `ALL` para `service_role`; **lembre de habilitar RLS e criar policies** na
  mesma migration.
