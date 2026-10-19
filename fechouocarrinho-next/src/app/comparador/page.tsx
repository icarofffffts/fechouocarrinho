"use client";

type Result = {
  slug: string;
  name: string;
  total: number;
  extra: number;
  distance: number;
  winner?: boolean;
};

const RESULTS: Result[] = [
  { slug: "bh-supermercados-mg", name: "Supermercados BH", total: 189.4, extra: 0, distance: 2.4, winner: true },
  { slug: "epa-mg", name: "EPA", total: 204.2, extra: 14.8, distance: 1.8 },
  { slug: "mart-minas-mg", name: "Mart Minas", total: 211.8, extra: 22.4, distance: 3.1 },
];

const CITY = "Belo Horizonte, MG";

function brl(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function routeUrl(name: string) {
  const q = encodeURIComponent(`${name}, ${CITY}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${q}`;
}

export default function Comparador() {
  const winner = RESULTS.find((r) => r.winner)!;

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
            <a href="/supermercados" className="hover:text-[#1B8C42]">Supermercados</a>
            <a href="/comparador" className="text-[#1B8C42] font-bold">Comparador</a>
            <a href="/ajuda" className="hover:text-[#1B8C42]">Ajuda</a>
            <a href="/#baixar" className="bg-[#111827] text-white px-5 py-2.5 rounded-full font-semibold">Baixar APK</a>
          </nav>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-8">
        <a href="/" className="text-sm font-medium text-zinc-600 hover:text-[#111827] inline-flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar
        </a>

        <h1 className="font-display font-extrabold text-2xl mt-4" style={{ fontFamily: "var(--font-nunito)" }}>
          Comparar mercados
        </h1>
        <p className="text-sm text-zinc-500 mt-1">mesma lista • 12 itens</p>

        {/* List summary */}
        <div className="mt-6 bg-white rounded-3xl p-5 shadow-sm border border-zinc-100">
          <div className="text-xs font-medium text-zinc-500">sua lista</div>
          <div className="mt-1 flex items-center justify-between gap-3">
            <div className="font-display font-extrabold text-base" style={{ fontFamily: "var(--font-nunito)" }}>
              Arroz, Feijão, Leite, Café + 8 itens
            </div>
            <div className="font-display font-extrabold text-lg text-[#FF6B00]" style={{ fontFamily: "var(--font-nunito)" }}>
              {brl(winner.total)}
            </div>
          </div>
        </div>

        <h2 className="font-display font-extrabold text-lg mt-8" style={{ fontFamily: "var(--font-nunito)" }}>
          resultado por rede
        </h2>
        <p className="text-xs text-zinc-500 mt-1">ordenado do menor para o maior total</p>

        <div className="mt-4 space-y-4">
          {RESULTS.map((r) => (
            <div
              key={r.slug}
              className={
                r.winner
                  ? "bg-[#1B8C42] text-white rounded-3xl p-5 shadow-lg"
                  : "bg-white rounded-3xl p-5 shadow-sm border border-zinc-100"
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  {r.winner && (
                    <div className="inline-flex items-center gap-1.5 bg-white text-[#1B8C42] text-[10px] font-bold px-2.5 py-1 rounded-full mb-2">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#1B8C42" strokeWidth="2">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                      MENOR PREÇO
                    </div>
                  )}
                  <div
                    className={
                      r.winner
                        ? "font-display font-extrabold text-xl"
                        : "font-display font-extrabold text-lg text-[#111827]"
                    }
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    {r.name}
                  </div>
                  <div className={r.winner ? "text-xs text-white/80 mt-1" : "text-xs text-zinc-500 mt-1"}>
                    12 itens • {r.distance.toFixed(1).replace(".", ",")} km
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div
                    className={
                      r.winner
                        ? "font-display font-extrabold text-2xl"
                        : "font-display font-extrabold text-xl text-[#111827]"
                    }
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    {brl(r.total)}
                  </div>
                  {r.extra > 0 && (
                    <div className="text-xs font-semibold text-[#FF6B00] mt-1">+ {brl(r.extra)}</div>
                  )}
                  {r.winner && (
                    <div className="text-xs text-[#FFBE8A] mt-1">economia de {brl(27.6)}</div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a
                  href={routeUrl(r.name === "EPA" ? "EPA Supermercados" : r.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    r.winner
                      ? "flex-1 bg-white/20 hover:bg-white/30 text-white text-center py-2.5 rounded-2xl text-sm font-bold transition"
                      : "flex-1 bg-zinc-100 hover:bg-zinc-200 text-[#111827] text-center py-2.5 rounded-2xl text-sm font-bold transition"
                  }
                >
                  Ver rota no mapa
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <h2 className="font-display font-extrabold text-lg mt-8" style={{ fontFamily: "var(--font-nunito)" }}>
          comparativo visual
        </h2>
        <div className="mt-4 bg-white rounded-3xl p-5 shadow-sm border border-zinc-100 space-y-4">
          {RESULTS.map((r) => {
            const pct = (r.total / 220) * 100;
            return (
              <div key={r.slug} className="flex items-center gap-3">
                <div className="w-12 text-xs font-semibold text-zinc-600 truncate">{r.name === "Supermercados BH" ? "BH" : r.name === "Mart Minas" ? "Mart" : "EPA"}</div>
                <div className="flex-1 h-4 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className={r.winner ? "h-4 bg-[#1B8C42] rounded-full" : "h-4 bg-zinc-400/40 rounded-full"}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className={r.winner ? "w-16 text-right text-xs font-extrabold text-[#1B8C42]" : "w-16 text-right text-xs font-extrabold text-zinc-600"}>
                  {brl(r.total)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Insight */}
        <div className="mt-6 bg-[#FF6B00]/10 border border-[#FF6B00]/40 rounded-3xl p-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FF6B00] flex items-center justify-center text-white text-xs font-bold">!</div>
            <span className="font-display font-extrabold text-sm text-[#FF6B00]" style={{ fontFamily: "var(--font-nunito)" }}>
              Dica
            </span>
          </div>
          <p className="text-sm text-[#111827] mt-2">
            Comprando no BH você economiza {brl(22.4)} vs. Mart Minas.
          </p>
        </div>

        <a
          href="/supermercados"
          className="mt-6 block w-full bg-[#1B8C42] text-white text-center py-3.5 rounded-full font-bold shadow-lg shadow-emerald-700/20 hover:bg-emerald-700 transition"
        >
          Usar lista no Supermercados BH
        </a>
      </main>

      <footer className="border-t border-zinc-200 py-8 bg-white mt-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6 text-sm">
          <div>
            <div className="font-display font-extrabold flex items-center gap-2" style={{ fontFamily: "var(--font-nunito)" }}>
              <div className="w-7 h-7 rounded-lg bg-[#1B8C42] flex items-center justify-center text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              </div>
              fechou o carrinho
            </div>
            <p className="text-zinc-500 mt-2 max-w-sm leading-relaxed">Controle simples do total da sua compra.</p>
          </div>
          <div className="flex gap-10 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-bold">Navegação</span>
              <a href="/como-funciona" className="text-zinc-600 hover:text-[#111827]">Como funciona</a>
              <a href="/supermercados" className="text-zinc-600 hover:text-[#111827]">Supermercados</a>
              <a href="/comparador" className="text-zinc-600 hover:text-[#111827]">Comparador</a>
              <a href="/ajuda" className="text-zinc-600 hover:text-[#111827]">Ajuda</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">Contato</span>
              <a href="mailto:contato@fechouocarrinho.site" className="text-zinc-600 hover:text-[#111827]">contato@fechouocarrinho.site</a>
              <span className="text-zinc-500 text-xs">© 2026 Fechou o Carrinho</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}