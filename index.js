const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('navMobile');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.nav-mobile-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    });
});

// Scroll protection indicator
/* const scrollShield = document.getElementById('scrollShield');
const scrollShieldFill = document.getElementById('scrollShieldFill');
const scrollShieldMarker = document.getElementById('scrollShieldMarker');
const scrollShieldFooter = document.querySelector('footer');
const SCROLL_SHIELD_FOOTER_MARGIN = 60; // px de folga entre o shield e o topo do footer */

/* function updateScrollShield() {
    // Calcular o ponto de paragem: quando o topo do footer entra na zona inferior do shield
    const footerTopInViewport = scrollShieldFooter
        ? scrollShieldFooter.getBoundingClientRect().top
        : Infinity;
    const shieldBottomInViewport = scrollShield.getBoundingClientRect().bottom;
    const overlapsFooter = footerTopInViewport - SCROLL_SHIELD_FOOTER_MARGIN < shieldBottomInViewport;

    // Progresso normal baseado no scroll do documento
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
    const pct = (progress * 100).toFixed(2);

    scrollShieldFill.style.height = pct + '%';
    scrollShieldMarker.style.top = pct + '%';

    // Visível só quando passou do topo E o footer ainda não invadiu a zona do shield
    if (window.scrollY > 200 && !overlapsFooter) {
        scrollShield.classList.add('visible');
    } else {
        scrollShield.classList.remove('visible');
    }

    if (progress >= 0.97) {
        scrollShield.classList.add('complete');
    } else {
        scrollShield.classList.remove('complete');
    }
}

window.addEventListener('scroll', updateScrollShield, { passive: true });
window.addEventListener('resize', updateScrollShield);
updateScrollShield(); */

// Chat widget
const chatWidget = document.getElementById('chatWidget');
const chatBubble = document.getElementById('chatBubble');
const chatClose = document.getElementById('chatClose');
const chatPanel = document.getElementById('chatPanel');
const chatForm = document.getElementById('chatForm');

function setChatOpen(open) {
    if (!chatWidget) return;
    chatWidget.classList.toggle('open', open);
    if (chatBubble) chatBubble.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (chatPanel) chatPanel.setAttribute('aria-hidden', open ? 'false' : 'true');
}

if (chatBubble) chatBubble.addEventListener('click', () => setChatOpen(true));
if (chatClose) chatClose.addEventListener('click', () => setChatOpen(false));
if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Placeholder: integrar com endpoint real depois
        chatForm.reset();
        setChatOpen(false);
    });
}
// Fecha com Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatWidget && chatWidget.classList.contains('open')) {
        setChatOpen(false);
    }
});

// Plans simulator (planos.html)
const simPlans = document.querySelectorAll('.sim-plan');
const simTotalEl = document.getElementById('simTotal');
const simDepsEl = document.getElementById('simDeps');
const simMonthlyEl = document.getElementById('simMonthly');
const simPerEl = document.getElementById('simPer');

if (simPlans.length && simTotalEl && simDepsEl && simMonthlyEl && simPerEl) {
    let total = parseInt(simTotalEl.textContent, 10);
    let deps = parseInt(simDepsEl.textContent, 10);
    let pricePerDay = 0.70;

    const formatEuro = (n) => n.toFixed(2).replace('.', ',');

    function recalc() {
        if (deps > total) deps = total;
        simTotalEl.textContent = total;
        simDepsEl.textContent = deps;

        const monthly = pricePerDay * 30;
        const per = total > 0 ? monthly / total : 0;
        simMonthlyEl.textContent = formatEuro(monthly);
        simPerEl.textContent = formatEuro(per);
    }

    simPlans.forEach(btn => {
        btn.addEventListener('click', () => {
            simPlans.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            pricePerDay = parseFloat(btn.dataset.price);
            recalc();
        });
    });

    document.querySelectorAll('.sim-counter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const target = btn.dataset.target;
            const delta = action === 'inc' ? 1 : -1;
            if (target === 'total') {
                total = Math.max(1, Math.min(20, total + delta));
            } else if (target === 'deps') {
                deps = Math.max(0, Math.min(total, deps + delta));
            }
            recalc();
        });
    });

    recalc();
}

// "Como Funciona" — accordion + media swap
const stepsInteractive = document.querySelector('.steps-interactive');
if (stepsInteractive) {
    const items = stepsInteractive.querySelectorAll('.step-item');
    const medias = stepsInteractive.querySelectorAll('.step-media');

    function activateStep(item) {
        const idx = item.dataset.step;
        if (item.classList.contains('is-active')) return;

        items.forEach(i => {
            const active = i === item;
            i.classList.toggle('is-active', active);
            i.setAttribute('aria-expanded', active ? 'true' : 'false');
        });
        medias.forEach(m => {
            m.classList.toggle('is-active', m.dataset.step === idx);
        });
        stepsInteractive.dataset.active = idx;
    }

    items.forEach(item => {
        item.addEventListener('click', () => activateStep(item));
        // role="button" não tem ativação nativa por teclado — adicionamos Enter/Espaço
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateStep(item);
            }
        });
    });
}

// Hero alternativo — carrossel de imagens com bullets verticais
(function initHeroAltSlider() {
    const heroAlt = document.querySelector('.hero-alt');
    if (!heroAlt) return;
    const slides = [...heroAlt.querySelectorAll('.hero-alt-slide')];
    const dots = [...heroAlt.querySelectorAll('.hero-alt-dot')];
    if (slides.length < 2) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const INTERVAL_MS = 6500;
    let current = 0;
    let timer = null;

    function go(idx) {
        if (idx === current) return;
        slides[current].classList.remove('is-active');
        dots[current]?.classList.remove('is-active');
        dots[current]?.removeAttribute('aria-current');
        current = (idx + slides.length) % slides.length;
        slides[current].classList.add('is-active');
        dots[current]?.classList.add('is-active');
        dots[current]?.setAttribute('aria-current', 'true');
        heroAlt.dataset.activeSlide = String(current);
    }

    function next() { go(current + 1); }

    function start() {
        if (reduceMotion) return;
        stop();
        timer = window.setInterval(next, INTERVAL_MS);
    }

    function stop() {
        if (timer) { window.clearInterval(timer); timer = null; }
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.dataset.go, 10);
            if (!Number.isNaN(idx)) {
                go(idx);
                start();
            }
        });
    });

    heroAlt.addEventListener('mouseenter', stop);
    heroAlt.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop(); else start();
    });

    start();
})();

// Offer card — carrossel das áreas em mobile (scroll-snap + dots gerados)
(function initOfferCarousel() {
    const grid = document.querySelector('.offer-card-grid');
    const dotsWrap = document.querySelector('.offer-card-dots');
    if (!grid || !dotsWrap) return;

    const items = [...grid.querySelectorAll('.offer-item')];
    if (items.length < 2) return;

    // Criar um dot por área
    const dots = items.map((item, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'offer-card-dot' + (i === 0 ? ' is-active' : '');
        const label = item.querySelector('.offer-item-title')?.textContent.trim() || ('Área ' + (i + 1));
        dot.setAttribute('aria-label', label);
        dot.addEventListener('click', () => {
            // scrollIntoView dentro do container sem mexer no scroll vertical da página
            grid.scrollTo({ left: item.offsetLeft - grid.offsetLeft, behavior: 'smooth' });
        });
        dotsWrap.appendChild(dot);
        return dot;
    });

    function setActive(idx) {
        dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    }

    // Atualizar o dot ativo conforme o item mais visível no scroll horizontal
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                    setActive(items.indexOf(entry.target));
                }
            });
        }, { root: grid, threshold: [0.6] });
        items.forEach(item => io.observe(item));
    }
})();


// Home stories — acordeão vertical em mobile (1 destacada com tudo; outras só título; tap p/ destacar)
(function initHomeStoriesAccordion() {
    const grid = document.querySelector('.home-stories-grid');
    if (!grid) return;
    const cards = [...grid.querySelectorAll('.story-card')];
    if (cards.length < 2) return;
    const mq = window.matchMedia('(max-width: 767px)');
    function setOpen(card) {
        cards.forEach(c => c.classList.toggle('is-open', c === card));
    }
    function sync() {
        if (mq.matches) {
            if (!grid.querySelector('.story-card.is-open')) setOpen(cards[0]);
        } else {
            cards.forEach(c => c.classList.remove('is-open'));
        }
    }
    sync();
    mq.addEventListener('change', sync);
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!mq.matches) return;                 // desktop → navega normalmente
            if (!card.classList.contains('is-open')) {
                e.preventDefault();                  // 1º toque numa pequena → só destaca
                setOpen(card);
            }
            // se já destacada → não bloqueia → segue o link
        });
    });
})();


// Logo-bar — carrossel automático infinito em mobile (clona os items p/ loop contínuo)
(function initLogoMarquee() {
    const list = document.querySelector('.logo-bar-list');
    if (!list) return;
    const originals = [...list.children];
    if (!originals.length) return;
    const mq = window.matchMedia('(max-width: 767px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    function sync() {
        const on = mq.matches && !reduce.matches;
        if (on && !list.classList.contains('is-marquee')) {
            originals.forEach(node => {
                const clone = node.cloneNode(true);
                clone.classList.add('logo-mark--clone');
                clone.setAttribute('aria-hidden', 'true');
                list.appendChild(clone);
            });
            list.classList.add('is-marquee');
        } else if (!on && list.classList.contains('is-marquee')) {
            list.querySelectorAll('.logo-mark--clone').forEach(c => c.remove());
            list.classList.remove('is-marquee');
        }
    }
    sync();
    mq.addEventListener('change', sync);
    reduce.addEventListener('change', sync);
})();


// Scroll reveal — entrada subtil dos blocos à medida que entram na viewport
(function initScrollReveal() {
    // Respeitar preferência de reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Selectores a animar — agrupados por contexto
    const SELECTORS = [
        // Headings genéricos
        '.section-eyebrow',
        '.section-title',

        // Index — hero
        '.hero-eyebrow',
        '.hero-title',
        '.hero-title-accent',
        '.hero-subhead',
        '.hero-actions',
        '.hero-stats',
        '.hero-right',

        // Index — logo bar
        '.logo-mark',

        // Index — versus
        '.vs-compare',
        '.vs-row',

        // Index — areas
        '.areas-aside',
        '.area-card',

        // Index — como funciona
        '.steps-interactive',
        '.step-item',

        // Index — faq
        '.faq-aside',
        '.faq-item',

        // Index — cta final
        '.cta-section',

        // Páginas internas
        '.page-hero-title',
        '.page-hero-sub',
        '.page-prose > *',
        '.page-card',
        '.page-form',

        // Institucional
        '.institucional-hero-eyebrow',
        '.institucional-hero-title',
        '.inst-subnav-link',
        '.inst-photo',
        '.inst-block-text',
        '.inst-reasons-eyebrow',
        '.inst-reason',
        '.inst-join-col',
        '.inst-form',
    ];

    // Grupos com stagger (delay incremental entre irmãos do mesmo tipo)
    const STAGGER_GROUPS = [
        { sel: '.logo-mark', step: 60 },
        { sel: '.vs-row', step: 70 },
        { sel: '.area-card', step: 90 },
        { sel: '.step-item', step: 80 },
        { sel: '.faq-item', step: 60 },
        { sel: '.inst-subnav-link', step: 80 },
        { sel: '.inst-reason', step: 120 },
        { sel: '.inst-join-col', step: 120 },
    ];

    // Aplica class .reveal aos elementos encontrados (sem duplicar)
    const targets = new Set();
    SELECTORS.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.classList.add('reveal');
            targets.add(el);
        });
    });

    // Stagger: cada item recebe --reveal-delay baseado na sua posição no grupo
    STAGGER_GROUPS.forEach(({ sel, step }) => {
        document.querySelectorAll(sel).forEach((el, i) => {
            el.style.setProperty('--reveal-delay', (i * step) + 'ms');
        });
    });

    // IntersectionObserver — adiciona is-visible quando entra na viewport
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target); // dispara uma só vez
            }
        });
    }, {
        rootMargin: '0px 0px -8% 0px', // dispara um pouco antes de aparecer totalmente
        threshold: 0.05,
    });

    targets.forEach(el => io.observe(el));
})();

// Consentimento de cookies (banner partilhado — components.js)
(function initCookieConsent() {
    const STORAGE_KEY = 'paraseguro_cookie_consent';
    const banner = document.getElementById('cookieConsent');
    if (!banner) return;

    const customizePanel = document.getElementById('cookieConsentCustomize');
    const defaultActions = banner.querySelector('[data-cookie-view="default"]');
    const customActions = banner.querySelector('[data-cookie-view="custom"]');

    function hasConsent() {
        try { return !!localStorage.getItem(STORAGE_KEY); }
        catch (e) { return false; }
    }

    function save(consent) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...consent, ts: Date.now() }));
        } catch (e) { /* localStorage indisponível — ignora silenciosamente */ }
    }

    function setCustomizeView(on) {
        if (customizePanel) customizePanel.hidden = !on;
        if (defaultActions) defaultActions.hidden = on;
        if (customActions) customActions.hidden = !on;
    }

    function readSelected() {
        const pref = banner.querySelector('input[name="preferences"]');
        const stat = banner.querySelector('input[name="statistics"]');
        return {
            essential: true,
            preferences: !!(pref && pref.checked),
            statistics: !!(stat && stat.checked),
        };
    }

    banner.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-cookie-action]');
        if (!trigger) return; // ex.: link "Política de Cookies" navega normalmente
        const action = trigger.dataset.cookieAction;

        if (action === 'customize') { setCustomizeView(true); }
        else if (action === 'cancel-customize') { setCustomizeView(false); }
        else if (action === 'accept-all') { save({ essential: true, preferences: true, statistics: true }); banner.hidden = true; }
        else if (action === 'reject-all') { save({ essential: true, preferences: false, statistics: false }); banner.hidden = true; }
        else if (action === 'accept-selected') { save(readSelected()); banner.hidden = true; }
    });

    if (!hasConsent()) banner.hidden = false;
})();