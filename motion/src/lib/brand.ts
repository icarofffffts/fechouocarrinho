import {Easing, interpolate} from 'remotion';
import {loadFont as loadNunito} from '@remotion/google-fonts/Nunito';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';

// Tokens espelham fechouocarrinho-next/public/brand/brand-tokens.json
export const COLOR = {
  green: '#1B8C42',
  greenDark: '#146B32',
  ink: '#0B2B1F',
  cream: '#FFF8F0',
  stage: '#D3EACB',
  orange: '#FF6B00',
  muted: '#5A6B63',
} as const;

export const {fontFamily: DISPLAY} = loadNunito('normal', {weights: ['700', '800']});
export const {fontFamily: BODY} = loadInter('normal', {weights: ['400', '600']});

export const FPS = 30;
export const s = (seconds: number) => Math.round(seconds * FPS);

/** Chegada suave: saida rapida, pouso longo. */
export const EASE = Easing.bezier(0.16, 1, 0.3, 1);

/** Progresso 0..1 de `f` entre [start, start + dur], com easing e sem estourar. */
export const p = (f: number, start: number, dur: number, ease: (t: number) => number = EASE) =>
  interpolate(f, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

/** Entra em [a, a+inDur] e sai em [b, b+outDur]. */
export const win = (f: number, a: number, inDur: number, b: number, outDur: number) =>
  Math.min(p(f, a, inDur), 1 - p(f, b, outDur, Easing.inOut(Easing.cubic)));

export const brl = (value: number) =>
  `R$ ${value.toFixed(2).replace('.', ',')}`;
