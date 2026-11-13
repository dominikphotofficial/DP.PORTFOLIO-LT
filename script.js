// Global error handler to catch cross-origin script errors gracefully
window.addEventListener('error', (event) => {
    if (event.message === 'Script error.' && !event.filename) {
        event.preventDefault();
    }
});

// ==============================================================================
// Firebase Auth Configuration & Initialization Diagnostic Logger
// ==============================================================================
(function runFirebaseAuthDiagnostics() {
    if (typeof window === 'undefined') return;

    window.logFirebaseAuthDiagnostics = function() {
        const isInAlbums = window.location.pathname.includes('/albums/');
        const prefix = isInAlbums ? '../' : './';

        fetch(prefix + 'firebase-applet-config.json')
            .then(res => res.json())
            .then(config => {
                const initConfig = window.__FIREBASE_INITIALIZED_CONFIG__ || {};
                const isMatching = initConfig.authDomain === config.authDomain;
                const isDefaultFallback = initConfig.authDomain && initConfig.authDomain.includes('firebaseapp.com');

                const diag = {
                    loadedFromFile: 'firebase-applet-config.json',
                    configAuthDomain: config.authDomain,
                    activeSdkAuthDomain: initConfig.authDomain || 'Loading...',
                    isSynchronized: isMatching,
                    isUsingCachedOrFallback: isDefaultFallback,
                    projectId: config.projectId,
                    targetRedirectUri: `https://${config.authDomain}/__/auth/handler`,
                    targetIframeUri: `https://${config.authDomain}/__/auth/iframe`,
                    targetActionUri: `https://${config.authDomain}/__/auth/action`,
                    oAuthClientId: config.oAuthClientId,
                    windowHostname: window.location.hostname,
                    windowHref: window.location.href,
                    isPrefixSubdomain: window.location.hostname.startsWith('portfolio.'),
                    isApexDomain: window.location.hostname === 'dominikphotofficial.lt',
                    cachedStorageSession: localStorage.getItem('dp_admin_session') ? 'Active' : 'None',
                    timestamp: new Date().toISOString()
                };

                window.__FIREBASE_ACTIVE_CONFIG__ = diag;
                console.group('%c[Firebase Auth Environment & Config Diagnostics]', 'color: #113939; font-weight: bold; font-size: 13px;');
                console.log('Project ID:', diag.projectId);
                console.log('Config authDomain (File):', diag.configAuthDomain);
                console.log('Active SDK authDomain (Runtime):', diag.activeSdkAuthDomain);
                console.log('Status Synchronized:', isMatching ? 'TAIP (Sutampa)' : 'NE (Nesutampa)');
                console.log('Uses Default/Fallback:', isDefaultFallback ? 'Taip (.firebaseapp.com)' : 'Ne');
                console.log('Auth Redirect URI:', diag.targetRedirectUri);
                console.log('Current Hostname:', diag.windowHostname);
                console.log('Is Prefix Subdomain (portfolio.*):', diag.isPrefixSubdomain);
                console.groupEnd();
                return diag;
            })
            .catch(err => {
                console.warn('[Firebase Auth Diagnostics] Config fetch notice:', err);
            });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.logFirebaseAuthDiagnostics);
    } else {
        window.logFirebaseAuthDiagnostics();
    }
})();

// ==============================================================================
// Firebase Authentication & Firestore Diagnostic Wrapper
// ==============================================================================
(function installFirebaseAuthDiagnosticWrapper() {
    if (typeof window === 'undefined') return;

    window.wrapAuthCall = async function(actionName, authFn, contextData = {}) {
        const activeDomain = window.__FIREBASE_ACTIVE_CONFIG__?.authDomain ||
                             window.__FIREBASE_INITIALIZED_CONFIG__?.authDomain ||
                             'dominikphotofficial.lt';

        console.group(`%c[Auth Diagnostic Call: ${actionName}]`, 'color: #113939; font-weight: bold; font-size: 12px;');
        console.log('Action:', actionName);
        console.log('Active authDomain:', activeDomain);
        console.log('Current Host:', window.location.hostname);
        console.log('Context Data:', contextData);
        console.groupEnd();

        try {
            const result = await authFn();
            console.info(`%c[Auth Success: ${actionName}]`, 'color: #2E7D32; font-weight: bold;', result);
            return result;
        } catch (err) {
            const errCode = err?.code || 'unknown_code';
            const errMsg = err?.message || String(err);
            const isPermissionError = errMsg.toLowerCase().includes('permission') || errCode.includes('permission');

            console.group(`%c[Auth Diagnostic Error in: ${actionName}]`, 'color: #C62828; font-weight: bold; font-size: 13px;');
            console.error('Error Code:', errCode);
            console.error('Error Message:', errMsg);
            console.error('Active authDomain at failure:', activeDomain);
            console.error('Is Permission Error:', isPermissionError ? 'TAIP' : 'Ne');
            console.error('Full Error Object:', err);
            console.groupEnd();
            throw err;
        }
    };

    window.addEventListener('unhandledrejection', (event) => {
        const reason = event.reason;
        const msg = (reason?.message || String(reason) || '').toLowerCase();
        const code = (reason?.code || '').toLowerCase();

        if (msg.includes('insufficient permissions') || msg.includes('permission-denied') || code.includes('permission-denied')) {
            const activeDomain = window.__FIREBASE_ACTIVE_CONFIG__?.authDomain || 'dominikphotofficial.lt';
            console.group('%c[Firestore Permission Error Intercepted]', 'color: #D32F2F; font-weight: bold; font-size: 13px;');
            console.error('Error Code:', reason?.code || 'permission-denied');
            console.error('Error Message:', reason?.message || reason);
            console.error('Active authDomain:', activeDomain);
            console.groupEnd();
        }
    });

    window.interceptFirebaseError = function(context, err) {
        const activeDomain = window.__FIREBASE_ACTIVE_CONFIG__?.authDomain || 'dominikphotofficial.lt';
        console.group(`%c[Firebase Error in: ${context}]`, 'color: #C62828; font-weight: bold;');
        console.error('Message:', err?.message || err);
        console.error('Code:', err?.code || 'N/A');
        console.error('Active authDomain:', activeDomain);
        console.error('Full Error:', err);
        console.groupEnd();
    };

    window.logPreWriteState = function(operationName, collectionName, payload = {}) {
        let storedSession = null;
        try {
            const raw = localStorage.getItem('dp_admin_session');
            storedSession = raw ? JSON.parse(raw) : null;
        } catch(e) {}

        const currentFirebaseUser = window.firebaseAuthInstance?.currentUser || null;

        const authState = {
            hasLiveFirebaseUser: Boolean(currentFirebaseUser),
            firebaseUid: currentFirebaseUser?.uid || 'None',
            firebaseEmail: currentFirebaseUser?.email || 'None',
            isAnonymous: currentFirebaseUser?.isAnonymous || false,
            storedAdminEmail: storedSession?.email || 'None',
            storedAdminRole: storedSession?.role || 'None',
            effectiveIdentity: currentFirebaseUser?.email || storedSession?.email || 'Anonymous/Unauthenticated'
        };

        const dbStatus = {
            databaseId: 'ai-studio-dpportfoliolt-0d398e5b-e665-43c2-8ab2-94507a3cbbce',
            targetCollection: collectionName,
            operation: operationName,
            isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
            activeAuthDomain: window.__FIREBASE_ACTIVE_CONFIG__?.authDomain || 'dominikphotofficial.lt'
        };

        console.group(`%c[Firestore Pre-Write State Verification: ${operationName}]`, 'color: #113939; font-weight: bold; font-size: 12px;');
        console.log('Target Collection:', collectionName);
        console.log('Effective User Identity:', authState.effectiveIdentity);
        console.log('Live Firebase Auth State (auth.currentUser):', authState);
        console.log('Database Connection Info:', dbStatus);
        console.log('Operation Payload Summary:', payload);
        console.groupEnd();

        return { authState, dbStatus };
    };

    window.__DIAGNOSTIC_OPERATIONS__ = [];
    window.recordDiagnosticOperation = function(name, status, details = {}) {
        const entry = {
            id: Date.now() + Math.random().toString(36).substring(2, 6),
            time: new Date().toLocaleTimeString('lt-LT'),
            timestamp: Date.now(),
            name: name,
            status: status,
            details: details
        };
        window.__DIAGNOSTIC_OPERATIONS__.unshift(entry);
        if (window.__DIAGNOSTIC_OPERATIONS__.length > 5) {
            window.__DIAGNOSTIC_OPERATIONS__.pop();
        }
        if (typeof window.updateDiagnosticDashboardUI === 'function') {
            window.updateDiagnosticDashboardUI();
        }
        return entry;
    };
})();

// Centralized Analytics (GA4) & Unified Album Footer dynamic loaders
(function loadGlobalHelpers() {
    const isInAlbumsDir = window.location.pathname.includes('/albums/');
    const pathPrefix = isInAlbumsDir ? '../' : './';

    if (!window.trackPageView && !document.getElementById('dp-analytics-script')) {
        const sc = document.createElement('script');
        sc.id = 'dp-analytics-script';
        sc.src = pathPrefix + 'analytics.js';
        sc.async = true;
        document.head.appendChild(sc);
    }

    if (!window.mountAlbumFooter && !document.getElementById('dp-album-footer-script')) {
        const scFooter = document.createElement('script');
        scFooter.id = 'dp-album-footer-script';
        scFooter.src = pathPrefix + 'album-footer.js';
        scFooter.async = true;
        document.head.appendChild(scFooter);
    }
})();

// Only initialize Cookiebot on official production domain outside iframe
if (typeof window !== 'undefined' &&
    window.location.hostname.endsWith('dominikphotofficial.lt') &&
    window.self === window.top) {
    if (!document.getElementById('Cookiebot')) {
        const cbScript = document.createElement('script');
        cbScript.id = 'Cookiebot';
        cbScript.src = 'https://consent.cookiebot.com/uc.js';
        cbScript.setAttribute('data-cbid', '06c15308-ea25-4737-9b50-13705638aa99');
        cbScript.setAttribute('data-blockingmode', 'auto');
        cbScript.type = 'text/javascript';
        if (document.head.firstChild) {
            document.head.insertBefore(cbScript, document.head.firstChild);
        } else {
            document.head.appendChild(cbScript);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("main-header") || document.querySelector("header");
    const heroScroll = document.querySelector(".hero-scroll");
    const heroProgress = document.querySelector(".hero-progress");
    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Wrap hero descriptor words cleanly for sequential 120ms load stagger
    const heroDesc = document.querySelector(".hero-descriptors");
    if (heroDesc && !heroDesc.querySelector(".hero-word")) {
        const parts = heroDesc.textContent.split("·").map(s => s.trim()).filter(Boolean);
        if (parts.length > 1) {
            heroDesc.textContent = "";
            parts.forEach((word, idx) => {
                const span = document.createElement("span");
                span.className = `hero-word hero-word-${idx + 1}`;
                span.textContent = word;
                heroDesc.appendChild(span);
                if (idx < parts.length - 1) {
                    const sep = document.createElement("span");
                    sep.className = `hero-sep hero-sep-${idx + 1}`;
                    sep.setAttribute("aria-hidden", "true");
                    sep.textContent = "·";
                    heroDesc.appendChild(sep);
                }
            });
        }
    }

    let lastScrollY = window.scrollY || window.pageYOffset || 0;
    const handleScroll = () => {
        const y = window.scrollY || window.pageYOffset || 0;
        const delta = y - lastScrollY;
        if (header) {
            header.classList.toggle("scrolled", y > 80);
            if (y <= 80 || document.body.classList.contains("menu-open")) {
                header.classList.remove("header-hidden");
            } else if (y > 120 && delta > 6) {
                header.classList.add("header-hidden");
            } else if (delta < -4) {
                header.classList.remove("header-hidden");
            }
        }
        if (heroScroll) {
            heroScroll.classList.toggle("hidden", y > 40);
        }
        if (heroProgress) {
            heroProgress.classList.toggle("hidden", y > 40);
        }
        lastScrollY = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Unified Header Drawer Menu
    const burger = document.getElementById("burger-menu") || document.querySelector(".burger");
    const navOverlay = document.getElementById("nav-overlay") || document.querySelector(".nav-overlay");
    const navClose = document.getElementById("nav-close") || document.querySelector(".nav-close");

    const openMenu = () => {
        if (!burger || !navOverlay) return;
        if (header) header.classList.remove("header-hidden");
        burger.classList.add("active");
        burger.setAttribute("aria-expanded", "true");
        navOverlay.classList.add("active");
        navOverlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
        if (!burger || !navOverlay) return;
        burger.classList.remove("active");
        burger.setAttribute("aria-expanded", "false");
        navOverlay.classList.remove("active");
        navOverlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("menu-open");
    };

    if (burger && navOverlay) {
        burger.addEventListener("click", () => {
            if (navOverlay.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (navClose) {
        navClose.addEventListener("click", closeMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener("click", (e) => {
            if (e.target === navOverlay) closeMenu();
        });
        navOverlay.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navOverlay && navOverlay.classList.contains("active")) {
            closeMenu();
        }
    });

    // Subtle 200ms page fade-out on same-origin internal links
    if (!prefersReducedMotion) {
        window.addEventListener("pageshow", () => {
            document.body.classList.remove("page-leaving");
        });
        document.querySelectorAll("a[href]").forEach(link => {
            const href = link.getAttribute("href");
            if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || link.target === "_blank") return;
            try {
                const url = new URL(link.href, window.location.href);
                if (url.origin !== window.location.origin) return;
                if (url.pathname === window.location.pathname && url.hash) return;
                link.addEventListener("click", (e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    document.body.classList.add("page-leaving");
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 200);
                });
            } catch (err) {}
        });
    }

    // Lightbox Photo Viewer: FLIP open/close, directional crossfade+slide, swipe inertia & cursor UI fade
    const galleryImages = document.querySelectorAll(".gallery-item img");
    const lightbox = document.getElementById("lightbox");

    if (galleryImages.length > 0 && lightbox) {
        const lightboxImg = document.getElementById("lightbox-img");
        const lightboxCounter = document.getElementById("lightbox-counter");
        const closeBtn = document.querySelector(".lightbox-close");
        const prevBtn = document.querySelector(".lightbox-prev");
        const nextBtn = document.querySelector(".lightbox-next");

        let progressBar = lightbox.querySelector(".lightbox-progress-bar");
        if (!progressBar) {
            const progressWrap = document.createElement("div");
            progressWrap.className = "lightbox-progress";
            progressBar = document.createElement("div");
            progressBar.className = "lightbox-progress-bar";
            progressWrap.appendChild(progressBar);
            lightbox.appendChild(progressWrap);
        }

        let currentIndex = 0;
        let animToken = 0;
        let uiIdleTimer = null;
        const imageArray = [];

        const padTwo = (n) => String(n).padStart(2, "0");

        const preloadAdjacent = (idx) => {
            const len = imageArray.length;
            if (len < 2) return;
            [imageArray[(idx - 1 + len) % len], imageArray[(idx + 1) % len]].forEach(src => {
                const img = new Image();
                img.src = src;
            });
        };

        const renderLightboxMeta = (idx) => {
            if (lightboxCounter) {
                lightboxCounter.textContent = `${padTwo(idx + 1)} / ${padTwo(imageArray.length)}`;
            }
            if (progressBar) {
                progressBar.style.width = `${((idx + 1) / imageArray.length) * 100}%`;
            }
            preloadAdjacent(idx);
        };

        const wakeLightboxUI = () => {
            lightbox.classList.remove("ui-idle");
            clearTimeout(uiIdleTimer);
            if (!prefersReducedMotion && lightbox.classList.contains("active")) {
                uiIdleTimer = setTimeout(() => {
                    const focusedInside = lightbox.querySelector(":hover, :focus");
                    if (!focusedInside) lightbox.classList.add("ui-idle");
                }, 2200);
            }
        };

        const clearImgInlineMotion = () => {
            lightboxImg.style.transition = "";
            lightboxImg.style.transform = "";
            lightboxImg.style.opacity = "";
            lightboxImg.style.willChange = "";
        };

        const openLightboxAt = (index, sourceImg) => {
            const token = ++animToken;
            currentIndex = index;
            const firstRect = sourceImg.getBoundingClientRect();

            clearImgInlineMotion();
            lightboxImg.src = imageArray[currentIndex];
            lightboxImg.alt = sourceImg.alt || "";
            renderLightboxMeta(currentIndex);
            document.body.style.overflow = "hidden";
            lightbox.classList.add("active");
            lightbox.setAttribute("aria-hidden", "false");
            wakeLightboxUI();

            if (prefersReducedMotion || !firstRect.width) return;

            const runFlipIn = () => {
                if (token !== animToken || !lightbox.classList.contains("active")) return;
                const lastRect = lightboxImg.getBoundingClientRect();
                if (!lastRect.width || !lastRect.height) return;

                const dx = (firstRect.left + firstRect.width / 2) - (lastRect.left + lastRect.width / 2);
                const dy = (firstRect.top + firstRect.height / 2) - (lastRect.top + lastRect.height / 2);
                const scale = Math.min(firstRect.width / lastRect.width, firstRect.height / lastRect.height);

                lightboxImg.style.willChange = "transform";
                lightboxImg.style.transition = "none";
                lightboxImg.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`;
                lightboxImg.getBoundingClientRect();

                requestAnimationFrame(() => {
                    if (token !== animToken) return;
                    lightboxImg.style.transition = "transform 400ms var(--ease), opacity 350ms var(--ease)";
                    lightboxImg.style.transform = "translate3d(0, 0, 0) scale(1)";
                    setTimeout(() => {
                        if (token === animToken) clearImgInlineMotion();
                    }, 420);
                });
            };

            if (lightboxImg.complete && lightboxImg.naturalWidth > 0) {
                runFlipIn();
            } else {
                lightboxImg.addEventListener("load", runFlipIn, { once: true });
            }
        };

        const switchPhoto = (direction) => {
            if (!imageArray.length) return;
            const token = ++animToken;
            currentIndex = (currentIndex + direction + imageArray.length) % imageArray.length;
            wakeLightboxUI();

            if (prefersReducedMotion) {
                lightboxImg.src = imageArray[currentIndex];
                lightboxImg.alt = galleryImages[currentIndex]?.alt || "";
                renderLightboxMeta(currentIndex);
                return;
            }

            const outOffset = direction > 0 ? -28 : 28;
            const inOffset = direction > 0 ? 28 : -28;
            lightboxImg.style.willChange = "transform, opacity";
            lightboxImg.style.transition = "transform 170ms var(--ease), opacity 170ms var(--ease)";
            lightboxImg.style.opacity = "0";
            lightboxImg.style.transform = `translate3d(${outOffset}px, 0, 0)`;

            setTimeout(() => {
                if (token !== animToken) return;
                const finishSwap = () => {
                    if (token !== animToken) return;
                    lightboxImg.style.transition = "none";
                    lightboxImg.style.opacity = "0";
                    lightboxImg.style.transform = `translate3d(${inOffset}px, 0, 0)`;
                    lightboxImg.getBoundingClientRect();
                    requestAnimationFrame(() => {
                        if (token !== animToken) return;
                        lightboxImg.style.transition = "transform 350ms var(--ease), opacity 350ms var(--ease)";
                        lightboxImg.style.opacity = "1";
                        lightboxImg.style.transform = "translate3d(0, 0, 0)";
                        setTimeout(() => {
                            if (token === animToken) clearImgInlineMotion();
                        }, 370);
                    });
                };

                lightboxImg.src = imageArray[currentIndex];
                lightboxImg.alt = galleryImages[currentIndex]?.alt || "";
                renderLightboxMeta(currentIndex);

                if (lightboxImg.complete && lightboxImg.naturalWidth > 0) {
                    finishSwap();
                } else {
                    lightboxImg.addEventListener("load", finishSwap, { once: true });
                }
            }, 160);
        };

        const closeL = () => {
            const token = ++animToken;
            clearTimeout(uiIdleTimer);
            const thumb = galleryImages[currentIndex];
            const thumbRect = thumb ? thumb.getBoundingClientRect() : null;
            const currentRect = lightboxImg.getBoundingClientRect();
            const thumbVisible = Boolean(
                thumbRect &&
                thumbRect.width > 0 &&
                thumbRect.bottom > -80 &&
                thumbRect.top < window.innerHeight + 80
            );

            if (!prefersReducedMotion && thumbVisible && currentRect.width > 0) {
                const dx = (thumbRect.left + thumbRect.width / 2) - (currentRect.left + currentRect.width / 2);
                const dy = (thumbRect.top + thumbRect.height / 2) - (currentRect.top + currentRect.height / 2);
                const scale = Math.min(thumbRect.width / currentRect.width, thumbRect.height / currentRect.height);

                lightboxImg.style.willChange = "transform";
                lightboxImg.style.transition = "transform 400ms var(--ease), opacity 350ms var(--ease)";
                lightboxImg.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`;
            }

            lightbox.classList.remove("active");
            lightbox.classList.remove("ui-idle");
            lightbox.setAttribute("aria-hidden", "true");

            setTimeout(() => {
                if (token !== animToken) return;
                document.body.style.overflow = "";
                clearImgInlineMotion();
            }, prefersReducedMotion ? 180 : 400);
        };

        galleryImages.forEach((img, index) => {
            imageArray.push(img.src);
            img.addEventListener("click", () => openLightboxAt(index, img));
        });

        if (closeBtn) closeBtn.addEventListener("click", closeL);
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeL();
        });
        lightbox.addEventListener("mousemove", wakeLightboxUI, { passive: true });
        lightbox.addEventListener("pointerdown", wakeLightboxUI, { passive: true });

        if (nextBtn) nextBtn.addEventListener("click", () => switchPhoto(1));
        if (prevBtn) prevBtn.addEventListener("click", () => switchPhoto(-1));

        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;
            wakeLightboxUI();
            if (e.key === "Escape") closeL();
            if (e.key === "ArrowRight") switchPhoto(1);
            if (e.key === "ArrowLeft") switchPhoto(-1);
        });

        // Mobile swipe with drag feedback & velocity inertia
        let touchStartX = 0;
        let touchStartY = 0;
        let touchStartTime = 0;
        let touchDeltaX = 0;
        let isDraggingX = false;

        lightbox.addEventListener("touchstart", (e) => {
            if (!lightbox.classList.contains("active") || e.touches.length !== 1) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
            touchDeltaX = 0;
            isDraggingX = false;
            wakeLightboxUI();
        }, { passive: true });

        lightbox.addEventListener("touchmove", (e) => {
            if (!lightbox.classList.contains("active") || e.touches.length !== 1) return;
            const dx = e.touches[0].clientX - touchStartX;
            const dy = e.touches[0].clientY - touchStartY;
            if (!isDraggingX) {
                if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
                    isDraggingX = true;
                    lightboxImg.style.willChange = "transform, opacity";
                    lightboxImg.style.transition = "none";
                } else {
                    return;
                }
            }
            touchDeltaX = dx;
            lightboxImg.style.transform = `translate3d(${dx}px, 0, 0)`;
            lightboxImg.style.opacity = String(Math.max(0.45, 1 - Math.abs(dx) / 480));
        }, { passive: true });

        lightbox.addEventListener("touchend", () => {
            if (!isDraggingX) return;
            isDraggingX = false;
            const dt = Math.max(16, Date.now() - touchStartTime);
            const velocity = touchDeltaX / dt;
            const projected = touchDeltaX + velocity * 120;

            if (Math.abs(projected) > 65) {
                switchPhoto(projected < 0 ? 1 : -1);
            } else {
                lightboxImg.style.transition = "transform 300ms var(--ease), opacity 300ms var(--ease)";
                lightboxImg.style.transform = "translate3d(0, 0, 0)";
                lightboxImg.style.opacity = "1";
                setTimeout(clearImgInlineMotion, 310);
            }
        }, { passive: true });
    }

    // Hero Photo Slideshow (8s slide, 1.2s crossfade, 1 -> 1.06 zoom, next-image preloading)
    const heroSlides = document.querySelectorAll(".hero-slide");
    const progressLines = document.querySelectorAll(".hero-progress-line");
    if (heroSlides.length > 1) {
        let heroIdx = 0;
        let heroTimer = null;

        const preloadHeroSlide = (idx) => {
            const slide = heroSlides[idx % heroSlides.length];
            if (!slide) return;
            const pre = new Image();
            pre.src = slide.src;
            if (typeof pre.decode === "function") pre.decode().catch(() => {});
        };

        const setHeroSlide = (nextIdx) => {
            if (nextIdx === heroIdx) return;
            const prevIdx = heroIdx;
            heroSlides.forEach(s => s.classList.remove("was-active"));
            heroSlides[prevIdx].classList.remove("active");
            heroSlides[prevIdx].classList.add("was-active");
            heroSlides[nextIdx].classList.add("active");
            progressLines.forEach((line, i) => line.classList.toggle("active", i === (nextIdx % progressLines.length)));
            heroIdx = nextIdx;
            preloadHeroSlide(nextIdx + 1);
        };

        preloadHeroSlide(1);

        progressLines.forEach((line, i) => {
            line.addEventListener("click", () => {
                setHeroSlide(i % heroSlides.length);
                if (heroTimer) {
                    clearInterval(heroTimer);
                    heroTimer = setInterval(() => setHeroSlide((heroIdx + 1) % heroSlides.length), 8000);
                }
            });
        });

        if (!prefersReducedMotion) {
            heroTimer = setInterval(() => {
                setHeroSlide((heroIdx + 1) % heroSlides.length);
            }, 8000);
        }
    }

    // Soft Fade-In for Lazy-Loaded Portfolio & Album Images
    const lazyImages = document.querySelectorAll("img[loading='lazy']");
    lazyImages.forEach(img => {
        if (img.classList.contains("hero-slide")) return;
        if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
        if (img.complete && img.naturalWidth > 0) {
            img.classList.add("img-loaded");
            return;
        }
        img.classList.add("dp-lazy");
        const markLoaded = () => img.classList.add("img-loaded");
        img.addEventListener("load", markLoaded, { once: true });
        img.addEventListener("error", markLoaded, { once: true });
    });
    setTimeout(() => {
        document.querySelectorAll("img.dp-lazy:not(.img-loaded)").forEach(img => {
            if (img.complete) img.classList.add("img-loaded");
        });
    }, 1500);

    // Subtle Scroll Reveal (600ms, once only, 80ms batch row stagger)
    if (!prefersReducedMotion) {
        document.querySelectorAll("main .page-section, main .card-surface, main .section-heading-group").forEach(el => {
            if (el.classList.contains("fade-in-up") || el.classList.contains("reveal")) return;
            const rect = el.getBoundingClientRect();
            if (rect.top > window.innerHeight * 0.96) {
                el.classList.add("reveal");
            }
        });
    }

    const revealEls = document.querySelectorAll(".fade-in-up, .reveal");
    if (prefersReducedMotion) {
        revealEls.forEach(el => el.classList.add("visible"));
    } else {
        const observer = new IntersectionObserver((entries, obs) => {
            const visibleBatch = entries.filter(e => e.isIntersecting);
            let cardStep = 0;
            visibleBatch.forEach(entry => {
                const el = entry.target;
                const isGridUnit = el.classList.contains("album-card") || el.classList.contains("gallery-item");
                if (isGridUnit) {
                    el.style.transitionDelay = `${Math.min(cardStep, 3) * 80}ms`;
                    cardStep++;
                }
                el.classList.add("visible");
                obs.unobserve(el);
                if (isGridUnit) {
                    setTimeout(() => { el.style.transitionDelay = ""; }, 900);
                }
            });
        }, {
            threshold: 0.06,
            rootMargin: "0px 0px -32px 0px"
        });

        revealEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
                el.classList.add("visible");
            } else {
                observer.observe(el);
            }
        });
    }

    // Track album card clicks cleanly
    document.querySelectorAll(".album-card").forEach(card => {
        card.addEventListener("click", () => {
            const title = card.querySelector(".album-card-title, h2, h3, .album-title")?.innerText?.trim() || "Album";
            const link = card.getAttribute("href") || "";
            if (window.trackAlbumOpen) {
                window.trackAlbumOpen(link, title);
            }
        });
    });

    const tfpForm = document.getElementById('tfp-booking-form');
    if (tfpForm) {
        tfpForm.addEventListener('submit', function() {
            if (window.trackFormSubmission) {
                window.trackFormSubmission('tfp_booking', { form_name: 'TFP Booking Form' });
            }
            const submitBtn = tfpForm.querySelector('button');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Siunčiama...';
            }
            setTimeout(() => {
                tfpForm.style.display = 'none';
                const successDisplay = document.getElementById('success-display');
                if (successDisplay) successDisplay.style.display = 'block';
                window.scrollTo({ top: 200, behavior: 'smooth' });
            }, 1000);
        });
    }

    // Generic form submission tracking
    document.querySelectorAll("form").forEach(form => {
        if (form.id === 'tfp-booking-form') return;
        form.addEventListener('submit', function() {
            if (window.trackFormSubmission) {
                window.trackFormSubmission(form.id || 'general_form', { form_name: form.getAttribute('name') || form.id || 'Web Form' });
            }
        });
    });
});
