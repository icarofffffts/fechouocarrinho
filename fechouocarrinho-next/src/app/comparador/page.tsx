import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Comparador de mercados — Fechou o Carrinho",
  description:
    "Compare o total da sua lista entre supermercados usando apenas os preços que você registrou no app.",
};

const PASSOS = [
  ["1", "Escolha o mercado", "Antes de escanear, selecione a rede em que você está."],
  ["2", "Registre os preços", "Cada item guarda o mercado onde foi lido."],
  ["3", "Compare o total", "Com duas ou mais redes, o menor total aparece destacado."],
];

export default function Comparador() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0B2B1F]">
      <SiteHeader ativo="Comparador" />

      <section className="mx-auto max-w-[1320px] px-5 pt-14 pb-8 md:px-10 md:pt-20">
        <p className="text-[12px] font-semibold uppercase tracking-[.16em] text-[#1B8C42]">Comparador</p>
        <h1 className="mt-4 text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[.95] tracking-[-.05em]">
          Comparar mercados.
        </h1>
        <p className="mt-5 max-w-[60ch] text-[17px] leading-7 text-[#3E5347]">
          Veja quanto a sua lista custaria em cada rede. A comparação usa apenas os preços que você registrou — sem
          estimativa inventada.
        </p>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-16 md:px-10">
        <div className="rounded-[28px] border border-[#0B2B1F]/12 bg-white p-7 md:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#1B8C42]/10 text-xl font-semibold text-[#1B8C42]">
              ↔
            </span>
            <div>
              <h2 className="text-[24px] font-semibold tracking-[-.03em]">A comparação acontece dentro do app</h2>
              <p className="mt-2 max-w-[62ch] text-[16px] leading-7 text-[#5A6B63]">
                O site não exibe totais de mercado: os preços são lidos por você, no seu aparelho. Aqui mostramos como a
                comparação funciona e o que é preciso para ela aparecer.
              </p>
              <a
                href="/supermercados"
                className="mt-6 inline-flex h-11 items-center rounded-full bg-[#1B8C42] px-5 text-sm font-semibold text-white transition hover:bg-[#146B32]"
              >
                Ver supermercados
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-20 md:px-10 md:pb-28">
        <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-[.98] tracking-[-.04em]">
          Como a comparação funciona
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {PASSOS.map(([n, t, d]) => (
            <div key={n} className="rounded-3xl border border-[#0B2B1F]/12 bg-white p-6">
              <span className="text-xl font-semibold text-[#1B8C42]">{n}</span>
              <h3 className="mt-3 text-[17px] font-semibold tracking-[-.02em]">{t}</h3>
              <p className="mt-2 text-[14px] leading-6 text-[#5A6B63]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
