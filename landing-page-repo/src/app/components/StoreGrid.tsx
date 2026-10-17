import { ArrowRight, Clock3 } from "lucide-react"
import { Link } from "react-router"
import { stores } from "../data"

export function StoreGrid({ linkCards = false }: { linkCards?: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stores.map((store) => {
        const content = (
          <>
            <div
              className={`grid size-14 place-items-center rounded-2xl text-sm font-medium shadow-sm ${store.color}`}
              aria-hidden="true"
            >
              {store.initials}
            </div>
            <h3 className="display mt-5 text-lg tracking-[-0.02em]">
              {store.name}
            </h3>
            <p className="mt-1 text-xs text-muted">{store.location}</p>
            {linkCards ? (
              <span className="mt-5 inline-flex min-h-10 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#F0F1F3] px-4 text-xs font-medium text-[#9299A5]">
                <Clock3
                  className="size-3.5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                Preços em breve
              </span>
            ) : (
              <button
                type="button"
                disabled
                className="mt-5 inline-flex min-h-10 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#F0F1F3] px-4 text-xs font-medium text-[#9299A5]"
              >
                <Clock3
                  className="size-3.5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                Preços em breve
              </button>
            )}
            {linkCards && (
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brand">
                Conhecer a cobertura
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>
            )}
          </>
        )

        if (linkCards) {
          return (
            <Link
              key={store.slug}
              to={`/supermercados#rede-${store.slug}`}
              data-reveal
              className="group rounded-3xl border border-black/[0.06] bg-white p-5 shadow-card transition-[opacity,transform,box-shadow] duration-700 hover:-translate-y-1 hover:shadow-soft"
            >
              {content}
            </Link>
          )
        }

        return (
          <article
            id={`rede-${store.slug}`}
            key={store.slug}
            data-reveal
            className="scroll-mt-28 rounded-3xl border border-black/[0.06] bg-white p-5 shadow-card"
          >
            {content}
          </article>
        )
      })}
    </div>
  )
}
