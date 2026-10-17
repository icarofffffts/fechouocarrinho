import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Fechou o Carrinho — Seu total sem sustos no caixa",
  description: "Aponte a câmera para a etiqueta, o app lê o preço e soma no total do carrinho em tempo real. Escolha seu supermercado e economize.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col antialiased bg-[#FFF8F0] text-[#111827]" style={{ fontFamily: "var(--font-inter)" }}>
        {children}
      </body>
    </html>
  );
}
