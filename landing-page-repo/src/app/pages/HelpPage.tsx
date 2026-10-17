import {
  Camera,
  Download,
  ListChecks,
  Mail,
  Plus,
  ShieldCheck,
  Store,
} from "lucide-react"
import { DownloadSection } from "../components/DownloadSection"
import { PageHero } from "../components/PageHero"
import {
  ButtonLink,
  CardLink,
  Container,
  SectionHeading,
} from "../components/ui"
import { APK_URL, faqs } from "../data"

const helpLinks = [
  {
    icon: ShieldCheck,
    title: "Instalar o aplicativo",
    description: "Veja o passo a passo para começar.",
    href: "#instalacao",
  },
  {
    icon: Camera,
    title: "Usar a câmera",
    description: "Aprenda a enquadrar e conferir um preço.",
    href: "/como-funciona#aponte",
  },
  {
    icon: ListChecks,
    title: "Acompanhar o total",
    description: "Entenda como revisar sua lista.",
    href: "/como-funciona#acompanhe",
  },
  {
    icon: Store,
    title: "Sugerir supermercado",
    description: "Conte qual rede você usa na sua cidade.",
    href: "/supermercados#sugerir",
  },
]

export function HelpPage() {
  return (
    <>
      <title>Ajuda — Fechou o Carrinho</title>
      <PageHero
        eyebrow="Ajuda"
        title="Como podemos ajudar?"
        description="Encontre respostas rápidas para instalar o aplicativo, usar a câmera e organizar sua próxima compra."
        actions={
          <ButtonLink href={APK_URL} download>
            <Download className="size-4" strokeWidth={1.8} />
            Baixar APK
          </ButtonLink>
        }
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {helpLinks.map((item) => (
              <CardLink
                key={item.title}
                href={item.href}
                icon={item.icon}
                title={item.title}
                description={item.description}
                className="bg-white"
              />
            ))}
          </div>
        </Container>
      </section>

      <section id="instalacao" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Instalação"
            title="Comece em três passos."
            description="O próprio celular orienta você durante todo o processo."
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["01", "Baixe o arquivo", "Toque no botão de download do site."],
              [
                "02",
                "Dê a permissão",
                "Confirme quando o celular solicitar autorização.",
              ],
              [
                "03",
                "Conclua a instalação",
                "Abra o aplicativo e prepare sua primeira lista.",
              ],
            ].map(([number, title, text]) => (
              <li
                key={number}
                className="rounded-4xl border border-black/[0.06] bg-cream p-7"
              >
                <span className="display text-4xl text-brand/30">{number}</span>
                <h3 className="display mt-8 text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Dúvidas frequentes"
              title="Respostas diretas para seguir em frente."
              description="Se a sua dúvida não estiver aqui, fale com a gente por e-mail."
            />
            <div className="mt-8 rounded-3xl bg-brand p-6 text-white">
              <Mail className="size-7" strokeWidth={1.6} />
              <p className="display mt-5 text-xl">Ainda precisa de ajuda?</p>
              <a
                href="mailto:contato@fechouocarrinho.site"
                className="mt-4 inline-block text-sm font-medium underline underline-offset-4"
              >
                contato@fechouocarrinho.site
              </a>
            </div>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-3xl border border-black/[0.06] bg-white px-6 shadow-sm"
                open={index === 0}
              >
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 font-medium">
                  {faq.question}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition-transform group-open:rotate-45">
                    <Plus className="size-4" strokeWidth={1.8} />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-sm leading-6 text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <DownloadSection compact />
    </>
  )
}
