import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Download,
  MapPin,
  Store,
} from "lucide-react"
import { Link } from "react-router"
import { DownloadSection } from "../components/DownloadSection"
import { PhoneMockup } from "../components/PhoneMockup"
import { StoreGrid } from "../components/StoreGrid"
import {
  ButtonLink,
  CardLink,
  Container,
  SectionHeading,
} from "../components/ui"
import { APK_URL, benefits, quickBenefits, steps } from "../data"

export function HomePage() {
  return (
    <>
      <title>Fechou o Carrinho — seu total sem sustos</title>
      <section className="relative overflow-hidden bg-cream py-7 sm:py-16 lg:py-24">
        <div
          className="absolute inset-x-0 bottom-0 h-px bg-ink/10"
          aria-hidden="true"
        />
        <Container className="relative grid items-center gap-0 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
          <div>
            <div className="hero-enter inline-flex max-w-full items-center gap-2 text-xs font-medium text-brand sm:text-sm">
              <CheckCircle2
                className="size-4 shrink-0"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <span>
                Funciona sem internet
                <span className="hidden sm:inline">
                  {" "}
                  • Leve para qualquer celular
                </span>
              </span>
            </div>
            <h1 className="hero-enter hero-enter-delay-1 display text-balance mt-5 max-w-3xl text-[clamp(2.35rem,10.5vw,2.65rem)] leading-[0.98] tracking-[-0.055em] text-ink sm:mt-7 sm:text-6xl lg:text-[4.7rem]">
              Seu total <span className="text-brand">sem sustos</span> no caixa.
            </h1>
            <p className="hero-enter hero-enter-delay-2 mt-4 max-w-xl text-[15px] leading-6 text-muted sm:mt-6 sm:text-lg sm:leading-7">
              <span className="lg:hidden">
                Aponte para a etiqueta e acompanhe o total enquanto compra.
              </span>
              <span className="hidden lg:inline">
                Monte sua lista, aponte a câmera para a etiqueta e acompanhe o
                valor da compra enquanto percorre o mercado.
              </span>
            </p>
            <p className="hero-enter hero-enter-delay-2 mt-5 hidden border-l-2 border-accent pl-4 text-sm font-medium text-ink lg:block">
              Sem conta de cabeça. Sem descobrir o total só no fim.
            </p>
            <div className="hero-enter hero-enter-delay-3 mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:gap-3">
              <ButtonLink
                href={APK_URL}
                download
                className="min-h-11 whitespace-nowrap !px-2 sm:min-h-12 sm:!px-6"
              >
                <Download
                  className="size-4"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                Baixar APK
              </ButtonLink>
              <ButtonLink
                href="/como-funciona"
                variant="secondary"
                className="min-h-11 whitespace-nowrap !px-2 sm:min-h-12 sm:!px-6"
              >
                <span className="sm:hidden">Como funciona</span>
                <span className="hidden sm:inline">Ver como funciona</span>
                <ArrowRight
                  className="hidden size-4 sm:block"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </ButtonLink>
            </div>

            <div className="mt-5 lg:hidden">
              <PhoneMockup />
            </div>

            <div className="hero-enter hero-enter-delay-4 mt-7 grid gap-4 border-t border-ink/10 pt-5 sm:grid-cols-3 sm:gap-0 lg:mt-10">
              {quickBenefits.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="group flex items-center gap-3 text-xs font-medium sm:border-l sm:border-ink/10 sm:px-4 sm:first:border-l-0 sm:first:pl-0"
                  >
                    <span className="grid size-8 shrink-0 place-items-center text-brand">
                      <Icon
                        className="size-4"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="hidden lg:block">
            <PhoneMockup />
          </div>
        </Container>
      </section>

      <section className="bg-brand py-8 text-white sm:py-10">
        <Container className="grid gap-5 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
          {[
            ["01", "Você escolhe o produto."],
            ["02", "A câmera registra o preço."],
            ["03", "O total fica à vista."],
          ].map(([number, text], index) => (
            <div className="contents" key={number}>
              <div
                data-reveal
                className={`flex items-baseline gap-4 border-b border-white/15 py-4 sm:border-b-0 sm:py-0 ${
                  index === 1
                    ? "reveal-delay-1"
                    : index === 2
                      ? "reveal-delay-2 border-b-0"
                      : ""
                }`}
              >
                <span className="display text-xl text-white/40">{number}</span>
                <p className="display text-lg tracking-[-0.02em]">{text}</p>
              </div>
              {index < 2 && (
                <ArrowRight
                  className="hidden size-5 text-white/35 sm:block"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Como funciona"
              title="Três passos. Uma compra mais tranquila."
              description="Do primeiro item ao total final, tudo foi pensado para não atrapalhar o seu ritmo."
            />
          </div>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {steps.map((step, index) => (
              <Link
                key={step.id}
                to={`/como-funciona#${step.id}`}
                data-reveal
                className={`group grid gap-5 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-center ${
                  index === 1
                    ? "reveal-delay-1"
                    : index === 2
                      ? "reveal-delay-2"
                      : ""
                }`}
              >
                <span className="display text-4xl text-accent/70">
                  {step.number}
                </span>
                <div>
                  <h3 className="display text-2xl tracking-[-0.025em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
                    {step.description}
                  </p>
                </div>
                <span className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <ArrowUpRight
                    className="size-4"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Supermercados"
              title="Onde você compra"
              description="Redes presentes em várias cidades, com uma experiência pensada para acompanhar sua rotina."
            />
            <label className="block shrink-0">
              <span className="mb-2 block text-xs font-medium text-muted">
                Selecione o estado
              </span>
              <span className="relative block">
                <MapPin
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand"
                  strokeWidth={1.8}
                />
                <select className="min-h-12 appearance-none rounded-full border border-black/10 bg-white py-3 pl-11 pr-10 text-sm font-medium shadow-sm">
                  <option>Minas Gerais</option>
                  <option disabled>São Paulo — em breve</option>
                  <option disabled>Rio de Janeiro — em breve</option>
                </select>
              </span>
            </label>
          </div>
          <div className="mt-10">
            <StoreGrid linkCards />
          </div>
          <div className="mt-8 text-center">
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-dark"
              to="/supermercados#sugerir"
            >
              <Store className="size-4" strokeWidth={1.8} />
              Sugerir supermercado
              <ArrowRight className="size-4" strokeWidth={1.8} />
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Por que usar"
            title="Mais clareza em cada corredor."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => (
              <CardLink
                key={benefit.title}
                href={benefit.href}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                className="bg-cream text-ink"
              />
            ))}
          </div>
        </Container>
      </section>

      <DownloadSection />
    </>
  )
}
