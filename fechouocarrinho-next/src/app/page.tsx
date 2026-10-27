"use client";

import { useEffect, useState } from "react";
import InteractiveCartSimulator from "@/components/InteractiveCartSimulator";
import InteractiveHeroPhone from "@/components/InteractiveHeroPhone";
import FaqSection from "@/components/FaqSection";
import { fetchSupermarkets, type Supermarket } from "@/lib/supabase";

const fallbackMarkets: Supermarket[] = [
  { slug: "epa-mg", name: "EPA Supermercados", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "mart-minas-mg", name: "Mart Minas", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "bh-supermercados-mg", name: "Supermercados BH", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "carrefour-mg", name: "Carrefour", states: ["MG", "SP", "RJ"], city: "MG · SP · RJ" },
];

export default function Home() {
  const [markets, setMarkets] = useState<Supermarket[]>(fallbackMarkets);

  useEffect(() => {
    fetchSupermarkets({ state: "MG" }).then((result) => {
      if (result.data.length) setMarkets(result.data.slice(0, 6));
    }).catch(() => undefined);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F4F3EF] text-[#032A25]">
      <header className="sticky top-0 z-40 border-b border-[#032A25]/10 bg-[#F4F3EF]/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center gap-8 px-5 md:px-10">
          <a href="/" className="flex shrink-0 items-center gap-3" aria-label="Fechou o Carrinho, início">
            <img src="/brand/logo-mark.svg" alt="" width="40" height="40" className="h-10 w-10" />
            <span className="text-lg font-bold tracking-[-0.04em]">fechou o carrinho</span>
          </a>
          <nav className="ml-auto hidden items-center gap-7 text-[15px] font-medium md:flex">
            <a href="#produto" className="hover:text-[#1B8C42]">Produto</a>
            <a href="#como-funciona" className="hover:text-[#1B8C42]">Como funciona</a>
            <a href="#mercados" className="hover:text-[#1B8C42]">Mercados</a>
            <a href="#duvidas" className="hover:text-[#1B8C42]">Dúvidas</a>
          </nav>
          <a href="#baixar" className="rounded-full bg-[#1B8C42] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#146B32]">Baixar APK</a>
        </div>
      </header>

      <section id="produto" className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pb-20 pt-16 md:px-10 lg:grid-cols-[.9fr_1.1fr] lg:pb-28 lg:pt-24">
        <div>
          <p className="mb-6 text-sm font-semibold text-[#1B8C42]">Uma lista que acompanha a compra</p>
          <h1 className="max-w-[620px] text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[.9] tracking-[-.065em]">Seu total, antes do caixa.</h1>
          <p className="mt-7 max-w-[520px] text-lg leading-8 text-[#49645D]">Fotografe a etiqueta, confira o preço e veja o carrinho crescer. O Fechou funciona sem internet dentro do mercado.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="/downloads/fechouocarrinho.apk" className="rounded-full bg-[#1B8C42] px-7 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#146B32]">Baixar para Android</a>
            <a href="#simulador" className="font-semibold text-[#032A25] underline decoration-[#1B8C42] decoration-2 underline-offset-4">Experimentar a conta</a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#032A25]/15 pt-5 text-sm text-[#49645D]">
            <span><b className="text-[#032A25]">100%</b> offline</span>
            <span><b className="text-[#032A25]">Room</b> no aparelho</span>
            <span><b className="text-[#032A25]">Android 8+</b></span>
          </div>
        </div>
        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -inset-8 -z-0 rounded-full bg-[#D9EEE8] blur-3xl" />
          <div className="relative z-10 w-full max-w-[500px] rounded-[2rem] bg-[#E5EEE9] p-5 md:p-8">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[.14em] text-[#49645D]">Veja o app em ação</p>
            <InteractiveHeroPhone />
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-[#032A25] px-5 py-20 text-[#F4F3EF] md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold text-[#A0D956]">Do corredor ao caixa</p>
            <h2 className="mt-5 max-w-[420px] text-4xl font-semibold leading-[.95] tracking-[-.05em] md:text-6xl">A compra fica mais leve quando o total aparece.</h2>
          </div>
          <div className="grid gap-0 border-t border-white/20">
            {[
              ["Escolha o mercado", "Defina onde vai comprar e comece uma lista limpa."],
              ["Aponte para a etiqueta", "A leitura acontece no aparelho, sem depender do sinal."],
              ["Confira e siga", "O preço entra na lista e o total acompanha você."],
            ].map(([title, text]) => (
              <div key={title} className="grid gap-5 border-b border-white/20 py-7 md:grid-cols-[220px_1fr]">
                <h3 className="text-2xl font-semibold tracking-[-.03em]">{title}</h3>
                <p className="max-w-[460px] text-lg leading-7 text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="simulador" className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-[#1B8C42]">Uma conta simples</p>
          <h2 className="mt-5 max-w-[460px] text-4xl font-semibold leading-[.95] tracking-[-.05em] md:text-6xl">Saiba quanto a compra está levando.</h2>
          <p className="mt-6 max-w-[430px] text-lg leading-8 text-[#49645D]">Adicione produtos no simulador e entenda o total antes de chegar ao caixa.</p>
        </div>
        <InteractiveCartSimulator />
      </section>

      <section id="mercados" className="bg-white px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div><p className="text-sm font-semibold text-[#1B8C42]">Onde você compra</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] md:text-6xl">Seu mercado cabe na lista.</h2></div>
            <a href="/supermercados" className="font-semibold underline decoration-[#1B8C42] decoration-2 underline-offset-4">Ver cobertura completa</a>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[#032A25]/15 md:grid-cols-2 lg:grid-cols-3">
            {markets.map((market) => <div key={market.slug} className="bg-white p-7"><p className="text-2xl font-semibold tracking-[-.03em]">{market.name}</p><p className="mt-2 text-sm text-[#49645D]">{market.city}</p><p className="mt-8 text-sm font-semibold text-[#1B8C42]">Preços em breve</p></div>)}
          </div>
        </div>
      </section>

      <section id="duvidas" className="mx-auto max-w-[1000px] px-5 py-20 md:py-28"><FaqSection /></section>

      <section id="baixar" className="bg-[#1B8C42] px-5 py-20 text-white md:px-10 md:py-24">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-10"><div><h2 className="max-w-[600px] text-5xl font-semibold leading-[.95] tracking-[-.06em] md:text-7xl">Chegue ao caixa sabendo.</h2><p className="mt-6 max-w-[480px] text-lg leading-8 text-white/75">Baixe o app e faça sua próxima compra com o total na mão.</p></div><a href="/downloads/fechouocarrinho.apk" className="rounded-full bg-white px-7 py-4 font-bold text-[#1B8C42]">Baixar APK</a></div>
      </section>

      <footer className="bg-[#032A25] px-5 py-10 text-[#F4F3EF] md:px-10"><div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-6"><p className="text-xl font-semibold tracking-[-.04em]">fechou o carrinho</p><div className="flex gap-6 text-sm text-white/65"><a href="/como-funciona">Como funciona</a><a href="/supermercados">Supermercados</a><a href="/ajuda">Ajuda</a><a href="mailto:contato@fechouocarrinho.site">Contato</a></div></div></footer>
    </main>
  );
}
