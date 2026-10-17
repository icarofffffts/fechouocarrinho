// ============================================================================
// Edge Function: validate-price
// Fechou o Carrinho — schema `fechouocarrinho`
//
// Caminho confiável para validar (e opcionalmente gravar) um preço coletado
// pelo app Android (OCR offline), pelo site ou por importadores.
//
// Além do RLS/policies da tabela `prices` (migration 0002), esta função aplica
// validação de negócio que o banco não consegue fazer sozinho:
//   * dígito verificador do EAN/GTIN (mod 10 GS1);
//   * detecção de outlier contra o histórico do mesmo produto/mercado;
//   * deduplicação por hash da foto do cupom/preço;
//   * normalização de payload e resposta com veredito.
//
// POST  /functions/v1/validate-price
// GET   /functions/v1/validate-price      -> documentação/contrato
//
// Contrato: ../docs/API.md
// ============================================================================

const SCHEMA = "fechouocarrinho";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "http://kong:8000";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const ALLOWED_SOURCES = ["ocr_scan", "manual", "community"];
const RESERVED_SOURCES = ["scraped"];
const UF = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT",
  "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO",
];
const MAX_PRICE = 99999.99;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, accept-profile, content-profile",
};

type Dict = Record<string, unknown>;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

/** GS1 mod-10: pesos 3,1,3,1... da direita para a esquerda (DV excluído). */
function isValidEan(code: string): boolean {
  if (!/^[0-9]+$/.test(code)) return false;
  if (![8, 12, 13, 14].includes(code.length)) return false;
  let sum = 0;
  for (let i = 1; i < code.length; i++) {
    const d = Number(code[code.length - 1 - i]);
    sum += i % 2 === 1 ? d * 3 : d;
  }
  return (10 - (sum % 10)) % 10 === Number(code[code.length - 1]);
}

function restHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    "Accept-Profile": SCHEMA,
    "Content-Type": "application/json",
    ...extra,
  };
}

async function restGet(path: string): Promise<unknown[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: restHeaders(),
  });
  if (!res.ok) throw new Error(`REST GET ${path} -> ${res.status} ${await res.text()}`);
  return await res.json();
}

async function restPost(path: string, body: unknown): Promise<unknown[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: "POST",
    headers: restHeaders({
      "Content-Profile": SCHEMA,
      Prefer: "return=representation",
    }),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`REST POST ${path} -> ${res.status} ${await res.text()}`);
  return await res.json();
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Extrai o `sub` do JWT do caller sem validar assinatura (só para atribuição). */
function callerSubject(req: Request): string | null {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")),
    );
    if (payload.role !== "authenticated") return null;
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

interface Normalized {
  ean: string | null;
  product_name: string | null;
  price: number;
  supermarket_id: string | null;
  state: string | null;
  city: string | null;
  source: string;
  scan_image_hash: string | null;
  user_id: string | null;
}

function normalize(raw: Dict, req: Request): { value?: Normalized; errors: string[] } {
  const errors: string[] = [];

  const price = typeof raw.price === "string" ? Number(raw.price) : raw.price;
  if (typeof price !== "number" || !Number.isFinite(price)) {
    errors.push("price: obrigatório e numérico");
  } else if (price <= 0 || price > MAX_PRICE) {
    errors.push(`price: deve estar entre 0,01 e ${MAX_PRICE}`);
  }

  let ean: string | null = null;
  if (raw.ean != null && String(raw.ean).trim() !== "") {
    ean = String(raw.ean).replace(/\D/g, "");
    if (!isValidEan(ean)) errors.push(`ean: '${raw.ean}' inválido (formato/DV)`);
  }

  const productName = raw.product_name == null ? null : String(raw.product_name).trim();
  if (productName != null && (productName.length < 1 || productName.length > 200)) {
    errors.push("product_name: 1..200 caracteres");
  }
  if (ean == null && productName == null) {
    errors.push("informe ean e/ou product_name");
  }

  const state = raw.state == null || raw.state === "" ? null : String(raw.state).toUpperCase();
  if (state != null && !UF.includes(state)) errors.push(`state: '${raw.state}' não é UF`);

  const source = raw.source == null ? "manual" : String(raw.source);
  if (RESERVED_SOURCES.includes(source)) {
    errors.push(`source: '${source}' é reservado ao pipeline oficial de scraping`);
  } else if (!ALLOWED_SOURCES.includes(source)) {
    errors.push(`source: use uma de ${ALLOWED_SOURCES.join(", ")}`);
  }

  const hash = raw.scan_image_hash == null ? null : String(raw.scan_image_hash);
  if (hash != null && hash.length > 128) errors.push("scan_image_hash: máximo 128 caracteres");

  const supermarketId = raw.supermarket_id == null ? null : String(raw.supermarket_id);
  const city = raw.city == null ? null : String(raw.city).slice(0, 120);

  if (errors.length > 0) return { errors };

  return {
    errors,
    value: {
      ean,
      product_name: productName,
      price: round2(price as number),
      supermarket_id: supermarketId,
      state,
      city,
      source,
      scan_image_hash: hash,
      user_id: callerSubject(req),
    },
  };
}

async function resolveSupermarket(input: Dict): Promise<{ id: string; slug: string } | null> {
  const slug = input.supermarket ?? input.supermarket_slug;
  const id = input.supermarket_id;
  const filter = slug
    ? `slug=eq.${encodeURIComponent(String(slug))}`
    : id
    ? `id=eq.${encodeURIComponent(String(id))}`
    : null;
  if (!filter) return null;
  const rows = await restGet(`supermarkets?${filter}&select=id,slug&limit=1`);
  return (rows[0] as { id: string; slug: string }) ?? null;
}

async function priceStats(ean: string | null, supermarketId: string | null) {
  if (!ean) return { samples: 0, median: null as number | null, min: null as number | null, max: null as number | null };
  const since = new Date(Date.now() - 90 * 24 * 3600 * 1000).toISOString();
  let filter = `ean=eq.${encodeURIComponent(ean)}&created_at=gte.${since}&select=price`;
  if (supermarketId) filter += `&supermarket_id=eq.${supermarketId}`;
  const rows = (await restGet(`prices?${filter}&limit=200`)) as { price: string | number }[];
  const prices = rows.map((r) => Number(r.price)).filter((n) => Number.isFinite(n));
  if (prices.length === 0) {
    return { samples: 0, median: null, min: null, max: null };
  }
  return {
    samples: prices.length,
    median: round2(median(prices)),
    min: round2(Math.min(...prices)),
    max: round2(Math.max(...prices)),
  };
}

async function isDuplicateScan(hash: string | null): Promise<boolean> {
  if (!hash) return false;
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const rows = await restGet(
    `prices?scan_image_hash=eq.${encodeURIComponent(hash)}&created_at=gte.${since}&select=id&limit=1`,
  );
  return rows.length > 0;
}

async function handlePost(req: Request): Promise<Response> {
  let raw: Dict;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  const { value: normalized, errors } = normalize(raw, req);
  if (errors.length > 0 || !normalized) {
    return json({ ok: false, error: "validation_error", details: errors }, 400);
  }

  const reasons: string[] = [];
  let score = 1;

  // 1. Mercado precisa existir (obrigatório para gravar).
  const market = await resolveSupermarket(raw);
  if (market) {
    normalized.supermarket_id = market.id;
  } else if (raw.supermarket || raw.supermarket_id) {
    return json({ ok: false, error: "supermarket_not_found" }, 404);
  }

  // 2. Deduplicação por hash da foto.
  if (await isDuplicateScan(normalized.scan_image_hash)) {
    return json(
      {
        ok: false,
        error: "duplicate_scan",
        verdict: "reject",
        reasons: ["scan_image_hash já registrado nas últimas 24h"],
      },
      409,
    );
  }

  // 3. Outlier contra o histórico (mesmo EAN, mesmo mercado, 90 dias).
  const stats = await priceStats(normalized.ean, normalized.supermarket_id);
  let verdict: "accept" | "review" | "reject" = "accept";
  if (stats.median && stats.samples >= 5) {
    const ratio = normalized.price / stats.median;
    if (ratio < 0.2 || ratio > 5) {
      verdict = "reject";
      reasons.push(
        `preço ${normalized.price} é ${ratio.toFixed(2)}x a mediana ${stats.median} (${stats.samples} amostras)`,
      );
    } else if (ratio < 0.4 || ratio > 2.5) {
      verdict = "review";
      reasons.push(
        `preço ${normalized.price} destoa da mediana ${stats.median} (${stats.samples} amostras)`,
      );
    }
    score = round2(Math.max(0, 1 - Math.abs(Math.log(ratio)) / 2));
  } else {
    reasons.push("histórico insuficiente: aceito como primeira amostra");
    score = 0.6;
  }

  if (!market) {
    reasons.push("sem mercado informado: gravável, porém sem referência de loja");
    score = Math.min(score, 0.7);
  }

  const payload = { ...normalized, is_verified: false };
  const shouldCommit = raw.commit === true && verdict !== "reject";

  if (!shouldCommit) {
    return json({
      ok: true,
      verdict,
      score,
      reasons,
      normalized: payload,
      stats,
      committed: false,
    });
  }

  try {
    const inserted = await restPost("prices", payload);
    return json({
      ok: true,
      verdict,
      score,
      reasons,
      normalized: payload,
      stats,
      committed: true,
      price: inserted[0] ?? null,
    }, 201);
  } catch (err) {
    return json({ ok: false, error: "insert_failed", details: String(err) }, 500);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  if (!SERVICE_ROLE_KEY) {
    return json({ ok: false, error: "server_misconfigured", details: "SUPABASE_SERVICE_ROLE_KEY ausente" }, 500);
  }

  if (req.method === "GET") {
    return json({
      ok: true,
      function: "validate-price",
      version: "1.0.0",
      schema: SCHEMA,
      accepts: {
        method: "POST",
        body: {
          ean: "string? (EAN-8/12/13/14, DV validado)",
          product_name: "string? (1..200)",
          price: "number (0,01..99999.99) — obrigatório",
          supermarket: "slug do mercado, ex.: epa-mg (ou supermarket_id)",
          supermarket_id: "uuid?",
          state: "UF? (ex.: MG)",
          city: "string?",
          source: "ocr_scan | manual | community",
          scan_image_hash: "string? (dedupe 24h)",
          commit: "boolean? — true grava em fechouocarrinho.prices",
        },
      },
      verdicts: ["accept", "review", "reject"],
    });
  }

  if (req.method !== "POST") {
    return json({ ok: false, error: "method_not_allowed" }, 405);
  }

  try {
    return await handlePost(req);
  } catch (err) {
    console.error("validate-price failure", err);
    return json({ ok: false, error: "internal_error", details: String(err) }, 500);
  }
});
