"use client";

import { useState } from "react";

type Item = { name: string; qty: number; unit: number; source: "lido" | "manual" };

const GOAL = 200;

const INITIAL: Item[] = [
  { name: "Arroz integral 5kg", qty: 1, unit: 28.9, source: "lido" },
  { name: "Feijão carioca 1kg", qty: 2, unit: 7.49, source: "lido" },
  { name: "Leite integral 1L", qty: 4, unit: 4.99, source: "lido" },
  { name: "Café torrado 500g", qty: 1, unit: 18.5, source: "lido" },
  { name: "Óleo de soja 900ml", qty: 2, unit: 7.89, source: "lido" },
  { name: "Macarrão espaguete 500g", qty: 3, unit: 4.59, source: "lido" },
  { name: "Açúcar refinado 1kg", qty: 1, unit: 5.29, source: "lido" },
  { name: "Banana prata 1,2kg", qty: 1, unit: 6.98, source: "manual" },
  { name: "Detergente 500ml", qty: 4, unit: 2.49, source: "lido" },
  { name: "Água sanitária 2L", qty: 1, unit: 8.68, source: "manual" },
];

const brl = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;

export default function Board() {
  const [items, setItems] = useState(INITIAL);
  const [open, setOpen] = useState(3);

  const total = items.reduce((sum, item) => sum + item.qty * item.unit, 0);
  const percent = Math.round((total / GOAL) * 100);
  const over = total > GOAL;

  function change(index: number, delta: number) {
    setItems((current) =>
      current.map((item, i) => (i === index ? { ...item, qty: Math.max(0, item.qty + delta) } : item)),
    );
  }

  return (
    <section aria-labelledby="lista-titulo" className="bg-[#0B2B1F] text-white">
      <h2 id="lista-titulo" className="sr-only">
        A lista de compras, como o app mostra
      </h2>
      <div className="overflow-hidden px-3 max-md:px-2">
        <ul data-ui className="flex flex-col gap-1 py-6">
          {items.map((item, index) => {
            const isOpen = open === index;
            const subtotal = item.qty * item.unit;
            return (
              <li key={item.name}>
                <div
                  className={`grid cursor-pointer grid-cols-12 items-center gap-x-2 px-5 ${
                    isOpen ? "min-h-[216px] content-center bg-[#146B32] py-4 max-md:min-h-[200px]" : "h-[72px] bg-[#123A2C] max-md:h-16"
                  }`}
                  onClick={() => setOpen(index)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setOpen(index);
                    }
                  }}
                >
                  <span
                    className={`font-bold ${
                      isOpen
                        ? "display col-span-7 text-[clamp(32px,4.4vw,64px)] leading-[1] md:col-span-5"
                        : "col-span-7 truncate text-[20px] md:col-span-5 md:text-[clamp(24px,2vw,32px)]"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="col-span-2 hidden text-[clamp(24px,2vw,32px)] tabular-nums md:block">
                    {item.qty} un
                  </span>
                  <span className="col-span-2 hidden text-[clamp(24px,2vw,32px)] tabular-nums md:block">{brl(item.unit)}</span>
                  <span className="col-span-4 text-right text-[20px] font-bold tabular-nums md:col-span-2 md:text-[clamp(24px,2vw,32px)]">
                    {brl(subtotal)}
                  </span>
                  <span
                    className={`col-span-1 hidden h-10 items-center justify-center text-[17px] font-bold md:flex ${
                      item.source === "lido" ? "bg-[#D3EACB] text-[#0B2B1F]" : "bg-white text-[#0B2B1F]"
                    }`}
                  >
                    {item.source}
                  </span>
                  {isOpen ? (
                    <div className="col-span-12 mt-3 flex flex-wrap items-center gap-x-8 gap-y-3 text-[17px]">
                      <p>
                        {item.source === "lido" ? "Preço lido da etiqueta" : "Preço digitado à mão"}. Mude a
                        quantidade e o total da compra acompanha.
                      </p>
                      <span className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Diminuir ${item.name}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            change(index, -1);
                          }}
                          className="grid h-11 w-11 place-items-center bg-white text-[24px] font-bold text-[#0B2B1F] hover:bg-[#FF6B00]"
                        >
                          −
                        </button>
                        <span className="min-w-[2ch] text-center text-[22px] font-bold tabular-nums" aria-live="polite">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`Aumentar ${item.name}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            change(index, 1);
                          }}
                          className="grid h-11 w-11 place-items-center bg-white text-[24px] font-bold text-[#0B2B1F] hover:bg-[#FF6B00]"
                        >
                          +
                        </button>
                      </span>
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className={`flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-[var(--margin)] py-8 ${
          over ? "bg-[#FF6B00] text-[#0B2B1F]" : "bg-[#D3EACB] text-[#0B2B1F]"
        }`}
        aria-live="polite"
      >
        <p className="display text-[clamp(40px,8vw,115px)]">{brl(total)}</p>
        <p className="text-[clamp(18px,1.6vw,24px)] font-bold">
          {over
            ? `${brl(total - GOAL)} acima da meta de ${brl(GOAL)}`
            : `${percent}% da meta de ${brl(GOAL)} · sobram ${brl(GOAL - total)}`}
        </p>
      </div>
    </section>
  );
}
