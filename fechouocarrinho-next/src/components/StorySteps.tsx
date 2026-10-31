const STEPS = [
  {
    n: "01",
    title: "Primeiro, escolha o mercado.",
    text: "Defina onde vai comprar e crie uma lista com nome. Cada lista guarda seus próprios itens e o seu próprio total.",
    screen: "/mockups/mockup_12_selecao_mercado.svg",
    label: "Seleção de mercado",
  },
  {
    n: "02",
    title: "Depois, fotografe a etiqueta.",
    text: "Aponte a câmera para o preço na prateleira. A leitura é feita no aparelho, sem depender do sinal.",
    screen: "/mockups/mockup_02_scanner_ocr.svg",
    label: "Leitor de etiquetas",
  },
  {
    n: "03",
    title: "Então, confirme o valor.",
    text: "Confira o preço lido e ajuste a quantidade. Se a etiqueta saiu torta, você corrige em um toque.",
    screen: "/mockups/mockup_14_detalhes_item_ocr.svg",
    label: "Detalhes do item lido",
  },
  {
    n: "04",
    title: "Por fim, feche o carrinho.",
    text: "Chegue ao caixa sabendo o total, contra a sua meta, e compartilhe o recibo da compra.",
    screen: "/mockups/mockup_03_carrinho_fechado.svg",
    label: "Carrinho fechado",
  },
];

export default function StorySteps() {
  return (
    <div className="mt-14 border-t border-white/20">
      {STEPS.map((step, index) => (
        <div
          key={step.n}
          className={`grid items-center gap-8 border-b border-white/20 py-10 lg:gap-16 lg:py-14 ${
            index % 2 === 1 ? "lg:grid-cols-[300px_1fr]" : "lg:grid-cols-[1fr_300px]"
          }`}
        >
          <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
            <p className="text-[13px] font-semibold tracking-[.14em] text-[#7FD99A]">{step.n}</p>
            <h3 className="mt-3 max-w-[18ch] text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-[1.02] tracking-[-.035em]">
              {step.title}
            </h3>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-7 text-white/70">{step.text}</p>
          </div>
          <div className={`mx-auto w-full max-w-[240px] lg:max-w-none ${index % 2 === 1 ? "lg:order-1" : ""}`}>
            <div className="rounded-[2rem] bg-white/10 p-2">
              <object
                data={step.screen}
                type="image/svg+xml"
                aria-label={`Tela: ${step.label}`}
                className="pointer-events-none block aspect-[390/844] w-full rounded-[1.5rem] bg-[#FFF8F0]"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
