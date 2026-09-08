# FORME ART online zetten via TransIP

De website is een **statische site** (alleen HTML, CSS, JavaScript en afbeeldingen).
Er is geen database of PHP nodig. Het kleinste TransIP-webhostingpakket volstaat.

---

## Stap 0 — Voorbereiden (op je eigen computer)

1. **Afbeeldingen toevoegen.** Zet de zes afbeeldingen in de map `assets/` met precies de
   bestandsnamen uit `assets/README.md`. Zonder deze bestanden toont de site placeholders.
2. **E-mailadres vervangen.** Vervang `hello@artist-studio.com` door je eigen adres in:
   - `index.html` (1×)
   - `golden-tide-i.html` (1×)
   - `golden-tide-ii.html` (1×)
3. Controleer lokaal: open `index.html` in je browser en klik alle links door.

---

## Optie A — TransIP Webhosting (aanbevolen als je al een pakket hebt)

### A1. Domein en hosting koppelen

1. Log in op https://www.transip.nl/cp/
2. Ga naar **Webhosting** in het linkermenu en klik op je pakket.
3. Controleer bij **Website → Domeinen & SSL** dat je domeinnaam aan het pakket gekoppeld is.
   Staat je domein er niet bij: klik op *Domein toevoegen* en kies je domein.

### A2. DNS-instellingen (alleen nodig als je domein niet automatisch gekoppeld is)

Ga naar **Domeinen → [jouw domein] → DNS**. Gebruik de standaard TransIP-nameservers
(`ns0.transip.net`, `ns1.transip.nl`, `ns2.transip.eu`). Wanneer domein en webhosting in
hetzelfde TransIP-account zitten, staan de juiste records er meestal al. Zo niet, klik op
*Standaard DNS-instellingen* / *Webhosting-records toevoegen* in het DNS-scherm, of
voeg handmatig toe (het IP-adres van je pakket staat in het webhosting-overzicht):

| Naam | TTL | Type | Waarde |
|------|-----|------|--------|
| `@`  | 1 uur | A | *IP-adres van je webhostingpakket* |
| `www` | 1 uur | CNAME | `@` (of je domeinnaam met punt erachter, bijv. `jouwdomein.nl.`) |

DNS-wijzigingen kunnen tot 24 uur duren, meestal is het binnen een uur klaar.

### A3. Bestanden uploaden

**Via SFTP (aanbevolen — hele map in één keer):**

| Instelling | Waarde |
|---|---|
| Protocol | SFTP (SSH File Transfer Protocol) |
| Host | *staat in het controlepaneel bij Webhosting → FTP/SFTP*; meestal `jouwdomein.nl` of de servernaam die TransIP toont |
| Poort | 22 |
| Gebruikersnaam | de (S)FTP-gebruiker uit **Webhosting → Website → FTP** |
| Wachtwoord | zelf in te stellen/resetten op dezelfde plek |
| Doelmap | **`www/`** — dit is de DocumentRoot van je pakket |

Programma's: FileZilla (Windows/Mac) of Cyberduck (Mac). Sleep **de inhoud** van deze
projectmap (niet de map zelf) naar `www/`, zodat `www/index.html` bestaat.

**Via de Bestandsbeheerder in het controlepaneel** (handig voor losse bestanden):
Webhosting → Website → *Bestandsbeheer* → open map `www` → *Uploaden*.

Upload deze bestanden en mappen:

```
www/
├── .htaccess          (verborgen bestand! zet "verborgen bestanden tonen" aan in FileZilla)
├── 404.html
├── artwork.css
├── golden-tide-i.html
├── golden-tide-ii.html
├── index.html
├── robots.txt
├── script.js
├── styles.css
└── assets/
    ├── golden-tide-detail-03.jpeg
    ├── golden-tide-i-museum-gallery.png
    ├── golden-tide-i-paris-apartment.png
    ├── golden-tide-ii-design.png
    ├── golden-tide-ii-museum-installation.png
    └── golden-tide-ii-paris-apartment.png
```

`README.md`, `DEPLOY-TRANSIP.md`, `assets/README.md` en de map `.git` hoef je niet te uploaden.
Als er al een standaard `index.html`/`index.php` van TransIP in `www/` staat: verwijder die eerst.

### A4. SSL (https) inschakelen

1. Webhosting → **Website → Domeinen & SSL**.
2. Zet bij je domein de schakelaar **Let's Encrypt** op *aan* (bij nieuwe pakketten staat dit al aan).
3. Wacht enkele minuten; het certificaat wordt automatisch aangemaakt en verlengd.
4. Het meegeleverde `.htaccess`-bestand stuurt daarna alle `http://`-bezoekers automatisch door naar `https://`.

Voorwaarden van TransIP: domeinnaam maximaal 42 tekens, DNSSEC actief (automatisch bij
TransIP-nameservers) en geen CAA-record dat Let's Encrypt blokkeert.

### A5. Controleren

- Open `https://jouwdomein.nl` → homepage met slotje in de adresbalk.
- Open `https://jouwdomein.nl/golden-tide-i` (zonder .html) → moet werken dankzij `.htaccess`.
- Open `https://jouwdomein.nl/bestaat-niet` → nette 404-pagina.
- Test op je telefoon: menu-knop rechtsboven moet werken.

---

## Optie B — Gratis hosten op GitHub Pages, domein bij TransIP

Handig als je géén TransIP-webhostingpakket hebt en alleen het domein bij TransIP staat.

### B1. GitHub Pages aanzetten

1. Ga op GitHub naar de repository → **Settings → Pages**.
2. Bij *Build and deployment* kies **Deploy from a branch**, branch `main`, map `/ (root)`. Opslaan.
3. Bij *Custom domain* vul je `www.jouwdomein.nl` in en klik *Save*. GitHub maakt dan een bestand
   `CNAME` in de repository aan.
4. Zet daarna **Enforce HTTPS** aan (kan pas nadat de DNS hieronder werkt).

### B2. DNS bij TransIP (Domeinen → [jouw domein] → DNS)

TransIP staat geen CNAME op de hoofddomeinnaam (`@`) toe; gebruik daar A/AAAA-records.

| Naam | TTL | Type | Waarde |
|------|-----|------|--------|
| `@` | 1 uur | A | `185.199.108.153` |
| `@` | 1 uur | A | `185.199.109.153` |
| `@` | 1 uur | A | `185.199.110.153` |
| `@` | 1 uur | A | `185.199.111.153` |
| `@` | 1 uur | AAAA | `2606:50c0:8000::153` |
| `@` | 1 uur | AAAA | `2606:50c0:8001::153` |
| `@` | 1 uur | AAAA | `2606:50c0:8002::153` |
| `@` | 1 uur | AAAA | `2606:50c0:8003::153` |
| `www` | 1 uur | CNAME | `<github-gebruikersnaam>.github.io.` (met punt op het eind) |

Verwijder eventuele bestaande A/CNAME-records voor `@` en `www` die naar iets anders wijzen.
De `.htaccess` doet op GitHub Pages niets (geen Apache), maar stoort ook niet. GitHub Pages
gebruikt `404.html` automatisch als foutpagina.

---

## Veelvoorkomende problemen

| Probleem | Oorzaak / oplossing |
|---|---|
| Afbeeldingen ontbreken (gekleurde vlakken) | De map `assets/` is niet geüpload of de bestandsnamen kloppen niet (hoofdletters!). |
| "Index of /" of TransIP-standaardpagina | `index.html` staat niet direct in `www/` maar in een submap. |
| Redirect-loop bij https | Zet tijdelijk het blok "Altijd HTTPS" in `.htaccess` uit en gebruik de HTTPS-forceer-optie van TransIP in het controlepaneel. |
| Lettertypen zien er anders uit | Google Fonts wordt geblokkeerd (adblocker/offline). De site valt terug op systeemfonts. |
| `.htaccess` niet zichtbaar in FileZilla | Server → *Verborgen bestanden tonen* aanzetten. |
