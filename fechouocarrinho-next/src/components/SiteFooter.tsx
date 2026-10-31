export default function SiteFooter() {
  return (
    <footer className="bg-[#0B2B1F] px-5 py-10 text-[#F4F3EF] md:px-10">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/brand/logo-mark.svg" alt="" width={28} height={28} className="h-7 w-7" />
          <span className="text-[15px] font-semibold tracking-[-.02em]">fechou o carrinho</span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-white/60">
          <a href="/como-funciona" className="hover:text-white">Como funciona</a>
          <a href="/supermercados" className="hover:text-white">Supermercados</a>
          <a href="/ajuda" className="hover:text-white">Ajuda</a>
          <a href="/privacidade" className="hover:text-white">Privacidade</a>
          <a href="mailto:contato@fechouocarrinho.site" className="hover:text-white">Contato</a>
        </nav>
      </div>
      <div className="mx-auto mt-6 max-w-[1320px] text-[12px] text-white/40">© 2026 Fechou o Carrinho</div>
    </footer>
  );
}
