"use client";

import { useState } from "react";

type MockupScreenKey = "dashboard" | "scanner" | "fechado";

interface ScreenConfig {
  key: MockupScreenKey;
  label: string;
  iconSvg: React.ReactNode;
  file: string;
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
    file: "/mockups/mockup_01_home_dashboard.svg",
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
    file: "/mockups/mockup_02_scanner_ocr.svg",
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
    file: "/mockups/mockup_03_carrinho_fechado.svg",
    badgeText: "Economia R$ 34",
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
        <div className="relative w-[305px] sm:w-[325px] h-[640px] sm:h-[660px] bg-[#111827] rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-4 border-zinc-800 flex flex-col">
          {/* Dynamic Island / Speaker Pill */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
            <div className="w-24 h-4 bg-[#111827] rounded-full flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700/60" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
            </div>
          </div>

          {/* Screen Content */}
          <div className="w-full h-full bg-[#FFF8F0] rounded-[38px] overflow-hidden relative flex flex-col border border-zinc-200">
            {/* Smooth transition between SVG mockups */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <img
                key={current.file}
                src={current.file}
                alt={current.label}
                className="w-full h-full object-contain animate-spring-modal"
              />
            </div>
          </div>
        </div>

        {/* FLOATING INTERACTIVE BADGE TOP-RIGHT */}
        <div className="hidden sm:flex absolute -right-6 top-16 bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-2xl p-3.5 shadow-xl items-center gap-3 animate-spring-toast">
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
        <div className="hidden sm:flex absolute -left-6 bottom-20 bg-[#111827]/95 backdrop-blur-md text-white border border-zinc-700 rounded-2xl px-4 py-2.5 shadow-xl items-center gap-2.5 animate-spring-toast">
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
