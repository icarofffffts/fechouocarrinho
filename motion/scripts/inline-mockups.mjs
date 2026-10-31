// Copia os mockups do site para motion/public/mockups, embutindo as fotos dos
// produtos como data URI. Um SVG usado como <img> nao carrega arquivos
// externos, entao sem isso as fotos aparecem em branco no video.
//
//   node scripts/inline-mockups.mjs
import {mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import path from 'node:path';

const SITE = path.resolve('..', 'fechouocarrinho-next', 'public', 'mockups');
const OUT = path.resolve('public', 'mockups');
mkdirSync(OUT, {recursive: true});

let count = 0;
for (const file of readdirSync(SITE).filter((f) => f.endsWith('.svg'))) {
  let svg = readFileSync(path.join(SITE, file), 'utf8');
  svg = svg.replace(/(xlink:href|href)="(products\/[^"]+\.jpg)"/g, (_m, attr, rel) => {
    const data = readFileSync(path.join(SITE, rel)).toString('base64');
    return `${attr}="data:image/jpeg;base64,${data}"`;
  });
  if (!svg.includes('xmlns:xlink') && svg.includes('xlink:href')) {
    svg = svg.replace('xmlns="http://www.w3.org/2000/svg"', 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"');
  }
  writeFileSync(path.join(OUT, file), svg);
  count += 1;
}
console.log(`${count} mockups em ${OUT}`);
