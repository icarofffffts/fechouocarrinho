export default function Privacidade() {
  return (
    <div className="bg-[#FFF8F0] min-h-screen">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1B8C42] flex items-center justify-center text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M5 12l5 5l10 -10"/>
              </svg>
            </div>
            <span className="font-display font-extrabold text-xl" style={{ fontFamily: "var(--font-nunito)" }}>
              fechou o carrinho
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="/como-funciona" className="hover:text-[#1B8C42]">Como funciona</a>
            <a href="/supermercados" className="hover:text-[#1B8C42]">Supermercados</a>
            <a href="/ajuda" className="hover:text-[#1B8C42]">Ajuda</a>
            <a href="/#baixar" className="bg-[#111827] text-white px-5 py-2.5 rounded-full font-semibold">Baixar App</a>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <a href="/" className="text-sm font-medium text-zinc-600 hover:text-[#111827] inline-flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Voltar para o início
        </a>

        <h1 className="font-display font-extrabold text-4xl mt-4" style={{ fontFamily: "var(--font-nunito)" }}>
          Política de Privacidade
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Última atualização: 20 de outubro de 2026</p>

        <div className="mt-8 bg-white border border-zinc-200 rounded-3xl p-8 space-y-6 text-zinc-700 leading-relaxed text-sm">
          <section>
            <h2 className="text-base font-bold text-zinc-900 mb-2 font-display" style={{ fontFamily: "var(--font-nunito)" }}>
              1. Princípio Guest-First e Funcionamento Offline
            </h2>
            <p>
              O aplicativo <strong>Fechou o Carrinho</strong> foi projetado para funcionar prioritariamente de forma <strong>100% offline</strong> e sem exigência de cadastro prévio. Você pode utilizar todas as funções principais de cálculo de compras, orçamento e leitor de etiquetas sem fornecer nome, e-mail, telefone ou qualquer documento pessoal.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 mb-2 font-display" style={{ fontFamily: "var(--font-nunito)" }}>
              2. Uso da Câmera (Leitor de Preços / OCR)
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Finalidade estrita:</strong> A permissão de câmera (<code className="bg-zinc-100 px-1 py-0.5 rounded text-xs">CAMERA</code>) é solicitada exclusivamente para que o leitor possa enquadrar etiquetas de preço e reconhecer o valor numérico via inteligência visual (Google ML Kit).</li>
              <li><strong>Processamento local (on-device):</strong> Todo o reconhecimento ocorre inteiramente no aparelho físico.</li>
              <li><strong>Sem gravação ou envio de fotos:</strong> O aplicativo <strong>não grava, não armazena fotos do ambiente nem envia imagens para servidores externos</strong>. Os quadros da câmera são processados na memória temporária e imediatamente descartados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 mb-2 font-display" style={{ fontFamily: "var(--font-nunito)" }}>
              3. Armazenamento de Dados Locais
            </h2>
            <p>
              Os itens adicionados, preços registrados, listas de compras e recibos gerados são salvos em um banco de dados local seguro no próprio dispositivo do usuário (Android Room / SQLite). Esses dados não são transferidos a terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 mb-2 font-display" style={{ fontFamily: "var(--font-nunito)" }}>
              4. Sincronização Familiar e Contas (Opcional)
            </h2>
            <p>
              Caso o usuário opte voluntariamente por criar uma conta para sincronizar listas entre membros da família:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Coletamos apenas o endereço de e-mail e credenciais de autenticação fornecidas.</li>
              <li>A comunicação com nossos servidores é 100% criptografada via HTTPS/TLS.</li>
              <li>O usuário pode solicitar a exclusão completa de sua conta e dados a qualquer momento diretamente pelo aplicativo ou por e-mail.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 mb-2 font-display" style={{ fontFamily: "var(--font-nunito)" }}>
              5. Compartilhamento de Informações
            </h2>
            <p>
              O aplicativo <strong>não vende, não aluga e não compartilha</strong> dados pessoais ou histórico de compras com terceiros, agências de publicidade ou intermediários de marketing. O compartilhamento de recibos (por exemplo, via WhatsApp) é acionado de forma estritamente voluntária pelo próprio usuário via o menu padrão do Android (Sharesheet).
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 mb-2 font-display" style={{ fontFamily: "var(--font-nunito)" }}>
              6. Anúncios
            </h2>
            <p>
              O Fechou o Carrinho <strong>não exibe anúncios de redes de terceiros</strong> e não utiliza rastreadores de publicidade comportamental.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 mb-2 font-display" style={{ fontFamily: "var(--font-nunito)" }}>
              7. Contato e Exclusão de Dados
            </h2>
            <p>
              Para dúvidas sobre esta política, exercer seus direitos da LGPD ou solicitar a exclusão de dados de sincronização, entre em contato através do e-mail oficial:
            </p>
            <p className="mt-2">
              <a href="mailto:contato@fechouocarrinho.site" className="text-[#1B8C42] font-semibold underline">
                contato@fechouocarrinho.site
              </a>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-zinc-200 py-8 bg-white mt-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-4 text-sm text-zinc-500">
          <span>© 2026 Fechou o Carrinho — Todos os direitos reservados</span>
          <div className="flex gap-6">
            <a href="/privacidade" className="text-[#1B8C42] font-semibold">Política de Privacidade</a>
            <a href="mailto:contato@fechouocarrinho.site" className="hover:underline">contato@fechouocarrinho.site</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
