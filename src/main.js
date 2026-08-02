import "./style.css";

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header ---------- */
  var header = document.getElementById("site-header");
  function onScrollHeader() {
    if (window.scrollY > 8) {
      header.classList.add("bg-background/90", "backdrop-blur", "border-border", "shadow-[0_1px_0_0_rgba(255,255,255,0.04)]");
    } else {
      header.classList.remove("bg-background/90", "backdrop-blur", "border-border", "shadow-[0_1px_0_0_rgba(255,255,255,0.04)]");
    }
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("mobile-menu-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  var iconOpen = document.getElementById("menu-icon-open");
  var iconClose = document.getElementById("menu-icon-close");

  function closeMobileMenu() {
    mobileMenu.classList.add("hidden");
    iconOpen.classList.remove("hidden");
    iconClose.classList.add("hidden");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  menuBtn.addEventListener("click", function () {
    var isOpen = !mobileMenu.classList.contains("hidden");
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.remove("hidden");
      iconOpen.classList.add("hidden");
      iconClose.classList.remove("hidden");
      menuBtn.setAttribute("aria-expanded", "true");
    }
  });

  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var item = trigger.closest(".faq-item");
      var panel = item.querySelector(".faq-panel");
      var icon = trigger.querySelector("i");
      var isOpen = trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.style.gridTemplateRows = isOpen ? "0fr" : "1fr";
      icon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Plan selection -> lead form ---------- */
  var leadPlanField = document.getElementById("lead-plan");
  document.querySelectorAll(".plan-cta").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (leadPlanField) {
        leadPlanField.value = btn.getAttribute("data-plan") || "";
      }
    });
  });

  /* ---------- Lead capture form ---------- */
  var WHATSAPP_NUMBER = "5548991638846";

  var form = document.getElementById("lead-capture-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var fields = {
        name: form.querySelector("#lead-name"),
        whatsapp: form.querySelector("#lead-whatsapp"),
        email: form.querySelector("#lead-email"),
        market: form.querySelector("#lead-market"),
      };

      var isValid = true;

      Object.keys(fields).forEach(function (key) {
        var input = fields[key];
        var errorEl = form.querySelector('[data-error-for="' + input.id + '"]');
        var value = input.value.trim();
        var fieldValid = true;

        if (!value) {
          fieldValid = false;
        } else if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          fieldValid = false;
        } else if (key === "whatsapp" && value.replace(/\D/g, "").length < 10) {
          fieldValid = false;
        }

        input.classList.toggle("border-danger", !fieldValid);
        if (errorEl) errorEl.classList.toggle("hidden", fieldValid);
        if (!fieldValid) isValid = false;
      });

      if (!isValid) {
        var firstInvalid = form.querySelector(".border-danger");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var plan = form.querySelector("#lead-plan").value;
      var lines = [
        "Olá! Quero saber mais sobre os indicadores da QuantEdge.",
        "",
        "Nome: " + fields.name.value.trim(),
        "WhatsApp: " + fields.whatsapp.value.trim(),
        "E-mail: " + fields.email.value.trim(),
        "Mercado de interesse: " + fields.market.value,
      ];
      if (plan) lines.push("Plano de interesse: " + plan);

      var message = encodeURIComponent(lines.join("\n"));
      window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + message, "_blank", "noopener,noreferrer");
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
