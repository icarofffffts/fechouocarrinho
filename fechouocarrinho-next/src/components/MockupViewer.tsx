"use client";

const SCREENS = [
  "mockup_01_home_dashboard.svg",
  "mockup_02_scanner_ocr.svg",
  "mockup_03_carrinho_fechado.svg",
  "mockup_04_comparador_mercados.svg",
  "mockup_05_widgets_android.svg",
  "mockup_06_aba_listas.svg",
  "mockup_07_aba_perfil.svg",
  "mockup_08_perfil_mercados.svg",
  "mockup_09_perfil_historico.svg",
  "mockup_10_perfil_configuracoes.svg",
];

export default function MockupViewer() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="font-display font-extrabold text-3xl" style={{ fontFamily: "var(--font-nunito)" }}>Telas do app</h2>
      <p className="text-zinc-600 mt-2 max-w-2xl">Conheca as 10 telas do Fechou o Carrinho.</p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
        {SCREENS.map((s) => (
          <div key={s} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
            <img src={`/mockups/${s}`} alt={s} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </section>
  );
}
