import Reveal from "./Reveal";

type CardProps = {
  total: string;
  count: string;
  percent: number;
  line: string;
  action: string;
  detail?: React.ReactNode;
};

function ListCard({ total, count, percent, line, action, detail }: CardProps) {
  return (
    <div
      data-ui
      className="w-[260px] rounded-2xl border border-[#0B2B1F]/15 bg-white p-4 text-[#0B2B1F]"
    >
      <p className="text-[13px] text-[#0B2B1F]">Compra do mês · Supermercados BH</p>
      <p className="display mt-2 text-[32px]">{total}</p>
      <p className="text-[13px] text-[#0B2B1F]">
        {count} · de R$ 200,00
      </p>
      <div className="mt-3 h-2 rounded-full bg-[#0B2B1F]/10">
        <div className="h-2 rounded-full bg-[#1B8C42]" style={{ width: `${percent}%` }} />
      </div>
      {detail}
      <p className="mt-3 text-[17px] font-semibold">{line}</p>
      <span className="mt-3 flex h-10 items-center justify-center rounded-lg bg-[#146B32] text-[17px] font-semibold text-white">
        {action}
      </span>
    </div>
  );
}

const FIELDS = [
  {
    bg: "bg-[#EAF6E4]",
    ink: "text-[#0B2B1F]",
    clause: ["Primeiro, escolha", "o mercado."],
    card: (
      <ListCard
        total="R$ 0,00"
        count="0 itens"
        percent={0}
        line="Nova lista pronta"
        action="Começar a compra"
      />
    ),
  },
  {
    bg: "bg-[#146B32]",
    ink: "text-white",
    clause: ["Depois, fotografe", "a etiqueta."],
    card: (
      <ListCard
        total="R$ 28,90"
        count="1 item"
        percent={14}
        line="Lendo a etiqueta…"
        action="Capturar"
        detail={
          <div className="mt-3 rounded-lg border-2 border-dashed border-[#1B8C42] p-2 text-center">
            <p className="text-[13px] text-[#0B2B1F]">Arroz integral 5kg</p>
            <p className="display text-[24px] text-[#146B32]">R$ 28,90</p>
          </div>
        }
      />
    ),
  },
  {
    bg: "bg-[#D3EACB]",
    ink: "text-[#0B2B1F]",
    clause: ["Então, confirme", "o valor."],
    card: (
      <ListCard
        total="R$ 82,34"
        count="4 itens"
        percent={41}
        line="Café torrado 500g · R$ 18,50"
        action="Confirmar"
        detail={
          <div className="mt-3 flex items-center justify-between rounded-lg bg-[#EAF6E4] px-3 py-2 text-[17px] font-semibold">
            <span>Quantidade</span>
            <span>− 1 +</span>
          </div>
        }
      />
    ),
  },
  {
    bg: "bg-[#0B2B1F]",
    ink: "text-white",
    clause: ["Por fim, feche", "o carrinho."],
    card: (
      <ListCard
        total="R$ 142,80"
        count="10 itens"
        percent={71}
        line="Dentro da meta · sobram R$ 57,20"
        action="Fechar carrinho"
      />
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="gestos" aria-labelledby="gestos-titulo" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {FIELDS.map((field, index) => (
        <div
          key={field.clause[0]}
          className={`relative flex min-h-[64svh] flex-col justify-between gap-8 px-[var(--margin)] py-8 max-lg:pt-20 lg:h-[84svh] ${field.bg} ${field.ink}`}
        >
          {index === 0 ? (
            <Reveal>
              <h2 id="gestos-titulo" className="display text-[clamp(36px,4.4vw,64px)] max-lg:mb-4">
                Quatro gestos.
              </h2>
            </Reveal>
          ) : null}
          <Reveal
            delay={index * 80}
            className="lg:absolute lg:bottom-7 lg:left-[var(--margin)] lg:right-[var(--margin)]"
          >
            <p className="text-[clamp(24px,2vw,32px)] font-bold leading-[1.15]">
              {field.clause[0]}
              <br />
              {field.clause[1]}
            </p>
          </Reveal>
          <Reveal delay={index * 80 + 120} className="rise-hover lg:absolute lg:left-1/2 lg:top-[38%] lg:-translate-x-1/2">
            {field.card}
          </Reveal>
        </div>
      ))}
    </section>
  );
}
