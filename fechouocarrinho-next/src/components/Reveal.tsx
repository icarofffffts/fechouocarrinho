"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Entrada ao rolar. Sem script, o conteudo fica visivel. Com script, so o que
 * esta abaixo da dobra e escondido, e volta sozinho depois de alguns segundos
 * caso o observador nunca dispare.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.rv = "armed";
    const show = () => {
      el.dataset.rv = "shown";
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    const fallback = window.setTimeout(show, 8000);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
