"use client";

import { useEffect, useRef, useState } from "react";

export default function AppFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => undefined);
    else video.pause();
  }

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setSound(!next);
    if (!next && video.paused) video.play().catch(() => undefined);
  }

  return (
    <div className="mx-auto w-full max-w-[320px]">
      <div className="relative rounded-[2.2rem] bg-[#0B2B1F] p-2">
        <video
          ref={videoRef}
          className="block aspect-[9/16] w-full rounded-[1.7rem] bg-[#FFF8F0] object-cover"
          src="/video/spot-15-vertical.mp4"
          poster="/video/spot-15-poster.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Vídeo de 15 segundos: como o Fechou o Carrinho soma a compra no mercado"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onClick={togglePlay}
        />
        {!playing && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Reproduzir vídeo"
            className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full bg-white text-[#1B8C42] shadow-[0_12px_32px_-12px_rgba(11,43,31,.5)]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={sound}
        className="mt-4 flex h-11 w-full items-center justify-center rounded-full border border-[#0B2B1F]/15 text-[14px] font-semibold text-[#0B2B1F] hover:border-[#0B2B1F]/40"
      >
        {sound ? "Silenciar" : "Ouvir com som"}
      </button>
    </div>
  );
}
