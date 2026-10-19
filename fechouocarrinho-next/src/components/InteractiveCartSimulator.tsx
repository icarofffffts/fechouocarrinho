"use client";

import { useState } from "react";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
}

const DEMO_PRODUCTS: Product[] = [
  {
    id: "arroz",
    name: "Arroz Branco Tipo 1 5kg",
    brand: "Tio João",
    price: 28.90,
    image: "/mockups/products/arroz-tio-joao.jpg",
    category: "Mercearia",
  },
  {
    id: "feijao",
    name: "Feijão Carioca 1kg",
    brand: "Camil",
    price: 7.49,
    image: "/mockups/products/feijao-camil.jpg",
    category: "Mercearia",
  },
  {
    id: "cafe",
    name: "Café Torrado & Moído 500g",
    brand: "Pilão",
    price: 18.50,
    image: "/mockups/products/cafe-pilao.jpg",
    category: "Bebidas",
  },
  {
    id: "leite",
    name: "Leite Integral UHT 1L",
    brand: "Itambé",
    price: 4.99,
    image: "/mockups/products/leite-itambe.jpg",
    category: "Laticínios",
  },
];

export default function InteractiveCartSimulator() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    arroz: 1,
    feijao: 2,
    cafe: 1,
    leite: 3,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const handleUpdateQty = (id: string, delta: number, name: string) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (delta > 0) {
        showToast(`+1 ${name} adicionado ao total`);
      } else if (next === 0 && current > 0) {
        showToast(`${name} removido`);
      }
      return { ...prev, [id]: next };
    });
  };

  const total = DEMO_PRODUCTS.reduce((acc, p) => acc + p.price * (quantities[p.id] || 0), 0);
  const totalItems = Object.values(quantities).reduce((acc, q) => acc + q, 0);

  // Estimativa de economia de ~8.5% comparado à média sem controle
  const estimatedSavings = total * 0.085;

  const formatBRL = (val: number) => {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <section className="bg-white border-y border-zinc-100 py-16 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-[#FF6B00] rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Simulador Interativo
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl mt-3 tracking-tight" style={{ fontFamily: "var(--font-nunito)" }}>
              Sinta a experiência na prática
            </h2>
            <p className="text-zinc-600 mt-2 max-w-2xl text-base">
              Adicione itens ao carrinho abaixo e veja o total se atualizar em tempo real, exatamente como acontece no seu celular enquanto você caminha pelos corredores.
            </p>
          </div>

          <button
            onClick={() => {
              setQuantities({ arroz: 1, feijao: 2, cafe: 1, leite: 3 });
              showToast("Valores redefinidos para o exemplo");
            }}
            className="text-xs font-semibold text-zinc-500 hover:text-[#1B8C42] border border-zinc-200 px-3.5 py-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 self-start md:self-auto transition"
          >
            ↺ Redefinir Exemplo
          </button>
        </div>

        {/* SIMULATOR GRID */}
        <div className="mt-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          {/* PRODUCT CARDS */}
          <div className="grid sm:grid-cols-2 gap-4">
            {DEMO_PRODUCTS.map((prod) => {
              const qty = quantities[prod.id] || 0;
              return (
                <div
                  key={prod.id}
                  className={`bg-white rounded-3xl p-5 border transition-all duration-200 shadow-sm flex flex-col justify-between ${
                    qty > 0 ? "border-emerald-300 ring-2 ring-emerald-500/10" : "border-zinc-200 opacity-80"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#FFF8F0] border border-amber-100/60 overflow-hidden shrink-0 p-1 flex items-center justify-center">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        {prod.category} · {prod.brand}
                      </span>
                      <h4 className="font-display font-bold text-sm text-zinc-900 truncate mt-0.5" style={{ fontFamily: "var(--font-nunito)" }}>
                        {prod.name}
                      </h4>
                      <div className="font-display font-extrabold text-base text-[#1B8C42] mt-1" style={{ fontFamily: "var(--font-nunito)" }}>
                        {formatBRL(prod.price)}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controller */}
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      Subtotal: <b className="text-zinc-900">{formatBRL(prod.price * qty)}</b>
                    </span>
                    <div className="flex items-center gap-2 bg-zinc-100/80 rounded-xl p-1 border border-zinc-200">
                      <button
                        onClick={() => handleUpdateQty(prod.id, -1, prod.name)}
                        disabled={qty === 0}
                        className="w-7 h-7 rounded-lg bg-white text-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed font-bold flex items-center justify-center shadow-sm active:scale-90 transition"
                        aria-label="Diminuir quantidade"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-xs font-mono">{qty}</span>
                      <button
                        onClick={() => handleUpdateQty(prod.id, 1, prod.name)}
                        className="w-7 h-7 rounded-lg bg-[#1B8C42] text-white font-bold flex items-center justify-center shadow-sm active:scale-90 transition"
                        aria-label="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TOTAL SUMMARY CARD (MOCKUP 03 / CART VIEW FEEL) */}
          <div className="bg-[#111827] text-white rounded-[2rem] p-7 md:p-8 shadow-2xl relative overflow-hidden border border-zinc-800">
            <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1B8C42] flex items-center justify-center text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12l5 5l10 -10" /></svg>
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg leading-tight" style={{ fontFamily: "var(--font-nunito)" }}>
                    Carrinho ao Vivo
                  </h3>
                  <span className="text-xs text-zinc-400">Simulação de prateleira</span>
                </div>
              </div>
              <span className="bg-white/15 px-3 py-1 rounded-full font-mono text-xs font-bold text-emerald-300">
                {totalItems} ITENS
              </span>
            </div>

            {/* Total Highlight */}
            <div className="py-6">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Valor Total Acumulado
              </span>
              <div className="font-display font-extrabold text-5xl md:text-6xl text-white tracking-tight mt-1" style={{ fontFamily: "var(--font-nunito)" }}>
                {formatBRL(total)}
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                Valor exato que você pagará no caixa — zero surpresas na nota fiscal.
              </p>
            </div>

            {/* Economy pill */}
            <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Economia estimada
                </span>
                <span className="text-xs text-emerald-200">Pesquisando e controlando</span>
              </div>
              <strong className="font-display font-extrabold text-xl text-emerald-300" style={{ fontFamily: "var(--font-nunito)" }}>
                {formatBRL(estimatedSavings)}
              </strong>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-3">
              <a
                href="/downloads/fechouocarrinho.apk"
                className="w-full bg-[#1B8C42] hover:bg-emerald-600 text-white text-center py-4 rounded-2xl font-display font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/30 active:scale-[0.98] transition"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15V3M12 15l-4-4M12 15l4-4" /><path d="M2 17l1 4h18l1-4" /></svg>
                Baixar App e Usar no Mercado
              </a>
              <span className="text-[11px] text-zinc-400 text-center">
                Android 8+ • Leve (49MB) • Funciona 100% Offline
              </span>
            </div>
          </div>
        </div>

        {/* TOAST FEEDBACK */}
        {toastMessage && (
          <div className="fixed bottom-6 left-6 z-50 animate-spring-toast bg-[#111827] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/15 flex items-center gap-2 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
}
