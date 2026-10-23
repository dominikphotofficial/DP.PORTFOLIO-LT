# Implementation Plan: Admin Registration Fix, Mobile Hero Typography & Album Simplification

This plan addresses four critical user requirements:
1. **Fixing Admin Panel & Adding Full Registration**: Resolving non-working buttons in the admin panel and adding a dedicated "Registracija" (Registration) tab with email/password creation and Google Sign-In, with complete error handling and active feedback.
2. **Mobile Hero Screen Typography Scaling**: Making the Hero heading, subheading, and layout on mobile devices noticeably larger and more impactful without breaking viewport boundaries.
3. **Homepage Album Cards Simplification**: Updating album cards in `index.html` and `style.css` so only the album title is displayed on the card (removing description clutter from the grid), while ensuring full descriptions remain prominently featured inside each respective album page.
4. **Cleanup of Unneeded and Non-Working Files**: Safely removing obsolete/broken test artifacts while preserving all valid albums and sitemap integrity.

---

## User Review Required

> [!NOTE]
> Based on your answers:
> - Admin panel will feature both **Prisijungti** (Login) and **Registracija** (Registration) tabs with Google Sign-in and Email/Password creation.
> - Album cards on the homepage will show only clean titles and tags, keeping descriptions inside the individual album pages.
> - Hidden albums are kept in `sitemap.xml` for SEO while orphan scratch files are safely removed.

---

## Proposed Changes

### 1. Admin Authentication & Registration Overhaul (`admin.html`)
- **Root Issue**: The current authentication section only had login inputs; buttons had strict preconditions or lacked clear tab switching for new registration.
- **Tabs Component**:
  - Add clean segmented tabs at the top of the auth card: `[ Prisijungti ]` and `[ Registruotis ]`.
  - In **Prisijungti** tab:
    - Google Sign-in button with direct `signInWithPopup`.
    - Email & Password fields with clear error reporting and direct 2FA fallback.
    - Password reset link.
  - In **Registruotis** tab:
    - Google Sign-up button with immediate account provisioning.
    - Full Name, Email, Password (min 6 characters), and Password Repeat fields.
    - Direct Firebase `createUserWithEmailAndPassword` handler with automatic profile update (`updateProfile`) and Firestore user entry registration.
- **Fail-Safe Interaction**:
  - Ensure all button event listeners are registered immediately without being blocked by module loading or external redirects.
  - Soften or eliminate blocking subdomain redirects in local/dev previews so buttons work in any environment.

### 2. Mobile Hero Sizing (`style.css`)
- **Current State**: On mobile devices (`@media (max-width: 768px)` and `@media (max-width: 480px)`), `h1` is clamped down to `1.15rem` - `1.6rem`, making it feel small on modern phone screens.
- **Updated Styling**:
  - On mobile (`max-width: 768px`): Increase `h1` to `clamp(2.2rem, 9vw, 3.4rem)` with proportional letter-spacing (`clamp(3px, 1.2vw, 8px)`).
  - Increase `h2` to `clamp(0.95rem, 3.2vw, 1.25rem)` and tagline to `clamp(0.85rem, 2.5vw, 1.05rem)`.
  - Adjust padding and container height to ensure balanced vertical centering on iOS Safari and Android Chrome.

### 3. Album Cards Clutter Removal (`index.html` & `style.css`)
- **Current State**: Cards currently show `.album-desc` paragraphs inside both desktop hover overlays and mobile card overlays.
- **Updated Layout**:
  - Hide or remove `.album-desc` from the gallery cards in `index.html`.
  - Update `style.css` so `.album-overlay` focuses purely on `.album-tag`, `.album-title`, and `.album-btn-text` ("Peržiūrėti albumą →").
  - Verify all individual album pages in `albums/*.html` have their full rich introductory descriptions and photo grids intact.

### 4. File Cleanup & Verification
- Clean up any temporary or dangling scratch files in the root folder.
- Ensure all 22 albums in `albums/` are valid, error-free, and correctly formatted.
- Run `compile_applet` and test with `curl` to guarantee 100% build health.

---

## Verification Plan

### Automated Tests
1. Verify JavaScript syntax in `admin.html` with `node --check`.
2. Run `compile_applet` to confirm zero compilation or build errors.
3. Test HTTP routes (`/admin.html`, `/index.html`, `/services.html`) for 200 OK responses.

### Manual / Browser Verification
1. Open Admin Panel: verify that both "Prisijungti" and "Registruotis" tabs switch cleanly, all buttons are clickable, and forms respond with clear feedback.
2. Check Mobile View: verify the Hero title on mobile screens is larger, bolder, and perfectly centered.
3. Check Gallery Grid: verify album cards display only the title and category tag without crowded description text.
