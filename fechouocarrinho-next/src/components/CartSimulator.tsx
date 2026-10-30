"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
};

const PRODUCTS: Product[] = [
  { id: "arroz", name: "Arroz branco tipo 1 · 5kg", brand: "Tio João", price: 28.9, image: "/mockups/products/arroz-tio-joao.jpg" },
  { id: "feijao", name: "Feijão carioca · 1kg", brand: "Camil", price: 7.49, image: "/mockups/products/feijao-camil.jpg" },
  { id: "leite", name: "Leite integral · 1L", brand: "Itambé", price: 4.99, image: "/mockups/products/leite-itambe.jpg" },
  { id: "cafe", name: "Café torrado e moído · 500g", brand: "Pilão", price: 18.5, image: "/mockups/products/cafe-pilao.jpg" },
];

const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function CartSimulator() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    arroz: 1,
    feijao: 2,
    leite: 3,
    cafe: 1,
  });

  const { total, count } = useMemo(() => {
    let total = 0;
    let count = 0;
    for (const product of PRODUCTS) {
      const quantity = quantities[product.id] ?? 0;
      total += product.price * quantity;
      count += quantity;
    }
    return { total, count };
  }, [quantities]);

  const change = (id: string, delta: number) =>
    setQuantities((current) => ({
      ...current,
      [id]: Math.max(0, Math.min(99, (current[id] ?? 0) + delta)),
    }));

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
      <div className="overflow-hidden rounded-2xl bg-white">
        {PRODUCTS.map((product, index) => {
          const quantity = quantities[product.id] ?? 0;
          return (
            <div
              key={product.id}
              className={`flex items-center gap-4 px-4 py-4 sm:px-5 ${index === 0 ? "" : "border-t border-[#0B2B1F]/8"}`}
            >
              <img
                src={product.image}
                alt=""
                width={64}
                height={64}
                className="h-14 w-14 shrink-0 rounded-xl bg-[#F4F3EF] object-contain p-1"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold leading-snug text-[#0B2B1F]">{product.name}</p>
                <p className="mt-0.5 text-xs text-[#5A6B63]">
                  {product.brand} · {brl(product.price)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => change(product.id, -1)}
                  disabled={quantity === 0}
                  aria-label={`Diminuir ${product.name}`}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-[#0B2B1F]/12 text-[#0B2B1F] transition disabled:opacity-30"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-semibold tabular-nums">{quantity}</span>
                <button
                  type="button"
                  onClick={() => change(product.id, 1)}
                  aria-label={`Aumentar ${product.name}`}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-[#1B8C42] text-white transition hover:bg-[#146B32]"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-[#0B2B1F] p-6 text-[#F4F3EF]">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#A0D956]">Carrinho</p>
        <p className="mt-3 text-4xl font-semibold leading-none tracking-[-.04em] tabular-nums">{brl(total)}</p>
        <p className="mt-2 text-sm text-white/60">
          {count} {count === 1 ? "item" : "itens"} na lista
        </p>

        <dl className="mt-6 space-y-2 border-t border-white/15 pt-4 text-sm">
          <div className="flex justify-between text-white/70">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">{brl(total)}</dd>
          </div>
          <div className="flex justify-between text-white/70">
            <dt>Desconto</dt>
            <dd className="tabular-nums">R$ 0,00</dd>
          </div>
          <div className="flex justify-between border-t border-white/15 pt-2 font-semibold">
            <dt>Total no caixa</dt>
            <dd className="tabular-nums">{brl(total)}</dd>
          </div>
        </dl>

        <a
          href="#baixar"
          className="mt-6 flex h-12 items-center justify-center rounded-full bg-[#A0D956] text-sm font-bold text-[#0B2B1F] transition hover:bg-white"
        >
          Fazer isso no mercado
        </a>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-white/45">
          Simulação. Os preços reais vêm da etiqueta que você fotografar.
        </p>
      </div>
    </div>
  );
}
