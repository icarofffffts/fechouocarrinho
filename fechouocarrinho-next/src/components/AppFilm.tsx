"use client";

import { useEffect, useRef, useState } from "react";

export default function AppFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
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
    <div className="w-full max-w-[340px]">
      <div className="relative">
        <video
          ref={videoRef}
          className="block aspect-[9/16] w-full bg-[#EAF6E4] object-cover"
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
            className="absolute inset-0 m-auto grid h-16 w-16 place-items-center bg-[#FF6B00] text-[#0B2B1F]"
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
        className="mt-3 flex h-12 w-full items-center justify-center bg-white text-[16px] font-bold text-[#0B2B1F] hover:bg-[#FF6B00]"
      >
        {sound ? "Silenciar" : "Ouvir com som"}
      </button>
    </div>
  );
}
