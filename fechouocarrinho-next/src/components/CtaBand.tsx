import Image from "next/image";

const APK_URL = "/downloads/fechouocarrinho.apk";

const PHOTOS = [
  { src: "/mockups/products/arroz-tio-joao.jpg", rotate: "-5deg", className: "" },
  { src: "/mockups/products/feijao-camil.jpg", rotate: "3deg", className: "" },
  { src: "/mockups/products/leite-itambe.jpg", rotate: "-3deg", className: "max-md:hidden" },
];

export default function CtaBand() {
  return (
    <section aria-label="Baixar o aplicativo">
      <a
        href={APK_URL}
        className="group relative block min-h-[78svh] overflow-hidden bg-[#FF6B00] text-[#0B2B1F] hover:bg-[#0B2B1F] hover:text-[#FF6B00] focus-visible:bg-[#0B2B1F] focus-visible:text-[#FF6B00] max-md:min-h-[56svh]"
      >
        <span className="absolute left-5 top-5 flex max-w-[44ch] items-start gap-4 text-[20px] font-bold leading-[1.3] max-md:text-[17px]">
          Baixe o APK, instale e faça a próxima compra com o total na mão.
          <svg
            className="h-12 w-12 shrink-0 max-md:h-8 max-md:w-8"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            aria-hidden="true"
          >
            <path d="M12 36 36 12M16 12h20v20" />
          </svg>
        </span>
        <span className="absolute right-5 top-5 flex gap-4 max-md:hidden" aria-hidden="true">
          {PHOTOS.map((photo) => (
            <Image
              key={photo.src}
              src={photo.src}
              alt=""
              width={400}
              height={400}
              className={`h-[clamp(96px,12vw,180px)] w-[clamp(96px,12vw,180px)] bg-white object-cover ${photo.className}`}
              style={{ transform: `rotate(${photo.rotate})` }}
            />
          ))}
        </span>
        <span className="display absolute inset-x-0 bottom-6 block whitespace-nowrap px-[var(--margin)] text-[34vw] leading-[0.8] max-md:text-[32vw]">
          baixar
        </span>
      </a>
    </section>
  );
}
