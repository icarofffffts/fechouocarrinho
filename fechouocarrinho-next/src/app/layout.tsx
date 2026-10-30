import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fechou o Carrinho — Seu total sem sustos no caixa",
  description:
    "Fotografe a etiqueta e acompanhe o total da compra no próprio aparelho. Funciona sem internet dentro do mercado.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "fechou o carrinho",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFF8F0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body className="min-h-full bg-[#FFF8F0] text-[#0B2B1F] antialiased">
        {children}
      </body>
    </html>
  );
}
