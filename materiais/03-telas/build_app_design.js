// Deck das 12 telas do app Android (390 x 880) para o FigCraft.
const fs = require("fs");
const path = require("path");

const C = {
  cream: "#FFF8F0",
  ink: "#0B2B1F",
  muted: "#5A6B63",
  green: "#1B8C42",
  greenDark: "#146B32",
  orange: "#FF6B00",
  white: "#FFFFFF",
  dark: "#0B2B1F",
  line: "#0B2B1F",
};

let n = 0;
const id = () => `1:${++n}`;
const rgba = (hex) => ({
  r: parseInt(hex.slice(1, 3), 16) / 255,
  g: parseInt(hex.slice(3, 5), 16) / 255,
  b: parseInt(hex.slice(5, 7), 16) / 255,
  a: 1,
});
const solid = (hex, opacity = 1) => [{ type: "SOLID", color: rgba(hex), opacity }];

function node(type, o) {
  const x = {
    id: id(),
    name: o.name || type,
    type,
    absoluteBoundingBox: { x: o.x, y: o.y, width: o.w, height: o.h },
  };
  if (type === "TEXT") {
    x.characters = o.text || "";
    x.style = {
      fontFamily: o.font || "Inter",
      fontWeight: o.weight || 400,
      fontSize: o.size || 13,
      lineHeightPx: o.lh || Math.round((o.size || 13) * 1.4),
      letterSpacing: o.ls || 0,
      textAlignHorizontal: o.align || "LEFT",
      textAlignVertical: "TOP",
    };
    x.fills = solid(o.color || C.ink);
  } else {
    x.fills = o.fill ? solid(o.fill, o.fillOpacity ?? 1) : [];
  }
  if (o.radius !== undefined) x.cornerRadius = o.radius;
  if (o.stroke) {
    x.strokes = solid(o.stroke, o.strokeOpacity ?? 1);
    x.strokeWeight = o.strokeWeight || 1;
    x.strokeAlign = "INSIDE";
  }
  if (o.children) x.children = o.children;
  return x;
}
const r = (o) => node("RECTANGLE", o);
const t = (o) => node("TEXT", o);
const e = (o) => node("ELLIPSE", o);

const W = 390;
const H = 880;

function statusbar(dark = true) {
  return [
    t({ name: "hora", x: 24, y: 14, w: 40, h: 16, text: "9:41", size: 11, weight: 600, color: dark ? C.ink : C.white }),
    t({ name: "sinal", x: 318, y: 14, w: 48, h: 16, text: "▮▮▮", size: 9, color: dark ? C.ink : C.white, align: "RIGHT" }),
  ];
}

function homeBar(dark = true) {
  return r({ name: "home indicator", x: 130, y: 862, w: 130, h: 5, fill: dark ? C.ink : C.white, fillOpacity: 0.35, radius: 3 });
}

function bottomNav(ativo) {
  const items = [
    ["Início", 0],
    ["Listas", 1],
    ["Escanear", 2],
    ["Carrinho", 3],
    ["Perfil", 4],
  ];
  const kids = [
    r({ name: "nav fundo", x: 0, y: 794, w: W, h: 86, fill: C.white }),
    r({ name: "nav linha", x: 0, y: 794, w: W, h: 1, fill: C.line, fillOpacity: 0.1 }),
  ];
  items.forEach(([label, i]) => {
    const cx = 39 + i * 78;
    const ativoItem = label === ativo;
    kids.push(
      r({ name: `nav icone ${label}`, x: cx - 14, y: 812, w: 28, h: 28, fill: ativoItem ? C.green : C.line, fillOpacity: ativoItem ? 1 : 0.14, radius: 9 })
    );
    kids.push(
      t({ name: `nav label ${label}`, x: cx - 34, y: 846, w: 68, h: 14, text: label, size: 9, weight: ativoItem ? 600 : 400, color: ativoItem ? C.green : C.muted, align: "CENTER" })
    );
  });
  return kids;
}

function appHeader(title, subtitle, right = "escolher mercado") {
  return [
    r({ name: "header verde", x: 16, y: 40, w: W - 32, h: 74, fill: C.green, radius: 24 }),
    r({ name: "logo mark", x: 34, y: 56, w: 42, h: 42, fill: C.white, radius: 13 }),
    t({ name: "logo check", x: 34, y: 64, w: 42, h: 26, text: "✓", size: 17, weight: 700, color: C.green, align: "CENTER" }),
    t({ name: "marca", x: 88, y: 58, w: 150, h: 18, text: title, font: "Nunito", size: 15, weight: 700, color: C.white }),
    t({ name: "sub", x: 88, y: 78, w: 150, h: 16, text: subtitle, size: 10, color: C.white }),
    r({ name: "pill mercado", x: 226, y: 64, w: 144, h: 26, fill: C.white, fillOpacity: 0.2, radius: 10 }),
    t({ name: "pill texto", x: 232, y: 70, w: 132, h: 14, text: right, size: 9, weight: 600, color: C.white, align: "CENTER" }),
  ];
}

function sectionTitle(y, title, meta) {
  const out = [t({ name: `secao ${title}`, x: 20, y, w: 220, h: 18, text: title, font: "Nunito", size: 14, weight: 700 })];
  if (meta) out.push(t({ name: `secao meta ${title}`, x: 250, y: y + 2, w: 120, h: 14, text: meta, size: 10, color: C.muted, align: "RIGHT" }));
  return out;
}

function card(x, y, w, h, opts = {}) {
  return r({ name: opts.name || "card", x, y, w, h, fill: opts.fill || C.white, radius: opts.radius ?? 18, stroke: opts.stroke || C.line, strokeOpacity: opts.strokeOpacity ?? 0.1 });
}

function budgetCard(y, total, goal) {
  const pct = Math.min(1, total / goal);
  return [
    card(16, y, W - 32, 116, { name: "card orcamento" }),
    t({ name: "orcamento label", x: 34, y: y + 16, w: 200, h: 14, text: "orçamento da compra", size: 10, color: C.muted }),
    t({ name: "orcamento total", x: 34, y: y + 32, w: 240, h: 34, text: total, font: "Nunito", size: 28, weight: 700, ls: -1 }),
    t({ name: "orcamento meta", x: 34, y: y + 66, w: 240, h: 14, text: `de ${goal} (meta)`, size: 11, color: C.muted }),
    t({ name: "orcamento editar", x: 286, y: y + 16, w: 70, h: 14, text: "editar meta", size: 9, weight: 600, color: C.green, align: "RIGHT" }),
    r({ name: "barra fundo", x: 34, y: y + 88, w: W - 100, h: 8, fill: C.line, fillOpacity: 0.1, radius: 4 }),
    r({ name: "barra fill", x: 34, y: y + 88, w: (W - 100) * pct, h: 8, fill: C.green, radius: 4 }),
  ];
}

function itemRow(y, nome, qtd, preco, cat) {
  const out = [];
  if (cat) out.push(t({ name: `cat ${cat}`, x: 20, y: y - 18, w: 200, h: 12, text: cat.toUpperCase(), size: 8, weight: 700, color: C.muted, ls: 1.2 }));
  out.push(card(16, y, W - 32, 62, { name: `item ${nome}`, radius: 16 }));
  out.push(r({ name: `thumb ${nome}`, x: 28, y: y + 11, w: 40, h: 40, fill: C.line, fillOpacity: 0.08, radius: 11 }));
  out.push(t({ name: `nome ${nome}`, x: 80, y: y + 14, w: 190, h: 16, text: nome, size: 12, weight: 600 }));
  out.push(t({ name: `qtd ${nome}`, x: 80, y: y + 34, w: 160, h: 14, text: qtd, size: 10, color: C.muted }));
  out.push(t({ name: `preco ${nome}`, x: 264, y: y + 22, w: 90, h: 18, text: preco, font: "Nunito", size: 13, weight: 700, align: "RIGHT" }));
  return out;
}

function backHeader(title, subtitle) {
  const out = [
    r({ name: "voltar", x: 20, y: 48, w: 36, h: 36, fill: C.green, fillOpacity: 0.12, radius: 18 }),
    t({ name: "seta", x: 20, y: 55, w: 36, h: 20, text: "←", size: 15, weight: 600, color: C.green, align: "CENTER" }),
    t({ name: "titulo tela", x: 68, y: 50, w: 280, h: 22, text: title, font: "Nunito", size: 18, weight: 700, ls: -0.5 }),
  ];
  if (subtitle) out.push(t({ name: "sub tela", x: 68, y: 72, w: 280, h: 16, text: subtitle, size: 10, color: C.muted }));
  return out;
}

function page(name, children, height = H) {
  return {
    id: id(),
    name,
    type: "CANVAS",
    backgroundColor: rgba(C.cream),
    children: [
      {
        id: id(),
        name,
        type: "FRAME",
        absoluteBoundingBox: { x: 0, y: 0, width: W, height },
        fills: solid(C.cream),
        children,
      },
    ],
  };
}

// ---------------- telas ----------------

const home = page("01 Home", [
  ...statusbar(),
  // cabeçalho enxuto sobre o creme
  r({ name: "logo mark", x: 20, y: 44, w: 40, h: 40, fill: C.green, radius: 12 }),
  t({ name: "logo check", x: 20, y: 52, w: 40, h: 24, text: "✓", size: 16, weight: 700, color: C.white, align: "CENTER" }),
  t({ name: "marca", x: 70, y: 50, w: 160, h: 20, text: "fechou o carrinho", font: "Nunito", size: 15, weight: 700, ls: -0.4 }),
  r({ name: "chip mercado", x: 222, y: 48, w: 148, h: 32, fill: C.white, radius: 16, stroke: C.line, strokeOpacity: 0.15 }),
  t({ name: "chip texto", x: 234, y: 57, w: 118, h: 14, text: "BH Supermercados", size: 9, weight: 600, color: C.ink }),
  t({ name: "chip caret", x: 354, y: 55, w: 10, h: 14, text: "▾", size: 8, color: C.muted }),

  // orçamento como bloco principal
  r({ name: "hero", x: 16, y: 104, w: W - 32, h: 152, fill: C.dark, radius: 26 }),
  t({ name: "hero label", x: 36, y: 124, w: 200, h: 14, text: "ORÇAMENTO DA COMPRA", size: 8, weight: 700, color: C.white, ls: 1.4 }),
  t({ name: "hero editar", x: 270, y: 124, w: 84, h: 14, text: "editar meta", size: 9, weight: 600, color: C.white, align: "RIGHT" }),
  t({ name: "hero total", x: 36, y: 144, w: 260, h: 46, text: "R$ 58,85", font: "Nunito", size: 38, weight: 700, color: C.white, ls: -1.8 }),
  t({ name: "hero meta", x: 36, y: 192, w: 180, h: 14, text: "de R$ 200,00", size: 10, color: C.white }),
  t({ name: "hero falta", x: 196, y: 192, w: 158, h: 14, text: "faltam R$ 141,15", size: 10, weight: 600, color: C.white, align: "RIGHT" }),
  r({ name: "hero trilha", x: 36, y: 216, w: 318, h: 6, fill: C.white, fillOpacity: 0.18, radius: 3 }),
  r({ name: "hero progresso", x: 36, y: 216, w: 94, h: 6, fill: "#35B96A", radius: 3 }),

  // ação principal
  r({ name: "cta escanear", x: 16, y: 272, w: 250, h: 54, fill: C.orange, radius: 27 }),
  r({ name: "cta camera corpo", x: 38, y: 291, w: 20, h: 15, fill: C.white, radius: 4 }),
  r({ name: "cta camera topo", x: 43, y: 288, w: 10, h: 5, fill: C.white, radius: 2 }),
  e({ name: "cta camera lente", x: 44, y: 294, w: 8, h: 8, fill: C.orange }),
  t({ name: "cta texto", x: 66, y: 291, w: 180, h: 18, text: "Escanear etiqueta", size: 13, weight: 700, color: C.white }),
  r({ name: "cta manual", x: 278, y: 272, w: 96, h: 54, fill: C.white, radius: 27, stroke: C.line, strokeOpacity: 0.15 }),
  t({ name: "cta manual texto", x: 278, y: 291, w: 96, h: 18, text: "+ Manual", size: 11, weight: 600, color: C.ink, align: "CENTER" }),

  // lista
  t({ name: "secao lista", x: 20, y: 352, w: 220, h: 18, text: "lista de compras", font: "Nunito", size: 14, weight: 700 }),
  t({ name: "secao meta", x: 250, y: 354, w: 120, h: 14, text: "3 itens", size: 10, color: C.muted, align: "RIGHT" }),

  ...[
    ["Arroz branco 5kg", "1 un · Mercearia", "R$ 28,90"],
    ["Feijão carioca 1kg", "2 un · Mercearia", "R$ 14,98"],
    ["Leite integral 1L", "3 un · Bebidas", "R$ 14,97"],
  ].flatMap(([nome, qtd, preco], i) => {
    const y = 382 + i * 74;
    return [
      r({ name: `divisor ${i}`, x: 20, y: y + 72, w: W - 40, h: 1, fill: C.line, fillOpacity: 0.1 }),
      r({ name: `check ${i}`, x: 20, y: y + 22, w: 24, h: 24, fill: C.white, radius: 12, stroke: C.line, strokeOpacity: 0.25 }),
      r({ name: `thumb ${i}`, x: 56, y: y + 12, w: 44, h: 44, fill: C.line, fillOpacity: 0.07, radius: 12 }),
      t({ name: `nome ${i}`, x: 112, y: y + 14, w: 190, h: 18, text: nome, size: 12, weight: 600 }),
      t({ name: `qtd ${i}`, x: 112, y: y + 34, w: 190, h: 14, text: qtd, size: 10, color: C.muted }),
      t({ name: `preco ${i}`, x: 252, y: y + 22, w: 118, h: 20, text: preco, font: "Nunito", size: 14, weight: 700, align: "RIGHT" }),
    ];
  }),

  // fechamento
  r({ name: "botao finalizar", x: 16, y: 624, w: W - 32, h: 54, fill: C.green, radius: 27 }),
  t({ name: "finalizar label", x: 34, y: 643, w: 140, h: 16, text: "Finalizar compra", size: 12, weight: 700, color: C.white }),
  t({ name: "finalizar valor", x: 220, y: 640, w: 150, h: 20, text: "R$ 58,85", font: "Nunito", size: 15, weight: 700, color: C.white, align: "RIGHT" }),

  // navegação
  r({ name: "nav fundo", x: 0, y: 794, w: W, h: 86, fill: C.white }),
  r({ name: "nav linha", x: 0, y: 794, w: W, h: 1, fill: C.line, fillOpacity: 0.1 }),
  r({ name: "nav ativo", x: 18, y: 806, w: 76, h: 38, fill: C.green, fillOpacity: 0.12, radius: 19 }),
  r({ name: "nav icone 0", x: 44, y: 816, w: 16, h: 16, fill: C.green, radius: 4 }),
  t({ name: "nav label 0", x: 62, y: 818, w: 40, h: 12, text: "Início", size: 9, weight: 700, color: C.green }),
  ...[
    ["Listas", 117, "▤"],
    ["Escanear", 195, "◎"],
    ["Carrinho", 273, "▦"],
    ["Perfil", 351, "◔"],
  ].flatMap(([label, cx, glyph]) => [
    t({ name: `nav glyph ${label}`, x: cx - 14, y: 812, w: 28, h: 20, text: glyph, size: 13, color: C.muted, align: "CENTER" }),
    t({ name: `nav label ${label}`, x: cx - 34, y: 834, w: 68, h: 12, text: label, size: 9, color: C.muted, align: "CENTER" }),
  ]),
  homeBar(),
]);

const camera = page("02 Câmera", [
  r({ name: "fundo camera", x: 0, y: 0, w: W, h: H, fill: "#0B1210" }),
  t({ name: "titulo camera", x: 60, y: 24, w: 270, h: 20, text: "Escanear preço", size: 13, weight: 700, color: C.white, align: "CENTER" }),
  r({ name: "fechar", x: 20, y: 20, w: 32, h: 32, fill: C.white, fillOpacity: 0.16, radius: 16 }),
  r({ name: "mira topo", x: 70, y: 190, w: 250, h: 150, fill: C.white, fillOpacity: 0, radius: 18, stroke: C.white, strokeOpacity: 0.85, strokeWeight: 2 }),
  t({ name: "mira texto", x: 80, y: 246, w: 230, h: 30, text: "enquadre a etiqueta", size: 10, color: C.white, align: "CENTER" }),
  r({ name: "sheet", x: 0, y: 470, w: W, h: 410, fill: C.white, radius: 28 }),
  r({ name: "grabber", x: 175, y: 486, w: 40, h: 4, fill: C.line, fillOpacity: 0.2, radius: 2 }),
  t({ name: "sheet titulo", x: 24, y: 506, w: 300, h: 24, text: "Preço detectado", font: "Nunito", size: 18, weight: 700 }),
  t({ name: "sheet sub", x: 24, y: 532, w: 330, h: 16, text: "Confirme ou edite antes de adicionar", size: 10, color: C.muted }),
  card(24, 558, W - 48, 64, { fill: "#FFF8F0", radius: 16, name: "item detectado", stroke: C.line, strokeOpacity: 0.06 }),
  r({ name: "thumb detectado", x: 38, y: 572, w: 36, h: 36, fill: C.line, fillOpacity: 0.08, radius: 10 }),
  t({ name: "nome detectado", x: 86, y: 574, w: 170, h: 16, text: "Arroz branco 5kg", size: 12, weight: 600 }),
  t({ name: "mercado detectado", x: 86, y: 592, w: 170, h: 14, text: "Supermercados BH · 1 un", size: 9, color: C.muted }),
  t({ name: "preco detectado", x: 250, y: 578, w: 110, h: 20, text: "R$ 28,90", font: "Nunito", size: 16, weight: 700, color: C.orange, align: "RIGHT" }),
  t({ name: "label campo", x: 24, y: 638, w: 200, h: 14, text: "Preço unitário", size: 10, color: C.muted }),
  r({ name: "campo preco", x: 24, y: 656, w: W - 48, h: 46, fill: C.white, radius: 14, stroke: C.line, strokeOpacity: 0.2 }),
  t({ name: "campo preco valor", x: 40, y: 670, w: 200, h: 18, text: "28,90", size: 14, weight: 600 }),
  t({ name: "label qtd", x: 24, y: 716, w: 200, h: 14, text: "Quantidade", size: 10, color: C.muted }),
  r({ name: "menos", x: 24, y: 734, w: 44, h: 40, fill: C.line, fillOpacity: 0.08, radius: 12 }),
  t({ name: "menos sinal", x: 24, y: 744, w: 44, h: 18, text: "−", size: 15, color: C.ink, align: "CENTER" }),
  r({ name: "qtd caixa", x: 76, y: 734, w: 60, h: 40, fill: C.white, radius: 12, stroke: C.line, strokeOpacity: 0.2 }),
  t({ name: "qtd valor", x: 76, y: 744, w: 60, h: 18, text: "1", size: 14, weight: 700, align: "CENTER" }),
  r({ name: "mais", x: 144, y: 734, w: 44, h: 40, fill: C.green, radius: 12 }),
  t({ name: "mais sinal", x: 144, y: 744, w: 44, h: 18, text: "+", size: 15, color: C.white, align: "CENTER" }),
  r({ name: "botao confirmar", x: 24, y: 790, w: W - 48, h: 48, fill: C.orange, radius: 24 }),
  t({ name: "botao confirmar texto", x: 24, y: 804, w: W - 48, h: 18, text: "Confirmar", size: 13, weight: 700, color: C.white, align: "CENTER" }),
  homeBar(),
], H);

const mercado = page("03 Seleção de mercado", [
  ...statusbar(),
  ...backHeader("Selecionar mercado", "Redes cadastradas na base do Fechou"),
  r({ name: "atualizar", x: 330, y: 48, w: 36, h: 36, fill: C.green, fillOpacity: 0.12, radius: 18 }),
  t({ name: "atualizar icone", x: 330, y: 56, w: 36, h: 18, text: "↻", size: 14, weight: 600, color: C.green, align: "CENTER" }),
  ...sectionTitle(108, "redes disponíveis", "7 na base"),
  ...[
    ["BH", "BH Supermercados", "Várias cidades · MG", true],
    ["EPA", "EPA Supermercados", "Várias cidades · MG", false],
    ["MM", "Mart Minas", "Várias cidades · MG", false],
    ["SN", "Supernosso", "Várias cidades · MG", false],
    ["VM", "Verdemar", "Várias cidades · MG", false],
    ["AM", "Apoio Mineiro", "Várias cidades · MG", false],
    ["CA", "Carrefour", "MG · SP · RJ", false],
  ].flatMap(([sigla, nome, local, sel], i) => {
    const y = 138 + i * 78;
    const out = [card(16, y, W - 32, 68, { fill: sel ? C.green : C.white, name: `mercado ${nome}`, radius: 18 })];
    out.push(r({ name: `sigla ${nome}`, x: 30, y: y + 12, w: 44, h: 44, fill: sel ? C.white : C.green, fillOpacity: sel ? 0.2 : 0.1, radius: 13 }));
    out.push(t({ name: `sigla texto ${nome}`, x: 30, y: y + 27, w: 44, h: 16, text: sigla, size: 10, weight: 700, color: sel ? C.white : C.green, align: "CENTER" }));
    out.push(t({ name: `nome ${nome}`, x: 86, y: y + 14, w: 230, h: 18, text: nome, size: 12, weight: 600, color: sel ? C.white : C.ink }));
    out.push(t({ name: `local ${nome}`, x: 86, y: y + 34, w: 230, h: 14, text: local, size: 10, color: sel ? C.white : C.muted }));
    if (sel) out.push(t({ name: `sel ${nome}`, x: 86, y: y + 48, w: 90, h: 12, text: "SELECIONADO", size: 8, weight: 700, color: C.green }));
    return out;
  }),
  homeBar(),
], 880);

const carrinho = page("04 Carrinho", [
  r({ name: "fundo celebra", x: 0, y: 0, w: W, h: H, fill: C.green }),
  ...statusbar(false),
  r({ name: "fechar", x: 20, y: 44, w: 36, h: 36, fill: C.white, fillOpacity: 0.18, radius: 18 }),
  t({ name: "fechar x", x: 20, y: 51, w: 36, h: 20, text: "✕", size: 13, weight: 600, color: C.white, align: "CENTER" }),
  r({ name: "badge check", x: 163, y: 96, w: 64, h: 64, fill: C.white, radius: 32 }),
  t({ name: "check", x: 163, y: 108, w: 64, h: 40, text: "✓", size: 28, weight: 700, color: C.green, align: "CENTER" }),
  t({ name: "titulo", x: 40, y: 178, w: 310, h: 30, text: "Fechou o carrinho!", font: "Nunito", size: 24, weight: 700, color: C.white, align: "CENTER", ls: -1 }),
  t({ name: "sub", x: 40, y: 212, w: 310, h: 16, text: "Sua compra está calculada, sem sustos no caixa.", size: 10, color: C.white, align: "CENTER" }),
  card(16, 250, W - 32, 190, { name: "total card", radius: 24 }),
  t({ name: "total label", x: 36, y: 268, w: 200, h: 14, text: "total calculado", size: 10, color: C.muted }),
  t({ name: "total valor", x: 36, y: 284, w: 300, h: 40, text: "R$ 58,85", font: "Nunito", size: 34, weight: 700, ls: -1.5 }),
  t({ name: "total meta", x: 36, y: 328, w: 300, h: 14, text: "3 itens · BH Supermercados", size: 10, color: C.muted }),
  r({ name: "divisor", x: 36, y: 352, w: W - 72, h: 1, fill: C.line, fillOpacity: 0.1 }),
  r({ name: "badge economia", x: 36, y: 366, w: 150, h: 26, fill: C.green, fillOpacity: 0.12, radius: 13 }),
  t({ name: "economia texto", x: 36, y: 372, w: 150, h: 14, text: "economia R$ 141,15", size: 9, weight: 700, color: C.green, align: "CENTER" }),
  t({ name: "meta", x: 196, y: 372, w: 158, h: 14, text: "vs. meta de R$ 200,00", size: 9, color: C.muted, align: "RIGHT" }),
  t({ name: "resumo titulo", x: 20, y: 462, w: 300, h: 18, text: "resumo da compra", font: "Nunito", size: 13, weight: 700, color: C.white }),
  ...[
    ["Mercearia (2 itens)", "R$ 43,88"],
    ["Bebidas (1 item)", "R$ 14,97"],
  ].flatMap(([cat, val], i) => {
    const y = 492 + i * 52;
    return [
      r({ name: `resumo card ${i}`, x: 16, y, w: W - 32, h: 44, fill: C.white, fillOpacity: 0.14, radius: 14 }),
      t({ name: `resumo cat ${i}`, x: 32, y: y + 14, w: 220, h: 16, text: cat, size: 11, color: C.white }),
      t({ name: `resumo val ${i}`, x: 250, y: y + 12, w: 110, h: 18, text: val, font: "Nunito", size: 12, weight: 700, color: C.white, align: "RIGHT" }),
    ];
  }),
  r({ name: "botao finalizar", x: 16, y: 610, w: W - 32, h: 50, fill: C.orange, radius: 25 }),
  t({ name: "finalizar texto", x: 16, y: 625, w: W - 32, h: 18, text: "Finalizar", size: 13, weight: 700, color: C.white, align: "CENTER" }),
  ...bottomNav("Carrinho"),
  homeBar(),
]);

const comparador = page("05 Comparador", [
  ...statusbar(),
  ...backHeader("Comparador de preços"),
  card(16, 104, W - 32, 154, { name: "estado vazio", radius: 22 }),
  r({ name: "icone", x: 36, y: 124, w: 44, h: 44, fill: C.green, fillOpacity: 0.1, radius: 14 }),
  t({ name: "icone sinal", x: 36, y: 134, w: 44, h: 24, text: "↔", size: 16, weight: 600, color: C.green, align: "CENTER" }),
  t({ name: "estado titulo", x: 96, y: 124, w: 250, h: 18, text: "Faltam dados de mercado", size: 12, weight: 700 }),
  t({ name: "estado texto", x: 96, y: 146, w: 250, h: 60, text: "Selecione o mercado antes de escanear. Com duas ou mais redes, o comparador mostra o total de cada uma.", size: 10, lh: 15, color: C.muted }),
  r({ name: "estado botao", x: 96, y: 214, w: 130, h: 30, fill: C.green, radius: 15 }),
  t({ name: "estado botao texto", x: 96, y: 221, w: 130, h: 14, text: "Selecionar mercado", size: 9, weight: 600, color: C.white, align: "CENTER" }),
  ...sectionTitle(286, "resultado por rede", "2 redes"),
  ...[
    ["BH Supermercados", "3 itens", "R$ 58,85", true],
    ["Mart Minas", "1 item", "R$ 24,90", false],
  ].flatMap(([nome, qtd, val, melhor], i) => {
    const y = 316 + i * 88;
    const out = [card(16, y, W - 32, 76, { fill: melhor ? C.green : C.white, name: `comp ${nome}`, radius: 20 })];
    out.push(t({ name: `comp nome ${nome}`, x: 34, y: y + 16, w: 200, h: 18, text: nome, size: 12, weight: 700, color: melhor ? C.white : C.ink }));
    out.push(t({ name: `comp qtd ${nome}`, x: 34, y: y + 38, w: 200, h: 14, text: qtd, size: 10, color: melhor ? C.white : C.muted }));
    out.push(t({ name: `comp valor ${nome}`, x: 240, y: y + 26, w: 118, h: 20, text: val, font: "Nunito", size: 15, weight: 700, color: melhor ? C.white : C.orange, align: "RIGHT" }));
    if (melhor) out.push(t({ name: `comp best ${nome}`, x: 240, y: y + 48, w: 118, h: 12, text: "MENOR TOTAL", size: 8, weight: 700, color: C.white, align: "RIGHT" }));
    return out;
  }),
  t({ name: "nota", x: 20, y: 506, w: 350, h: 32, text: "Comparação feita apenas com os itens que você escaneou em cada rede.", size: 9, lh: 14, color: C.muted }),
  ...bottomNav("Início"),
  homeBar(),
]);

const listas = page("06 Listas", [
  ...statusbar(),
  ...backHeader("Minhas listas", "cada lista tem seu próprio total"),
  r({ name: "nova lista", x: 16, y: 108, w: W - 32, h: 46, fill: C.green, radius: 23 }),
  t({ name: "nova lista texto", x: 16, y: 122, w: W - 32, h: 18, text: "+  Criar nova lista", size: 12, weight: 700, color: C.white, align: "CENTER" }),
  ...[
    ["Compras da semana", "5 itens · R$ 132,40", true],
    ["Churrasco sábado", "8 itens · R$ 214,80", false],
    ["Casa — limpeza", "3 itens · R$ 47,20", false],
  ].flatMap(([nome, info, ativa], i) => {
    const y = 176 + i * 80;
    const out = [card(16, y, W - 32, 68, { fill: ativa ? C.green : C.white, name: `lista ${nome}`, radius: 18 })];
    out.push(t({ name: `lista nome ${nome}`, x: 34, y: y + 16, w: 240, h: 18, text: nome, size: 12, weight: 700, color: ativa ? C.white : C.ink }));
    out.push(t({ name: `lista info ${nome}`, x: 34, y: y + 36, w: 240, h: 14, text: info, size: 10, color: ativa ? C.white : C.muted }));
    if (ativa) out.push(t({ name: `lista badge ${nome}`, x: 34, y: y + 50, w: 90, h: 10, text: "ATIVA", size: 8, weight: 700, color: C.white }));
    out.push(r({ name: `lista radio ${nome}`, x: 330, y: y + 22, w: 24, h: 24, fill: ativa ? C.white : C.line, fillOpacity: ativa ? 1 : 0.12, radius: 12 }));
    return out;
  }),
  t({ name: "dica", x: 20, y: 428, w: 350, h: 32, text: "A lista ativa é a que recebe os novos itens escaneados.", size: 9, lh: 14, color: C.muted }),
  ...bottomNav("Listas"),
  homeBar(),
]);

const perfil = page("07 Perfil", [
  ...statusbar(),
  ...backHeader("Perfil"),
  card(16, 100, W - 32, 96, { name: "avatar card", radius: 22 }),
  r({ name: "avatar", x: 34, y: 118, w: 60, h: 60, fill: C.green, radius: 30 }),
  t({ name: "avatar letra", x: 34, y: 134, w: 60, h: 26, text: "C", size: 22, weight: 700, color: C.white, align: "CENTER" }),
  t({ name: "nome", x: 108, y: 124, w: 220, h: 20, text: "Convidado", size: 14, weight: 700 }),
  t({ name: "conta", x: 108, y: 146, w: 240, h: 16, text: "Sem conta conectada · modo offline", size: 9, color: C.muted }),
  card(16, 210, W - 32, 132, { fill: C.green, name: "stats", radius: 22, stroke: C.green }),
  t({ name: "stats label", x: 36, y: 228, w: 200, h: 14, text: "total registrado", size: 10, color: C.white }),
  t({ name: "stats valor", x: 36, y: 246, w: 240, h: 34, text: "R$ 394,40", font: "Nunito", size: 26, weight: 700, color: C.white, ls: -1 }),
  t({ name: "stat 1", x: 36, y: 292, w: 60, h: 20, text: "16", font: "Nunito", size: 16, weight: 700, color: C.white }),
  t({ name: "stat 1 label", x: 36, y: 314, w: 90, h: 12, text: "itens na lista", size: 9, color: C.white }),
  t({ name: "stat 2", x: 140, y: 292, w: 60, h: 20, text: "3", font: "Nunito", size: 16, weight: 700, color: C.white }),
  t({ name: "stat 2 label", x: 140, y: 314, w: 90, h: 12, text: "listas criadas", size: 9, color: C.white }),
  ...sectionTitle(366, "configurações e dados"),
  ...[
    ["Mercados favoritos", "Redes salvas e mercado principal"],
    ["Histórico de compras", "Recibos e totais anteriores"],
    ["Sincronização familiar", "Compartilhar listas por código"],
    ["Preferências & offline", "Armazenamento local e dados"],
  ].flatMap(([nome, sub], i) => {
    const y = 396 + i * 66;
    const out = [card(16, y, W - 32, 58, { name: `menu ${nome}`, radius: 16 })];
    out.push(r({ name: `menu icone ${nome}`, x: 30, y: y + 14, w: 30, h: 30, fill: C.green, fillOpacity: 0.12, radius: 9 }));
    out.push(t({ name: `menu nome ${nome}`, x: 72, y: y + 13, w: 240, h: 16, text: nome, size: 11, weight: 600 }));
    out.push(t({ name: `menu sub ${nome}`, x: 72, y: y + 31, w: 240, h: 14, text: sub, size: 9, color: C.muted }));
    out.push(t({ name: `menu seta ${nome}`, x: 340, y: y + 20, w: 20, h: 16, text: "›", size: 12, color: C.muted, align: "CENTER" }));
    return out;
  }),
  ...bottomNav("Perfil"),
  homeBar(),
], 900);

const manual = page("08 Adicionar manual", [
  ...statusbar(),
  ...backHeader("Adicionar item", "sem escanear a etiqueta"),
  t({ name: "label nome", x: 20, y: 110, w: 200, h: 14, text: "Nome do item", size: 10, color: C.muted }),
  r({ name: "campo nome", x: 16, y: 128, w: W - 32, h: 46, fill: C.white, radius: 14, stroke: C.line, strokeOpacity: 0.2 }),
  t({ name: "campo nome valor", x: 32, y: 142, w: 300, h: 18, text: "Arroz branco 5kg", size: 13 }),
  t({ name: "label preco", x: 20, y: 190, w: 200, h: 14, text: "Preço unitário (R$)", size: 10, color: C.muted }),
  r({ name: "campo preco", x: 16, y: 208, w: W - 32, h: 46, fill: C.white, radius: 14, stroke: C.line, strokeOpacity: 0.2 }),
  t({ name: "campo preco valor", x: 32, y: 222, w: 300, h: 18, text: "28,90", size: 13 }),
  t({ name: "label cat", x: 20, y: 270, w: 200, h: 14, text: "Categoria", size: 10, color: C.muted }),
  ...[
    ["MERCEARIA", true],
    ["LATICÍNIOS", false],
    ["BEBIDAS", false],
    ["HORTIFRUTI", false],
    ["LIMPEZA", false],
  ].flatMap(([cat, sel], i) => {
    const y = 290 + i * 46;
    const out = [card(16, y, W - 32, 38, { fill: sel ? C.green : C.white, name: `cat ${cat}`, radius: 12, strokeOpacity: 0.1 })];
    out.push(t({ name: `cat texto ${cat}`, x: 32, y: y + 11, w: 300, h: 16, text: cat, size: 10, weight: sel ? 700 : 500, color: sel ? C.white : C.ink }));
    return out;
  }),
  r({ name: "botao salvar", x: 16, y: 536, w: W - 32, h: 50, fill: C.green, radius: 25 }),
  t({ name: "salvar texto", x: 16, y: 551, w: W - 32, h: 18, text: "Adicionar à lista", size: 13, weight: 700, color: C.white, align: "CENTER" }),
  homeBar(),
]);

const recibo = page("09 Recibo", [
  ...statusbar(),
  ...backHeader("Recibo digital"),
  card(16, 104, W - 32, 470, { name: "cupom", radius: 22 }),
  t({ name: "marca recibo", x: 40, y: 128, w: 260, h: 22, text: "Fechou o Carrinho", font: "Nunito", size: 17, weight: 700, color: C.green }),
  t({ name: "mercado recibo", x: 40, y: 152, w: 300, h: 14, text: "BH Supermercados · 31/10/2026 às 09:41", size: 9, color: C.muted }),
  t({ name: "offline recibo", x: 40, y: 168, w: 300, h: 12, text: "Cupom digital gerado offline", size: 8, color: C.muted }),
  r({ name: "div 1", x: 40, y: 192, w: W - 80, h: 1, fill: C.line, fillOpacity: 0.12 }),
  ...[
    ["Arroz branco 5kg", "R$ 28,90"],
    ["Feijão carioca 1kg", "R$ 14,98"],
    ["Leite integral 1L", "R$ 14,97"],
  ].flatMap(([nome, val], i) => {
    const y = 210 + i * 30;
    return [
      t({ name: `recibo item ${i}`, x: 40, y, w: 240, h: 16, text: nome, size: 11 }),
      t({ name: `recibo val ${i}`, x: 250, y, w: 110, h: 16, text: val, size: 11, weight: 600, align: "RIGHT" }),
    ];
  }),
  r({ name: "div 2", x: 40, y: 316, w: W - 80, h: 1, fill: C.line, fillOpacity: 0.12 }),
  t({ name: "total label", x: 40, y: 336, w: 160, h: 20, text: "TOTAL FINAL", size: 11, weight: 700 }),
  t({ name: "total valor", x: 220, y: 328, w: 140, h: 28, text: "R$ 58,85", font: "Nunito", size: 20, weight: 700, color: C.orange, align: "RIGHT" }),
  r({ name: "share", x: 40, y: 468, w: W - 80, h: 48, fill: "#25D366", radius: 24 }),
  t({ name: "share texto", x: 40, y: 482, w: W - 80, h: 18, text: "Compartilhar no WhatsApp", size: 12, weight: 700, color: C.white, align: "CENTER" }),
  homeBar(),
]);

const splash = page("10 Splash", [
  r({ name: "fundo", x: 0, y: 0, w: W, h: H, fill: C.cream }),
  r({ name: "logo", x: 159, y: 260, w: 72, h: 72, fill: C.green, radius: 22 }),
  t({ name: "logo check", x: 159, y: 276, w: 72, h: 40, text: "✓", size: 30, weight: 700, color: C.white, align: "CENTER" }),
  t({ name: "marca", x: 40, y: 356, w: 310, h: 30, text: "fechou o carrinho", font: "Nunito", size: 24, weight: 700, align: "CENTER", ls: -0.8 }),
  t({ name: "tagline", x: 50, y: 400, w: 290, h: 44, text: "Levou. Somou. Fechou.\nSeu total sem sustos no caixa do supermercado.", size: 11, lh: 17, color: C.muted, align: "CENTER" }),
  r({ name: "botao", x: 24, y: 700, w: W - 48, h: 50, fill: C.green, radius: 25 }),
  t({ name: "botao texto", x: 24, y: 715, w: W - 48, h: 18, text: "Começar agora (100% offline)", size: 12, weight: 700, color: C.white, align: "CENTER" }),
  homeBar(),
]);

const auth = page("11 Auth", [
  r({ name: "fundo", x: 0, y: 0, w: W, h: H, fill: C.cream }),
  r({ name: "logo", x: 159, y: 72, w: 72, h: 72, fill: C.green, radius: 22 }),
  t({ name: "logo check", x: 159, y: 88, w: 72, h: 40, text: "🔒", size: 26, color: C.white, align: "CENTER" }),
  t({ name: "titulo", x: 40, y: 168, w: 310, h: 26, text: "Criar conta (opcional)", font: "Nunito", size: 20, weight: 700, align: "CENTER", ls: -0.6 }),
  t({ name: "sub", x: 40, y: 200, w: 310, h: 40, text: "Sincronize com a família e salve suas listas na nuvem. Ou use 100% offline.", size: 10, lh: 15, color: C.muted, align: "CENTER" }),
  card(24, 266, W - 48, 48, { name: "google", radius: 14 }),
  t({ name: "google texto", x: 24, y: 280, w: W - 48, h: 18, text: "Continuar com Google", size: 12, weight: 600, align: "CENTER" }),
  r({ name: "div linha", x: 40, y: 340, w: W - 80, h: 1, fill: C.line, fillOpacity: 0.12 }),
  t({ name: "div texto", x: 150, y: 330, w: 90, h: 20, text: "ou e-mail", size: 9, color: C.muted, align: "CENTER" }),
  r({ name: "campo email", x: 24, y: 372, w: W - 48, h: 46, fill: C.white, radius: 14, stroke: C.line, strokeOpacity: 0.2 }),
  t({ name: "campo email ph", x: 40, y: 386, w: 300, h: 18, text: "seu@email.com", size: 12, color: C.muted }),
  r({ name: "campo senha", x: 24, y: 430, w: W - 48, h: 46, fill: C.white, radius: 14, stroke: C.line, strokeOpacity: 0.2 }),
  t({ name: "campo senha ph", x: 40, y: 444, w: 300, h: 18, text: "••••••••", size: 12, color: C.muted }),
  r({ name: "botao criar", x: 24, y: 496, w: W - 48, h: 48, fill: C.green, radius: 24 }),
  t({ name: "botao criar texto", x: 24, y: 510, w: W - 48, h: 18, text: "Criar conta", size: 12, weight: 700, color: C.white, align: "CENTER" }),
  t({ name: "offline", x: 24, y: 566, w: W - 48, h: 20, text: "Continuar sem conta", size: 11, weight: 600, color: C.green, align: "CENTER" }),
  homeBar(),
]);

const sync = page("12 Sincronização", [
  ...statusbar(),
  ...backHeader("Sincronização familiar"),
  card(16, 100, W - 32, 150, { fill: C.green, name: "family card", radius: 22, stroke: C.green }),
  t({ name: "family titulo", x: 36, y: 120, w: 300, h: 20, text: "Compartilhe a lista", font: "Nunito", size: 15, weight: 700, color: C.white }),
  t({ name: "family texto", x: 36, y: 142, w: 300, h: 30, text: "Quem tiver o código vê e edita a lista em sincronia.", size: 9, lh: 14, color: C.white }),
  r({ name: "codigo caixa", x: 36, y: 180, w: W - 130, h: 46, fill: C.white, fillOpacity: 0.18, radius: 14 }),
  t({ name: "codigo", x: 36, y: 194, w: W - 130, h: 20, text: "······", size: 16, weight: 700, color: C.white, align: "CENTER", ls: 4 }),
  r({ name: "copiar", x: 292, y: 180, w: 66, h: 46, fill: C.white, radius: 14 }),
  t({ name: "copiar texto", x: 292, y: 194, w: 66, h: 18, text: "Copiar", size: 9, weight: 700, color: C.green, align: "CENTER" }),
  card(16, 270, W - 32, 78, { name: "status card", radius: 18 }),
  t({ name: "status titulo", x: 34, y: 286, w: 200, h: 18, text: "Sincronização", size: 12, weight: 600 }),
  t({ name: "status sub", x: 34, y: 306, w: 240, h: 14, text: "Ainda não ativa nesta versão", size: 9, color: C.muted }),
  r({ name: "switch", x: 320, y: 296, w: 44, h: 24, fill: C.line, fillOpacity: 0.15, radius: 12 }),
  e({ name: "switch bolinha", x: 322, y: 298, w: 20, h: 20, fill: C.white }),
  t({ name: "aviso", x: 20, y: 372, w: 350, h: 46, text: "Enquanto isso, suas listas ficam salvas neste aparelho e continuam funcionando offline.", size: 10, lh: 15, color: C.muted }),
  r({ name: "desconectar", x: 16, y: 440, w: W - 32, h: 46, fill: C.white, radius: 23, stroke: C.line, strokeOpacity: 0.2 }),
  t({ name: "desconectar texto", x: 16, y: 453, w: W - 32, h: 18, text: "Voltar ao modo offline", size: 11, weight: 600, color: C.muted, align: "CENTER" }),
  homeBar(),
]);

const doc = {
  name: "Fechou o Carrinho — app (12 telas)",
  lastModified: new Date().toISOString(),
  thumbnailUrl: "",
  version: "1",
  role: "owner",
  editorType: "figma",
  document: {
    id: "0:0",
    name: "Document",
    type: "DOCUMENT",
    children: [home, camera, mercado, carrinho, comparador, listas, perfil, manual, recibo, splash, auth, sync],
  },
  components: {},
  componentSets: {},
  styles: {},
  schemaVersion: 0,
};

const out = path.join(__dirname, "app-screens.json");
fs.writeFileSync(out, JSON.stringify(doc, null, 2), "utf8");
console.log("ok", out, "nodes:", n);
