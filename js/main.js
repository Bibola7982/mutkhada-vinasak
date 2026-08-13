/* =========================================================================
   main.js — shared site behavior (header, mobile nav, reveal, FAQ, CTA, year)
   ========================================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // Header shadow on scroll
    const header = document.querySelector(".header");
    function onScroll() {
      if (header) header.classList.toggle("scrolled", window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mobile menu
    const burger = document.querySelector(".hamburger");
    const nav = document.querySelector(".nav");
    if (burger && nav) {
      burger.addEventListener("click", function () { nav.classList.toggle("open"); });
      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { nav.classList.remove("open"); });
      });
    }

    // Reveal on scroll (IntersectionObserver) + reduced motion respect
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll(".reveal, .stagger");
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("in"); });
    } else {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
    }

    // FAQ accordion
    document.querySelectorAll(".faq-item").forEach(function (item) {
      const q = item.querySelector(".faq-q");
      if (!q) return;
      q.addEventListener("click", function () {
        const open = item.classList.contains("open");
        // close others (optional)
        // document.querySelectorAll(".faq-item").forEach(function(i){ i.classList.remove("open"); i.querySelector(".faq-a").style.maxHeight = null; });
        if (open) {
          item.classList.remove("open");
          item.querySelector(".faq-a").style.maxHeight = null;
        } else {
          item.classList.add("open");
          const a = item.querySelector(".faq-a");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });

    // Floating WhatsApp + sticky CTA links
    document.querySelectorAll("[data-wa-link]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        const url = (window.PRODUCT && window.PRODUCT.whatsappUrl) || "https://wa.me/918684948560";
        window.open(url, "_blank", "noopener");
      });
    });

    // Footer year
    const yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();

    // Smooth scroll for in-page anchors already handled by CSS scroll-behavior
  });
})();
