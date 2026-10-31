import Image from "next/image";
import Link from "next/link";

const WORD = "antes do caixa";
const APK_URL = "/downloads/fechouocarrinho.apk";

/** Quatro copias para a linha correr sem emenda; so a primeira e lida como titulo. */
function Track({ readable = false }: { readable?: boolean }) {
  const unit = (key: number) => (
    <span className="unit" key={key} aria-hidden={readable && key === 0 ? undefined : true}>
      {WORD}
      <i className="dot" aria-hidden="true" />
    </span>
  );
  return <span className="marquee-track">{[0, 1, 2, 3].map(unit)}</span>;
}

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[720px] overflow-hidden bg-white">
      <header className="absolute inset-x-0 top-0 z-30 grid grid-cols-[1fr_auto_1fr] items-center px-[var(--margin)] py-6 max-[720px]:grid-cols-[1fr_auto]">
        <Link href="#gestos" className="justify-self-start text-[17px] font-semibold hover:underline max-[720px]:hidden">
          Como funciona
        </Link>
        <Link href="/" className="flex items-center gap-2.5" aria-label="fechou o carrinho — início">
          <Image src="/brand/logo-mark.svg" alt="" width={34} height={34} unoptimized />
          <span className="display text-[20px] tracking-[-0.03em]">fechou o carrinho</span>
        </Link>
        <Link href="#mercados" className="justify-self-end text-[17px] font-semibold hover:underline">
          Mercados
        </Link>
      </header>

      <div className="hero-square z-0 overflow-hidden bg-[#D3EACB]">
        <Image
          src="/video/spot-15-poster.jpg"
          alt="Tela do leitor de etiquetas do aplicativo, mostrando o preço R$ 28,90 do arroz"
          width={1080}
          height={1920}
          priority
          className="absolute left-1/2 top-1/2 h-auto w-[205%] max-w-none"
          style={{ transform: "translate(-50%, -47%)" }}
        />
      </div>

      <h1 className="hero-line display z-10 text-[var(--ink)]">
        <Track readable />
        <span className="light-layer" aria-hidden="true">
          <Track />
        </span>
      </h1>

      <div className="absolute inset-x-0 top-[calc(360px+9.5vw+150px)] z-30 flex flex-col items-center gap-6 px-[var(--margin)] text-center max-[720px]:top-[calc(26%+23vw+64px)]">
        <p className="max-w-[36ch] text-[20px] leading-[1.35] max-[720px]:text-[17px]">
          Aponte a câmera para a etiqueta e veja o total crescer, até sem sinal.
        </p>
        <p className="text-[17px]">Android 8+ · 49 MB · sem cadastro</p>
      </div>

      <div className="absolute inset-x-0 bottom-10 z-30 flex items-end justify-end gap-6 px-[var(--margin)] max-[720px]:bottom-5 max-[720px]:flex-col max-[720px]:items-stretch">
        <a
          href={APK_URL}
          className="inline-flex h-14 items-center justify-center bg-[var(--accent)] px-8 text-[17px] font-bold text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
        >
          Baixar para Android
        </a>
      </div>
    </section>
  );
}
