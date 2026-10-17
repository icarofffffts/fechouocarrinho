import type { ReactNode } from "react"
import { Container } from "./ui"

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <section className="grid-lines border-b border-black/[0.05] bg-white py-16 sm:py-24">
      <Container>
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-brand">
            {eyebrow}
          </p>
          <h1 className="display text-balance text-4xl leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {description}
          </p>
          {actions && (
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
          )}
        </div>
      </Container>
    </section>
  )
}
