# DP.PORTFOLIO — Premium Photography & Videography Space

Automobilių kultūra, architektūros paveldas ir kinematografiška laiko estetika. **DP.PORTFOLIO** — tai ne paprasta vaizdų galerija, o vizualinis pasakojimas, sukurtas remiantis „Gracious Light“ minimalizmo ir aukščiausios kokybės dizaino filosofija.

Svetainė yra visiškai pritaikyta mobiliems įrenginiams, optimizuota paieškos sistemoms (SEO) ir turi integruotą interaktyvią TFP fotosesijų registracijos sistemą.

---

## 🎨 Vizualinė identitetas (Gracious Light Style)

Svetainės dizainas atsisako tradicinio tamsaus portfolio sunkesnio stiliaus ir pereina į švarią, prabangią, meno galerijų įkvėptą estetiką:
* **Fonas (`--bg-color`):** Švelni, kreminė dramblio kaulo tekstūra (`#FBF9F6`).
* **Tekstas (`--text-color`):** Gili, kontrastinga tamsi tealo/anglies spalva (`#1A2B2B`).
* **Akcentai (`--accent-color`):** Elegantiški ir prabangūs tealo tonai (`#113939` / `#2A5C5C`).
* **Šriftai:** Modernus antraščių šriftas `Jost` ir grakštus pagrindinio teksto šriftas `Josefin Sans`.

---

## ⚡ Pagrindinės funkcijos (Features)

* **Bento Grid Layout:** Dinamiškas ir modernus pagrindinio puslapio kategorijų išdėstymas, prisitaikantis prie ekrano dydžio.
* **Cinematic Lightbox:** Grakšti ir intuityvi nuotraukų peržiūros sistema su foniniu suliejimu (`backdrop-filter`) ir švelniais perėjimų efektais.
* **TFP Booking System:** Pilnai funkcionuojanti registracijos forma fotosesijoms su lokacijų, idėjų pateikimu ir tiesioginiu duomenų perdavimu.
* **Advanced SEO Architecture:** Pilnai sinchronizuoti struktūrizuoti duomenys (`Schema.org JSON-LD`), atitinkantys `ImageGallery` ir `ContactPage` standartus, užtikrinantys teisingą **DP.PORTFOLIO** prekės ženklo atvaizdavimą „Google Search Console“.

---

## 🛠️ Naudojamos technologijos (Tech Stack)

Svetainė sukurta nenaudojant sunkių karkasų (Frameworks), siekiant maksimalaus užsikrovimo greičio ir švaraus kodo:

* **HTML5 & CSS3:** Semantinis kodavimas, CSS kintamieji, Flexbox ir Grid sistemos.
* **Vanilla JavaScript:** Optimizuoti skriptai preloaderiui, navigacijai, sklandžiam slinkimui ir Lightbox valdymui.
* **Flatpickr (v4):** Elegantiškas, pagal „Gracious Light“ stilių modifikuotas datų ir laiko parinkimo kalendorius su lietuvių kalbos palaikymu.
* **Formspree:** Saugus ir patikimas registracijos formos duomenų apdorojimas nenaudojant backend serverio.
* **Cookiebot:** Profesionalus ir ES teisinius reikalavimus (GDPR) atitinkantis slapukų bei privatumo valdymas.

---

## 📂 Projekto struktūra (File Structure)

```text
├── index.html               # Pagrindinis puslapis (Bento tinklelis, portfolio įvadas)
├── services.html            # Paslaugų ir įkainių puslapis
├── biography.html           # Fotografo biografija ir kūrybinis kelias
├── about.html               # Detalesnė informacija apie DP.PORTFOLIO viziją
├── contacts.html            # Kontaktinė informacija
├── tfp-booking.html         # TFP Fotosesijų registracijos puslapis su kalendoriumi
├── style.css                # Pagrindinis „Gracious Light“ stilių failas (kintamieji, animacijos)
├── script.js                # Puslapio interaktyvumo, preloaderio ir Lightbox logika
└── albums/                  # Atskiri fotografijų albumų puslapiai (pvz., car-meet-kaunas.html)
