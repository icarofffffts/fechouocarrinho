import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const STEPS = [
  {
    n: "01",
    title: "Escolha o mercado",
    text: "Defina onde vai comprar e dê um nome à lista. Cada lista guarda seus próprios itens e seu próprio total.",
    bullets: ["Lista separada por mercado", "Troque de mercado quando quiser", "Sugira uma rede que ainda não está"],
  },
  {
    n: "02",
    title: "Fotografe a etiqueta",
    text: "Aponte a câmera para o preço na prateleira. A leitura é feita no próprio aparelho, sem depender do sinal.",
    bullets: ["Uma foto por item", "Se falhar, digite o valor", "Funciona offline"],
  },
  {
    n: "03",
    title: "Confirme e siga",
    text: "Confira o valor, ajuste a quantidade e veja o total se atualizar na hora. Você sempre sabe quanto já gastou.",
    bullets: ["Total por lista", "Ajuste de quantidade", "Recibo para compartilhar"],
  },
];

export const metadata = {
  title: "Como funciona — Fechou o Carrinho",
  description:
    "Escolha o mercado, fotografe a etiqueta e acompanhe o total da compra. A leitura acontece no aparelho, mesmo sem internet.",
};

export default function ComoFunciona() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0B2B1F]">
      <SiteHeader ativo="Como funciona" />

      <section className="mx-auto max-w-[1320px] px-5 pt-14 pb-6 md:px-10 md:pt-20">
        <p className="text-[12px] font-semibold uppercase tracking-[.16em] text-[#1B8C42]">Como funciona</p>
        <h1 className="mt-4 max-w-[16ch] text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[.95] tracking-[-.05em]">
          Três gestos. Nenhuma surpresa.
        </h1>
        <p className="mt-5 max-w-[58ch] text-[17px] leading-7 text-[#3E5347]">
          Escolha o mercado, fotografe a etiqueta e acompanhe o total. A conta acontece no aparelho, mesmo sem sinal
          dentro da loja.
        </p>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-16 md:px-10 md:pb-24">
        {STEPS.map((step) => (
          <div key={step.n} className="grid gap-6 border-t border-[#0B2B1F]/15 py-8 md:grid-cols-[120px_1fr_480px] md:gap-10 md:py-10">
            <span className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-none text-[#1B8C42]">{step.n}</span>
            <div>
              <h2 className="text-[26px] font-semibold leading-tight tracking-[-.03em]">{step.title}</h2>
              <p className="mt-3 max-w-[46ch] text-[16px] leading-7 text-[#5A6B63]">{step.text}</p>
            </div>
            <ul className="rounded-3xl border border-[#0B2B1F]/12 bg-white p-6">
              {step.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 py-2 text-[15px] text-[#3E5347]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B8C42]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="bg-[#0B2B1F] px-5 py-20 text-[#F4F3EF] md:px-10 md:py-24">
        <div className="mx-auto max-w-[1320px]">
          <h2 className="max-w-[14ch] text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[.95] tracking-[-.045em]">
            O que fica no seu aparelho.
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {[
              ["Listas", "Criadas por você, com nome e total próprios. Sem cadastro obrigatório."],
              ["Preços", "Lidos na etiqueta e somados localmente. Nada é enviado sem você mandar."],
              ["Sincronização", "Opcional. Quando ativa, sua conta guarda as listas para continuar em outro aparelho."],
            ].map(([t, d]) => (
              <div key={t}>
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-2 max-w-[34ch] text-[15px] leading-7 text-white/65">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1B8C42] px-5 py-20 text-white md:px-10">
        <div className="mx-auto max-w-[1320px]">
          <h2 className="max-w-[18ch] text-[clamp(2rem,4.6vw,3rem)] font-semibold leading-[.96] tracking-[-.045em]">
            Pronto para testar?
          </h2>
          <p className="mt-4 max-w-[46ch] text-[16px] leading-7 text-white/80">
            Baixe o app e faça sua primeira lista em menos de um minuto.
          </p>
          <a
            href="/downloads/fechouocarrinho.apk"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-6 text-[15px] font-semibold text-[#1B8C42] transition hover:bg-[#FFF8F0]"
          >
            Baixar para Android
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
