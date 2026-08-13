/* =========================================================================
   product.js — populate product content from window.PRODUCT (data/product.js)
   Renders: text fields, spec lists, composition table, gallery, trust badges,
   price displays, hero media, meta tags where data-bind attributes are used.
   ========================================================================= */

(function () {
  "use strict";

  function setText(sel, text) {
    const el = document.querySelector(sel);
    if (el) el.textContent = text;
  }
  function setHTML(sel, html) {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = html;
  }

  function money(n) { return window.PRODUCT.currencySymbol + n; }

  function render() {
    const P = window.PRODUCT;
    if (!P) { console.warn("PRODUCT data not found"); return; }

    // Text bindings (data-bind="name" etc.)
    document.querySelectorAll("[data-bind]").forEach(function (el) {
      const k = el.getAttribute("data-bind");
      if (P[k] !== undefined) el.textContent = P[k];
    });

    // Price / weight helpers
    document.querySelectorAll("[data-price]").forEach(function (el) { el.textContent = money(P.price); });
    document.querySelectorAll("[data-weight]").forEach(function (el) { el.textContent = P.weight; });
    document.querySelectorAll("[data-email]").forEach(function (el) { el.textContent = P.email; el.setAttribute("href", "mailto:" + P.email); });
    document.querySelectorAll("[data-wa-number]").forEach(function (el) { el.textContent = P.whatsappNumber; });

    // Trust badges
    const tb = document.getElementById("trustBadges");
    if (tb) {
      const items = [
        { ic: "✓", t: "COD Available", d: "Pay when your order is delivered." },
        { ic: "✓", t: "UPI / QR Payment", d: "Scan & pay with any UPI app." },
        { ic: "✓", t: "WhatsApp Order Confirmation", d: "Instant order on WhatsApp." },
        { ic: "✓", t: "Secure Checkout", d: "Order confirmed via WhatsApp." },
        { ic: "✓", t: "Direct Customer Support", d: "Reach us on WhatsApp." }
      ];
      tb.innerHTML = items.map(function (i) {
        return '<div class="feature"><div class="ic">' + i.ic + '</div><div><h4>' + i.t + '</h4><p>' + i.d + '</p></div></div>';
      }).join("");
    }

    // Product cards
    document.querySelectorAll("[data-product-card]").forEach(function (card) {
      const img = card.querySelector("[data-card-img]");
      if (img) img.setAttribute("src", P.images.hero);
      const name = card.querySelector("[data-card-name]"); if (name) name.textContent = P.name;
      const w = card.querySelector("[data-card-weight]"); if (w) w.textContent = P.weight;
      const price = card.querySelector("[data-card-price]"); if (price) price.textContent = money(P.price);
    });

    // Hero media
    const heroImg = document.querySelector("[data-hero-img]");
    if (heroImg) heroImg.setAttribute("src", P.images.hero);
    const heroImg2 = document.querySelector("[data-hero-img-alt]");
    if (heroImg2) heroImg2.setAttribute("src", (P.images.gallery[1] || P.images.hero));

    // Gallery
    renderGallery(P);

    // Composition table
    renderComposition(P);

    // Spec lists (product information)
    renderSpec(P);
  }

  function renderGallery(P) {
    const mainImg = document.getElementById("galleryMain");
    const thumbs = document.getElementById("galleryThumbs");
    if (!mainImg || !thumbs) return;
    const imgs = (P.images.gallery && P.images.gallery.length ? P.images.gallery : [P.images.hero]).filter(Boolean);
    mainImg.setAttribute("src", imgs[0]);
    mainImg.setAttribute("alt", P.name + " product photograph");
    thumbs.innerHTML = imgs.map(function (src, i) {
      return '<img src="' + src + '" alt="Thumbnail ' + (i + 1) + '" class="' + (i === 0 ? "active" : "") + '" data-i="' + i + '" loading="lazy">';
    }).join("");
    thumbs.querySelectorAll("img").forEach(function (t) {
      t.addEventListener("click", function () {
        mainImg.setAttribute("src", t.getAttribute("src"));
        thumbs.querySelectorAll("img").forEach(function (x) { x.classList.remove("active"); });
        t.classList.add("active");
      });
    });
    // lightbox
    const lb = document.getElementById("lightbox");
    const lbImg = document.getElementById("lightboxImg");
    const lbClose = document.getElementById("lightboxClose");
    if (mainImg && lb && lbImg) {
      mainImg.closest(".main-img").addEventListener("click", function () {
        lbImg.setAttribute("src", mainImg.getAttribute("src"));
        lb.classList.add("open");
      });
      if (lbClose) lbClose.addEventListener("click", function () { lb.classList.remove("open"); });
      lb.addEventListener("click", function (e) { if (e.target === lb) lb.classList.remove("open"); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") lb.classList.remove("open"); });
    }
  }

  function renderComposition(P) {
    const tbody = document.getElementById("compositionBody");
    const base = document.getElementById("compositionBase");
    if (base) base.textContent = P.compositionBase;
    if (!tbody) return;
    tbody.innerHTML = P.composition.map(function (row) {
      return "<tr><td>" + row.common + "</td><td>" + row.botanical + "</td><td>" + row.part + "</td><td>" + row.qty + "</td></tr>";
    }).join("");
  }

  function renderSpec(P) {
    const spec = document.getElementById("productSpec");
    if (!spec) return;
    const rows = [
      ["Product", P.productName],
      ["Net Weight", P.weight],
      ["Batch", P.batch],
      ["Mfg", P.mfgDate],
      ["Expiry", P.expiryDate],
      ["Mfg. Lic. No.", P.mfgLicense],
      ["Manufacturer", P.manufacturer]
    ];
    spec.innerHTML = rows.map(function (r) {
      return "<li><b>" + r[0] + "</b><span>" + r[1] + "</span></li>";
    }).join("");
  }

  document.addEventListener("DOMContentLoaded", render);
  window.MVProduct = { render: render };
})();
