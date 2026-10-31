import fs from 'fs';
import path from 'path';

const baseSvg = (w, h, rx) => `<svg width="${w}" height="${h}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#111827" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="40" height="40" rx="${rx}" fill="#1B8C42"/>
  <path d="M7.5 9.8H10C12 9.8 13.6 11.1 14 13L14.4 14.8H26.5C27.2 14.8 27.8 15.1 28.3 15.6L33.2 20.2C33.8 20.8 33.8 21.7 33.2 22.3L28.3 26.9C27.8 27.4 27.2 27.7 26.5 27.7H16.4C14.8 27.7 13.5 26.6 13.2 25.1L10.9 14.4C10.7 13.6 10.3 13.1 9.5 13.1H7.5C6.5 13.1 5.7 12.4 5.7 11.4C5.7 10.5 6.5 9.8 7.5 9.8Z" fill="white"/>
  <path d="M15.5 20.7L18.2 23.3L23 18.2" stroke="#1B8C42" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="28.4" cy="21.25" r="1.65" fill="#FF6B00"/>
  <circle cx="17" cy="31.15" r="1.8" fill="white"/>
  <circle cx="25.6" cy="31.15" r="1.8" fill="white"/>
</svg>`;

const ROOT_DIR = process.cwd();
const iconsDir = path.join(ROOT_DIR, 'materiais', '04-marca', 'icons');
const publicDir = path.join(ROOT_DIR, 'landing-page-repo', 'public', 'design-assets');

const sizes = [
  { file: 'favicon-16x16.svg', w: 16, h: 16, rx: 5 },
  { file: 'favicon-32x32.svg', w: 32, h: 32, rx: 10 },
  { file: 'favicon-48x48.svg', w: 48, h: 48, rx: 15 },
  { file: 'favicon-192x192.svg', w: 192, h: 192, rx: 60 },
  { file: 'favicon-512x512.svg', w: 512, h: 512, rx: 160 },
  { file: 'apple-touch-icon-180x180.svg', w: 180, h: 180, rx: 0 }
];

sizes.forEach(s => {
  const content = baseSvg(s.w, s.h, s.rx);
  fs.writeFileSync(path.join(iconsDir, s.file), content, 'utf8');
  fs.writeFileSync(path.join(publicDir, s.file), content, 'utf8');
});

['ic_launcher.xml', 'ic_launcher_playstore_flat.svg'].forEach(f => {
  const src = path.join(iconsDir, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(publicDir, f));
  }
});

console.log('Successfully generated multi-resolution favicons and mirrored to public!');
