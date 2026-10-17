# Plano de implementação — Fechou o Carrinho

## 1. Objetivo e critérios de sucesso

Construir uma landing page multipágina, mobile-first, moderna e acolhedora para o aplicativo brasileiro **“fechou o carrinho”**, com quatro rotas reais:

- `/` — Home
- `/como-funciona` — explicação completa do fluxo
- `/supermercados` — cobertura e redes previstas
- `/ajuda` — dúvidas, instalação e contato

A entrega deve:

- usar o nome sempre em minúsculas, sem “.site” e sem badge “BETA • MG”;
- seguir a paleta `#1B8C42`, `#FF6B00`, `#FFF8F0` e `#111827`;
- usar Nunito 800 nos títulos e Inter 400/500 no corpo;
- não conter emojis, termos técnicos de implementação, seção de API/GitHub ou a frase “Feito para Minas Gerais”;
- usar apenas ícones vetoriais de linha, com aparência equivalente a stroke 1.8;
- funcionar bem em celular, tablet e desktop;
- preservar a composição do telefone de referência, mas refiná-la visualmente;
- oferecer navegação real entre páginas, estados de foco visíveis e interações acessíveis;
- manter todos os CTAs de download apontando para `https://fechouocarrinho.site/downloads/fechouocarrinho.apk`.

## 2. Estado atual e dependências

O repositório é um scaffold mínimo React 19 + Vite 8 + Tailwind CSS 4. `src/App.tsx` está vazio, `src/index.css` contém apenas o import do Tailwind e não existe roteamento, biblioteca de ícones ou design system instalado.

### Dependências a adicionar

- `react-router` para o roteamento em Data Mode.
- `lucide-react` para os ícones lineares consistentes.

Não haverá backend, persistência, autenticação ou CMS. O conteúdo será estático e local.

## 3. Arquitetura de arquivos

Reorganizar a aplicação para separar layout, páginas e componentes:

```text
src/
  main.tsx
  index.css
  app/
    App.tsx
    routes.tsx
    RootLayout.tsx
    data.ts
    components/
      BrandLogo.tsx
      ButtonLink.tsx
      Container.tsx
      Header.tsx
      Footer.tsx
      MobileMenu.tsx
      SectionHeading.tsx
      FeatureCard.tsx
      StoreCard.tsx
      PhoneMockup.tsx
      QrDownloadCard.tsx
      FaqItem.tsx
      ScrollToTop.tsx
    pages/
      HomePage.tsx
      HowItWorksPage.tsx
      SupermarketsPage.tsx
      HelpPage.tsx
      NotFoundPage.tsx
```

- `src/main.tsx` continuará montando a aplicação.
- `src/app/App.tsx` renderizará `RouterProvider`.
- `src/app/routes.tsx` usará `createBrowserRouter`, com `RootLayout` e as quatro rotas, além de uma página 404.
- `data.ts` centralizará redes de supermercado, etapas e FAQs para evitar repetição.
- `ScrollToTop` tratará mudança de pathname; links com hash levarão às etapas corretas após a navegação.

## 4. Sistema visual local

Como não existe design system no projeto, criar uma camada local mínima e sem dependências visuais genéricas:

- tokens semânticos no `@theme` do Tailwind 4 para as cores da marca, creme, tinta, bordas, raios e sombras;
- importação Google Fonts CSS2 no topo de `src/index.css`, após o import do Tailwind: Nunito 800 e Inter 400/500;
- corpo em Inter, títulos em Nunito;
- componentes locais para links-botão, container, títulos de seção e cards;
- bordas arredondadas generosas, superfícies brancas/creme, sombras suaves e detalhes verdes/laranja;
- largura máxima coerente, ritmo vertical espaçoso e contraste AA;
- `prefers-reduced-motion` respeitado;
- animações leves apenas em hover/foco, como elevação pequena de cards e deslocamento sutil de setas;
- ícones Lucide com `strokeWidth={1.8}` e `aria-hidden` quando decorativos.

## 5. Navegação compartilhada

### Header

- Sticky, fundo branco com transparência e blur, borda inferior discreta.
- Logo: check vetorial branco dentro de quadrado verde arredondado + “fechou o carrinho”.
- Desktop: links “Como funciona”, “Supermercados”, “Ajuda” e CTA escuro “Baixar APK”.
- Mobile: marca + botão de menu com ícones `Menu`/`X`; painel expansível com os mesmos links e CTA.
- Indicar a rota ativa com cor/peso e `aria-current="page"`.
- O CTA “Baixar APK” usa link direto para o APK e atributo `download` quando aplicável.

### Footer

- Logo, frase “Controle simples do total para comprar com mais tranquilidade.”
- Navegação para as três páginas internas.
- Contato via `mailto:contato@fechouocarrinho.site`.
- “© 2026”.
- Sem “Feito para Minas Gerais”, API ou GitHub.

## 6. Home (`/`)

### Hero

Layout de uma coluna no mobile e duas no desktop.

**Coluna esquerda**

- Badge com ponto verde ou ícone vetorial discreto: “Funciona sem internet • Leve para qualquer celular”.
- H1: “Seu total sem sustos no caixa.”, com “sem sustos” ou a ênfase principal em verde; nunca usar “fechado” como texto literal fora do contexto.
- Parágrafo explicando que o usuário monta a lista, aponta para a etiqueta e acompanha o total enquanto compra.
- CTA primário verde “Baixar APK”.
- CTA secundário branco contornado “Ver como funciona”, apontando para `/como-funciona`.
- Três mini cards:
  - `Zap`: “Rápido e leve”;
  - `Eye`: “Sem internet no mercado”;
  - `Users`: “Feito para o dia a dia”.
- Cada mini card será um `Link` e levará à seção correspondente de `/como-funciona`.

**Coluna direita — mockup refinado**

Reconstruir o telefone em HTML/CSS a partir da imagem anexada, mantendo:

- corpo preto arredondado e recorte/alto-falante superior;
- barra verde “Meu Carrinho”;
- card flutuante “VOCÊ ECONOMIZA / R$ 34,00 / neste mês”;
- área de câmera com foto de hortifrúti;
- painel branco central com “MIRE NA ETIQUETA”;
- moldura laranja tracejada e preço “R$ 7,89”;
- botão escuro com ícone de câmera e texto “Capturar”;
- botão secundário quadrado com ícone de edição;
- itens “Arroz Camil 5kg — R$ 29,90” e “Café Pilão 500g — R$ 15,49”;
- faixa verde inferior “TOTAL — R$ 53,28”.

Refinamentos:

- proporções mais equilibradas e tipografia coerente com o site;
- alinhamento e espaçamentos precisos;
- sombras mais suaves e naturais;
- câmera com overlay discreto para preservar legibilidade;
- contornos, botões e ícones mais consistentes;
- leve rotação/elementos decorativos abstratos ao redor somente no desktop, sem prejudicar o conteúdo;
- escala responsiva, sem cortar o aparelho em telas pequenas.

A fotografia de hortifrúti será selecionada via Unsplash durante a implementação, seguindo o procedimento obrigatório da ferramenta, e terá descrição acessível adequada. O anexo será tratado como referência visual, não exibido como raster do telefone.

### Como funciona

- Eyebrow + título e texto introdutório.
- Grade de três cards:
  1. creme, `MapPin`, “Escolha onde vai comprar”;
  2. tinta escura, `Camera`, “Aponte para a etiqueta”;
  3. verde muito claro, `FileText`, “Acompanhe o total”.
- Todos terão texto curto e “Saiba mais” com `ArrowRight`.
- Links para `/como-funciona#escolha`, `#aponte` e `#acompanhe`.

### Supermercados

- Título “Onde você compra”.
- Subtítulo informando que a cobertura considera várias cidades por estado.
- Select acessível com “Minas Gerais” selecionado; opções adicionais podem aparecer como indisponíveis/“em breve”, sem sugerir preços ativos.
- Grid responsiva, quatro colunas em telas largas, com:
  - EPA
  - Mart Minas
  - Supermercados BH
  - Supernosso
  - Verdemar
  - Carrefour
  - Assaí
- Cada card usa monograma colorido, nome, localidade (“Várias cidades • MG”; Carrefour: “MG • SP • RJ”) e status visual desabilitado “Preços em breve”.
- Na Home, os cards são links acessíveis para `/supermercados#rede-{slug}`; o status continua visual e semanticamente indisponível, nunca “Ver preços”.
- Link “Sugerir supermercado” para `/supermercados#sugerir`.

### Benefícios

Três colunas/cards, todos levando a conteúdo aprofundado em `/como-funciona`:

- `WifiOff`: “Funciona sem internet”.
- `Smartphone`: “Leve para qualquer celular”.
- `Users`: “Lista que ajuda no dia a dia”.

Textos simples e orientados ao benefício, sem mencionar ML Kit, Kotlin, Flutter, tamanho do APK ou outras tecnologias.

### Baixar

Duas colunas:

- esquerda: H2, texto curto, CTA verde “Baixar APK” e lista numerada:
  1. Baixar
  2. Permitir
  3. Instalar
- direita: card branco com QR code de 200 × 200, legenda e link alternativo.

O QR será carregado pela URL fornecida:

`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://fechouocarrinho.site/downloads/fechouocarrinho.apk`

Exibir em 200 × 200 CSS, com `alt` explicando que aponta para o download do APK. Se a imagem externa falhar, o link textual e o botão de download continuam funcionais.

## 7. Página Como Funciona (`/como-funciona`)

Página editorial completa, não simples repetição da Home:

- hero compacto com título, introdução e CTA de download;
- navegação curta por âncoras das três etapas;
- três blocos alternados e identificados pelos anchors `escolha`, `aponte` e `acompanhe`;
- cada bloco combina número, ícone, explicação, pequena ilustração vetorial/UI e dica prática;
- seção “Do corredor ao caixa” resumindo o fluxo em uma linha visual;
- bloco de benefícios cotidianos: funciona sem conexão, uso simples e total sempre visível;
- CTA final para baixar ou acessar Ajuda.

Os cards da Home apontam diretamente para os respectivos anchors. O texto evita promessas técnicas ou alegações que não possam ser comprovadas.

## 8. Página Supermercados (`/supermercados`)

- hero explicando que a lista de redes é indicativa e que os preços estão “em breve”;
- controle de estado com Minas Gerais selecionado;
- grade completa das sete redes, com anchors por rede;
- todos os cards permanecem sem acesso a preços e exibem botão realmente desabilitado (`disabled`, `aria-disabled`) com cursor `not-allowed`;
- bloco editorial sobre cobertura em várias cidades;
- seção `#sugerir` com CTA “Sugerir supermercado”, abrindo e-mail pré-preenchido para `contato@fechouocarrinho.site`;
- CTA secundário para entender como funciona.

Exceção deliberada à regra “todos os cards linkam”: os cards de redes nesta página são informativos e mantêm ação desabilitada porque o briefing proíbe preços ativos. Na Home, os mesmos cards são links para seus detalhes/anchors nesta página.

## 9. Página Ajuda (`/ajuda`)

- hero “Como podemos ajudar?” com texto curto;
- atalhos em cards-link para:
  - instalar o aplicativo;
  - usar a câmera;
  - acompanhar o total;
  - sugerir supermercado;
- FAQ acessível em acordeão com perguntas sobre instalação, permissão para instalar, uso sem internet, leitura da etiqueta e contato;
- seção de instalação em três passos, coerente com a Home;
- card de contato com `Mail` e link `mailto:contato@fechouocarrinho.site`;
- CTA final de download.

Usar elementos expansíveis acessíveis, com foco visível e estado aberto anunciado. Não simular suporte ao vivo nem criar formulário sem backend.

## 10. Página 404

- mensagem amigável e curta;
- link principal para a Home;
- links secundários para Como funciona e Ajuda;
- mesma identidade visual, header e footer.

## 11. Conteúdo, links e comportamento

- Centralizar o URL do APK em uma constante para evitar divergências.
- Links internos usam `Link`/`NavLink`; download, QR e e-mail usam links externos adequados.
- Fechar o menu mobile após navegação e ao pressionar Escape.
- Preservar navegação por teclado e ordem lógica de foco.
- Não aninhar links ou colocar controles ativos dentro de cards-link.
- O select de estado na Home e na página Supermercados será funcional visualmente, mas não fará chamadas externas; estados sem cobertura devem mostrar mensagem “Cobertura em breve”.
- Nenhum botão de preço será habilitado.

## 12. Responsividade

- Mobile: header compacto, menu colapsável, hero empilhado, telefone abaixo do CTA, cards em uma coluna e QR centralizado.
- Tablet: grids de duas colunas e mockup dimensionado sem overflow.
- Desktop: hero em duas colunas, supermercados em quatro colunas, benefícios em três e seção de download em duas.
- Garantir que textos, badges, botões e navegação não estourem em 320 px de largura.
- Manter alvos de toque com pelo menos 44 px e corpo textual confortável.

## 13. Acessibilidade e qualidade

- Estrutura semântica com um H1 por página e hierarquia correta.
- Labels visíveis ou associados ao select e ao menu.
- `alt` útil para QR e fotografia; mockup decorativo/explicativo tratado para não produzir leitura redundante.
- Contraste adequado, inclusive nos cards creme e verde-claro.
- Estados hover, focus-visible, active e disabled distintos.
- SVGs decorativos com `aria-hidden`.
- Não depender apenas de cor para comunicar indisponibilidade.
- Sem emojis no código ou conteúdo renderizado.

## 14. Sequência de implementação

1. Instalar `react-router` e `lucide-react`.
2. Criar tokens, fontes e estilos globais em `src/index.css`.
3. Criar router, layout raiz, scroll/hash handling e página 404.
4. Implementar componentes compartilhados de marca, navegação, botões, cards e footer.
5. Selecionar a fotografia de hortifrúti via skill Unsplash.
6. Construir e refinar o `PhoneMockup` com base no anexo.
7. Implementar a Home completa.
8. Implementar as três páginas editoriais e ligar cards/âncoras.
9. Revisar conteúdo para remover emojis, termos técnicos e textos proibidos.
10. Verificar responsividade, teclado, links, estados desabilitados e QR.

## 15. Verificação

Por ser uma mudança ampla, executar:

- `pnpm build` para validar TypeScript e build de produção;
- `pnpm format` conforme o script do repositório, revisando o diff depois;
- busca textual nos arquivos produzidos para garantir ausência de:
  - emojis;
  - “ML Kit”, “Room”, “Flutter”, “Kotlin”;
  - “BETA”, “Feito para Minas Gerais”, “GitHub”, “API”;
  - botões “Ver preços”;
- inspeção das quatro rotas e da 404 no preview já existente, sem iniciar outro servidor;
- teste manual dos links de navegação, menu mobile, links com hash, APK, mailto e fallback do QR;
- conferência visual nos breakpoints aproximados de 320, 768, 1024 e 1440 px;
- teste de navegação por teclado e foco visível;
- conferência de que todos os cards acionáveis levam à rota/âncora planejada e que cards de preços permanecem desabilitados.

## 16. Fora de escopo

- Backend, CMS, banco de dados ou autenticação.
- Consulta real de preços ou cobertura.
- Formulário de contato persistente.
- Publicação do APK.
- Alteração do arquivo APK ou geração dinâmica do QR.
- Reprodução pixel a pixel da imagem raster anexada; ela serve de composição-base para uma versão refinada em HTML/CSS.
