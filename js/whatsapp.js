/* =========================================================================
   whatsapp.js — build & open order message via WhatsApp
   NOTE: customer data is only encoded into a wa.me URL opened in the user's
   own browser. It is NEVER sent to or stored on any server.
   ========================================================================= */

(function () {
  "use strict";

  function buildMessage(order) {
    const P = window.PRODUCT;
    const sym = P.currencySymbol;
    const payLabel = order.paymentMethod === "qr" ? "UPI / QR Payment" : "Cash on Delivery";
    const payTag = order.paymentMethod === "qr" ? "UPI PAYMENT COMPLETED" : "COD ORDER";

    const lines = [];
    lines.push("Hello, I want to order " + P.name + ".");
    lines.push("");
    lines.push(payTag);
    lines.push("");
    lines.push("Order Details:");
    lines.push("Product: " + P.productName);
    lines.push("Net Weight: " + P.weight);
    lines.push("Quantity: " + order.quantity);
    lines.push("Total Amount Paid: " + sym + order.total);
    lines.push("");
    lines.push("Payment Method: " + payLabel);
    if (order.paymentMethod === "qr") {
      lines.push("UTR / Reference No: " + (order.utr || "N/A"));
    }
    lines.push("");
    lines.push("Customer Details:");
    lines.push("Name: " + order.customerName);
    lines.push("Mobile: " + order.phone);
    if (order.email) lines.push("Email: " + order.email);
    lines.push("");
    lines.push("Address:");
    lines.push("House: " + order.address);
    lines.push("Area: " + order.area);
    lines.push("City: " + order.city);
    lines.push("District: " + order.district);
    lines.push("State: " + order.state);
    lines.push("PIN: " + order.pincode);
    if (order.landmark) lines.push("Landmark: " + order.landmark);
    lines.push("");
    lines.push("Order ID: " + order.orderId);
    lines.push("Order Time: " + order.createdAt);
    return lines.join("\n");
  }

  function sendOrderToWhatsApp(order) {
    if (!order || !order.customerName || !order.phone) {
      console.warn("sendOrderToWhatsApp: incomplete order, aborting.");
      return false;
    }
    const message = buildMessage(order);
    const url = window.PRODUCT.whatsappUrl + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener");
    return true;
  }

  // expose
  window.MVWhatsApp = { buildMessage: buildMessage, sendOrderToWhatsApp: sendOrderToWhatsApp };
})();
