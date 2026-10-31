-- Sincronização familiar — pré-requisitos no Supabase
-- Aplique no SQL Editor do projeto (schema fechouocarrinho).
-- Sem isso, o app não consegue criar nem ler listas compartilhadas usando a chave anon.

-- 1. Código de compartilhamento na lista
alter table fechouocarrinho.shopping_lists
    add column if not exists share_code text;

create unique index if not exists shopping_lists_share_code_key
    on fechouocarrinho.shopping_lists (share_code)
    where share_code is not null;

-- 2. Permissões de tabela (hoje a anon recebe "permission denied")
grant usage on schema fechouocarrinho to anon, authenticated;
grant select, insert, update, delete on fechouocarrinho.shopping_lists to anon, authenticated;
grant select, insert, update, delete on fechouocarrinho.list_items to anon, authenticated;

-- 3. RLS: só listas que possuem código são acessíveis
alter table fechouocarrinho.shopping_lists enable row level security;
alter table fechouocarrinho.list_items enable row level security;

drop policy if exists "shared list select" on fechouocarrinho.shopping_lists;
create policy "shared list select"
    on fechouocarrinho.shopping_lists
    for select to anon, authenticated
    using (share_code is not null);

drop policy if exists "shared list insert" on fechouocarrinho.shopping_lists;
create policy "shared list insert"
    on fechouocarrinho.shopping_lists
    for insert to anon, authenticated
    with check (share_code is not null);

drop policy if exists "shared list update" on fechouocarrinho.shopping_lists;
create policy "shared list update"
    on fechouocarrinho.shopping_lists
    for update to anon, authenticated
    using (share_code is not null)
    with check (share_code is not null);

drop policy if exists "shared list delete" on fechouocarrinho.shopping_lists;
create policy "shared list delete"
    on fechouocarrinho.shopping_lists
    for delete to anon, authenticated
    using (share_code is not null);

drop policy if exists "shared items all" on fechouocarrinho.list_items;
create policy "shared items all"
    on fechouocarrinho.list_items
    for all to anon, authenticated
    using (
        exists (
            select 1 from fechouocarrinho.shopping_lists l
            where l.id = list_items.list_id and l.share_code is not null
        )
    )
    with check (
        exists (
            select 1 from fechouocarrinho.shopping_lists l
            where l.id = list_items.list_id and l.share_code is not null
        )
    );

-- Observação de segurança: qualquer pessoa com a chave anon consegue ler listas
-- que tenham share_code. O código de 6 caracteres funciona como segredo fraco.
-- Para um lançamento público, troque por RLS baseada em auth.uid() e convites.
