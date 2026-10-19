import BrandAndBannersSection from "@/components/BrandAndBannersSection";
import MockupViewer from "@/components/MockupViewer";
import Link from "next/link";

export const metadata = {
  title: "Identidade Visual & Banners — Fechou o Carrinho",
  description: "Kit oficial de marca, logos vetoriais SVG, banners in-app, assets para Google Play e campanhas promocionais do fechou o carrinho.",
};

export default function MarcaPage() {
  return (
    <div className="bg-[#FFF8F0] min-h-screen text-[#111827]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1B8C42] flex items-center justify-center text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5l10 -10" /></svg>
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight" style={{ fontFamily: "var(--font-nunito)" }}>fechou o carrinho</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <Link href="/" className="hover:text-[#1B8C42] transition">Início</Link>
            <Link href="/como-funciona" className="hover:text-[#1B8C42] transition">Como funciona</Link>
            <Link href="/supermercados" className="hover:text-[#1B8C42] transition">Supermercados</Link>
            <Link href="/marca" className="text-[#1B8C42] font-bold">Identidade Visual & Banners</Link>
            <Link href="/#baixar" className="bg-[#111827] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-black transition">Baixar APK</Link>
          </nav>
          <Link href="/#baixar" className="md:hidden bg-[#1B8C42] text-white px-4 py-2 rounded-full font-bold text-sm">Baixar</Link>
        </div>
      </header>

      {/* HERO MARCA */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-6 text-center">
        <span className="inline-block bg-white border border-emerald-200 text-[#1B8C42] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
          Brand Guidelines & Media Kit
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-zinc-900 mt-4 tracking-tight" style={{ fontFamily: "var(--font-nunito)" }}>
          Identidade Visual & Banners
        </h1>
        <p className="text-zinc-600 mt-3 max-w-2xl mx-auto text-base sm:text-lg">
          Todos os recursos visuais oficiais do <b>fechou o carrinho</b>: logos em vetor SVG, paleta de cores, banners do app, peças para a Google Play Store e campanhas de divulgação.
        </p>
      </section>

      {/* BRAND & BANNERS */}
      <BrandAndBannersSection />

      {/* 17 MOCKUPS */}
      <MockupViewer />

      {/* FOOTER */}
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
            <div className="flex flex-col gap-2"><span className="font-bold">Navegação</span><Link href="/" className="text-zinc-600 hover:text-[#111827]">Início</Link><Link href="/como-funciona" className="text-zinc-600 hover:text-[#111827]">Como funciona</Link><Link href="/supermercados" className="text-zinc-600 hover:text-[#111827]">Supermercados</Link><Link href="/ajuda" className="text-zinc-600 hover:text-[#111827]">Ajuda</Link></div>
            <div className="flex flex-col gap-2"><span className="font-bold">Contato</span><a href="mailto:contato@fechouocarrinho.site" className="text-zinc-600 hover:text-[#111827]">contato@fechouocarrinho.site</a><span className="text-zinc-500 text-xs">© 2026 Fechou o Carrinho</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
