"use client";

import { useEffect, useState } from "react";
import { fetchSupermarkets, isSupabaseConfigured, type Supermarket } from "@/lib/supabase";
import MockupViewer from "@/components/MockupViewer";
import BrandAndBannersSection from "@/components/BrandAndBannersSection";

const MARKET_COLORS: Record<string, string> = {
  "epa-mg": "bg-emerald-600",
  "mart-minas-mg": "bg-orange-500",
  "bh-supermercados-mg": "bg-zinc-900",
  "supernosso-mg": "bg-red-600",
  "verdemar-mg": "bg-teal-600",
  "carrefour-mg": "bg-blue-600",
  "apoio-mineiro-mg": "bg-amber-600",
};

const FALLBACK_MARKETS: Supermarket[] = [
  { slug: "epa-mg", name: "EPA Supermercados", states: ["MG"], city: "V?rias cidades ? MG" },
  { slug: "mart-minas-mg", name: "Mart Minas", states: ["MG"], city: "V?rias cidades ? MG" },
  { slug: "bh-supermercados-mg", name: "BH Supermercados", states: ["MG"], city: "V?rias cidades ? MG" },
  { slug: "supernosso-mg", name: "Supernosso", states: ["MG"], city: "V?rias cidades ? MG" },
  { slug: "verdemar-mg", name: "Verdemar", states: ["MG"], city: "V?rias cidades ? MG" },
  { slug: "carrefour-mg", name: "Carrefour", states: ["MG", "SP", "RJ"], city: "V?rias cidades ? MG/SP/RJ" },
  { slug: "apoio-mineiro-mg", name: "Apoio Mineiro", states: ["MG"], city: "V?rias cidades ? MG" },
];

function marketColor(slug: string) {
  return MARKET_COLORS[slug] ?? "bg-emerald-600";
}

function marketAbbr(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Home() {
  const [estado] = useState("MG");
  const [markets, setMarkets] = useState<Supermarket[]>(FALLBACK_MARKETS);

  useEffect(() => {
    let active = true;
    fetchSupermarkets({ state: "MG" })
      .then((res) => {
        if (active && res.data.length > 0) setMarkets(res.data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="bg-[#FFF8F0] text-[#111827]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1B8C42] flex items-center justify-center text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5l10 -10" /></svg>
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight" style={{ fontFamily: "var(--font-nunito)" }}>fechou o carrinho</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="/como-funciona" className="hover:text-[#1B8C42] transition">Como funciona</a>
            <a href="/supermercados" className="hover:text-[#1B8C42] transition">Supermercados</a>
            <a href="/marca" className="hover:text-[#1B8C42] font-semibold text-[#1B8C42] transition">Identidade & Banners</a>
            <a href="/ajuda" className="hover:text-[#1B8C42] transition">Ajuda</a>
            <a href="#baixar" className="bg-[#111827] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-black transition">Baixar APK</a>
          </nav>
          <a href="#baixar" className="md:hidden bg-[#1B8C42] text-white px-4 py-2 rounded-full font-bold text-sm">Baixar</a>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-10 md:pt-16 pb-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Funciona sem internet • Leve para qualquer celular
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-[48px] leading-[0.95] mt-5" style={{ fontFamily: "var(--font-nunito)" }}>
            Seu total<br />
            <span className="text-[#1B8C42]">sem sustos</span><br />
            no caixa.
          </h1>
          <p className="mt-4 text-zinc-600 text-lg leading-relaxed">Aponte a câmera para a etiqueta na prateleira. O app identifica o preço na hora e atualiza o total do seu carrinho — simples, rápido e sem complicação.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/downloads/fechouocarrinho.apk" className="inline-flex items-center gap-3 bg-[#1B8C42] text-white px-7 py-4 rounded-2xl font-display font-extrabold text-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-700/20" style={{ fontFamily: "var(--font-nunito)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15V3M12 15l-4-4M12 15l4-4" /><path d="M2 17l1 4h18l1-4" /></svg>
              Baixar APK
            </a>
            <a href="/como-funciona" className="inline-flex items-center gap-2 bg-white border border-zinc-200 px-6 py-4 rounded-2xl font-semibold hover:bg-zinc-50 transition">
              Ver como funciona
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
          <p className="mt-3 text-xs text-zinc-500">Android 8 ou superior • Instalação em poucos segundos • <a href="/ajuda" className="underline hover:text-[#1B8C42]">Como instalar?</a></p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-xs">
            <div className="bg-white border border-zinc-100 rounded-2xl p-3 flex flex-col gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#1B8C42]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <span className="font-semibold leading-tight">Rápido e leve</span>
            </div>
            <div className="bg-white border border-zinc-100 rounded-2xl p-3 flex flex-col gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              </div>
              <span className="font-semibold leading-tight">Sem internet no mercado</span>
            </div>
            <div className="bg-white border border-zinc-100 rounded-2xl p-3 flex flex-col gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-700">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6M23 11v2" /></svg>
              </div>
              <span className="font-semibold leading-tight">Feito para o dia a dia</span>
            </div>
          </div>
        </div>

        {/* PHONE MOCKUP */}
        <div className="relative flex justify-center md:justify-end">
          <div className="w-[300px] h-[620px] bg-zinc-900 rounded-[42px] p-3 shadow-2xl rotate-[-0.5deg]">
            <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col">
              <div className="h-7 bg-zinc-900 flex items-center justify-center"><div className="w-20 h-1.5 bg-zinc-700 rounded-full"></div></div>
              <div className="bg-[#1B8C42] text-white px-4 py-3 flex items-center justify-between">
                <span className="font-display font-extrabold" style={{ fontFamily: "var(--font-nunito)" }}>Meu Carrinho</span>
                <span className="bg-white text-[#1B8C42] text-xs font-extrabold px-2.5 py-1 rounded-full">MG • EPA</span>
              </div>
              <div className="flex-1 relative bg-zinc-100">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=500&fit=crop" className="w-full h-full object-cover opacity-60" alt="Prateleira" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="w-full bg-white rounded-2xl p-3 shadow-xl border-2 border-[#FF6B00]">
                    <div className="text-[11px] font-bold text-zinc-500 tracking-widest">MIRE NA ETIQUETA</div>
                    <div className="mt-2 border-2 border-dashed border-[#FF6B00] rounded-xl h-24 flex items-center justify-center bg-amber-50">
                      <span className="font-mono font-extrabold text-xl">R$ 7,89</span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <span className="flex-1 bg-[#111827] text-white text-center py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                        Capturar
                      </span>
                      <span className="px-3 py-2 bg-white border rounded-xl text-sm flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white border-t">
                <div className="flex justify-between text-sm"><span className="text-zinc-500">Arroz Camil 5kg</span><span className="font-bold">R$ 29,90</span></div>
                <div className="flex justify-between text-sm"><span className="text-zinc-500">Café Pilão 500g</span><span className="font-bold">R$ 15,49</span></div>
                <div className="mt-3 bg-[#1B8C42] text-white rounded-xl px-4 py-3 flex justify-between items-center">
                  <span className="font-semibold text-sm">TOTAL</span><span className="font-display font-extrabold text-xl" style={{ fontFamily: "var(--font-nunito)" }}>R$ 53,28</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block absolute -right-2 top-10 bg-white border border-zinc-200 rounded-2xl px-4 py-3 shadow-xl">
            <div className="text-xs font-bold text-zinc-500 tracking-widest">VOCÊ ECONOMIZA</div>
            <div className="font-display font-extrabold text-[#1B8C42] text-lg" style={{ fontFamily: "var(--font-nunito)" }}>R$ 34,00</div>
            <div className="text-xs text-zinc-500">neste mês</div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-white border-y border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display font-extrabold text-3xl" style={{ fontFamily: "var(--font-nunito)" }}>Como funciona</h2>
              <p className="text-zinc-600 mt-2 max-w-xl">Três passos simples para não errar no total. Cada etapa tem uma página dedicada com detalhes.</p>
            </div>
            <a href="/como-funciona" className="hidden md:inline-flex items-center gap-2 text-[#1B8C42] font-bold hover:underline">Ver guia completo <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <a href="/como-funciona#mercado" className="group bg-[#FFF8F0] rounded-3xl p-6 border border-amber-100 hover:border-amber-200 hover:shadow-lg transition text-left block">
              <div className="w-12 h-12 rounded-2xl bg-white border border-amber-100 flex items-center justify-center text-[#1B8C42] shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <h3 className="font-display font-extrabold mt-4 text-lg" style={{ fontFamily: "var(--font-nunito)" }}>1. Escolha onde vai comprar</h3>
              <p className="text-sm text-zinc-600 mt-2 leading-relaxed">Selecione seu estado e o supermercado. Se o seu não estiver na lista, você pode sugerir em segundos.</p>
              <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-[#1B8C42] group-hover:gap-2 transition-all">Saber mais <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></span>
            </a>
            <a href="/como-funciona#camera" className="group bg-[#111827] text-white rounded-3xl p-6 hover:bg-black transition text-left block">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
              </div>
              <h3 className="font-display font-extrabold mt-4 text-lg text-white" style={{ fontFamily: "var(--font-nunito)" }}>2. Aponte para a etiqueta</h3>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">O app faz uma leitura rápida da etiqueta e identifica o valor. Funciona mesmo sem internet dentro do mercado.</p>
              <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-white group-hover:gap-2 transition-all">Como a leitura funciona <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></span>
            </a>
            <a href="/como-funciona#total" className="group bg-emerald-50 rounded-3xl p-6 border border-emerald-100 hover:border-emerald-200 hover:shadow-lg transition text-left block">
              <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-100 flex items-center justify-center text-[#1B8C42] shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
              </div>
              <h3 className="font-display font-extrabold mt-4 text-lg" style={{ fontFamily: "var(--font-nunito)" }}>3. Acompanhe o total</h3>
              <p className="text-sm text-zinc-600 mt-2 leading-relaxed">Cada item entra na lista e o total é atualizado na hora. Você decide o que levar sem surpresas no caixa.</p>
              <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-[#1B8C42] group-hover:gap-2 transition-all">Ver lista na prática <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></span>
            </a>
          </div>
        </div>
      </section>

      {/* SUPERMERCADOS */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display font-extrabold text-3xl" style={{ fontFamily: "var(--font-nunito)" }}>Onde você compra</h2>
            <p className="text-zinc-600 mt-2 max-w-2xl">Selecione seu estado e veja os mercados disponíveis. Trabalhamos para cobrir várias cidades de cada estado — não apenas a capital.</p>
          </div>
          <div className="flex items-center gap-2">
            <select className="border border-zinc-200 rounded-xl px-4 py-2.5 font-semibold bg-white min-w-[160px]" value={estado} onChange={() => {}}>
              <option>Minas Gerais</option>
            </select>
            <a href="/supermercados" className="hidden md:inline-flex bg-white border border-zinc-200 px-5 py-2.5 rounded-xl font-bold hover:bg-zinc-50">Ver todos</a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-7">
          {markets.map((m) => (
            <div key={m.slug} className="bg-white border border-zinc-200 rounded-2xl p-4 hover:shadow-md transition flex flex-col">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl ${marketColor(m.slug)} text-white flex items-center justify-center font-display font-extrabold text-sm shrink-0`} style={{ fontFamily: "var(--font-nunito)" }}>{marketAbbr(m.name)}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-extrabold leading-none truncate" style={{ fontFamily: "var(--font-nunito)" }}>{m.name}</div>
                  <div className="text-xs text-zinc-500 mt-1">{m.city}</div>
                </div>
                <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0"></span>
              </div>
              <div className="mt-3 flex gap-2">
                <span className="text-xs bg-zinc-50 border px-2 py-1 rounded-full font-medium">#{m.slug}</span>
              </div>
              <button disabled className="mt-4 w-full bg-zinc-100 text-zinc-400 text-sm font-semibold py-2.5 rounded-xl cursor-not-allowed">Preços em breve</button>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">Não encontrou seu mercado? <a href="/supermercados" className="font-bold text-[#1B8C42] underline">Sugerir supermercado</a> — analisamos e adicionamos.</p>
          <a href="/supermercados" className="text-sm font-bold text-[#111827] hover:underline inline-flex items-center gap-1">Explorar todos os mercados <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="bg-white border-y border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="w-11 h-11 rounded-2xl bg-zinc-900 flex items-center justify-center text-white shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>
            </div>
            <div>
              <h3 className="font-display font-bold" style={{ fontFamily: "var(--font-nunito)" }}>Funciona sem internet</h3>
              <p className="text-sm text-zinc-600 mt-1 leading-relaxed">A leitura acontece no seu aparelho. Ideal para dentro do mercado, onde o sinal costuma falhar.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#1B8C42] shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
            </div>
            <div>
              <h3 className="font-display font-bold" style={{ fontFamily: "var(--font-nunito)" }}>Leve para qualquer celular</h3>
              <p className="text-sm text-zinc-600 mt-1 leading-relaxed">Pensado para aparelhos mais simples. Ocupa pouco espaço e não deixa o celular lento.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            </div>
            <div>
              <h3 className="font-display font-bold" style={{ fontFamily: "var(--font-nunito)" }}>Lista que ajuda no dia a dia</h3>
              <p className="text-sm text-zinc-600 mt-1 leading-relaxed">Organize por mercado, ajuste quantidades e veja o total antes de ir ao caixa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BAIXAR */}
      <section id="baixar" className="max-w-6xl mx-auto px-4 py-14">
        <div className="bg-white border border-zinc-200 rounded-[32px] p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display font-extrabold text-3xl" style={{ fontFamily: "var(--font-nunito)" }}>Baixe o Fechou o Carrinho</h2>
            <p className="text-zinc-600 mt-3 leading-relaxed">Baixe direto por aqui. Você receberá o arquivo para instalar em poucos toques.</p>
            <div className="mt-6 flex flex-col gap-3">
              <a href="/downloads/fechouocarrinho.apk" className="bg-[#1B8C42] text-white text-center py-4 rounded-2xl font-display font-extrabold text-xl hover:bg-emerald-700 transition flex items-center justify-center gap-3 shadow-lg shadow-emerald-700/15" style={{ fontFamily: "var(--font-nunito)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 15V3M12 15l-4-4M12 15l4-4" /><path d="M2 17l1 4h18l1-4" /></svg>
                Baixar APK
              </a>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm leading-relaxed">
                <span className="font-bold">Como instalar:</span> Toque em <b>Abrir</b> após o download e depois em <b>Instalar</b>. Se o sistema pedir, permita <b>“Instalar de fontes desconhecidas”</b> apenas para este arquivo. É seguro e leva segundos.
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-xs text-center">
              <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4"><div className="w-8 h-8 mx-auto rounded-full bg-white border flex items-center justify-center font-bold">1</div><div className="mt-2 font-semibold">Baixar</div></div>
              <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4"><div className="w-8 h-8 mx-auto rounded-full bg-white border flex items-center justify-center font-bold">2</div><div className="mt-2 font-semibold">Permitir</div></div>
              <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4"><div className="w-8 h-8 mx-auto rounded-full bg-white border flex items-center justify-center font-bold">3</div><div className="mt-2 font-semibold">Instalar</div></div>
            </div>
            <p className="mt-4 text-xs text-zinc-500">Versão 1.0.0 • Compatível com Android 8 ou superior • <a href="/ajuda" className="underline hover:text-[#1B8C42]">Precisa de ajuda?</a></p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-56 h-56 bg-white border border-zinc-200 rounded-3xl p-4 shadow-xl flex flex-col items-center justify-center">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://fechouocarrinho.site/downloads/fechouocarrinho.apk" alt="QR Code para baixar o app" className="w-44 h-44 rounded-xl" />
              <span className="text-xs font-semibold mt-2 text-zinc-600">Aponte a câmera do celular</span>
            </div>
            <p className="text-xs text-zinc-500 mt-4 text-center max-w-[260px]">O QR leva para o mesmo arquivo do botão ao lado. Escaneie com a câmera para baixar direto no celular.</p>
            <a href="/ajuda" className="mt-4 text-sm font-semibold flex items-center gap-2 hover:text-[#1B8C42]">Dúvidas sobre instalação <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
          </div>
        </div>
      </section>

      <BrandAndBannersSection />

      <MockupViewer />

      <footer className="border-t border-zinc-200 py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6 text-sm">
          <div>
            <div className="font-display font-extrabold flex items-center gap-2" style={{ fontFamily: "var(--font-nunito)" }}>
              <div className="w-7 h-7 rounded-lg bg-[#1B8C42] flex items-center justify-center text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12l5 5l10 -10" /></svg></div>
              fechou o carrinho
            </div>
            <p className="text-zinc-500 mt-2 max-w-sm leading-relaxed">Controle simples do total da sua compra. Escolha o mercado, some os itens e vá ao caixa com tranquilidade.</p>
          </div>
          <div className="flex gap-10 text-sm">
            <div className="flex flex-col gap-2"><span className="font-bold">Navegação</span><a href="/como-funciona" className="text-zinc-600 hover:text-[#111827]">Como funciona</a><a href="/supermercados" className="text-zinc-600 hover:text-[#111827]">Supermercados</a><a href="/marca" className="text-zinc-600 hover:text-[#111827]">Identidade & Banners</a><a href="/ajuda" className="text-zinc-600 hover:text-[#111827]">Ajuda</a></div>
            <div className="flex flex-col gap-2"><span className="font-bold">Contato</span><a href="mailto:contato@fechouocarrinho.site" className="text-zinc-600 hover:text-[#111827]">contato@fechouocarrinho.site</a><span className="text-zinc-500 text-xs">© 2026 Fechou o Carrinho</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
