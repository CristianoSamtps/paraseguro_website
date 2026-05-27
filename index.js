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
const scrollShield = document.getElementById('scrollShield');
const scrollShieldFill = document.getElementById('scrollShieldFill');
const scrollShieldMarker = document.getElementById('scrollShieldMarker');
const scrollShieldFooter = document.querySelector('footer');
const SCROLL_SHIELD_FOOTER_MARGIN = 60; // px de folga entre o shield e o topo do footer

function updateScrollShield() {
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
updateScrollShield();

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

    items.forEach(item => {
        item.addEventListener('click', () => {
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