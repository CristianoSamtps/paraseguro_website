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
      <ul class="nav-links" role="list">
        <li><a href="index.html" data-nav-key="index">Início</a></li>
        <li><a href="conceito.html" data-nav-key="conceito">Conceito</a></li>
        <li class="nav-has-submenu">
          <a href="observatorio.html" data-nav-key="observatorio" aria-haspopup="true" aria-expanded="false">
            <span>Observatório</span>
            <svg class="nav-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
          <ul class="nav-submenu" role="menu">
            <li><a href="observatorio.html#imprensa" role="menuitem">
              <span class="nav-sub-num">01</span>
              <span class="nav-sub-text">
                <strong>Imprensa & Análises</strong>
                <em>Relatórios, artigos, casos</em>
              </span>
            </a></li>
            <li><a href="observatorio.html#historias" role="menuitem">
              <span class="nav-sub-num">02</span>
              <span class="nav-sub-text">
                <strong>Histórias da comunidade</strong>
                <em>Testemunhos reais em vídeo</em>
              </span>
            </a></li>
            <li><a href="observatorio.html#partilhar" role="menuitem">
              <span class="nav-sub-num">03</span>
              <span class="nav-sub-text">
                <strong>Partilha a tua história</strong>
                <em>Submete um testemunho</em>
              </span>
            </a></li>
          </ul>
        </li>
        <li><a href="#" data-nav-key="recrutamento">Recrutamento</a></li>
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
        <li><a href="index.html" data-nav-key="index">Início</a></li>
        <li><a href="conceito.html" data-nav-key="conceito">Conceito</a></li>
        <li><a href="observatorio.html" data-nav-key="observatorio">Observatório</a></li>
        <li class="nav-mobile-sub"><a href="observatorio.html#imprensa">↳ Imprensa & Análises</a></li>
        <li class="nav-mobile-sub"><a href="observatorio.html#historias">↳ Histórias da comunidade</a></li>
        <li class="nav-mobile-sub"><a href="observatorio.html#partilhar">↳ Partilha a tua história</a></li>
        <li><a href="#" data-nav-key="recrutamento">Recrutamento</a></li>
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

      <!-- TOP: brand + columns -->
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <h1><a href="index.html">PARASEGURO</a></h1>
          </div>
          <p class="footer-tagline">Especialistas independentes que defendem os teus direitos perante seguradoras, processos e conflitos.</p>
          <button class="footer-scroll-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Voltar ao topo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            <span>Voltar ao topo</span>
          </button>
        </div>

        <div class="footer-cols">
          <div class="footer-col">
            <h4 class="footer-col-title">Serviços</h4>
            <ul role="list">
              <li><a href="planos.html">Planos</a></li>
              <li><a href="conceito.html">Conceito</a></li>
              <li><a href="index.html#comoFunciona">Como funciona</a></li>
              <li><a href="contacto.html">Acionar assistência</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">Empresa</h4>
            <ul role="list">
              <li><a href="institucional.html">Institucional</a></li>
              <li><a href="contacto.html">Contacto</a></li>
              <li><a href="parceiros.html">Parceiros</a></li>
              <li><a href="#">Recrutamento</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">Recursos</h4>
            <ul role="list">
              <li><a href="observatorio.html">Observatório</a></li>
              <li><a href="provedoria.html">Provedoria</a></li>
              <li><a href="termos-condicoes.html">Termos & Condições</a></li>
              <li><a href="http://livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener">Livro de Reclamações</a></li>
            </ul>
          </div>
        </div>
      </div>

      <hr class="footer-divider">

      <!-- BOTTOM: newsletter + social + legal -->
      <div class="footer-bottom">
        <div class="footer-newsletter">
          <h3 class="footer-newsletter-title">Recebe novidades e estudos</h3>
          <form class="footer-newsletter-form" onsubmit="event.preventDefault(); this.reset();">
            <span class="footer-newsletter-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="3"/>
                <polyline points="3 7 12 13 21 7"/>
              </svg>
            </span>
            <input type="email" placeholder="O teu email" aria-label="Email" required>
            <button type="submit">
              <span>Subscrever</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </button>
          </form>
          <div class="footer-social" aria-label="Redes sociais">
            <a href="#" class="footer-social-icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" class="footer-social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" class="footer-social-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 17.49H5.67V9.92h2.67v7.57zM7 8.75a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zm11.33 8.74h-2.67v-3.68c0-.88-.02-2-1.22-2-1.22 0-1.41.95-1.41 1.93v3.75H10.36V9.92h2.56v1.03h.04c.36-.68 1.23-1.39 2.54-1.39 2.71 0 3.21 1.78 3.21 4.1v3.83z"/></svg>
            </a>
            <a href="#" class="footer-social-icon" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.12a8.16 8.16 0 0 0 4.77 1.52V7.22a4.85 4.85 0 0 1-1-.53z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-legal">
          <div class="footer-legal-links">
            <a href="termos-condicoes.html">Política de Cookies</a>
            <a href="termos-condicoes.html">Termos & Condições</a>
            <a href="https://paraseguro.pt/data/fotos/diferendos_de_consumo.jpg" target="_blank" rel="noopener">Diferendos de Consumo</a>
          </div>
          <div class="footer-copy">© 2026 PARASEGURO. Todos os direitos reservados.</div>
          <div class="footer-gsb">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <div class="footer-gsb-text">
              <span class="gsb-brand">Google</span>
              <span class="gsb-sub">Safe Browsing</span>
            </div>
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


/* ═══════ CONSENTIMENTO DE COOKIES ═══════
   Banner partilhado, injetado no fim do <body> em todas as páginas.
   Dois estados: predefinido (Aceitar/Rejeitar) e personalizar (checkboxes).
   Lógica + persistência (localStorage) em index.js. */
const COOKIE_CONSENT_HTML = `
  <aside class="cookie-consent" id="cookieConsent" role="dialog" aria-modal="false"
    aria-labelledby="cookieConsentTitle" aria-describedby="cookieConsentText" hidden>
    <div class="cookie-consent-card">
      <h2 class="cookie-consent-title" id="cookieConsentTitle">Este site utiliza cookies</h2>
      <p class="cookie-consent-text" id="cookieConsentText">
        Utilizamos cookies e tecnologias semelhantes para assegurar o funcionamento adequado do nosso
        site, e com a tua permissão, para otimizar a experiência de utilização. Podes
        <button type="button" class="cookie-consent-inline" data-cookie-action="customize">personalizar o teu consentimento</button>
        e obter mais informações, consultando a
        <a href="termos-condicoes.html" class="cookie-consent-inline">Política de Cookies</a>.
      </p>

      <div class="cookie-consent-customize" id="cookieConsentCustomize" hidden>
        <h3 class="cookie-consent-subtitle">Selecionar cookies para aceitar</h3>
        <div class="cookie-consent-options">
          <label class="cookie-consent-option">
            <input type="checkbox" name="essential" checked disabled>
            <span>Essenciais</span>
          </label>
          <label class="cookie-consent-option">
            <input type="checkbox" name="preferences" checked>
            <span>Preferências</span>
          </label>
          <label class="cookie-consent-option">
            <input type="checkbox" name="statistics" checked>
            <span>Estatísticas</span>
          </label>
        </div>
      </div>

      <div class="cookie-consent-actions">
        <div class="cookie-consent-actions-row" data-cookie-view="default">
          <button type="button" class="cookie-consent-btn cookie-consent-btn--accept" data-cookie-action="accept-all">Aceitar</button>
          <button type="button" class="cookie-consent-btn cookie-consent-btn--reject" data-cookie-action="reject-all">Rejeitar</button>
        </div>
        <div class="cookie-consent-actions-row" data-cookie-view="custom" hidden>
          <button type="button" class="cookie-consent-btn cookie-consent-btn--accept" data-cookie-action="accept-selected">Aceitar</button>
          <button type="button" class="cookie-consent-textbtn" data-cookie-action="cancel-customize">Não Personalizar</button>
        </div>
      </div>
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

// Banner de cookies — não tem slot; injeta-se no fim do body (overlay fixo).
document.body.insertAdjacentHTML('beforeend', COOKIE_CONSENT_HTML);


/* ═══════ ACTIVE NAV STATE ═══════
   Marca o link da página atual com .is-active baseado no pathname.
   Funciona em todas as páginas porque o nav é o mesmo em todas. */

(function markActiveNav() {
  // Extrair "chave" da página a partir do pathname
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index.html';
  let key = file.replace('.html', '');
  if (!key || key === '' || key === '/') key = 'index';

  // Aplicar .is-active a todos os links com data-nav-key correspondente
  document.querySelectorAll('[data-nav-key]').forEach(link => {
    if (link.dataset.navKey === key) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();
