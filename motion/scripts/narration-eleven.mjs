// Narracao do spot no ElevenLabs. A chave vem do ambiente, nunca entra no codigo.
//
//   Windows:  node --env-file=%USERPROFILE%\.env.local scripts/narration-eleven.mjs spot1
//   bash:     node --env-file="$HOME/.env.local" scripts/narration-eleven.mjs spot1
//
// Segundo argumento opcional: caminho de saida, para testar sem sobrescrever.
//
// Convencoes (mesmas do Nexuro):
//   - ajustes padrao do ElevenLabs: so modelId e voz
//   - uma tag de emocao por frase: [warmly] [confident] [curious] [happy]
//   - "..." e "—" criam pausa; MAIUSCULA da enfase
//   - o texto falado e o texto na tela sao coisas separadas: o falado e mais longo
import {createWriteStream, mkdirSync} from 'node:fs';
import path from 'node:path';
import {Readable} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import {ElevenLabsClient} from '@elevenlabs/elevenlabs-js';

// Mesma voz do Nexuro (Roberta). Troque o id para outra voz da sua conta.
const VOICE = 'RGymW84CSmfVugnA5tvA';
const MODEL = 'eleven_v4';
const OUT_DIR = path.resolve('public', 'vo');

/**
 * Uma fala por cena, para entrar na hora certa do video (ver Spot.tsx).
 * A chave e o nome do arquivo (spot1-hook.mp3).
 */
export const LINES = {
  'spot1-hook': '[confident] Seu total, antes do caixa.',
  'spot1-scan':
    '[curious] Aponte a câmera para a etiqueta… [warmly] e veja o carrinho crescer, na hora. Sem internet, sem susto.',
  'spot1-end': '[confident] Chegue ao caixa sabendo. Fechou o Carrinho.',
};

const [id, outArg] = process.argv.slice(2);

if (!process.env.ELEVENLABS_API_KEY) {
  console.error('ELEVENLABS_API_KEY nao esta no ambiente.');
  console.error('Rode com --env-file apontando para o seu .env.local.');
  process.exit(1);
}
if (!id || !LINES[id]) {
  console.error(`Uso: node --env-file=... scripts/narration-eleven.mjs <${Object.keys(LINES).join('|')}>`);
  process.exit(1);
}

const out = outArg ? path.resolve(outArg) : path.join(OUT_DIR, `${id}.mp3`);
mkdirSync(path.dirname(out), {recursive: true});

const client = new ElevenLabsClient();
const audio = await client.textToSpeech.convert(VOICE, {text: LINES[id], modelId: MODEL});
await pipeline(Readable.fromWeb(audio), createWriteStream(out));
console.log(`gerado: ${out}`);
