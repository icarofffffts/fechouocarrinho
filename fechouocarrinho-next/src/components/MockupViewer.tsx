"use client";

import { useState } from "react";

interface MockupItem {
  id: string;
  file: string;
  title: string;
  category: "fluxo" | "perfil" | "onboarding" | "sync";
  categoryLabel: string;
  description: string;
}

const SCREENS: MockupItem[] = [
  {
    id: "01",
    file: "mockup_01_home_dashboard.svg",
    title: "01 · Home Dashboard",
    category: "fluxo",
    categoryLabel: "Fluxo Principal",
    description: "Tela inicial com total em tempo real, economia do mês e atalho rápido do scanner.",
  },
  {
    id: "02",
    file: "mockup_02_scanner_ocr.svg",
    title: "02 · Scanner OCR ao Vivo",
    category: "fluxo",
    categoryLabel: "Fluxo Principal",
    description: "Visor com cantoneiras verdes #1B8C42, mira laranja e leitura instantânea sem internet.",
  },
  {
    id: "03",
    file: "mockup_03_carrinho_fechado.svg",
    title: "03 · Carrinho Fechado",
    category: "fluxo",
    categoryLabel: "Fluxo Principal",
    description: "Conferência final dos itens e fechamento com valor exato antes de passar no caixa.",
  },
  {
    id: "04",
    file: "mockup_04_comparador_mercados.svg",
    title: "04 · Comparador de Mercados",
    category: "fluxo",
    categoryLabel: "Fluxo Principal",
    description: "Comparação de preços entre EPA, Mart Minas, Supernosso e BH Supermercados.",
  },
  {
    id: "05",
    file: "mockup_05_widgets_android.svg",
    title: "05 · Widgets Android",
    category: "fluxo",
    categoryLabel: "Fluxo Principal",
    description: "Widgets de tela inicial do Android com total acumulado e atalho de escaneamento.",
  },
  {
    id: "06",
    file: "mockup_06_aba_listas.svg",
    title: "06 · Aba Listas de Compras",
    category: "perfil",
    categoryLabel: "Listas & Perfil",
    description: "Gerenciamento de listas organizadas por mercado com check-off ao adicionar ao carrinho.",
  },
  {
    id: "07",
    file: "mockup_07_aba_perfil.svg",
    title: "07 · Aba Perfil do Usuário",
    category: "perfil",
    categoryLabel: "Listas & Perfil",
    description: "Painel de controle com status offline, métricas de economia e links de configuração.",
  },
  {
    id: "08",
    file: "mockup_08_perfil_mercados.svg",
    title: "08 · Meus Mercados Favoritos",
    category: "perfil",
    categoryLabel: "Listas & Perfil",
    description: "Seleção e fixação de redes e filiais de supermercados mais visitadas.",
  },
  {
    id: "09",
    file: "mockup_09_perfil_historico.svg",
    title: "09 · Histórico de Compras",
    category: "perfil",
    categoryLabel: "Listas & Perfil",
    description: "Linha do tempo com compras passadas, gráficos mensais e comparação de gastos.",
  },
  {
    id: "10",
    file: "mockup_10_perfil_configuracoes.svg",
    title: "10 · Configurações do App",
    category: "perfil",
    categoryLabel: "Listas & Perfil",
    description: "Ajustes de preferências, sensibilidade do OCR, vibração e tema visual.",
  },
  {
    id: "11",
    file: "mockup_11_splash_onboarding.svg",
    title: "11 · Splash & Boas-vindas",
    category: "onboarding",
    categoryLabel: "Onboarding & Edição",
    description: "Primeira abertura do app apresentando os pilares de total sem sustos e funcionamento 100% offline.",
  },
  {
    id: "12",
    file: "mockup_12_selecao_mercado.svg",
    title: "12 · Seleção Rápida de Mercado",
    category: "onboarding",
    categoryLabel: "Onboarding & Edição",
    description: "Troca ágil de mercado ativo na Home com filtro por estado e sugestão de novos estabelecimentos.",
  },
  {
    id: "13",
    file: "mockup_13_adicionar_manual.svg",
    title: "13 · Adicionar Item Manual",
    category: "onboarding",
    categoryLabel: "Onboarding & Edição",
    description: "Formulário rápido para produtos sem etiqueta legível, pesáveis ou itens de feira.",
  },
  {
    id: "14",
    file: "mockup_14_detalhes_item_ocr.svg",
    title: "14 · Detalhes do Item Lido",
    category: "onboarding",
    categoryLabel: "Onboarding & Edição",
    description: "Card de confirmação pós-escaneamento para ajustar quantidade e conferir o preço detectado.",
  },
  {
    id: "15",
    file: "mockup_15_recibo_compartilhar.svg",
    title: "15 · Recibo & Compartilhar",
    category: "onboarding",
    categoryLabel: "Onboarding & Edição",
    description: "Comprovante digital resumido pronto para exportar em PDF ou compartilhar via WhatsApp.",
  },
  {
    id: "16",
    file: "mockup_16_auth_cadastro.svg",
    title: "16 · Login / Cadastro Opcional",
    category: "sync",
    categoryLabel: "Conta & Sincronização",
    description: "Autenticação 100% opcional com Google em 1 toque, e-mail/senha ou botão destacado 'Pular e usar offline'.",
  },
  {
    id: "17",
    file: "mockup_17_auth_sincronizacao.svg",
    title: "17 · Sincronização Familiar",
    category: "sync",
    categoryLabel: "Conta & Sincronização",
    description: "Painel em tempo real para sincronizar compras em família com código de 6 dígitos e status de backup em nuvem.",
  },
];

type CategoryFilter = "all" | "fluxo" | "perfil" | "onboarding" | "sync";

export default function MockupViewer() {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [selectedMockup, setSelectedMockup] = useState<MockupItem | null>(null);

  const filteredScreens = filter === "all"
    ? SCREENS
    : SCREENS.filter((s) => s.category === filter);

  return (
    <section id="telas" className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#FFF8F0] border border-emerald-200 text-[#1B8C42] rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
            17 Telas Oficiais • 100% Vetorial
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3" style={{ fontFamily: "var(--font-nunito)" }}>
            Galeria Completa de Telas do App
          </h2>
          <p className="text-zinc-600 mt-2 max-w-2xl text-base">
            Design system oficial do <b>fechou o carrinho</b>. Todas as 17 telas desenhadas em alta precisão vetorial (SVG), sem emojis e seguindo a paleta verde (#1B8C42) e laranja (#FF6B00).
          </p>
        </div>

        {/* Action Link */}
        <div className="flex items-center gap-3">
          <a
            href="/mockups/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold bg-white border border-zinc-200 px-4 py-2.5 rounded-xl hover:bg-zinc-50 transition shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
            Abrir Showcase Interativo
          </a>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="mt-8 flex flex-wrap gap-2 border-b border-zinc-200 pb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            filter === "all"
              ? "bg-[#111827] text-white shadow-sm"
              : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
          }`}
        >
          Todas as Telas (17)
        </button>
        <button
          onClick={() => setFilter("fluxo")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            filter === "fluxo"
              ? "bg-[#1B8C42] text-white shadow-sm"
              : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
          }`}
        >
          Fluxo Principal & Scanner (5)
        </button>
        <button
          onClick={() => setFilter("perfil")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            filter === "perfil"
              ? "bg-[#1B8C42] text-white shadow-sm"
              : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
          }`}
        >
          Listas & Perfil (5)
        </button>
        <button
          onClick={() => setFilter("onboarding")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            filter === "onboarding"
              ? "bg-[#1B8C42] text-white shadow-sm"
              : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
          }`}
        >
          Onboarding & Edição (5)
        </button>
        <button
          onClick={() => setFilter("sync")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            filter === "sync"
              ? "bg-[#FF6B00] text-white shadow-sm"
              : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
          }`}
        >
          Conta & Sincronização (2)
        </button>
      </div>

      {/* SCREENS GRID */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredScreens.map((s) => (
          <div
            key={s.id}
            className="group bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            onClick={() => setSelectedMockup(s)}
          >
            <div className="relative bg-zinc-100 p-3 aspect-[9/18] overflow-hidden flex items-center justify-center">
              <img
                src={`/mockups/${s.file}`}
                alt={s.title}
                className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-white/95 text-zinc-900 px-4 py-2 rounded-full font-bold text-xs shadow-lg flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  Ver em tamanho real
                </span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-[#1B8C42] uppercase tracking-wider">
                    {s.categoryLabel}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    #{s.id}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-base text-zinc-900 mt-1" style={{ fontFamily: "var(--font-nunito)" }}>
                  {s.title}
                </h3>
                <p className="text-xs text-zinc-600 mt-1 line-clamp-2 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                <a
                  href={`/mockups/${s.file}`}
                  download={s.file}
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-semibold text-zinc-500 hover:text-[#1B8C42] inline-flex items-center gap-1"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Baixar SVG
                </a>
                <button
                  type="button"
                  className="text-xs font-bold text-[#1B8C42] hover:underline"
                >
                  Ampliar &rarr;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN PREVIEW MODAL */}
      {selectedMockup && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-spring-backdrop"
          onClick={() => setSelectedMockup(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl animate-spring-modal border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#1B8C42] uppercase tracking-wider">
                  {selectedMockup.categoryLabel}
                </span>
                <h3 className="font-display font-extrabold text-xl text-zinc-900 mt-0.5" style={{ fontFamily: "var(--font-nunito)" }}>
                  {selectedMockup.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMockup(null)}
                className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition"
                aria-label="Fechar modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-zinc-100 flex items-center justify-center">
              <img
                src={`/mockups/${selectedMockup.file}`}
                alt={selectedMockup.title}
                className="max-h-[68vh] w-auto rounded-2xl shadow-md border border-zinc-200"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
              <p className="text-xs text-zinc-600 leading-relaxed max-w-sm">
                {selectedMockup.description}
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={`/mockups/${selectedMockup.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-100 text-zinc-800 hover:bg-zinc-200 transition"
                >
                  Abrir SVG
                </a>
                <a
                  href={`/mockups/${selectedMockup.file}`}
                  download={selectedMockup.file}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1B8C42] text-white hover:bg-emerald-700 transition"
                >
                  Baixar Arquivo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
