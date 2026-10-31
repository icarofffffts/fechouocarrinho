# Handoff de Design: Suíte de 10 Telas do App Fechou o Carrinho

- **Autor:** Griffin Head Design (Floor Identidades Visuais)
- **Destinatário:** Tales Head Tech & Squads de Engenharia (Volt - Android Kotlin, Lumen - Next.js)
- **Status:** **APROVADO PELA DIRETORIA** (17/10/2026)
- **Commit Base:** `229fe7a` (Master Ground: `C:\Users\usuario\orca\projects\ScanList`)
- **Visualizador Interativo:** `materiais/04-marca/mockups/index.html` (Servidor local: `http://localhost:3333`)

---

## 1. Diretrizes Globais do Design System

1. **Zero Emojis:** Todos os símbolos e ações utilizam estritamente iconografia vetorial SVG limpa (sem caracteres unicode/emojis).
2. **Fotografia Real de Produtos:** Os itens de lista e reconhecimento visual utilizam fotografias reais em proporção 1:1 com bordas arredondadas (`clip-path` com raio de 8px). Localizadas em `materiais/04-marca/mockups/products/`.
3. **Cores Oficiais:**
   - Primária / Ação Positiva / Brand: `#1B8C42` (Verde Feira)
   - Secundária / Destaque / Alerta / Scanner: `#FF6B00` (Laranja Ação)
   - Background do App: `#FFF8F0` (Off-white aconchegante)
   - Superfícies / Cards: `#FFFFFF` com sombras suaves (`rgba(0,0,0,0.06)`)
   - Textos: `#111827` (Títulos e valores) e `#6B7280` (Legendas e metadados)
   - Bordas / Divisores: `#EAE5DC`
4. **Tipografia:**
   - Headings / Números / Destaques: `Nunito` (Bold / ExtraBold 700/800)
   - Corpo / Formulários / UI: `Inter` (Regular / Medium / SemiBold 400/500/600)

---

## 2. Mapa das 10 Telas & Especificações para Implementação

### Tela 01: Home / Dashboard da Lista Ativa
- **Arquivo:** `materiais/04-marca/mockups/mockup_01_home_dashboard.svg`
- **Componentes-Chave:**
  - Header fixo com logo e status da conexão ("100% Offline").
  - Card de Orçamento Dinâmico: Valor gasto acumulado (`R$ 142,80`), Meta definida (`R$ 200,00`) e barra de progresso visual colorida.
  - Seções categorizadas: Mercearia, Laticínios, Hortifruti, etc.
  - Item da lista: Checkbox circular, miniatura com foto real do produto, nome, quantidade multiplicadora (`x4`), valor total e badge indicador de captura via OCR.
  - Bottom Navigation com Floating Action Button central em `#FF6B00` para abertura do Scanner.

### Tela 02: Scanner OCR de Preço na Gôndola
- **Arquivo:** `materiais/04-marca/mockups/mockup_02_scanner_ocr.svg`
- **Componentes-Chave:**
  - Viewfinder de câmera em tela cheia com cantos guias em `#1B8C42`.
  - Caixa delimitadora (Bounding Box) destacando o preço na etiqueta de gôndola em tempo real.
  - Miniatura do produto detectado (`Arroz Tio João 5kg`).
  - Bottom sheet expansível: Confirmação de preço (`R$ 26,90`), ajuste de quantidade e botões "Confirmar Item" (verde) ou "Ajustar Preço".
  - Badge de segurança: "Processamento 100% Local (ML Kit Offline)".

### Tela 03: Carrinho Fechado (Total sem Sustos)
- **Arquivo:** `materiais/04-marca/mockups/mockup_03_carrinho_fechado.svg`
- **Componentes-Chave:**
  - Hero card de celebração com ilustração vetorial de check.
  - Grande display numérico: `R$ 189,40` (Total Calculado exato para conferência no caixa).
  - Pill de economia conquistada: `Economia de R$ 27,60` destacada.
  - Breakdown categorizado do carrinho.
  - Ações primárias: Botão de "Finalizar Compra" e botão secundário "Compartilhar Recibo".

### Tela 04: Comparador de Redes de Supermercados
- **Arquivo:** `materiais/04-marca/mockups/mockup_04_comparador_mercados.svg`
- **Componentes-Chave:**
  - Seletor do carrinho ativo.
  - Cards de redes concorrentes:
    - `Supermercados BH`: R$ 189,40 (Badge: Menor Preço da Região, 1.2 km).
    - `EPA Supermercados`: R$ 204,20 (+ R$ 14,80, 2.8 km).
    - `Mart Minas`: R$ 196,80 (+ R$ 7,40, 5.4 km).
  - Ação: "Calcular rota" / "Ver no mapa".

### Tela 05: Widgets Android para a Home Screen
- **Arquivo:** `materiais/04-marca/mockups/mockup_05_widgets_android.svg`
- **Especificação para Android (Glance / AppWidgetProvider):**
  - **Widget A (4×2 - Resumo de Orçamento):** Exibe total gasto, meta, barra de progresso visual e botão de atalho rápido para o Scanner.
  - **Widget B (4×3 - Lista Rápida Interativa):** Checkboxes clicáveis diretamente na tela inicial do Android, miniaturas dos produtos e contador de itens pendentes.
  - **Widget C (2×1 - Acesso Rápido OCR):** Botão de toque único em `#FF6B00` que inicializa a câmera diretamente em modo de reconhecimento de etiquetas.

### Tela 06: Aba de Gestão de Múltiplas Listas
- **Arquivo:** `materiais/04-marca/mockups/mockup_06_aba_listas.svg`
- **Componentes-Chave:**
  - Abas/Filtros: "Todas as Listas", "Ativas", "Arquivadas".
  - Cards de listas:
    - "Compras do Mês - Casa" (18/24 itens, R$ 189,40).
    - "Churrasco Fim de Semana" (6/12 itens, R$ 94,50).
    - "Hortifruti & Feira" (0/8 itens, R$ 0,00).
  - Indicador de progresso percentual por lista.
  - FAB fixo inferior direito "+ Nova Lista".

### Tela 07: Aba de Perfil Principal
- **Arquivo:** `materiais/04-marca/mockups/mockup_07_aba_perfil.svg`
- **Componentes-Chave:**
  - Header de identificação com avatar vetorial e tag "Plano Gratuito".
  - Banner em destaque com a métrica de impacto: "R$ 342,80 Economizados no total".
  - Menus navegáveis:
    - Meus Mercados Favoritos (com indicador de quantidade cadastrada).
    - Histórico de Compras.
    - Configurações do App & OCR.
    - Ajuda e Suporte.

### Tela 08: Opção de Perfil - Mercados Favoritos
- **Arquivo:** `materiais/04-marca/mockups/mockup_08_perfil_mercados.svg`
- **Componentes-Chave:**
  - Controle de raio de busca por geolocalização (Slider de distância em km: 1km a 20km).
  - Lista de supermercados cadastrados com toggle de "Mercado Padrão".
  - Adição de novos estabelecimentos por proximidade ou busca de CEP.

### Tela 09: Opção de Perfil - Histórico de Compras
- **Arquivo:** `materiais/04-marca/mockups/mockup_09_perfil_historico.svg`
- **Componentes-Chave:**
  - Linha do tempo agrupada por mês.
  - Cards de compras finalizadas com data, supermercado visitado, total pago e economia apurada.
  - Botão para visualizar comprovante detalhado ou duplicar lista para uma nova compra.

### Tela 10: Opção de Perfil - Configurações & OCR
- **Arquivo:** `materiais/04-marca/mockups/mockup_10_perfil_configuracoes.svg`
- **Componentes-Chave:**
  - Switches / Toggles:
    - "Modo 100% Offline": Garante que nenhum dado transite fora do dispositivo.
    - "Bip Sonoro de Confirmação": Retorno de áudio na detecção de preço.
    - "Flash Automático na Câmera": Para ambientes de pouca luminosidade nas prateleiras.
  - Seção de Backup:
    - "Exportar backup (JSON)": Salva todas as listas e histórico em arquivo local.
    - "Importar backup (JSON)": Restaura listas a partir de arquivo.
  - Link para Política de Privacidade e Termos de Uso.

---

## 3. Próximas Ações das Squads

1. **Squad Android (Volt / Tales):**
   - Criar as telas equivalentes no módulo `fechouocarrinho-android/` utilizando Jetpack Compose, Material 3 e tokens de design.
   - Criar os 3 widgets utilizando Android Glance (`androidx.glance:glance-appwidget`).
   - Conectar o pipeline de ML Kit Text Recognition para o scanner de gôndola.
2. **Squad Web (Lumen / Tales):**
   - Atualizar a Landing Page Next.js no módulo `fechouocarrinho-next/` substituindo placeholders antigos pelas telas oficiais renderizadas do visualizador.
