/* ==========================================================================
   SENTRA KERUPUK IKAN BESUKI
   Skrip utama: navigasi, smooth scroll (Lenis), dan animasi masuk (GSAP).

   Prinsip:
   - Tanpa jQuery. Semua vanilla JavaScript.
   - Tidak pernah memakai window.addEventListener("scroll"). Posisi scroll
     dibaca lewat Lenis dan GSAP ScrollTrigger yang sudah ter-throttle.
   - Seluruh animasi dimatikan bila pengguna memilih "kurangi gerakan".
   - Bila JavaScript gagal dimuat, seluruh konten tetap terbaca.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  var hasGsap = false;
  var lenis = null;

  /* --- Pemuatan pustaka animasi -----------------------------------------
     GSAP dan Lenis berukuran sekitar 130 KB. Keduanya hanya diunduh bila
     memang akan dipakai, sehingga pengguna yang memilih "kurangi gerakan"
     dan pengguna layar sentuh tidak menanggung beban unduhan itu. */

  function muat(src) {
    return new Promise(function (resolve, reject) {
      var el = document.createElement("script");
      el.src = src;
      el.onload = resolve;
      el.onerror = reject;
      document.head.appendChild(el);
    });
  }

  // Dibaca segera saat skrip dijalankan, karena document.currentScript hanya
  // tersedia pada saat itu. Menghasilkan "" di akar dan "../" di subfolder.
  var self = document.currentScript || document.querySelector('script[src*="js/main.js"]');
  var ROOT = (self ? self.getAttribute("src") : "js/main.js").replace(/js\/main\.js.*$/, "");

  /* --- Navigasi mobile -------------------------------------------------- */

  function initMobileNav() {
    var toggle = document.querySelector("[data-nav-open]");
    var close = document.querySelector("[data-nav-close]");
    var panel = document.getElementById("mobile-nav");
    if (!toggle || !panel) return;

    var lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      panel.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
      var first = panel.querySelector("a, button");
      if (first) first.focus();
    }

    function shut() {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (lenis) lenis.start();
      if (lastFocused) lastFocused.focus();
    }

    toggle.addEventListener("click", open);
    if (close) close.addEventListener("click", shut);

    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) shut();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && panel.classList.contains("is-open")) shut();
    });
  }

  /* --- Navigasi menempel saat digulir -----------------------------------
     Memberi umpan balik posisi: pengguna tahu ia sudah meninggalkan bagian
     paling atas halaman. Memakai IntersectionObserver, bukan event scroll. */

  function initStickyMasthead() {
    var masthead = document.querySelector(".masthead");
    if (!masthead) return;

    var sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:60px;pointer-events:none;";
    document.body.prepend(sentinel);

    new IntersectionObserver(
      function (entries) {
        masthead.classList.toggle("is-stuck", !entries[0].isIntersecting);
      },
      { threshold: 0 },
    ).observe(sentinel);
  }

  /* --- Lenis smooth scroll ----------------------------------------------
     Memberi kesan halus saat menggulir halaman panjang yang berisi banyak
     foto. Dimatikan total pada perangkat sentuh dan saat pengguna memilih
     "kurangi gerakan", karena smooth scroll buatan terasa mengganggu di
     layar sentuh dan membebani perangkat kelas menengah ke bawah. */

  function initLenis() {
    if (typeof window.Lenis === "undefined") return;

    lenis = new window.Lenis({
      duration: 1.05,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    if (hasGsap) {
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      var raf = function (time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    // Tautan jangkar dalam halaman tetap berfungsi saat Lenis aktif.
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        lenis.scrollTo(target, { offset: -80 });
      });
    });
  }

  /* --- Animasi masuk ----------------------------------------------------
     Dua jenis saja:
       1. Hero: judul dan tombol masuk berurutan saat halaman dibuka.
          Tujuannya menegaskan hierarki, mana yang harus dibaca lebih dulu.
       2. Bagian lain: muncul saat masuk viewport, mengikuti urutan cerita
          halaman dari atas ke bawah. */

  function initReveals() {
    if (reduceMotion || !hasGsap) {
      document.documentElement.classList.remove("js-motion");
      return;
    }

    window.gsap.registerPlugin(window.ScrollTrigger);

    var ease = "power3.out";

    var heroItems = document.querySelectorAll("[data-hero-in]");
    if (heroItems.length) {
      window.gsap.from(heroItems, {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: ease,
        stagger: 0.09,
        delay: 0.1,
      });
    }

    window.ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      once: true,
      onEnter: function (batch) {
        window.gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: ease,
          stagger: 0.08,
          overwrite: true,
          onComplete: function () {
            batch.forEach(function (el) {
              el.classList.add("is-revealed");
            });
          },
        });
      },
    });

    window.ScrollTrigger.refresh();
  }

  /* --- Inisialisasi ------------------------------------------------------ */

  function init() {
    // Bagian yang selalu jalan, tanpa pustaka tambahan.
    initMobileNav();
    initStickyMasthead();

    if (reduceMotion) {
      // Tidak ada yang perlu diunduh. Kelas js-motion dilepas agar seluruh
      // konten langsung terlihat.
      document.documentElement.classList.remove("js-motion");
      return;
    }

    // Lenis hanya berguna untuk scroll dengan roda tetikus. Di layar sentuh,
    // scroll bawaan sistem sudah halus dan justru terasa lebih responsif.
    var pustaka = [muat(ROOT + "lib/gsap/gsap.min.js").then(function () {
      return muat(ROOT + "lib/gsap/ScrollTrigger.min.js");
    })];
    if (!coarsePointer) pustaka.push(muat(ROOT + "lib/lenis/lenis.min.js"));

    Promise.all(pustaka)
      .then(function () {
        hasGsap =
          typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
        initLenis();
        initReveals();
      })
      .catch(function () {
        // Jaringan gagal memuat pustaka animasi. Konten tetap harus terbaca.
        document.documentElement.classList.remove("js-motion");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
