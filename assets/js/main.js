/*!
 * Nuisibles Secure — main.js
 * Aucune dépendance externe. Gère : menu mobile, sous-menus mobiles,
 * et les apparitions au scroll. Le contact se fait par téléphone (tel:)
 * et WhatsApp (wa.me), aucun formulaire n'a besoin d'être géré ici.
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
   * 4) Vidéo de fond du hero : coupée si l'utilisateur préfère moins
   *    d'animations (économie de ressources, la CSS la masque déjà).
   * --------------------------------------------------------------------- */
  var heroVideo = document.querySelector(".hero-bg-video");
  if (heroVideo && prefersReducedMotion) {
    heroVideo.pause();
    heroVideo.removeAttribute("autoplay");
  }
})();
