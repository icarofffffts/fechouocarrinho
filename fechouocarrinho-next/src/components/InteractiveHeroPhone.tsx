"use client";

import { useState } from "react";

type MockupScreenKey = "dashboard" | "scanner" | "fechado";

interface ScreenConfig {
  key: MockupScreenKey;
  label: string;
  iconSvg: React.ReactNode;
  badgeText: string;
  badgeSubtext: string;
}

const SCREENS: ScreenConfig[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    iconSvg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    badgeText: "R$ 142,80",
    badgeSubtext: "Total da compra em tempo real",
  },
  {
    key: "scanner",
    label: "Scanner OCR",
    iconSvg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    badgeText: "100% Offline",
    badgeSubtext: "Leitura rápida direto na prateleira",
  },
  {
    key: "fechado",
    label: "Carrinho",
    iconSvg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    badgeText: "Economia R$ 27,60",
    badgeSubtext: "Sem susto na esteira do caixa",
  },
];

export default function InteractiveHeroPhone() {
  const [activeScreen, setActiveScreen] = useState<MockupScreenKey>("dashboard");
  const current = SCREENS.find((s) => s.key === activeScreen) || SCREENS[0];

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* SCREEN SWITCHER PILL */}
      <div className="mb-4 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-200/80 shadow-md">
        {SCREENS.map((s) => {
          const isActive = s.key === activeScreen;
          return (
            <button
              key={s.key}
              onClick={() => setActiveScreen(s.key)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                isActive
                  ? "bg-[#111827] text-white shadow-sm scale-[1.02]"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70"
              }`}
            >
              <span className={isActive ? "text-[#FF6B00]" : "text-zinc-400"}>
                {s.iconSvg}
              </span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* PHONE CHASSIS */}
      <div className="relative group">
        {/* Glow ambient background */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 via-orange-500/15 to-transparent rounded-[54px] blur-2xl opacity-70 pointer-events-none" />

        {/* Outer Phone Border */}
        <div className="relative w-[310px] sm:w-[330px] h-[640px] sm:h-[660px] bg-[#111827] rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-4 border-zinc-800 flex flex-col">
          {/* Dynamic Island / Speaker Pill */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
            <div className="w-24 h-4 bg-[#111827] rounded-full flex items-center justify-between px-3 shadow-inner">
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
            </div>
          </div>

          {/* Screen Content: Pure CSS Native Rendered */}
          <div className="w-full h-full bg-[#FFF8F0] rounded-[38px] overflow-hidden relative flex flex-col border border-zinc-200 text-[#111827] font-sans">
            {/* Status Bar */}
            <div className="pt-2 px-6 flex justify-between items-center text-[11px] font-bold text-zinc-800 shrink-0 select-none z-20">
              <span>9:41</span>
              <div className="flex items-center gap-1.5 text-zinc-700">
                <span>5G</span>
                <span className="w-4 h-2 rounded-sm border border-zinc-700 p-0.5 inline-flex items-center">
                  <span className="w-full h-full bg-zinc-800 rounded-2xs" />
                </span>
              </div>
            </div>

            {/* TAB 1: DASHBOARD */}
            {activeScreen === "dashboard" && (
              <div className="flex-1 flex flex-col overflow-y-auto px-3.5 pt-1.5 pb-16 text-left">
                {/* Header card */}
                <div className="bg-[#1B8C42] text-white p-3.5 rounded-2xl shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#1B8C42] font-bold text-xs shadow-sm">
                      FC
                    </div>
                    <div>
                      <div className="font-extrabold text-sm leading-tight">fechou o carrinho</div>
                      <div className="text-[10px] text-white/80">olá, bora às compras?</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded-full font-bold">
                    BH ▾
                  </span>
                </div>

                {/* Budget Card */}
                <div className="bg-white rounded-2xl p-3.5 mt-2.5 border border-zinc-200/80 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Orçamento da compra
                  </span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-2xl font-black text-zinc-900 tracking-tight">R$ 142,80</span>
                    <span className="text-[11px] text-zinc-500 font-semibold">meta R$ 200,00</span>
                  </div>
                  <div className="w-full bg-zinc-100 rounded-full h-2 mt-2 overflow-hidden">
                    <div className="bg-[#1B8C42] h-full rounded-full transition-all duration-500" style={{ width: "71%" }} />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-[#1B8C42] font-bold">
                    <span>71% da meta</span>
                    <span>R$ 57,20 restantes</span>
                  </div>
                </div>

                {/* Items Title */}
                <div className="flex justify-between items-center mt-3 px-1 text-xs font-bold text-zinc-700">
                  <span>Itens no carrinho</span>
                  <span className="text-[10px] text-zinc-400">4 itens</span>
                </div>

                {/* Items List */}
                <div className="flex flex-col gap-1.5 mt-1.5">
                  {[
                    { name: "Arroz Integral 5kg", qtd: "1 un", val: "R$ 28,90", checked: true },
                    { name: "Feijão Carioca 1kg", qtd: "2 un", val: "R$ 7,49", checked: true },
                    { name: "Leite Integral 1L", qtd: "4 un", val: "R$ 19,96", checked: false },
                    { name: "Café Torrado 500g", qtd: "1 un", val: "R$ 18,50", checked: false },
                  ].map((it, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-2 rounded-xl border text-xs transition ${
                        it.checked
                          ? "bg-white/60 border-zinc-200/60 opacity-60"
                          : "bg-white border-zinc-200/90 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                            it.checked ? "bg-[#1B8C42] text-white" : "border border-zinc-300"
                          }`}
                        >
                          {it.checked && "✓"}
                        </div>
                        <div>
                          <div className={`font-bold ${it.checked ? "line-through text-zinc-500" : "text-zinc-800"}`}>
                            {it.name}
                          </div>
                          <div className="text-[10px] text-zinc-400">{it.qtd}</div>
                        </div>
                      </div>
                      <span className="font-extrabold text-zinc-900">{it.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: SCANNER OCR */}
            {activeScreen === "scanner" && (
              <div className="flex-1 bg-zinc-950 flex flex-col justify-between p-4 relative overflow-hidden text-center text-white">
                {/* Shelf photo simulation background */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-zinc-900/60 to-black/90 pointer-events-none" />

                {/* Top Hint */}
                <div className="relative z-10 pt-2 flex flex-col items-center">
                  <span className="bg-[#1B8C42] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    100% Offline
                  </span>
                  <p className="text-[11px] text-zinc-300 mt-2 font-medium">
                    Aponte para a etiqueta na prateleira
                  </p>
                </div>

                {/* Viewfinder Frame with 4 green corners & laser */}
                <div className="relative z-10 w-52 h-40 mx-auto my-auto border-2 border-transparent relative flex items-center justify-center">
                  {/* Corners */}
                  <span className="absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 border-[#1B8C42] rounded-tl-lg" />
                  <span className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-[#1B8C42] rounded-tr-lg" />
                  <span className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-[#1B8C42] rounded-bl-lg" />
                  <span className="absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 border-[#1B8C42] rounded-br-lg" />

                  {/* Sweeping Laser Line */}
                  <div className="absolute inset-x-2 h-0.5 bg-[#FF6B00] shadow-[0_0_12px_#FF6B00] animate-pulse" style={{ top: "45%" }} />

                  {/* Detected tag simulation */}
                  <div className="bg-white/95 text-zinc-900 px-3 py-2 rounded-xl text-center shadow-lg border border-zinc-300">
                    <span className="text-[9px] font-bold uppercase text-zinc-500 block">Preço Detectado</span>
                    <span className="text-lg font-black text-[#FF6B00] leading-none">R$ 18,50</span>
                    <span className="text-[8px] text-zinc-600 block mt-0.5">Café Torrado 500g</span>
                  </div>
                </div>

                {/* Bottom Shutter Controls */}
                <div className="relative z-10 pb-4 flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-lg shadow-orange-500/40 active:scale-95 transition cursor-pointer">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-zinc-400">Leitura instantânea em 1s</span>
                </div>
              </div>
            )}

            {/* TAB 3: CARRINHO FECHADO */}
            {activeScreen === "fechado" && (
              <div className="flex-1 bg-gradient-to-b from-[#1B8C42] to-[#146B32] p-4 flex flex-col justify-between text-white text-center">
                <div className="pt-4 flex flex-col items-center">
                  {/* Celebration Check Badge */}
                  <div className="w-16 h-16 rounded-full bg-white text-[#1B8C42] flex items-center justify-center text-3xl font-black shadow-xl shadow-emerald-950/20 mb-2">
                    ✓
                  </div>
                  <h3 className="font-extrabold text-xl leading-tight">Fechou o Carrinho!</h3>
                  <p className="text-xs text-emerald-100 mt-1">Sua compra está calculada sem surpresas.</p>
                </div>

                {/* White Summary Card */}
                <div className="bg-white text-zinc-900 rounded-2xl p-4 shadow-xl text-left border border-white/20">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Calculado</span>
                  <div className="text-3xl font-black text-zinc-900 mt-0.5 tracking-tight">R$ 189,40</div>
                  <div className="text-xs text-zinc-500 mt-0.5">12 itens · Supermercados BH</div>

                  <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1B8C42]">✓ Economia: R$ 27,60</span>
                    <span className="text-[11px] text-zinc-400">Meta: R$ 200,00</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pb-2">
                  <button className="flex-1 py-3 bg-white text-zinc-900 font-bold rounded-xl text-xs shadow-md">
                    Compartilhar
                  </button>
                  <button className="flex-1 py-3 bg-[#FF6B00] text-white font-bold rounded-xl text-xs shadow-md shadow-orange-500/30">
                    Finalizar
                  </button>
                </div>
              </div>
            )}

            {/* Fixed Bottom Nav Bar (for Dashboard tab) */}
            {activeScreen === "dashboard" && (
              <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-zinc-200/80 px-6 py-2.5 flex items-center justify-between text-zinc-400 text-[10px] font-semibold">
                <span className="text-[#1B8C42] font-bold flex flex-col items-center">
                  <span>Home</span>
                </span>
                <span className="flex flex-col items-center">
                  <span>Listas</span>
                </span>
                {/* Center FAB */}
                <div className="w-10 h-10 rounded-full bg-[#FF6B00] text-white flex items-center justify-center -mt-5 shadow-md shadow-orange-500/30">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span className="flex flex-col items-center">
                  <span>Carrinho</span>
                </span>
                <span className="flex flex-col items-center">
                  <span>Perfil</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* FLOATING INTERACTIVE BADGE TOP-RIGHT */}
        <div className="hidden sm:flex absolute -right-6 top-16 bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl p-3.5 shadow-xl items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 text-[#1B8C42] flex items-center justify-center font-bold text-lg">
            ✓
          </div>
          <div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              {current.badgeSubtext}
            </div>
            <div className="font-display font-extrabold text-lg text-zinc-900" style={{ fontFamily: "var(--font-nunito)" }}>
              {current.badgeText}
            </div>
          </div>
        </div>

        {/* FLOATING OFFLINE PILL BOTTOM-LEFT */}
        <div className="hidden sm:flex absolute -left-6 bottom-20 bg-[#111827]/95 backdrop-blur-md text-white border border-zinc-700 rounded-2xl px-4 py-2.5 shadow-xl items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-xs font-bold leading-tight">
            <span>OCR 100% Offline</span>
            <span className="block text-[10px] font-normal text-zinc-400">Zero internet necessária</span>
          </div>
        </div>
      </div>
    </div>
  );
}
