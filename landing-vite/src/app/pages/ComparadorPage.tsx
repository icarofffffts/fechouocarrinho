import { ArrowRight, MapPin, Route } from "lucide-react"
import { Link } from "react-router"
import { Container, SectionHeading } from "../components/ui"
import { PageHero } from "../components/PageHero"

const CITY = "Belo Horizonte, MG"

type MarketResult = {
  slug: string
  name: string
  total: number
  extra: number
  distance: number
  winner?: boolean
}

const results: MarketResult[] = [
  { slug: "bh", name: "Supermercados BH", total: 189.4, extra: 0, distance: 2.4, winner: true },
  { slug: "epa", name: "EPA", total: 204.2, extra: 14.8, distance: 1.8 },
  { slug: "mart-minas", name: "Mart Minas", total: 211.8, extra: 22.4, distance: 3.1 },
]

function brl(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function routeUrl(name: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${name}, ${CITY}`,
  )}`
}

export function ComparadorPage() {
  const winner = results.find((result) => result.winner)!

  return (
    <>
      <title>Comparador de mercados — Fechou o Carrinho</title>
      <PageHero
        eyebrow="Comparador"
        title="Compare o total da mesma lista em redes diferentes."
        description="Veja onde a sua lista pesa menos e abra a rota real até o mercado escolhido."
        actions={
          <a
            href={routeUrl(winner.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-medium text-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <Route className="size-4" strokeWidth={1.8} />
            Ver rota do menor preço
          </a>
        }
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-4xl border border-black/[0.06] bg-white p-6 shadow-card sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              sua lista
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="display text-2xl tracking-[-0.03em] sm:text-3xl">
                Arroz, Feijão, Leite, Café + 8 itens
              </h2>
              <p className="display text-3xl text-brand sm:text-4xl">
                {brl(winner.total)}
              </p>
            </div>
            <p className="mt-2 text-sm text-muted">12 itens • mesma lista</p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Resultado por rede"
            title="Ordenado do menor para o maior total."
            description="Os valores consideram a mesma lista em cada rede."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {results.map((result) => (
              <article
                key={result.slug}
                className={`rounded-4xl border p-6 shadow-card transition-transform hover:-translate-y-1 ${
                  result.winner
                    ? "border-brand bg-brand text-white shadow-soft"
                    : "border-black/[0.06] bg-cream"
                }`}
              >
                {result.winner && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-brand">
                    Menor preço
                  </span>
                )}
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="display text-2xl tracking-[-0.03em]">
                      {result.name}
                    </h3>
                    <p
                      className={`mt-1 text-sm ${
                        result.winner ? "text-white/70" : "text-muted"
                      }`}
                    >
                      12 itens • {result.distance.toFixed(1).replace(".", ",")} km
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="display text-3xl tracking-[-0.03em]">
                      {brl(result.total)}
                    </p>
                    {result.extra > 0 && (
                      <p
                        className={`mt-1 text-sm font-medium ${
                          result.winner ? "text-[#FFBE8A]" : "text-orange-500"
                        }`}
                      >
                        + {brl(result.extra)}
                      </p>
                    )}
                    {result.winner && (
                      <p className="mt-1 text-xs text-white/70">
                        economia de {brl(27.6)}
                      </p>
                    )}
                  </div>
                </div>

                <a
                  href={routeUrl(result.name === "EPA" ? "EPA Supermercados" : result.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-all hover:-translate-y-0.5 ${
                    result.winner
                      ? "bg-white text-brand"
                      : "bg-white text-ink shadow-sm hover:text-brand"
                  }`}
                >
                  <Route className="size-4" strokeWidth={1.8} />
                  Ver rota real
                </a>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Comparativo visual"
            title="Quanto cada rede pesa no total."
          />
          <div className="mt-10 mx-auto max-w-3xl space-y-5 rounded-4xl border border-black/[0.06] bg-white p-6 shadow-card sm:p-8">
            {results.map((result) => {
              const width = `${(result.total / 220) * 100}%`
              return (
                <div key={result.slug} className="grid grid-cols-[4rem_1fr_6rem] items-center gap-4">
                  <span className="text-sm font-medium text-muted">
                    {result.name === "Supermercados BH"
                      ? "BH"
                      : result.name === "Mart Minas"
                        ? "Mart"
                        : "EPA"}
                  </span>
                  <div className="h-3 overflow-hidden rounded-full bg-cream">
                    <div
                      className={`h-full rounded-full ${
                        result.winner ? "bg-brand" : "bg-ink/25"
                      }`}
                      style={{ width }}
                    />
                  </div>
                  <span
                    className={`text-right text-sm font-medium ${
                      result.winner ? "text-brand" : "text-muted"
                    }`}
                  >
                    {brl(result.total)}
                  </span>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="bg-brand-soft py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-4xl border border-brand/20 bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-brand text-white">
                !
              </span>
              <h2 className="display text-xl tracking-[-0.03em] text-brand">
                Dica
              </h2>
            </div>
            <p className="mt-4 text-base leading-7 text-ink">
              Comprando no BH você economiza {brl(22.4)} vs. Mart Minas.
            </p>
            <Link
              to="/supermercados"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-medium text-white shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Usar lista no Supermercados BH
              <ArrowRight className="size-4" strokeWidth={1.8} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
