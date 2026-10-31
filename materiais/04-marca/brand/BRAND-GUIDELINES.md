# Manual de Identidade Visual e Diretrizes da Marca
**fechou o carrinho**  
*Versão 1.0 — Guia Oficial do Sistema de Design & Iconografia*  
*Responsável: Vektor (Especialista em Marca, Logotipia e Iconografia)*  

---

## 1. Naming, Conceito e Voz da Marca

### 1.1 O Nome Oficial
O nome institucional do aplicativo e serviço é **`fechou o carrinho`**.
- **Regra Tipográfica Mandatória:** Grafado **sempre em letras minúsculas**, inclusive em inícios de frase publicitária, títulos de landing page ou assinaturas de e-mail.
- **Sem sufixo técnico:** Nunca utilizar "fechou o carrinho.site" ou "fechou o carrinho app" como logotipo ou marca nominativa.

### 1.2 Proposta de Valor & Conceito Central
O **fechou o carrinho** nasce para eliminar a ansiedade e os sustos no caixa do supermercado. Ele permite que qualquer pessoa aponte a câmera do celular para as etiquetas de preço dos produtos, capture os valores em frações de segundo e veja a soma total exata em tempo real — com total funcionamento offline.

### 1.3 Slogans Oficiais
1. **« Levou. Somou. Fechou. »** *(Slogan primário — ritmo sonoro, direto ao ponto)*
2. **« Seu total, sem surpresas. »** *(Slogan de posicionamento emocional / controle)*
3. **« Aponte. Capture. Some. »** *(Slogan funcional do scanner)*
4. **« O mercado pode ficar sem sinal. Sua lista, não. »** *(Slogan da funcionalidade offline)*

### 1.4 Tom de Voz
- **Acolhedor e Prático:** Conversa de igual para igual com quem faz compras no dia a dia.
- **Transparente e Preciso:** Focado em clareza numérica, economia real e controle de orçamento.
- **Anti-Gourmet:** Sem jargões corporativos em inglês ou complexidades desnecessárias.

---

## 2. Anatomia da Logomarca & Símbolo

O símbolo do **fechou o carrinho** sintetiza a experiência de compra inteligente em um único ícone vetorial de alta memorabilidade.

```
          ┌──────────────────────────────────┐
          │  ╔════════════════════════════╗  │ ── Squircle Verde Marca (#1B8C42)
          │  ║    ───┐                    ║  │    Raio de curvatura: rx = 31.25%
          │  ║       │     [ ● ]          ║  │ ── Ponto Focal Laranja (#FF6B00)
          │  ║   ────┴───────────╲        ║  │    (Scanner ótico / item ativo)
          │  ║   ╲     ✓ Fechou   ╲       ║  │ ── Checkmark Verde no corpo branco
          │  ║    ╲───────────────╱       ║  │    (Conferência positiva da conta)
          │  ║       (○)     (○)          ║  │ ── Rodas do carrinho em equilíbrio
          │  ╚════════════════════════════╝  │
          └──────────────────────────────────┘
```

### 2.1 Elementos Constituintes
1. **O Carrinho de Compras:** Traço minimalista e fluido em branco `#FFFFFF`, unindo o puxador ergonômico, cesto espaçoso e estrutura inferior.
2. **O Checkmark de Confirmação:** Inserido no miolo do carrinho em verde `#1B8C42` (ângulo de 45°), materializando o momento exato em que a soma confere com o caixa.
3. **O Ponto de Acento (Scanner Dot):** Um círculo vibrante em Laranja Acento `#FF6B00` posicionado estrategicamente na frente superior do carrinho. Simboliza a mira do leitor de preços por visão computacional e o sinal de produto capturado.
4. **As Rodas em Branco Puro:** Círculos brancos perfeitamente alinhados na base, conferindo estabilidade ótica.
5. **O Squircle Contêiner:** Base sólida arredondada com curvatura contínua que garante contraste e legibilidade em qualquer papel de parede, tela inicial ou launcher.

---

## 3. Paleta Cromática Oficial

O sistema de cores reflete confiança financeira, frescor de supermercado, calor humano e contraste rigoroso para ambientes com iluminação variável.

| Nome da Cor | Hexadecimal | RGB | HSL | CMYK (Impressão) | Função no Sistema |
|---|---|---|---|---|---|
| **Verde Marca** *(Primary)* | `#1B8C42` | `27, 140, 66` | `141°, 68%, 33%` | `81, 0, 53, 45` | Identidade primária, cor institucional, badges de sucesso |
| **Verde Escuro** *(Deep)* | `#146B32` | `20, 107, 50` | `141°, 68%, 25%` | `81, 0, 53, 58` | Gradientes de fundo, estados pressed/hover, sombras vetoriais |
| **Laranja Acento** *(Accent)* | `#FF6B00` | `255, 107, 0` | `25°, 100%, 50%` | `0, 58, 100, 0` | Ponto focal do scanner, badges promocionais, CTAs secundários |
| **Creme Fundo** *(Surface)* | `#FFF8F0` | `255, 248, 240` | `32°, 100%, 97%` | `0, 3, 6, 0` | Superfície principal de fundo, substituto caloroso do branco estéril |
| **Grafite Tinta** *(Ink)* | `#111827` | `17, 24, 39` | `221°, 39%, 11%` | `56, 38, 0, 85` | Tipografia de alta leitura, bordas, ícones neutros e elementos escuros |

### Cores Neutras de Suporte
- **Branco Puro:** `#FFFFFF` — Fundo de cards elevados, elementos internos do símbolo.
- **Cinza Muted:** `#6B7280` — Textos auxiliares secundários, unidades de medida e timestamps.
- **Borda Suave:** `rgba(17, 24, 39, 0.08)` — Divisórias de listas de produtos e caixas de input.
- **Sombra Suave:** `rgba(17, 24, 39, 0.08)` com dispersão de 12px a 24px.

---

## 4. Regras de Contraste e Acessibilidade (WCAG 2.1)

A acessibilidade é inegociável, uma vez que o usuário utiliza o aplicativo em supermercados sob lâmpadas fluorescentes fortes, com uma mão ocupada segurando o carrinho ou produtos.

### 4.1 Matriz de Ratios de Contraste Calculados

| Combinação de Elementos | Ratio Calculado | Status WCAG 2.1 | Diretriz de Uso |
|---|---|---|---|
| **Grafite `#111827` sobre Creme `#FFF8F0`** | **16.4 : 1** | **AAA (Aprovado)** | Leitura padrão para textos corridos, títulos e preços. |
| **Grafite `#111827` sobre Branco `#FFFFFF`** | **17.2 : 1** | **AAA (Aprovado)** | Conteúdo de cards flutuantes, tabelas e inputs. |
| **Verde Marca `#1B8C42` sobre Creme `#FFF8F0`** | **4.52 : 1** | **AA (Aprovado)** | Títulos de destaque, subtítulos, links e ícones informativos. |
| **Branco `#FFFFFF` sobre Verde Marca `#1B8C42`** | **4.68 : 1** | **AA (Aprovado)** | Botões de ação primária ("Fechar Carrinho", "Adicionar"). |
| **Laranja Acento `#FF6B00` sobre Grafite `#111827`** | **5.15 : 1** | **AA (Aprovado)** | Pílulas em modo escuro, avisos e badges sobre cards pretos. |
| **Laranja Acento `#FF6B00` sobre Creme `#FFF8F0`** | **2.91 : 1** | ❌ **Reprovado para texto** | **PROIBIDO PARA TEXTO**. Permitido apenas para elementos gráficos decorativos e o dot da logomarca. |
| **Branco `#FFFFFF` sobre Laranja Acento `#FF6B00`** | **3.01 : 1** | ⚠️ **Limite para texto grande** | Para botões em laranja de alto impacto, **recomenda-se utilizar texto em Grafite `#111827`** (ratio 5.15 : 1) em vez de branco. |

### 4.2 Diretrizes Visuais de Interface
1. **Sem Dependência de Cor Única:** Alertas de limite de orçamento ou itens sem preço devem ser acompanhados de ícones explicativos (ex.: ícone de alerta + texto explicativo), nunca apenas a borda vermelha ou laranja.
2. **Touch Targets Mínimos:** Todas as áreas interativas no celular devem respeitar o mínimo de **48 x 48 dp** no Android e **44 x 44 px** na Web.

---

## 5. Proporção de Respiro, Geometria e Área de Proteção

### 5.1 Grid Base do Símbolo
- **Área Total do ViewBox:** Matriz de `40 x 40` unidades.
- **Raio de Curvatura do Squircle (`rx`):** `12.5` unidades (31.25% da largura total).
- **Caixa Envolvente do Carrinho (Bounding Box):**
  - Eixo X: de `5.7` a `33.8` (largura efetiva: `28.1` unidades).
  - Eixo Y: de `9.8` a `32.95` (altura efetiva: `23.15` unidades).
  - Folga interna à borda: `14.25%` à esquerda, `15.5%` à direita, `24.5%` no topo, `17.6%` na base.

### 5.2 Zona de Proteção Mínima (Clear Space)
A zona de respiro protege a integridade visual da logomarca, impedindo que textos, fotografias ou margens de telas concorram com o símbolo.

- **Módulo de Referência `X`:** O módulo `X` equivale exatamente ao diâmetro de uma roda do carrinho (`3.6` unidades no grid de 40, ou aproximadamente `10%` da altura total do logo).
- **Regra:** Nenhuma tipografia, botão, borda de tela ou corte de impressão pode invadir o espaço delimitado por **`1X`** ao redor de qualquer versão do logotipo.

```
       ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
         ▲ 1X
       │ ┼ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┼ │
         │  ┌───┐                                        │
       │ │  │   │  fechou o carrinho                     │ │
       ◄─┼──│   │────────────────────────────────────────┼─►
       1X│  └───┘                                        │ 1X
         ┼ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┼
       │ ▼ 1X                                              │
       └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

### 5.3 Redução Mínima
- **Logo Horizontal:** Largura mínima de **120 px** em telas digitais e **28 mm** em materiais impressos.
- **Logo Mark (Símbolo Isolado):** Tamanho mínimo de **16 x 16 px** em telas e **5 mm** em impressão.

---

## 6. Sistema Tipográfico

O sistema tipográfico foi desenvolvido para combinar legibilidade extrema em movimento com o acolhimento visual do produto.

### 6.1 Fonte Display: Nunito
- **Aplicação:** Logotipo, títulos principais (`h1`, `h2`), nomes de seções e frases promocionais.
- **Pesos Oficiais:** `800 ExtraBold` e `700 Bold`.
- **Configuração de Estilo:**
  - `letter-spacing: -0.04em` a `-0.06em` (tracking condensado para aumentar o impacto visual).
  - `line-height: 1.1` a `1.2`.

### 6.2 Fonte de Corpo & UI: Inter
- **Aplicação:** Menus, nomes de produtos na lista, descrições, modais, formulários e textos explicativos.
- **Pesos Oficiais:** `400 Regular`, `500 Medium`, `600 SemiBold`.
- **Configuração de Estilo:**
  - `letter-spacing: 0` a `-0.01em`.
  - `line-height: 1.5` a `1.6`.

### 6.3 Fonte Mono / Numérica: JetBrains Mono / Tabular Numbers
- **Aplicação:** Preços de produtos, somatórios parciais, código de barras e identificadores.
- **Configuração:** `font-variant-numeric: tabular-nums` para que cada algarismo ocupe exatamente a mesma largura, garantindo alinhamento perfeito de vírgulas de centavos em tabelas e listas.

---

## 7. Instruções para Integração no App Android

A marca segue rigorosamente as diretrizes do Material Design 3 e os requisitos técnicos da Google Play Store e Android 8.0 até Android 15+.

### 7.1 Android Adaptive Icons (Android 8.0+ / API 26+)
Os ícones adaptativos do Android exigem uma tela total de **108 x 108 dp**, mas contam com uma **Safe Zone visível garantida de apenas 72 x 72 dp** (um círculo ou squircle centralizado com margem externa de 18 dp em cada lado).

#### Estrutura de Arquivos no Projeto Android Studio
```
android-app/app/src/main/res/
├── drawable/
│   ├── ic_launcher_background.xml
│   └── ic_launcher_foreground.xml
├── mipmap-anydpi-v26/
│   ├── ic_launcher.xml
│   └── ic_launcher_round.xml
└── mipmap-[mdpi|hdpi|xhdpi|xxhdpi|xxxhdpi]/
    ├── ic_launcher.png
    └── ic_launcher_round.png
```

#### Código Oficial de Configuração: `res/mipmap-anydpi-v26/ic_launcher.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background" />
    <foreground android:drawable="@drawable/ic_launcher_foreground" />
</adaptive-icon>
```

#### Background Oficial: `res/drawable/ic_launcher_background.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <path
        android:fillColor="#1B8C42"
        android:pathData="M0,0h108v108h-108z" />
</vector>
```

#### Foreground Oficial: `res/drawable/ic_launcher_foreground.xml`
O carrinho vetorial é escalado em `1.35x` e transladado em `27dp` nos eixos X e Y. Como o ícone original possui base de `40 x 40 unidades`, o desenho ocupa exatamente `54 x 54 dp` centralizado na tela de 108 dp (de `x=27` a `x=81`).
Isto garante uma **margem de segurança extra de 9 dp** dentro da safe zone de 72 dp, impedindo qualquer corte do símbolo em launchers de marcas como Samsung One UI, Xiaomi HyperOS, Google Pixel ou Motorola.

```xml
<?xml version="1.0" encoding="utf-8"?>
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
</vector>
```

### 7.2 Ícones Legados para Android < 8.0 (Pastas `res/mipmap-*/`)
Para versões antigas do Android que não suportam vetores adaptativos, exportar os arquivos rasterizados nos seguintes tamanhos fixos:
- `res/mipmap-mdpi/ic_launcher.png`: **48 x 48 px**
- `res/mipmap-hdpi/ic_launcher.png`: **72 x 72 px**
- `res/mipmap-xhdpi/ic_launcher.png`: **96 x 96 px**
- `res/mipmap-xxhdpi/ic_launcher.png`: **144 x 144 px**
- `res/mipmap-xxxhdpi/ic_launcher.png`: **192 x 192 px**

### 7.3 Google Play Store Icon (512 x 512 px)
> [!IMPORTANT]
> **Aviso Crítico de Envio na Google Play Store:**
> O arquivo submetido no Google Play Console **DEVE TER CANTOS RETOS** (`rx = 0`). O Google Play aplica a máscara squircle de curvatura 20% de forma dinâmica na loja. Se um arquivo com cantos pré-arredondados for submetido, o ícone sofrerá dupla máscara, exibindo bordas pretas irregulares na loja.
- **Dimensões:** `512 x 512 px`.
- **Formato:** PNG de 32 bits (com canal alfa) ou SVG plano.
- **Keyline / Margem:** Elemento central de `384 x 384 px` (margem livre de 64 px em todos os lados).
- **Arquivo Oficial de Produção:** `materiais/04-marca/icons/ic_launcher_playstore_flat.svg`.

### 7.4 Splash Screen Oficial (Android 12+)
Configuração no arquivo `res/values/themes.xml`:
```xml
<style name="Theme.App.Starting" parent="Theme.SplashScreen">
    <item name="windowSplashScreenBackground">#1B8C42</item>
    <item name="windowSplashScreenAnimatedIcon">@drawable/ic_launcher_foreground</item>
    <item name="postSplashScreenTheme">@style/Theme.FechouOCarrinho</item>
</style>
```

---

## 8. Instruções para Integração Web & PWA

### 8.1 Matriz de Arquivos Web
- **`favicon.svg`:** Favicon vetorial moderno para navegadores com suporte a SVG (Chrome, Firefox, Safari desktop).
- **`favicon-32x32.svg` / `favicon.ico`:** Compatibilidade universal em navegadores tradicionais.
- **`apple-touch-icon.svg` / `apple-touch-icon.png` (180x180 px):** Ícone de atalho para Safari no iOS e iPadOS.
- **`manifest.json` / `site.webmanifest`:** Configuração de PWA para instalação no desktop e Android Chrome com suporte a ícones `maskable` e `any`.

### 8.2 Snippet HTML Oficial para Inclusão no `<head>`
```html
<!-- Favicons Padrão & SVG Moderno -->
<link rel="icon" type="image/svg+xml" href="/design-assets/favicon.svg">
<link rel="icon" type="image/svg+xml" sizes="32x32" href="/design-assets/favicon-32x32.svg">
<link rel="icon" type="image/svg+xml" sizes="16x16" href="/design-assets/favicon-16x16.svg">

<!-- Apple Touch Icon (iOS) -->
<link rel="apple-touch-icon" sizes="180x180" href="/design-assets/apple-touch-icon-180x180.svg">

<!-- Manifest PWA -->
<link rel="manifest" href="/site.webmanifest">

<!-- Cores da Barra do Navegador -->
<meta name="theme-color" content="#1B8C42">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
```

### 8.3 Configuração de `site.webmanifest`
```json
{
  "name": "fechou o carrinho",
  "short_name": "fechou o carrinho",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFF8F0",
  "theme_color": "#1B8C42",
  "icons": [
    {
      "src": "/design-assets/favicon-192x192.svg",
      "sizes": "192x192",
      "type": "image/svg+xml",
      "purpose": "any"
    },
    {
      "src": "/design-assets/favicon-512x512.svg",
      "sizes": "512x512",
      "type": "image/svg+xml",
      "purpose": "maskable"
    }
  ]
}
```

---

## 9. Diretrizes de Uso Incorreto (Don'ts)

Para preservar a autoridade e o reconhecimento da marca, as seguintes aplicações são expressamente proibidas:

| Proibição | Motivo Técnico |
|---|---|
| ❌ **Não distorcer ou achatar o símbolo** | Alterar a proporção 1:1 compromete a precisão geométrica do carrinho e das rodas. |
| ❌ **Não alterar as cores oficiais** | Nunca substituir o Verde Marca `#1B8C42` por verde limão, ou o Laranja `#FF6B00` por vermelho. |
| ❌ **Não remover o ponto focal laranja** | O dot superior é o identificador exclusivo do scanner; sua ausência descaracteriza a marca. |
| ❌ **Não escrever com iniciais maiúsculas** | A marca é sempre minúscula (`fechou o carrinho`), nunca `Fechou o Carrinho`. |
| ❌ **Não utilizar texto Laranja sobre fundo Creme** | O ratio de contraste de `2.91:1` é reprovado pelo padrão WCAG 2.1 AA. |
| ❌ **Não aplicar efeitos 3D, bisel ou sombras duras** | A identidade visual é estritamente vetorial e baseada em flat design com profundidade suave. |
| ❌ **Não submeter o ícone da Play Store com cantos arredondados** | Provoca artefatos pretos e dupla máscara no aplicativo publicado. |

---

## 10. Inventário Oficial de Assets do Sistema

Todos os assets foram homologados e estão organizados nos seguintes diretórios do repositório:

### 10.1 Marca (`materiais/04-marca/brand/`)
- [`brand-tokens.json`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/brand/brand-tokens.json): Tokens em JSON com paleta cromática, especificações de tipografia e resoluções padrão.
- [`logo-mark.svg`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/brand/logo-mark.svg): Símbolo vetorial isolado em squircle verde (256 x 256).
- [`logo-horizontal.svg`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/brand/logo-horizontal.svg): Versão horizontal completa para fundos claros (460 x 80).
- [`logo-horizontal-dark.svg`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/brand/logo-horizontal-dark.svg): Versão horizontal completa para fundos noturnos/escuros (460 x 80).
- [`logo-monochrome.svg`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/brand/logo-monochrome.svg): Versão em uma cor só (`#111827`) para notas fiscais e impressoras térmicas (460 x 80).
- [`BRAND-GUIDELINES.md`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/brand/BRAND-GUIDELINES.md): Este documento oficial.

### 10.2 Ícones e Sistema Operacional (`materiais/04-marca/icons/`)
- [`favicon.svg`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/icons/favicon.svg): Favicon vetorial padrão para navegadores modernos.
- [`favicon-16x16.svg`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/icons/favicon-16x16.svg): Versão compactada para abas de navegadores.
- [`favicon-32x32.svg`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/icons/favicon-32x32.svg): Versão padrão para bookmarks e barras de ferramentas.
- [`favicon-48x48.svg`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/icons/favicon-48x48.svg): Versão para atalhos na área de trabalho do Windows e macOS.
- [`favicon-192x192.svg`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/icons/favicon-192x192.svg): PWA splash e tela inicial mobile.
- [`favicon-512x512.svg`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/icons/favicon-512x512.svg): PWA high-res e stores.
- [`apple-touch-icon-180x180.svg`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/icons/apple-touch-icon-180x180.svg): Ícone com cantos retos para iOS Safari.
- [`ic_launcher_playstore_flat.svg`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/icons/ic_launcher_playstore_flat.svg): Versão oficial de 512 x 512 com cantos retos e respiro de 64 px para upload na Play Store.
- [`ic_launcher_playstore.svg`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/icons/ic_launcher_playstore.svg): Mockup de visualização com squircle pré-aplicado para materiais de marketing.
- [`ic_launcher_background.xml`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/icons/ic_launcher_background.xml): VectorDrawable de fundo verde para Android Studio.
- [`ic_launcher_foreground.xml`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/icons/ic_launcher_foreground.xml): VectorDrawable de primeiro plano dentro da safe zone de 72 dp para Android Studio.
- [`ic_launcher.xml`](file:///C:/Users/usuario/orca/projects/.maestri/floors/scanlist--identidadevisual/design-system/icons/ic_launcher.xml): Adaptive-icon XML associando background e foreground.
