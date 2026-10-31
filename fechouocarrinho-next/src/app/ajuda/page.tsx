import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Ajuda — Fechou o Carrinho",
  description: "Instalação, leitura da etiqueta e listas. O que você precisa para começar a usar o app.",
};

const FAQ = [
  {
    q: "Como instalar o APK?",
    a: "Baixe pelo botão, toque em Abrir e depois em Instalar. Se o sistema pedir, permita a instalação apenas para este arquivo. O processo leva segundos.",
  },
  {
    q: "Preciso de internet no mercado?",
    a: "Não. A leitura da etiqueta acontece no próprio aparelho, ideal para quando o sinal falha dentro do mercado.",
  },
  {
    q: "Posso corrigir um preço?",
    a: "Sim. Se a leitura não ficar perfeita, toque no valor e digite manualmente antes de adicionar à lista.",
  },
  {
    q: "Meu mercado não está na lista. O que faço?",
    a: "Na página de supermercados, clique em Sugerir supermercado e informe nome e cidade. Analisamos e liberamos para todos.",
  },
  {
    q: "Onde ficam minhas listas?",
    a: "No próprio aparelho. Se você conectou uma conta, as listas também podem ser sincronizadas com a nuvem.",
  },
];

export default function Ajuda() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#0B2B1F]">
      <SiteHeader ativo="Ajuda" />

      <section className="mx-auto max-w-[1320px] px-5 pt-14 pb-8 md:px-10 md:pt-20">
        <p className="text-[12px] font-semibold uppercase tracking-[.16em] text-[#1B8C42]">Ajuda</p>
        <h1 className="mt-4 text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[.95] tracking-[-.05em]">Ajuda.</h1>
        <p className="mt-5 max-w-[54ch] text-[17px] leading-7 text-[#3E5347]">
          Instalação, leitura da etiqueta e listas. O que você precisa para começar sem tropeço.
        </p>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-16 md:px-10 md:pb-24">
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="group rounded-[20px] border border-[#0B2B1F]/12 bg-white px-7 py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-semibold tracking-[-.02em]">
                {item.q}
                <span className="text-xl text-[#5A6B63] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-[70ch] text-[15px] leading-6 text-[#5A6B63]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-[#0B2B1F] px-5 py-20 text-[#F4F3EF] md:px-10 md:py-24">
        <div className="mx-auto max-w-[1320px]">
          <h2 className="max-w-[18ch] text-[clamp(2rem,4.6vw,3rem)] font-semibold leading-[.95] tracking-[-.045em]">
            Ainda precisa de ajuda?
          </h2>
          <p className="mt-4 max-w-[46ch] text-[16px] leading-7 text-white/65">
            Fale com a gente por e-mail. Respondemos em até dois dias úteis.
          </p>
          <a
            href="mailto:contato@fechouocarrinho.site"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-[#1B8C42] px-6 text-[15px] font-semibold text-white transition hover:bg-[#146B32]"
          >
            contato@fechouocarrinho.site
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
