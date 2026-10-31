import BrandAndBannersSection from "@/components/BrandAndBannersSection";
import MockupViewer from "@/components/MockupViewer";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Identidade Visual & Banners — Fechou o Carrinho",
  description:
    "Kit oficial de marca, logos vetoriais SVG, banners in-app, assets para Google Play e campanhas promocionais do fechou o carrinho.",
};

export default function MarcaPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0B2B1F]">
      <SiteHeader />

      <section className="mx-auto max-w-[1320px] px-5 pt-14 pb-8 md:px-10 md:pt-20">
        <p className="text-[12px] font-semibold uppercase tracking-[.16em] text-[#1B8C42]">Marca</p>
        <h1 className="mt-4 text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[.95] tracking-[-.05em]">
          Identidade visual.
        </h1>
        <p className="mt-5 max-w-[62ch] text-[17px] leading-7 text-[#3E5347]">
          Logo, cor e tipografia do fechou o carrinho. Use estes arquivos em anúncios, loja e materiais de apoio.
        </p>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-14 md:px-10">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[28px] border border-[#0B2B1F]/12 bg-white p-8">
            <div className="flex items-center gap-4">
              <img src="/brand/logo-mark.svg" alt="" width={64} height={64} className="h-16 w-16 rounded-2xl" />
              <span className="text-[26px] font-semibold tracking-[-.04em]">fechou o carrinho</span>
            </div>
            <p className="mt-8 text-[13px] text-[#5A6B63]">Versão principal · fundo claro</p>
          </div>
          <div className="rounded-[28px] bg-[#0B2B1F] p-8">
            <div className="flex items-center gap-4">
              <img src="/brand/logo-mark.svg" alt="" width={64} height={64} className="h-16 w-16 rounded-2xl" />
              <span className="text-[26px] font-semibold tracking-[-.04em] text-[#F4F3EF]">fechou o carrinho</span>
            </div>
            <p className="mt-8 text-[13px] text-white/50">Versão para fundo escuro</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-14 md:px-10">
        <p className="text-[12px] font-semibold uppercase tracking-[.16em] text-[#5A6B63]">Tipografia</p>
        <div className="mt-5 rounded-[28px] border border-[#0B2B1F]/12 bg-white p-8 md:p-10">
          <p className="text-[clamp(2.4rem,5vw,3.5rem)] font-semibold leading-none tracking-[-.05em]">Nunito</p>
          <p className="mt-3 text-[14px] text-[#5A6B63]">Títulos e números. Semibold, tracking apertado.</p>
          <p className="mt-8 text-[clamp(1.8rem,4vw,2.5rem)] leading-none tracking-[-.03em]">Inter</p>
          <p className="mt-3 text-[14px] text-[#5A6B63]">Corpo de texto, botões e formulários. Regular e medium.</p>
        </div>
      </section>

      <BrandAndBannersSection />

      <MockupViewer />

      <SiteFooter />
    </main>
  );
}
