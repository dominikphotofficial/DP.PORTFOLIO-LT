# DP.PORTFOLIO — Design System & Implementation Reference

Single source of truth for the **DP.PORTFOLIO** website visual system as currently implemented across the main site, subpages, all album series pages, language subdomains, and the administration panel.

---

## 1. Design Tokens

All visual tokens live at the top of `/style.css` inside `:root`. Never hard-code colors, typography families, spacing measurements, radii, or easing curves outside these tokens.

### 1.1 Exact `:root` CSS Variables (`style.css`)

```css
:root {
  /* Colors */
  --bg: #ffffff;
  --bg-soft: #fafaf8;
  --text: #1a1a1a;
  --text-muted: #6b6b6b;
  --text-faint: #9a9a9a;
  --accent: #113939;
  --accent-hover: #1d5252;
  --border: #e8e8e8;

  /* Typography — Montserrat everywhere */
  --font: "Montserrat", system-ui, sans-serif;
  --fs-xs: 0.75rem;                      /* 12px — kickers, index numbers, legal/lang metadata */
  --fs-sm: 0.875rem;                     /* 14px — subtitles, metadata rows, admin tables */
  --fs-base: 1rem;                       /* 16px — minimum mobile body size & inputs */
  --fs-lg: 1.25rem;                      /* 20px — album card titles & subsection headings */
  --fs-xl: clamp(1.75rem, 4vw, 2.5rem);  /* 28px–40px — section headings (h2) */
  --fs-hero: clamp(2.5rem, 7vw, 5.75rem);/* 40px–92px — hero title & album hero title */
  --ls-label: 0.28em;                    /* uppercase kickers, portfolio label, scroll cue */
  --ls-title: 0.01em;                    /* headings & card titles */
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-bold: 600;
  --lh: 1.65;

  /* Spacing Scale (strictly use these) */
  --sp-1: 4px;
  --sp-2: 8px;
  --sp-3: 16px;
  --sp-4: 24px;
  --sp-5: 40px;
  --sp-6: 64px;
  --sp-7: 112px;

  /* Shape, Layout & Motion */
  --radius: 2px;                         /* crisp gallery-like sharp corners */
  --maxw: 1280px;                        /* max content width */
  --gutter: clamp(16px, 4vw, 48px);      /* horizontal page gutter */
  --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
  --ease-reveal: 500ms var(--ease);

  /* Per-album theme defaults (overridden by .series-* on album <body>) */
  --series-accent: var(--accent);
  --series-tint: var(--bg);
  --series-motion: 500ms;

  /* Compatibility aliases for embedded subpage/admin modules */
  --bg-color: var(--bg);
  --surface-color: var(--bg);
  --accent-color: var(--accent);
  --accent-light: var(--accent);
  --text-color: var(--text);
  --font-heading: var(--font);
  --font-body: var(--font);
}
```

### 1.2 Global Typography & Color Discipline

- **Font import** (loaded on all 33 HTML pages via Google Fonts):
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
  ```
- **Weights used**: `400` (`--fw-regular`), `500` (`--fw-medium`), `600` (`--fw-bold`). No grotesque fallbacks or secondary UI typefaces are permitted.
- **Root font size**: `html { font-size: 16px; }`, ensuring mobile body prose and inputs never drop below `16px`.
- **Headings (`h1`–`h6`)**: `font-family: var(--font); font-weight: var(--fw-bold); letter-spacing: var(--ls-title); line-height: 1.22; text-wrap: balance;`.
- **Accent `#113939` usage**: Reserved strictly for primary buttons, active navigation indicators, hover states, focus rings, dividers (`48px × 1.5px`), kickers, lightbox progress bar, and subtle UI highlights. Never used for large surface fills or body copy.
- **No background logo watermark**: `body::before` and any background DP logo watermarks behind body copy, navigation drawer, or footer are intentionally excluded.

---

## 2. Per-Series Album Themes

Every album page applies two classes to `<body>`: `has-hero` plus one of four `.series-*` classes defined in `style.css`. No inline `<style>:root { ... }</style>` blocks are used in album pages.

```css
.series-horses {
  --series-accent: #8b5e3c;
  --series-tint: #f5efe6;
  --series-motion: 700ms;
}

.series-portraits {
  --series-accent: #1a1a1a;
  --series-tint: #f4f4f4;
  --series-motion: 550ms;
}

.series-nature {
  --series-accent: #2f6b64;
  --series-tint: #eef4f2;
  --series-motion: 550ms;
}

.series-urban {
  --series-accent: #3d4f66;
  --series-tint: #eef1f5;
  --series-motion: 400ms;
}
```

### How Series Themes Apply
- **Page background**: `body { background-color: var(--series-tint, var(--bg)); }`
- **Scrolled header**: `background-color: color-mix(in srgb, var(--series-tint, var(--bg)) 92%, transparent);`
- **Highlights & UI accents**: `.divider`, `.feature-kicker`, `.album-back-link:hover`, `.album-info-label`, `.album-info-link`, `.lightbox-progress-bar`, and lightbox hover controls inherit `var(--series-accent, var(--accent))`.
- **Reveal pace**: Controlled by `--series-motion` (`700ms` calm slow pace for horses, `550ms` for portraits/nature, `400ms` crisp pace for urban).

### Album-to-Series Mapping (All 22 Album Files)

| Series Class | `--series-accent` | `--series-tint` | Album HTML Files |
| :--- | :--- | :--- | :--- |
| `.series-horses` | `#8b5e3c` | `#f5efe6` | `albums/zeimenos-zirgai.html` |
| `.series-portraits` | `#1a1a1a` | `#f4f4f4` | `albums/cirkliskis.html`, `albums/petrausku-namai.html`, `albums/rundale.html`, `albums/valdovu-rumai.html`, `albums/winter.html`, `albums/winter-cirkliskis.html`, `albums/winter-sventa.html` |
| `.series-nature` | `#2f6b64` | `#eef4f2` | `albums/azuolynas.html`, `albums/azuolyno-parkas.html`, `albums/baltoji-kiele.html`, `albums/gandras.html`, `albums/geles.html`, `albums/sirvetos-parkas.html`, `albums/sventa.html`, `albums/vdu-sodas.html` |
| `.series-urban` | `#3d4f66` | `#eef1f5` | `albums/autoshow-kaunas-09-05.html`, `albums/bmw-e36.html`, `albums/car-meet-2026-05-26.html`, `albums/car-meet-kaunas.html`, `albums/moletu-observatorija.html`, `albums/noka.html` |

---

## 3. Components Specification

### 3.1 Header (`header` / `#main-header`)

- **Structure**:
  ```html
  <header id="main-header">
      <div class="header-container">
          <a href="index.html" class="logo" aria-label="DP.PORTFOLIO">
              <span class="logo-mark"><img src="https://iili.io/fjNLbs4.png" alt="DP.PORTFOLIO" class="logo-img"></span>
              <span class="logo-sub">Portfolio</span>
          </a>
          <div class="header-right">
              <div class="header-langs" aria-label="Kalba">...</div>
              <button type="button" class="burger" id="burger-menu" aria-label="Atidaryti meniu" aria-expanded="false" aria-controls="nav-overlay">
                  <span></span><span></span><span></span>
              </button>
          </div>
      </div>
  </header>
  ```
- **Key CSS**:
  - Dimensions: `height: 64px` (mobile), `72px` (`min-width: 640px`), `.header-container` max-width `var(--maxw)` with `padding-inline: var(--gutter)`.
  - Logo mark: `.logo-mark` is a `36px × 36px` square (`border: 1px solid var(--text)`, `border-radius: var(--radius)`, `padding: 4px`, `.logo-img` height `24px`) paired with `.logo-sub` (`font-size: var(--fs-xs)`, `font-weight: 500`, `letter-spacing: var(--ls-label)`, uppercase).
  - Non-hero pages (`about`, `biography`, `contacts`, `frozen-time`, `privacy-policy`, `review`, `services`, `terms-of-service`, `tfp-booking`, `admin`): `position: sticky; top: 0;` with translucent white backdrop blur (`backdrop-filter: blur(10px)`) and `1px solid var(--border)` bottom border.
  - Hero pages (`body.has-hero` on `index.html` and `albums/*.html`): `position: fixed;`, transparent with top dark scrim gradient (`rgba(14,18,18,0.54)` to transparent), white `.logo-sub` / `.header-langs a` / `.burger span`. After scrolling past `80px` (`window.scrollY > 80`), `script.js` toggles `.scrolled` and transitions smoothly over `300ms var(--ease)` to translucent `var(--series-tint, var(--bg))` at `92%` opacity with `backdrop-filter: blur(10px)` and dark foreground text.

### 3.2 Burger Trigger & Slide-Over Navigation Drawer

- **Burger (`.burger`)**:
  - `width: 44px; height: 44px; align-items: flex-end; gap: 6px; padding: 0 8px;`
  - Three `1.5px` high lines (`<span>`): top `26px`, middle `20px`, bottom `26px`.
  - `.burger.active` morphs lines 1 & 3 (`±7.5px` + `±45deg`) into a thin `X` while scaling line 2 to `0`.
- **Drawer Overlay (`.nav-overlay`, `.nav-panel`)**:
  - Backdrop: `.nav-overlay` (`rgba(15, 20, 20, 0.36)`, `backdrop-filter: blur(4px)`, opacity `350ms var(--ease)`).
  - Panel: `.nav-panel` (`100%` fullscreen on mobile, `width: min(480px, 100vw)` on `>= 640px` anchored right with `1px solid var(--border)` left edge), `transform: translateX(100%) -> translateX(0)` over `350ms var(--ease)`.
  - Scroll lock: `body.menu-open { overflow: hidden; }`. Closes on `Escape`, backdrop click, `.nav-close` (`44px × 44px`), or any `.nav-link` click.
  - Links inside `.mobile-nav`:
    - Primary numbered links (`01`–`06` via `.nav-num` muted in `--text-faint` with `tabular-nums`, label wrapped in `.nav-label-text`): `font-size: 1.75rem` (`28px` mobile) / `2.25rem` (`36px` at `>= 768px`), `font-weight: 500`, `min-height: 60px`.
    - Secondary links (`.nav-link.nav-secondary` for Privacy Policy & Terms): `font-size: var(--fs-sm)`, `font-weight: 400`, `color: var(--text-muted)`, `min-height: 44px`.
    - Stagger reveal on open: `.nav-link` animates from `opacity: 0; transform: translateY(12px)` to `opacity: 1; transform: translateY(0)` over `350ms var(--ease)` with `60ms` steps (`40ms`, `100ms`, `160ms`, `220ms`, `280ms`, `340ms`, `400ms`, `460ms`).
    - Active link state: `color: var(--series-accent, var(--accent))` + `1.5px` underline via `.nav-label-text::after`.
    - Hover state: `transform: translateX(6px)` + accent color.
  - Panel bottom (`.nav-panel-footer`): `border-top: 1px solid var(--border)`, `.nav-panel-langs`, email (`info@dominikphotofficial.lt`), and Instagram (`@dominikphotofficial`).

### 3.3 Home Hero Slideshow (`.hero`)

- **Structure**: `.hero` > `.hero-slides` (`3` `.hero-slide` `<img>` elements) + `.hero-scrim` + `.hero-content` (`h1.hero-title` + `p.hero-descriptors`) + `.hero-scroll` + `.hero-progress` (`3` `.hero-progress-line` `<button>` elements).
- **Dimensions & Overlay**: `height: 100svh; min-height: 520px; background: #141a1a;` with vertical dark gradient `.hero-scrim` (`26%` to `56%` dark opacity).
- **Slideshow Timing & Zoom**: Cycles every `6000ms` via `script.js` (`opacity 1200ms var(--ease)` crossfade paired with `transform: scale(1) -> scale(1.05)` over `6000ms linear`).
- **Typography**: `.hero-title` renders `"DP.PORTFOLIO"` at `--fs-hero` (`2.5rem`–`5.75rem`), weight `600`, `letter-spacing: 0.02em`. `.hero-descriptors` renders `"ERDVĖ · ŠVIESA · EMOCIJA"` at `0.8125rem` (`13px`), uppercase, `letter-spacing: 0.3em`, `rgba(255, 255, 255, 0.85)`.
- **Scroll Cue & Progress**:
  - Bottom center `.hero-scroll` (`SCROLL` uppercase + `1px × 36px` `.hero-scroll-line` with animated `2.2s` downward stroke).
  - Bottom right `.hero-progress` (`3` horizontal `1.5px` lines: `28px` inactive `rgba(255,255,255,0.35)`, `40px` active `#ffffff`). Clicking jumps slides and resets interval.
  - Both `.hero-scroll` and `.hero-progress` fade out (`.hidden`) once `window.scrollY > 40`.

### 3.4 TFP Booking Block (`.booking-block`)

- **Structure**: Centered section containing `.feature-kicker` (`TFP Registracija`), `<h2>`, one descriptive paragraph, and one `.btn-primary` CTA linking to `tfp-booking.html`.
- **Key CSS**: `max-width: 620px; margin-inline: auto; text-align: center; padding-top: var(--sp-7); padding-bottom: var(--sp-6); padding-inline: var(--gutter);`.

### 3.5 Feature Boards (`Services` & `Žeimenos Žirgai`)

- **Classes**: `.film-promo-board` (Services board) and `.zeimenos-feature-board` (Žeimenos Žirgai board), sharing structural styles with `.feature-board`.
- **Key CSS**:
  - `display: grid; grid-template-columns: 1fr;` (2 equal columns `1fr 1fr` at `min-width: 768px`).
  - Surface & border: `background: var(--bg-soft); border: 1px solid var(--border); border-radius: var(--radius); margin-bottom: var(--sp-6)` (`--sp-7` at `>= 1024px`).
  - Media (`.promo-bg`, `.zeimenos-feature-img`, `.feature-board-media`): `min-height: 300px; overflow: hidden;` with `img { object-fit: cover; transition: transform 900ms var(--ease); }` scaling to `1.04` on board hover.
  - Copy column (`.promo-content`, `.zeimenos-feature-content`): `background: var(--bg); padding: var(--sp-4)` (`--sp-6` at `>= 640px`), uppercase kicker (`.promo-badge` / `.zeimenos-badge` with `--ls-label`), `--fs-xl` title, muted prose, checklist (`.feature-list` prefixed with `"— "`) or unboxed separator tags (`.zeimenos-tag-pills`), and `.btn-primary` CTA row (plus `.zeimenos-phone-link` `min-height: 44px`).

### 3.6 Editorial Albums Section & Grid (`.section-header-editorial`, `.album-grid-columns`)

- **Category filter bar**: Permanently removed (no `.gallery-filter` in HTML, CSS, or JS).
- **Section Header**: `.section-header-editorial` (`border-bottom: 1px solid var(--border); padding-bottom: var(--sp-3); margin-bottom: var(--sp-5); display: flex; justify-content: space-between; align-items: baseline;`) with uppercase `.section-label-caps` left and `.section-count-muted` right.
- **Grid Columns & Staggered Offsets**:
  - Mobile (`< 640px`): `grid-template-columns: 1fr; gap: var(--sp-5);` (`40px`), covers `aspect-ratio: 4 / 5`.
  - Tablet (`>= 640px`): `grid-template-columns: repeat(2, 1fr); gap: var(--sp-4);` (`24px`).
  - Desktop (`>= 1024px`): 12-column magazine layout (`grid-template-columns: repeat(12, 1fr); column-gap: var(--sp-5); row-gap: var(--sp-6); align-items: start;`):
    - `.album-card:nth-child(odd)`: `grid-column: span 7;`, `.album-card-media { aspect-ratio: 4 / 3; }`.
    - `.album-card:nth-child(even)`: `grid-column: span 5; margin-top: var(--sp-7);` (`112px` vertical stagger), `.album-card-media { aspect-ratio: 4 / 5; }`.
- **Album Card (`.album-card`)**:
  - Image frame (`.album-card-media`): `border-radius: var(--radius); overflow: hidden; background: var(--bg-soft);`, `img { width: 100%; height: 100%; object-fit: cover; transition: transform 900ms var(--ease), opacity 500ms var(--ease); }` with `loading="lazy"`, `decoding="async"`, and explicit `width`/`height` attributes.
  - Text body (`.album-card-body`):
    - `.album-card-title`: `font-size: 1.25rem` (`20px`), `font-weight: 600`.
    - `.album-card-meta`: `font-size: var(--fs-sm)`, `color: var(--text-muted)`.
    - `.album-card-action` (`"Peržiūrėti albumą →"`): `font-size: var(--fs-xs)`, uppercase, `letter-spacing: 0.14em`, `color: var(--accent)`, `opacity: 0; transform: translateX(-8px)`.
  - Hover state: Image scales `1.04` over `900ms`, title turns `var(--accent)`, action label slides in (`opacity: 1; transform: translateX(0)` over `300ms`). On touch devices (`@media (hover: none)`), action label remains subtly visible (`opacity: 0.85`).

### 3.7 Album Page Flow (`albums/*.html`)

1. **Album Hero (`.album-hero`)**: `height: 70svh; min-height: 440px;` full-bleed cover image (`.album-hero-img`) behind `.album-hero-scrim`, top-left `.album-back-link` (`← Albumai`), `.album-hero-sub` uppercase kicker (`category · photo count · year`), and `h1.album-hero-title` (`--fs-hero`).
2. **Intro Row (`.album-intro` > `.album-intro-grid`)**: Two-column desktop layout (`minmax(0, 1.5fr) minmax(240px, 0.85fr)` at `>= 768px`) with existing story/partner header on the left (`.album-intro-copy`) and hairline-bordered metadata rows on the right (`.album-intro-meta` / `.album-intro-meta-row` displaying `Apimtis`, `Vieta`, `Autorius`).
3. **Photo Wall (`.gallery-grid`)**: Multi-column layout (`column-count: 1` mobile, `2` at `640px`, `3` at `1024px`; `column-gap: 6px` mobile / `8px` desktop) where `.gallery-item` preserves every photo's native aspect ratio (`img { width: 100%; height: auto; display: block; }`, zero stretching or cropping). Hover gently scales image (`1.03` over `900ms`). (Note: `albums/winter.html` displays the 2-series selector using `.album-grid-columns`.)
4. **Album Info / Partner Contacts (`.album-info-section`)**: 3-column structured `.album-info-band` (or `.album-contact-card` on `albums/zeimenos-zirgai.html`) separated by `1px solid var(--border)` top/bottom lines.
5. **Next Album Strip (`.next-album-strip`)**: Full-width sequential strip tinted via inline `--next-tint` and `--next-accent` of the next series, featuring `"KITAS ALBUMAS"`, series `<h2>`, and rightward translating arrow (`8px` on hover).
6. **Footer**: Standard `.footer-minimal`.

### 3.8 Lightbox (`#lightbox`)

- **Backdrop & Transitions**: Fixed full-viewport `#111111` surface (`z-index: 2000`), fading in/out over `350ms var(--ease)`.
- **Image Display**: Centered inside `.lightbox-image-wrapper` (`max-width: 92vw; max-height: 86vh; object-fit: contain`), smooth crossfade/horizontal nudge (`opacity` + `translateX(10px) -> 0`) over `350ms var(--ease)`. Adjacent previous and next images are preloaded in memory whenever the index changes.
- **Controls & Progress**:
  - `.lightbox-top`: Top bar with zero-padded counter (`#lightbox-counter`, formatted `03 / 24` via `tabular-nums`, `letter-spacing: 0.14em`) and `.lightbox-close` (`44px × 44px`).
  - `.lightbox-prev` / `.lightbox-next`: `44px × 44px` buttons (`rgba(255,255,255,0.08)`, subtle white border, hover fill `--series-accent`). Supports click arrows, keyboard `ArrowLeft`/`ArrowRight`/`Escape`, and mobile horizontal touch swipe (`50px` threshold).
  - `.lightbox-progress` / `.lightbox-progress-bar`: Bottom `2px` bar filled proportionally with `--series-accent`.

### 3.9 Buttons, Forms & Admin Panel

- **Primary Buttons** (`.btn-primary`, `.cta-button`, `.select-service-btn`, `.submit-service-btn`, `.submit-tfp-btn`, `.review-submit-btn`, `.submit-btn`, `.admin-btn`, `.admin-save-btn`):
  - `background-color: var(--accent); color: #ffffff; border: 1px solid var(--accent); border-radius: var(--radius); min-height: 48px; padding: 0 36px; font-size: 0.8125rem (13px); font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase;`
  - Hover: `background-color: var(--accent-hover); border-color: var(--accent-hover);`.
- **Secondary Buttons** (`.btn-secondary`, `.promo-btn`, `.admin-btn-outline`):
  - `background-color: transparent; color: var(--accent); border: 1px solid var(--accent);` with same `48px` height, `0.18em` tracking, `--radius: 2px`. Hover tints background `rgba(17, 57, 57, 0.06)`.
- **Inputs & Textareas**:
  - `font-family: var(--font); font-size: 16px; min-height: 48px; padding: 12px 14px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--bg); color: var(--text);`
  - Focus ring: `border-color: var(--accent); box-shadow: 0 0 0 2px rgba(17, 57, 57, 0.18);`.
- **Cards**: `.card-surface` (`background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: var(--sp-4)` / `--sp-5` at `>= 640px`).
- **Admin (`admin.html`)**: Uses identical `--font`, `--bg`, `--accent`, `--border`, `--radius`, and header/drawer shell. Employs compact data tables (`.vmi-table`, `.sheets-table`, `.audit-log-table`, `.diag-table`: `font-size: var(--fs-sm)`, header `#f9fafb`, `10px 12px` / `8px 12px` cell padding, horizontal scroll wrappers).

### 3.10 Editorial Footer (`.footer-minimal`)

- **Structure**: Top 3-column `.footer-editorial-grid` (`DP` brand mark + `Portfolio` label + tagline + `info@dominikphotofficial.lt` left; `Navigacija` column center; `Informacija` column right), bottom `.footer-min-bottom` with copyright notice left and `.footer-min-langs` switcher right.
- **Key CSS**: `background: var(--bg-soft); border-top: 1px solid var(--border); padding-top: var(--sp-6); padding-bottom: var(--sp-5);`. Links have minimum `36px–44px` hit areas and hover to `var(--accent)`. Zero background logo watermark.

---

## 4. Animation Rules

- **Primary Curve**: `var(--ease)` = `cubic-bezier(0.2, 0.7, 0.2, 1)`.
- **Reveal on Scroll (`.fade-in-up`, `.reveal`)**:
  - Hidden initial state: `opacity: 0; transform: translateY(14px);`.
  - Revealed state (`.visible`): `opacity: 1; transform: translateY(0);` transitioning over `var(--series-motion, 500ms) var(--ease)`.
  - Driven by `IntersectionObserver` (`threshold: 0.05`, `rootMargin: "0px 0px -24px 0px"`) with `80ms` row stagger (`(idx % 2) * 80` ms) applied to `.album-card` children and a `450ms` fallback reveal ensure no element stays invisible.
- **Lazy Images (`img.dp-lazy`)**: `opacity: 0 -> 1` over `500ms var(--ease)` on image load (handled cleanly with cached-image bypass).
- **Hover Transitions**: Links/buttons `250ms–300ms var(--ease)`; card/gallery/board cover zoom (`scale(1.03–1.04)`) `900ms var(--ease)`.
- **Hero Slideshow**: `6000ms` interval, `1200ms` opacity crossfade, `6000ms linear` subtle `scale(1) -> scale(1.05)`.
- **Page Navigation Fade**: Internal same-origin `.html` link clicks apply `body.page-leaving { opacity: 0; }` (`200ms var(--ease)`) before navigating, cleared on `pageshow`.
- **Reduced Motion (`@media (prefers-reduced-motion: reduce)`)**:
  - Collapses animation and transition durations to `0.01ms`, disables smooth scroll, removes `.hero-slide.active` zoom (`transform: none`), forces `.fade-in-up`, `.reveal`, `img.dp-lazy`, and `.mobile-nav .nav-link` to full `opacity: 1` with zero offset, and prevents JS slideshow auto-advance or page-fade delays.

---

## 5. Responsive Rules & Breakpoints

Mobile-first architecture with `html, body { overflow-x: hidden; overflow-wrap: anywhere; }` across all viewports (`375px`, `768px`, `1440px`):

- **Mobile (`375px` baseline / `< 640px`)**:
  - Header height `64px`; fullscreen `.nav-panel` drawer; primary nav links `28px`.
  - Single-column album cards (`1fr`, `aspect-ratio: 4 / 5`, gap `40px`), single-column feature boards, single-column album gallery (`column-count: 1`, gap `6px`), stacked 1-column footer.
  - All tap targets `>= 44px`; buttons `>= 48px`; inputs `16px` to prevent mobile iOS zoom.
- **Tablet (`768px` / `@media (min-width: 640px)` & `@media (min-width: 768px)`)**:
  - At `640px+`: Header becomes `72px`; `.nav-panel` docks right at `max-width: 480px`; albums grid switches to 2 equal columns (`gap: 24px`); gallery wall switches to `column-count: 2` (`gap: 8px`); `.album-info-grid`, `.album-contact-grid`, and `.footer-min-bottom` align horizontally.
  - At `768px+`: Drawer primary nav links expand to `36px`; Services & Žeimenos Žirgai boards become 2-column splits (`1fr 1fr`); `.album-intro-grid` splits story left and metadata right; `.footer-editorial-grid` renders its 3 columns (`1.4fr 1fr 1fr`).
- **Desktop (`1440px` / `@media (min-width: 1024px)`)**:
  - `.container` caps at `max-width: 1280px` (`--maxw`) with `clamp(16px, 4vw, 48px)` gutters and `112px` (`--sp-7`) vertical section padding.
  - Home `.album-grid-columns` expands to the 12-column editorial magazine grid (alternating 7-col `4:3` wide + 5-col `4:5` narrow with `112px` vertical offset).
  - Album `.gallery-grid` expands to `column-count: 3` (`column-gap: 8px`).

---

## 6. Project File Structure & Asset Linking

### Core Stylesheet & Client Scripts
- `/style.css` — Master stylesheet containing all design tokens and component rules.
- `/script.js` — Global scroll behavior, transparent hero header toggle (`80px`), 6s hero slideshow & progress bars, drawer menu toggle, `IntersectionObserver` stagger reveals, lazy image fade-in, lightbox viewer & preloading, `200ms` page transitions, Cookiebot production gate, and Firebase Auth diagnostics.
- `/album-footer.js` — Fallback footer injector synced to the 2-column `.footer-minimal` structure (`frozen-time.html` / `/albums/*`).
- `/analytics.js`, `/firebase-config.js`, `/google-sheets-service.js`, `/reviews-manager.js`, `/email-templates.js`, `/server.js` — Application backend, Firebase integration, analytics, email templates, and review modules.

### Root HTML Pages (link `href="style.css"` and `src="script.js"`)
- `/index.html` (`<body class="has-hero">`) — Home hero slideshow, TFP Booking block, Services & Žeimenos Žirgai boards, staggered albums showcase.
- `/about.html` — Studio/project overview (`Vizija & Estetika`, `DP | CORPORATION`).
- `/biography.html` — Photographer dossier, chapters `01`–`04`, film award spotlight, action links.
- `/services.html` — Photography & videography packages, Flatpickr calendar, booking form (also loads Flatpickr CSS/JS).
- `/tfp-booking.html` — Free TFP session collaboration booking page & Flatpickr scheduling.
- `/contacts.html` — Direct contact details & Formspree inquiry form.
- `/frozen-time.html` — Dedicated film showcase (`Frozen Time: What If`).
- `/review.html` — Verified client review submission & gallery review showcase.
- `/privacy-policy.html` — Legal privacy policy page.
- `/terms-of-service.html` — Legal terms of service page.
- `/admin.html` — Secure Firebase Auth, orders, VMI accounting/A4 invoices, Google Sheets sync, team permissions, and diagnostics (uses `style.css` + `html2pdf.bundle.min.js` + `script.js`).

### Album Pages in `/albums/` (link `href="../style.css"` and `src="../script.js"`)
All 22 files in `/albums/` use `<body class="has-hero series-*">` with `../` relative navigation paths:
- `albums/autoshow-kaunas-09-05.html`, `albums/azuolynas.html`, `albums/azuolyno-parkas.html`, `albums/baltoji-kiele.html`, `albums/bmw-e36.html`, `albums/car-meet-2026-05-26.html`, `albums/car-meet-kaunas.html`, `albums/cirkliskis.html`, `albums/gandras.html`, `albums/geles.html`, `albums/moletu-observatorija.html`, `albums/noka.html`, `albums/petrausku-namai.html`, `albums/rundale.html`, `albums/sirvetos-parkas.html`, `albums/sventa.html`, `albums/valdovu-rumai.html`, `albums/vdu-sodas.html`, `albums/winter.html`, `albums/winter-cirkliskis.html`, `albums/winter-sventa.html`, `albums/zeimenos-zirgai.html`.

*(Note: `albums/sirvetos-parkas.html` and `albums/vdu-sodas.html` reference `../script.js` directly.)*

---

## 7. Multilingual & Subdomain Rules

- Supported language versions share identical HTML markup, class names, layout spacing, font family (`Montserrat`), and CSS stylesheet (`/style.css` or `../style.css`):
  - **LT**: `https://dominikphotofficial.lt` / `https://portfolio.dominikphotofficial.lt`
  - **EN**: `https://en.dominikphotofficial.lt`
  - **PL**: `https://pl.dominikphotofficial.lt`
  - **RU**: `https://ru.dominikphotofficial.lt`
  - **KR**: `https://kr.dominikphotofficial.lt`
- **Only translated text copy changes** between language subdomains. Language sites must never define separate stylesheets or custom font overrides.
- All interactive labels, buttons, menu rows, and grid columns must remain resilient to longer words in Lithuanian and Russian without wrapping into broken buttons or triggering horizontal scroll (`375px+`).

---

## 8. Rules for Future Edits

1. **Use only existing tokens and components**: Reference CSS variables (`--bg`, `--bg-soft`, `--text`, `--text-muted`, `--accent`, `--border`, `--sp-*`, `--fs-*`, `--radius`, `--ease`) and documented component classes in this file.
2. **Ask before adding new styles**: Do not invent new colors, font sizes, font weights, fonts, pill badges, heavy drop shadows, or custom layout utilities without explicit approval.
3. **Preserve folder structure and relative links**: Do not create `/shared/theme.css` or reorganize directories; root pages link `style.css` and `script.js`, `/albums/*` pages link `../style.css` and `../script.js`.
4. **Keep the DP logo in header/footer — never in background**: Retain the `.logo-mark` image (`https://iili.io/fjNLbs4.png`) in the header and editorial footer, and never render logo watermarks behind content or backgrounds.
5. **Preserve content and responsive parity**: Keep existing copy intact when restyling, ensure all images keep descriptive `alt` text with `loading="lazy"` and natural aspect ratios, and verify zero horizontal overflow at `375px`, `768px`, and `1440px`.
