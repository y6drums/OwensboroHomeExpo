# Owensboro Home Expo — website

Static marketing site for the Owensboro Home Expo, presented by the **Green River
Building Industry Association**. Plain HTML, CSS and vanilla JavaScript — no build
step, no framework, no npm install. The only server-side code is two small
functions that relay form submissions through Resend.

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, countdown, stats, categories, exhibitor preview, sponsors, location |
| `why-attend.html` | Why Attend — reasons, who it's for, how to work the floor, FAQ |
| `vendors.html` | Exhibitor directory — searchable + filterable by trade |
| `exhibit.html` | Vendor sign-up — why exhibit, booth options, full booth application form |
| `media.html` | Photo gallery from past shows, press fact sheet, logo download, coverage links |
| `contact.html` | General contact form + association and venue details |

## Layout

```
├── index.html … contact.html      # the six pages
├── assets/
│   ├── css/styles.css             # the entire design system
│   ├── js/expo-data.js            # ← EDIT THIS: dates, vendors, gallery
│   ├── js/main.js                 # nav, countdown, filters, lightbox, forms
│   ├── img/logo.png               # full-colour logo (light backgrounds)
│   ├── img/logo-white.png         # reversed logo (dark backgrounds — footer)
│   ├── img/sponsors/              # ← show sponsors (Lee, GRBIA)
│   ├── img/vendors/               # ← exhibitor logos go here
│   ├── img/gallery/               # web-ready show photos
│   └── img/msquared-marketing-white.png
│       └── gallery/               # ← drop past-show photos here
├── api/
│   ├── _send.js                   # shared Resend helper (not a route)
│   ├── contact.js                 # POST /api/contact
│   └── vendor-signup.js           # POST /api/vendor-signup
├── update-dates.sh                # one-command show-date updater
├── vercel.json                    # security + cache headers
├── .env.example                   # environment variables to set
├── robots.txt · sitemap.xml
```

---

## Show dates

**Confirmed: Saturday 13 – Sunday 14 March 2027**, at the Owensboro Convention
Center. Saturday 10:00 AM – 5:00 PM, Sunday 11:00 AM – 4:00 PM.

## ⚠️ Things you need to change before this goes live

1. **Set the Resend environment variables** (below) or both forms will fail.
2. **Update the domain.** `owensborohomeexpo.com` is used in the canonical tags,
   `sitemap.xml` and `robots.txt`. Find and replace if the real domain differs.

---

## Updating the show dates

Dates appear in page copy, `<title>` tags, meta descriptions and the structured
data on the home page — about 30 places. Don't hunt for them; use the script:

```bash
./update-dates.sh
```

Open `update-dates.sh`, edit the `NEW_*` values in **section 2**, save, then run
it. It rewrites every occurrence across all six pages plus `expo-data.js`, leaves
a `.bak` of each changed file, and prints a summary. After you've checked the
site, delete the backups and copy your `NEW_*` values into the `OLD_*` block so
the next run has the right starting point.

Keep the punctuation style intact — the ranges use an **en dash** (`–`), not a
hyphen.

---

## Managing exhibitors

All 15 confirmed 2027 exhibitors live in `window.VENDORS` in
`assets/js/expo-data.js`, which drives both the directory on `vendors.html` and
the six-card preview on the home page.

```js
{
  name:     "Wilson's Custom Flooring",                    // required
  category: 'Windows, Doors & Flooring',                   // required
  blurb:    'Flooring supply and installation\u2026',           // required
  logo:     'assets/img/vendors/wilsons-custom-flooring.webp',  // optional
  website:  'https://www.wilsonscustom.com/',              // optional
  phone:    '(270) 555-0100',                              // optional
  booth:    '204',                                         // optional
  featured: true                                           // optional \u2014 sorts first
}
```

Filter chips generate themselves from the `category` values actually in use, so
adding a new category is just a matter of typing it. Booth numbers are blank on
all 15 — fill them in once the floor plan is set and they appear on each card.

> **Blurbs need a review pass.** I wrote them from each business's trade and
> website. They're deliberately factual and claim-free, but you know these
> companies — read them over and correct anything that's off.

### Adding an exhibitor logo

1. Save it to `assets/img/vendors/` with a **lowercase, hyphenated** filename.
   Spaces, `&`, backslashes and capitals all cause problems: `&` breaks the URL,
   and capitals resolve on macOS but 404 on Vercel's case-sensitive filesystem.
2. SVG is ideal, then WebP or PNG with transparency, then JPEG.
3. **Trim the whitespace** around the mark before saving. Baked-in padding makes
   a logo render small — several of the supplied files were 30–75% empty space.
4. Keep it under roughly 640px on the long edge; that's plenty at display size.

**Every SVG needs a `viewBox`.** Without one the browser can't work out the
aspect ratio, so the logo won't scale and the balancer below can't size it.
Atmos's file was missing one and had to be patched.

### How logo sizing works

Logos come in wildly different shapes — from a 1.1:1 square badge to a 5.2:1
wordmark. Dropping them all into one fixed box only constrains height, so square
marks end up looking tiny. `balanceLogos()` in `assets/js/main.js` instead scales
each to roughly **equal area** (~9,500 px²), reading each image's natural
dimensions on load. Very wide marks hit a width cap so they don't overrun the
card.

It's fully automatic — add a logo and it's sized correctly with no hand-tuning.
To make every logo bigger or smaller across the board, change the single
`LOGO_AREA` constant.

## Managing sponsors

Sponsors live as plain HTML in the `sponsor-row` block on `index.html` —
deliberately **not** JS-rendered, so a paid logo still appears if scripts fail.

1. Drop the logo in `assets/img/sponsors/`. Use **lowercase, hyphenated**
   filenames (`lee-building-products.webp`) — mixed-case paths work on macOS but
   404 on Vercel's case-sensitive filesystem.
2. Transparent-background PNG, WebP or SVG. Anything from roughly 2:1 to 1:1
   sits fine; the CSS caps both axes so wide and square marks read at similar
   weight.
3. Copy an existing `<a class="sponsor">` block and change the `href`, `src`,
   `alt`, and the `sponsor__tier` label.

A sponsor with no logo yet can use `<span class="sponsor__name">Their Name</span>`
in place of the `<img>` — that's what the GRBIA card does.

**Currently listed:**

| Card | Logo | Links to |
|---|---|---|
| Presenting Sponsor | `lee-building-products.webp` | leebp.com |
| Presented By | `grbia.webp` | greenriverbia.com |

Winsupply of Owensboro co-sponsored the 2026 show and is **not** on the page —
add them back if they return for 2027.

## Managing gallery photos

23 photos from the 2026 show are live on `media.html`. There is **no year
filter** — photos display in the order listed in `window.GALLERY` in
`assets/js/expo-data.js`.

Each photo exists twice: a **1800px** version for the lightbox and an **800px
`-thumb`** for the grid tile, so a phone visitor loads ~40 KB per tile instead
of a full-size frame.

```js
{ src:   'assets/img/gallery/expo-2026-01.jpg',        // lightbox, 1800px
  thumb: 'assets/img/gallery/expo-2026-01-thumb.jpg',  // grid tile, 800px
  alt:   'A booth showing an illuminated bar cabinet',  // required
  cap:   "Kitchen Interiors' backlit cabinetry" }       // hover + lightbox
```

### Adding more photos

The originals in `assets/media/` are 20–30 MB each — **526 MB for 23 files**.
Those must never be served; they were processed down to **8.7 MB total** (a 99%
reduction). `assets/media/` is listed in `.gitignore` and `.vercelignore` so it
never reaches production.

To process a new batch, adapt this (needs `pip3 install pillow`):

```python
from PIL import Image, ImageOps
im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
full = im.copy();  full.thumbnail((1800, 1800), Image.LANCZOS)
full.save('assets/img/gallery/expo-2027-01.jpg', 'JPEG', quality=82, optimize=True, progressive=True)
thumb = im.copy(); thumb.thumbnail((800, 800), Image.LANCZOS)
thumb.save('assets/img/gallery/expo-2027-01-thumb.jpg', 'JPEG', quality=80, optimize=True, progressive=True)
```

Saving without an `exif=` argument strips camera metadata (including any GPS
coordinates) — worth keeping.

> **Alt text and captions need a review pass.** I wrote all 23 from the photos
> themselves. Where booth signage was clearly legible I named the business;
> where it wasn't, the wording stays generic. Correct anything I misread.

## Media coverage credit

`media.html` carries a dark **M Squared Marketing** panel crediting the show's
photography, video and promotion, linking to `msquaredmarketing.com`.

Every page footer also carries a "Website built by" credit with the M Squared
logo, linking to the same place.

The logo (`assets/img/msquared-marketing-white.png`) is a **white knockout**, so
it only works on a dark background. That's why the media-page panel is navy
rather than matching the light sections around it — on a light ground the
wordmark would be invisible.

## Booth pricing & the exhibitor form

Rates, fields and terms on `exhibit.html` come from the **2027 Exhibitor Sign-Up
& Booth Reservation** contract.

| Booth option | Member | Non-member |
|---|---|---|
| Single 10′ × 10′ | $650 | $900 |
| Four-booth 20′ × 20′ | $1,950 | $2,400 |

Reserve three booths and the fourth is free. GRBIA membership is **$550/year**.

| Utility | Rate |
|---|---|
| 8′ skirted table | Included |
| 110V / 20-amp electric | $60 |
| 220V / 30-amp electric | $115 |
| Water fill for pools or landscaping | $120 |

Every 10′ × 10′ booth includes black dividers, one 8′ skirted table, two chairs
and a trash can. Booth placement is assigned by show management.

### Live total

The form totals the estimate as the applicant fills it in. The same arithmetic
is **repeated server-side** in `api/vendor-signup.js` — the browser's figure is
never trusted, so a tampered total can't reach the inbox. Rates live in
`BOOTH_RATES` and `UTILITY_PRICES` there, and in the `data-member` /
`data-nonmember` / `data-price` attributes in `exhibit.html`. **Change both if
rates move.**

### ⚠️ No card details online — by design

The paper contract collects card number, expiry, V-code and billing ZIP. The web
form deliberately does **not**, and this should not be "fixed":

- A form that emails card numbers is a serious PCI-DSS violation and would put
  the association's card-acceptance agreement at risk.
- Resend is not a payment processor, and the data would sit in plain text in an
  inbox indefinitely.

Instead the form asks how the exhibitor would *prefer* to pay (check, card by
phone, or invoice) and GRBIA follows up. If online card payment is ever wanted,
use a processor like Stripe so card data never touches this server.

### Fields captured

Everything the paper contract asks for: company, contact person, address, city,
state, ZIP, phone, cell phone, email, product or service exhibited, whether
products will be demonstrated (and a description), membership status, booth
option, quantity, table count, and utilities.

Plus extras the paper form doesn't have: website, directory category and blurb,
placement requests, sponsorship interest, referral source, payment preference,
and an explicit acknowledgement of the payment-and-insurance requirement.

## Forms → Resend

Both forms POST JSON to a serverless function, which relays the submission via
the Resend API. **The API key is only ever read server-side** — it is never
exposed to the browser.

| Form | Endpoint | Handler |
|---|---|---|
| Booth application (`exhibit.html`) | `POST /api/vendor-signup` | `api/vendor-signup.js` |
| Contact form (`contact.html`) | `POST /api/contact` | `api/contact.js` |

### Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (and in a
local `.env.local` for development). See `.env.example`.

| Variable | Notes |
|---|---|
| `RESEND_API_KEY` | From <https://resend.com/api-keys> |
| `MAIL_FROM` | Must use a domain verified at <https://resend.com/domains>, e.g. `Owensboro Home Expo <noreply@owensborohomeexpo.com>` |
| `MAIL_TO` | Where submissions land. Comma-separate for several recipients. Defaults to `adam@greenriverbia.com` |

Submissions arrive as a branded HTML email with a plain-text fallback, and
`reply_to` is set to the submitter — so hitting Reply goes straight back to the
business or visitor.

### Built-in protections

- **Honeypot field** — bots that fill the hidden `_gotcha` input get a silent
  `200` and no email is sent.
- **Server-side validation** of every required field, independent of the browser.
- **HTML escaping** on all submitted values before they reach the email body.
- **Method guard** — anything other than `POST` gets a `405`.
- **Payload cap** at 100 KB; individual fields capped at 5,000 characters.
- Resend failures return a `502` and the form shows a recovery message pointing
  at `adam@greenriverbia.com`.

---

## Deploying

### Vercel (recommended — the API routes need it)

```bash
npx vercel --prod
```

`/api/*.js` files are picked up automatically as Node functions; everything else
is served statically. Add the three environment variables in the dashboard
before your first real submission.

### Anywhere else

The six HTML pages and `assets/` are fully static and will run on any host.
**The `api/` folder will not** — if you deploy to plain static hosting, the forms
need a different backend (Netlify Functions, Cloudflare Workers, or a form
service like Formspree). Point `data-endpoint` on each `<form>` at the new URL.

---

## Local development

Any static file server works, but the `/api` routes only run under Vercel:

```bash
npx vercel dev
```

For quick design-only checks without the forms:

```bash
npx serve .
```

---

## Responsive behaviour

Audited across **6 pages × 13 viewport widths** (320 → 1920px), plus landscape
phones and the open mobile menu. No horizontal scrolling, no clipped content, no
text under 12px, and no tap target under 40px at any width.

Breakpoints that matter:

| Width | What changes |
|---|---|
| ≤ 400px | Buttons wrap instead of overflowing; tighter padding |
| ≤ 420px | Stat strip drops to compact padding |
| ≤ 620px | Hero meta stacks; footer credit stacks |
| ≤ 700px | Form grids collapse to one column |
| ≤ 880px | Two-column `.split` sections stack |
| ≤ 900px | Stat strip goes 4-across → 2-across |
| ≤ 1000px | Navigation collapses to the hamburger menu |

### Gotchas worth knowing before you edit the CSS

- **`minmax(280px, 1fr)` causes horizontal scroll.** A fixed `px` floor in a
  grid track can't shrink below that floor, so on a 320px phone the track
  overflows the viewport. Every grid here uses `minmax(min(280px, 100%), 1fr)`.
  Copy that pattern if you add one.
- **Grid and flex children default to `min-width: auto`** (= min-content), so a
  wide child — a map iframe, a long email address — refuses to shrink and pushes
  the whole layout wide. `.grid > *, .split > *` etc. are reset to
  `min-width: 0`, and `.info-list` uses `overflow-wrap: anywhere`.
- **Inline text links inside a sentence are exempt** from the 44px target-size
  rule, so "Let's talk." in a paragraph is intentionally left small. Standalone
  links and buttons are all ≥ 40px.
- **Checkbox and radio inputs are 22px**, but the wrapping `<label class="check">`
  is ≥ 44px tall — the label is the tap target, which is what actually matters.
- `.btn` is `white-space: nowrap` by default so labels don't wrap awkwardly.
  Under 400px that's relaxed, otherwise "Submit Application" overflows a 320px
  screen.

## Notes on the build

- **Design tokens** are the `:root` custom properties at the top of
  `styles.css`. Brand colours (`--navy: #134252`, `--sky: #67B8E5`) were sampled
  directly from `logo.png`; `--amber` is the CTA accent.
- **Fonts** are Archivo (headings) and Inter (body) from Google Fonts.
- **Two logo files.** `logo.png` (navy wordmark) is used in the header;
  `logo-white.png` (white wordmark, sky-blue door) is used in the footer, where
  the navy version would disappear against the dark background. Both are offered
  as press downloads on the media page.
- **`.checklist` is deliberately not a flex row.** A flex `li` turns an inline
  `<strong>` lead-in and the text after it into two separate flex items, which
  staggers the wrapping. The tick is absolutely positioned instead, so the copy
  reads as one continuous block.
- **No JavaScript?** Every page still renders its content and copy. The exhibitor
  directory and photo gallery are JS-rendered and show a `<noscript>` fallback
  with a phone number.
- **Accessibility:** skip link, visible focus rings, labelled form controls with
  inline error messages, `aria-current` on the active nav item, `aria-expanded`
  on the menu and FAQ toggles, keyboard-navigable lightbox (arrows + Escape),
  and `prefers-reduced-motion` honoured throughout.
- **SEO:** per-page titles and descriptions, canonical URLs, Open Graph and
  Twitter card tags, `Event` structured data on the home page, plus
  `sitemap.xml` and `robots.txt`.

---

## Reference — show facts used in the copy

Sourced from GRBIA and press coverage of the 2025/2026 shows:

- Green River Building Industry Association, founded **17 August 1958**
  (formerly the Home Builders Association of Owensboro)
- 3515 Wathens Crossing, Owensboro, KY 42301 · (270) 688-0353 · adam@greenriverbia.com
- Executive Officer: **Adam Hicks**
- Venue: Owensboro Convention Center, 501 W 2nd St · (270) 687-8800 · **144,000 sq ft**
- 2026 show: March 14–15, **60+ exhibitors**, free admission via **Lee Building
  Products** and **Winsupply of Owensboro**
- Exhibitor Reception: **Friday, March 12, 6–8 p.m., HBAO Building**
- Cheques payable to the **Home Builders Association of Owensboro**
- 2025 show: March 8–9, **70+ exhibitors**
- The show has run for **40+ years**; GRBIA also runs a Fall Tour of Homes
