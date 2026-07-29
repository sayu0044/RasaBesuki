/* ==========================================================================
   Penyaringan direktori produsen.

   Seluruh kartu sudah ada di dalam HTML sejak halaman dimuat. Skrip ini
   hanya menyembunyikan yang tidak cocok, sehingga daftar tetap lengkap dan
   terbaca bila JavaScript gagal dimuat.
   ========================================================================== */

(function () {
  "use strict";

  var form = document.querySelector("[data-filter-form]");
  var list = document.querySelector("[data-filter-list]");
  if (!form || !list) return;

  var search = form.querySelector("[data-filter-search]");
  var chips = Array.prototype.slice.call(form.querySelectorAll("[data-filter-chip]"));
  var cards = Array.prototype.slice.call(list.querySelectorAll("[data-card]"));
  var counter = document.querySelector("[data-filter-count]");
  var empty = document.querySelector("[data-filter-empty]");
  var reset = document.querySelector("[data-filter-reset]");

  var aktif = [];

  function jumlahTeks(n) {
    if (n === cards.length) return "Menampilkan " + n + " produsen.";
    return "Menampilkan " + n + " dari " + cards.length + " produsen.";
  }

  function terapkan() {
    var kata = (search ? search.value : "").trim().toLowerCase();
    var tampil = 0;

    cards.forEach(function (card) {
      var cocokKata = !kata || (card.dataset.cari || "").indexOf(kata) !== -1;
      var layanan = (card.dataset.layanan || "").split(",");
      var cocokLayanan =
        aktif.length === 0 ||
        aktif.every(function (pilihan) {
          return layanan.indexOf(pilihan) !== -1;
        });

      var lolos = cocokKata && cocokLayanan;
      card.hidden = !lolos;
      if (lolos) {
        tampil++;
        // Kartu yang belum sempat dianimasikan tetap harus terlihat setelah
        // muncul kembali dari hasil penyaringan.
        card.style.opacity = "1";
        card.style.transform = "none";
      }
    });

    if (counter) counter.textContent = jumlahTeks(tampil);
    if (empty) empty.classList.toggle("is-visible", tampil === 0);
    list.hidden = tampil === 0;

    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  if (search) {
    search.addEventListener("input", terapkan);
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var nilai = chip.dataset.filterChip;
      var index = aktif.indexOf(nilai);
      if (index === -1) {
        aktif.push(nilai);
        chip.setAttribute("aria-pressed", "true");
      } else {
        aktif.splice(index, 1);
        chip.setAttribute("aria-pressed", "false");
      }
      terapkan();
    });
  });

  if (reset) {
    reset.addEventListener("click", function () {
      if (search) search.value = "";
      aktif = [];
      chips.forEach(function (chip) {
        chip.setAttribute("aria-pressed", "false");
      });
      terapkan();
      if (search) search.focus();
    });
  }

  // Cegah pengiriman form: penyaringan berjalan langsung tanpa memuat ulang.
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });
})();
