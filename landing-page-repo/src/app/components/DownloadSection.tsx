import { Download, ShieldCheck, Smartphone } from "lucide-react"
import { APK_URL, QR_URL } from "../data"
import { ButtonLink, Container, SectionHeading } from "./ui"

const installSteps = [
  {
    number: "1",
    title: "Baixar",
    text: "Toque no botão para receber o arquivo.",
  },
  {
    number: "2",
    title: "Permitir",
    text: "Autorize a instalação quando o celular pedir.",
  },
  {
    number: "3",
    title: "Instalar",
    text: "Conclua e abra o aplicativo para começar.",
  },
]

export function DownloadSection({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="baixar"
      className={`scroll-mt-24 ${compact ? "py-16" : "py-20 sm:py-28"}`}
    >
      <Container>
        <div className="grid items-center gap-12 rounded-4xl bg-ink px-6 py-9 text-white shadow-soft sm:px-10 sm:py-12 lg:grid-cols-[1.15fr_.85fr] lg:px-16">
          <div>
            <SectionHeading
              eyebrow="Pronto para começar?"
              title="Sua próxima compra pode ser mais tranquila."
              description="Baixe o aplicativo, organize a lista e acompanhe o total em cada corredor."
              inverse
            />
            <div className="mt-8">
              <ButtonLink href={APK_URL} download className="w-full sm:w-auto">
                <Download
                  className="size-4"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                Baixar APK
              </ButtonLink>
            </div>
            <ol className="mt-9 grid gap-4 sm:grid-cols-3">
              {installSteps.map((step) => (
                <li key={step.number} className="flex gap-3 sm:block">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-medium text-white">
                    {step.number}
                  </span>
                  <div className="sm:mt-3">
                    <p className="text-sm font-medium text-white">
                      {step.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-white/55">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mx-auto w-full max-w-sm rounded-3xl bg-white p-6 text-center text-ink shadow-[0_20px_60px_-24px_rgba(0,0,0,.7)]">
            <div className="mb-5 flex items-center justify-center gap-2 text-xs font-medium text-brand">
              <Smartphone className="size-4" strokeWidth={1.8} />
              Aponte a câmera do celular
            </div>
            <img
              src={QR_URL}
              alt="QR code para baixar o aplicativo fechou o carrinho"
              className="mx-auto size-[200px] rounded-xl"
            />
            <div className="mt-5 inline-flex items-center gap-2 text-xs text-muted">
              <ShieldCheck
                className="size-4 text-brand"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              Link direto para o download
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
