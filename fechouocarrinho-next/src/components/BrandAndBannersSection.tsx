"use client";

import { useState } from "react";

export default function BrandAndBannersSection() {
  const [activeTab, setActiveTab] = useState<"todos" | "logos" | "inapp" | "campanhas" | "playstore">("todos");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(hex);
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(null), 2000);
    }
  };

  const COLOR_TOKENS = [
    { name: "Verde Fechado (Primária)", hex: "#1B8C42", usage: "Botões principais, barras de topo, acerto e status total" },
    { name: "Laranja Acento (Ação)", hex: "#FF6B00", usage: "Scanner OCR, mira de captura, destaques de economia" },
    { name: "Creme Quente (Superfície)", hex: "#FFF8F0", usage: "Fundo suave do app, cartões secundários e conforto visual" },
    { name: "Grafite Escuro (Texto)", hex: "#111827", usage: "Textos de alto contraste, cartões dark e botões contrastantes" },
    { name: "Cinza Suave (Muted)", hex: "#6B7280", usage: "Legendas secundárias, contornos e metadados" },
  ];

  const LOGO_ITEMS = [
    {
      id: "logo-horizontal",
      title: "Logo Horizontal (Fundo Claro)",
      file: "/brand/logo-horizontal.svg",
      bgClass: "bg-white border-zinc-200",
      description: "Aplicação principal em sites, cabeçalhos, documentos e materiais com fundo branco ou creme.",
    },
    {
      id: "logo-horizontal-dark",
      title: "Logo Horizontal (Fundo Escuro)",
      file: "/brand/logo-horizontal-dark.svg",
      bgClass: "bg-[#111827] border-zinc-800 text-white",
      description: "Aplicação sobre fundos escuros, telas de login dark, banners noturnos e rodapés.",
    },
    {
      id: "logo-vertical",
      title: "Logo Vertical (Fundo Claro)",
      file: "/brand/logo-vertical.svg",
      bgClass: "bg-white border-zinc-200",
      description: "Aplicação empilhada para telas de abertura (Splash), cartões verticais e crachás.",
    },
    {
      id: "logo-vertical-dark",
      title: "Logo Vertical (Fundo Escuro)",
      file: "/brand/logo-vertical-dark.svg",
      bgClass: "bg-[#111827] border-zinc-800 text-white",
      description: "Versão empilhada para fundos escuros e telas de transição.",
    },
    {
      id: "logo-mark",
      title: "Brand Mark (Símbolo / Ícone)",
      file: "/brand/logo-mark.svg",
      bgClass: "bg-white border-zinc-200",
      description: "Ícone isolado da sacola com check do fechou o carrinho. Usado como favicon e avatar.",
    },
    {
      id: "logo-monochrome",
      title: "Logo Monocromático",
      file: "/brand/logo-monochrome.svg",
      bgClass: "bg-zinc-50 border-zinc-200",
      description: "Versão para impressões em preto e branco, recibos térmicos ou materiais sem cor.",
    },
  ];

  const IN_APP_BANNERS = [
    {
      id: "inapp-welcome",
      title: "Banner de Boas-vindas (720 × 240)",
      file: "/banners/inapp-banner-welcome-720x240.svg",
      tag: "In-App Onboarding",
      description: "Apresenta os 3 passos simples (Escolha o mercado, aponte e veja o total) na primeira abertura.",
    },
    {
      id: "inapp-scanner-tip",
      title: "Banner Dica de Scanner (720 × 200)",
      file: "/banners/inapp-banner-scanner-tip-720x200.svg",
      tag: "In-App Dicas",
      description: "Incentiva o escaneamento direto na prateleira sem necessidade de conexão com a internet.",
    },
    {
      id: "inapp-family-plan",
      title: "Banner Sincronização Familiar (720 × 200)",
      file: "/banners/inapp-banner-family-plan-720x200.svg",
      tag: "In-App Recursos",
      description: "Destaque para compartilhamento de listas em tempo real com familiares via código de 6 dígitos.",
    },
  ];

  const PLAY_STORE_ITEMS = [
    {
      title: "Feature Graphic Google Play (1024 × 500)",
      file: "/app-store/playstore-feature-graphic-1024x500.svg",
      aspect: "aspect-[1024/500]",
      description: "Capa oficial da loja Google Play destacando 'Seu total sem sustos no caixa' e funcionamento 100% offline.",
    },
    {
      title: "Screenshot 1 · Total em Tempo Real (1080 × 2400)",
      file: "/app-store/screenshot-1-total-tempo-real-1080x2400.svg",
      aspect: "aspect-[1080/2400]",
      description: "Captura da tela inicial com totalizador de compras e economia do mês.",
    },
    {
      title: "Screenshot 2 · Leitor de Etiquetas OCR (1080 × 2400)",
      file: "/app-store/screenshot-2-leitor-etiquetas-1080x2400.svg",
      aspect: "aspect-[1080/2400]",
      description: "Visor com mira laranja de alta sensibilidade para etiquetas do EPA, Zepa, BH e Mart Minas.",
    },
    {
      title: "Screenshot 3 · Funciona 100% Offline (1080 × 2400)",
      file: "/app-store/screenshot-3-funciona-offline-1080x2400.svg",
      aspect: "aspect-[1080/2400]",
      description: "Destaca o processamento local no celular, sem travamentos dentro do galpão de compras.",
    },
  ];

  return (
    <section id="marca" className="bg-[#FFF8F0] border-t border-zinc-200 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-[#1B8C42] rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Identidade Visual & Marketing Oficial
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl mt-3 tracking-tight" style={{ fontFamily: "var(--font-nunito)" }}>
              Logos, Banners & Campanhas
            </h2>
            <p className="text-zinc-600 mt-2 max-w-2xl text-base leading-relaxed">
              Aqui estão todos os banners promocionais, logotipos oficiais vetoriais, peças para Google Play e campanhas de redes sociais do <b>fechou o carrinho</b>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/brand/brand-tokens.json"
              download="brand-tokens.json"
              className="inline-flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-zinc-50 transition shadow-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Baixar Tokens JSON
            </a>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-zinc-200 pb-4">
          <button
            onClick={() => setActiveTab("todos")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === "todos"
                ? "bg-[#111827] text-white shadow-sm"
                : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
            }`}
          >
            Todos os Materiais
          </button>
          <button
            onClick={() => setActiveTab("logos")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === "logos"
                ? "bg-[#1B8C42] text-white shadow-sm"
                : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
            }`}
          >
            Logos Oficiais & Cores
          </button>
          <button
            onClick={() => setActiveTab("inapp")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === "inapp"
                ? "bg-[#1B8C42] text-white shadow-sm"
                : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
            }`}
          >
            Banners do Aplicativo (In-App)
          </button>
          <button
            onClick={() => setActiveTab("campanhas")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === "campanhas"
                ? "bg-[#FF6B00] text-white shadow-sm"
                : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
            }`}
          >
            Campanhas & Redes Sociais
          </button>
          <button
            onClick={() => setActiveTab("playstore")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === "playstore"
                ? "bg-[#111827] text-white shadow-sm"
                : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
            }`}
          >
            Google Play Store
          </button>
        </div>

        {/* 1. PALETA DE CORES & TOKENS */}
        {(activeTab === "todos" || activeTab === "logos") && (
          <div className="mt-12">
            <h3 className="font-display font-extrabold text-2xl text-zinc-900" style={{ fontFamily: "var(--font-nunito)" }}>
              Paleta Oficial de Cores (Design Tokens)
            </h3>
            <p className="text-zinc-600 text-sm mt-1">Toque em qualquer cor para copiar o código hexadecimal.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
              {COLOR_TOKENS.map((c) => (
                <div
                  key={c.hex}
                  onClick={() => copyToClipboard(c.hex)}
                  className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                >
                  <div
                    className="w-full h-16 rounded-xl shadow-inner border border-black/5 flex items-end justify-end p-2"
                    style={{ backgroundColor: c.hex }}
                  >
                    {copiedColor === c.hex && (
                      <span className="bg-white text-zinc-900 font-bold text-[10px] px-2 py-0.5 rounded-full shadow">
                        Copiado!
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <span className="font-mono font-bold text-xs text-zinc-800">{c.hex}</span>
                    <p className="font-bold text-xs text-zinc-900 mt-0.5">{c.name}</p>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-snug">{c.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. LOGOS OFICIAIS */}
        {(activeTab === "todos" || activeTab === "logos") && (
          <div className="mt-12">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-extrabold text-2xl text-zinc-900" style={{ fontFamily: "var(--font-nunito)" }}>
                  Logotipos Oficiais (SVG Vetorial)
                </h3>
                <p className="text-zinc-600 text-sm mt-1">Todos em SVG escalável, prontos para uso em alta resolução.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {LOGO_ITEMS.map((item) => (
                <div key={item.id} className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className={`w-full h-36 rounded-2xl border flex items-center justify-center p-6 ${item.bgClass}`}>
                      <img src={item.file} alt={item.title} className="max-h-20 max-w-[85%] object-contain" />
                    </div>
                    <h4 className="font-display font-extrabold text-base text-zinc-900 mt-4" style={{ fontFamily: "var(--font-nunito)" }}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-zinc-400">.svg vetorial</span>
                    <a
                      href={item.file}
                      download
                      className="inline-flex items-center gap-1.5 bg-[#1B8C42] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Baixar SVG
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. BANNERS IN-APP */}
        {(activeTab === "todos" || activeTab === "inapp") && (
          <div className="mt-14">
            <h3 className="font-display font-extrabold text-2xl text-zinc-900" style={{ fontFamily: "var(--font-nunito)" }}>
              Banners Promocionais In-App (Dentro do Aplicativo)
            </h3>
            <p className="text-zinc-600 text-sm mt-1">Banners desenhados para a tela inicial, dicas e recursos de família do app mobile.</p>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {IN_APP_BANNERS.map((banner) => (
                <div key={banner.id} className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B00] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md">
                      {banner.tag}
                    </span>
                    <h4 className="font-display font-extrabold text-base text-zinc-900 mt-2" style={{ fontFamily: "var(--font-nunito)" }}>
                      {banner.title}
                    </h4>
                    <div className="mt-3 bg-zinc-50 border border-zinc-100 rounded-2xl overflow-hidden p-2 flex items-center justify-center">
                      <img src={banner.file} alt={banner.title} className="w-full h-auto rounded-xl shadow-sm" />
                    </div>
                    <p className="text-xs text-zinc-600 mt-3 leading-relaxed">
                      {banner.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <a
                      href={banner.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-zinc-500 hover:text-[#1B8C42]"
                    >
                      Visualizar
                    </a>
                    <a
                      href={banner.file}
                      download
                      className="inline-flex items-center gap-1.5 bg-[#1B8C42] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Baixar SVG
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. GOOGLE PLAY STORE ASSETS */}
        {(activeTab === "todos" || activeTab === "playstore") && (
          <div className="mt-14">
            <h3 className="font-display font-extrabold text-2xl text-zinc-900" style={{ fontFamily: "var(--font-nunito)" }}>
              Peças Oficiais da Google Play Store
            </h3>
            <p className="text-zinc-600 text-sm mt-1">Materiais formatados nas especificações exatas exigidas pela Google Play Console.</p>

            <div className="mt-6 space-y-6">
              {/* Feature graphic 1024x500 */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B8C42] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                      Play Store Header
                    </span>
                    <h4 className="font-display font-extrabold text-lg text-zinc-900 mt-1" style={{ fontFamily: "var(--font-nunito)" }}>
                      {PLAY_STORE_ITEMS[0].title}
                    </h4>
                  </div>
                  <a
                    href={PLAY_STORE_ITEMS[0].file}
                    download
                    className="inline-flex items-center gap-1.5 bg-[#1B8C42] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition self-start sm:self-auto"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Baixar 1024 × 500
                  </a>
                </div>
                <div className="mt-4 rounded-2xl overflow-hidden bg-zinc-900 shadow-lg">
                  <img src={PLAY_STORE_ITEMS[0].file} alt={PLAY_STORE_ITEMS[0].title} className="w-full h-auto" />
                </div>
                <p className="text-xs text-zinc-600 mt-3">{PLAY_STORE_ITEMS[0].description}</p>
              </div>

              {/* Screenshots 1080x2400 */}
              <div className="grid md:grid-cols-3 gap-6">
                {PLAY_STORE_ITEMS.slice(1).map((shot) => (
                  <div key={shot.file} className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md">
                        Screenshot 1080 × 2400
                      </span>
                      <h4 className="font-display font-extrabold text-sm text-zinc-900 mt-2" style={{ fontFamily: "var(--font-nunito)" }}>
                        {shot.title}
                      </h4>
                      <div className="mt-3 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-zinc-100">
                        <img src={shot.file} alt={shot.title} className="w-full h-auto" />
                      </div>
                      <p className="text-xs text-zinc-600 mt-2 leading-relaxed">{shot.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-zinc-400">Play Store Vertical</span>
                      <a
                        href={shot.file}
                        download
                        className="inline-flex items-center gap-1 bg-[#111827] text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-black transition"
                      >
                        Baixar
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. CAMPANHAS DE MARKETING & REDES SOCIAIS */}
        {(activeTab === "todos" || activeTab === "campanhas") && (
          <div className="mt-14">
            <h3 className="font-display font-extrabold text-2xl text-zinc-900" style={{ fontFamily: "var(--font-nunito)" }}>
              Campanhas de Marketing & Redes Sociais
            </h3>
            <p className="text-zinc-600 text-sm mt-1">
              Peças criadas pela equipe de identidade visual para anúncios no Instagram, Facebook, banners horizontais e Stories.
            </p>

            <div className="mt-8 space-y-8">
              {/* BANNER 01 - CAMPANHA HORIZONTAL 1200x628 */}
              <article className="relative overflow-hidden rounded-[2rem] bg-[#1B8C42] p-8 md:p-12 text-white shadow-xl">
                <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                      Campanha Horizontal · 1200 × 628
                    </div>
                    <p className="font-mono text-xs uppercase tracking-widest text-emerald-200 mt-4">Compra mais leve</p>
                    <h3 className="font-display font-extrabold text-4xl md:text-6xl leading-[0.95] mt-2" style={{ fontFamily: "var(--font-nunito)" }}>
                      Seu total<br />sem sustos.
                    </h3>
                    <p className="text-emerald-100 text-base mt-4 max-w-md leading-relaxed">
                      Aponte para a etiqueta, registre cada preço e acompanhe a compra enquanto percorre o mercado.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href="/downloads/fechouocarrinho.apk"
                        className="bg-[#FF6B00] text-white px-6 py-3 rounded-xl font-display font-extrabold text-base hover:bg-orange-600 transition shadow-lg"
                        style={{ fontFamily: "var(--font-nunito)" }}
                      >
                        Baixar APK
                      </a>
                      <span className="text-xs text-emerald-200">100% Grátis & Offline</span>
                    </div>
                  </div>

                  {/* Visual card */}
                  <div className="bg-white rounded-3xl p-6 text-[#111827] shadow-2xl rotate-1 border-4 border-emerald-400/30">
                    <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Mire na etiqueta</div>
                    <div className="mt-3 border-2 border-dashed border-[#FF6B00] rounded-2xl p-5 bg-[#FFF8F0] text-center">
                      <span className="font-mono font-extrabold text-3xl text-zinc-900">R$ 7,89</span>
                      <span className="block text-[11px] font-bold text-[#1B8C42] mt-1">✓ Preço Reconhecido</span>
                    </div>
                    <div className="mt-4 bg-[#111827] text-white p-4 rounded-2xl flex items-center justify-between">
                      <span className="text-xs text-zinc-300">Total acumulado</span>
                      <strong className="font-display font-extrabold text-2xl text-emerald-400" style={{ fontFamily: "var(--font-nunito)" }}>R$ 53,28</strong>
                    </div>
                  </div>
                </div>
              </article>

              {/* POSTS QUADRADOS 1080x1080 EM GRID */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* BANNER 02 - POST OFFLINE 1080x1080 */}
                <article className="relative overflow-hidden rounded-[2rem] bg-[#FF6B00] p-8 md:p-10 text-white shadow-xl flex flex-col justify-between aspect-square">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                      Post Quadrado · 1080 × 1080
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <line x1="1" y1="1" x2="23" y2="23" />
                        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
                        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
                        <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
                        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                        <line x1="12" y1="20" x2="12.01" y2="20" />
                      </svg>
                    </div>
                  </div>

                  <div className="my-auto">
                    <div className="w-14 h-14 rounded-2xl bg-white text-[#FF6B00] flex items-center justify-center font-bold shadow-lg mb-6">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l5 5l10 -10" />
                      </svg>
                    </div>
                    <h3 className="font-display font-extrabold text-4xl sm:text-5xl leading-[0.95]" style={{ fontFamily: "var(--font-nunito)" }}>
                      O mercado<br />
                      pode ficar sem sinal.<br />
                      Sua lista, não.
                    </h3>
                  </div>

                  <div className="border-t border-white/25 pt-4 flex items-center justify-between text-sm">
                    <span className="font-bold">Funciona 100% Offline</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-white/80">fechou o carrinho</span>
                  </div>
                </article>

                {/* BANNER 03 - POST DE PRODUTO OCR 1080x1080 */}
                <article className="relative overflow-hidden rounded-[2rem] bg-[#111827] p-8 md:p-10 text-white shadow-xl flex flex-col justify-between aspect-square">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                      Post de Produto · 1080 × 1080
                    </span>
                    <span className="font-mono text-xs uppercase text-orange-400 font-bold">OCR Instantâneo</span>
                  </div>

                  <div className="my-auto">
                    <div className="bg-white/5 border border-white/15 rounded-3xl p-6 mb-6">
                      <div className="border-2 border-dashed border-[#FF6B00] rounded-2xl py-6 text-center">
                        <span className="font-mono text-xs uppercase text-zinc-400 tracking-widest block">preço lido na prateleira</span>
                        <span className="font-mono font-extrabold text-5xl text-white mt-1 block">R$ 7,89</span>
                        <span className="inline-block mt-3 bg-[#1B8C42] text-white text-xs font-bold px-3 py-1 rounded-full">
                          ✓ Adicionado ao carrinho
                        </span>
                      </div>
                    </div>
                    <h3 className="font-display font-extrabold text-4xl sm:text-5xl leading-tight" style={{ fontFamily: "var(--font-nunito)" }}>
                      Aponte. Capture. Some.
                    </h3>
                  </div>

                  <div className="border-t border-white/15 pt-4 flex items-center justify-between text-sm text-zinc-400">
                    <span>Sem digitar nada</span>
                    <span className="font-bold text-white">fechou o carrinho</span>
                  </div>
                </article>
              </div>

              {/* BANNER 04 - CAMPANHA DE PLANOS 1200x628 */}
              <article className="relative overflow-hidden rounded-[2rem] bg-[#111827] p-8 md:p-12 text-white shadow-xl">
                <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 items-center">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                      Campanha de Planos · 1200 × 628
                    </span>
                    <h3 className="font-display font-extrabold text-3xl md:text-5xl leading-[0.95] mt-4" style={{ fontFamily: "var(--font-nunito)" }}>
                      Um plano para cada carrinho.
                    </h3>
                    <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                      Comece 100% grátis e offline. Quando quiser sincronizar com a família, ative o plano compartilhado em um toque.
                    </p>
                    <a
                      href="#baixar"
                      className="mt-6 inline-flex items-center gap-2 bg-[#FF6B00] text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition"
                    >
                      Começar Grátis Agora
                    </a>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Plano Essencial */}
                    <div className="bg-white text-[#111827] rounded-3xl p-6 flex flex-col justify-between shadow-lg">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-[#1B8C42] uppercase tracking-wider">Para Começar</span>
                        <h4 className="font-display font-extrabold text-2xl mt-1" style={{ fontFamily: "var(--font-nunito)" }}>Essencial</h4>
                        <div className="font-display font-extrabold text-3xl text-zinc-900 mt-2" style={{ fontFamily: "var(--font-nunito)" }}>Grátis</div>
                        <ul className="mt-4 space-y-2 text-xs text-zinc-600 font-medium">
                          <li className="flex items-center gap-2"><span className="text-[#1B8C42] font-bold">✓</span> Lista de compras</li>
                          <li className="flex items-center gap-2"><span className="text-[#1B8C42] font-bold">✓</span> Leitura OCR sem internet</li>
                          <li className="flex items-center gap-2"><span className="text-[#1B8C42] font-bold">✓</span> Total em tempo real</li>
                          <li className="flex items-center gap-2"><span className="text-[#1B8C42] font-bold">✓</span> 100% Offline sem login</li>
                        </ul>
                      </div>
                      <span className="mt-6 text-[11px] font-bold text-[#1B8C42]">Sempre Grátis</span>
                    </div>

                    {/* Plano Família */}
                    <div className="bg-[#1B8C42] text-white rounded-3xl p-6 flex flex-col justify-between shadow-lg">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-emerald-200 uppercase tracking-wider">Para Compartilhar</span>
                        <h4 className="font-display font-extrabold text-2xl mt-1" style={{ fontFamily: "var(--font-nunito)" }}>Família</h4>
                        <div className="font-display font-extrabold text-3xl text-white mt-2" style={{ fontFamily: "var(--font-nunito)" }}>Em Breve</div>
                        <ul className="mt-4 space-y-2 text-xs text-emerald-100 font-medium">
                          <li className="flex items-center gap-2"><span className="text-[#FF6B00] font-bold">★</span> Sincronização em tempo real</li>
                          <li className="flex items-center gap-2"><span className="text-[#FF6B00] font-bold">★</span> Código familiar 6 dígitos</li>
                          <li className="flex items-center gap-2"><span className="text-[#FF6B00] font-bold">★</span> Histórico na nuvem</li>
                          <li className="flex items-center gap-2"><span className="text-[#FF6B00] font-bold">★</span> Comparador avançado</li>
                        </ul>
                      </div>
                      <span className="mt-6 text-[11px] font-bold text-emerald-200">Entre na lista de espera</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* BANNER 05 e 06 */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* BANNER 05 - AVISO PROMOCIONAL 1080x1080 */}
                <article className="relative overflow-hidden rounded-[2rem] bg-[#1B8C42] p-8 md:p-10 text-white shadow-xl flex flex-col justify-between aspect-square">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                      Aviso Promocional · 1080 × 1080
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                    </div>
                  </div>

                  <div className="my-auto">
                    <span className="font-mono text-xs uppercase text-emerald-200 tracking-wider">Novidade no app</span>
                    <h3 className="font-display font-extrabold text-3xl sm:text-5xl leading-[0.95] mt-2" style={{ fontFamily: "var(--font-nunito)" }}>
                      Promoção boa é promoção que entra na lista.
                    </h3>
                    <p className="text-emerald-100 text-sm mt-4 leading-relaxed">
                      Ative os avisos de ofertas dos seus supermercados favoritos e organize a próxima compra com tranquilidade.
                    </p>
                  </div>

                  <div className="border-t border-white/25 pt-4 flex items-center justify-between text-sm">
                    <span className="font-bold">EPA · Mart Minas · BH · Supernosso</span>
                    <span className="font-mono text-xs uppercase">fechou o carrinho</span>
                  </div>
                </article>

                {/* BANNER 06 - BANNER DE LANÇAMENTO 1080x1080 */}
                <article className="relative overflow-hidden rounded-[2rem] bg-white border border-zinc-200 p-8 md:p-10 text-[#111827] shadow-xl flex flex-col justify-between aspect-square">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest bg-zinc-100 px-3 py-1 rounded-full text-zinc-600">
                      Lançamento · 1080 × 1080
                    </span>
                    <span className="w-10 h-10 rounded-2xl bg-[#FF6B00] text-white flex items-center justify-center font-bold shadow-md">
                      ★
                    </span>
                  </div>

                  <div className="my-auto">
                    <span className="font-mono text-xs font-bold uppercase text-[#1B8C42] tracking-wider">Nova Versão 1.0.4</span>
                    <h3 className="font-display font-extrabold text-3xl sm:text-5xl leading-[0.95] mt-2 text-[#111827]" style={{ fontFamily: "var(--font-nunito)" }}>
                      Comece grátis.<br />
                      Continue no controle.
                    </h3>
                    <p className="text-zinc-600 text-sm mt-4 leading-relaxed">
                      Lista, scanner OCR inteligente e totalizador em tempo real em um só aplicativo sem anúncios chatos.
                    </p>
                  </div>

                  <div className="border-t border-zinc-100 pt-4 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Disponível para Android 8+</span>
                    <a
                      href="/downloads/fechouocarrinho.apk"
                      className="bg-[#111827] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition"
                    >
                      Baixar Agora
                    </a>
                  </div>
                </article>
              </div>

              {/* BANNER 07 - STORY VERTICAL 1080x1920 */}
              <article className="relative overflow-hidden rounded-[2rem] bg-[#F0E4D3] border border-amber-200 p-8 md:p-12 text-[#111827] shadow-xl max-w-xl mx-auto">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest bg-white/70 px-3 py-1 rounded-full text-zinc-700">
                    Story Vertical · 1080 × 1920
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#1B8C42] text-white flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12l5 5l10 -10" /></svg>
                  </div>
                </div>

                <div className="pt-10 pb-8 text-center sm:text-left">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B8C42]">Compra com clareza</span>
                  <h3 className="font-display font-extrabold text-4xl sm:text-5xl leading-[0.9] mt-3 tracking-tight" style={{ fontFamily: "var(--font-nunito)" }}>
                    Você compra.<br />
                    A lista faz<br />
                    as contas.
                  </h3>
                </div>

                {/* Card visual de carrinho fechado */}
                <div className="bg-[#1B8C42] text-white rounded-3xl p-6 shadow-xl mt-4">
                  <div className="flex items-center justify-between border-b border-emerald-400/40 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider">Total no Carrinho</span>
                    <span className="bg-white text-[#1B8C42] font-mono font-bold text-xs px-2.5 py-0.5 rounded-full">
                      18 ITENS
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-sm text-emerald-100">Valor a pagar</span>
                    <span className="font-display font-extrabold text-4xl" style={{ fontFamily: "var(--font-nunito)" }}>
                      R$ 147,82
                    </span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-emerald-400/30 flex items-center justify-between text-xs text-emerald-100">
                    <span>Economia estimada</span>
                    <strong className="text-white font-bold">R$ 23,40</strong>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <a
                    href="/downloads/fechouocarrinho.apk"
                    className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-8 py-3.5 rounded-2xl font-display font-extrabold text-base hover:bg-orange-600 transition shadow-lg"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    Arraste para cima para Baixar
                  </a>
                  <p className="text-[11px] text-zinc-500 mt-2">fechouocarrinho.site · 100% Gratuito</p>
                </div>
              </article>
            </div>
          </div>
        )}

        {/* FLOATING SONNER-STYLE TOAST FEEDBACK */}
        {copiedColor && (
          <div className="fixed bottom-6 right-6 z-50 animate-spring-toast bg-[#111827] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/15 flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
              ✓
            </span>
            <div className="text-xs">
              <span className="font-bold">Código copiado: </span>
              <span className="font-mono text-emerald-400 font-bold">{copiedColor}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
