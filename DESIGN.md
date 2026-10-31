# Fechou o Carrinho — sistema visual

## Ideia
O app responde uma pergunta no corredor do mercado: quanto já deu? A promessa é "Seu total, antes do caixa." O tom é
direto e calmo, sem susto. A leitura da etiqueta roda no aparelho, então tudo funciona sem internet.

## Cores
Tokens em `materiais/04-marca/brand/brand-tokens.json`.

| Papel | Valor |
|---|---|
| Primária (verde) | `#1B8C42` |
| Primária escura | `#146B32` |
| Acento (laranja, ações de captura e destaque) | `#FF6B00` |
| Superfície (creme) | `#FFF8F0` |
| Tinta (texto e fundos escuros) | `#0B2B1F` |
| Texto secundário | `#5A6B63` |
| Palco do hero | `#D3EACB` |

## Tipografia
- Títulos: Nunito 700 e 800, com tracking negativo (`-.04em` a `-.055em`) e entrelinha curta (`.92` a `1`).
- Texto: Inter 400 e 600.

## Forma e espaço
- Botões e chips em pílula (`rounded-full`). Cards de 2rem a 3xl. Telefones com moldura `#0B2B1F` e raio de 2,6rem.
- Largura máxima de 1320 px, gutters de 20 px (mobile) a 40 px (desktop).

## Padrões do site (`fechouocarrinho-next`)
Seguem o método do Nexuro com a marca própria: hero com palco colorido e chips flutuantes, simulador que funciona na
página, tabela "o que cada um responde", tour com as telas reais e passos em zigue-zague sobre fundo escuro.

## Vídeo
Mesmos tokens em `motion/src/lib/brand.ts`. Telas reais do app, valores coerentes com a tela mostrada, uma ideia por cena.

## Movimento
Chegada suave (`cubic-bezier(.16,1,.3,1)`), pressão de botão com escala 0,97 e sem animação só de enfeite.
Pendência: o site ainda não trata `prefers-reduced-motion`.

## Ativos e acessibilidade
Logos, ícones e banners em `materiais/04-marca/`. Meta: contraste 4,5:1 no texto comum e alvos de toque de pelo menos 48 px
(ainda não auditado).
