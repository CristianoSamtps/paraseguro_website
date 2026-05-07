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

function updateScrollShield() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
    const pct = (progress * 100).toFixed(2);

    scrollShieldFill.style.height = pct + '%';
    scrollShieldMarker.style.top = pct + '%';

    if (window.scrollY > 200) {
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