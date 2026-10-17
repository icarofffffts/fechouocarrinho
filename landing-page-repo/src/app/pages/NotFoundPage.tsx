import { ArrowLeft, HelpCircle } from "lucide-react"
import { ButtonLink, Container } from "../components/ui"

export function NotFoundPage() {
  return (
    <>
      <title>Página não encontrada — Fechou o Carrinho</title>
      <section className="grid-lines grid min-h-[65vh] place-items-center bg-white py-20">
        <Container className="text-center">
          <p className="display text-7xl text-brand/20">404</p>
          <h1 className="display mt-3 text-4xl tracking-[-0.04em]">
            Esta página saiu da lista.
          </h1>
          <p className="mx-auto mt-4 max-w-md leading-7 text-muted">
            Volte para o início ou veja as respostas mais comuns na página de
            ajuda.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/">
              <ArrowLeft className="size-4" strokeWidth={1.8} />
              Voltar ao início
            </ButtonLink>
            <ButtonLink href="/ajuda" variant="secondary">
              <HelpCircle className="size-4" strokeWidth={1.8} />
              Ir para ajuda
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
