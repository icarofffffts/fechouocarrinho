# Guia de Peças Promocionais — fechou o carrinho

> Documento mantido por **Aura (Marketing & Promo Banners)**. Complementa `materiais/04-marca/brand/brand-tokens.json`, a nota `Guia-Identidade-Visual` e a seção **05 — Banners e campanhas** de `landing-page-repo/src/app/pages/BrandIdentityPage.tsx`.

## 1. Objetivo

Padronizar a criação, adaptação e publicação de peças promocionais de **aquisição** do app *fechou o carrinho* para redes sociais, mídia paga e canais digitais. Toda peça deve reforçar o mesmo posicionamento: **controle do total da compra, em tempo real, mesmo sem internet**.

Princípios:
- Nome sempre em minúsculas: *fechou o carrinho*.
- Sem emojis, termos técnicos, badges "BETA" ou "Feito para Minas Gerais".
- Uma mensagem por peça: um benefício dominante, um CTA único.
- Consistência visual com a identidade: verde marca, laranja acento, creme, grafite.

## 2. Inventário de peças de campanha

| Peça | Formato | Fundo | Headline principal | CTA | Uso ideal |
|---|---|---|---|---|---|
| Campanha horizontal | 1200 × 628 | Verde marca `#1B8C42` | "Seu total sem sustos." | Baixar APK | Feed Facebook/Instagram, Google Display, LinkedIn |
| Post quadrado (offline) | 1080 × 1080 | Laranja acento `#FF6B00` | "O mercado pode ficar sem sinal. Sua lista, não." | Baixar o app | Instagram/Facebook feed, carrossel capa |
| Post de produto | 1080 × 1080 | Grafite `#111827` | "Aponte. Capture. Some." | Baixar APK | Demonstração de funcionalidade, Reels cover |
| Story vertical | 1080 × 1920 | Creme `#F0E4D3` | "Você compra. A lista faz as contas." | Baixar APK (link sticker) | Instagram/Facebook Stories, Reels |
| Campanha de planos | 1200 × 628 | Grafite `#111827` | "Um plano para cada carrinho." | Conhecer os planos | Retenção/upsell, e-mail, blog |
| Aviso promocional | 1080 × 1080 | Verde marca `#1B8C42` | "Promoção boa é promoção que entra na lista." | Ativar avisos | Reengajamento, push in-app amplificado |
| Banner de lançamento | 1080 × 1080 | Creme `#FFF8F0` | "Comece grátis. Continue no controle." | Baixar o app | Lançamento, Product Hunt, grupos |
| Banner compacto | 1200 × 300 | Creme `#FFF8F0` | "Mais calma no caixa." | Baixar APK | Topo de site, e-mail header, display |
| Download / QR | 1080 × 1920 (ou 1200 × 628) | Branco `#FFFFFF` | "Leve o total com você." | QR code + link | Eventos, impressos, ponto de venda |

## 3. Proporções recomendadas

| Formato | Dimensões (px) | Proporção | Canal principal | Observações |
|---|---|---|---|---|
| Post quadrado | 1080 × 1080 | 1:1 | Instagram/Facebook feed | Seguro para todos os feeds; texto centralizado |
| Story / Reels | 1080 × 1920 | 9:16 | Stories, Reels, TikTok | Manter headline no terço superior; CTA no terço inferior |
| Banner horizontal | 1200 × 628 | ~1.91:1 | Facebook/LinkedIn ads, Google Display | Formato padrão de link preview |
| Banner compacto | 1200 × 300 | 4:1 | Header de site, e-mail | Texto curto; sem detalhes finos |
| Feature graphic | 1024 × 500 | ~2.05:1 | Google Play Store | Sem texto crítico nas bordas |
| Screenshot loja | 1080 × 2400 | 9:20 | Google Play Store | Moldura de celular + copy no topo |

### Safe areas e margens
- **Margem mínima:** 8% da menor dimensão (ex.: 86 px em 1080).
- **Zona de texto:** centralizada, nunca encostar em bordas ou no notch (Stories).
- **Logo:** sempre visível, preferencialmente no canto superior esquerdo ou centralizado no topo.
- **Padrão de logo (LogoPattern):** opacidade 0,065, rotação -7°, apenas em fundos sólidos; omitir em fundos com foto.
- **CTA:** botão pill (border-radius completo), cor de contraste, min. 44 px de altura tocável.

## 4. Paleta para peças de aquisição

| Token | Hex | RGB | Uso em peças de aquisição |
|---|---|---|---|
| Verde marca (primary) | `#1B8C42` | 27, 140, 66 | Fundo principal de campanha de aquisição; transmite confiança e "dinheiro sob controle" |
| Verde escuro (primaryDark) | `#146B32` | 20, 107, 50 | Gradientes, sombras, hover |
| Laranja acento (accent) | `#FF6B00` | 255, 107, 0 | CTAs, badges de preço, destaques de ação; alto contraste |
| Creme (surface) | `#FFF8F0` | 255, 248, 240 | Fundos leves, cards, Story |
| Grafite (ink) | `#111827` | 17, 24, 39 | Fundos escuros, texto principal, contraste máximo |
| Muted | `#6B7280` | 107, 114, 128 | Texto secundário em fundos claros |

### Regras de contraste
- Texto branco apenas sobre verde, laranja ou grafite (nunca sobre creme).
- Texto grafite sobre creme e branco.
- Laranja nunca como fundo de texto longo (apenas headlines curtas e badges).
- Sempre validar contraste mínimo AA (4,5:1 para corpo, 3:1 para display grande).

### Combinações aprovadas (fundo → texto → CTA)
- Verde → branco → laranja (CTA pill)
- Laranja → branco → grafite (CTA pill branco)
- Grafite → branco → laranja (CTA pill)
- Creme → grafite → verde (CTA pill)

## 5. Tipografia

| Papel | Fonte | Peso | Tracking | Uso |
|---|---|---|---|---|
| Display / Headline | Nunito | 800 | -0,04em a -0,06em | Headlines, valores monetários |
| Corpo / UI | Inter | 400/500/600 | padrão | Subtítulos, descrições, listas |
| Etiquetas / Metadados | Mono | 600/700 | 0,12em a 0,16em, uppercase | Tags, regras de campanha, rodapés |

### Hierarquia sugerida (1080 × 1080)
- Headline: 56–72 px Nunito 800
- Subtítulo: 20–24 px Inter 400
- Tag/mono: 10–12 px uppercase
- CTA: 14–16 px Inter 600

## 6. Composição e layout

- **Logo:** usar `PromoWordmark` (ícone + "fechou o carrinho") no topo; em fundos escuros usar versão inversa (branco).
- **Tag de campanha (CampaignRule):** mono uppercase, cor atenuada; posicionada acima da headline (ex.: "Compra mais leve", "Preço por preço").
- **Valores monetários:** sempre em Nunito 800, com "R$" no mesmo peso; usar valores realistas (R$ 7,89; R$ 53,28; R$ 147,82).
- **Elementos de prova:** card de etiqueta, total em tempo real, contador de itens — reforçam credibilidade.
- **Ícones:** Lucide, stroke 1.8; WifiOff, ScanLine, Bell, Sparkles, Check, Camera.
- **Sombras:** `shadow-[14px_12px_0_rgba(17,24,39,.18)]` para cards flutuantes; evitar sombras genéricas.

## 7. Diretrizes de copy persuasivo (redes sociais)

### Tom de voz
- **Próximo, calmo e direto.** Falar como quem resolve um problema real do dia a dia.
- **Benefício antes de recurso.** "Saiba quanto vai pagar" antes de "leitor de etiqueta".
- **Sem jargão técnico.** Nunca mencionar ML Kit, OCR, Kotlin, Flutter, APK size.
- **Sem promessas não comprováveis.** "Funciona sem internet" (verdadeiro, offline-first) é ok; "economize 30%" não é.

### Estrutura de legenda (Instagram/Facebook)
1. **Gancho (1 linha):** pergunta ou dor reconhecível.
2. **Benefício (2–3 linhas):** o que o app resolve.
3. **Prova (1 linha):** dado concreto ou funcionalidade.
4. **CTA (1 linha):** ação clara + link.
5. **Hashtags (3–6):** relevantes, sem spam.

### CTAs padrão
- "Baixar APK" (primário, aquisição)
- "Baixar o app" (alternativo)
- "Ver como funciona" (educativo)
- "Ativar avisos" (reengajamento)
- "Conhecer os planos" (upsell)

### Hashtags sugeridas
`#fechouocarrinho` `#listadecompras` `#supermercado` `#comprasinteligentes` `#controlefinanceiro` `#dicasdesupermercado`

### Regras de copy
- Headline ≤ 8 palavras quando possível.
- Usar ponto final em headlines curtas (estilo editorial).
- Evitar "fechado" como adjetivo solto; "fechou o carrinho" é o nome, não status.
- Valores monetários com vírgula decimal e "R$".
- Preferir segunda pessoa ("você") e verbos no imperativo para CTAs.
- Não usar emojis em peças de produto; permitido apenas em anúncios de redes sociais se a plataforma exigir (preferir ícones vetoriais).

## 8. Matriz de copy por peça (redes sociais)

| Peça | Gancho (legenda) | CTA na legenda |
|---|---|---|
| Seu total sem sustos | "Quantas vezes você chegou ao caixa e levou um susto? Registre cada preço enquanto compra e veja o total antes de pagar." | "Baixe grátis: [link]" |
| Funciona sem internet | "O mercado tem sinal fraco? Sem problema. Sua lista funciona 100% offline." | "Baixe o app: [link]" |
| Aponte. Capture. Some. | "Aponte a câmera para a etiqueta, capture o preço e some no carrinho. Sem digitar nada." | "Experimente: [link]" |
| Você compra. A lista faz as contas. | "Você compra, a lista faz as contas. Controle total da compra em tempo real." | "Baixe grátis: [link]" |
| Um plano para cada carrinho | "Comece grátis com o Essencial. Compartilhe a lista com a família em breve." | "Conheça os planos: [link]" |
| Promoção boa é promoção que entra na lista | "Ative os avisos e organize a próxima compra com mais calma." | "Ativar avisos: [link]" |
| Comece grátis. Continue no controle. | "Lista, câmera e total da compra em um só lugar. Comece grátis hoje." | "Baixar o app: [link]" |
| Mais calma no caixa | "Registre os preços. Acompanhe o total. Chegue ao caixa sem surpresa." | "Baixar APK: [link]" |

## 9. Naming de arquivos

Padrão: `banner-{formato}-{slug-headline}-{W}x{H}.{ext}`

Exemplos:
- `banner-horizontal-seu-total-sem-sustos-1200x628.svg`
- `banner-square-funciona-sem-internet-1080x1080.svg`
- `banner-square-aponte-capture-some-1080x1080.svg`
- `banner-story-voce-compra-lista-faz-contas-1080x1920.svg`

Localização: `materiais/04-marca/banners-promo/` (origem) e espelho em `landing-page-repo/public/design-assets/`.

## 10. Checklist de produção

- [ ] Dimensões exatas do formato escolhido
- [ ] Paleta aprovada (ver seção 4)
- [ ] Contraste AA validado
- [ ] Logo visível e legível
- [ ] Headline ≤ 8 palavras
- [ ] Um único CTA claro
- [ ] Sem emojis, termos técnicos ou badges proibidos
- [ ] Safe area respeitada (margem ≥ 8%)
- [ ] Valores monetários realistas
- [ ] Arquivo nomeado conforme padrão (seção 9)
- [ ] Espelho copiado para `public/design-assets/`
- [ ] Entrada atualizada em `Roadmap-Assets-Design` (nota Maestri)
