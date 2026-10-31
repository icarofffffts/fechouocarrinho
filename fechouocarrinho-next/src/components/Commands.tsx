"use client";

import { useState } from "react";
import AppFilm from "./AppFilm";
import Reveal from "./Reveal";

const COMMANDS = [
  { name: "Ler etiqueta", text: "Aponte a câmera para o preço. A leitura roda no aparelho, sem internet." },
  { name: "Definir meta", text: "Diga quanto quer gastar e veja a barra encher, com o que ainda sobra." },
  { name: "Criar listas", text: "Cada lista tem nome, itens e total próprios, e você escolhe qual está ativa." },
  { name: "Corrigir leitura", text: "Se a etiqueta saiu torta, edite o valor antes de ele entrar na lista." },
  { name: "Comparar mercados", text: "A mesma lista lado a lado entre as redes. Os preços por mercado estão em preparação." },
  { name: "Compartilhar recibo", text: "Feche o carrinho e mande o recibo da compra para quem vai pagar junto." },
  { name: "Ver no widget", text: "O total e a meta ficam na tela inicial do Android, sem abrir o app." },
];

export default function Commands() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const normalized = query.trim().toLowerCase();
  const visible = COMMANDS.filter((command) => command.name.toLowerCase().includes(normalized));
  const current = Math.min(selected, Math.max(visible.length - 1, 0));

  return (
    <section
      aria-labelledby="recursos-titulo"
      className="bg-white px-[var(--margin)] py-[clamp(72px,9vw,140px)]"
    >
      <h2 id="recursos-titulo" className="sr-only">
        O que o aplicativo faz
      </h2>
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_340px] lg:gap-[6vw]">
        <div data-ui>
        <label className="block">
          <span className="sr-only">Buscar um recurso</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelected(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setSelected((value) => Math.min(value + 1, visible.length - 1));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setSelected((value) => Math.max(value - 1, 0));
              }
            }}
            placeholder="Buscar um recurso"
            style={{ fontSize: "clamp(24px, 3vw, 44px)" }}
            className="h-[1.9em] w-full bg-[#EAF6E4] px-5 font-bold text-[#0B2B1F] outline-none placeholder:text-[#3E5347] focus-visible:ring-4 focus-visible:ring-[#146B32] md:w-[83%]"
          />
        </label>

        <ul className="mt-6" role="listbox" aria-label="Recursos">
          {visible.map((command, index) => {
            const active = index === current;
            return (
              <li key={command.name} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => setSelected(index)}
                  onMouseEnter={() => setSelected(index)}
                  className={`grid w-full items-center gap-x-8 px-5 py-3 text-left lg:grid-cols-12 ${
                    active ? "bg-[#146B32] text-white" : "text-[#0B2B1F] hover:bg-[#EAF6E4]"
                  }`}
                >
                  <span className="display block text-[clamp(32px,4.4vw,64px)] leading-[1.1] lg:col-span-7">
                    {command.name}
                  </span>
                  {active ? (
                    <span className="mt-1 block text-[17px] leading-[1.5] lg:col-span-5 lg:col-start-8 lg:mt-0">
                      {command.text}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
          {visible.length === 0 ? (
            <li className="px-5 py-6 text-[20px]">Nenhum recurso com “{query}”.</li>
          ) : null}
        </ul>
        </div>
        <Reveal delay={120} className="lg:sticky lg:top-8">
          <AppFilm />
        </Reveal>
      </div>
    </section>
  );
}
