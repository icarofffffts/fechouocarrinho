import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — Fechou o Carrinho",
  description: "Política de Privacidade do Fechou o Carrinho — como tratamos seus dados com base na LGPD e nosso princípio 100% offline e local-first.",
  alternates: {
    canonical: "https://fechouocarrinho.site/privacidade",
  },
};

export default function PrivacidadePage() {
  return (
    <div className="bg-[#FFF8F0] min-h-screen text-[#111827]">
      {/* Topbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-zinc-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-[#1B8C42] flex items-center justify-center text-white shadow-sm shadow-[#1B8C42]/20 transition-transform group-hover:scale-105">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5l10 -10"/>
              </svg>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#111827]" style={{ fontFamily: "var(--font-nunito)" }}>
              fechou o carrinho
            </span>
          </a>
          <a
            href="/"
            className="text-xs sm:text-sm font-semibold text-zinc-600 hover:text-[#1B8C42] px-3.5 py-1.5 rounded-full border border-zinc-200 hover:border-[#1B8C42]/40 bg-white transition-colors"
          >
            ← Voltar ao site
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[820px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1B8C42] mb-2.5">
            Documento Legal
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.12]"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Política de Privacidade
          </h1>
          <p className="text-zinc-500 text-sm mt-3">
            Última atualização: 21 de outubro de 2026 · Versão 1.0
          </p>
        </div>

        {/* Card Principal */}
        <article className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-10 shadow-sm shadow-zinc-900/5 space-y-8 text-zinc-700 leading-relaxed text-[15px]">
          {/* Índice / Nesta página */}
          <nav className="bg-[#F8FAF9] border border-zinc-200/80 rounded-2xl p-5 sm:p-6" aria-label="Índice da página">
            <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
              Nesta página
            </p>
            <ol className="grid sm:grid-cols-2 gap-y-1.5 gap-x-6 text-sm text-zinc-600 list-decimal pl-5">
              <li><a href="#quem-somos" className="hover:text-[#1B8C42] hover:underline">Quem somos</a></li>
              <li><a href="#principio" className="hover:text-[#1B8C42] hover:underline">Nosso princípio: 100% offline</a></li>
              <li><a href="#camera" className="hover:text-[#1B8C42] hover:underline">Uso da Câmera (Leitor OCR)</a></li>
              <li><a href="#dados" className="hover:text-[#1B8C42] hover:underline">Quais dados tratamos</a></li>
              <li><a href="#finalidades" className="hover:text-[#1B8C42] hover:underline">Finalidades e bases legais (LGPD)</a></li>
              <li><a href="#compartilhamento" className="hover:text-[#1B8C42] hover:underline">Com quem compartilhamos</a></li>
              <li><a href="#retencao" className="hover:text-[#1B8C42] hover:underline">Retenção de dados</a></li>
              <li><a href="#direitos" className="hover:text-[#1B8C42] hover:underline">Seus direitos (LGPD)</a></li>
              <li><a href="#seguranca" className="hover:text-[#1B8C42] hover:underline">Segurança</a></li>
              <li><a href="#criancas" className="hover:text-[#1B8C42] hover:underline">Crianças e adolescentes</a></li>
              <li><a href="#cookies" className="hover:text-[#1B8C42] hover:underline">Cookies e site</a></li>
              <li><a href="#alteracoes" className="hover:text-[#1B8C42] hover:underline">Alterações desta política</a></li>
              <li><a href="#contato" className="hover:text-[#1B8C42] hover:underline">Contato e Encarregado (DPO)</a></li>
            </ol>
          </nav>

          {/* 1. Quem somos */}
          <section id="quem-somos" className="pt-2">
            <h2 className="text-xl font-bold text-[#111827] mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-nunito)" }}>
              1. Quem somos
            </h2>
            <p>
              O <strong>Fechou o Carrinho</strong> (<code className="text-xs bg-zinc-100 text-zinc-800 px-1.5 py-0.5 rounded font-mono">com.fechouocarrinho.app</code>) é um aplicativo para Android criado para ajudar consumidores a controlar seus gastos no supermercado em tempo real, somando valores e evitando surpresas no caixa.
            </p>
            <p className="mt-2.5">
              Para fins da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD), atuamos como <strong>controlador</strong> dos dados pessoais tratados no aplicativo móvel e no site oficial <a href="https://fechouocarrinho.site" className="text-[#1B8C42] font-medium underline underline-offset-2">fechouocarrinho.site</a>.
            </p>
          </section>

          <hr className="border-zinc-100" />

          {/* 2. Princípio Offline e Local-First */}
          <section id="principio">
            <h2 className="text-xl font-bold text-[#111827] mb-3" style={{ fontFamily: "var(--font-nunito)" }}>
              2. Nosso princípio: 100% Offline e Local-First (Guest-First)
            </h2>
            <p>
              O Fechou o Carrinho foi projetado e desenvolvido segundo o princípio <strong>local-first</strong>: o aplicativo é totalmente utilizável de forma anônima e sem qualquer necessidade de cadastro, criação de conta ou conexão à internet.
            </p>
            <p className="mt-2.5">
              Seus itens adicionados, preços registrados, orçamentos definidos e histórico de compras ficam salvos <strong>exclusivamente na memória interna privada do seu aparelho</strong> (através de banco de dados SQLite / Android Room protegido pela sandbox do sistema operacional). A maior parte das suas compras nunca sai do seu celular.
            </p>
          </section>

          <hr className="border-zinc-100" />

          {/* 3. Uso da Câmera */}
          <section id="camera">
            <h2 className="text-xl font-bold text-[#111827] mb-3" style={{ fontFamily: "var(--font-nunito)" }}>
              3. Uso da Câmera (Leitor de Preços com OCR Inteligente)
            </h2>
            <p>
              Para proporcionar agilidade nas compras, o aplicativo solicita a permissão de câmera (<code className="text-xs bg-zinc-100 text-zinc-800 px-1.5 py-0.5 rounded font-mono">android.permission.CAMERA</code>). As regras estritas de uso são:
            </p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>
                <strong>Finalidade exclusiva:</strong> O enquadramento em tempo real de etiquetas de preço de gôndolas e prateleiras para leitura do valor numérico dos produtos.
              </li>
              <li>
                <strong>Processamento 100% no aparelho (on-device):</strong> O reconhecimento de caracteres (OCR) é executado localmente pelo kit de visão computacional (Google ML Kit Text Recognition), operando inteiramente sem envio para a nuvem.
              </li>
              <li>
                <strong>Sem gravação, sem fotos e sem upload:</strong> O aplicativo <strong>não tira fotos, não salva vídeos e não grava imagens do ambiente</strong>. Cada quadro da câmera é mantido apenas em memória volátil temporária (RAM) durante a fração de segundo necessária para o cálculo do OCR e é descartado imediatamente.
              </li>
            </ul>
          </section>

          <hr className="border-zinc-100" />

          {/* 4. Quais dados tratamos */}
          <section id="dados">
            <h2 className="text-xl font-bold text-[#111827] mb-3" style={{ fontFamily: "var(--font-nunito)" }}>
              4. Quais dados tratamos
            </h2>

            <div className="space-y-4 mt-3">
              <div>
                <h3 className="font-semibold text-zinc-900 text-base">4.1 Dados de compras e listas</h3>
                <p className="mt-1">
                  Nomes de produtos, quantidades, preços unitários, descontos e supermercados selecionados. Esses dados são mantidos localmente no seu dispositivo.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-zinc-900 text-base">4.2 Dados de conta (Sincronização opcional)</h3>
                <p className="mt-1">
                  Se você optar voluntariamente por criar uma conta para sincronizar compras entre dispositivos da família: coletamos apenas o seu endereço de <strong>e-mail</strong> e credencial de autenticação criptografada.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-zinc-900 text-base">4.3 Dados técnicos e diagnóstico de falhas</h3>
                <p className="mt-1">
                  Modelo do aparelho, versão do sistema operacional Android, logs de erros e falhas técnicas (Crashlytics). Esses dados são agregados de forma anônima e não contêm qualquer identificador financeiro ou dados pessoais de compras.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-zinc-100" />

          {/* 5. Finalidades e bases legais */}
          <section id="finalidades">
            <h2 className="text-xl font-bold text-[#111827] mb-3" style={{ fontFamily: "var(--font-nunito)" }}>
              5. Para que usamos e com qual base legal (LGPD)
            </h2>
            <p className="mb-4">
              Todo tratamento de dados realizado pelo Fechou o Carrinho tem fundamento em uma das bases legais da Lei Geral de Proteção de Dados (Lei 13.709/2018):
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F8FAF9] border-b border-zinc-200">
                    <th className="py-2.5 px-3 font-bold text-zinc-900">Finalidade</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900">Base Legal (LGPD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  <tr>
                    <td className="py-3 px-3">Cálculo de compras e soma de carrinho em tempo real</td>
                    <td className="py-3 px-3 text-zinc-600">Execução de contrato / Solicitação do titular (Art. 7º, V)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3">Leitura ótica de preços via câmera (OCR)</td>
                    <td className="py-3 px-3 text-zinc-600">Consentimento ao conceder a permissão (Art. 7º, I)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3">Sincronização de listas na nuvem (quando ativada)</td>
                    <td className="py-3 px-3 text-zinc-600">Execução de contrato (Art. 7º, V)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3">Diagnóstico de falhas, bugs e estabilidade do app</td>
                    <td className="py-3 px-3 text-zinc-600">Legítimo interesse (Art. 7º, IX)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3">Atendimento a dúvidas e solicitações de suporte</td>
                    <td className="py-3 px-3 text-zinc-600">Execução de contrato e legítimo interesse</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-sm text-[#166534]">
              <strong>Compromisso:</strong> O Fechou o Carrinho não comercializa, não aluga e não transfere seus hábitos de compra para anunciantes ou plataformas de marketing.
            </div>
          </section>

          <hr className="border-zinc-100" />

          {/* 6. Compartilhamento */}
          <section id="compartilhamento">
            <h2 className="text-xl font-bold text-[#111827] mb-3" style={{ fontFamily: "var(--font-nunito)" }}>
              6. Com quem compartilhamos dados
            </h2>
            <p className="mb-4">
              Não vendemos seus dados. O compartilhamento ocorre exclusivamente com os operadores técnicos estritamente necessários para a prestação dos serviços:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F8FAF9] border-b border-zinc-200">
                    <th className="py-2.5 px-3 font-bold text-zinc-900">Operador</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900">Finalidade</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900">Dados envolvidos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  <tr>
                    <td className="py-3 px-3 font-medium text-zinc-900">Google ML Kit</td>
                    <td className="py-3 px-3">Reconhecimento de texto da etiqueta</td>
                    <td className="py-3 px-3 text-zinc-600">Processamento local on-device (sem tráfego de dados)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-zinc-900">Google Play Services</td>
                    <td className="py-3 px-3">Distribuição, atualizações e integridade do app</td>
                    <td className="py-3 px-3 text-zinc-600">Identificador de instalação anônimo</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-zinc-900">Supabase (Opcional)</td>
                    <td className="py-3 px-3">Autenticação e sincronização familiar (se ativada)</td>
                    <td className="py-3 px-3 text-zinc-600">E-mail e itens da lista criptografados</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-zinc-900">Cloudflare</td>
                    <td className="py-3 px-3">Proteção contra ataques e CDN web</td>
                    <td className="py-3 px-3 text-zinc-600">IP de acesso à versão web</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-zinc-100" />

          {/* 7. Retenção */}
          <section id="retencao">
            <h2 className="text-xl font-bold text-[#111827] mb-3" style={{ fontFamily: "var(--font-nunito)" }}>
              7. Por quanto tempo guardamos os dados
            </h2>

            <div className="overflow-x-auto mt-3">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F8FAF9] border-b border-zinc-200">
                    <th className="py-2.5 px-3 font-bold text-zinc-900">Tipo de Dado</th>
                    <th className="py-2.5 px-3 font-bold text-zinc-900">Prazo de Retenção</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  <tr>
                    <td className="py-3 px-3">Dados de compras salvos no aparelho</td>
                    <td className="py-3 px-3 text-zinc-600">Até você limpar os dados do app ou desinstalá-lo</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3">Imagens processadas pela câmera</td>
                    <td className="py-3 px-3 text-zinc-600">Descartadas imediatamente após o milissegundo de leitura OCR</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3">Conta e listas sincronizadas na nuvem</td>
                    <td className="py-3 px-3 text-zinc-600">Enquanto a conta estiver ativa; eliminadas ao solicitar exclusão</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3">Mensagens e solicitações de suporte</td>
                    <td className="py-3 px-3 text-zinc-600">Até 12 meses após o encerramento do chamado</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-zinc-100" />

          {/* 8. Direitos do Titular */}
          <section id="direitos">
            <h2 className="text-xl font-bold text-[#111827] mb-3" style={{ fontFamily: "var(--font-nunito)" }}>
              8. Seus direitos como titular de dados (LGPD)
            </h2>
            <p>
              Conforme o Artigo 18 da LGPD, você tem direito a, a qualquer momento e mediante requisição:
            </p>
            <ul className="mt-3 space-y-1.5 list-disc pl-5">
              <li>Confirmar a existência de tratamento e acessar seus dados.</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
              <li>Solicitar a portabilidade dos seus dados para outro fornecedor de serviço.</li>
              <li>Eliminar dados tratados com base no seu consentimento.</li>
              <li>Revogar seu consentimento a qualquer momento.</li>
            </ul>

            <div className="mt-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-sm">
              <p className="font-semibold text-zinc-900">Como exercer seus direitos ou solicitar exclusão:</p>
              <p className="mt-1 text-zinc-600">
                Você pode apagar seus dados locais diretamente nas configurações do seu celular (<em>Configurações → Aplicativos → Fechou o Carrinho → Limpar Dados</em>). Para contas sincronizadas ou atendimento LGPD, basta enviar um e-mail para <a href="mailto:contato@fechouocarrinho.site" className="text-[#1B8C42] font-semibold underline">contato@fechouocarrinho.site</a>. Atendemos em até <strong>15 dias</strong>.
              </p>
            </div>
          </section>

          <hr className="border-zinc-100" />

          {/* 9. Segurança */}
          <section id="seguranca">
            <h2 className="text-xl font-bold text-[#111827] mb-3" style={{ fontFamily: "var(--font-nunito)" }}>
              9. Segurança da Informação
            </h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <strong>Comunicação Criptografada:</strong> Toda transmissão entre o site/app e servidores utiliza protocolos modernos HTTPS/TLS com certificados de alta segurança.
              </li>
              <li>
                <strong>Isolamento em Sandbox:</strong> O banco de dados SQLite local é confinado no ambiente protegido do sistema operacional Android, inacessível a outros aplicativos.
              </li>
              <li>
                <strong>Boas Práticas de Engenharia:</strong> Não armazenamos credenciais em texto puro e aplicamos criptografia nas camadas de persistência.
              </li>
            </ul>
          </section>

          <hr className="border-zinc-100" />

          {/* 10. Crianças e menores */}
          <section id="criancas">
            <h2 className="text-xl font-bold text-[#111827] mb-3" style={{ fontFamily: "var(--font-nunito)" }}>
              10. Crianças e menores de idade
            </h2>
            <p>
              O Fechou o Carrinho é uma ferramenta utilitária voltada para o público em geral e famílias para cálculo de compras em supermercados. O aplicativo não coleta intencionalmente dados de crianças ou adolescentes menores de 13 anos. Caso tome ciência de que coletou dados inadvertidamente, procederemos com a exclusão imediata.
            </p>
          </section>

          <hr className="border-zinc-100" />

          {/* 11. Cookies */}
          <section id="cookies">
            <h2 className="text-xl font-bold text-[#111827] mb-3" style={{ fontFamily: "var(--font-nunito)" }}>
              11. Cookies e navegação no site
            </h2>
            <p>
              Em nosso site (<a href="https://fechouocarrinho.site" className="text-[#1B8C42] underline">fechouocarrinho.site</a>), utilizamos apenas armazenamento local e cookies estritamente necessários para o funcionamento e cache do simulador de compras. <strong>Não utilizamos cookies espiões de rastreamento cross-site para publicidade direcionada.</strong>
            </p>
          </section>

          <hr className="border-zinc-100" />

          {/* 12. Alterações */}
          <section id="alteracoes">
            <h2 className="text-xl font-bold text-[#111827] mb-3" style={{ fontFamily: "var(--font-nunito)" }}>
              12. Alterações desta Política de Privacidade
            </h2>
            <p>
              Esta política poderá ser atualizada periodicamente para refletir evoluções do aplicativo ou atualizações legais. A data da última versão sempre será exibida no cabeçalho deste documento. Recomendamos a consulta periódica desta página.
            </p>
          </section>

          <hr className="border-zinc-100" />

          {/* 13. Contato e DPO */}
          <section id="contato">
            <h2 className="text-xl font-bold text-[#111827] mb-3" style={{ fontFamily: "var(--font-nunito)" }}>
              13. Contato e Encarregado de Dados (DPO)
            </h2>
            <p>
              Caso tenha qualquer dúvida, solicitação ou sugestão relacionada à proteção de dados e à sua privacidade, entre em contato diretamente com nossa equipe:
            </p>
            <div className="mt-4 p-5 rounded-2xl bg-[#F8FAF9] border border-zinc-200/90 space-y-1.5 text-sm">
              <p><strong>Encarregado de Proteção de Dados (DPO):</strong> Equipe de Privacidade Fechou o Carrinho</p>
              <p><strong>E-mail de Contato:</strong> <a href="mailto:contato@fechouocarrinho.site" className="text-[#1B8C42] font-semibold underline">contato@fechouocarrinho.site</a></p>
              <p><strong>Site Oficial:</strong> <a href="https://fechouocarrinho.site" className="text-[#1B8C42] underline">https://fechouocarrinho.site</a></p>
              <p className="pt-2 text-xs text-zinc-500">
                Você também tem o direito de acionar a Autoridade Nacional de Proteção de Dados (ANPD) através do portal <a href="https://www.gov.br/anpd/" target="_blank" rel="noopener noreferrer" className="underline">gov.br/anpd</a>.
              </p>
            </div>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 bg-white py-10 mt-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#1B8C42] flex items-center justify-center text-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12l5 5l10 -10"/>
              </svg>
            </div>
            <span>© 2026 Fechou o Carrinho · Todos os direitos reservados</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-[#1B8C42]">Início</a>
            <a href="/privacidade" className="text-[#1B8C42] font-semibold">Política de Privacidade</a>
            <a href="mailto:contato@fechouocarrinho.site" className="hover:text-[#1B8C42]">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
