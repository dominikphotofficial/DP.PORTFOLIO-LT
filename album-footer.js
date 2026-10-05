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
            border-top: 2px solid ${theme.border} !important;
            clear: both !important;
            width: 100% !important;
            position: relative !important;
            z-index: 10 !important;
            margin-top: 80px !important;
            padding: 40px 24px 28px 24px !important;
            box-sizing: border-box !important;
            text-align: left !important;
        `;

        footerEl.innerHTML = `
            <div style="max-width: 1300px; margin: 0 auto; width: 100%;">
                <div style="width: 50px; height: 3px; background: #113939; margin-bottom: 20px;"></div>
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 25px; margin-bottom: 30px;">
                    <div>
                        <div style="font-family: var(--font-heading, 'Josefin Sans', sans-serif); font-size: 1.45rem; letter-spacing: 3px; text-transform: uppercase; font-weight: 600; color: ${theme.text};">
                            DP.PORTFOLIO
                        </div>
                        <p style="font-family: var(--font-body, 'Jost', sans-serif); font-size: 0.88rem; color: ${theme.textMuted}; margin: 6px 0 0 0; letter-spacing: 0.8px;">
                            ${theme.subtitle}
                        </p>
                    </div>

                    <nav style="display: flex; gap: 22px; flex-wrap: wrap; align-items: center; font-family: var(--font-heading, 'Josefin Sans', sans-serif); font-size: 0.82rem; letter-spacing: 2px; text-transform: uppercase;">
                        <a href="${rootPrefix}index.html" style="color: ${theme.text}; text-decoration: none; transition: opacity 0.3s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">Darbai</a>
                        <a href="${rootPrefix}services.html" style="color: ${theme.text}; text-decoration: none; transition: opacity 0.3s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">Paslaugos</a>
                        <a href="${rootPrefix}tfp-booking.html" style="color: ${theme.text}; text-decoration: none; transition: opacity 0.3s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">TFP Registracija</a>
                        <a href="${rootPrefix}contacts.html" style="color: ${theme.text}; text-decoration: none; transition: opacity 0.3s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">Kontaktai</a>
                    </nav>
                </div>

                <div style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap; font-size: 0.88rem; color: ${theme.textMuted}; margin-bottom: 28px; padding-bottom: 22px; border-bottom: 1px solid rgba(128, 128, 128, 0.15);">
                    <a href="mailto:info@dominikphotofficial.lt" style="color: ${theme.text}; text-decoration: none; font-weight: 500;">info@dominikphotofficial.lt</a>
                    <span>&bull;</span>
                    <a href="https://www.instagram.com/dominikphotofficial" target="_blank" rel="noopener noreferrer" style="color: ${theme.text}; text-decoration: none; font-weight: 500;">@dominikphotofficial</a>
                    <span>&bull;</span>
                    <a href="tel:+37062337615" style="color: ${theme.text}; text-decoration: none; font-weight: 500;">+370 623 37615</a>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; font-size: 0.78rem; color: ${theme.textMuted};">
                    <span>&copy; 2026 DP.PORTFOLIO &bull; Visos teisės saugomos.</span>
                    
                    <div style="display: flex; gap: 16px; align-items: center;">
                        <a href="${rootPrefix}privacy-policy.html" style="color: ${theme.textMuted}; text-decoration: none;">Privatumo Politika</a>
                        <span>&bull;</span>
                        <a href="${rootPrefix}terms-of-service.html" style="color: ${theme.textMuted}; text-decoration: none;">Paslaugų Sąlygos</a>
                    </div>

                    <div style="display: flex; gap: 10px; align-items: center; font-family: var(--font-heading, 'Josefin Sans', sans-serif); font-size: 0.75rem; letter-spacing: 1px;">
                        <a href="${rootPrefix}index.html" style="color: ${theme.text}; font-weight: bold; text-decoration: none;">LT</a>
                        <span style="opacity: 0.4;">|</span>
                        <a href="https://en.dominikphotofficial.lt" style="color: ${theme.textMuted}; text-decoration: none;">EN</a>
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
