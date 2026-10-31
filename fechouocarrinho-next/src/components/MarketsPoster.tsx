"use client";

import { useEffect, useState } from "react";
import { fetchSupermarkets, type Supermarket } from "@/lib/supabase";

const FALLBACK: Supermarket[] = [
  { slug: "epa-mg", name: "EPA Supermercados", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "mart-minas-mg", name: "Mart Minas", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "bh-supermercados-mg", name: "Supermercados BH", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "supernosso-mg", name: "Supernosso", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "verdemar-mg", name: "Verdemar", states: ["MG"], city: "Várias cidades · MG" },
  { slug: "carrefour-mg", name: "Carrefour", states: ["MG", "SP", "RJ"], city: "MG · SP · RJ" },
  { slug: "apoio-mineiro-mg", name: "Apoio Mineiro", states: ["MG"], city: "Várias cidades · MG" },
];

/** Nome curto para caber numa linha de cartaz: "EPA Supermercados" vira "epa". */
function short(name: string) {
  const cleaned = name
    .toLowerCase()
    .replace(/supermercados?/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || name.toLowerCase();
}

export default function MarketsPoster() {
  const [markets, setMarkets] = useState<Supermarket[]>(FALLBACK);

  useEffect(() => {
    let active = true;
    fetchSupermarkets({ state: "MG" })
      .then((result) => {
        if (active && result.data.length) setMarkets(result.data.slice(0, 7));
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="mercados"
      aria-labelledby="mercados-titulo"
      className="bg-[#EAF6E4] px-[var(--margin)] pb-[80px] pt-[80px] text-[#0B2B1F]"
    >
      <h2 id="mercados-titulo" className="mb-8 text-[20px] font-bold">
        Redes de Minas Gerais
      </h2>
      <ul>
        {markets.map((market) => (
          <li
            key={market.slug}
            className="group flex flex-wrap items-baseline justify-between gap-x-6 border-0 max-lg:mb-10 lg:mb-0"
          >
            <span
              className="display text-[clamp(64px,10vw,150px)] transition-colors duration-150 group-hover:text-[#146B32] max-md:text-[15vw]"
              style={{ lineHeight: 0.96 }}
            >
              {short(market.name)}
            </span>
            <span className="text-[17px] tabular-nums max-lg:block max-lg:w-full">
              {market.city} · preços em breve
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-[17px]">
        Não achou o seu mercado?{" "}
        <a href="/supermercados#sugerir" className="font-bold underline underline-offset-4 hover:text-[#146B32]">
          Sugira um supermercado
        </a>
      </p>
    </section>
  );
}
