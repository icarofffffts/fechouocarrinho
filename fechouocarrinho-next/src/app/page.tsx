"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AppTour from "@/components/AppTour";
import StorySteps from "@/components/StorySteps";
import CartSimulator from "@/components/CartSimulator";
import CompareTable from "@/components/CompareTable";
import FaqAccordion from "@/components/FaqAccordion";
import { fetchSupermarkets, type Supermarket } from "@/lib/supabase";

const FALLBACK_MARKETS: Supermarket[] = [
  { slug: "epa-mg", name: "EPA Supermercados", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "mart-minas-mg", name: "Mart Minas", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "bh-supermercados-mg", name: "Supermercados BH", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "supernosso-mg", name: "Supernosso", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "verdemar-mg", name: "Verdemar", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "carrefour-mg", name: "Carrefour", states: ["MG", "SP", "RJ"], city: "MG · SP · RJ" },
  { slug: "apoio-mineiro-mg", name: "Apoio Mineiro", states: ["MG"], city: "Várias cidades · MG" },
];

const APK_URL = "/downloads/fechouocarrinho.apk";

function monogram(name: string) {
  const parts = name.split(" ").filter(Boolean);
  const first = parts[0] ?? "";
  if (parts.length === 1) return first.slice(0, 2).toUpperCase();
  if (first.length <= 3) return first.toUpperCase();
  return (first[0] + parts[1][0]).toUpperCase();
}

function PhoneShowcase() {
  const items = [
    { name: "Arroz branco 5kg", qty: "1 un", price: "R$ 28,90", image: "/mockups/products/arroz-tio-joao.jpg" },
    { name: "Feijão carioca 1kg", qty: "2 un", price: "R$ 7,49", image: "/mockups/products/feijao-camil.jpg" },
    { name: "Leite integral 1L", qty: "3 un", price: "R$ 14,97", image: "/mockups/products/leite-itambe.jpg" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      <div className="rounded-[2.6rem] bg-[#0B2B1F] p-2.5">
        <div className="overflow-hidden rounded-[2.1rem] bg-[#FFF8F0]">
          <div className="flex items-center justify-between px-5 pt-3 pb-2 text-[10px] font-semibold text-[#0B2B1F]/70">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <i className="h-2 w-2.5 rounded-[2px] bg-[#0B2B1F]/70" />
              <i className="h-2 w-2.5 rounded-[2px] bg-[#0B2B1F]/40" />
            </span>
          </div>

          <div className="flex items-center gap-2.5 bg-[#1B8C42] px-4 py-3 text-white">
            <Image src="/brand/logo-mark.svg" alt="" width={32} height={32} unoptimized className="h-8 w-8 rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-bold leading-tight">fechou o carrinho</p>
              <p className="truncate text-[10px] text-white/75">Supermercados BH</p>
            </div>
            <span className="rounded-full bg-white/20 px-2 py-1 text-[9px] font-bold">100% offline</span>
          </div>

          <div className="p-4">
            <div className="rounded-2xl bg-white p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#5A6B63]">Orçamento</p>
              <p className="mt-1 text-2xl font-semibold tracking-[-.03em] text-[#0B2B1F]">R$ 53,28</p>
              <p className="text-[10px] text-[#5A6B63]">de R$ 200,00</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#0B2B1F]/10">
                <div className="h-full w-[27%] rounded-full bg-[#1B8C42]" />
              </div>
            </div>

            <p className="mt-3 mb-1.5 px-1 text-[11px] font-bold text-[#0B2B1F]">lista de compras</p>
            <div className="space-y-1.5">
              {items.map((item) => (
                <div key={item.name} className="flex items-center gap-2.5 rounded-xl bg-white px-2.5 py-2">
                  <Image src={item.image} alt="" width={32} height={32} className="h-8 w-8 shrink-0 rounded-lg object-contain" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-semibold text-[#0B2B1F]">{item.name}</p>
                    <p className="text-[9px] text-[#5A6B63]">{item.qty}</p>
                  </div>
                  <span className="shrink-0 text-[11px] font-bold tabular-nums text-[#0B2B1F]">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-4 mb-4 flex items-center justify-between rounded-xl bg-[#0B2B1F] px-4 py-3 text-white">
            <span className="text-[10px] font-semibold uppercase tracking-[.14em] text-white/70">Total</span>
            <span className="text-lg font-semibold tracking-[-.02em] tabular-nums">R$ 53,28</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [markets, setMarkets] = useState<Supermarket[]>(FALLBACK_MARKETS);

  useEffect(() => {
    let active = true;
    fetchSupermarkets({ state: "MG" })
      .then((result) => {
        if (active && result.data.length) setMarkets(result.data);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0B2B1F]">
      <header className="sticky top-0 z-40 border-b border-[#0B2B1F]/10 bg-[#FFF8F0]">
        <div className="mx-auto flex h-[68px] max-w-[1320px] items-center gap-6 px-5 md:px-10">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="fechou o carrinho — início">
            <Image src="/brand/logo-mark.svg" alt="" width={36} height={36} unoptimized className="h-9 w-9" />
            <span className="text-[17px] font-semibold tracking-[-.03em]">fechou o carrinho</span>
          </Link>
          <nav className="ml-auto hidden items-center gap-7 text-[15px] font-medium text-[#3E5347] md:flex">
            <a href="#como-funciona" className="hover:text-[#1B8C42]">Como funciona</a>
            <a href="#simulador" className="hover:text-[#1B8C42]">Simulador</a>
            <a href="#mercados" className="hover:text-[#1B8C42]">Mercados</a>
            <a href="#duvidas" className="hover:text-[#1B8C42]">Dúvidas</a>
          </nav>
          <a href="#baixar" className="ml-auto shrink-0 rounded-full bg-[#1B8C42] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#146B32] md:ml-0">
            Baixar APK
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1320px] items-center gap-14 px-5 pt-14 pb-16 md:px-10 md:pt-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:pb-24">
        <div className="min-w-0">
          <h1 className="max-w-[15ch] text-[clamp(2.75rem,8.4vw,4.9rem)] font-semibold leading-[.92] tracking-[-.055em]">
            Seu total, <span className="text-[#1B8C42]">antes do caixa.</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-[17px] leading-7 text-[#3E5347] sm:text-lg">
            Aponte a câmera para a etiqueta e veja o total crescer. Tudo no seu celular, até onde o sinal não chega.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href={APK_URL} className="flex h-12 items-center justify-center rounded-full bg-[#1B8C42] px-6 text-[15px] font-semibold text-white transition hover:bg-[#146B32] sm:w-auto">
              Baixar para Android
            </a>
            <a href="#como-funciona" className="flex h-12 items-center justify-center rounded-full border border-[#0B2B1F]/15 px-6 text-[15px] font-semibold text-[#0B2B1F] transition hover:border-[#0B2B1F]/40 sm:w-auto">
              Ver como funciona
            </a>
          </div>

          <dl className="mt-10 grid max-w-[430px] grid-cols-3 gap-4 border-t border-[#0B2B1F]/15 pt-5">
            <div>
              <dt className="text-[13px] text-[#5A6B63]">Leitura</dt>
              <dd className="mt-1 text-[15px] font-semibold">100% offline</dd>
            </div>
            <div>
              <dt className="text-[13px] text-[#5A6B63]">Listas</dt>
              <dd className="mt-1 text-[15px] font-semibold">Sem limite</dd>
            </div>
            <div>
              <dt className="text-[13px] text-[#5A6B63]">Sistema</dt>
              <dd className="mt-1 text-[15px] font-semibold">Android 8+</dd>
            </div>
          </dl>
        </div>

        <div className="relative min-w-0 rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_35%,#EAF6E4_0%,#D3EACB_100%)] px-4 py-12 sm:px-10 sm:py-16">
          <div className="absolute left-3 top-4 z-10 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_8px_24px_-12px_rgba(11,43,31,.35)] sm:left-5 sm:top-7">
            <span className="h-2.5 w-2.5 rounded-full bg-[#1B8C42]" aria-hidden="true" />
            <p className="text-[13px] leading-tight">
              <b className="block text-[15px]">R$ 146,72</b>
              <span className="text-[#5A6B63]">livres na meta</span>
            </p>
          </div>
          <PhoneShowcase />
          <div className="absolute bottom-4 right-3 z-10 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_8px_24px_-12px_rgba(11,43,31,.35)] sm:bottom-7 sm:right-5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B00]" aria-hidden="true" />
            <p className="text-[13px] leading-tight">
              <b className="block text-[15px]">+ R$ 14,97</b>
              <span className="text-[#5A6B63]">etiqueta lida agora</span>
            </p>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-[#0B2B1F] px-5 py-20 text-[#F4F3EF] md:px-10 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
            <h2 className="max-w-[13ch] text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[.95] tracking-[-.045em]">
              Um passo de cada vez.
            </h2>
            <p className="max-w-[44ch] self-end text-[16px] leading-7 text-white/65">
              Da prateleira ao caixa em quatro gestos. Nenhum deles precisa de internet.
            </p>
          </div>
          <StorySteps />
        </div>
      </section>

      <section id="simulador" className="bg-white px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-[16ch] text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[.95] tracking-[-.045em]">
              Quanto essa compra vai dar?
            </h2>
            <p className="max-w-[42ch] text-[15px] leading-6 text-[#5A6B63] sm:text-right">
              Ajuste as quantidades e acompanhe o total. É a mesma conta que o app faz no corredor.
            </p>
          </div>
          <div className="mt-10">
            <CartSimulator />
          </div>
        </div>
      </section>

      <section id="produto" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-[16ch] text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[.95] tracking-[-.045em]">
              O que cada um responde.
            </h2>
            <p className="max-w-[42ch] text-[15px] leading-6 text-[#5A6B63] sm:text-right">
              A mesma compra, três jeitos de acompanhar. A diferença aparece na hora de decidir o que fica no carrinho.
            </p>
          </div>
          <div className="mt-10">
            <CompareTable />
          </div>
        </div>
      </section>

      <section id="app" className="bg-white px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-[16ch] text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[.95] tracking-[-.045em]">
              Por dentro do app.
            </h2>
            <p className="max-w-[42ch] text-[15px] leading-6 text-[#5A6B63] sm:text-right">
              As telas que você vai usar no corredor, com dados de exemplo.
            </p>
          </div>
          <div className="mt-10">
            <AppTour />
          </div>
        </div>
      </section>

      <section id="mercados" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="max-w-[16ch] text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[.95] tracking-[-.045em]">
                Onde você compra.
              </h2>
              <p className="mt-3 max-w-[46ch] text-[15px] leading-6 text-[#5A6B63]">
                Redes presentes em várias cidades de Minas Gerais. Os preços por mercado estão em preparação.
              </p>
            </div>
            <a href="/supermercados" className="text-[15px] font-semibold underline decoration-[#1B8C42] decoration-2 underline-offset-4">
              Ver cobertura completa
            </a>
          </div>

          <ul className="mt-10 border-t border-[#0B2B1F]/15">
            {markets.map((market) => (
              <li key={market.slug} className="flex items-center gap-4 border-b border-[#0B2B1F]/15 py-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1B8C42]/10 text-[12px] font-bold text-[#1B8C42]">
                  {monogram(market.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold">{market.name}</p>
                  <p className="truncate text-[13px] text-[#5A6B63]">{market.city}</p>
                </div>
                <span className="hidden shrink-0 rounded-full border border-[#0B2B1F]/15 px-3 py-1 text-[12px] font-medium text-[#5A6B63] sm:inline">
                  Preços em breve
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-[14px] text-[#5A6B63]">
            Não achou seu mercado?{" "}
            <a href="/supermercados#sugerir" className="font-semibold text-[#1B8C42] underline underline-offset-4">
              Sugerir supermercado
            </a>
          </p>
        </div>
      </section>

      <section id="duvidas" className="bg-white px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <h2 className="max-w-[12ch] text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[.95] tracking-[-.045em]">
            Dúvidas frequentes.
          </h2>
          <FaqAccordion />
        </div>
      </section>

      <section id="baixar" className="bg-[#1B8C42] px-5 py-20 text-white md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <h2 className="max-w-[14ch] text-[clamp(2.2rem,5.2vw,4rem)] font-semibold leading-[.93] tracking-[-.05em]">
              Chegue ao caixa sabendo.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-7 text-white/80">
              Baixe o aplicativo, instale e faça a próxima compra com o total na mão. Sem cadastro obrigatório.
            </p>
            <a href={APK_URL} className="mt-7 inline-flex rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-[#1B8C42] transition hover:bg-[#FFF8F0]">
              Baixar APK · 49 MB
            </a>
            <ol className="mt-8 grid max-w-[420px] gap-3 text-[14px] text-white/80">
              <li className="flex gap-3"><span className="font-semibold text-white">1.</span> Baixe o arquivo</li>
              <li className="flex gap-3"><span className="font-semibold text-white">2.</span> Permita a instalação quando o sistema pedir</li>
              <li className="flex gap-3"><span className="font-semibold text-white">3.</span> Abra e comece a lista</li>
            </ol>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[280px] rounded-2xl bg-white p-5 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- QR gerado por serviço externo */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https://fechouocarrinho.site/downloads/fechouocarrinho.apk"
                alt="QR code para baixar o aplicativo"
                width={240}
                height={240}
                className="mx-auto h-[200px] w-[200px]"
              />
              <p className="mt-3 text-[13px] font-semibold text-[#0B2B1F]">Aponte a câmera do celular</p>
              <p className="mt-1 text-[12px] leading-5 text-[#5A6B63]">O QR abre o mesmo arquivo do botão.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0B2B1F] px-5 py-10 text-[#F4F3EF] md:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/brand/logo-mark.svg" alt="" width={28} height={28} unoptimized className="h-7 w-7" />
            <span className="text-[15px] font-semibold tracking-[-.02em]">fechou o carrinho</span>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-white/60">
            <a href="/como-funciona" className="hover:text-white">Como funciona</a>
            <a href="/supermercados" className="hover:text-white">Supermercados</a>
            <a href="/ajuda" className="hover:text-white">Ajuda</a>
            <a href="/privacidade" className="hover:text-white">Privacidade</a>
            <a href="mailto:contato@fechouocarrinho.site" className="hover:text-white">Contato</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
