import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export type Supermarket = {
  id?: string;
  slug: string;
  name: string;
  states: string[];
  state?: string | null;
  city: string;
  website?: string | null;
  logo_url?: string | null;
  is_verified?: boolean | null;
};

export const supabase: any = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      db: { schema: "fechouocarrinho" },
      global: {
        headers: {
          "Accept-Profile": "fechouocarrinho",
          "Content-Profile": "fechouocarrinho",
        },
      },
    })
  : null;

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export async function fetchSupermarkets(options?: {
  state?: string;
  search?: string;
}) {
  if (!supabase) {
    return { data: [] as Supermarket[], error: "Supabase não configurado" };
  }

  let query = supabase
    .from("supermarkets")
    .select("slug,name,states,state,city,is_verified")
    .order("name", { ascending: true });

  if (options?.state) {
    query = query.contains("states", [options.state]);
  }
  if (options?.search?.trim()) {
    query = query.ilike("name", `%${options.search.trim()}%`);
  }

  const { data, error } = await query;
  if (error) {
    return { data: [] as Supermarket[], error: error.message };
  }
  return { data: (data ?? []) as Supermarket[], error: null };
}

export async function insertMarketSuggestion(data: {
  market_name: string;
  city_state: string;
}) {
  if (!supabase) {
    return { ok: false as const, reason: "Supabase não configurado" };
  }

  const stateMatch = data.city_state.match(/([A-Za-z]{2})\s*$/);
  const state = stateMatch ? stateMatch[1].toUpperCase() : null;
  const slug =
    slugify(data.market_name) +
    "-" +
    (state ? state.toLowerCase() : "br") +
    "-" +
    Math.random().toString(36).slice(2, 8);

  const { error } = await supabase.from("supermarkets").insert({
    slug,
    name: data.market_name,
    city: data.city_state,
    states: state ? [state] : [],
    state,
    is_verified: false,
  });

  return error
    ? { ok: false as const, reason: error.message }
    : { ok: true as const };
}