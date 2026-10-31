export default function SiteHeader({ ativo }: { ativo?: string }) {
  const nav = [
    { label: "Como funciona", href: "/como-funciona" },
    { label: "Supermercados", href: "/supermercados" },
    { label: "Comparador", href: "/comparador" },
    { label: "Ajuda", href: "/ajuda" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#0B2B1F]/10 bg-[#FFF8F0]">
      <div className="mx-auto flex h-[68px] max-w-[1320px] items-center gap-6 px-5 md:px-10">
        <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="fechou o carrinho — início">
          <img src="/brand/logo-mark.svg" alt="" width={36} height={36} className="h-9 w-9" />
          <span className="text-[17px] font-semibold tracking-[-.03em]">fechou o carrinho</span>
        </a>
        <nav className="ml-auto hidden items-center gap-7 text-[15px] font-medium text-[#3E5347] md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={item.label === ativo ? "font-semibold text-[#1B8C42]" : "hover:text-[#1B8C42]"}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="/#baixar"
          className="ml-auto shrink-0 rounded-full bg-[#1B8C42] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#146B32] md:ml-0"
        >
          Baixar APK
        </a>
      </div>
    </header>
  );
}
