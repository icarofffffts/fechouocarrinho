"use client";

export default function ProblemVsSolution() {
  return (
    <section className="bg-white border-y border-zinc-100 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* SECTION HEADER */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
            O Problema Real do Brasileiro no Caixa
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-zinc-900 mt-4 tracking-tight leading-[0.95]" style={{ fontFamily: "var(--font-nunito)" }}>
            Você já passou por isso no supermercado?
          </h2>
          <p className="text-zinc-600 mt-3 text-base sm:text-lg leading-relaxed">
            Fazer compras no escuro é estressante. Você vai colocando produtos no carrinho, tentando fazer contas de cabeça, e a conta sempre passa do planejado.
          </p>
        </div>

        {/* COMPARISON CARDS */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-stretch">
          {/* THE PAIN / WITHOUT THE APP */}
          <div className="bg-[#FFF8F0] border-2 border-red-200/80 rounded-[2.2rem] p-8 sm:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-[100px] pointer-events-none" />
            <div>
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                ✕ Sem o app · No escuro
              </div>

              <h3 className="font-display font-extrabold text-2xl text-zinc-900 mt-5" style={{ fontFamily: "var(--font-nunito)" }}>
                A dor de somar de cabeça
              </h3>

              <ul className="mt-6 space-y-4 text-sm text-zinc-700">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✕</span>
                  <span><b>Contas perdidas:</b> A calculadora do celular é lenta, você esquece de somar os itens pesáveis ou multiplica errado.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✕</span>
                  <span><b>Sem sinal no galpão:</b> O sinal 4G/5G some dentro do atacarejo e apps que dependem de nuvem travam ou não abrem.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✕</span>
                  <span><b>O susto na esteira:</b> Achar que gastou R$ 150 e a operadora de caixa falar R$ 237,40.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✕</span>
                  <span><b>Vergonha de devolver:</b> Ter que pedir para cancelar produtos na frente da fila por estourar o orçamento.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-red-200/60 text-xs text-red-800 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Resultado: Estresse, orçamento estourado e compras sem controle.
            </div>
          </div>

          {/* THE SOLUTION / WITH FECHOU O CARRINHO */}
          <div className="bg-[#111827] text-white border-2 border-emerald-500/40 rounded-[2.2rem] p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="inline-flex items-center gap-2 bg-[#1B8C42] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                ✓ Com fechou o carrinho
              </div>

              <h3 className="font-display font-extrabold text-2xl text-white mt-5" style={{ fontFamily: "var(--font-nunito)" }}>
                Controle absoluto a cada item
              </h3>

              <ul className="mt-6 space-y-4 text-sm text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1B8C42] text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</span>
                  <span><b>Leitura instantânea OCR:</b> Aponte para a etiqueta na prateleira. O preço é lido em 1 segundo e entra na soma.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1B8C42] text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</span>
                  <span><b>100% Offline:</b> O motor de IA roda direto na CPU do seu aparelho. Funciona sem sinal de operadora e sem Wi-Fi.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1B8C42] text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</span>
                  <span><b>Totalizador em tempo real:</b> Você sabe exatamente quanto está pagando antes de dar o primeiro passo até o caixa.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1B8C42] text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</span>
                  <span><b>Economia garantida:</b> Defina uma meta de gastos e receba alerta visual antes de ultrapassar o limite.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 text-xs text-emerald-400 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Resultado: Tranquilidade no caixa, dinheiro economizado e carrinho fechado com precisão.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
