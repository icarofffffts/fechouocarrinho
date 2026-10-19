import { Download, Menu, X } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router"
import { APK_URL } from "../data"
import { BrandLogo, Container } from "./ui"

const links = [
  { label: "Como funciona", to: "/como-funciona" },
  { label: "Supermercados", to: "/supermercados" },
  { label: "Comparador", to: "/comparador" },
  { label: "Ajuda", to: "/ajuda" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between sm:h-[72px]">
        <BrandLogo />
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Principal"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-soft text-brand"
                    : "text-muted hover:bg-cream hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={APK_URL}
            download
            className="ml-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#263244]"
          >
            <Download className="size-4" strokeWidth={1.8} aria-hidden="true" />
            Baixar APK
          </a>
        </nav>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl border border-black/10 bg-white text-ink lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="size-5" strokeWidth={1.8} />
          ) : (
            <Menu className="size-5" strokeWidth={1.8} />
          )}
        </button>
      </Container>
      {open && (
        <div id="mobile-menu" className="border-t border-black/[0.06] bg-white">
          <Container className="flex flex-col gap-2 py-5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-medium ${
                    isActive ? "bg-brand-soft text-brand" : "text-ink"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={APK_URL}
              download
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-white"
            >
              <Download className="size-4" strokeWidth={1.8} />
              Baixar APK
            </a>
          </Container>
        </div>
      )}
    </header>
  )
}
