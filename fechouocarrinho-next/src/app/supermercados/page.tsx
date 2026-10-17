"use client";

import { useEffect, useState } from "react";
import { fetchSupermarkets, insertMarketSuggestion, isSupabaseConfigured, type Supermarket } from "@/lib/supabase";

const MARKET_COLORS: Record<string, string> = {
  "epa-mg": "bg-emerald-600",
  "mart-minas-mg": "bg-orange-500",
  "bh-supermercados-mg": "bg-zinc-900",
  "supernosso-mg": "bg-red-600",
  "verdemar-mg": "bg-teal-600",
  "carrefour-mg": "bg-blue-600",
  "apoio-mineiro-mg": "bg-amber-600",
};

function marketColor(slug: string) {
  return MARKET_COLORS[slug] ?? "bg-emerald-600";
}

const STATES = ["MG", "SP", "RJ", "BA", "RS", "PR", "SC", "GO", "DF", "ES", "MT", "MS", "PE", "CE", "PB", "RN", "AL", "SE", "PI", "MA", "PA", "AM", "RO", "RR", "AP", "AC", "TO"];

type Status = "idle" | "loading" | "ok" | "error";

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
    <div className="bg-[#FFF8F0] min-h-screen">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1B8C42] flex items-center justify-center text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M5 12l5 5l10 -10" />
              </svg>
            </div>
            <span className="font-display font-extrabold text-xl" style={{ fontFamily: "var(--font-nunito)" }}>
              fechou o carrinho
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="/como-funciona" className="hover:text-[#1B8C42]">Como funciona</a>
            <a href="/supermercados" className="text-[#1B8C42] font-bold">Supermercados</a>
            <a href="/ajuda" className="hover:text-[#1B8C42]">Ajuda</a>
            <a href="/#baixar" className="bg-[#111827] text-white px-5 py-2.5 rounded-full font-semibold">Baixar APK</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <a href="/" className="text-sm font-medium text-zinc-600 hover:text-[#111827] inline-flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar
        </a>
        <h1 className="font-display font-extrabold text-4xl mt-4" style={{ fontFamily: "var(--font-nunito)" }}>
          Supermercados disponíveis
        </h1>
        <p className="text-zinc-600 mt-3 max-w-2xl leading-relaxed">
          Escolha o estado e depois o mercado onde você costuma comprar. Se o seu não aparecer, sugira — avaliamos e adicionamos para todos.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="border border-zinc-200 rounded-xl px-4 py-2.5 font-semibold bg-white"
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
            placeholder="Buscar supermercado..."
            className="border border-zinc-200 rounded-xl px-4 py-2.5 font-medium bg-white min-w-[220px]"
          />
          <button
            onClick={() => (document.getElementById("suggest") as HTMLDialogElement)?.showModal()}
            className="bg-[#1B8C42] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition"
          >
            Sugerir supermercado
          </button>
          {!isSupabaseConfigured && (
            <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
              Supabase não configurado — exibindo dados locais
            </span>
          )}
        </div>

        {fetchError && (
          <p className="mt-4 text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
            Erro ao carregar: {fetchError}
          </p>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {loading && markets.length === 0 && (
            <p className="text-sm text-zinc-500 col-span-full">Carregando...</p>
          )}
          {!loading && markets.length === 0 && (
            <p className="text-sm text-zinc-500 col-span-full">Nenhum supermercado encontrado.</p>
          )}
          {markets.map((m) => (
            <div key={m.slug} className="bg-white border border-zinc-200 rounded-2xl p-4 hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl ${marketColor(m.slug)} text-white flex items-center justify-center font-display font-extrabold text-sm shrink-0`}
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  {m.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="font-display font-extrabold leading-none truncate" style={{ fontFamily: "var(--font-nunito)" }}>
                    {m.name}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{m.city}</div>
                </div>
                <span className={`w-2 h-2 rounded-full shrink-0 ml-auto ${m.is_verified ? "bg-emerald-500" : "bg-amber-400"}`} />
              </div>
              <button disabled className="mt-4 w-full bg-zinc-100 text-zinc-400 text-sm font-semibold py-2.5 rounded-xl cursor-not-allowed">
                Preços em breve
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-500 mt-6">
          Cobertura: todos os mercados listados atendem várias cidades do estado, não apenas a capital.
        </p>
      </main>

      <dialog id="suggest" className="rounded-2xl p-0 backdrop:bg-black/50">
        <form onSubmit={handleSubmit} className="p-6 w-[360px]">
          <h3 className="font-display font-extrabold text-lg" style={{ fontFamily: "var(--font-nunito)" }}>
            Sugerir supermercado
          </h3>
          <p className="text-sm text-zinc-600 mt-1">Preencha os dados. Vamos analisar e adicionar.</p>

          <input
            value={marketName}
            onChange={(e) => setMarketName(e.target.value)}
            placeholder="Nome do supermercado"
            className="mt-4 w-full border border-zinc-200 rounded-xl px-3 py-2.5"
          />
          <input
            value={cityState}
            onChange={(e) => setCityState(e.target.value)}
            placeholder="Cidade — Estado (ex: Juiz de Fora — MG)"
            className="mt-2 w-full border border-zinc-200 rounded-xl px-3 py-2.5"
          />

          {status === "ok" && (
            <p className="mt-3 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
              Sugestão enviada. Obrigado!
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {errorMsg}
            </p>
          )}

          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex-1 bg-[#1B8C42] text-white py-2.5 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {status === "loading" ? "Enviando..." : "Enviar"}
            </button>
            <button
              type="button"
              onClick={() => (document.getElementById("suggest") as HTMLDialogElement)?.close()}
              className="px-5 border border-zinc-200 rounded-xl font-semibold hover:bg-zinc-50 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </dialog>

      <footer className="border-t border-zinc-200 py-8 bg-white mt-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-4 text-sm text-zinc-500">
          <span>© 2026 Fechou o Carrinho</span>
          <a href="mailto:contato@fechouocarrinho.site" className="underline">contato@fechouocarrinho.site</a>
        </div>
      </footer>
    </div>
  );
}