import {
  Camera,
  Eye,
  FileText,
  MapPin,
  Smartphone,
  Users,
  WifiOff,
  Zap,
} from "lucide-react"

export const APK_URL =
  "https://fechouocarrinho.site/downloads/fechouocarrinho.apk"

export const QR_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://fechouocarrinho.site/downloads/fechouocarrinho.apk"

export const steps = [
  {
    id: "escolha",
    number: "01",
    icon: MapPin,
    title: "Escolha onde vai comprar",
    description:
      "Comece sua lista e deixe tudo pronto antes de entrar no mercado.",
    tone: "cream",
  },
  {
    id: "aponte",
    number: "02",
    icon: Camera,
    title: "Aponte para a etiqueta",
    description:
      "Use a câmera para colocar o preço na lista sem perder o ritmo.",
    tone: "dark",
  },
  {
    id: "acompanhe",
    number: "03",
    icon: FileText,
    title: "Acompanhe o total",
    description:
      "Veja a soma crescer enquanto compra e chegue ao caixa preparado.",
    tone: "green",
  },
] as const

export const quickBenefits = [
  {
    icon: Zap,
    title: "Rápido e leve",
    href: "/como-funciona#aponte",
  },
  {
    icon: Eye,
    title: "Sem internet no mercado",
    href: "/como-funciona#offline",
  },
  {
    icon: Users,
    title: "Feito para o dia a dia",
    href: "/como-funciona#dia-a-dia",
  },
] as const

export const benefits = [
  {
    icon: WifiOff,
    title: "Funciona sem internet",
    description:
      "Continue usando sua lista mesmo nos corredores onde o sinal não chega.",
    href: "/como-funciona#offline",
  },
  {
    icon: Smartphone,
    title: "Leve para qualquer celular",
    description: "Uma experiência simples para acompanhar você em cada compra.",
    href: "/ajuda#instalacao",
  },
  {
    icon: Users,
    title: "Lista que ajuda no dia a dia",
    description:
      "Mais clareza para organizar a compra e evitar surpresas no caixa.",
    href: "/como-funciona#dia-a-dia",
  },
] as const

export const stores = [
  {
    slug: "epa",
    initials: "EPA",
    name: "EPA Supermercados",
    location: "Várias cidades • MG",
    color: "bg-[#F9C74F] text-[#4B3700]",
  },
  {
    slug: "mart-minas",
    initials: "MM",
    name: "Mart Minas",
    location: "Várias cidades • MG",
    color: "bg-[#E63946] text-white",
  },
  {
    slug: "bh",
    initials: "BH",
    name: "Supermercados BH",
    location: "Várias cidades • MG",
    color: "bg-[#2554A3] text-white",
  },
  {
    slug: "supernosso",
    initials: "SN",
    name: "Supernosso",
    location: "Várias cidades • MG",
    color: "bg-[#F58220] text-white",
  },
  {
    slug: "verdemar",
    initials: "VM",
    name: "Verdemar",
    location: "Várias cidades • MG",
    color: "bg-[#2A9D5B] text-white",
  },
  {
    slug: "carrefour",
    initials: "CA",
    name: "Carrefour",
    location: "MG • SP • RJ",
    color: "bg-[#1F4AA8] text-white",
  },
  {
    slug: "assai",
    initials: "AM",
    name: "Assaí Atacadista",
    location: "Várias cidades • MG",
    color: "bg-[#FF8A00] text-white",
  },
] as const

export const faqs = [
  {
    question: "Como instalo o aplicativo?",
    answer:
      "Baixe o arquivo pelo botão do site, permita a instalação quando o celular solicitar e conclua seguindo as instruções da tela.",
  },
  {
    question: "Preciso de internet dentro do mercado?",
    answer:
      "Não. Depois de instalado, você pode montar a lista, registrar preços e acompanhar o total sem depender do sinal do mercado.",
  },
  {
    question: "Como a câmera lê uma etiqueta?",
    answer:
      "Abra a câmera pelo aplicativo, mantenha o preço dentro da moldura e toque em Capturar. Confira o valor antes de adicionar.",
  },
  {
    question: "Posso corrigir um preço?",
    answer:
      "Sim. Antes de seguir com a compra, você pode revisar e ajustar os valores da sua lista.",
  },
  {
    question: "O aplicativo mostra preços dos mercados?",
    answer:
      "Ainda não. A consulta de preços está em preparação; por enquanto, o aplicativo ajuda você a registrar os valores encontrados.",
  },
] as const
