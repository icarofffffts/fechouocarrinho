import type { ComponentType, ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>

export function Container({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  )
}

export function BrandMark({
  className = "",
  inverted = false,
  size = "default",
}: {
  className?: string
  inverted?: boolean
  size?: "default" | "small"
}) {
  const tile = inverted ? "#FFFFFF" : "#1B8C42"
  const tag = inverted ? "#1B8C42" : "#FFFFFF"
  const check = inverted ? "#FFFFFF" : "#1B8C42"

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={`shrink-0 shadow-[0_8px_20px_-10px_rgba(27,140,66,.7)] ${
        size === "small"
          ? "size-7 rounded-[0.6rem]"
          : "size-11 rounded-[0.95rem]"
      } ${className}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="12.5" fill={tile} />
      <path
        d="M7.5 9.8H10C12 9.8 13.6 11.1 14 13L14.4 14.8H26.5C27.2 14.8 27.8 15.1 28.3 15.6L33.2 20.2C33.8 20.8 33.8 21.7 33.2 22.3L28.3 26.9C27.8 27.4 27.2 27.7 26.5 27.7H16.4C14.8 27.7 13.5 26.6 13.2 25.1L10.9 14.4C10.7 13.6 10.3 13.1 9.5 13.1H7.5C6.5 13.1 5.7 12.4 5.7 11.4C5.7 10.5 6.5 9.8 7.5 9.8Z"
        fill={tag}
      />
      <path
        d="M15.5 20.7L18.2 23.3L23 18.2"
        stroke={check}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28.4" cy="21.25" r="1.65" fill="#FF6B00" />
      <circle cx="17" cy="31.15" r="1.8" fill={tag} />
      <circle cx="25.6" cy="31.15" r="1.8" fill={tag} />
    </svg>
  )
}

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-3 rounded-xl text-ink"
      aria-label="fechou o carrinho — início"
    >
      <BrandMark className="transition-transform group-hover:-rotate-3" />
      {!compact && (
        <span className="display text-[1.05rem] leading-[0.95] tracking-[-0.035em] sm:text-xl">
          fechou o<span className="block text-brand">carrinho</span>
        </span>
      )}
    </Link>
  )
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  className = "",
  download = false,
}: {
  children: ReactNode
  href: string
  variant?: "primary" | "secondary" | "dark" | "light"
  className?: string
  download?: boolean
}) {
  const styles = {
    primary:
      "bg-brand text-white shadow-[0_12px_28px_-12px_rgba(27,140,66,.75)] hover:bg-brand-dark",
    secondary:
      "border border-ink/15 bg-white text-ink hover:border-brand/40 hover:text-brand",
    dark: "bg-ink text-white hover:bg-[#263244]",
    light: "bg-white text-ink hover:bg-cream",
  }
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 ${styles[variant]} ${className}`

  if (href.startsWith("/downloads") || href.startsWith("http")) {
    return (
      <a className={classes} href={href} download={download}>
        {children}
      </a>
    )
  }

  return (
    <Link className={classes} to={href}>
      {children}
    </Link>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  inverse?: boolean
}) {
  return (
    <div
      data-reveal
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      {eyebrow && (
        <p
          className={`mb-4 text-xs font-medium uppercase tracking-[0.18em] ${
            inverse ? "text-[#76D493]" : "text-brand"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`display text-balance text-3xl leading-[1.08] tracking-[-0.035em] sm:text-4xl lg:text-5xl ${
          inverse ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${
            inverse ? "text-white/60" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export function IconTile({
  icon: Icon,
  className = "",
}: {
  icon: IconType
  className?: string
}) {
  return (
    <span
      className={`grid size-12 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105 ${className}`}
    >
      <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
    </span>
  )
}

export function CardLink({
  href,
  icon,
  title,
  description,
  className = "",
  children,
}: {
  href: string
  icon?: IconType
  title: string
  description?: string
  className?: string
  children?: ReactNode
}) {
  const Icon = icon
  return (
    <Link
      to={href}
      data-reveal
      className={`group block rounded-4xl border border-black/[0.06] p-6 shadow-card transition-[opacity,transform,box-shadow] duration-700 hover:-translate-y-1 hover:shadow-soft ${className}`}
    >
      {Icon && (
        <IconTile
          icon={Icon}
          className="mb-8 bg-white/80 text-brand shadow-sm"
        />
      )}
      <h3 className="display text-xl leading-tight tracking-[-0.02em]">
        {title}
      </h3>
      {description && (
        <p className="mt-3 text-sm leading-6 text-current opacity-70">
          {description}
        </p>
      )}
      {children ?? (
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
          Saiba mais
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </span>
      )}
    </Link>
  )
}
