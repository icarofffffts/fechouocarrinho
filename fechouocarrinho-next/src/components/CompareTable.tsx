const ROWS: { question: string; fechou: string; calc: string; paper: string }[] = [
  {
    question: "Quanto já gastei até aqui?",
    fechou: "Total que cresce a cada etiqueta lida",
    calc: "Só se você digitar item por item",
    paper: "Se a conta de cabeça estiver certa",
  },
  {
    question: "Vou passar da meta?",
    fechou: "Barra do orçamento muda de cor antes de estourar",
    calc: "Não sabe qual é a sua meta",
    paper: "Você compara no fim, na fila",
  },
  {
    question: "E sem sinal no mercado?",
    fechou: "Lê a etiqueta no próprio aparelho, offline",
    calc: "Funciona offline",
    paper: "Funciona offline",
  },
  {
    question: "Preciso refazer a lista toda semana?",
    fechou: "Listas com nome, cada uma com seu total",
    calc: "Apaga tudo ao fechar",
    paper: "Rasga e escreve de novo",
  },
  {
    question: "Dá para mostrar o resultado?",
    fechou: "Recibo para compartilhar",
    calc: "Print da tela",
    paper: "Foto do papel",
  },
];

export default function CompareTable() {
  return (
    <div className="overflow-x-auto rounded-3xl border border-[#0B2B1F]/12 bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left text-[15px]">
        <caption className="sr-only">O que cada forma de somar a compra responde</caption>
        <thead>
          <tr className="border-b border-[#0B2B1F]/12 text-[13px] uppercase tracking-[.1em] text-[#5A6B63]">
            <th scope="col" className="px-6 py-4 font-semibold">Pergunta</th>
            <th scope="col" className="bg-[#1B8C42] px-6 py-4 font-semibold text-white">Fechou o Carrinho</th>
            <th scope="col" className="px-6 py-4 font-semibold">Calculadora</th>
            <th scope="col" className="px-6 py-4 font-semibold">Papel e caneta</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.question} className="border-b border-[#0B2B1F]/10 last:border-b-0">
              <th scope="row" className="px-6 py-5 font-semibold">{row.question}</th>
              <td className="bg-[#1B8C42]/8 px-6 py-5 font-medium text-[#0B2B1F]">{row.fechou}</td>
              <td className="px-6 py-5 text-[#5A6B63]">{row.calc}</td>
              <td className="px-6 py-5 text-[#5A6B63]">{row.paper}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
