// ==============================================================================
// DP.PORTFOLIO - Global Unified Album Footer Component
// Strictly uses unified design system tokens from style.css
// ==============================================================================

(function() {
    function initUnifiedAlbumFooter() {
        const isAlbumPage = window.location.pathname.includes('/albums/') ||
                            window.location.pathname.includes('frozen-time');

        if (!isAlbumPage) return;

        const isInAlbumsDir = window.location.pathname.includes('/albums/');
        const rootPrefix = isInAlbumsDir ? '../' : './';

        let footerEl = document.querySelector('footer.footer-minimal') || document.querySelector('footer');
        if (footerEl && footerEl.classList.contains('footer-minimal') && footerEl.querySelector('.footer-editorial-grid')) {
            return;
        }
        if (!footerEl) {
            footerEl = document.createElement('footer');
            document.body.appendChild(footerEl);
        }

        footerEl.className = 'footer-minimal';
        footerEl.removeAttribute('style');

        footerEl.innerHTML = `
            <div class="footer-min-container">
                <div class="footer-editorial-grid">
                    <div class="footer-brand-col">
                        <a href="${rootPrefix}index.html" class="footer-logo" aria-label="DP.PORTFOLIO"><span class="logo-mark"><img src="https://iili.io/fjNLbs4.png" alt="DP.PORTFOLIO" class="logo-img"></span><span class="logo-sub">Portfolio</span></a>
                        <p class="footer-tagline">Erdvė &middot; Šviesa &middot; Emocija — autorinė fotografija ir kinematografija.</p>
                        <a href="mailto:info@dominikphotofficial.lt" class="footer-email">info@dominikphotofficial.lt</a>
                    </div>
                    <div class="footer-nav-col">
                        <span class="footer-col-label">Navigacija</span>
                        <a href="${rootPrefix}index.html">Darbai</a>
                        <a href="${rootPrefix}tfp-booking.html">TFP Registracija</a>
                        <a href="${rootPrefix}services.html">Paslaugos</a>
                        <a href="${rootPrefix}biography.html">Biografija</a>
                    </div>
                    <div class="footer-nav-col">
                        <span class="footer-col-label">Informacija</span>
                        <a href="${rootPrefix}about.html">Apie</a>
                        <a href="${rootPrefix}contacts.html">Kontaktai</a>
                        <a href="${rootPrefix}privacy-policy.html">Privatumo Politika</a>
                        <a href="${rootPrefix}terms-of-service.html">Paslaugų Sąlygos</a>
                    </div>
                </div>
                <div class="footer-min-bottom">
                    <div class="footer-brand-copy">
                        <span class="footer-min-copy">&copy; 2026 DP.PORTFOLIO. Visos teisės saugomos.</span>
                    </div>
                    <div class="footer-min-langs-group">
                        <div class="footer-min-langs">
                            <a href="https://dominikphotofficial.lt" class="active">LT</a>
                            <a href="https://en.dominikphotofficial.lt">EN</a>
                            <a href="https://pl.dominikphotofficial.lt">PL</a>
                            <a href="https://ru.dominikphotofficial.lt">RU</a>
                            <a href="https://kr.dominikphotofficial.lt">KR</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    window.mountAlbumFooter = initUnifiedAlbumFooter;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUnifiedAlbumFooter);
    } else {
        initUnifiedAlbumFooter();
    }
})();
