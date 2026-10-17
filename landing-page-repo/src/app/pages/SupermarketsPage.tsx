import { ArrowRight, MapPin, Send, Store } from "lucide-react"
import { useState } from "react"
import { DownloadSection } from "../components/DownloadSection"
import { PageHero } from "../components/PageHero"
import { StoreGrid } from "../components/StoreGrid"
import { ButtonLink, Container, SectionHeading } from "../components/ui"

export function SupermarketsPage() {
  const [state, setState] = useState("mg")

  return (
    <>
      <title>Supermercados — Fechou o Carrinho</title>
      <PageHero
        eyebrow="Supermercados"
        title="Onde você compra, a lista vai junto."
        description="Estamos preparando a cobertura de redes em diferentes cidades. Enquanto isso, você já pode usar a lista para registrar os preços encontrados."
        actions={
          <ButtonLink href="#redes">
            Ver redes
            <ArrowRight className="size-4" strokeWidth={1.8} />
          </ButtonLink>
        }
      />

      <section id="redes" className="scroll-mt-24 py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Cobertura"
              title="Redes presentes em várias cidades."
              description="Selecione um estado para ver a disponibilidade planejada."
            />
            <label className="block shrink-0">
              <span className="mb-2 block text-xs font-medium text-muted">
                Estado
              </span>
              <span className="relative block">
                <MapPin
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand"
                  strokeWidth={1.8}
                />
                <select
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  className="min-h-12 min-w-60 appearance-none rounded-full border border-black/10 bg-white py-3 pl-11 pr-10 text-sm font-medium shadow-sm"
                >
                  <option value="mg">Minas Gerais</option>
                  <option value="sp">São Paulo</option>
                  <option value="rj">Rio de Janeiro</option>
                </select>
              </span>
            </label>
          </div>

          <div className="mt-10">
            {state === "mg" ? (
              <StoreGrid />
            ) : (
              <div className="rounded-4xl border border-dashed border-brand/30 bg-brand-soft px-6 py-16 text-center">
                <Store
                  className="mx-auto size-10 text-brand"
                  strokeWidth={1.5}
                />
                <h3 className="display mt-5 text-2xl">Cobertura em breve</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
                  Estamos organizando as redes deste estado. Você pode sugerir o
                  mercado que mais usa.
                </p>
                <a
                  href="mailto:contato@fechouocarrinho.site?subject=Sugestão%20de%20supermercado"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand"
                >
                  Enviar sugestão
                  <Send className="size-4" strokeWidth={1.8} />
                </a>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Em diferentes cidades"
            title="Uma experiência simples, onde quer que você compre."
            description="A lista não depende de uma rede específica. Você registra o preço que está vendo e acompanha o total da sua própria compra."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-cream p-6">
              <p className="display text-3xl text-brand">7 redes</p>
              <p className="mt-2 text-sm text-muted">mapeadas inicialmente</p>
            </div>
            <div className="rounded-3xl bg-ink p-6 text-white">
              <p className="display text-3xl">Várias cidades</p>
              <p className="mt-2 text-sm text-white/55">
                com expansão planejada
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="sugerir" className="scroll-mt-24 py-20 sm:py-28">
        <Container>
          <div className="rounded-4xl bg-brand-soft p-7 sm:p-12 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
                Sua cidade importa
              </p>
              <h2 className="display mt-4 text-3xl tracking-[-0.035em] sm:text-4xl">
                Não encontrou o mercado que usa?
              </h2>
              <p className="mt-4 leading-7 text-muted">
                Conte para a gente qual rede deveria aparecer por aqui.
              </p>
            </div>
            <a
              href="mailto:contato@fechouocarrinho.site?subject=Sugestão%20de%20supermercado"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-medium text-white shadow-sm transition-transform hover:-translate-y-0.5 lg:mt-0"
            >
              <Send className="size-4" strokeWidth={1.8} />
              Sugerir supermercado
            </a>
          </div>
        </Container>
      </section>

      <DownloadSection compact />
    </>
  )
}
