// Global error handler to catch cross-origin script errors gracefully
window.addEventListener('error', (event) => {
    if (event.message === 'Script error.' && !event.filename) {
        event.preventDefault();
    }
});

// ==============================================================================
// 🩺 Firebase Auth Configuration & Initialization Diagnostic Logger
// Ensures current configuration is strictly injected without stale or cached values
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
                console.log('Status Synchronized:', isMatching ? '✅ TAIP (Sutampa)' : '⚠️ NE (Nesutampa)');
                console.log('Uses Default/Fallback:', isDefaultFallback ? '⚠️ Taip (Naudoja .firebaseapp.com)' : '✅ Ne (Tiesioginis domenas)');
                console.log('Auth Redirect URI:', diag.targetRedirectUri);
                console.log('Current Hostname:', diag.windowHostname);
                console.log('Is Prefix Subdomain (portfolio.*):', diag.isPrefixSubdomain);
                console.log('Full Diagnostic State:', diag);
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

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 600);
    }
});

setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader && preloader.style.display !== "none") {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 600);
    }
}, 3000);

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("main-header") || document.querySelector("header");
    
    window.addEventListener("scroll", () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    });

    const burger = document.getElementById("burger-menu") || document.querySelector(".burger");
    const navOverlay = document.getElementById("nav-overlay") || document.querySelector(".nav-overlay");
    
    const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

    if (burger && navOverlay) {
        burger.addEventListener("click", () => {
            const isActive = burger.classList.toggle("active");
            navOverlay.classList.toggle("active");
            
            if (isActive) {
                const scrollbarWidth = getScrollbarWidth();
                document.body.style.overflow = "hidden";
                document.body.style.paddingRight = `${scrollbarWidth}px`;
                if(header) header.style.paddingRight = `calc(5vw + ${scrollbarWidth}px)`;
                if(header) header.classList.remove("scrolled");
            } else {
                document.body.style.overflow = "";
                document.body.style.paddingRight = "0px";
                if(header) header.style.paddingRight = "";
                if (window.scrollY > 50 && header) {
                    header.classList.add("scrolled");
                }
            }
        });
    }

    const slides = document.querySelectorAll(".hero-slide");
    let currentSlide = 0;
    
    if (slides.length > 1) {
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 5000);
    }

    const galleryImages = document.querySelectorAll(".gallery-item img");
    const lightbox = document.getElementById("lightbox");
    
    if (galleryImages.length > 0 && lightbox) {
        const lightboxImg = document.getElementById("lightbox-img");
        const lightboxCounter = document.getElementById("lightbox-counter");
        const closeBtn = document.querySelector(".lightbox-close");
        const prevBtn = document.querySelector(".lightbox-prev");
        const nextBtn = document.querySelector(".lightbox-next");
        
        let currentIndex = 0;
        let imageArray = [];
        let touchStartX = 0;
        let touchEndX = 0;
        
        galleryImages.forEach((img, index) => {
            imageArray.push(img.src);
            img.addEventListener("click", () => {
                currentIndex = index;
                lightboxImg.src = imageArray[currentIndex];
                if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${imageArray.length}`;
                
                const scrollbarWidth = getScrollbarWidth();
                document.body.style.overflow = "hidden";
                document.body.style.paddingRight = `${scrollbarWidth}px`;
                if(header) header.style.paddingRight = `calc(5vw + ${scrollbarWidth}px)`;
                
                lightbox.classList.add("active");
            });
        });
        
        const updateL = () => {
            lightboxImg.classList.add('loading');
            setTimeout(() => {
                lightboxImg.src = imageArray[currentIndex];
                if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${imageArray.length}`;
            }, 350);
        };

        if (lightboxImg) {
            lightboxImg.addEventListener('load', () => {
                lightboxImg.classList.remove('loading');
            });
        }
        
        const closeL = () => {
            lightbox.classList.remove("active");
            setTimeout(() => {
                document.body.style.overflow = "";
                document.body.style.paddingRight = "0px";
                if(header) header.style.paddingRight = "";
            }, 400);
        };

        if (closeBtn) closeBtn.addEventListener("click", closeL);
        
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % imageArray.length;
                updateL();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
                updateL();
            });
        }
        
        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;
            if (e.key === "Escape") closeL();
            if (e.key === "ArrowRight") {
                currentIndex = (currentIndex + 1) % imageArray.length;
                updateL();
            }
            if (e.key === "ArrowLeft") {
                currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
                updateL();
            }
        });

        lightbox.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        lightbox.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});

        const handleSwipe = () => {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                currentIndex = (currentIndex + 1) % imageArray.length;
                updateL();
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
                updateL();
            }
        };
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".fade-in-up, .reveal").forEach(el => {
        observer.observe(el);
    });

    // =========================================================================
    // Interactive Gallery Category Filter Bar (Automotive, Nature, Heritage, Flora)
    // =========================================================================
    const filterButtons = document.querySelectorAll(".gallery-filter-btn");
    const albumCards = document.querySelectorAll(".album-grid-columns .album-card");
    const filterStatus = document.getElementById("gallery-filter-status");

    if (filterButtons.length > 0 && albumCards.length > 0) {
        // Dynamic category count calculation
        const counts = {
            all: albumCards.length,
            automotive: 0,
            nature: 0,
            heritage: 0,
            flora: 0
        };

        albumCards.forEach(card => {
            const cat = (card.getAttribute("data-category") || "").toLowerCase().trim();
            if (counts[cat] !== undefined) {
                counts[cat]++;
            }
        });

        // Update badge counts in filter buttons
        Object.keys(counts).forEach(key => {
            const countEl = document.getElementById(`count-${key}`);
            if (countEl) {
                countEl.textContent = counts[key];
            }
        });

        const categoryLabels = {
            all: "Visi darbai",
            automotive: "Automotive",
            nature: "Nature",
            heritage: "Heritage",
            flora: "Flora"
        };

        const updateFilterStatus = (activeFilter, visibleCount) => {
            if (!filterStatus) return;
            if (activeFilter === "all") {
                filterStatus.innerHTML = `Rodomi visi ${visibleCount} galerijos albumai`;
            } else {
                const label = categoryLabels[activeFilter] || activeFilter;
                filterStatus.innerHTML = `Kategorija: <strong>${label}</strong> &bull; Rodomi ${visibleCount} albumai`;
            }
        };

        const applyFilter = (filterName) => {
            let visibleCount = 0;

            albumCards.forEach(card => {
                const cardCat = (card.getAttribute("data-category") || "").toLowerCase().trim();
                const matches = (filterName === "all" || cardCat === filterName);

                if (matches) {
                    card.classList.remove("filter-hidden");
                    card.classList.remove("filter-animating-in");
                    // Force reflow to replay entry animation
                    void card.offsetWidth;
                    card.classList.add("filter-animating-in");
                    card.classList.add("visible");
                    visibleCount++;
                } else {
                    card.classList.add("filter-hidden");
                    card.classList.remove("filter-animating-in");
                }
            });

            // Update button active state & aria attributes
            filterButtons.forEach(btn => {
                const btnFilter = btn.getAttribute("data-filter");
                const isActive = (btnFilter === filterName);
                btn.classList.toggle("active", isActive);
                btn.setAttribute("aria-selected", isActive ? "true" : "false");
            });

            updateFilterStatus(filterName, visibleCount);
        };

        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const filter = btn.getAttribute("data-filter");
                const isCurrentlyActive = btn.classList.contains("active");

                // Toggle logic: If user clicks the active category button again, toggle back to 'all'
                if (isCurrentlyActive && filter !== "all") {
                    applyFilter("all");
                } else {
                    applyFilter(filter);
                }
            });

            // Keyboard navigation support
            btn.addEventListener("keydown", (e) => {
                const buttons = Array.from(filterButtons);
                const currentIndex = buttons.indexOf(btn);

                if (e.key === "ArrowRight") {
                    e.preventDefault();
                    const nextBtn = buttons[(currentIndex + 1) % buttons.length];
                    nextBtn.focus();
                    nextBtn.click();
                } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    const prevBtn = buttons[(currentIndex - 1 + buttons.length) % buttons.length];
                    prevBtn.focus();
                    prevBtn.click();
                }
            });
        });

        // Initial status update
        updateFilterStatus("all", albumCards.length);

        // Track album card clicks
        albumCards.forEach(card => {
            card.addEventListener("click", () => {
                const title = card.querySelector("h2, h3, .album-title")?.innerText?.trim() || card.getAttribute("data-category") || "Album";
                const link = card.getAttribute("href") || card.querySelector("a")?.getAttribute("href") || "";
                if (window.trackAlbumOpen) {
                    window.trackAlbumOpen(link, title);
                }
            });
        });
    }

    const tfpForm = document.getElementById('tfp-booking-form');
    if(tfpForm) {
        tfpForm.addEventListener('submit', function(e) {
            if (window.trackFormSubmission) {
                window.trackFormSubmission('tfp_booking', { form_name: 'TFP Booking Form' });
            }
            const submitBtn = tfpForm.querySelector('button');
            submitBtn.disabled = true;
            submitBtn.innerText = 'Siunčiama...';
            setTimeout(() => {
                tfpForm.style.display = 'none';
                document.getElementById('success-display').style.display = 'block';
                window.scrollTo({ top: 200, behavior: 'smooth' });
            }, 1000);
        });
    }

    // Generic form submission tracking
    document.querySelectorAll("form").forEach(form => {
        if (form.id === 'tfp-booking-form') return; // already handled
        form.addEventListener('submit', function() {
            if (window.trackFormSubmission) {
                window.trackFormSubmission(form.id || 'general_form', { form_name: form.getAttribute('name') || form.id || 'Web Form' });
            }
        });
    });
});
