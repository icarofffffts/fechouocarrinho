# Play Store Spec — fechou o carrinho

> **Documento de referência para assets da Google Play Store e in-app.**
> Owner: Canvas (App Store & In-App Assets). Versão: 1.0 · Data: 2026-10-17.
> Escopo: dimensões, safe zones, requisitos da Play Store, análise dos assets gerados e estratégia visual de conversão.

---

## 1. Contexto

- **App:** Fechou o Carrinho (`com.fechouocarrinho.app`)
- **Categoria sugerida:** Finanças / Compras
- **Proposta de valor:** Registre cada etiqueta de preço com a câmera e acompanhe o total da compra em tempo real — funciona 100% offline, sem cadastro.
- **Slogan principal:** *Levou. Somou. Fechou.*
- **Público-alvo:** compradores de supermercado que querem controle de gasto no carrinho, em especial em ambientes com sinal fraco (subsolo/estacionamento).

Tokens de marca aplicados (ver `design-system/brand/brand-tokens.json`):

| Token | Hex | Uso |
|---|---|---|
| Verde marca | `#1B8C42` | Primary, fundos, CTAs principais |
| Verde escuro | `#146B32` | Gradientes, hover, sombras |
| Laranja acento | `#FF6B00` | Destaque, CTA de captura, badge "EM BREVE" |
| Creme superfície | `#FFF8F0` | Fundo de tela do mockup |
| Grafite tinta | `#111827` | Texto, bezel do dispositivo |
| Cinza muted | `#6B7280` | Texto secundário |
| Branco | `#FFFFFF` | Texto sobre fundos escuros |

Tipografia: **Nunito 800** (display/títulos) · **Inter 400/500/600** (corpo/UI) · **monospace uppercase** (etiquetas/metadados).

---

## 2. Matriz de formatos (Google Play Store)

| Asset | Dimensão | Proporção | Formato | Obrigatório | Observação |
|---|---|---|---|---|---|
| Ícone do app | 512 × 512 px | 1:1 | PNG 32-bit | Sim | Full-bleed quadrado; a Play Store aplica a máscara de arredondamento. Sem alpha recomendado para listing. |
| Feature graphic | 1024 × 500 px | ~2.05:1 | PNG ou JPEG | Sim (para ser destacado) | Sem transparência. Peso recomendado < 1 MB. |
| Screenshot phone | 1080 × 2400 px | 9:16 | PNG ou JPEG | Sim (mín. 2, máx. 8) | Lado longo entre 320 e 3840 px; proporção entre 16:9 e 9:16. |
| Screenshot phone (landscape) | 2400 × 1080 px | 16:9 | PNG ou JPEG | Opcional | Mesmo conjunto, rotacionado. |
| Screenshot tablet 7" | 1024 × 600+ px | 16:9 / 9:16 | PNG ou JPEG | Opcional | Recomendado se houver layout tablet. |
| Screenshot tablet 10" | 1280 × 800+ px | 16:9 / 9:16 | PNG ou JPEG | Opcional | Recomendado se houver layout tablet. |
| Vídeo promocional | YouTube URL | — | — | Opcional | Até 30 s recomendado. |

> **Regra de proporção Play Store:** screenshots devem ter aspect ratio entre 16:9 e 9:16 (inclusive). O conjunto atual 1080×2400 = 9:16 está dentro do permitido. Não usar 1080×1920 (story) nem 1080×1080 (quadrado) como screenshot de loja.

---

## 3. Ícone do app (512 × 512)

**Arquivo gerado:** `design-system/icons/ic_launcher_playstore.svg` (512×512).

Composição:
- Fundo: gradiente diagonal `#1E9B49 → #146B32`.
- Raio de canto declarado: `rx="112"` (≈ 21.9% do lado).
- Marca central: carrinho + check branco com círculo laranja (`#FF6B00`), escala 9.6× sobre o viewBox 40×40.
- Sombra de elevação (`feDropShadow`) no ícone do carrinho.

⚠️ **Pendência de validação:** a Play Store aplica sua própria máscara de arredondamento sobre o PNG 512×512. O `rx="112"` pré-aplicado pode gerar "duplo arredondamento" nas bordas. Recomendação: exportar uma versão **full-bleed quadrada** (sem `rx`) para o listing da Play Store, mantendo o SVG atual apenas como referência de adaptive icon foreground. Registrar decisão com Vektor (Brand & Iconography).

Safe zone do ícone adaptativo Android (foreground 108×108 dp):
- Área segura interna: **66×66 dp** (centro), margem de 21 dp em cada lado.
- O carrinho atual ocupa ~27×18 unidades no viewBox 40 → dentro da zona segura após escala 1.35× (translate 27,27). OK.

---

## 4. Feature Graphic (1024 × 500)

**Arquivo gerado:** `design-system/app-store/playstore-feature-graphic-1024x500.svg`.

### 4.1 Análise de composição

| Elemento | Posição (px) | Detalhe |
|---|---|---|
| Fundo | 0,0 → 1024,500 | Gradiente `#1B8C42 → #146B32 → #0E4822` (0°→65%→100%) |
| Textura | full | Pontos brancos r=1.5, opacidade 0.08, grid 32×32 |
| Glow verde | cx=850, cy=250, r=280 | `#26B256` @ 0.25 (trás o phone) |
| Glow laranja | cx=150, cy=80, r=200 | `#FF6B00` @ 0.12 (trás o headline) |
| Bloco de copy | translate(64,60) | Marca mini + tag + headline + subtítulo + 3 pills |
| Phone mockup | translate(680,45) rotate(4°) | 270×420 (bezel `#111827`, tela creme) |

Copy do feature graphic:
- Tag (mono, uppercase, tracking 1.5): **LEVOU · SOMOU · FECHOU**
- Headline linha 1 (Nunito 800, 52px, branco): *Seu total no mercado,*
- Headline linha 2 (Nunito 800, 52px, `#FFBE8A`): *sem sustos no caixa.*
- Subtítulo (Inter 400, 16px): *Registre cada etiqueta com a câmera e acompanhe o valor total em tempo real — funciona 100% offline.*
- Pills: `⚡ 100% Offline` (ink) · `📷 Leitor de Preço` (laranja) · `✓ Sem Cadastro` (branco 20%).

### 4.2 Safe zones (feature graphic 1024×500)

```
┌──────────────────────────────────────────────────────────────────────┐
│ 32px margem externa (não colocar copy crítica)                      │
│  ┌────────────────────────────────────┐  ┌────────────────────────┐  │
│  │  ZONA DE COPY                      │  │  ZONA DO MOCKUP        │  │
│  │  x: 64–520  y: 60–373             │  │  x: 640–960            │  │
│  │  (marca, tag, headline, pills)      │  │  y: 40–490 (rot 4°)   │  │
│  └────────────────────────────────────┘  └────────────────────────┘  │
│                                                                      │
│  ┌────────────┐  ← ZONA DE SOBREPOSIÇÃO Play Store                 │
│  │ icon+title │     bottom-left x:0–200  y:380–500  (manter livre) │
│  └────────────┘                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

Regras:
1. **Margem externa de 32 px** em todos os lados — glows e fundo podem sangrar, copy e mockup não.
2. **Zona de sobreposição (bottom-left 200×120)** reservada para ícone + nome do app que a Play Store renderiza sobre o graphic em algumas superfícies. Nenhum texto crítico deve ocupar essa área. No asset atual, a última pill termina em y≈373 e x≈454 → fora da zona. OK.
3. **Headline centralizado verticalmente na metade esquerda** (y 165–225), garantindo leitura mesmo em crops 16:9 da Play Store.
4. **Mockup com 4° de rotação** — verificar que a sombra (`x:-12, y:-8`) não seja cortada pelo limite direito (960+). OK (margem 64 px).
5. **Contraste:** headline branco sobre verde escuro → ratio ≥ 4.5:1. Pill "Sem Cadastro" branco sobre branco@20% → **atenção:** contraste baixo. Recomendação: elevar opacidade do pill para 35% ou usar borda branca 1px.

### 4.3 Checklist de validação (feature graphic)

- [ ] Dimensão exata 1024×500 px (sem barras pretas).
- [ ] Sem canal alpha (exportar PNG/JPEG opaco).
- [ ] Texto legível em miniatura (≈ 200×98 px).
- [ ] Zona bottom-left livre.
- [ ] Peso < 1 MB.
- [ ] Sem logotipo de terceiros ou badges de "top developer".

---

## 5. Screenshots (1080 × 2400, 9:16)

**Arquivos gerados:**
- `design-system/app-store/screenshot-1-total-tempo-real-1080x2400.svg` — *Total da compra em tempo real.*
- `design-system/app-store/screenshot-2-leitor-etiquetas-1080x2400.svg` — *Aponte a câmera, capture o preço.*
- `design-system/app-store/screenshot-3-funciona-offline-1080x2400.svg` — *Funciona 100% sem conexão.*

Template comum (`createPlaystoreScreenshot`):
- Canvas 1080×2400, fundo colorido (verde / verde médio `#165D30` / verde escuro `#254E33`).
- Halo circular branco @ 5% (cx=540, cy=1400, r=600) para profundidade.
- Header de copy em `translate(80, 160)`.
- Mockup de dispositivo em `translate(140, 680)`: bezel 800×1600 (rx 84), tela 756×1556 (rx 66), dynamic island 220×46.

### 5.1 Análise por screenshot

**Screenshot 1 — Total em tempo real** (`bg #1B8C42`)
- Tag: `CONTROLE TOTAL` (mono, tracking 2, `#FFE8D6`).
- Título: *Total da compra* / *em tempo real.* (Nunito 800, 82px, branco / `#FFC091`).
- Subtítulo: *Saiba o valor exato antes de chegar ao caixa.*
- Tela: saudação "olá, bora às compras?", card total verde (R$ 147,82 · 18 itens), CTA laranja "📷 Registrar preço", lista de 3 itens.
- **Mensagem de conversão:** controle financeiro imediato, sem surpresa no caixa.

**Screenshot 2 — Leitor de etiquetas** (`bg #165D30`)
- Tag: `LEITURA INTELIGENTE`.
- Título: *Aponte a câmera,* / *capture o preço.*
- Subtítulo: *Reconhecimento ágil na etiqueta do corredor.*
- Tela: viewfinder escuro com guia tracejado laranja, leitura "R$ 7,89" e badge "✓ Preço lido", card inferior com produto + botão "+ Adicionar".
- **Mensagem de conversão:** velocidade e precisão do OCR, zero digitação.

**Screenshot 3 — Funciona offline** (`bg #254E33`)
- Tag: `SEM INTERNET`.
- Título: *Funciona 100%* / *sem conexão.*
- Subtítulo: *Pode entrar no subsolo do supermercado sem medo.*
- Tela: shield offline (📶 riscado em laranja), "Modo 100% Offline", card de vantagens (sem dados móveis, sem login, resposta instantânea).
- **Mensagem de conversão:** confiabilidade em ambientes sem sinal — diferencial competitivo.

### 5.2 Safe zones (screenshot 1080×2400)

```
┌─────────────────────────────┐ 1080
│  80px margem lateral        │
│  ┌───────────────────────┐  │
│  │ 80px safe (status bar)│  │  ← não colocar copy crítica no topo
│  │                       │  │
│  │  HEADER DE COPY       │  │  y: 160–340
│  │  tag / título / subt. │  │  x: 80–1000
│  │                       │  │
│  │  100px respiro        │  │
│  │  ┌─────────────────┐  │  │
│  │  │  MOCKUP         │  │  │  x: 140, y: 680
│  │  │  800 × 1600     │  │  │  (bezel + tela)
│  │  │                 │  │  │
│  │  └─────────────────┘  │  │
│  │                       │  │
│  │  100px safe (nav bar) │  │  ← mockup termina em y=2280; OK
│  └───────────────────────┘  │
│  80px margem lateral        │
└─────────────────────────────┘ 2400
```

Regras:
1. **Margem lateral 80 px** — copy e mockup não tocam as bordas.
2. **Safe area superior 80 px** (status bar em captura real) e **inferior 100 px** (nav bar/gestos). No template, o mockup termina em y = 680 + 1600 = 2280, deixando 120 px de respiro inferior. OK.
3. **Header de copy limitado a 2 linhas de título** (82 px Nunito) para não empurrar o mockup para baixo de 680.
4. **Mockup não deve exceder 800 px de largura** para manter margens de 140 px.
5. **Consistência visual entre os 3:** mesma estrutura, fundos em degradê de verde (mais claro → mais escuro) para criar ritmo de leitura da esquerda para a direita no carrossel da loja.
6. **Ordem no carrossel:** 1 (problema/controle) → 2 (solução/captura) → 3 (diferencial/offline). Manter essa ordem; a Play Store exibe na sequência de upload.

### 5.3 Checklist de validação (screenshots)

- [ ] Dimensão exata 1080×2400 px.
- [ ] Sem canal alpha.
- [ ] Mínimo 2, recomendado 3–8 screenshots.
- [ ] Texto legível em thumbnail (≈ 200×444 px).
- [ ] Mockup dentro das safe areas.
- [ ] Ordem de upload: 1 → 2 → 3.
- [ ] Sem dados pessoais reais nas telas (usar valores fictícios — já aplicado: R$ 147,82).

---

## 6. Screenshots landscape 16:9 (opcional, recomendado)

Para cobrir a exibição em tablets/Chromebooks e carrosséis horizontais, gerar versão 2400×1080 (16:9) reorganizando o template: copy à esquerda (40% da largura), mockup à direita (60%), em orientação horizontal. **Não duplicar o conjunto vertical — criar apenas se houver demanda de tablet.** Atualmente não há layout tablet no app (minSdk 24, Compose sem adaptive layout), então marcar como backlog.

---

## 7. In-app banners

**Diretório:** `design-system/in-app-banners/`. Estes banners não são da Play Store, mas são assets de UI interna do app Android (Compose). Documentados aqui por serem de responsabilidade de Canvas.

| Arquivo | Dimensão | Proporção | Raio | Uso sugerido |
|---|---|---|---|---|
| `inapp-banner-welcome-720x240.svg` | 720 × 240 | 3:1 | 32 | Card de boas-vindas no onboarding / home vazia |
| `inapp-banner-scanner-tip-720x200.svg` | 720 × 200 | 3.6:1 | 28 | Dica contextual acima do viewfinder da câmera |
| `inapp-banner-family-plan-720x200.svg` | 720 × 200 | 3.6:1 | 28 | Card "EM BREVE" de plano família |

### 7.1 Análise

**Welcome (720×240, verde `#1B8C42`)**
- Marca mini + nome "fechou o carrinho".
- Título: *Bora às compras sem surpresas?*
- Subtítulo: *Toque em registrar preço ou aponte a câmera para somar seu primeiro produto.*
- Halo branco @ 8% (cx=660, cy=120, r=90).
- **Uso:** empty state da home ou tooltip de onboarding. CTA implícito: botão "Registrar preço".

**Scanner tip (720×200, ink `#111827`)**
- Ícone laranja 44×44 com 📷.
- Título: *Dica do leitor de preços*.
- Texto: *Posicione a etiqueta amarela ou branca bem iluminada no centro do visor para captura instantânea sem precisar digitar centavos.*
- **Uso:** banner dismissível no topo da tela de câmera, antes da primeira captura.

**Family plan (720×200, creme `#FFF8F0`, borda ink 2px)**
- Badge laranja: `EM BREVE`.
- Título: *Plano Família: Lista compartilhada*.
- Texto: *Você em um corredor e quem você ama no outro, somando no mesmo carrinho.*
- **Uso:** card de upsell/roadmap na home ou settings. Estado "em breve" — não deve ser clicável como compra.

### 7.2 Safe zones e regras in-app

1. **Padding interno mínimo 32 px** (banners atuais usam 32–36). Não reduzir abaixo de 24 px.
2. **Altura mínima tocável (Android):** 48 dp. Banners de 200–240 px (≈ 100–120 dp em mdpi) atendem. OK.
3. **Texto não deve ultrapassar 90% da largura** do banner (≈ 648 px em 720). No welcome, subtítulo de 720-36-36 = 648 px → no limite. Recomendação: quebrar em 2 linhas (já feito).
4. **Raio de canto:** 28–32 px, consistente com os cards do app (rx=24–36 nas telas).
5. **Contraste:** verificar texto branco sobre verde (`#1B8C42`) → ratio 4.6:1 (AA). OK. Texto muted `#6B7280` sobre creme → ratio 4.6:1. OK.
6. **Acessibilidade:** todo banner com CTA deve ter `contentDescription` no Compose e não depender apenas de cor.
7. **Emoji 📷:** o guia de identidade proíbe emojis no design de produto/landing. O banner scanner tip usa 📷. **Pendência:** substituir por ícone vetorial (Material Icons `CameraAlt`) no Compose, ou remover do SVG. Registrar com Vektor.

---

## 8. Estratégia visual de conversão

### 8.1 Funil na Play Store

```
Impressão (busca/categoria)
   ↓  Feature Graphic + Ícone + Título
Visita à página da loja
   ↓  Screenshots (carrossel 1→2→3) + descrição curta
Instalação
   ↓  Onboarding in-app (Welcome banner)
Primeiro uso (câmera → soma)
   ↓  Scanner tip (dica contextual)
Retenção / upsell
   ↓  Family plan (EM BREVE)
```

### 8.2 Princípios aplicados

1. **Hierarquia de cor:** verde = confiança/controle; laranja = ação/captura. O laranja aparece sempre no CTA de maior valor (registrar preço, badge de dica), nunca em elementos decorativos.
2. **Copy orientada a benefício, não feature:** "Total da compra em tempo real" (benefício) em vez de "OCR de etiquetas" (feature). A feature aparece no subtítulo.
3. **Prova social implícita:** mockup com dados realistas (R$ 147,82, 18 itens, lista com produtos reais) transmite uso real, não demo abstrata.
4. **Diferencial em destaque:** offline é o 3º screenshot porque é o argumento de fechamento (objeção: "e se não tiver sinal no subsolo?"). Também aparece como pill `⚡ 100% Offline` no feature graphic.
5. **Sem fricção de cadastro:** pill `✓ Sem Cadastro` remove a maior barreira de instalação.
6. **Ritmo cromático no carrossel:** verde claro → verde médio → verde escuro cria sensação de "aprofundamento" e mantém unidade de marca.
7. **Mockup com 4° de rotação** no feature graphic: dinamismo sem parecer desleixo; ângulo pequeno preserva legibilidade da tela.
8. **Tag mono uppercase** em todas as superfícies: cria assinatura visual de "metadado técnico" (lembra leitura de etiqueta de preço).

### 8.3 KPIs de conversão a acompanhar (Play Console)

- Taxa de conversão da página da loja (visitas → instalações).
- CTR do feature graphic (impressões → visitas).
- Retenção D1/D7 (proxy de qualidade do onboarding).
- Taxa de uso da câmera na primeira sessão (ativação).
- Cliques no banner "Plano Família" (interesse em upsell).

### 8.4 Testes A/B sugeridos

1. Feature graphic: variante com headline *Seu total, sem surpresas.* (slogan alternativo) vs. atual.
2. Screenshot 1: variante com total em destaque maior (R$ 147,82 a 96 px) vs. atual 76 px.
3. Ordem do carrossel: colocar screenshot 3 (offline) em 2ª posição para públicos de áreas com sinal fraco.
4. Ícone: variante full-bleed quadrado vs. com `rx=112`.

---

## 9. Checklist de entrega (Play Console)

### Obrigatórios
- [ ] Ícone 512×512 PNG (full-bleed, validar duplo arredondamento).
- [ ] Feature graphic 1024×500 PNG/JPEG opaco.
- [ ] Mínimo 2 screenshots 1080×2400 (recomendado: os 3 gerados).
- [ ] Título curto (≤ 30 chars): *Fechou o Carrinho*.
- [ ] Descrição curta (≤ 80 chars): *Some sua compra no mercado, em tempo real e offline.*
- [ ] Descrição completa (≤ 4000 chars): incluir benefícios, offline, sem cadastro, leitor de preço.
- [ ] Categoria: Finanças (ou Compras).
- [ ] Classificação de conteúdo (questionário).
- [ ] Política de privacidade URL (app não coleta dados sensíveis; confirmar com backend).
- [ ] Conta de desenvolvedor verificada.

### Opcionais (backlog)
- [ ] Screenshots landscape 2400×1080.
- [ ] Screenshots tablet 7"/10".
- [ ] Vídeo promocional (≤ 30 s).
- [ ] Localização pt-BR (já em pt-BR; considerar es/en para expansão).

### Exportação
- Exportar SVG → PNG via ferramenta de renderização vetorial (Inkscape/Chrome headless/Figma). Verificar que fontes Nunito/Inter estejam embutidas ou convertidas em outlines para evitar fallback.
- Validar dimensões com `identify`/`file` após export.
- Nomear arquivos finais: `fechouocarrinho-icon-512.png`, `fechouocarrinho-feature-1024x500.png`, `fechouocarrinho-shot-01.png` … `shot-03.png`.

---

## 10. Pendências e riscos

1. **Ícone com `rx=112`** pode gerar duplo arredondamento na Play Store → validar com Vektor antes do upload.
2. **Pill "Sem Cadastro" com contraste baixo** (branco sobre branco@20%) → elevar opacidade ou adicionar borda.
3. **Emoji 📷 no banner scanner tip** viola o guia de identidade (sem emojis no produto) → substituir por ícone vetorial.
4. **Fontes não embutidas nos SVG** (referência a Nunito/Inter via font-family) → exportar com outlines para garantir renderização.
5. **Sem layout tablet** no app → não enviar screenshots tablet até haver adaptive layout.
6. **Política de privacidade** e classificação de conteúdo dependem de outros agentes (backend/legal) → confirmar antes do envio.
7. **Screenshots usam valores fictícios** (R$ 147,82) — garantir que não sejam confundidos com preços reais em marketing.

---

## 11. Referências cruzadas

- `design-system/brand/brand-tokens.json` — tokens de cor/tipo/espaçamento.
- `design-system/icons/ic_launcher_playstore.svg` — ícone 512×512.
- `design-system/app-store/*.svg` — feature graphic + 3 screenshots.
- `design-system/in-app-banners/*.svg` — banners in-app.
- `scripts/generate-assets.js` — gerador dos SVGs (fonte de verdade).
- `landing-page-repo/src/app/pages/BrandIdentityPage.tsx` — vitrine dos assets.
- Nota Maestri: `Guia-Identidade-Visual`, `Roadmap-Assets-Design`.

---

*Fim do documento. Atualizar versão ao modificar assets ou requisitos da Play Store.*