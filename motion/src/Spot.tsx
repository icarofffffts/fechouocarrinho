import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {BODY, COLOR, DISPLAY, EASE, brl, p, s, win} from './lib/brand';

export const SPOT_FRAMES = s(15);

export type SpotProps = {voiceover: boolean};

const SCREEN_W = 560;
const SCREEN_H = Math.round((SCREEN_W * 844) / 390);

const Phone: React.FC<{frame: number}> = ({frame}) => {
  const rise = p(frame, s(2.8), s(1.1));
  const out = p(frame, s(11.2), s(0.8));
  const scanner = 1 - p(frame, s(7), s(0.6));
  return (
    <div
      style={{
        position: 'absolute',
        left: (1080 - SCREEN_W - 28) / 2,
        top: 520,
        transform: `translateY(${(1 - rise) * 1500 + out * 1500}px)`,
        padding: 14,
        borderRadius: 72,
        background: COLOR.ink,
        boxShadow: '0 40px 80px -30px rgba(11,43,31,.55)',
      }}
    >
      <div style={{position: 'relative', width: SCREEN_W, height: SCREEN_H, borderRadius: 58, overflow: 'hidden', background: COLOR.cream}}>
        <Img src={staticFile('mockups/mockup_01_home_dashboard.svg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
        <Img
          src={staticFile('mockups/mockup_02_scanner_ocr.svg')}
          style={{position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: scanner}}
        />
      </div>
    </div>
  );
};

const Chip: React.FC<{frame: number; at: number; until: number; x: number; y: number; dot: string; big: string; small: string}> = ({
  frame,
  at,
  until,
  x,
  y,
  dot,
  big,
  small,
}) => {
  const t = win(frame, at, s(0.5), until, s(0.4));
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity: t,
        transform: `translateY(${(1 - t) * 24}px) scale(${0.94 + t * 0.06})`,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '22px 30px',
        borderRadius: 32,
        background: '#fff',
        boxShadow: '0 24px 48px -20px rgba(11,43,31,.4)',
        fontFamily: BODY,
      }}
    >
      <span style={{width: 22, height: 22, borderRadius: 99, background: dot}} />
      <div style={{lineHeight: 1.15}}>
        <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 46, color: COLOR.ink}}>{big}</div>
        <div style={{fontSize: 28, color: COLOR.muted}}>{small}</div>
      </div>
    </div>
  );
};

const Caption: React.FC<{frame: number; from: number; to: number; text: string}> = ({frame, from, to, text}) => {
  const t = win(frame, from, s(0.6), to, s(0.4));
  return (
    <div
      style={{
        position: 'absolute',
        top: 250,
        left: 80,
        right: 80,
        textAlign: 'center',
        fontFamily: DISPLAY,
        fontWeight: 800,
        fontSize: 88,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        color: COLOR.ink,
        opacity: t,
        transform: `translateY(${(1 - t) * 30}px)`,
      }}
    >
      {text}
    </div>
  );
};

const Hook: React.FC<{frame: number}> = ({frame}) => {
  const a = p(frame, s(0.2), s(0.9));
  const b = p(frame, s(0.8), s(0.9));
  const out = p(frame, s(2.7), s(0.7));
  const line = (t: number, text: string, color: string) => (
    <div style={{opacity: t * (1 - out), transform: `translateY(${(1 - t) * 60 - out * 40}px)`, color}}>{text}</div>
  );
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 90px',
        fontFamily: DISPLAY,
        fontWeight: 800,
        fontSize: 190,
        lineHeight: 0.92,
        letterSpacing: '-0.055em',
      }}
    >
      {line(a, 'Seu total,', COLOR.ink)}
      {line(b, 'antes do caixa.', COLOR.green)}
    </div>
  );
};

const Brand: React.FC<{frame: number; color: string}> = ({frame, color}) => (
  <div
    style={{
      position: 'absolute',
      top: 90,
      left: 90,
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      opacity: p(frame, 0, s(0.6)),
      fontFamily: DISPLAY,
      fontWeight: 800,
      fontSize: 52,
      letterSpacing: '-0.03em',
      color,
    }}
  >
    <Img src={staticFile('logo-mark.svg')} style={{width: 76, height: 76}} />
    fechou o carrinho
  </div>
);

const Closing: React.FC<{frame: number}> = ({frame}) => {
  const t = p(frame, s(11.8), s(0.9));
  const u = p(frame, s(12.5), s(0.9));
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 90px', textAlign: 'center', opacity: t}}>
      <Img src={staticFile('logo-mark.svg')} style={{width: 180, height: 180, marginBottom: 60, transform: `scale(${0.85 + t * 0.15})`}} />
      <div
        style={{
          fontFamily: DISPLAY,
          fontWeight: 800,
          fontSize: 150,
          lineHeight: 0.95,
          letterSpacing: '-0.05em',
          color: '#fff',
          transform: `translateY(${(1 - t) * 50}px)`,
        }}
      >
        Chegue ao caixa sabendo.
      </div>
      <div
        style={{
          marginTop: 80,
          padding: '34px 64px',
          borderRadius: 999,
          background: '#fff',
          color: COLOR.green,
          fontFamily: DISPLAY,
          fontWeight: 800,
          fontSize: 58,
          opacity: u,
          transform: `translateY(${(1 - u) * 30}px)`,
        }}
      >
        Baixar para Android
      </div>
      <div style={{marginTop: 44, fontFamily: BODY, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,.8)', opacity: u}}>
        fechouocarrinho.site
      </div>
    </AbsoluteFill>
  );
};

export const Spot: React.FC<SpotProps> = ({voiceover}) => {
  const frame = useCurrentFrame();
  const toGreen = p(frame, s(11.3), s(0.8), (t) => t);
  const total = interpolate(frame, [s(7.2), s(10.4)], [0, 142.8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE});
  const bg = `color-mix(in srgb, ${COLOR.green} ${toGreen * 100}%, ${COLOR.cream})`;

  return (
    <AbsoluteFill style={{background: bg, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: 60,
          right: 60,
          top: 440,
          height: 1400,
          borderRadius: 90,
          background: COLOR.stage,
          opacity: p(frame, s(2.6), s(0.8)) * (1 - p(frame, s(11.2), s(0.6))),
        }}
      />
      <Brand frame={frame} color={toGreen > 0.5 ? '#fff' : COLOR.ink} />
      <Hook frame={frame} />
      <Caption frame={frame} from={s(3.4)} to={s(6.8)} text="Aponte para a etiqueta." />
      <Caption frame={frame} from={s(7.2)} to={s(11)} text="O total cresce na hora." />
      <Phone frame={frame} />
      <Chip frame={frame} at={s(5.2)} until={s(7)} x={90} y={640} dot={COLOR.orange} big="+ R$ 28,90" small="etiqueta lida agora" />
      <Chip frame={frame} at={s(8)} until={s(11)} x={540} y={450} dot={COLOR.green} big={brl(total)} small="71% da meta de R$ 200" />
      <Closing frame={frame} />
      {voiceover ? <Audio src={staticFile('vo/spot1.mp3')} /> : null}
    </AbsoluteFill>
  );
};
