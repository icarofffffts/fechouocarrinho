import Link from "next/link";

const APK_URL = "/downloads/fechouocarrinho.apk";

export default function PosterFooter() {
  return (
    <footer className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0B2B1F] px-[var(--margin)] pt-[clamp(48px,8vw,120px)] text-white">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="display text-[clamp(36px,4.4vw,64px)]">
            Chegue ao caixa
            <br />
            sabendo.
          </p>
          <a
            href={APK_URL}
            className="mt-8 inline-flex h-14 items-center justify-center bg-[#FF6B00] px-8 text-[17px] font-bold text-[#0B2B1F] hover:bg-white max-md:w-full"
          >
            Baixar para Android
          </a>
        </div>
        <nav aria-label="Rodapé" className="flex flex-col gap-3 text-[17px] font-semibold lg:col-span-3 lg:col-start-10">
          <Link href="/como-funciona" className="hover:underline">Como funciona</Link>
          <Link href="/supermercados" className="hover:underline">Supermercados</Link>
          <Link href="/ajuda" className="hover:underline">Ajuda</Link>
          <Link href="/privacidade" className="hover:underline">Privacidade</Link>
          <a href="mailto:contato@fechouocarrinho.site" className="hover:underline">Contato</a>
        </nav>
      </div>

      <div className="mt-auto flex items-center justify-between pb-3 text-[13px] text-white/80 max-md:text-[13px]">
        <span>© 2026 Fechou o Carrinho</span>
        <span>Feito para as redes de Minas Gerais</span>
      </div>
      <p
        aria-hidden="true"
        className="display -mb-[1.5vw] block translate-y-[30%] whitespace-nowrap text-[27vw] leading-[0.8] text-[#1B8C42] max-md:text-[29vw]"
      >
        fechou
      </p>
    </footer>
  );
}
