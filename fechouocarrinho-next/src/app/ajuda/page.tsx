export default function Ajuda() {
  return (
    <div className="bg-[#FFF8F0] min-h-screen">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-[#1B8C42] flex items-center justify-center text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12l5 5l10 -10"/></svg></div><span className="font-display font-extrabold text-xl" style={{fontFamily:"var(--font-nunito)"}}>fechou o carrinho</span></a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium"><a href="/como-funciona" className="hover:text-[#1B8C42]">Como funciona</a><a href="/supermercados" className="hover:text-[#1B8C42]">Supermercados</a><a href="/ajuda" className="text-[#1B8C42] font-bold">Ajuda</a><a href="/#baixar" className="bg-[#111827] text-white px-5 py-2.5 rounded-full font-semibold">Baixar APK</a></nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <a href="/" className="text-sm font-medium text-zinc-600 hover:text-[#111827] inline-flex items-center gap-1.5"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Voltar</a>
        <h1 className="font-display font-extrabold text-4xl mt-4" style={{fontFamily:"var(--font-nunito)"}}>Ajuda</h1>
        <p className="text-zinc-600 mt-3 leading-relaxed">Tire suas dúvidas sobre instalação e uso.</p>
        <div className="mt-8 bg-white border border-zinc-200 rounded-3xl divide-y divide-zinc-100">
          <details className="p-6 group" open><summary className="font-display font-bold cursor-pointer list-none flex items-center justify-between" style={{fontFamily:"var(--font-nunito)"}}>Como instalar o APK?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-open:rotate-180 transition"><path d="M6 9l6 6 6-6"/></svg></summary><p className="text-sm text-zinc-600 mt-3 leading-relaxed">Baixe pelo botão, toque em Abrir e depois em Instalar. Se o sistema pedir, permita a instalação apenas para este arquivo. O processo leva segundos.</p></details>
          <details className="p-6 group"><summary className="font-display font-bold cursor-pointer list-none flex items-center justify-between" style={{fontFamily:"var(--font-nunito)"}}>Preciso de internet no mercado?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-open:rotate-180 transition"><path d="M6 9l6 6 6-6"/></svg></summary><p className="text-sm text-zinc-600 mt-3 leading-relaxed">Não. A leitura da etiqueta acontece no próprio aparelho, ideal para quando o sinal falha dentro do mercado.</p></details>
          <details className="p-6 group"><summary className="font-display font-bold cursor-pointer list-none flex items-center justify-between" style={{fontFamily:"var(--font-nunito)"}}>Posso corrigir um preço?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-open:rotate-180 transition"><path d="M6 9l6 6 6-6"/></svg></summary><p className="text-sm text-zinc-600 mt-3 leading-relaxed">Sim. Se a leitura não ficar perfeita, toque no valor e digite manualmente antes de adicionar à lista.</p></details>
          <details className="p-6 group"><summary className="font-display font-bold cursor-pointer list-none flex items-center justify-between" style={{fontFamily:"var(--font-nunito)"}}>Meu mercado não está na lista. O que faço?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-open:rotate-180 transition"><path d="M6 9l6 6 6-6"/></svg></summary><p className="text-sm text-zinc-600 mt-3 leading-relaxed">Na página de supermercados, clique em Sugerir supermercado e informe nome e cidade. Analisamos e liberamos para todos.</p></details>
        </div>
        <div className="mt-8 bg-white border border-zinc-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div><h3 className="font-display font-bold" style={{fontFamily:"var(--font-nunito)"}}>Ainda precisa de ajuda?</h3><p className="text-sm text-zinc-600 mt-1">Fale com a gente por e-mail.</p></div>
          <a href="mailto:contato@fechouocarrinho.site" className="bg-[#111827] text-white px-6 py-3 rounded-xl font-semibold">contato@fechouocarrinho.site</a>
        </div>
      </main>
      <footer className="border-t border-zinc-200 py-8 bg-white mt-10"><div className="max-w-6xl mx-auto px-4 flex justify-between text-sm text-zinc-500"><span>© 2026 Fechou o Carrinho</span><a href="mailto:contato@fechouocarrinho.site" className="underline">contato@fechouocarrinho.site</a></div></footer>
    </div>
  );
}
