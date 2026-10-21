# Política de Privacidade — Fechou o Carrinho

**Última atualização:** 21 de outubro de 2026 · Versão 1.0  
**URL Oficial:** [https://fechouocarrinho.site/privacidade](https://fechouocarrinho.site/privacidade)

O **Fechou o Carrinho** (`com.fechouocarrinho.app`) é um aplicativo para Android desenvolvido para ajudar consumidores e famílias a controlar seus gastos no supermercado em tempo real, calculando a soma dos produtos e prevenindo surpresas no caixa.

Para os fins da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD), atuamos como **controlador** dos dados pessoais descritos neste documento.

---

## 1. Nosso Princípio: 100% Offline e Local-First (Guest-First)

O Fechou o Carrinho foi projetado e construído sob a premissa **local-first**:
- O aplicativo funciona prioritariamente de forma **anônima** e sem exigir criação de conta, login, fornecimento de e-mail ou dados pessoais.
- Todos os itens adicionados, preços registrados, limites de orçamento e histórico de compras ficam salvos **exclusivamente na memória interna privada do seu aparelho** (banco de dados SQLite / Android Room protegido pela sandbox do sistema operacional).
- O app opera com funcionalidade total mesmo sem conexão com a internet. Os seus dados de compras não saem do seu celular.

---

## 2. Uso da Câmera (Leitor de Preços com OCR Inteligente)

Para permitir agilidade ao registrar produtos nas gôndolas, o aplicativo solicita a permissão `android.permission.CAMERA`:

- **Finalidade estrita:** O enquadramento em tempo real de etiquetas de preço e prateleiras para leitura do valor numérico dos produtos.
- **Processamento 100% no aparelho (on-device):** O reconhecimento ótico de caracteres (OCR) é executado localmente pelo kit de visão computacional (Google ML Kit Text Recognition), operando inteiramente no dispositivo e sem enviar dados para a nuvem.
- **Sem gravação, sem fotos e sem upload:** O aplicativo **não grava vídeos, não tira fotos e não armazena fotos do ambiente**. A imagem da câmera é mantida na memória volátil (RAM) temporária apenas durante a fração de segundo necessária para extração do valor e é imediatamente descartada.

---

## 3. Quais dados tratamos

### 3.1 Dados de compras e listas
Nomes de itens, quantidades, preços unitários, descontos aplicados e supermercados selecionados. Esses dados são armazenados localmente no seu dispositivo.

### 3.2 Dados de conta (Sincronização opcional)
Caso opte voluntariamente no futuro por ativar a sincronização na nuvem para compartilhar listas com membros da família: coletamos unicamente o endereço de **e-mail** e a credencial de acesso criptografada.

### 3.3 Dados técnicos e diagnóstico de falhas
Modelo do smartphone, versão do Android e relatórios anônimos de erro e estabilidade do app (Crashlytics), sem qualquer conteúdo pessoal ou histórico financeiro.

---

## 4. Finalidades e bases legais (LGPD)

| Finalidade | Base Legal (LGPD) |
| :--- | :--- |
| Cálculo de compras e soma em tempo real | Execução de contrato / Solicitação do titular (Art. 7º, V) |
| Leitura ótica de preços via câmera (OCR) | Consentimento ao conceder a permissão (Art. 7º, I) |
| Sincronização de listas na nuvem (quando ativada) | Execução de contrato (Art. 7º, V) |
| Diagnóstico de estabilidade e correção de falhas | Legítimo interesse (Art. 7º, IX) |
| Atendimento a dúvidas e suporte | Execução de contrato e legítimo interesse |

> **Compromisso:** Não usamos seus dados de compras para publicidade direcionada, formação de perfil comportamental ou venda a terceiros.

---

## 5. Com quem compartilhamos

Não comercializamos nem alugamos informações pessoais. O compartilhamento ocorre exclusivamente com operadores de infraestrutura técnica sob estrito dever de sigilo:

| Operador | Finalidade | Dados Envolvidos |
| :--- | :--- | :--- |
| **Google ML Kit** | Leitura de preços na etiqueta | Processamento local on-device (sem tráfego de dados) |
| **Google Play Services** | Distribuição, integridade e atualizações | Identificador anônimo de instalação |
| **Supabase (Opcional)** | Autenticação e sincronização (se ativada) | E-mail e listas criptografadas |
| **Cloudflare** | Proteção de rede e CDN web | Endereço IP na navegação do site |

---

## 6. Retenção e Exclusão de Dados

| Tipo de Dado | Prazo de Retenção |
| :--- | :--- |
| **Dados salvos no aparelho** | Até você limpar os dados do app ou desinstalá-lo |
| **Quadros da câmera (OCR)** | Descartados imediatamente no milissegundo da leitura |
| **Conta na nuvem (se criada)** | Mantida enquanto a conta existir; removida ao solicitar exclusão |
| **Mensagens de suporte** | Até 12 meses após a conclusão do atendimento |

---

## 7. Seus direitos como titular (LGPD)

Conforme a LGPD (Lei nº 13.709/2018), você pode a qualquer momento:
- Confirmar a existência de tratamento e acessar seus dados.
- Corrigir dados incompletos, inexatos ou desatualizados.
- Solicitar a eliminação, anonimização ou bloqueio de dados.
- Solicitar a portabilidade dos dados.
- Revogar o consentimento concedido.

Para apagar todos os dados locais: basta acessar *Configurações do Android → Aplicativos → Fechou o Carrinho → Armazenamento → Limpar Dados*. Para contas sincronizadas ou solicitações legais, envie e-mail para **contato@fechouocarrinho.site**. Respondemos em até **15 dias**.

---

## 8. Segurança da Informação

- Tráfego protegido por criptografia de ponta a ponta com **HTTPS/TLS**.
- Banco de dados local confinado na sandbox de segurança do Android (inacessível a outros apps).
- Ausência de rastreadores invasivos de terceiros.

---

## 9. Contato e Encarregado (DPO)

- **E-mail Oficial:** [contato@fechouocarrinho.site](mailto:contato@fechouocarrinho.site)
- **Site:** [https://fechouocarrinho.site](https://fechouocarrinho.site)
- **ANPD:** [gov.br/anpd](https://www.gov.br/anpd/)
