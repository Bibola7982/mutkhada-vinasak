/* =========================================================================
   order.js — order page logic
   Functions: validateForm, calculateTotal, generateOrderId, getPaymentMethod,
   createWhatsAppMessage (via whatsapp.js), saveOrderLocally, showConfirmation,
   redirectToWhatsApp. Handles COD vs QR flow. No backend. Shows "Preparing
   your order..." while disabled. localStorage holds only a non-sensitive draft.
   ========================================================================= */

(function () {
  "use strict";

  const P = window.PRODUCT;
  const sym = P ? P.currencySymbol : "₹";

  // ---------- helpers ----------
  function $(id) { return document.getElementById(id); }
  function money(n) { return sym + n; }

  function generateOrderId() {
    const d = new Date();
    const y = d.getFullYear();
    const rand = Math.floor(100000 + Math.random() * 900000);
    return "MV-" + y + "-" + rand;
  }

  function getPaymentMethod() {
    const qr = document.getElementById("payQR");
    const cod = document.getElementById("payCOD");
    if (qr && qr.checked) return "qr";
    if (cod && cod.checked) return "cod";
    return "";
  }

  // ---------- quantity / price ----------
  function currentQty() {
    const q = parseInt($("qty").value, 10);
    return isNaN(q) ? 1 : Math.max(1, Math.min(P.maxQuantity, q));
  }

  function calculateTotal() {
    const qty = currentQty();
    const subtotal = P.price * qty;
    const shipping = 0; // FREE
    const total = subtotal + shipping;
    $("subtotal").textContent = money(subtotal);
    $("shipping").textContent = "FREE";
    $("total").textContent = money(total);
    $("summaryQty").textContent = qty;
    return { qty: qty, subtotal: subtotal, total: total };
  }

  function changeQty(delta) {
    const el = $("qty");
    let v = currentQty() + delta;
    v = Math.max(1, Math.min(P.maxQuantity, v));
    el.value = v;
    calculateTotal();
    if (window.MVCart) window.MVCart.setQuantity(v);
  }

  // ---------- validation ----------
  function setError(field, msg) {
    const el = $(field);
    const wrap = el ? el.closest(".field") : null;
    if (wrap) {
      wrap.classList.add("invalid");
      wrap.classList.remove("valid");
      const e = wrap.querySelector(".err");
      if (e) e.textContent = msg;
    }
  }
  function setValid(field) {
    const el = $(field);
    const wrap = el ? el.closest(".field") : null;
    if (wrap) { wrap.classList.remove("invalid"); wrap.classList.add("valid"); }
  }
  function clearError(field) {
    const el = $(field);
    const wrap = el ? el.closest(".field") : null;
    if (wrap) { wrap.classList.remove("invalid"); wrap.classList.remove("valid"); }
  }

  function validatePhone(v) {
    v = (v || "").replace(/\s+/g, "");
    if (v.startsWith("+91")) v = v.slice(3);
    return /^[6-9]\d{9}$/.test(v) ? v : null;
  }
  function validatePin(v) { return /^\d{6}$/.test(v || ""); }

  function validateForm() {
    let ok = true;
    const required = ["fullName", "mobile", "house", "area", "city", "state", "pincode"];
    required.forEach(function (f) {
      const el = $(f);
      if (!el || !el.value.trim()) { setError(f, "This field is required."); ok = false; }
      else { setValid(f); }
    });

    // phone
    const phone = $("mobile");
    if (phone && phone.value.trim()) {
      const norm = validatePhone(phone.value);
      if (!norm) { setError("mobile", "Please enter a valid 10-digit mobile number."); ok = false; }
      else { phone.value = norm; setValid("mobile"); }
    }
    // pincode
    const pin = $("pincode");
    if (pin && pin.value.trim()) {
      if (!validatePin(pin.value)) { setError("pincode", "Please enter a valid 6-digit PIN code."); ok = false; }
      else { setValid("pincode"); }
    }
    // payment
    const pm = getPaymentMethod();
    if (!pm) { setError("payment", "Please select a payment method."); ok = false; }
    else { clearError("payment"); }

    return ok;
  }

  // ---------- build order object ----------
  function buildOrder() {
    const t = calculateTotal();
    const pm = getPaymentMethod();
    return {
      orderId: generateOrderId(),
      product: P.productName,
      quantity: t.qty,
      price: P.price,
      total: t.total,
      paymentMethod: pm,
      customerName: $("fullName").value.trim(),
      phone: $("mobile").value.trim(),
      email: ($("email").value || "").trim(),
      address: $("house").value.trim(),
      area: $("area").value.trim(),
      city: $("city").value.trim(),
      district: ($("district").value || "").trim(),
      state: $("state").value.trim(),
      pincode: $("pincode").value.trim(),
      landmark: ($("landmark").value || "").trim(),
      createdAt: new Date().toLocaleString("en-IN")
    };
  }

  // ---------- localStorage (non-sensitive draft only) ----------
  function saveOrderLocally(order) {
    // We only keep a convenience draft; confirm happens on WhatsApp.
    if (window.MVCart) {
      window.MVCart.setDraft({
        quantity: order.quantity,
        address: order.address,
        area: order.area,
        city: order.city,
        district: order.district,
        state: order.state,
        pincode: order.pincode,
        landmark: order.landmark,
        lastOrderId: order.orderId
      });
    }
  }

  // ---------- UI flow ----------
  function showConfirmation(order) {
    const formView = $("orderFormView");
    const successView = $("orderSuccess");
    if (formView) formView.style.display = "none";
    if (successView) successView.style.display = "block";

    $("successOrderId").textContent = order.orderId;
    $("successProduct").textContent = order.product;
    $("successQty").textContent = order.quantity;
    $("successTotal").textContent = money(order.total);
    $("successPay").textContent = order.paymentMethod === "qr" ? "UPI / QR Payment" : "Cash on Delivery";

    // store for confirm button
    window.__lastOrder = order;

    if (order.paymentMethod === "qr") {
      // show QR payment confirmation step
      const qrStep = $("qrPayStep");
      if (qrStep) {
        qrStep.style.display = "block";
        $("qrOrderId").textContent = order.orderId;
        $("qrAmount").textContent = money(order.total);
        const qrImg = document.getElementById("qrPayImg");
        if (qrImg) qrImg.setAttribute("src", P.images.qr);
      }
      const codNote = $("codNote");
      if (codNote) codNote.style.display = "none";
    } else {
      const qrStep = $("qrPayStep");
      if (qrStep) qrStep.style.display = "none";
      const codNote = $("codNote");
      if (codNote) codNote.style.display = "block";
    }
    successView.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function submitOrder(e) {
    if (e) e.preventDefault();
    const btn = $("submitBtn");
    if (btn) { btn.disabled = true; btn.textContent = "Preparing your order..."; }

    // small delay so the disabled state is visible
    setTimeout(function () {
      if (!validateForm()) {
        if (btn) { btn.disabled = false; btn.textContent = "CONFIRM ORDER"; }
        const firstErr = document.querySelector(".field.invalid input, .field.invalid select");
        if (firstErr) firstErr.focus();
        return;
      }
      const order = buildOrder();
      saveOrderLocally(order);
      showConfirmation(order);
      if (btn) { btn.disabled = false; btn.textContent = "CONFIRM ORDER"; }
    }, 450);
  }

  function confirmOnWhatsApp() {
    if (!window.__lastOrder) return;
    if (window.MVWhatsApp) window.MVWhatsApp.sendOrderToWhatsApp(window.__lastOrder);
  }

  function completedPayment() {
    const step2 = $("qrAfterPay");
    if (step2) step2.style.display = "block";
    step2.scrollIntoView({ behavior: "smooth" });
  }

  // ---------- wire up ----------
  document.addEventListener("DOMContentLoaded", function () {
    // default quantity
    if ($("qty")) $("qty").value = 1;
    calculateTotal();

    // qty buttons
    const minus = $("qtyMinus"), plus = $("qtyPlus");
    if (minus) minus.addEventListener("click", function () { changeQty(-1); });
    if (plus) plus.addEventListener("click", function () { changeQty(1); });
    const qtyInput = $("qty");
    if (qtyInput) qtyInput.addEventListener("input", calculateTotal);

    // live validation
    ["fullName", "mobile", "house", "area", "city", "state", "pincode"].forEach(function (f) {
      const el = $(f);
      if (el) el.addEventListener("blur", function () {
        if (!el.value.trim()) { setError(f, "This field is required."); }
        else if (f === "mobile") {
          const n = validatePhone(el.value);
          if (!n) setError("mobile", "Please enter a valid 10-digit mobile number.");
          else { el.value = n; setValid("mobile"); }
        } else if (f === "pincode") {
          if (!validatePin(el.value)) setError("pincode", "Please enter a valid 6-digit PIN code.");
          else setValid("pincode");
        } else setValid(f);
      });
    });

    // payment toggle visibility
    const payQR = $("payQR"), payCOD = $("payCOD");
    function syncPay() {
      const qrCard = $("qrSection");
      if (qrCard) qrCard.style.display = (payQR && payQR.checked) ? "block" : "none";
    }
    if (payQR) payQR.addEventListener("change", syncPay);
    if (payCOD) payCOD.addEventListener("change", syncPay);

    // submit
    const form = $("orderForm");
    if (form) form.addEventListener("submit", submitOrder);

    // confirm buttons
    const cwa = $("confirmWhatsApp");
    if (cwa) cwa.addEventListener("click", confirmOnWhatsApp);
    const cwa2 = $("confirmWhatsApp2");
    if (cwa2) cwa2.addEventListener("click", confirmOnWhatsApp);
    const done = $("qrPaidBtn");
    if (done) done.addEventListener("click", completedPayment);
    const back = $("backHome");
    if (back) back.addEventListener("click", function () { window.location.href = "./index.html"; });
  });

  window.MVOrder = {
    validateForm: validateForm,
    calculateTotal: calculateTotal,
    generateOrderId: generateOrderId,
    getPaymentMethod: getPaymentMethod,
    showConfirmation: showConfirmation
  };
})();
