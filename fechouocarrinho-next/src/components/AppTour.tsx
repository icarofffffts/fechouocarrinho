const SCREENS = [
  {
    src: "/mockups/mockup_01_home_dashboard.svg",
    title: "Início",
    text: "O orçamento da compra e a lista de itens, na primeira tela.",
  },
  {
    src: "/mockups/mockup_02_scanner_ocr.svg",
    title: "Leitor de etiquetas",
    text: "Aponte para o preço na prateleira. A leitura roda no aparelho.",
  },
  {
    src: "/mockups/mockup_03_carrinho_fechado.svg",
    title: "Carrinho fechado",
    text: "O total final, a meta e o recibo para compartilhar.",
  },
  {
    src: "/mockups/mockup_04_comparador_mercados.svg",
    title: "Comparador",
    text: "A mesma lista lado a lado entre os mercados.",
  },
];

export default function AppTour() {
  return (
    <ul className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
      {SCREENS.map((screen) => (
        <li key={screen.src} className="w-[240px] shrink-0 snap-center md:w-auto">
          <div className="rounded-[2rem] bg-[#0B2B1F] p-2">
            <object
              data={screen.src}
              type="image/svg+xml"
              aria-label={`Tela ${screen.title} do aplicativo`}
              className="pointer-events-none block aspect-[390/844] w-full rounded-[1.5rem] bg-[#FFF8F0]"
            />
          </div>
          <h3 className="mt-4 text-lg font-semibold tracking-[-.02em]">{screen.title}</h3>
          <p className="mt-1 max-w-[30ch] text-[14px] leading-6 text-[#5A6B63]">{screen.text}</p>
        </li>
      ))}
    </ul>
  );
}
