/* =========================================================================
   cart.js — mini cart + localStorage draft (no backend)
   SECURITY: localStorage is NOT secure storage. We only keep a non-sensitive
   cart/order draft (product, qty, address fields) for the customer's own
   convenience. We NEVER store passwords, payment credentials, or OTP.
   ========================================================================= */

(function () {
  "use strict";
  const KEY = "mv_cart_draft_v1";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(obj) {
    try { localStorage.setItem(KEY, JSON.stringify(obj)); } catch (e) {}
  }

  const Cart = {
    get: function () { return load(); },
    setQuantity: function (q) { const d = load(); d.quantity = q; save(d); },
    setDraft: function (fields) { const d = load(); Object.assign(d, fields); save(d); },
    clear: function () { try { localStorage.removeItem(KEY); } catch (e) {} }
  };

  // ---- Mini cart drawer UI (used on pages that include it) ----
  function renderMiniCart() {
    const d = load();
    const qty = d.quantity || 1;
    const totalEl = document.getElementById("miniCartTotal");
    if (totalEl && window.PRODUCT) {
      totalEl.textContent = window.PRODUCT.currencySymbol + (window.PRODUCT.price * qty);
    }
    const qEl = document.getElementById("miniCartQty");
    if (qEl) qEl.textContent = qty;
  }

  function bindDrawer() {
    const openBtn = document.getElementById("cartOpen");
    const closeBtn = document.getElementById("cartClose");
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (!drawer) return;
    function open() { drawer.classList.add("open"); if (overlay) overlay.classList.add("show"); }
    function close() { drawer.classList.remove("open"); if (overlay) overlay.classList.remove("show"); }
    if (openBtn) openBtn.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (overlay) overlay.addEventListener("click", close);
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderMiniCart();
    bindDrawer();
  });

  window.MVCart = Cart;
})();
