export default function ComoFunciona() {
  return (
    <div className="bg-[#FFF8F0] min-h-screen">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-[#1B8C42] flex items-center justify-center text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12l5 5l10 -10"/></svg></div><span className="font-display font-extrabold text-xl" style={{fontFamily:"var(--font-nunito)"}}>fechou o carrinho</span></a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium"><a href="/como-funciona" className="text-[#1B8C42] font-bold">Como funciona</a><a href="/supermercados" className="hover:text-[#1B8C42]">Supermercados</a><a href="/ajuda" className="hover:text-[#1B8C42]">Ajuda</a><a href="/#baixar" className="bg-[#111827] text-white px-5 py-2.5 rounded-full font-semibold">Baixar APK</a></nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-10">
        <a href="/" className="text-sm font-medium text-zinc-600 hover:text-[#111827] inline-flex items-center gap-1.5"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Voltar</a>
        <h1 className="font-display font-extrabold text-4xl mt-4" style={{fontFamily:"var(--font-nunito)"}}>Como funciona</h1>
        <p className="text-zinc-600 mt-3 max-w-2xl leading-relaxed">Tudo acontece em poucos toques. Sem cadastro complicado, sem internet obrigatória dentro do mercado.</p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <section id="mercado" className="bg-white border border-zinc-200 rounded-3xl p-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#1B8C42]"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
            <h2 className="font-display font-extrabold text-xl mt-4" style={{fontFamily:"var(--font-nunito)"}}>Escolha onde vai comprar</h2>
            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">Selecione o estado e o supermercado antes de começar. Isso ajuda a organizar sua lista e, no futuro, a comparar valores da sua região.</p>
            <ul className="mt-4 text-sm text-zinc-600 list-disc pl-5 space-y-1"><li>Lista separada por mercado</li><li>Sugira um mercado que ainda não está lá</li><li>Troque de mercado a qualquer momento</li></ul>
            <a href="/supermercados" className="inline-flex mt-6 text-sm font-bold text-[#1B8C42] hover:underline">Ver mercados disponíveis →</a>
          </section>
          <section id="camera" className="bg-white border border-zinc-200 rounded-3xl p-6">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></div>
            <h2 className="font-display font-extrabold text-xl mt-4" style={{fontFamily:"var(--font-nunito)"}}>Aponte para a etiqueta</h2>
            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">Mire a câmera na etiqueta de preço da prateleira e capture. O app identifica o valor e já deixa pronto para adicionar.</p>
            <ul className="mt-4 text-sm text-zinc-600 list-disc pl-5 space-y-1"><li>Uma foto por item — não precisa filmar</li><li>Se a leitura falhar, digite o valor manualmente</li><li>Funciona mesmo sem sinal no mercado</li></ul>
          </section>
          <section id="total" className="bg-white border border-zinc-200 rounded-3xl p-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
            <h2 className="font-display font-extrabold text-xl mt-4" style={{fontFamily:"var(--font-nunito)"}}>Acompanhe o total</h2>
            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">Cada item entra na sua lista com quantidade e preço. O total é atualizado na hora para você decidir o que levar.</p>
            <ul className="mt-4 text-sm text-zinc-600 list-disc pl-5 space-y-1"><li>Ajuste quantidade com um toque</li><li>Veja o total por mercado</li><li>Salve e volte depois</li></ul>
          </section>
        </div>
        <div className="mt-10 bg-[#111827] text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div><h3 className="font-display font-extrabold text-xl" style={{fontFamily:"var(--font-nunito)"}}>Pronto para testar?</h3><p className="text-zinc-400 text-sm mt-1">Baixe o app e faça sua primeira lista em menos de um minuto.</p></div>
          <a href="/#baixar" className="bg-[#1B8C42] text-white px-7 py-3.5 rounded-2xl font-display font-extrabold hover:bg-emerald-700 whitespace-nowrap" style={{fontFamily:"var(--font-nunito)"}}>Baixar APK</a>
        </div>
      </main>
      <footer className="border-t border-zinc-200 py-8 bg-white mt-10"><div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-4 text-sm text-zinc-500"><span>© 2026 Fechou o Carrinho</span><a href="mailto:contato@fechouocarrinho.site" className="underline">contato@fechouocarrinho.site</a></div></footer>
    </div>
  );
}
