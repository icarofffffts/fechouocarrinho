"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Preciso de internet dentro do supermercado para o app funcionar?",
    answer: "Não! O Fechou o Carrinho foi projetado especificamente para locais sem sinal. O algoritmo de OCR (reconhecimento de texto da etiqueta) roda 100% no processador do seu próprio celular, sem precisar de conexão 4G, 5G ou Wi-Fi.",
  },
  {
    question: "Preciso criar conta, fazer login ou colocar cartão de crédito?",
    answer: "Não. O aplicativo é 100% gratuito e de uso livre (guest-first). Você abre e já pode sair escaneando. O login com Google ou e-mail é totalmente opcional e serve exclusivamente para quem deseja sincronizar listas em tempo real com familiares.",
  },
  {
    question: "Como funciona a leitura de preços nas etiquetas?",
    answer: "Basta abrir a aba da câmera e posicionar a etiqueta de preço dentro das 4 cantoneiras verdes. O leitor inteligente identifica os números automaticamente — suportando etiquetas com 'R$', sem 'R$', com vírgula, com ponto ou com espaço nos centavos (como nas redes EPA, Zepa, BH e Mart Minas).",
  },
  {
    question: "O app é compatível com o meu celular Android?",
    answer: "Sim! Ele funciona em qualquer celular com Android 8.0 (Oreo) ou superior, incluindo modelos mais simples e aparelhos de entrada. O aplicativo é leve (49MB), consome pouquíssima bateria e não deixa o celular lento.",
  },
  {
    question: "Como instalo o aplicativo através do arquivo APK?",
    answer: "É muito simples: 1) Toque no botão 'Baixar APK' aqui no site; 2) Quando o download terminar, toque em 'Abrir'; 3) Se o celular pedir autorização para 'Instalar de fontes desconhecidas', basta confirmar para este arquivo. A instalação leva menos de 5 segundos.",
  },
  {
    question: "Meus dados de compras e histórico ficam salvos onde?",
    answer: "Suas compras ficam salvas exclusivamente no banco de dados interno e seguro do seu celular (SQLite/Room). Nenhuma informação sua é vendida ou compartilhada com anunciantes. Zero anúncios e zero rastreadores.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="ajuda" className="bg-[#FFF8F0] border-t border-zinc-200 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-[#1B8C42] rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            Tire Suas Dúvidas
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-zinc-900 mt-4 tracking-tight" style={{ fontFamily: "var(--font-nunito)" }}>
            Perguntas Frequentes
          </h2>
          <p className="text-zinc-600 mt-3 text-base max-w-xl mx-auto">
            Tudo o que você precisa saber sobre o leitor de etiquetas, funcionamento offline e segurança do app.
          </p>
        </div>

        {/* ACCORDION LIST */}
        <div className="mt-12 space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="bg-white border border-zinc-200/90 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 select-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-lg text-zinc-900 leading-snug" style={{ fontFamily: "var(--font-nunito)" }}>
                    {faq.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-transform duration-200 ${
                      isOpen
                        ? "bg-[#1B8C42] text-white rotate-180"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-zinc-600 leading-relaxed border-t border-zinc-100 pt-4 animate-spring-toast">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* EXTRA HELP FOOTNOTE */}
        <div className="mt-10 text-center">
          <p className="text-xs text-zinc-500">
            Ainda tem dúvidas? Fale com nossa equipe técnica:{" "}
            <a href="mailto:contato@fechouocarrinho.site" className="text-[#1B8C42] font-bold underline hover:text-emerald-700">
              contato@fechouocarrinho.site
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
