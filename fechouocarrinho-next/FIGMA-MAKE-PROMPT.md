# Figma Make — Prompt oficial da landing "Fechou o Carrinho"

> Colar este prompt no Figma Make para gerar/refinar as 4 telas da landing.
> A implementação Next.js de referência está em `fechouocarrinho-next/src/app/`.

---

## Prompt (pt-BR, pronto para colar)

Crie a landing page mobile-first do app "Fechou o Carrinho" — app Android que lê
etiquetas de preço com a câmera e soma o total do carrinho em tempo real, mesmo
sem internet. Público: donas de casa e trabalhadores que fazem compra mensal no
supermercado. Tom: simples, acolhedor, zero jargão técnico.

### Identidade (OBRIGATÓRIO — não alterar)
- Cores: verde `#1B8C42` (primária/CTAs), laranja `#FF6B00` (destaques/bordas de
  foco), creme `#FFF8F0` (fundo), grafite `#111827` (texto/botões escuros).
- Fontes: Nunito ExtraBold para títulos e números de preço; Inter para corpo.
- PROIBIDO emojis em qualquer lugar. Use apenas vetores estilo Lucide
  (traço 1.8–2.5, round caps): check, câmera, mapa-pin, olho, zap, usuário,
  download, seta-direita, chevron-down.
- Logo: quadrado arredondado verde `#1B8C42` com check branco + texto
  "fechou o carrinho" em Nunito ExtraBold.
- Favicon: mesmo check verde em `.ico` + `icon.svg` (já existem em `src/app/`).

### As 4 páginas (rotas Next.js existentes — preservar)
1. **Home (`/`)** — Hero: badge "Funciona sem internet • Leve para qualquer
   celular", H1 "Seu total sem sustos no caixa." (sustos em verde), subtítulo
   sobre apontar a câmera, CTAs "Baixar APK" (verde) + "Ver como funciona"
   (branco com borda), microcopy "Android 8 ou superior • Instalação em poucos
   segundos • Como instalar?", 3 mini-cards (Rápido e leve / Sem internet no
   mercado / Feito para o dia a dia) + **phone mockup PRESERVADO**: celular
   escuro arredondado com tela "Meu Carrinho", badge "MG • EPA", foto de
   prateleira, cartão "MIRE NA ETIQUETA" com moldura tracejada laranja e preço
   "R$ 7,89", botão "Capturar", lista de itens e barra de TOTAL verde
   "R$ 53,28", selo flutuante "VOCÊ ECONOMIZA R$ 34,00 neste mês". Seções:
   Como funciona (3 cards), Onde você compra (grid de 7 mercados MG com
   abreviações coloridas + select de estado + botão "Sugerir supermercado"),
   Benefícios (3 linhas com ícones), Baixar (botão APK + passos 1 Baixar /
   2 Permitir / 3 Instalar + **QR code que DEVE apontar exatamente para
   `https://fechouocarrinho.site/downloads/fechouocarrinho.apk`** + nota
   "O QR leva para o mesmo arquivo do botão"), footer com
   `contato@fechouocarrinho.site` e © 2026.
2. **Como funciona (`/como-funciona`)** — 3 seções com âncoras `#mercado`,
   `#camera`, `#total`, cada uma com ícone, bullets e CTA final escuro
   "Pronto para testar? Baixar APK".
3. **Supermercados (`/supermercados`)** — select de estado, grid dos 7 mercados
   (EPA, Mart Minas, BH, Supernosso, Verdemar, Carrefour, Apoio Mineiro),
   botão "Preços em breve" desabilitado, modal `<dialog>` "Sugerir
   supermercado" (nome + cidade/estado, Enviar/Cancelar).
4. **Ajuda (`/ajuda`)** — 4 `<details>` (instalar APK / internet / corrigir
   preço / mercado ausente) + card de contato por e-mail.

### Layout e QA
- Mobile-first 390×844 sem scroll horizontal; header sticky com blur;
  CTA "Baixar" compacto no mobile; grid vira 1 coluna no mobile.
- APK sempre via link relativo `/downloads/fechouocarrinho.apk`; QR sempre via
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://fechouocarrinho.site/downloads/fechouocarrinho.apk`.
- Critério de aceite: `npm run build` passa, CSS final > 25 KB com utilities,
  0 erros de console, 0 refs a IP/porta no HTML, screenshots 390×844 das
  4 páginas sem overflow.

---

## Status da implementação (17/10/2026 — Design/QA)
- [x] 4 páginas implementadas conforme acima; phone mockup preservado; QR correto
- [x] `src/app/favicon.ico` substituído por check verde custom (64px, 373 bytes)
- [x] `src/app/icon.svg` = check verde (244 bytes)
- [x] Build passa; CSS 33,4 KB com utilities (era 10 KB quebrado)
- [x] QA 390×844 (live + local): 8/8 páginas 200, sem overflow, sem erros,
      evidências em `qa-shots/` + `qa-shots/qa-report.json`
