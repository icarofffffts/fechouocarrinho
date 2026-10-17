import { Camera, Pencil } from "lucide-react"
import { BrandMark } from "./ui"

const PRODUCE_IMAGE =
  "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=90&w=1200"

export function PhoneMockup() {
  return (
    <div className="phone-float relative mx-auto w-full max-w-[320px] px-2 py-2 sm:px-0 lg:max-w-[356px] lg:py-6">
      <div
        className="absolute inset-x-8 bottom-2 h-20 rounded-full bg-ink/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative rounded-[3.25rem] bg-[#0E1728] p-[9px] shadow-[0_32px_70px_-24px_rgba(14,23,40,.5)] ring-1 ring-white/15">
        <span
          className="absolute -left-[3px] top-28 h-16 w-[3px] rounded-l-full bg-[#2B3445]"
          aria-hidden="true"
        />
        <span
          className="absolute -right-[3px] top-40 h-20 w-[3px] rounded-r-full bg-[#2B3445]"
          aria-hidden="true"
        />

        <div className="relative overflow-hidden rounded-[2.72rem] bg-white">
          <div
            className="absolute left-1/2 top-2.5 z-40 h-1.5 w-14 -translate-x-1/2 rounded-full bg-white/25"
            aria-hidden="true"
          />

          <div className="relative z-30 flex h-[66px] items-end gap-2.5 bg-brand px-5 pb-3.5 text-white">
            <BrandMark
              inverted
              size="small"
              className="shadow-none ring-1 ring-white/30"
            />
            <p className="display text-[14px] tracking-[-0.02em]">
              Meu Carrinho
            </p>
            <span className="ml-auto mb-1 size-1.5 rounded-full bg-white/65" />
          </div>

          <div className="relative h-[438px] overflow-hidden bg-ink">
            <img
              src={PRODUCE_IMAGE}
              alt="Banca de hortifrúti vista pela câmera do aplicativo"
              className="h-full w-full object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-ink/5 via-transparent to-ink/25"
              aria-hidden="true"
            />

            <div className="absolute right-0 top-0 z-20 w-[152px] rounded-bl-[1.5rem] bg-white px-4 py-3.5 shadow-[0_16px_32px_-18px_rgba(14,23,40,.55)]">
              <p className="text-[8px] font-medium uppercase tracking-[0.17em] text-muted">
                Você economiza
              </p>
              <p className="display mt-1 text-[20px] leading-none text-brand">
                R$ 34,00
              </p>
              <p className="mt-1.5 text-[9px] text-muted">neste mês</p>
            </div>

            <div className="absolute inset-x-4 top-[138px] z-10 rounded-[1.6rem] border border-accent bg-white/95 p-3.5 shadow-[0_20px_45px_-18px_rgba(14,23,40,.6)] backdrop-bl-md">
              <div className="flex items-center justify-between">
                <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-muted">
                  Mire na etiqueta
                </p>
                <span className="flex items-center gap-1 text-[8px] font-medium text-brand">
                  <span className="size-1.5 rounded-full bg-brand" />
                  Câmera ativa
                </span>
              </div>

              <div className="relative mt-3 grid h-[104px] place-items-center overflow-hidden rounded-[1.1rem] border border-dashed border-accent bg-[#FFFCF8]">
                <span
                  className="scanner-line absolute inset-x-7 top-1/2 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent shadow-[0_0_10px_rgba(255,107,0,.45)]"
                  aria-hidden="true"
                />
                <p className="display relative bg-[#FFFCF8] px-4 text-[22px] tracking-[0.04em] text-ink">
                  R$ 7,89
                </p>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-[0.9rem] bg-ink text-[13px] font-medium text-white transition-colors hover:bg-[#243046]"
                >
                  <Camera
                    className="size-4"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  Capturar
                </button>
                <button
                  type="button"
                  className="grid size-11 shrink-0 place-items-center rounded-[0.9rem] border border-ink/15 bg-white text-ink transition-colors hover:bg-cream"
                  aria-label="Editar preço"
                >
                  <Pencil className="size-4" strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white px-5 pb-5 pt-4">
            <div className="space-y-2.5 text-[10px] text-muted">
              <div className="flex items-center justify-between gap-4">
                <span>Arroz Camil 5kg</span>
                <strong className="font-medium text-ink">R$ 29,90</strong>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Café Pilão 500g</span>
                <strong className="font-medium text-ink">R$ 15,49</strong>
              </div>
            </div>

            <div className="mt-4 flex min-h-[60px] items-center justify-between rounded-[1.15rem] bg-brand px-5 text-white">
              <span className="text-[10px] font-medium uppercase tracking-[0.06em]">
                Total
              </span>
              <strong className="display text-[25px] tracking-[-0.035em]">
                R$ 53,28
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute -left-3 top-1/3 -z-10 size-24 rounded-full bg-accent/10 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-4 bottom-24 -z-10 size-28 rounded-full bg-brand/15 blur-3xl"
        aria-hidden="true"
      />
    </div>
  )
}
