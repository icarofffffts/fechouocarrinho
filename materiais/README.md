# Materiais do Fechou o Carrinho

Tudo o que foi criado para divulgar o app, separado por uso. As telas são as do app de verdade, com dados de exemplo.

| Pasta | O que tem |
|---|---|
| `01-play-store/` | Ficha da loja (`LISTING.md`), ícone 512, gráfico de destaque e 5 capturas 9:16 |
| `02-anuncios/` | Vídeos de divulgação. Hoje: o spot vertical de 15 s, gerado por `motion/` (veja o README da pasta) |
| `03-telas/` | As 12 telas do app em PNG, com os arquivos de origem do FigCraft |
| `04-marca/` | Logos, ícones, tokens, mockups SVG, banners e guia da marca |
| `05-site/` | Layout das 6 páginas internas do site, com os arquivos de origem do FigCraft |

O código dos projetos continua na raiz: `fechouocarrinho-android/` (app), `fechouocarrinho-next/` (site atual),
`motion/` (vídeos), `backend/` e os sites antigos `landing-page-repo/`, `landing-vite/` e `fechouocarrinho/`.

O visual e o tom estão resumidos em [`DESIGN.md`](../DESIGN.md). O guia completo fica em `04-marca/brand/BRAND-GUIDELINES.md`.

## Como gerar de novo

| O que | Comando |
|---|---|
| Capturas da Play Store | `node scripts/build-store-screenshots.cjs` |
| Ícones e favicons | `node scripts/generate-favicons.js` |
| Mockups e ativos da marca | `node scripts/generate-assets.js` |
| Visualizador dos mockups (porta 3333) | `node scripts/serve-mockups.js` |
| Vídeo do spot | `cd motion && npm run prep && npm run render:spot` |
| Vídeo do spot com narração | `cd motion && npm run render:spot:vo` |

## Ainda não existe

Estas frentes do Nexuro não têm equivalente aqui. Cada uma só vira pasta quando houver material real:
carrosséis e calendário de redes sociais, cortes de anúncio de 6/7/10 s em 16:9, e e-mails e apresentação de venda.
