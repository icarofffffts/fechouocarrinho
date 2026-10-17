import {
  ArrowRight,
  Check,
  Download,
  ListChecks,
  ScanLine,
  ShoppingBasket,
} from "lucide-react"
import { DownloadSection } from "../components/DownloadSection"
import { PageHero } from "../components/PageHero"
import { ButtonLink, Container, SectionHeading } from "../components/ui"
import { APK_URL, steps } from "../data"

const details = [
  {
    id: "escolha",
    kicker: "Antes de sair",
    title: "Comece com uma lista que cabe na sua rotina.",
    description:
      "Anote o que precisa, escolha o mercado e entre na loja sabendo o que procurar. A lista fica organizada para você gastar menos tempo decidindo no corredor.",
    points: [
      "Itens organizados",
      "Compra mais objetiva",
      "Tudo em um só lugar",
    ],
    visual: ShoppingBasket,
  },
  {
    id: "aponte",
    kicker: "Durante a compra",
    title: "Viu o preço? Aponte, confira e siga.",
    description:
      "Enquadre a etiqueta na câmera, capture o valor e confirme antes de colocar na lista. É um gesto rápido para você não precisar guardar números de cabeça.",
    points: [
      "Moldura fácil de seguir",
      "Valor sempre conferido",
      "Correção simples",
    ],
    visual: ScanLine,
  },
  {
    id: "acompanhe",
    kicker: "Até chegar ao caixa",
    title: "O total acompanha cada item do carrinho.",
    description:
      "A cada produto, a soma é atualizada. Assim, você pode ajustar escolhas com calma e chegar ao caixa com uma expectativa muito mais clara.",
    points: [
      "Soma sempre visível",
      "Lista fácil de revisar",
      "Mais tranquilidade",
    ],
    visual: ListChecks,
  },
]

export function HowItWorksPage() {
  return (
    <>
      <title>Como funciona — Fechou o Carrinho</title>
      <PageHero
        eyebrow="Como funciona"
        title="Da lista ao caixa, tudo fica mais simples."
        description="Um caminho direto para organizar os itens, registrar os preços e acompanhar o total sem quebrar o ritmo da compra."
        actions={
          <>
            <ButtonLink href={APK_URL} download>
              <Download className="size-4" strokeWidth={1.8} />
              Baixar APK
            </ButtonLink>
            <ButtonLink href="/ajuda" variant="secondary">
              Tirar uma dúvida
            </ButtonLink>
          </>
        }
      />

      <section className="py-14 sm:py-20">
        <Container>
          <nav
            className="grid gap-3 sm:grid-cols-3"
            aria-label="Etapas de funcionamento"
          >
            {steps.map((step) => (
              <a
                key={step.id}
                href={`#${step.id}`}
                className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 text-sm font-medium shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-xs text-brand">
                  {step.number}
                </span>
                {step.title}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container className="space-y-8">
          {details.map((detail, index) => {
            const Visual = detail.visual
            return (
              <article
                id={detail.id}
                key={detail.id}
                className="scroll-mt-28 grid items-center gap-10 rounded-4xl border border-black/[0.06] bg-white p-6 shadow-card sm:p-10 lg:grid-cols-2 lg:p-14"
              >
                <div className={index % 2 ? "lg:order-2" : ""}>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
                    {detail.kicker}
                  </p>
                  <h2 className="display text-balance mt-4 text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">
                    {detail.title}
                  </h2>
                  <p className="mt-5 text-base leading-7 text-muted">
                    {detail.description}
                  </p>
                  <ul className="mt-7 space-y-3">
                    {detail.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="grid size-6 place-items-center rounded-full bg-brand-soft text-brand">
                          <Check className="size-3.5" strokeWidth={2} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`grid min-h-72 place-items-center overflow-hidden rounded-3xl ${
                    index === 1 ? "bg-ink" : "bg-cream"
                  } ${index % 2 ? "lg:order-1" : ""}`}
                >
                  <div className="relative">
                    <div
                      className={`absolute inset-0 scale-150 rounded-full blur-3xl ${
                        index === 1 ? "bg-accent/25" : "bg-brand/15"
                      }`}
                    />
                    <Visual
                      className={`relative size-28 ${
                        index === 1 ? "text-white" : "text-brand"
                      }`}
                      strokeWidth={1.15}
                    />
                  </div>
                </div>
              </article>
            )
          })}
        </Container>
      </section>

      <section id="offline" className="scroll-mt-24 bg-brand py-20 text-white">
        <Container className="grid gap-10 md:grid-cols-2 md:items-end">
          <SectionHeading
            eyebrow="Sem depender do sinal"
            title="Continue mesmo quando a internet não acompanha."
            description="A lista e o total ficam com você durante a compra, inclusive nos corredores mais fechados."
            inverse
          />
          <div
            id="dia-a-dia"
            className="scroll-mt-28 rounded-3xl bg-white/10 p-6"
          >
            <p className="display text-2xl">Pensado para o dia a dia</p>
            <p className="mt-3 text-sm leading-6 text-white/65">
              Poucos passos, textos claros e controles grandes para qualquer
              pessoa começar sem complicação.
            </p>
            <ButtonLink href="/ajuda" variant="light" className="mt-6">
              Ver ajuda
              <ArrowRight className="size-4" strokeWidth={1.8} />
            </ButtonLink>
          </div>
        </Container>
      </section>

      <DownloadSection compact />
    </>
  )
}
