# Play Store — pacote de publicação (Fechou o Carrinho)

Versão do pacote: **1.0.10 / versionCode 11** · `com.fechouocarrinho.app` · minSdk 24 · targetSdk 36
AAB assinado: `app-release-1.0.10.aab` (certificado de upload `FECHOU-U`)

## Arquivos prontos

| Item | Arquivo | Especificação |
|---|---|---|
| App bundle | `app-release-1.0.10.aab` | assinado, versionCode 11 |
| Ícone | `icon-512x512.png` | 512×512 |
| Gráfico de destaque | `feature-graphic-1024x500.png` | 1024×500 |
| Capturas de celular | `screens/screenshot-1..5-1080x1920.png` | 1080×1920 (9:16), 5 arquivos |

Capturas geradas a partir das telas atuais do app por `scripts/build-store-screenshots.cjs`
(rode de novo sempre que a UI mudar).

## Ficha da loja

**Nome do app (30)** — 17 caracteres
```
Fechou o Carrinho
```

**Descrição curta (80)** — 74 caracteres
```
Controle o total da compra em tempo real enquanto você enche o carrinho.
```

**Descrição completa (4000)**
```
O Fechou o Carrinho acaba com o susto no caixa. Escaneie a etiqueta de preço e veja o total da sua compra subir em tempo real, item por item, antes de chegar ao caixa.

CONTROLE O TOTAL EM TEMPO REAL
Aponte a câmera para a etiqueta e o preço entra na lista automaticamente. O app soma tudo na hora, com quantidade e preço unitário, para você saber exatamente quanto vai pagar.

DEFINA UM ORÇAMENTO
Estabeleça uma meta de gasto e acompanhe quanto ainda falta. A barra de progresso mostra o ritmo da compra, e o app avisa quando o valor está chegando no limite.

PLANEJE A LISTA ANTES DE SAIR DE CASA
Crie listas por ocasião — compras da semana, churrasco, limpeza — e adicione itens manualmente, com quantidade e preço opcional. No mercado, basta informar o preço de cada item planejado.

COMPARE ENTRE MERCADOS
Escaneou o mesmo produto em redes diferentes? O comparador mostra o total da sua lista em cada mercado, para você decidir onde vale mais a pena comprar.

FUNCIONA OFFLINE
Suas listas e preços ficam no próprio aparelho. Você pode usar o app no mercado mesmo sem internet.

RECIBO PRONTO
Ao finalizar, o app gera o resumo da compra com total, itens e divisão por categoria, pronto para compartilhar.

PRIVACIDADE EM PRIMEIRO LUGAR
Não é preciso criar conta para usar o app. Nenhuma foto é enviada para servidores: o reconhecimento da etiqueta acontece no seu aparelho. Sem anúncios e sem rastreamento.

Baixe o Fechou o Carrinho e faça as compras com o total na mão.
```

**Categoria:** Compras · **Tags:** lista de compras, supermercado, orçamento
**E-mail de contato:** (preencher com o e-mail do desenvolvedor)
**Política de privacidade:** https://fechouocarrinho.site/privacidade (no ar, HTTP 200)

## Segurança dos dados (formulário Data Safety)

Respostas verificadas no código do app (manifest + chamadas de rede):

| Pergunta | Resposta |
|---|---|
| O app coleta ou compartilha dados? | Coleta apenas **e-mail**, e só se a pessoa criar conta |
| E-mail | Coletado · finalidade: gerenciamento de conta · opcional · não compartilhado |
| Localização | Não coleta |
| Contatos, SMS, chamadas | Não coleta |
| Fotos e vídeos | Não coleta — a câmera é usada no aparelho, nenhuma imagem é enviada |
| Histórico de compras / financeiro | Não coleta dados de cartão ou pagamento |
| Preços escaneados | Enviados ao servidor **só quando a pessoa toca em "Sincronizar"**; sem identificação do usuário, sem vínculo com a conta |
| Atividade no app | Não vinculada à identidade |
| Dados criptografados em trânsito | Sim (HTTPS/TLS) |
| Exclusão de dados | O usuário apaga tudo em Ajustes do Android → Aplicativos → Armazenamento; conta por solicitação no e-mail de contato |
| Publicidade / rastreamento | Nenhum |

Permissões declaradas: `CAMERA`, `INTERNET`, `ACCESS_NETWORK_STATE` (câmera opcional).

## Classificação de conteúdo

Questionário IARC: sem violência, sexo, linguagem imprópria, drogas, jogos de azar, compras digitais,
compartilhamento de localização ou interação entre usuários. Resultado esperado: **Livre**.

## Passo a passo no Play Console (só você pode executar)

1. Criar o app em **Todos os apps → Criar app**: nome `Fechou o Carrinho`, idioma padrão Português (Brasil), tipo App, gratuito.
2. **Teste interno → Criar nova versão**: enviar `app-release-1.0.10.aab`.
3. **Presença na loja**: colar nome, descrição curta e completa; enviar ícone 512, gráfico 1024×500 e as 5 capturas de `screens/`.
4. **Política do app → Segurança dos dados**: preencher com a tabela acima.
5. **Classificação de conteúdo**: responder o questionário IARC.
6. **Configuração do app**: categoria Compras, e-mail de contato, política de privacidade.
7. **Países/regiões**: Brasil (ou todos).
8. Validar no teste interno em aparelho real → promover para produção.

## Pendências técnicas fora desta pasta

- Login Google: precisa do OAuth Client ID (Android) no Google Cloud + provider habilitado no Supabase.
- Sincronização familiar: precisa rodar `backend/supabase_family_sync.sql` no Supabase (RLS/grants). Enquanto isso, o app avisa que o recurso não está ativo.
- Chave de upload: manter `keystore` e senha fora do Git (o AAB só pode ser atualizado com o mesmo certificado).
