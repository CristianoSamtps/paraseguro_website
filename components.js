/* ──────────────────────────────────────────────────────────────
   PARASEGURO — componentes partilhados
   ──────────────────────────────────────────────────────────────
   Single source of truth para nav, footer, scroll-shield e chat.
   Cada página tem 4 slots vazios:
     <div id="scroll-shield-slot"></div>
     <div id="nav-slot"></div>
     <div id="footer-slot"></div>
     <div id="chat-slot"></div>
   E inclui:  <script src="components.js" defer></script>
              <script src="index.js" defer></script>

   Para alterar nav/footer/chat → muda só este ficheiro.
   ────────────────────────────────────────────────────────────── */


/* ═══════ SCROLL SHIELD ═══════ */
const SCROLL_SHIELD_HTML = `
  <aside class="scroll-shield" id="scrollShield" aria-hidden="true">
    <span class="scroll-shield-label scroll-shield-label-top">Sem<br>proteção</span>
    <div class="scroll-shield-track">
      <div class="scroll-shield-fill" id="scrollShieldFill"></div>
      <div class="scroll-shield-marker" id="scrollShieldMarker">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      </div>
    </div>
    <span class="scroll-shield-label scroll-shield-label-bottom">Protegido</span>
  </aside>
`;


/* ═══════ NAV ═══════ */
const NAV_HTML = `
  <nav class="nav">
    <div class="nav-inner">
      <div class="nav-brand">
        <div class="nav-logo">
          <h1><a href="index.html">PARASEGURO</a></h1>
        </div>
      </div>
      <ul class="nav-links">
        <li><a href="conceito.html">Conceito</a></li>
        <li><a href="observatorio.html">Observatório</a></li>
        <li><a href="#">Recrutamento</a></li>
      </ul>
      <div class="nav-actions">
        <a href="contacto.html" class="nav-assist" aria-label="Pedir assistência 24 horas">
          <svg class="nav-assist-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span class="nav-assist-text">Assistência <strong>24h</strong></span>
        </a>
        <a href="planos.html" class="nav-cta">ESCOLHE O TEU PARASEGURO</a>
      </div>
      <button class="nav-hamburger" id="navHamburger" aria-label="Abrir menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-mobile" id="navMobile">
      <ul class="nav-mobile-links">
        <li><a href="conceito.html">Conceito</a></li>
        <li><a href="observatorio.html">Observatório</a></li>
        <li><a href="#">Recrutamento</a></li>
      </ul>
      <div class="nav-mobile-actions">
        <a href="planos.html" class="nav-cta">ESCOLHE O TEU PARASEGURO</a>
        <a href="contacto.html" class="nav-assist nav-assist-mobile" aria-label="Pedir assistência 24 horas">
          <svg class="nav-assist-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span class="nav-assist-text">Assistência <strong>24h</strong></span>
        </a>
      </div>
    </div>
  </nav>
`;


/* ═══════ FOOTER ═══════ */
const FOOTER_HTML = `
  <footer>
    <div class="inner max-w">
      <div class="footer-top">
        <div class="footer-logo">
          <h1><a href="index.html">PARASEGURO</a></h1>
        </div>
        <button class="footer-scroll-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Voltar ao topo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      </div>

      <div class="footer-mid">
        <div class="footer-links">
        <a href="institucional.html">Institucional</a>
        <a href="conceito.html">Conceito</a>
          <a href="contacto.html">Contacto</a>
          <a href="#">Recrutamento</a>
        </div>
        <a href="contacto.html" class="footer-cta-btn">ACIONAR A MINHA ASSISTÊNCIA</a>
      </div>

      <div class="footer-social">
        <a href="#" class="footer-social-icon" aria-label="Facebook">
          <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
        </a>
        <a href="#" class="footer-social-icon" aria-label="Instagram">
          <svg viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a href="#" class="footer-social-icon" aria-label="TikTok">
          <svg viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.12a8.16 8.16 0 0 0 4.77 1.52V7.22a4.85 4.85 0 0 1-1-.53z" />
          </svg>
        </a>
      </div>

      <hr class="footer-divider">

      <div class="footer-bottom">
        <div class="footer-bottom-left">
          <div class="footer-legal-links">
            <a href="termos-condicoes.html">Termos e Condições</a>
            <a href="observatorio.html">Observatório</a>
            <a href="provedoria.html">Provedoria</a>
            <a href="https://paraseguro.pt/data/fotos/diferendos_de_consumo.jpg">Diferendos de Consumo</a>
            <a href="http://livroreclamacoes.pt/Inicio/">Livro de Reclamações</a>
            <a href="parceiros.html">Parceiros</a>
          </div>
          <div class="footer-copy">2026 © PARASEGURO. Todos os direitos reservados.</div>
        </div>
        <div class="footer-gsb">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <div class="footer-gsb-text">
            <span class="gsb-brand">Google</span>
            <span class="gsb-sub">Safe Browsing</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
`;


/* ═══════ CHAT WIDGET ═══════ */
const CHAT_HTML = `
  <aside class="chat-widget" id="chatWidget">
    <button class="chat-bubble" id="chatBubble" aria-label="Abrir conversa" aria-expanded="false">
      <svg class="chat-bubble-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <span class="chat-bubble-label">Ajuda?</span>
    </button>

    <div class="chat-panel" id="chatPanel" role="dialog" aria-labelledby="chatTitle" aria-hidden="true">
      <header class="chat-header">
        <div class="chat-header-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <div class="chat-header-text">
          <span class="chat-eyebrow">Equipa paraseguro</span>
          <h3 class="chat-title" id="chatTitle">Olá! Precisas de ajuda antes de aderir?</h3>
        </div>
        <button class="chat-close" id="chatClose" aria-label="Fechar conversa">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
      </header>

      <form class="chat-form" id="chatForm">
        <label class="chat-field">
          <span class="chat-field-label">Nome</span>
          <input type="text" name="nome" placeholder="O teu nome" required>
        </label>
        <label class="chat-field">
          <span class="chat-field-label">Telefone</span>
          <input type="tel" name="telefone" placeholder="9XX XXX XXX" required>
        </label>
        <label class="chat-check">
          <input type="checkbox" required>
          <span>Concordo com os <a href="termos-condicoes.html">termos e condições</a> de uso.</span>
        </label>
        <button type="submit" class="chat-submit">
          <span>Quero ser contactado</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </form>
    </div>
  </aside>
`;


/* ═══════ INJECÇÃO ═══════
   Substitui cada slot pelo HTML correspondente.
   Corre antes do index.js (script com defer, ordem importa). */

function injectSlot(slotId, html) {
  const slot = document.getElementById(slotId);
  if (slot) slot.outerHTML = html;
}

injectSlot('scroll-shield-slot', SCROLL_SHIELD_HTML);
injectSlot('nav-slot', NAV_HTML);
injectSlot('footer-slot', FOOTER_HTML);
injectSlot('chat-slot', CHAT_HTML);
