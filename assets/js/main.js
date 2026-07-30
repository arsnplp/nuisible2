/*!
 * Nuisibles Secure — main.js
 * Aucune dépendance externe. Gère : menu mobile, sous-menus mobiles,
 * apparitions au scroll, et le(s) formulaire(s) (devis / contact).
 */
(function () {
  "use strict";

  /* -----------------------------------------------------------------------
   * 1) Menu mobile (burger)
   * --------------------------------------------------------------------- */
  var burger = document.querySelector("[data-burger]");
  var mobileNav = document.querySelector("[data-mobile-nav]");

  if (burger && mobileNav) {
    burger.addEventListener("click", function () {
      var isOpen = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.classList.toggle("is-open", !isOpen);
      document.body.style.overflow = !isOpen ? "hidden" : "";
    });

    // Ferme le menu si on clique un lien direct (ancre) ou on repasse en desktop
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        burger.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1220) {
        burger.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  }

  /* -----------------------------------------------------------------------
   * 2) Sous-menus dépliables dans le menu mobile
   * --------------------------------------------------------------------- */
  document.querySelectorAll("[data-submenu-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      var subList = document.getElementById(btn.getAttribute("aria-controls"));
      if (subList) subList.classList.toggle("is-open", !isOpen);
    });
  });

  /* -----------------------------------------------------------------------
   * 3) Apparitions au scroll (respecte prefers-reduced-motion)
   * --------------------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* -----------------------------------------------------------------------
   * 4) Formulaire(s) — devis / contact
   *
   * BRANCHEMENT DU FORMULAIRE (1 seule ligne à modifier) :
   * Remplacez la valeur de FORM_ENDPOINT ci-dessous par l'URL fournie par
   * votre prestataire de formulaire statique, par exemple :
   *   - Formspree   : "https://formspree.io/f/VOTRE_ID"
   *   - Web3Forms   : "https://api.web3forms.com/submit"
   * Tant que FORM_ENDPOINT est vide (""), le formulaire fonctionne en
   * MODE DÉMO : aucune donnée n'est envoyée, un message de succès factice
   * s'affiche simplement pour prévisualiser l'expérience utilisateur.
   * --------------------------------------------------------------------- */
  var FORM_ENDPOINT = "";

  document.querySelectorAll("[data-ajax-form]").forEach(function (form) {
    var successMsg = form.querySelector(".form-msg.success");
    var errorMsg = form.querySelector(".form-msg.error");
    var submitBtn = form.querySelector("[type=submit]");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (successMsg) successMsg.classList.remove("is-visible");
      if (errorMsg) errorMsg.classList.remove("is-visible");

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (!FORM_ENDPOINT) {
        // Mode démo : pas d'appel réseau, on simule la réussite.
        if (submitBtn) submitBtn.disabled = true;
        setTimeout(function () {
          if (successMsg) successMsg.classList.add("is-visible");
          if (submitBtn) submitBtn.disabled = false;
          form.reset();
          if (successMsg) successMsg.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
        }, 400);
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (response) {
          if (response.ok) {
            if (successMsg) successMsg.classList.add("is-visible");
            form.reset();
          } else {
            if (errorMsg) errorMsg.classList.add("is-visible");
          }
        })
        .catch(function () {
          if (errorMsg) errorMsg.classList.add("is-visible");
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
          var target = errorMsg && errorMsg.classList.contains("is-visible") ? errorMsg : successMsg;
          if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
        });
    });
  });
})();
