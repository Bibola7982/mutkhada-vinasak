# MUTKHADA VINASAK — Static E-Commerce Product Website

A complete, **premium single-product e-commerce website** for **MUTKHADA VINASAK POWDER (150 gm, ₹1999/-)**.
Built with **only HTML5, CSS3 and Vanilla JavaScript** — no PHP, no database, no backend.
Orders are confirmed through **WhatsApp**; payment is either **Cash on Delivery** or **UPI / QR scan**.

It runs by simply opening `index.html` in a browser and works on **GitHub Pages** after uploading.

---

## Folder Structure

```
mutkhada-vinasak/
│
├── index.html          # Homepage (all 15 sections)
├── order.html          # Direct order / checkout page
├── product.html        # Product detail page
├── about.html          # About / manufacturer
├── contact.html        # Contact page
├── faq.html            # FAQ accordion
├── privacy.html        # Privacy Policy
├── terms.html          # Terms & Conditions
├── shipping.html       # Shipping Policy
├── cancellation.html   # Cancellation Policy
├── disclaimer.html     # Disclaimer
│
├── css/
│   ├── style.css       # Design system + components
│   ├── responsive.css  # Breakpoints (mobile → desktop)
│   └── animations.css  # Restrained motion (reduced-motion aware)
│
├── js/
│   ├── main.js         # Header, mobile nav, reveal, FAQ, year
│   ├── product.js      # Renders data from product.js (cards, table, gallery)
│   ├── cart.js         # Mini cart + localStorage draft (non-sensitive)
│   ├── order.js        # Validation, totals, order ID, confirmation, COD/QR flow
│   └── whatsapp.js     # Builds & opens the WhatsApp order message
│
├── assets/
│   ├── product-bottle-dark.jpg
│   ├── product-bottle-white.jpg
│   ├── product-label.jpg
│   ├── payment-qr.png
│   ├── logo.svg
│   └── favicon.png
│
├── data/
│   └── product.js      # ⭐ ALL editable product info lives here
│
├── manifest.json       # Optional PWA
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## Design System

| Token | Value | Use |
|------|-------|-----|
| `--primary` | `#E58A3A` | Orange accent (buttons, highlights) |
| `--primary-light` | `#FFF0DE` | Soft orange tint |
| `--brown` | `#6E321A` | Text / accents |
| `--brown-dark` | `#3D1B0F` | Headings |
| `--cream` | `#FFF9F2` | Page background |
| `--text` | `#222222` | Body text |
| `--muted` | `#6B6B6B` | Secondary text |
| `--border` | `#EAD8C6` | Thin borders |

Orange is used as an **accent only** — the site is mostly white/cream with brown text.

---

## User Journey

```
Visitor lands on index.html
   ↓
Sees product, price (₹1999/-), weight (150 gm), COD + UPI
   ↓
Clicks BUY NOW / ORDER NOW  →  order.html
   ↓
Enters name, mobile, address, quantity, payment method
   ↓
CONFIRM ORDER  →  success screen with Order ID (MV-YYYY-XXXXXX)
   ↓
COD  →  "Confirm on WhatsApp"
QR   →  scan QR, pay, "I HAVE COMPLETED PAYMENT"  →  "Confirm on WhatsApp"
   ↓
WhatsApp opens with a pre-filled order message
```

---

## Order Workflow

1. `order.js` validates the form (phone = 10 digits, PIN = 6 digits, required fields).
2. Quantity × ₹1999 is calculated live (Shipping = FREE).
3. A local Order ID `MV-YYYY-XXXXXX` is generated.
4. A non-sensitive draft is saved to `localStorage` (no passwords/credentials).
5. Success screen shows Order ID, product, quantity, total, payment method.
6. COD → shows COD note. QR → shows the real QR + "I HAVE COMPLETED PAYMENT".
7. "CONFIRM ORDER ON WHATSAPP" builds the message via `whatsapp.js` and opens `wa.me/918684948560?text=...`.

> The website **never** claims QR payment is auto-verified. The customer manually confirms.

---

## GitHub Pages Deployment (no build steps)

1. Create a GitHub repository (e.g. `mutkhada-vinasak`).
2. Upload **all** files and folders from this project (keep the structure above).
3. Go to **Settings → Pages**.
4. Under "Build and deployment", choose **Deploy from a branch**.
5. Branch: **main** (or `master`), Folder: **/ (root)**.
6. Click **Save**.
7. Wait 1–2 minutes. GitHub shows the published URL
   (e.g. `https://<your-username>.github.io/mutkhada-vinasak/`).
8. Open the URL — the site is live.

No `npm install`, no build, no server. Just upload and deploy.

### Custom domain (optional)
In **Settings → Pages → Custom domain**, enter your domain and follow the DNS instructions.
GitHub provides the required A/CNAME records. A custom domain is **not** required.

---

## How To Change …

All content is centralized in **`data/product.js`**. Edit that file; everything updates automatically.

### Product price
In `data/product.js`:
```js
price: 1999,            // change number; ₹ symbol is currencySymbol
currencySymbol: "₹",
```

### Product images
Replace files in `assets/` keeping the same names, **or** change the paths in `data/product.js`:
```js
images: {
  dark:  "./assets/product-bottle-dark.jpg",
  white: "./assets/product-bottle-white.jpg",
  label: "./assets/product-label.jpg",
  extra: "./assets/product-bottle-extra.jpg",
  qr:    "./assets/payment-qr.png"
}
```

### QR code
Replace `assets/payment-qr.png` with your new UPI QR (keep the name, or update `images.qr`).

### WhatsApp number
In `data/product.js`:
```js
whatsappNumber: "8684948560",
whatsappUrl: "https://wa.me/918684948560",   // +91 prefix, no +, no spaces
```

### Product details (name, weight, batch, expiry, manufacturer…)
All in `data/product.js` under the matching keys (`name`, `nameHi`, `weight`, `batch`, `mfgDate`, `expiryDate`, `mfgLicense`, `manufacturer`, `manufacturerAddress`, `email`, `supportLocation`).

### Composition table
Edit the `composition` array in `data/product.js`. **Do not change spellings, botanical names, or quantities** unless the manufacturer changes them.

### Colors
Edit the CSS variables at the top of `css/style.css` (`:root { --primary: ...; }`).

---

## Notes / Compliance
- Static only: no backend, no database, no API.
- `localStorage` is used for a non-sensitive cart/order draft only (see code comment in `js/cart.js`).
- No card details, UPI PIN, banking passwords, or OTP are ever collected.
- QR payment is performed entirely in the customer's own UPI app.
- Respects `prefers-reduced-motion` for accessibility.

© 2026 MUTKHADA VINASAK — All Rights Reserved.
