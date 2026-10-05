// ==============================================================================
// DP.PORTFOLIO - Centralized Analytics Integration (GA4 & Firebase Analytics)
// ==============================================================================

(function() {
    // 1. Centralized Measurement ID Placeholder
    // Can be overridden via window.GA4_MEASUREMENT_ID or environment variable injection
    const DEFAULT_MEASUREMENT_ID = "G-XXXXXXXXXX";
    const MEASUREMENT_ID = (typeof window !== 'undefined' && (window.GA4_MEASUREMENT_ID || window.FIREBASE_MEASUREMENT_ID)) 
        ? (window.GA4_MEASUREMENT_ID || window.FIREBASE_MEASUREMENT_ID) 
        : DEFAULT_MEASUREMENT_ID;

    window.GA4_MEASUREMENT_ID = MEASUREMENT_ID;

    // 2. Initialize Google Analytics 4 (gtag.js)
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID, {
        send_page_view: false, // We control page_view triggers cleanly below
        cookie_domain: 'auto',
        cookie_flags: 'SameSite=None;Secure'
    });

    // Dynamically inject the GA4 script tag if not already present
    if (!document.getElementById('ga4-script')) {
        const script = document.createElement('script');
        script.id = 'ga4-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
        document.head.appendChild(script);
    }

    // 3. Centralized Tracking Helpers
    window.trackPageView = function(pagePath, pageTitle) {
        const path = pagePath || window.location.pathname;
        const title = pageTitle || document.title;
        gtag('event', 'page_view', {
            page_path: path,
            page_title: title,
            page_location: window.location.href
        });
    };

    window.trackAlbumOpen = function(albumId, albumName) {
        gtag('event', 'album_open', {
            album_id: albumId,
            album_name: albumName,
            event_category: 'engagement',
            event_label: albumName || albumId
        });
    };

    window.trackFormSubmission = function(formType, details = {}) {
        gtag('event', 'form_submission', {
            form_type: formType, // 'tfp_booking', 'service_order', 'contact_inquiry', 'review_submission'
            form_name: details.name || formType,
            event_category: 'lead',
            ...details
        });
    };

    window.trackEvent = function(eventName, params = {}) {
        gtag('event', eventName, params);
    };

    // 4. Automatic pageview on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.trackPageView();
        });
    } else {
        window.trackPageView();
    }
})();
