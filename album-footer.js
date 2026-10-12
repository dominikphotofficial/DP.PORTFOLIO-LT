// ==============================================================================
// DP.PORTFOLIO - Global Unified Album & Gallery Footer Component
// Matches theme & dynamic color palette of the active album (Strictly #113939 accent, no gold)
// ==============================================================================

(function() {
    function detectAlbumTheme() {
        const body = document.body;
        const pathname = window.location.pathname.toLowerCase();

        if (body.classList.contains('theme-automotive') || pathname.includes('autoshow') || pathname.includes('bmw') || pathname.includes('car-meet')) {
            return {
                bg: '#090B0E',
                text: '#E2E8F0',
                textMuted: '#94A3B8',
                accent: '#113939',
                border: '#113939',
                subtitle: 'DP.PORTFOLIO &bull; Automobilių Fotografija &bull; Kaunas'
            };
        } else if (body.classList.contains('theme-equestrian') || pathname.includes('zeimenos-zirgai')) {
            return {
                bg: '#0B1914',
                text: '#F1EFEA',
                textMuted: '#A3B899',
                accent: '#113939',
                border: '#113939',
                subtitle: 'DP.PORTFOLIO &bull; Žirgų & Gamtos Fotografija &bull; Lietuva'
            };
        } else if (body.classList.contains('theme-cosmic') || pathname.includes('moletu-observatorija')) {
            return {
                bg: '#040714',
                text: '#E0E7FF',
                textMuted: '#818CF8',
                accent: '#113939',
                border: '#113939',
                subtitle: 'DP.PORTFOLIO &bull; Naktinė Astrofotografija &bull; Molėtai'
            };
        } else if (body.classList.contains('theme-heritage') || pathname.includes('petrausku-namai') || pathname.includes('valdovu-rumai') || pathname.includes('rundale')) {
            return {
                bg: '#14100C',
                text: '#F5EBE1',
                textMuted: '#C4A482',
                accent: '#113939',
                border: '#113939',
                subtitle: 'DP.PORTFOLIO &bull; Istorijos & Paveldo Fotografija &bull; Lietuva'
            };
        } else if (pathname.includes('frozen-time')) {
            return {
                bg: '#0c0c0c',
                text: '#e0e0e0',
                textMuted: '#888888',
                accent: '#113939',
                border: '#113939',
                subtitle: 'DP.PORTFOLIO &bull; Kinematografija & Fotografija &bull; IMDb Rated'
            };
        }

        // Standard Editorial Luxury Theme
        return {
            bg: '#ffffff',
            text: '#113939',
            textMuted: 'rgba(26, 43, 43, 0.7)',
            accent: '#113939',
            border: '#113939',
            subtitle: 'DP.PORTFOLIO &bull; Fotografija & Videografija &bull; Kaunas'
        };
    }

    function initUnifiedAlbumFooter() {
        const isAlbumPage = window.location.pathname.includes('/albums/') || 
                            window.location.pathname.includes('frozen-time') || 
                            document.querySelector('.gallery-grid') ||
                            document.querySelector('.photo-grid');

        if (!isAlbumPage) return;

        const theme = detectAlbumTheme();
        const isInAlbumsDir = window.location.pathname.includes('/albums/');
        const rootPrefix = isInAlbumsDir ? '../' : './';

        let footerEl = document.querySelector('footer.footer-minimal') || document.querySelector('footer');
        if (!footerEl) {
            footerEl = document.createElement('footer');
            footerEl.className = 'footer-minimal';
            document.body.appendChild(footerEl);
        }

        footerEl.style.cssText = `
            background: ${theme.bg} !important;
            color: ${theme.text} !important;
            border-top: 1.5px solid ${theme.border} !important;
            clear: both !important;
            width: 100% !important;
            position: relative !important;
            z-index: 10 !important;
            margin-top: 80px !important;
            padding: 28px 24px !important;
            box-sizing: border-box !important;
            text-align: left !important;
        `;

        footerEl.innerHTML = `
            <div class="footer-min-container" style="max-width: 1400px; margin: 0 auto; width: 100%;">
                <div class="footer-min-bottom" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; width: 100%;">
                    <span class="footer-min-copy" style="font-family: var(--font-heading); font-size: 0.76rem; letter-spacing: 0.14em; text-transform: uppercase; color: ${theme.text} !important; font-weight: 500;">
                        &copy; 2026 DP.PORTFOLIO. Visos teisės saugomos.
                    </span>
                    <div class="footer-legal-links" style="display: flex; gap: 18px; align-items: center; flex-wrap: wrap;">
                        <a href="${rootPrefix}privacy-policy.html" style="font-family: var(--font-heading); font-size: 0.76rem; letter-spacing: 0.12em; text-transform: uppercase; color: ${theme.text} !important; text-decoration: none; font-weight: 500;">Privatumo Politika</a>
                        <a href="${rootPrefix}terms-of-service.html" style="font-family: var(--font-heading); font-size: 0.76rem; letter-spacing: 0.12em; text-transform: uppercase; color: ${theme.text} !important; text-decoration: none; font-weight: 500;">Paslaugų Sąlygos</a>
                    </div>
                    <div class="footer-min-langs-group" style="display: flex; align-items: center;">
                        <div class="footer-lang-divider" style="width: 1.5px; height: 18px; background-color: ${theme.border}; margin: 0 16px; opacity: 0.9;" aria-hidden="true"></div>
                        <div class="footer-min-langs" style="display: flex; align-items: center; gap: 12px; font-family: var(--font-heading); font-size: 0.74rem; letter-spacing: 0.16em; text-transform: uppercase;">
                            <a href="${rootPrefix}index.html" style="color: ${theme.text} !important; font-weight: 700; text-decoration: none;">LT</a>
                            <a href="https://en.dominikphotofficial.lt" style="color: ${theme.textMuted} !important; text-decoration: none;">EN</a>
                            <a href="https://pl.dominikphotofficial.lt" style="color: ${theme.textMuted} !important; text-decoration: none;">PL</a>
                            <a href="https://ru.dominikphotofficial.lt" style="color: ${theme.textMuted} !important; text-decoration: none;">RU</a>
                            <a href="https://kr.dominikphotofficial.lt" style="color: ${theme.textMuted} !important; text-decoration: none;">KR</a>
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
