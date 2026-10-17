import {
  ArrowDown,
  Bell,
  Camera,
  Check,
  Crown,
  Download,
  FileCode,
  FileJson,
  MoreHorizontal,
  ScanLine,
  Sparkles,
  WifiOff,
} from "lucide-react"
import { BrandMark } from "../components/ui"
import { APK_URL, QR_URL } from "../data"

const brand = {
  green: "#1B8C42",
  orange: "#FF6B00",
  cream: "#FFF8F0",
  ink: "#111827",
}

function BoardLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
      {children}
    </p>
  )
}

function Wordmark({
  inverse = false,
  vertical = false,
  scale = "default",
}: {
  inverse?: boolean
  vertical?: boolean
  scale?: "small" | "default" | "large"
}) {
  const textSize = {
    small: "text-base sm:text-xl",
    default: "text-xl sm:text-3xl",
    large: "text-3xl sm:text-5xl",
  }[scale]

  return (
    <div
      className={`flex items-center gap-3 sm:gap-4 ${
        vertical ? "flex-col text-center" : ""
      } ${inverse ? "text-white" : "text-ink"}`}
    >
      <BrandMark inverted={inverse} />
      <span
        className={`display whitespace-nowrap leading-none tracking-[-0.04em] ${textSize}`}
      >
        fechou o carrinho
      </span>
    </div>
  )
}

function AppInterface() {
  return (
    <div className="relative mx-auto w-[244px] overflow-hidden rounded-t-[2.75rem] border-[6px] border-ink bg-cream shadow-[14px_12px_0_rgba(17,24,39,.18)] sm:w-[290px]">
      <div className="flex h-10 items-center justify-between px-5 text-[8px] font-semibold">
        <span>9:41</span>
        <span className="h-2.5 w-9 rounded-full bg-ink" />
      </div>
      <div className="px-5 pb-8">
        <div className="flex items-center">
          <BrandMark size="small" className="shadow-none" />
          <span className="display ml-2 text-base">fechou</span>
          <MoreHorizontal className="ml-auto size-4" strokeWidth={2} />
        </div>
        <p className="display mt-7 text-xs">olá, bora às compras?</p>
        <div className="mt-3 rounded-2xl bg-brand p-5 text-white">
          <p className="text-[8px] font-medium">total até agora</p>
          <p className="display mt-3 text-3xl tracking-[-0.04em]">R$ 147,82</p>
          <p className="mt-2 text-[8px] text-white/65">18 itens no carrinho</p>
        </div>
        <button
          type="button"
          className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-accent text-[10px] font-medium text-white"
        >
          <Camera className="size-3.5" strokeWidth={1.8} />
          registrar preço
        </button>
        <div className="mt-5 border-t border-ink/10">
          {[
            ["Arroz integral", "2 un · R$ 8,49", "R$ 16,98"],
            ["Café torrado", "1 un · R$ 18,90", "R$ 18,90"],
          ].map(([name, detail, price]) => (
            <div
              key={name}
              className="grid grid-cols-[28px_1fr_auto] items-center gap-3 border-b border-ink/5 py-3"
            >
              <span className="size-7 rounded-lg bg-[#EAE5DC]" />
              <span>
                <strong className="block text-[8px] font-medium">{name}</strong>
                <small className="mt-1 block text-[6px] text-muted">
                  {detail}
                </small>
              </span>
              <strong className="text-[8px] font-medium">{price}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ShoppingBag() {
  return (
    <div className="relative mx-auto w-full max-w-[390px] pt-12">
      <div
        className="absolute left-1/2 top-0 h-28 w-40 -translate-x-1/2 rounded-t-full border-[14px] border-[#E8DCCB] border-b-0"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 left-6 top-16 h-[360px] bg-[#D8C9B5]"
        aria-hidden="true"
      />
      <div className="relative grid h-[360px] place-items-center bg-[#EFE3D1] px-8 text-center">
        <div>
          <BrandMark className="mx-auto size-16 rounded-[1.25rem] shadow-none" />
          <p className="display mt-5 text-2xl tracking-[-0.04em]">
            fechou o carrinho
          </p>
          <p className="mt-3 text-[9px] font-medium text-brand">
            Levou. Somou. Fechou.
          </p>
        </div>
      </div>
    </div>
  )
}

function FormatLabel({ children }: { children: string }) {
  return (
    <span className="absolute left-4 top-4 z-10 rounded-full border border-current/15 bg-white/90 px-3 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-ink backdrop-bl sm:left-5 sm:top-5">
      {children}
    </span>
  )
}

function PromoWordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 ${
        inverse ? "text-white" : "text-ink"
      }`}
    >
      <BrandMark size="small" className="shadow-none" />
      <span className="display text-sm tracking-[-0.035em]">
        fechou o carrinho
      </span>
    </div>
  )
}

function CampaignRule({
  children,
  inverse = false,
}: {
  children: string
  inverse?: boolean
}) {
  return (
    <span
      className={`inline-flex items-center font-mono text-[9px] font-semibold uppercase tracking-[0.14em] ${
        inverse ? "text-white/65" : "text-ink/55"
      }`}
    >
      {children}
    </span>
  )
}

function LogoPattern({
  density = "regular",
}: {
  density?: "regular" | "compact"
}) {
  const amount = density === "compact" ? 14 : 24

  return (
    <div
      className="pointer-events-none absolute -inset-12 z-0 grid rotate-[-7deg] grid-cols-4 place-items-center gap-8 overflow-hidden opacity-[0.065] sm:grid-cols-6"
      aria-hidden="true"
    >
      {Array.from({ length: amount }).map((_, index) => (
        <img
          key={index}
          src="/logo-mark.svg"
          alt=""
          className={`size-12 grayscale sm:size-16 ${
            index % 3 === 1 ? "translate-y-6 rotate-12" : ""
          } ${index % 4 === 2 ? "scale-75 -rotate-6" : ""}`}
        />
      ))}
    </div>
  )
}

const assetGroups = [
  {
    title: "Logos",
    items: [
      { name: "Logo mark", file: "logo-mark.svg", desc: "Símbolo isolado" },
      {
        name: "Logo horizontal",
        file: "logo-horizontal.svg",
        desc: "Assinatura positiva",
      },
      {
        name: "Logo horizontal (dark)",
        file: "logo-horizontal-dark.svg",
        desc: "Versão para fundos escuros",
      },
      {
        name: "Logo monocromático",
        file: "logo-monochrome.svg",
        desc: "Versão monocromática",
      },
    ],
  },
  {
    title: "Ícones",
    items: [
      { name: "Favicon", file: "favicon.svg", desc: "Ícone do site" },
      {
        name: "Apple touch icon",
        file: "apple-touch-icon.svg",
        desc: "Ícone para iOS",
      },
      {
        name: "Ícone Play Store",
        file: "ic_launcher_playstore.svg",
        desc: "Ícone 512 × 512",
      },
      {
        name: "Foreground (adaptive)",
        file: "ic_launcher_foreground.xml",
        desc: "Camada foreground Android",
      },
      {
        name: "Background (adaptive)",
        file: "ic_launcher_background.xml",
        desc: "Camada background Android",
      },
    ],
  },
  {
    title: "Feature graphic",
    items: [
      {
        name: "Feature graphic",
        file: "playstore-feature-graphic-1024x500.svg",
        desc: "Banner 1024 × 500 para Play Store",
      },
    ],
  },
  {
    title: "Banners in-app",
    items: [
      {
        name: "Welcome",
        file: "inapp-banner-welcome-720x240.svg",
        desc: "Banner de boas-vindas 720 × 240",
      },
      {
        name: "Dica do scanner",
        file: "inapp-banner-scanner-tip-720x200.svg",
        desc: "Banner dica 720 × 200",
      },
      {
        name: "Plano família",
        file: "inapp-banner-family-plan-720x200.svg",
        desc: "Banner plano família 720 × 200",
      },
    ],
  },
  {
    title: "Capturas de tela",
    items: [
      {
        name: "Total em tempo real",
        file: "screenshot-1-total-tempo-real-1080x2400.svg",
        desc: "Captura 1080 × 2400",
      },
      {
        name: "Leitor de etiquetas",
        file: "screenshot-2-leitor-etiquetas-1080x2400.svg",
        desc: "Captura 1080 × 2400",
      },
      {
        name: "Funciona offline",
        file: "screenshot-3-funciona-offline-1080x2400.svg",
        desc: "Captura 1080 × 2400",
      },
    ],
  },
  {
    title: "Tokens de design",
    items: [
      {
        name: "Brand tokens",
        file: "brand-tokens.json",
        desc: "Cores, tipografia e espaçamentos",
      },
    ],
  },
]

function AssetCard({ name, file, desc }: { name: string; file: string; desc: string }) {
  const isImage = /\.(svg|png|jpg|jpeg|webp)$/i.test(file)
  const Icon = file.endsWith(".json")
    ? FileJson
    : file.endsWith(".xml")
      ? FileCode
      : Download

  return (
    <article className="flex flex-col rounded-[1.4rem] border border-ink/10 bg-white p-5">
      <div className="grid h-36 place-items-center overflow-hidden rounded-xl bg-cream">
        {isImage ? (
          <img
            src={`/design-assets/${file}`}
            alt={name}
            className="max-h-28 max-w-full object-contain"
          />
        ) : (
          <Icon className="size-10 text-muted" strokeWidth={1.6} />
        )}
      </div>
      <h3 className="mt-4 text-sm font-medium text-ink">{name}</h3>
      <p className="mt-1 text-xs leading-5 text-muted">{desc}</p>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted/70">
        {file}
      </p>
      <a
        href={`/design-assets/${file}`}
        download
        className="mt-4 inline-flex min-h-9 items-center justify-center gap-2 rounded-full bg-ink px-4 text-xs font-medium text-white transition-all hover:-translate-y-0.5"
      >
        <Download className="size-3.5" strokeWidth={1.8} />
        Baixar
      </a>
    </article>
  )
}

export function BrandIdentityPage() {
  return (
    <>
      <title>Identidade visual — Fechou o Carrinho</title>
      <main className="min-h-screen bg-ink text-ink">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 px-5 py-3 text-white backdrop-bl-xl">
        <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandMark size="small" className="shadow-none" />
            <div>
              <p className="display text-sm">fechou o carrinho</p>
              <p className="text-[9px] uppercase tracking-[0.14em] text-white/45">
                sistema de identidade visual
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/logo-mark.svg"
              download
              className="hidden min-h-9 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-medium transition-colors hover:bg-white hover:text-ink sm:inline-flex"
            >
              <ArrowDown className="size-3.5" strokeWidth={1.8} />
              Baixar logo SVG
            </a>
            <a
              href="/"
              className="inline-flex min-h-9 items-center whitespace-nowrap rounded-full bg-white px-4 text-xs font-medium text-ink"
            >
              <span className="sm:hidden">Voltar ao site</span>
              <span className="hidden sm:inline">Ver landing page</span>
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-3 p-3 sm:space-y-4 sm:p-4">
        <section
          className="overflow-hidden rounded-[1.5rem] p-5 text-white sm:p-8 lg:p-12"
          style={{ backgroundColor: brand.green }}
        >
          <BoardLabel>02 — Sistema de marca</BoardLabel>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <h1 className="display max-w-3xl text-5xl leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
              Uma marca que cabe na rotina.
            </h1>
            <p className="max-w-lg text-sm font-medium leading-6 text-white/85 sm:text-base">
              Um sistema flexível para acompanhar a compra inteira — do primeiro
              item ao total no caixa.
            </p>
          </div>

          <div className="mt-10 grid overflow-hidden border border-white/40 lg:grid-cols-[1.3fr_.7fr]">
            <div className="grid min-h-[260px] place-items-center bg-cream p-7 text-ink sm:min-h-[330px]">
              <span className="absolute self-start justify-self-start font-mono text-[8px] uppercase tracking-[0.12em] text-ink/60">
                assinatura horizontal · positiva
              </span>
              <Wordmark scale="default" />
            </div>
            <div className="grid min-h-[240px] place-items-center border-t border-white/40 p-7 lg:border-l lg:border-t-0">
              <span className="absolute self-start justify-self-start font-mono text-[8px] uppercase tracking-[0.12em] text-white/65">
                símbolo isolado
              </span>
              <BrandMark className="size-24 rounded-[1.8rem] shadow-none sm:size-32" />
            </div>
            <div className="grid min-h-[250px] place-items-center border-t border-white/40 p-7">
              <span className="absolute self-start justify-self-start font-mono text-[8px] uppercase tracking-[0.12em] text-white/65">
                assinatura vertical
              </span>
              <Wordmark vertical scale="small" />
            </div>
            <div className="grid min-h-[250px] place-items-center border-t border-white/40 bg-ink p-7 lg:border-l">
              <span className="absolute self-start justify-self-start font-mono text-[8px] uppercase tracking-[0.12em] text-white/55">
                negativa
              </span>
              <Wordmark inverse scale="small" />
            </div>
            <div className="grid min-h-[240px] place-items-center border-t border-white/40 bg-white p-7 text-ink lg:col-span-2">
              <span className="absolute self-start justify-self-start font-mono text-[8px] uppercase tracking-[0.12em] text-ink/55">
                monocromática
              </span>
              <div className="grayscale">
                <Wordmark scale="default" />
              </div>
            </div>
          </div>
        </section>

        <section
          className="grid gap-4 rounded-[1.5rem] p-4 md:grid-cols-[1.35fr_.65fr]"
          style={{ backgroundColor: brand.green }}
        >
          <div className="flex min-h-[390px] flex-col rounded-[1.4rem] bg-cream p-7 sm:p-10">
            <BoardLabel>Redução</BoardLabel>
            <h2 className="mt-6 max-w-sm text-3xl leading-tight tracking-[-0.04em] sm:text-4xl">
              Clareza até o último pixel.
            </h2>
            <div className="mt-auto grid grid-cols-4 items-end gap-4 pt-14">
              {[
                ["size-4", "16 px"],
                ["size-6", "24 px"],
                ["size-8", "32 px"],
                ["size-12", "48 px"],
              ].map(([size, label]) => (
                <div key={label} className="text-center">
                  <img
                    src="/logo-mark.svg"
                    alt=""
                    className={`mx-auto ${size}`}
                  />
                  <p className="mt-6 font-mono text-[8px]">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-h-[390px] flex-col rounded-[1.4rem] bg-accent p-7 text-white sm:p-10">
            <BoardLabel>Tipografia</BoardLabel>
            <p className="display mt-12 text-5xl leading-[0.88] tracking-[-0.055em] sm:text-6xl">
              fechou
              <br />o carrinho
            </p>
            <p className="mt-auto pt-12 text-xs font-medium leading-5 text-white/90">
              Nunito ExtraBold como base: terminais arredondados, espaçamento
              ajustado e contraste de palavras para ganhar ritmo nas telas
              pequenas.
            </p>
          </div>
        </section>

        <section className="grid gap-4 rounded-[1.5rem] bg-ink md:grid-cols-[.82fr_1.18fr]">
          <div className="flex min-h-[390px] flex-col rounded-[1.4rem] bg-brand p-8 text-white sm:p-12">
            <BoardLabel>04 — Aplicações</BoardLabel>
            <h2 className="display mt-8 max-w-md text-5xl leading-[0.92] tracking-[-0.055em] sm:text-7xl">
              Do visor
              <br />à sacola.
            </h2>
            <p className="mt-8 max-w-md text-sm font-medium leading-6 text-white/80">
              Presença consistente nos pontos de contato digitais e físicos.
            </p>
          </div>
          <div className="min-h-[390px] rounded-[1.4rem] bg-accent p-7 sm:p-10">
            <BoardLabel>Ícone de aplicativo</BoardLabel>
            <div className="flex h-[310px] flex-col items-center justify-center gap-8 sm:flex-row">
              <div className="relative">
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-ink" />
                <BrandMark className="relative size-32 rounded-[2rem] shadow-none sm:size-40" />
              </div>
              <div>
                <p className="display text-4xl tracking-[-0.05em] text-ink sm:text-5xl">
                  fechou
                </p>
                <p className="mt-4 text-xs font-medium text-ink">
                  seu total, sem surpresa.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 rounded-[1.5rem] bg-ink md:grid-cols-[.82fr_1.18fr]">
          <div className="overflow-hidden rounded-[1.4rem] bg-brand p-6 text-ink sm:p-8">
            <BoardLabel>Interface mobile</BoardLabel>
            <div className="mt-10">
              <AppInterface />
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.4rem] bg-cream p-6 sm:p-8">
            <BoardLabel>Aplicação física</BoardLabel>
            <div className="mt-3">
              <ShoppingBag />
            </div>
          </div>
        </section>

        <section
          id="campanhas"
          className="rounded-[1.5rem] bg-cream p-4 sm:p-8 lg:p-12"
        >
          <BoardLabel>05 — Banners e campanhas</BoardLabel>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_.65fr] lg:items-end">
            <h2 className="display max-w-3xl text-5xl leading-[0.92] tracking-[-0.055em] sm:text-7xl">
              Uma mensagem para cada momento da compra.
            </h2>
            <p className="max-w-lg text-sm leading-6 text-muted">
              Peças de divulgação para apresentar benefícios, planos,
              novidades e avisos promocionais do aplicativo em diferentes
              formatos.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article className="relative min-h-[420px] overflow-hidden rounded-[1.6rem] bg-brand p-7 text-white sm:p-10 lg:col-span-2 lg:min-h-[500px]">
              <LogoPattern />
              <FormatLabel>Campanha horizontal · 1200 × 628</FormatLabel>
              <div className="relative z-10 grid min-h-[360px] items-center gap-10 pt-12 lg:grid-cols-[1fr_.8fr]">
                <div>
                  <PromoWordmark inverse />
                  <div className="mt-9">
                    <CampaignRule inverse>Compra mais leve</CampaignRule>
                  </div>
                  <h3 className="display mt-10 max-w-2xl text-5xl leading-[0.9] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
                    Seu total
                    <br />
                    sem sustos.
                  </h3>
                  <p className="mt-6 max-w-md text-sm leading-6 text-white/70 sm:text-base">
                    Registre cada preço e acompanhe a compra enquanto percorre o
                    mercado.
                  </p>
                  <span className="mt-8 inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-medium">
                    Baixar APK
                  </span>
                </div>
                <div className="relative mx-auto w-full max-w-md">
                  <div className="absolute -right-10 -top-10 size-52 rounded-full border border-white/15" />
                  <div className="absolute -left-5 top-12 z-10 flex size-12 items-center justify-center rounded-2xl bg-accent text-white shadow-[0_12px_30px_-14px_rgba(17,24,39,.8)]">
                    <ScanLine className="size-5" strokeWidth={2} />
                  </div>
                  <div className="relative rotate-2 rounded-[2rem] bg-white p-5 text-ink shadow-[0_28px_70px_-30px_rgba(17,24,39,.8)]">
                    <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-muted">
                      Mire na etiqueta
                    </p>
                    <div className="mt-4 grid min-h-36 place-items-center rounded-2xl border-2 border-dashed border-accent bg-cream">
                      <span className="display text-4xl">R$ 7,89</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-white">
                      <span className="text-xs">Total da compra</span>
                      <strong className="display text-2xl">R$ 53,28</strong>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article className="relative aspect-square overflow-hidden rounded-[1.6rem] bg-accent p-7 text-white sm:p-10">
              <LogoPattern density="compact" />
              <FormatLabel>Post quadrado · 1080 × 1080</FormatLabel>
              <div className="relative z-10 flex h-full flex-col justify-between pt-14">
                <PromoWordmark inverse />
                <div>
                  <div className="mb-7 flex items-end justify-between">
                    <BrandMark className="size-20 rounded-[1.5rem] shadow-none" />
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-white/30 bg-white/10">
                      <WifiOff className="size-5" strokeWidth={1.8} />
                    </div>
                  </div>
                  <h3 className="display text-5xl leading-[0.9] tracking-[-0.055em] sm:text-6xl">
                    O mercado
                    <br />
                    pode ficar sem sinal.
                    <br />
                    Sua lista, não.
                  </h3>
                </div>
                <div className="flex items-center justify-between border-t border-white/25 pt-5 text-sm font-medium">
                  <span>Funciona sem internet.</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-white/65">
                    sempre na lista
                  </span>
                </div>
              </div>
            </article>

            <article className="relative aspect-square overflow-hidden rounded-[1.6rem] bg-ink p-7 text-white sm:p-10">
              <LogoPattern density="compact" />
              <FormatLabel>Post de produto · 1080 × 1080</FormatLabel>
              <div className="relative z-10 flex h-full flex-col justify-between pt-14">
                <PromoWordmark inverse />
                <div className="rounded-[1.8rem] border border-white/15 bg-white/5 p-6">
                  <div className="relative grid min-h-40 place-items-center rounded-2xl border-2 border-dashed border-accent">
                    <span className="absolute left-4 top-4 font-mono text-[8px] uppercase tracking-[0.14em] text-white/50">
                      preço lido
                    </span>
                    <div className="text-center">
                      <p className="display text-5xl tracking-[-0.04em]">
                        R$ 7,89
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white">
                        <Check className="size-3" strokeWidth={2.5} />
                        adicionado
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <CampaignRule inverse>Preço por preço</CampaignRule>
                  <h3 className="display mt-4 text-4xl leading-none tracking-[-0.045em] sm:text-5xl">
                    Aponte. Capture. Some.
                  </h3>
                </div>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[1.6rem] bg-ink p-7 text-white sm:p-10 lg:col-span-2">
              <LogoPattern />
              <FormatLabel>Campanha de planos · 1200 × 628</FormatLabel>
              <div className="relative z-10 grid min-h-[520px] gap-12 pt-16 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
                <div>
                  <PromoWordmark inverse />
                  <div className="mt-10">
                    <CampaignRule inverse>Planos do seu jeito</CampaignRule>
                  </div>
                  <h3 className="display mt-6 max-w-xl text-5xl leading-[0.9] tracking-[-0.055em] sm:text-7xl">
                    Um plano para cada carrinho.
                  </h3>
                  <p className="mt-6 max-w-md text-sm leading-6 text-white/65 sm:text-base">
                    Comece grátis e escolha mais recursos quando sua rotina
                    pedir.
                  </p>
                  <span className="mt-8 inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-white">
                    Conhecer os planos
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex min-h-[330px] flex-col rounded-[1.8rem] bg-white p-6 text-ink sm:p-8">
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-brand">
                      Para começar
                    </span>
                    <h4 className="display mt-5 text-3xl tracking-[-0.04em]">
                      Essencial
                    </h4>
                    <p className="display mt-2 text-5xl tracking-[-0.05em]">
                      Grátis
                    </p>
                    <div className="mt-8 space-y-3 text-sm text-muted">
                      {[
                        "Lista de compras",
                        "Leitura de preços",
                        "Total em tempo real",
                      ].map((feature) => (
                        <p key={feature} className="flex items-center gap-2">
                          <Check
                            className="size-4 text-brand"
                            strokeWidth={2.2}
                          />
                          {feature}
                        </p>
                      ))}
                    </div>
                    <span className="mt-auto pt-8 text-xs font-medium text-brand">
                      Sempre com você
                    </span>
                  </div>

                  <div className="flex min-h-[330px] flex-col rounded-[1.8rem] bg-brand p-6 text-white sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/65">
                        Para compartilhar
                      </span>
                      <Crown className="size-5 text-accent" strokeWidth={1.8} />
                    </div>
                    <h4 className="display mt-5 text-3xl tracking-[-0.04em]">
                      Família
                    </h4>
                    <p className="display mt-2 text-4xl tracking-[-0.05em]">
                      Em breve
                    </p>
                    <div className="mt-8 space-y-3 text-sm text-white/70">
                      {[
                        "Listas compartilhadas",
                        "Histórico de compras",
                        "Avisos para todos",
                      ].map((feature) => (
                        <p key={feature} className="flex items-center gap-2">
                          <Check
                            className="size-4 text-accent"
                            strokeWidth={2.2}
                          />
                          {feature}
                        </p>
                      ))}
                    </div>
                    <span className="mt-auto pt-8 text-xs font-medium text-white">
                      Entre na lista de espera
                    </span>
                  </div>
                </div>
              </div>
            </article>

            <article className="relative aspect-square overflow-hidden rounded-[1.6rem] bg-brand p-7 text-white sm:p-10">
              <LogoPattern density="compact" />
              <FormatLabel>Aviso promocional · 1080 × 1080</FormatLabel>
              <div className="relative z-10 flex h-full flex-col justify-between pt-14">
                <div className="flex items-center justify-between">
                  <PromoWordmark inverse />
                  <span className="grid size-12 place-items-center rounded-2xl bg-accent text-white">
                    <Bell className="size-5" strokeWidth={1.8} />
                  </span>
                </div>
                <div>
                  <CampaignRule inverse>Novidade no app</CampaignRule>
                  <h3 className="display mt-6 text-5xl leading-[0.9] tracking-[-0.055em] sm:text-6xl">
                    Promoção boa é promoção que entra na lista.
                  </h3>
                  <p className="mt-5 max-w-md text-sm leading-6 text-white/70">
                    Ative os avisos e organize a próxima compra com mais calma.
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/20 pt-5">
                  <span className="text-sm font-medium">Ativar avisos</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">
                    toque para abrir
                  </span>
                </div>
              </div>
            </article>

            <article className="relative aspect-square overflow-hidden rounded-[1.6rem] bg-cream p-7 text-ink sm:p-10">
              <LogoPattern density="compact" />
              <FormatLabel>Banner de lançamento · 1080 × 1080</FormatLabel>
              <div className="relative z-10 flex h-full flex-col justify-between pt-14">
                <PromoWordmark />
                <div className="grid size-20 place-items-center rounded-[1.6rem] bg-accent text-white">
                  <Sparkles className="size-8" strokeWidth={1.6} />
                </div>
                <div>
                  <CampaignRule>Plano Essencial</CampaignRule>
                  <h3 className="display mt-5 text-5xl leading-[0.9] tracking-[-0.055em] sm:text-6xl">
                    Comece grátis. Continue no controle.
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-muted">
                    Lista, câmera e total da compra em um só lugar.
                  </p>
                </div>
                <span className="inline-flex min-h-11 w-fit items-center rounded-full bg-ink px-6 text-sm font-medium text-white">
                  Baixar o app
                </span>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[1.6rem] bg-[#F0E4D3] p-7 sm:min-h-[560px] sm:p-10">
              <LogoPattern />
              <FormatLabel>Story · 1080 × 1920</FormatLabel>
              <div className="relative z-10 flex min-h-[620px] flex-col pt-14">
                <PromoWordmark />
                <CampaignRule>Compra com clareza</CampaignRule>
                <p className="display mt-16 text-6xl leading-[0.88] tracking-[-0.06em] text-ink sm:text-7xl">
                  Você compra.
                  <br />A lista faz
                  <br />
                  as contas.
                </p>
                <div className="mt-auto rounded-[1.8rem] bg-brand p-7 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-white/60">
                        Total agora
                      </p>
                      <p className="display mt-3 text-5xl">R$ 147,82</p>
                    </div>
                    <span className="grid size-10 place-items-center rounded-xl bg-white/10 font-mono text-[9px] font-semibold">
                      18
                    </span>
                  </div>
                  <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full w-3/4 rounded-full bg-accent" />
                  </div>
                  <p className="mt-7 text-sm text-white/70">
                    Mais clareza em cada corredor.
                  </p>
                </div>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[1.6rem] bg-white p-7 sm:min-h-[560px] sm:p-10">
              <LogoPattern />
              <FormatLabel>Download · QR code</FormatLabel>
              <div className="relative z-10 flex min-h-[620px] flex-col items-center justify-center pt-12 text-center">
                <BrandMark className="size-24 rounded-[1.8rem] shadow-none" />
                <div className="mt-7">
                  <CampaignRule>Disponível agora</CampaignRule>
                </div>
                <h3 className="display mt-8 max-w-md text-5xl leading-[0.92] tracking-[-0.055em] sm:text-6xl">
                  Leve o total com você.
                </h3>
                <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
                  Aponte a câmera do celular e baixe o aplicativo.
                </p>
                <a
                  href={APK_URL}
                  className="mt-8 rounded-[1.4rem] border border-ink/10 bg-white p-4 shadow-card transition-transform hover:-translate-y-1"
                >
                  <img
                    src={QR_URL}
                    alt="QR code para baixar o aplicativo"
                    className="size-40 rounded-lg"
                  />
                </a>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[1.6rem] bg-cream px-6 py-8 lg:col-span-2">
              <LogoPattern density="compact" />
              <FormatLabel>Banner compacto · 1200 × 300</FormatLabel>
              <div className="relative z-10 flex min-h-[230px] flex-col justify-end gap-8 pt-14 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
                <div>
                  <PromoWordmark />
                  <div className="mt-5">
                    <CampaignRule>Feche a compra tranquilo</CampaignRule>
                  </div>
                  <h3 className="display mt-6 text-4xl leading-none tracking-[-0.045em] sm:text-5xl">
                    Mais calma no caixa.
                  </h3>
                </div>
                <div className="flex items-center gap-5">
                  <div className="hidden text-right sm:block">
                    <p className="text-xs font-medium text-muted">
                      Registre os preços.
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted">
                      Acompanhe o total.
                    </p>
                  </div>
                  <div className="hidden h-12 w-px bg-ink/10 sm:block" />
                  <span className="inline-flex min-h-11 items-center rounded-full bg-brand px-6 text-sm font-medium text-white">
                    Baixar APK
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section
          id="downloads"
          className="rounded-[1.5rem] bg-cream p-4 sm:p-8 lg:p-12"
        >
          <BoardLabel>06 — Downloads</BoardLabel>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end">
            <h2 className="display max-w-3xl text-5xl leading-[0.92] tracking-[-0.055em] text-ink sm:text-7xl">
              Baixe os assets da marca.
            </h2>
            <p className="max-w-lg text-sm leading-6 text-muted">
              Logos, ícones, feature graphic, banners, capturas de tela e tokens
              prontos para uso em campanhas e no produto.
            </p>
          </div>
          <div className="mt-10 space-y-10">
            {assetGroups.map((group) => (
              <div key={group.title}>
                <h3 className="display text-2xl tracking-[-0.04em] text-ink sm:text-3xl">
                  {group.title}
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.items.map((item) => (
                    <AssetCard
                      key={item.file}
                      name={item.name}
                      file={item.file}
                      desc={item.desc}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-col justify-between gap-4 px-2 py-8 text-xs text-white/50 sm:flex-row">
          <span>fechou o carrinho — identidade visual 2026</span>
          <span>Levou. Somou. Fechou.</span>
        </footer>
      </div>
      </main>
    </>
  )
}
