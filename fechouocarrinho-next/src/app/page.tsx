"use client";

import { useEffect, useState } from "react";
import { fetchSupermarkets, type Supermarket } from "@/lib/supabase";
import BrandAndBannersSection from "@/components/BrandAndBannersSection";
import InteractiveHeroPhone from "@/components/InteractiveHeroPhone";
import InteractiveCartSimulator from "@/components/InteractiveCartSimulator";
import ProblemVsSolution from "@/components/ProblemVsSolution";
import FaqSection from "@/components/FaqSection";

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
  { slug: "epa-mg", name: "EPA Supermercados", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "mart-minas-mg", name: "Mart Minas", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "bh-supermercados-mg", name: "BH Supermercados", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "supernosso-mg", name: "Supernosso", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "verdemar-mg", name: "Verdemar", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "carrefour-mg", name: "Carrefour", states: ["MG", "SP", "RJ"], city: "Várias cidades · MG/SP/RJ" },
  { slug: "apoio-mineiro-mg", name: "Apoio Mineiro", states: ["MG"], city: "Várias cidades · MG" },
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
    <div className="bg-[#FFF8F0] text-[#111827] min-h-screen flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      {/* 1. HEADER / NAVBAR (Frosted Glass & Mobile-Friendly) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 transition-all">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img src="/brand/logo-mark.svg" alt="" width="40" height="40" className="w-10 h-10 rounded-2xl shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform" />
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight block leading-none" style={{ fontFamily: "var(--font-nunito)" }}>
                fechou o carrinho
              </span>
              <span className="text-[10px] font-bold text-[#1B8C42] tracking-wider uppercase">
                v1.0.4 • 100% Offline
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-zinc-600">
            <a href="#como-funciona" className="hover:text-[#1B8C42] transition">Como funciona</a>
            <a href="#simulador" className="hover:text-[#1B8C42] transition">Simulador</a>
            <a href="#supermercados" className="hover:text-[#1B8C42] transition">Supermercados</a>
                        <a href="/marca" className="hover:text-[#1B8C42] text-[#1B8C42] font-bold transition">Identidade & Banners</a>
            <a href="#ajuda" className="hover:text-[#1B8C42] transition">Dúvidas</a>
            <a
              href="#baixar"
              className="bg-[#111827] text-white px-5 py-2.5 rounded-full font-bold hover:bg-black transition active:scale-[0.97] shadow-sm flex items-center gap-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 15V3M12 15l-4-4M12 15l4-4" />
                <path d="M2 17l1 4h18l1-4" />
              </svg>
              Baixar APK
            </a>
          </nav>

          <a
            href="#baixar"
            className="lg:hidden bg-[#1B8C42] text-white px-4 py-2 rounded-full font-bold text-xs shadow-md active:scale-95 transition"
          >
            Baixar APK
          </a>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 pt-12 md:pt-20 pb-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 bg-white border border-emerald-200/90 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-sm text-zinc-800">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <span>Funciona sem internet • Leve para qualquer celular</span>
          </div>

          {/* Main Title */}
          <h1
            className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[72px] leading-[0.92] tracking-[-0.045em] mt-6 text-[#111827]"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Seu total<br />
            <span className="text-[#1B8C42]">sem sustos</span><br />
            no caixa.
          </h1>

          {/* Value Prop Description */}
          <p className="mt-5 text-zinc-600 text-lg sm:text-xl leading-relaxed max-w-xl">
            Aponte a câmera para a etiqueta na prateleira. O app lê o preço em 1 segundo e soma no total da sua compra em tempo real. Sem internet no galpão, sem surpresas na esteira.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="/downloads/fechouocarrinho.apk"
              className="inline-flex items-center gap-3 bg-[#1B8C42] text-white px-8 py-4 rounded-2xl font-display font-extrabold text-lg hover:bg-emerald-700 transition shadow-xl shadow-emerald-700/25 active:scale-[0.98]"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 15V3M12 15l-4-4M12 15l4-4" />
                <path d="M2 17l1 4h18l1-4" />
              </svg>
              Baixar APK Grátis (v1.0.4)
            </a>
            <a
              href="#simulador"
              className="inline-flex items-center gap-2 bg-white border border-zinc-200 px-6 py-4 rounded-2xl font-bold text-zinc-800 hover:bg-zinc-50 transition active:scale-[0.98] shadow-sm"
            >
              Testar Simulador
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <p className="mt-3.5 text-xs text-zinc-500">
            Android 8 ou superior • APK oficial (49MB) • <a href="#ajuda" className="underline hover:text-[#1B8C42]">Como instalar?</a>
          </p>

          {/* Feature Highlights Grid */}
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 text-xs">
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#1B8C42]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="font-bold text-zinc-900 mt-2 leading-tight">Rápido e leve</span>
              <span className="text-[11px] text-zinc-500 mt-0.5">Apenas 49MB</span>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="font-bold text-zinc-900 mt-2 leading-tight">100% Offline</span>
              <span className="text-[11px] text-zinc-500 mt-0.5">Sem sinal 4G/5G</span>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <div className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-700">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="font-bold text-zinc-900 mt-2 leading-tight">Zero Anúncios</span>
              <span className="text-[11px] text-zinc-500 mt-0.5">Sem cadastro chato</span>
            </div>
          </div>
        </div>

        {/* HERO RIGHT: INTERACTIVE PHONE SIMULATOR */}
        <div className="relative flex justify-center lg:justify-end">
          <InteractiveHeroPhone />
        </div>
      </section>

      {/* 3. PROBLEM VS SOLUTION SECTION */}
      <ProblemVsSolution />

      {/* 4. SIMULADOR INTERATIVO DE COMPRA */}
      <div id="simulador">
        <InteractiveCartSimulator />
      </div>

      {/* 5. COMO FUNCIONA (3 Passos Visuais) */}
      <section id="como-funciona" className="bg-[#FFF8F0] py-16 sm:py-20 border-b border-zinc-200/80">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-block bg-emerald-100 border border-emerald-300 text-[#1B8C42] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Simplicidade Total
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-zinc-900 mt-3 tracking-tight" style={{ fontFamily: "var(--font-nunito)" }}>
                Como funciona na prática
              </h2>
              <p className="text-zinc-600 mt-2 max-w-xl text-base">
                Três etapas simples pensadas para quem está no corre do dia a dia e quer economizar sem complicação.
              </p>
            </div>
            <a href="/como-funciona" className="hidden sm:inline-flex items-center gap-2 text-[#1B8C42] font-bold hover:underline">
              Ver guia detalhado &rarr;
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {/* Passo 1 */}
            <div className="bg-white rounded-3xl p-7 border border-zinc-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] border border-amber-100 flex items-center justify-center text-[#1B8C42] font-display font-extrabold text-xl" style={{ fontFamily: "var(--font-nunito)" }}>
                  1
                </div>
                <h3 className="font-display font-extrabold mt-5 text-xl text-zinc-900" style={{ fontFamily: "var(--font-nunito)" }}>
                  Escolha o Supermercado
                </h3>
                <p className="text-sm text-zinc-600 mt-2.5 leading-relaxed">
                  Selecione seu mercado favorito (EPA, Mart Minas, BH, Supernosso, Carrefour) para registrar o histórico correto das suas compras.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-100 text-xs font-bold text-[#1B8C42]">
                Passo 1 · Seleção Rápida
              </div>
            </div>

            {/* Passo 2 */}
            <div className="bg-[#111827] text-white rounded-3xl p-7 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#FF6B00] font-display font-extrabold text-xl" style={{ fontFamily: "var(--font-nunito)" }}>
                  2
                </div>
                <h3 className="font-display font-extrabold mt-5 text-xl text-white" style={{ fontFamily: "var(--font-nunito)" }}>
                  Mire na Etiqueta de Preço
                </h3>
                <p className="text-sm text-zinc-300 mt-2.5 leading-relaxed">
                  Aponte o visor com a mira laser laranja. O algoritmo lê o valor na hora, mesmo sem internet dentro do galpão de compras.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-[#FF6B00]">
                Passo 2 · Leitura 100% Offline
              </div>
            </div>

            {/* Passo 3 */}
            <div className="bg-white rounded-3xl p-7 border border-zinc-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#1B8C42] font-display font-extrabold text-xl" style={{ fontFamily: "var(--font-nunito)" }}>
                  3
                </div>
                <h3 className="font-display font-extrabold mt-5 text-xl text-zinc-900" style={{ fontFamily: "var(--font-nunito)" }}>
                  Feche a Compra sem Susto
                </h3>
                <p className="text-sm text-zinc-600 mt-2.5 leading-relaxed">
                  Cada item entra na lista e o valor total é recalculado na hora. Você chega no caixa sabendo o total exato até os centavos.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-100 text-xs font-bold text-[#1B8C42]">
                Passo 3 · Total sem Surpresas
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SUPERMERCADOS ATENDIDOS */}
      <section id="supermercados" className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block bg-white border border-zinc-200 text-zinc-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              Cobertura Regional
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 mt-3" style={{ fontFamily: "var(--font-nunito)" }}>
              Onde você compra
            </h2>
            <p className="text-zinc-600 mt-2 max-w-2xl text-base">
              Configurado e testado nas maiores redes de supermercados e atacarejos de Minas Gerais e do Brasil.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              className="border border-zinc-200 rounded-xl px-4 py-2.5 font-bold bg-white text-sm min-w-[160px] shadow-sm"
              value={estado}
              onChange={() => {}}
            >
              <option>Minas Gerais (MG)</option>
            </select>
            <a href="/supermercados" className="hidden sm:inline-flex bg-white border border-zinc-200 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-zinc-50 shadow-sm">
              Ver todos
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {markets.map((m) => (
            <div key={m.slug} className="bg-white border border-zinc-200 rounded-3xl p-5 hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl ${marketColor(m.slug)} text-white flex items-center justify-center font-display font-extrabold text-sm shrink-0 shadow-sm`}
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    {marketAbbr(m.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-extrabold leading-none truncate text-zinc-900" style={{ fontFamily: "var(--font-nunito)" }}>
                      {m.name}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">{m.city}</div>
                  </div>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="text-[11px] bg-zinc-50 border border-zinc-200/80 px-2.5 py-0.5 rounded-full font-mono text-zinc-600">
                    #{m.slug}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-600 font-bold">✓ Etiquetas Compatíveis</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. IDENTIDADE VISUAL & BANNERS */}
      <BrandAndBannersSection />

      
      {/* 9. SEÇÃO BAIXAR APK COM QR CODE */}
      <section id="baixar" className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-[#1B8C42] rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Download Oficial Direto
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-zinc-900 mt-4 tracking-tight" style={{ fontFamily: "var(--font-nunito)" }}>
              Baixe o Fechou o Carrinho
            </h2>
            <p className="text-zinc-600 mt-3 text-base leading-relaxed">
              Instale agora e leve para sua próxima ida ao supermercado. O arquivo é leve, seguro e instala em segundos.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="/downloads/fechouocarrinho.apk"
                className="bg-[#1B8C42] text-white text-center py-4 rounded-2xl font-display font-extrabold text-xl hover:bg-emerald-700 transition flex items-center justify-center gap-3 shadow-lg shadow-emerald-700/20 active:scale-[0.98]"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                  <path d="M12 15V3M12 15l-4-4M12 15l4-4" />
                  <path d="M2 17l1 4h18l1-4" />
                </svg>
                Baixar APK Gratuito (v1.0.4)
              </a>

              <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 leading-relaxed">
                <span className="font-bold">Como instalar:</span> Toque em <b>Abrir</b> após o download e depois em <b>Instalar</b>. Se o Android perguntar, permita <b>“Instalar de fontes desconhecidas”</b> apenas para este arquivo. É 100% seguro e rápido.
              </div>
            </div>

            {/* 3 Steps */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-center">
              <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-3.5">
                <div className="w-7 h-7 mx-auto rounded-full bg-white border flex items-center justify-center font-bold text-zinc-800">1</div>
                <div className="mt-1.5 font-bold text-zinc-900">Baixar</div>
                <span className="text-[10px] text-zinc-500">49MB</span>
              </div>
              <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-3.5">
                <div className="w-7 h-7 mx-auto rounded-full bg-white border flex items-center justify-center font-bold text-zinc-800">2</div>
                <div className="mt-1.5 font-bold text-zinc-900">Permitir</div>
                <span className="text-[10px] text-zinc-500">Segurança Android</span>
              </div>
              <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-3.5">
                <div className="w-7 h-7 mx-auto rounded-full bg-white border flex items-center justify-center font-bold text-zinc-800">3</div>
                <div className="mt-1.5 font-bold text-zinc-900">Instalar</div>
                <span className="text-[10px] text-zinc-500">Pronto para usar</span>
              </div>
            </div>
          </div>

          {/* QR Code Card */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-64 h-64 bg-white border border-zinc-200 rounded-[2rem] p-5 shadow-2xl flex flex-col items-center justify-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://fechouocarrinho.site/downloads/fechouocarrinho.apk"
                alt="QR Code para baixar o app"
                className="w-48 h-48 rounded-xl"
              />
              <span className="text-xs font-bold mt-2 text-zinc-700">Aponte a câmera do celular</span>
            </div>
            <p className="text-xs text-zinc-500 mt-4 text-center max-w-[280px]">
              Escaneie o QR Code com a câmera do celular para baixar o APK diretamente no aparelho.
            </p>
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <FaqSection />

      {/* 11. FOOTER */}
      <footer className="border-t border-zinc-200 py-12 bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8 text-sm">
          <div>
            <div className="font-display font-extrabold flex items-center gap-2.5 text-lg" style={{ fontFamily: "var(--font-nunito)" }}>
              <div className="w-8 h-8 rounded-xl bg-[#1B8C42] flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12l5 5l10 -10" /></svg>
              </div>
              fechou o carrinho
            </div>
            <p className="text-zinc-500 mt-3 max-w-sm leading-relaxed text-xs sm:text-sm">
              Controle simples do total da sua compra. Aponte para a etiqueta, some os itens e vá ao caixa com total tranquilidade.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Servidores ativos • APK v1.0.4 disponível</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-10 text-sm">
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-zinc-900">Navegação</span>
              <a href="#como-funciona" className="text-zinc-600 hover:text-[#111827]">Como funciona</a>
              <a href="#simulador" className="text-zinc-600 hover:text-[#111827]">Simulador</a>
              <a href="#supermercados" className="text-zinc-600 hover:text-[#111827]">Supermercados</a>
                            <a href="/marca" className="text-zinc-600 hover:text-[#111827]">Identidade & Banners</a>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-zinc-900">Aplicativo</span>
              <a href="/downloads/fechouocarrinho.apk" className="text-zinc-600 hover:text-[#111827]">Baixar APK (Android)</a>
              <a href="/version.json" target="_blank" className="text-zinc-600 hover:text-[#111827]">Notas de Atualização</a>
              <a href="/privacidade" className="text-zinc-600 hover:text-[#111827]">Política de Privacidade</a>
              <a href="#ajuda" className="text-zinc-600 hover:text-[#111827]">Perguntas Frequentes</a>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-zinc-900">Contato & Suporte</span>
              <a href="mailto:contato@fechouocarrinho.site" className="text-zinc-600 hover:text-[#111827]">contato@fechouocarrinho.site</a>
              <span className="text-zinc-400 text-xs mt-3">© 2026 Fechou o Carrinho.<br />Todos os direitos reservados.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
