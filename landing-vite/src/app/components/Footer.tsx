import { Mail } from "lucide-react"
import { Link } from "react-router"
import { BrandLogo, Container } from "./ui"

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_.8fr] md:py-16">
        <div>
          <BrandLogo />
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
            Controle simples do total para comprar com mais tranquilidade.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Navegue
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <Link className="hover:text-brand" to="/como-funciona">
                Como funciona
              </Link>
              <Link className="hover:text-brand" to="/supermercados">
                Supermercados
              </Link>
              <Link className="hover:text-brand" to="/ajuda">
                Ajuda
              </Link>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Fale com a gente
            </p>
            <a
              className="inline-flex items-center gap-2 text-sm hover:text-brand"
              href="mailto:contato@fechouocarrinho.site"
            >
              <Mail className="size-4" strokeWidth={1.8} aria-hidden="true" />
              contato@fechouocarrinho.site
            </a>
            <p className="mt-4 text-sm text-muted">© 2026</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
