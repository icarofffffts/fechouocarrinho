// ============================================================================
// Edge Function: scrape-supermarket
// Fechou o Carrinho — schema `fechouocarrinho`
//
// Ponto de entrada PRIVILEGIADO do pipeline de scraping (server-side).
// Nesta entrega ele é um *stub contratual*: valida a requisição, resolve o
// mercado, monta o plano de coleta e responde 501 enquanto o coletor real
// (browserless / HTTP direto / n8n) não está ligado.
//
// Por que stub em produção? Porque:
//   1. a interface já fica congelada para Frontend/Android/cron;
//   2. a autorização e a validação já são testáveis hoje;
//   3. quando o coletor entrar, só o trecho marcado com TODO muda.
//
// Autenticação (FUNCTIONS_VERIFY_JWT=false neste stack, então é feita aqui):
//   Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>   (obrigatório)
//   ou header x-scraper-token: <SCRAPER_TOKEN>          (se a env existir)
//
// POST /functions/v1/scrape-supermarket
// GET  /functions/v1/scrape-supermarket   -> documentação/contrato
// ============================================================================

const SCHEMA = "fechouocarrinho";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "http://kong:8000";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const SCRAPER_TOKEN = Deno.env.get("SCRAPER_TOKEN") ?? "";

const STRATEGIES = ["api", "html", "sitemap", "manual_queue"];
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-scraper-token",
};

type Dict = Record<string, unknown>;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

function isAuthorized(req: Request): { ok: boolean; via?: string } {
  const token = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (SERVICE_ROLE_KEY && token && token === SERVICE_ROLE_KEY) {
    return { ok: true, via: "service_role" };
  }
  const scraperToken = req.headers.get("x-scraper-token") ?? "";
  if (SCRAPER_TOKEN && scraperToken && scraperToken === SCRAPER_TOKEN) {
    return { ok: true, via: "scraper_token" };
  }
  if (token) {
    try {
      const payload = JSON.parse(
        atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
      );
      if (payload.role === "service_role") return { ok: true, via: "service_role_jwt" };
    } catch { /* token opaco ou malformado: segue para 401 */ }
  }
  return { ok: false };
}

async function getSupermarket(slug: string) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/supermarkets?slug=eq.${encodeURIComponent(slug)}&select=id,slug,name,website,states&limit=1`,
    {
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "Accept-Profile": SCHEMA,
      },
    },
  );
  if (!res.ok) throw new Error(`REST ${res.status}: ${await res.text()}`);
  const rows = (await res.json()) as Dict[];
  return rows[0] ?? null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  const auth = isAuthorized(req);
  if (!auth.ok) {
    return json(
      {
        ok: false,
        error: "unauthorized",
        hint: "envie Authorization: Bearer <service_role key> (ou x-scraper-token)",
      },
      401,
    );
  }

  if (req.method === "GET") {
    return json({
      ok: true,
      function: "scrape-supermarket",
      version: "0.1.0-stub",
      status: "not_implemented",
      schema: SCHEMA,
      auth: { via: auth.via, schemes: ["service_role", "x-scraper-token"] },
      accepts: {
        method: "POST",
        body: {
          supermarket: "slug, ex.: epa-mg (obrigatório)",
          strategy: STRATEGIES,
          targets:
            "array opcional de { ean?: string, product_name?: string, url?: string }",
          limit: "number? (default 50, máximo 500)",
          dry_run: "boolean? (default true nesta versão)",
        },
      },
      roadmap: [
        "coletor HTTP direto quando o mercado expõe API/JSON de catálogo",
        "fallback browserless (content_browserless:3000) para HTML renderizado",
        "gravação via REST com source='scraped' usando service_role",
        "agendamento por n8n (n8n:5678) com 1 job por mercado/dia",
      ],
    });
  }

  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  let body: Dict;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  const slug = body.supermarket ?? body.supermarket_slug;
  if (typeof slug !== "string" || slug.trim() === "") {
    return json({ ok: false, error: "validation_error", details: ["supermarket: obrigatório"] }, 400);
  }

  const strategy = typeof body.strategy === "string" ? body.strategy : "html";
  if (!STRATEGIES.includes(strategy)) {
    return json(
      { ok: false, error: "validation_error", details: [`strategy: use uma de ${STRATEGIES.join(", ")}`] },
      400,
    );
  }

  const limit = Number(body.limit ?? 50);
  if (!Number.isInteger(limit) || limit < 1 || limit > 500) {
    return json({ ok: false, error: "validation_error", details: ["limit: inteiro 1..500"] }, 400);
  }

  const market = await getSupermarket(slug.trim());
  if (!market) return json({ ok: false, error: "supermarket_not_found", supermarket: slug }, 404);

  const targets = Array.isArray(body.targets) ? body.targets : [];
  const dryRun = body.dry_run !== false; // nesta versão é sempre dry-run

  const plan = {
    supermarket: { slug: market.slug, name: market.name, website: market.website },
    strategy,
    limit,
    targets_provided: targets.length,
    rate_limit: "máx. 1 req/s por host; 20 req por execução",
    output_schema: {
      ean: "string",
      product_name: "string",
      price: "number",
      state: "UF",
      source: "scraped",
      supermarket_id: "uuid",
    },
    idempotency: "dedupe por (supermarket_id, ean, price, dia) antes de inserir",
  };

  // TODO(coletor): substituir por execução real.
  //  1. fetch do catálogo (strategy=api|html|sitemap)
  //  2. parse + normalizar preço (pt-BR: "R$ 1.234,56")
  //  3. POST /rest/v1/prices  (service_role, source='scraped')
  //  4. registrar execução em fechouocarrinho.scrape_runs (a criar)
  return json(
    {
      ok: false,
      status: "not_implemented",
      dry_run: dryRun,
      message:
        "Contrato validado. O coletor ainda não está habilitado nesta entrega; nenhum dado foi gravado.",
      plan,
    },
    501,
  );
});
