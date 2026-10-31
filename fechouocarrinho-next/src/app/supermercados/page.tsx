"use client";

import { useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { fetchSupermarkets, insertMarketSuggestion, isSupabaseConfigured, type Supermarket } from "@/lib/supabase";

const STATES = ["MG", "SP", "RJ", "BA", "RS", "PR", "SC", "GO", "DF", "ES", "MT", "MS", "PE", "CE", "PB", "RN", "AL", "SE", "PI", "MA", "PA", "AM", "RO", "RR", "AP", "AC", "TO"];

type Status = "idle" | "loading" | "ok" | "error";

function monogram(name: string) {
  const parts = name.split(" ").filter(Boolean);
  const first = parts[0] ?? "";
  if (parts.length === 1) return first.slice(0, 2).toUpperCase();
  if (first.length <= 3) return first.toUpperCase();
  return (first[0] + parts[1][0]).toUpperCase();
}

export default function Supermercados() {
  const [selectedState, setSelectedState] = useState("MG");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [markets, setMarkets] = useState<Supermarket[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const [marketName, setMarketName] = useState("");
  const [cityState, setCityState] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setFetchError("");
    fetchSupermarkets({ state: selectedState, search: debouncedSearch })
      .then((res) => {
        if (!active) return;
        setMarkets(res.data);
        setFetchError(res.error ?? "");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [selectedState, debouncedSearch]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!marketName.trim() || !cityState.trim()) {
      setStatus("error");
      setErrorMsg("Preencha o nome do supermercado e a cidade/estado.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    const result = await insertMarketSuggestion({
      market_name: marketName.trim(),
      city_state: cityState.trim(),
    });

    if (result.ok) {
      setStatus("ok");
      setMarketName("");
      setCityState("");
      fetchSupermarkets({ state: selectedState, search: debouncedSearch }).then((res) => {
        setMarkets(res.data);
      });
    } else {
      setStatus("error");
      setErrorMsg(
        result.reason === "Supabase não configurado"
          ? "Sugestão recebida! (Supabase não configurado — conecte para persistir)"
          : `Erro ao enviar: ${result.reason}`
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0B2B1F]">
      <SiteHeader ativo="Supermercados" />

      <section className="mx-auto max-w-[1320px] px-5 pt-14 pb-8 md:px-10 md:pt-20">
        <p className="text-[12px] font-semibold uppercase tracking-[.16em] text-[#1B8C42]">Cobertura</p>
        <h1 className="mt-4 text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[.95] tracking-[-.05em]">
          Onde você compra.
        </h1>
        <p className="mt-5 max-w-[62ch] text-[17px] leading-7 text-[#3E5347]">
          Escolha o estado e encontre a rede onde você costuma comprar. Se o seu mercado não aparecer, sugira — avaliamos
          e adicionamos para todos.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            aria-label="Estado"
            className="h-12 rounded-2xl border border-[#0B2B1F]/15 bg-white px-4 text-[15px] font-semibold"
          >
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar supermercado"
            className="h-12 w-full max-w-[380px] rounded-2xl border border-[#0B2B1F]/15 bg-white px-4 text-[15px] font-medium"
          />
          <a
            href="#sugerir"
            className="flex h-12 items-center rounded-full bg-[#1B8C42] px-6 text-[15px] font-semibold text-white transition hover:bg-[#146B32]"
          >
            Sugerir supermercado
          </a>
          {!isSupabaseConfigured && (
            <span className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Supabase não configurado — exibindo dados locais
            </span>
          )}
        </div>

        {fetchError && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            Erro ao carregar: {fetchError}
          </p>
        )}
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-16 md:px-10 md:pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading && markets.length === 0 && <p className="col-span-full text-sm text-[#5A6B63]">Carregando…</p>}
          {!loading && markets.length === 0 && (
            <p className="col-span-full text-sm text-[#5A6B63]">
              Nenhum supermercado encontrado para esse estado e busca.
            </p>
          )}
          {markets.map((m) => (
            <article
              key={m.slug}
              className="rounded-3xl border border-[#0B2B1F]/12 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgba(17,24,39,.12)]"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#1B8C42]/10 text-[13px] font-bold text-[#1B8C42]">
                  {monogram(m.name)}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-[16px] font-semibold tracking-[-.02em]">{m.name}</h2>
                  <p className="truncate text-[13px] text-[#5A6B63]">{m.city}</p>
                </div>
              </div>
              <span className="mt-5 inline-flex rounded-full border border-[#0B2B1F]/15 px-3 py-1 text-[11px] font-medium text-[#5A6B63]">
                {m.is_verified ? "Rede verificada · preços em breve" : "Preços em breve"}
              </span>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-[70ch] text-[13px] text-[#5A6B63]">
          Cobertura: os mercados listados atendem várias cidades do estado, não apenas a capital.
        </p>
      </section>

      <section id="sugerir" className="bg-[#0B2B1F] px-5 py-20 text-[#F4F3EF] md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="max-w-[16ch] text-[clamp(2rem,4.6vw,3rem)] font-semibold leading-[.95] tracking-[-.045em]">
              Não achou seu mercado?
            </h2>
            <p className="mt-4 max-w-[42ch] text-[16px] leading-7 text-white/65">
              Conte o nome da rede e a cidade. Analisamos e liberamos para todos que usam o app.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              value={marketName}
              onChange={(e) => setMarketName(e.target.value)}
              placeholder="Nome do supermercado"
              className="h-12 w-full rounded-2xl border border-white/25 bg-transparent px-4 text-[15px] text-white placeholder:text-white/45"
            />
            <input
              value={cityState}
              onChange={(e) => setCityState(e.target.value)}
              placeholder="Cidade — Estado (ex: Juiz de Fora — MG)"
              className="h-12 w-full rounded-2xl border border-white/25 bg-transparent px-4 text-[15px] text-white placeholder:text-white/45"
            />
            {status === "ok" && (
              <p className="rounded-xl border border-emerald-300/40 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-200">
                Sugestão enviada. Obrigado!
              </p>
            )}
            {status === "error" && (
              <p className="rounded-xl border border-red-300/40 bg-red-400/10 px-3 py-2 text-sm font-semibold text-red-200">
                {errorMsg}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-12 rounded-full bg-[#1B8C42] px-7 text-[15px] font-semibold text-white transition hover:bg-[#146B32] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Enviando…" : "Enviar sugestão"}
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
