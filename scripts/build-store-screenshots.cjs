// Gera as capturas da Play Store (1080x1920, 9:16) a partir das telas do deck.
// Uso: node scripts/build-store-screenshots.cjs
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const SCREENS = path.join(ROOT, "design", "app-screens");
const OUT = path.join(ROOT, "materiais", "01-play-store", "screens");
const TMP = path.join(ROOT, ".store-tmp");
const EDGE = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].find((p) => fs.existsSync(p));

if (!EDGE) throw new Error("Edge não encontrado para renderizar as capturas.");

const SHOTS = [
  { file: "01 Home.png", tag: "CONTROLE TOTAL", a: "Total da compra", b: "em tempo real.", sub: "Saiba o valor exato antes de chegar ao caixa." },
  { file: "02 Câmera.png", tag: "LEITOR DE ETIQUETAS", a: "Escaneie a etiqueta.", b: "O preço entra sozinho.", sub: "Sem digitar, sem errar na conta." },
  { file: "05 Comparador.png", tag: "COMPARADOR", a: "Descubra onde", b: "rende mais.", sub: "O mesmo item, o total em cada rede." },
  { file: "06 Listas.png", tag: "PLANEJAMENTO", a: "Monte a lista", b: "antes de sair.", sub: "Itens planejados viram preço no mercado." },
  { file: "09 Recibo.png", tag: "FECHAMENTO", a: "Feche a compra", b: "sem susto no caixa.", sub: "Recibo pronto para compartilhar." },
];

function dataUri(p) {
  return "data:image/png;base64," + fs.readFileSync(p).toString("base64");
}

function page(shot) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1080px;height:1920px;overflow:hidden;background:#1B8C42;
    font-family:"Segoe UI","Inter",system-ui,sans-serif;color:#FFF8F0;position:relative}
  .glow{position:absolute;width:1200px;height:1200px;border-radius:50%;
    background:radial-gradient(circle,rgba(255,255,255,.10),rgba(255,255,255,0) 65%);
    top:-420px;right:-380px}
  .glow2{position:absolute;width:900px;height:900px;border-radius:50%;
    background:radial-gradient(circle,rgba(4,40,26,.45),rgba(4,40,26,0) 68%);
    bottom:-260px;left:-240px}
  .wrap{position:relative;padding:104px 88px 0}
  .tag{display:inline-flex;align-items:center;height:56px;padding:0 26px;border-radius:999px;
    background:rgba(255,248,240,.16);font-size:23px;font-weight:700;letter-spacing:.14em}
  h1{margin-top:40px;font-size:82px;line-height:1.04;font-weight:900;letter-spacing:-.02em}
  h1 em{font-style:normal;color:#FF8A3D}
  p{margin-top:28px;font-size:31px;line-height:1.35;font-weight:500;color:rgba(255,248,240,.86);max-width:820px}
  .phone{position:absolute;left:50%;transform:translateX(-50%);bottom:-140px;width:700px;
    border:16px solid #0B2B1F;border-radius:64px;overflow:hidden;background:#FFF8F0;
    box-shadow:0 40px 90px rgba(0,0,0,.34)}
  .phone img{display:block;width:100%}
  .notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:190px;height:34px;
    background:#0B2B1F;border-radius:0 0 22px 22px;z-index:3}
  </style></head><body>
  <div class="glow"></div><div class="glow2"></div>
  <div class="wrap">
    <div class="tag">${shot.tag}</div>
    <h1>${shot.a}<br><em>${shot.b}</em></h1>
    <p>${shot.sub}</p>
  </div>
  <div class="phone"><div class="notch"></div><img src="${dataUri(path.join(SCREENS, shot.file))}"></div>
  </body></html>`;
}

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });

SHOTS.forEach((shot, i) => {
  const html = path.join(TMP, `shot-${i}.html`);
  fs.writeFileSync(html, page(shot));
  const out = path.join(OUT, `screenshot-${i + 1}-1080x1920.png`);
  execFileSync(EDGE, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--force-device-scale-factor=1", "--window-size=1080,1920",
    `--screenshot=${out}`, "file:///" + html.replace(/\\/g, "/"),
  ], { stdio: "ignore" });
  console.log("ok", path.basename(out));
});
