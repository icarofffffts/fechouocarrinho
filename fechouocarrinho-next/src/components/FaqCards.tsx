"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const CARDS = [
  {
    tab: "Internet",
    q: "Preciso de internet dentro do mercado?",
    a: "Não. A leitura da etiqueta acontece no próprio aparelho. Você monta a lista, registra preços e acompanha o total sem sinal.",
    bg: "bg-[#D3EACB]",
    ink: "text-[#0B2B1F]",
  },
  {
    tab: "Conta",
    q: "Preciso criar conta para usar?",
    a: "Não. O app abre em modo visitante e funciona completo offline. A conta serve apenas para sincronizar listas com outras pessoas.",
    bg: "bg-[#146B32]",
    ink: "text-white",
  },
  {
    tab: "Leitura",
    q: "Como o app lê o preço da etiqueta?",
    a: "Você aponta a câmera e toca em capturar. O texto da etiqueta vira número no próprio celular, e você confirma o valor antes de adicionar.",
    bg: "bg-[#FF6B00]",
    ink: "text-[#0B2B1F]",
  },
  {
    tab: "Erro",
    q: "E se a leitura errar o preço?",
    a: "O valor aparece em um campo editável antes de entrar na lista. Você corrige e confirma.",
    bg: "bg-[#D3EACB]",
    ink: "text-[#0B2B1F]",
  },
  {
    tab: "Listas",
    q: "Consigo manter mais de uma lista?",
    a: "Sim. Você cria listas com nome, escolhe qual está ativa, e cada lista tem seus próprios itens e total.",
    bg: "bg-[#146B32]",
    ink: "text-white",
  },
  {
    tab: "Dados",
    q: "Onde ficam meus dados?",
    a: "No seu aparelho, em um banco local. Se você criar conta, as listas também podem ser sincronizadas.",
    bg: "bg-[#FF6B00]",
    ink: "text-[#0B2B1F]",
  },
];

export default function FaqCards() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="duvidas"
      aria-labelledby="duvidas-titulo"
      className="bg-white px-[var(--margin)] py-[clamp(72px,9vw,140px)] text-[#0B2B1F]"
    >
      <div className="mx-auto max-w-[1100px] lg:ml-[17%]">
        <Reveal>
          <h2 id="duvidas-titulo" className="display text-[clamp(36px,4.4vw,64px)]">
            Dúvidas, uma por ficha.
          </h2>
        </Reveal>
        <div className="mt-16 flex flex-col">
          {CARDS.map((card, index) => {
            const isOpen = open === index;
            return (
              <Reveal key={card.tab} delay={index * 60}>
              <div className="relative pt-10" style={{ marginLeft: `min(${index * 150}px, 18vw)` }}>
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 flex h-10 w-[200px] items-center justify-center text-[17px] font-bold max-md:w-[120px] ${card.bg} ${card.ink}`}
                  style={{ clipPath: "polygon(0 100%, 10% 0, 90% 0, 100% 100%)" }}
                >
                  {card.tab}
                </span>
                <div className={`${card.bg} ${card.ink}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(index)}
                    aria-expanded={isOpen}
                    className="flex min-h-[56px] w-full items-center px-6 py-4 text-left text-[20px] font-bold"
                  >
                    {card.q}
                  </button>
                  {isOpen ? <p className="max-w-[50ch] px-6 pb-6 text-[17px] leading-[1.55]">{card.a}</p> : null}
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
