"use client";

import { useState } from "react";

const FAQ = [
  {
    q: "Preciso de internet dentro do mercado?",
    a: "Não. A leitura da etiqueta acontece no próprio aparelho. Você pode montar a lista, registrar preços e acompanhar o total sem sinal.",
  },
  {
    q: "Preciso criar conta para usar?",
    a: "Não. O app abre em modo visitante e funciona completo offline. A conta serve apenas para sincronizar listas com outras pessoas.",
  },
  {
    q: "Como o app lê o preço da etiqueta?",
    a: "Você aponte a câmera e toca em capturar. O texto da etiqueta é convertido em número no próprio celular e você confirma o valor antes de adicionar.",
  },
  {
    q: "E se a leitura errar o preço?",
    a: "O valor aparece em um campo editável antes de entrar na lista. Você corrige e confirma.",
  },
  {
    q: "Consigo manter mais de uma lista?",
    a: "Sim. Você cria listas com nome, escolhe qual está ativa e cada lista tem seus próprios itens e total.",
  },
  {
    q: "Onde ficam meus dados?",
    a: "No seu aparelho, em um banco local. Se você criar conta, as listas também podem ser sincronizadas.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-[#0B2B1F]/15">
      {FAQ.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q} className="border-b border-[#0B2B1F]/15">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-6 py-5 text-left"
            >
              <span className="text-base font-semibold leading-snug text-[#0B2B1F] sm:text-lg">{item.q}</span>
              <span
                aria-hidden="true"
                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#0B2B1F]/20 text-sm transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="max-w-[62ch] pb-5 text-[15px] leading-7 text-[#5A6B63]">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
