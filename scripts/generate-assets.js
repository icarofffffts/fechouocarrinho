import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const DESIGN_DIR = path.join(ROOT_DIR, 'materiais', '04-marca');
const PUBLIC_ASSETS = path.join(ROOT_DIR, 'landing-page-repo', 'public', 'design-assets');

[
  path.join(DESIGN_DIR, 'brand'),
  path.join(DESIGN_DIR, 'icons'),
  path.join(DESIGN_DIR, 'banners-promo'),
  path.join(DESIGN_DIR, 'app-store'),
  path.join(DESIGN_DIR, 'in-app-banners'),
  PUBLIC_ASSETS
].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const BRAND = {
  green: '#1B8C42',
  greenDark: '#146B32',
  orange: '#FF6B00',
  cream: '#FFF8F0',
  ink: '#111827',
  grayMuted: '#6B7280',
  white: '#FFFFFF'
};

// 1. Logo Mark
const logoMarkSvg = `<svg width="256" height="256" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#111827" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="40" height="40" rx="12.5" fill="${BRAND.green}"/>
  <path d="M7.5 9.8H10C12 9.8 13.6 11.1 14 13L14.4 14.8H26.5C27.2 14.8 27.8 15.1 28.3 15.6L33.2 20.2C33.8 20.8 33.8 21.7 33.2 22.3L28.3 26.9C27.8 27.4 27.2 27.7 26.5 27.7H16.4C14.8 27.7 13.5 26.6 13.2 25.1L10.9 14.4C10.7 13.6 10.3 13.1 9.5 13.1H7.5C6.5 13.1 5.7 12.4 5.7 11.4C5.7 10.5 6.5 9.8 7.5 9.8Z" fill="white"/>
  <path d="M15.5 20.7L18.2 23.3L23 18.2" stroke="${BRAND.green}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="28.4" cy="21.25" r="1.65" fill="${BRAND.orange}"/>
  <circle cx="17" cy="31.15" r="1.8" fill="white"/>
  <circle cx="25.6" cy="31.15" r="1.8" fill="white"/>
</svg>`;

// 2. Logo Horizontal
const logoHorizontalSvg = `<svg width="460" height="80" viewBox="0 0 460 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 10)">
    <rect width="60" height="60" rx="18.75" fill="${BRAND.green}"/>
    <g transform="scale(1.5)">
      <path d="M7.5 9.8H10C12 9.8 13.6 11.1 14 13L14.4 14.8H26.5C27.2 14.8 27.8 15.1 28.3 15.6L33.2 20.2C33.8 20.8 33.8 21.7 33.2 22.3L28.3 26.9C27.8 27.4 27.2 27.7 26.5 27.7H16.4C14.8 27.7 13.5 26.6 13.2 25.1L10.9 14.4C10.7 13.6 10.3 13.1 9.5 13.1H7.5C6.5 13.1 5.7 12.4 5.7 11.4C5.7 10.5 6.5 9.8 7.5 9.8Z" fill="white"/>
      <path d="M15.5 20.7L18.2 23.3L23 18.2" stroke="${BRAND.green}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="28.4" cy="21.25" r="1.65" fill="${BRAND.orange}"/>
      <circle cx="17" cy="31.15" r="1.8" fill="white"/>
      <circle cx="25.6" cy="31.15" r="1.8" fill="white"/>
    </g>
  </g>
  <text x="86" y="50" font-family="Nunito, system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" letter-spacing="-1.5" fill="${BRAND.ink}">fechou o carrinho</text>
</svg>`;

// 3. Logo Horizontal Dark
const logoHorizontalDarkSvg = `<svg width="460" height="80" viewBox="0 0 460 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="460" height="80" rx="16" fill="${BRAND.ink}"/>
  <g transform="translate(14, 10)">
    <rect width="60" height="60" rx="18.75" fill="${BRAND.green}"/>
    <g transform="scale(1.5)">
      <path d="M7.5 9.8H10C12 9.8 13.6 11.1 14 13L14.4 14.8H26.5C27.2 14.8 27.8 15.1 28.3 15.6L33.2 20.2C33.8 20.8 33.8 21.7 33.2 22.3L28.3 26.9C27.8 27.4 27.2 27.7 26.5 27.7H16.4C14.8 27.7 13.5 26.6 13.2 25.1L10.9 14.4C10.7 13.6 10.3 13.1 9.5 13.1H7.5C6.5 13.1 5.7 12.4 5.7 11.4C5.7 10.5 6.5 9.8 7.5 9.8Z" fill="white"/>
      <path d="M15.5 20.7L18.2 23.3L23 18.2" stroke="${BRAND.green}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="28.4" cy="21.25" r="1.65" fill="${BRAND.orange}"/>
      <circle cx="17" cy="31.15" r="1.8" fill="white"/>
      <circle cx="25.6" cy="31.15" r="1.8" fill="white"/>
    </g>
  </g>
  <text x="90" y="50" font-family="Nunito, system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" letter-spacing="-1.5" fill="white">fechou o carrinho</text>
</svg>`;

// 4. Logo Monochrome
const logoMonochromeSvg = `<svg width="460" height="80" viewBox="0 0 460 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 10)">
    <rect width="60" height="60" rx="18.75" fill="${BRAND.ink}"/>
    <g transform="scale(1.5)">
      <path d="M7.5 9.8H10C12 9.8 13.6 11.1 14 13L14.4 14.8H26.5C27.2 14.8 27.8 15.1 28.3 15.6L33.2 20.2C33.8 20.8 33.8 21.7 33.2 22.3L28.3 26.9C27.8 27.4 27.2 27.7 26.5 27.7H16.4C14.8 27.7 13.5 26.6 13.2 25.1L10.9 14.4C10.7 13.6 10.3 13.1 9.5 13.1H7.5C6.5 13.1 5.7 12.4 5.7 11.4C5.7 10.5 6.5 9.8 7.5 9.8Z" fill="white"/>
      <path d="M15.5 20.7L18.2 23.3L23 18.2" stroke="${BRAND.ink}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="28.4" cy="21.25" r="1.65" fill="${BRAND.ink}"/>
      <circle cx="17" cy="31.15" r="1.8" fill="white"/>
      <circle cx="25.6" cy="31.15" r="1.8" fill="white"/>
    </g>
  </g>
  <text x="86" y="50" font-family="Nunito, system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" letter-spacing="-1.5" fill="${BRAND.ink}">fechou o carrinho</text>
</svg>`;

// 5. PlayStore Icon 512x512
const playstoreIconSvg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1E9B49"/>
      <stop offset="100%" stop-color="#146B32"/>
    </linearGradient>
    <filter id="cartShadow" x="10%" y="10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#0B3E1C" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)"/>
  <g transform="translate(64, 64) scale(9.6)" filter="url(#cartShadow)">
    <path d="M7.5 9.8H10C12 9.8 13.6 11.1 14 13L14.4 14.8H26.5C27.2 14.8 27.8 15.1 28.3 15.6L33.2 20.2C33.8 20.8 33.8 21.7 33.2 22.3L28.3 26.9C27.8 27.4 27.2 27.7 26.5 27.7H16.4C14.8 27.7 13.5 26.6 13.2 25.1L10.9 14.4C10.7 13.6 10.3 13.1 9.5 13.1H7.5C6.5 13.1 5.7 12.4 5.7 11.4C5.7 10.5 6.5 9.8 7.5 9.8Z" fill="white"/>
    <path d="M15.5 20.7L18.2 23.3L23 18.2" stroke="${BRAND.green}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="28.4" cy="21.25" r="1.65" fill="${BRAND.orange}"/>
    <circle cx="17" cy="31.15" r="1.8" fill="white"/>
    <circle cx="25.6" cy="31.15" r="1.8" fill="white"/>
  </g>
</svg>`;

// 6. Play Store Feature Graphic (1024x500)
const featureGraphicSvg = `<svg width="1024" height="500" viewBox="0 0 1024 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="featBg" x1="0" y1="0" x2="1024" y2="500" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1B8C42"/>
      <stop offset="65%" stop-color="#146B32"/>
      <stop offset="100%" stop-color="#0E4822"/>
    </linearGradient>
    <pattern id="dotPattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="16" cy="16" r="1.5" fill="white" fill-opacity="0.08"/>
    </pattern>
  </defs>
  <rect width="1024" height="500" fill="url(#featBg)"/>
  <rect width="1024" height="500" fill="url(#dotPattern)"/>

  <!-- Glows -->
  <circle cx="850" cy="250" r="280" fill="#26B256" fill-opacity="0.25"/>
  <circle cx="150" cy="80" r="200" fill="#FF6B00" fill-opacity="0.12"/>

  <!-- Left Content -->
  <g transform="translate(64, 60)">
    <!-- Brand Mark Mini -->
    <g transform="translate(0, 0)">
      <rect width="44" height="44" rx="13.75" fill="white"/>
      <g transform="translate(2, 2) scale(1)">
        <path d="M7.5 9.8H10C12 9.8 13.6 11.1 14 13L14.4 14.8H26.5C27.2 14.8 27.8 15.1 28.3 15.6L33.2 20.2C33.8 20.8 33.8 21.7 33.2 22.3L28.3 26.9C27.8 27.4 27.2 27.7 26.5 27.7H16.4C14.8 27.7 13.5 26.6 13.2 25.1L10.9 14.4C10.7 13.6 10.3 13.1 9.5 13.1H7.5C6.5 13.1 5.7 12.4 5.7 11.4C5.7 10.5 6.5 9.8 7.5 9.8Z" fill="${BRAND.green}"/>
        <path d="M15.5 20.7L18.2 23.3L23 18.2" stroke="white" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="28.4" cy="21.25" r="1.65" fill="${BRAND.orange}"/>
        <circle cx="17" cy="31.15" r="1.8" fill="${BRAND.green}"/>
        <circle cx="25.6" cy="31.15" r="1.8" fill="${BRAND.green}"/>
      </g>
      <text x="56" y="30" font-family="Nunito, sans-serif" font-size="22" font-weight="800" letter-spacing="-1" fill="white">fechou o carrinho</text>
    </g>

    <!-- Tag -->
    <rect x="0" y="74" width="168" height="28" rx="14" fill="white" fill-opacity="0.15"/>
    <text x="16" y="93" font-family="monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#FFE8D6">LEVOU · SOMOU · FECHOU</text>

    <!-- Main Headline -->
    <text x="0" y="165" font-family="Nunito, sans-serif" font-size="52" font-weight="800" line-height="1" letter-spacing="-2.5" fill="white">Seu total no mercado,</text>
    <text x="0" y="225" font-family="Nunito, sans-serif" font-size="52" font-weight="800" line-height="1" letter-spacing="-2.5" fill="#FFBE8A">sem sustos no caixa.</text>

    <!-- Subtitle -->
    <text x="0" y="275" font-family="Inter, sans-serif" font-size="16" font-weight="400" fill="white" fill-opacity="0.82">Registre cada etiqueta com a câmera e acompanhe</text>
    <text x="0" y="300" font-family="Inter, sans-serif" font-size="16" font-weight="400" fill="white" fill-opacity="0.82">o valor total em tempo real — funciona 100% offline.</text>

    <!-- Badges Row -->
    <g transform="translate(0, 335)">
      <!-- Pill 1 -->
      <rect width="138" height="38" rx="19" fill="#111827"/>
      <text x="18" y="24" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="white">⚡ 100% Offline</text>

      <!-- Pill 2 -->
      <rect x="148" width="158" height="38" rx="19" fill="${BRAND.orange}"/>
      <text x="166" y="24" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="white">📷 Leitor de Preço</text>

      <!-- Pill 3 -->
      <rect x="316" width="138" height="38" rx="19" fill="white" fill-opacity="0.2"/>
      <text x="334" y="24" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="white">✓ Sem Cadastro</text>
    </g>
  </g>

  <!-- Right Phone Mockup -->
  <g transform="translate(680, 45) rotate(4)">
    <!-- Phone Shadow -->
    <rect x="-12" y="-8" width="280" height="430" rx="42" fill="#0B3E1C" fill-opacity="0.45"/>
    <!-- Phone Body -->
    <rect width="270" height="420" rx="38" fill="#111827"/>
    <!-- Screen -->
    <rect x="8" y="8" width="254" height="404" rx="30" fill="${BRAND.cream}"/>

    <!-- Notch / Dynamic Island -->
    <rect x="85" y="16" width="84" height="18" rx="9" fill="#111827"/>
    <circle cx="152" cy="25" r="4" fill="#1E293B"/>

    <!-- Screen Header -->
    <g transform="translate(24, 46)">
      <rect width="26" height="26" rx="8" fill="${BRAND.green}"/>
      <text x="34" y="18" font-family="Nunito, sans-serif" font-size="14" font-weight="800" fill="${BRAND.ink}">fechou</text>
      <circle cx="198" cy="13" r="3" fill="${BRAND.ink}"/>
      <circle cx="206" cy="13" r="3" fill="${BRAND.ink}"/>
    </g>

    <!-- Card Total -->
    <g transform="translate(20, 84)">
      <rect width="230" height="114" rx="20" fill="${BRAND.green}"/>
      <text x="18" y="28" font-family="Inter, sans-serif" font-size="11" font-weight="500" fill="white" fill-opacity="0.8">total até agora</text>
      <text x="18" y="68" font-family="Nunito, sans-serif" font-size="36" font-weight="800" letter-spacing="-1.5" fill="white">R$ 147,82</text>
      <text x="18" y="96" font-family="Inter, sans-serif" font-size="11" font-weight="500" fill="white" fill-opacity="0.75">18 itens no carrinho</text>
      <rect x="146" y="78" width="68" height="22" rx="11" fill="white" fill-opacity="0.2"/>
      <text x="156" y="93" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="white">Meta 200,00</text>
    </g>

    <!-- Button Scan -->
    <g transform="translate(20, 208)">
      <rect width="230" height="44" rx="14" fill="${BRAND.orange}"/>
      <text x="64" y="27" font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="white">📷 Registrar preço</text>
    </g>

    <!-- Items List -->
    <g transform="translate(20, 264)">
      <!-- Item 1 -->
      <rect width="230" height="40" rx="12" fill="white"/>
      <rect x="8" y="8" width="24" height="24" rx="6" fill="#EAE5DC"/>
      <text x="40" y="20" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="${BRAND.ink}">Arroz integral 1kg</text>
      <text x="40" y="32" font-family="Inter, sans-serif" font-size="9" fill="${BRAND.grayMuted}">2 un · R$ 8,49</text>
      <text x="175" y="25" font-family="Nunito, sans-serif" font-size="12" font-weight="800" fill="${BRAND.ink}">R$ 16,98</text>

      <!-- Item 2 -->
      <g transform="translate(0, 46)">
        <rect width="230" height="40" rx="12" fill="white"/>
        <rect x="8" y="8" width="24" height="24" rx="6" fill="#EAE5DC"/>
        <text x="40" y="20" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="${BRAND.ink}">Café torrado 500g</text>
        <text x="40" y="32" font-family="Inter, sans-serif" font-size="9" fill="${BRAND.grayMuted}">1 un · R$ 18,90</text>
        <text x="175" y="25" font-family="Nunito, sans-serif" font-size="12" font-weight="800" fill="${BRAND.ink}">R$ 18,90</text>
      </g>
    </g>
  </g>
</svg>`;

// 7. Google Play Store Screenshots (1080x2400)
function createPlaystoreScreenshot({ tag, titleLine1, titleLine2, subtitle, screenSvgContent, bgColor }) {
  return `<svg width="1080" height="2400" viewBox="0 0 1080 2400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="2400" fill="${bgColor}"/>
  
  <!-- Subtle circular halo -->
  <circle cx="540" cy="1400" r="600" fill="white" fill-opacity="0.05"/>

  <!-- Top Copy Header -->
  <g transform="translate(80, 160)">
    <!-- Category Pill -->
    <rect width="280" height="52" rx="26" fill="white" fill-opacity="0.15"/>
    <text x="28" y="33" font-family="monospace" font-size="20" font-weight="700" letter-spacing="2" fill="#FFE8D6">${tag}</text>

    <!-- Main Title -->
    <text x="0" y="160" font-family="Nunito, sans-serif" font-size="82" font-weight="800" letter-spacing="-3" fill="white">${titleLine1}</text>
    <text x="0" y="255" font-family="Nunito, sans-serif" font-size="82" font-weight="800" letter-spacing="-3" fill="#FFC091">${titleLine2}</text>

    <!-- Subtitle -->
    <text x="0" y="330" font-family="Inter, sans-serif" font-size="30" font-weight="400" fill="white" fill-opacity="0.82">${subtitle}</text>
  </g>

  <!-- Large Phone Mockup (Center/Bottom) -->
  <g transform="translate(140, 680)">
    <!-- Device Frame Shadow -->
    <rect x="-15" y="-10" width="830" height="1620" rx="90" fill="#051C0D" fill-opacity="0.45"/>
    <!-- Outer Bezel -->
    <rect width="800" height="1600" rx="84" fill="${BRAND.ink}"/>
    <!-- Inner Screen -->
    <rect x="22" y="22" width="756" height="1556" rx="66" fill="${BRAND.cream}"/>

    <!-- Island -->
    <rect x="268" y="45" width="220" height="46" rx="23" fill="${BRAND.ink}"/>

    <!-- Custom Screen Content -->
    ${screenSvgContent}
  </g>
</svg>`;
}

// Screenshot 1: Total em tempo real
const screenshot1Svg = createPlaystoreScreenshot({
  tag: 'CONTROLE TOTAL',
  titleLine1: 'Total da compra',
  titleLine2: 'em tempo real.',
  subtitle: 'Saiba o valor exato antes de chegar ao caixa.',
  bgColor: BRAND.green,
  screenSvgContent: `
    <g transform="translate(60, 140)">
      <!-- Top Bar -->
      <g>
        <rect width="64" height="64" rx="20" fill="${BRAND.green}"/>
        <text x="80" y="44" font-family="Nunito, sans-serif" font-size="34" font-weight="800" fill="${BRAND.ink}">fechou</text>
      </g>
      <text x="0" y="140" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="${BRAND.ink}">olá, bora às compras?</text>

      <!-- Total Box -->
      <g transform="translate(0, 170)">
        <rect width="636" height="260" rx="36" fill="${BRAND.green}"/>
        <text x="44" y="60" font-family="Inter, sans-serif" font-size="22" font-weight="500" fill="white" fill-opacity="0.8">total até agora</text>
        <text x="44" y="150" font-family="Nunito, sans-serif" font-size="76" font-weight="800" letter-spacing="-3" fill="white">R$ 147,82</text>
        <text x="44" y="210" font-family="Inter, sans-serif" font-size="22" font-weight="500" fill="white" fill-opacity="0.75">18 itens adicionados</text>
      </g>

      <!-- Scan CTA -->
      <g transform="translate(0, 460)">
        <rect width="636" height="90" rx="28" fill="${BRAND.orange}"/>
        <text x="175" y="56" font-family="Inter, sans-serif" font-size="26" font-weight="700" fill="white">📷 Registrar preço</text>
      </g>

      <!-- List -->
      <g transform="translate(0, 590)">
        <rect width="636" height="100" rx="24" fill="white"/>
        <rect x="20" y="20" width="60" height="60" rx="16" fill="#EAE5DC"/>
        <text x="100" y="48" font-family="Inter, sans-serif" font-size="24" font-weight="600" fill="${BRAND.ink}">Arroz integral 1kg</text>
        <text x="100" y="74" font-family="Inter, sans-serif" font-size="18" fill="${BRAND.grayMuted}">2 un · R$ 8,49</text>
        <text x="480" y="60" font-family="Nunito, sans-serif" font-size="26" font-weight="800" fill="${BRAND.ink}">R$ 16,98</text>

        <g transform="translate(0, 116)">
          <rect width="636" height="100" rx="24" fill="white"/>
          <rect x="20" y="20" width="60" height="60" rx="16" fill="#EAE5DC"/>
          <text x="100" y="48" font-family="Inter, sans-serif" font-size="24" font-weight="600" fill="${BRAND.ink}">Café torrado 500g</text>
          <text x="100" y="74" font-family="Inter, sans-serif" font-size="18" fill="${BRAND.grayMuted}">1 un · R$ 18,90</text>
          <text x="480" y="60" font-family="Nunito, sans-serif" font-size="26" font-weight="800" fill="${BRAND.ink}">R$ 18,90</text>
        </g>

        <g transform="translate(0, 232)">
          <rect width="636" height="100" rx="24" fill="white"/>
          <rect x="20" y="20" width="60" height="60" rx="16" fill="#EAE5DC"/>
          <text x="100" y="48" font-family="Inter, sans-serif" font-size="24" font-weight="600" fill="${BRAND.ink}">Leite integral 1L</text>
          <text x="100" y="74" font-family="Inter, sans-serif" font-size="18" fill="${BRAND.grayMuted}">4 un · R$ 4,79</text>
          <text x="480" y="60" font-family="Nunito, sans-serif" font-size="26" font-weight="800" fill="${BRAND.ink}">R$ 19,16</text>
        </g>
      </g>
    </g>
  `
});

// Screenshot 2: Scanner e Leitura
const screenshot2Svg = createPlaystoreScreenshot({
  tag: 'LEITURA INTELIGENTE',
  titleLine1: 'Aponte a câmera,',
  titleLine2: 'capture o preço.',
  subtitle: 'Reconhecimento ágil na etiqueta do corredor.',
  bgColor: '#165D30',
  screenSvgContent: `
    <g transform="translate(60, 140)">
      <!-- Header -->
      <text x="0" y="40" font-family="Nunito, sans-serif" font-size="32" font-weight="800" fill="${BRAND.ink}">Mire na etiqueta</text>
      <text x="0" y="75" font-family="Inter, sans-serif" font-size="20" fill="${BRAND.grayMuted}">Posicione o valor dentro do quadro</text>

      <!-- Viewfinder -->
      <g transform="translate(0, 120)">
        <rect width="636" height="600" rx="36" fill="#1E293B"/>
        <!-- Scanner Guide -->
        <rect x="68" y="150" width="500" height="280" rx="24" stroke="${BRAND.orange}" stroke-width="4" stroke-dasharray="16 12" fill="white" fill-opacity="0.06"/>
        <line x1="68" y1="290" x2="568" y2="290" stroke="#FF4500" stroke-width="3" stroke-opacity="0.8"/>
        <text x="195" y="300" font-family="Nunito, sans-serif" font-size="70" font-weight="800" fill="white">R$ 7,89</text>
        <!-- Confirmed Tag -->
        <rect x="218" y="450" width="200" height="50" rx="25" fill="${BRAND.green}"/>
        <text x="245" y="482" font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="white">✓ Preço lido</text>
      </g>

      <!-- Bottom Card -->
      <g transform="translate(0, 760)">
        <rect width="636" height="160" rx="32" fill="white"/>
        <text x="36" y="52" font-family="Inter, sans-serif" font-size="22" font-weight="600" fill="${BRAND.ink}">Biscoito recheado 130g</text>
        <text x="36" y="85" font-family="Inter, sans-serif" font-size="18" fill="${BRAND.grayMuted}">Preço unitário: R$ 7,89</text>
        <rect x="420" y="45" width="180" height="70" rx="22" fill="${BRAND.green}"/>
        <text x="450" y="88" font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="white">+ Adicionar</text>
      </g>
    </g>
  `
});

// Screenshot 3: Funciona Offline
const screenshot3Svg = createPlaystoreScreenshot({
  tag: 'SEM INTERNET',
  titleLine1: 'Funciona 100%',
  titleLine2: 'sem conexão.',
  subtitle: 'Pode entrar no subsolo do supermercado sem medo.',
  bgColor: '#254E33',
  screenSvgContent: `
    <g transform="translate(60, 140)">
      <g transform="translate(0, 80)">
        <!-- Offline Shield Graphic -->
        <rect width="636" height="340" rx="36" fill="${BRAND.ink}"/>
        <circle cx="318" cy="140" r="70" fill="white" fill-opacity="0.1"/>
        <text x="290" y="160" font-size="60">📶</text>
        <line x1="260" y1="90" x2="380" y2="200" stroke="${BRAND.orange}" stroke-width="8" stroke-linecap="round"/>
        <text x="180" y="260" font-family="Nunito, sans-serif" font-size="34" font-weight="800" fill="white">Modo 100% Offline</text>
        <text x="110" y="300" font-family="Inter, sans-serif" font-size="20" fill="white" fill-opacity="0.75">Suas listas e contas ficam salvas no seu aparelho</text>
      </g>

      <g transform="translate(0, 470)">
        <rect width="636" height="280" rx="32" fill="white"/>
        <text x="40" y="60" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="${BRAND.ink}">Vantagens do fechou:</text>
        
        <text x="40" y="115" font-family="Inter, sans-serif" font-size="20" font-weight="500" fill="${BRAND.ink}">✓ Não consome seus dados móveis</text>
        <text x="40" y="165" font-family="Inter, sans-serif" font-size="20" font-weight="500" fill="${BRAND.ink}">✓ Sem login ou senhas complicadas</text>
        <text x="40" y="215" font-family="Inter, sans-serif" font-size="20" font-weight="500" fill="${BRAND.ink}">✓ Resposta instantânea no cálculo</text>
      </g>
    </g>
  `
});

// 8. In-App Banners
const inAppWelcomeSvg = `<svg width="720" height="240" viewBox="0 0 720 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="720" height="240" rx="32" fill="${BRAND.green}"/>
  <g transform="translate(36, 36)">
    <rect width="52" height="52" rx="16" fill="white"/>
    <g transform="translate(6, 6) scale(1)">
      <path d="M7.5 9.8H10C12 9.8 13.6 11.1 14 13L14.4 14.8H26.5C27.2 14.8 27.8 15.1 28.3 15.6L33.2 20.2C33.8 20.8 33.8 21.7 33.2 22.3L28.3 26.9C27.8 27.4 27.2 27.7 26.5 27.7H16.4C14.8 27.7 13.5 26.6 13.2 25.1L10.9 14.4C10.7 13.6 10.3 13.1 9.5 13.1H7.5C6.5 13.1 5.7 12.4 5.7 11.4C5.7 10.5 6.5 9.8 7.5 9.8Z" fill="${BRAND.green}"/>
      <path d="M15.5 20.7L18.2 23.3L23 18.2" stroke="white" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="28.4" cy="21.25" r="1.65" fill="${BRAND.orange}"/>
    </g>
    <text x="68" y="34" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="white">fechou o carrinho</text>
    <text x="0" y="85" font-family="Nunito, sans-serif" font-size="28" font-weight="800" fill="white">Bora às compras sem surpresas?</text>
    <text x="0" y="115" font-family="Inter, sans-serif" font-size="16" fill="white" fill-opacity="0.85">Toque em registrar preço ou aponte a câmera para somar seu primeiro produto.</text>
  </g>
  <circle cx="660" cy="120" r="90" fill="white" fill-opacity="0.08"/>
</svg>`;

const inAppScannerTipSvg = `<svg width="720" height="200" viewBox="0 0 720 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="720" height="200" rx="28" fill="${BRAND.ink}"/>
  <g transform="translate(32, 32)">
    <rect width="44" height="44" rx="14" fill="${BRAND.orange}"/>
    <text x="14" y="28" font-size="18">📷</text>
    <text x="60" y="28" font-family="Nunito, sans-serif" font-size="22" font-weight="800" fill="white">Dica do leitor de preços</text>
    <text x="0" y="75" font-family="Inter, sans-serif" font-size="15" fill="white" fill-opacity="0.8">Posicione a etiqueta amarela ou branca bem iluminada no centro do visor</text>
    <text x="0" y="98" font-family="Inter, sans-serif" font-size="15" fill="white" fill-opacity="0.8">para captura instantânea sem precisar digitar centavos.</text>
  </g>
</svg>`;

const inAppFamilyPlanSvg = `<svg width="720" height="200" viewBox="0 0 720 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="720" height="200" rx="28" fill="${BRAND.cream}" stroke="#111827" stroke-width="2"/>
  <g transform="translate(32, 32)">
    <rect width="130" height="28" rx="14" fill="${BRAND.orange}"/>
    <text x="16" y="18" font-family="monospace" font-size="11" font-weight="700" fill="white">EM BREVE</text>
    <text x="0" y="65" font-family="Nunito, sans-serif" font-size="24" font-weight="800" fill="${BRAND.ink}">Plano Família: Lista compartilhada</text>
    <text x="0" y="94" font-family="Inter, sans-serif" font-size="15" fill="${BRAND.grayMuted}">Você em um corredor e quem você ama no outro, somando no mesmo carrinho.</text>
  </g>
</svg>`;

// Android Adaptive Icon Drawables (XML)
const icLauncherBackgroundXml = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <path
        android:fillColor="#1B8C42"
        android:pathData="M0,0h108v108h-108z" />
</vector>`;

const icLauncherForegroundXml = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <group android:translateX="27" android:translateY="27" android:scaleX="1.35" android:scaleY="1.35">
        <path
            android:fillColor="#FFFFFF"
            android:pathData="M7.5,9.8H10C12,9.8 13.6,11.1 14,13L14.4,14.8H26.5C27.2,14.8 27.8,15.1 28.3,15.6L33.2,20.2C33.8,20.8 33.8,21.7 33.2,22.3L28.3,26.9C27.8,27.4 27.2,27.7 26.5,27.7H16.4C14.8,27.7 13.5,26.6 13.2,25.1L10.9,14.4C10.7,13.6 10.3,13.1 9.5,13.1H7.5C6.5,13.1 5.7,12.4 5.7,11.4C5.7,10.5 6.5,9.8 7.5,9.8Z"/>
        <path
            android:strokeColor="#1B8C42"
            android:strokeWidth="2.1"
            android:strokeLineCap="round"
            android:strokeLineJoin="round"
            android:pathData="M15.5,20.7L18.2,23.3L23,18.2"/>
        <path
            android:fillColor="#FF6B00"
            android:pathData="M28.4,19.6a1.65,1.65 0 1,0 0.01,0Z"/>
        <path
            android:fillColor="#FFFFFF"
            android:pathData="M17,29.35a1.8,1.8 0 1,0 0.01,0Z"/>
        <path
            android:fillColor="#FFFFFF"
            android:pathData="M25.6,29.35a1.8,1.8 0 1,0 0.01,0Z"/>
    </group>
</vector>`;

// Write all assets to materiais/04-marca and public/design-assets
const fileMap = [
  // Brand
  { path: path.join(DESIGN_DIR, 'brand', 'logo-mark.svg'), content: logoMarkSvg },
  { path: path.join(DESIGN_DIR, 'brand', 'logo-horizontal.svg'), content: logoHorizontalSvg },
  { path: path.join(DESIGN_DIR, 'brand', 'logo-horizontal-dark.svg'), content: logoHorizontalDarkSvg },
  { path: path.join(DESIGN_DIR, 'brand', 'logo-monochrome.svg'), content: logoMonochromeSvg },

  // Icons & Favicons
  { path: path.join(DESIGN_DIR, 'icons', 'favicon.svg'), content: logoMarkSvg },
  { path: path.join(DESIGN_DIR, 'icons', 'apple-touch-icon.svg'), content: logoMarkSvg },
  { path: path.join(DESIGN_DIR, 'icons', 'ic_launcher_playstore.svg'), content: playstoreIconSvg },
  { path: path.join(DESIGN_DIR, 'icons', 'ic_launcher_background.xml'), content: icLauncherBackgroundXml },
  { path: path.join(DESIGN_DIR, 'icons', 'ic_launcher_foreground.xml'), content: icLauncherForegroundXml },

  // App Store
  { path: path.join(DESIGN_DIR, 'app-store', 'playstore-feature-graphic-1024x500.svg'), content: featureGraphicSvg },
  { path: path.join(DESIGN_DIR, 'app-store', 'screenshot-1-total-tempo-real-1080x2400.svg'), content: screenshot1Svg },
  { path: path.join(DESIGN_DIR, 'app-store', 'screenshot-2-leitor-etiquetas-1080x2400.svg'), content: screenshot2Svg },
  { path: path.join(DESIGN_DIR, 'app-store', 'screenshot-3-funciona-offline-1080x2400.svg'), content: screenshot3Svg },

  // In-App Banners
  { path: path.join(DESIGN_DIR, 'in-app-banners', 'inapp-banner-welcome-720x240.svg'), content: inAppWelcomeSvg },
  { path: path.join(DESIGN_DIR, 'in-app-banners', 'inapp-banner-scanner-tip-720x200.svg'), content: inAppScannerTipSvg },
  { path: path.join(DESIGN_DIR, 'in-app-banners', 'inapp-banner-family-plan-720x200.svg'), content: inAppFamilyPlanSvg }
];

fileMap.forEach(item => {
  fs.writeFileSync(item.path, item.content, 'utf8');
  // Mirror into public assets for landing page showcase & download
  const basename = path.basename(item.path);
  fs.writeFileSync(path.join(PUBLIC_ASSETS, basename), item.content, 'utf8');
});

// Also create Tokens JSON
const tokens = {
  brand: {
    primary: BRAND.green,
    primaryDark: BRAND.greenDark,
    accent: BRAND.orange,
    surface: BRAND.cream,
    ink: BRAND.ink
  },
  typography: {
    display: 'Nunito, sans-serif',
    body: 'Inter, sans-serif',
    mono: 'monospace'
  },
  specs: {
    featureGraphic: '1024x500',
    playStoreIcon: '512x512',
    screenshots: '1080x2400',
    promoHorizontal: '1200x628',
    postSquare: '1080x1080',
    storyVertical: '1080x1920'
  }
};
fs.writeFileSync(path.join(DESIGN_DIR, 'brand', 'brand-tokens.json'), JSON.stringify(tokens, null, 2), 'utf8');
fs.writeFileSync(path.join(PUBLIC_ASSETS, 'brand-tokens.json'), JSON.stringify(tokens, null, 2), 'utf8');

console.log('✅ Todos os assets de design vetoriais foram gerados com sucesso!');
