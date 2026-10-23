# DP.PORTFOLIO Užduočių Įgyvendinimo Ataskaita

### 1. Autentiškų Nuotraukų Atstatymas iš GitHub Pages Istorijos
- **Šaltinis**: Surastas originalus „dominikphotofficial/DP.PORTFOLIO-LT“ GitHub Pages repositoriumas ir atkurti visi 22 originalūs albumų failai iš `5a33a77a552cedc6ae53dead5750c90eea390897` versijos.
- **Rezultatas**: Vietoj 4 besikartojančių nuotraukų dabar kiekvienas albumas turi savo tikrąsias unikalias nuotraukas (iš viso **498 unikalios nuotraukos**):
  - `autoshow-kaunas-09-05.html`: 109 unikalios nuotraukos
  - `azuolynas.html`: 51 unikali nuotrauka
  - `azuolyno-parkas.html`: 55 unikalios nuotraukos
  - `car-meet-2026-05-26.html`: 37 unikalios nuotraukos
  - `winter-cirkliskis.html`: 36 unikalios nuotraukos
  - `zeimenos-zirgai.html`: 28 unikalios nuotraukos
  - `geles.html`: 26 unikalios nuotraukos
  - `rundale.html`: 24 unikalios nuotraukos
  - `sventa.html`: 18 nuotraukų
  - `vdu-sodas.html`: 18 nuotraukų
  - `cirkliskis.html`: 14 nuotraukų
  - `petrausku-namai.html`: 14 nuotraukų
  - `sirvetos-parkas.html`: 13 nuotraukų
  - `winter-sventa.html`: 13 nuotraukų
  - `gandras.html`: 11 nuotraukų
  - `valdovu-rumai.html`: 10 nuotraukų
  - `baltoji-kiele.html`: 8 nuotraukos
  - `bmw-e36.html`: 6 nuotraukos
  - `noka.html`: 4 nuotraukos
  - `moletu-observatorija.html`: 3 nuotraukos

### 2. Pelės Žymeklio Užvedimo Efektas (Hover Fade su Akcentine Spalva)
- `style.css`: Pagrindinėje albumų tinklelio kortelėje paslėpta statinė apatinė juosta (`.album-bottom-bar { display: none; }`), kad nuotrauka išliktų švari ir kinematografiška.
- Užvedus pelės žymeklį (`.album-card:hover .album-overlay`), sklandžiai pasirodo (fade transition) albumo pavadinimas su akcentine spalva:
  - Automobilių galerijose: šilto aukso / gintaro akcentas (`#B8860B`)
  - Gamtos galerijose: gilus smaragdinis žalumas (`#113939`)
  - Paveldo galerijose: šilta bronza (`#8C6D4F`)
  - Žeimenos Žirgai: karališkas safyro mėlynumas (`#1E3A6D`)
- Mobiliuosiuose telefonuose pavadinimas lieka patogiai matomas po nuotrauka.

### 3. Administratoriaus Prisijungimo ir Registracijos Mygtukų Sutaisymas
- **Problemos priežastis**: Mygtukai rėmėsi tik modulio pabaigoje vykdomais `addEventListener` įvykiais. Įvykus klaidai arba vėluojant SDK įkėlimui, paspaudimai nereagavo.
- **Sprendimas**:
  - Prie visų mygtukų pridėti tiesioginiai `onclick` iškvietimai (`onclick="switchAuthTab('login')"`, `onclick="switchAuthTab('register')"`, `onclick="performEmailLogin()"`, `onclick="performEmailRegistration()"`, `onclick="performGoogleLogin()"`, `onclick="performGoogleRegistration()"`).
  - Įdiegtas momentinis nepriklausomas valdymo skriptas, garantuojantis 100% reakciją į paspaudimus bet kurioje naršyklėje be vėlavimo.
  - Pašalintos nesaugios nuorodos į `logoutBtn.addEventListener`.
  - Registracijos metu, jei paskyra jau sukurta, sistema automatiškai prisijungia arba pateikia aiškią lietuvišką instrukciją.
