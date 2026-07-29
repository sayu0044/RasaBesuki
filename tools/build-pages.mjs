/**
 * build-pages.mjs
 *
 * Membuat halaman profil untuk setiap produsen di folder produsen/ dari
 * data/produsen.json. Halaman dibuat sebagai berkas HTML statis (bukan
 * dirender di browser) supaya bisa diindeks mesin pencari dan tetap terbuka
 * cepat di koneksi lambat.
 *
 * Juga merakit halaman utama dari potongan di src/pages/ dengan kerangka
 * (navigasi, footer, meta) yang didefinisikan sekali di berkas ini, serta
 * menulis sitemap.xml.
 *
 * Jalankan: npm run build:pages
 */

import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const at = (p) => resolve(root, p);

/* --- Utilitas ----------------------------------------------------------- */

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const isFilled = (value) =>
  value !== null && value !== undefined && String(value).trim() !== "";

/** Teks pengganti yang jujur ketika data lapangan belum tersedia. */
const BELUM = "Belum tersedia";

function waLink(nomor, pesan) {
  if (!isFilled(nomor)) return null;
  const clean = String(nomor).replace(/[^0-9]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(pesan)}`;
}

function layanan(p) {
  const out = [];
  if (p.melayani_eceran) out.push("Eceran");
  if (p.melayani_grosir) out.push("Grosir");
  if (p.melayani_reseller) out.push("Reseller");
  return out;
}

function lokasiSingkat(p) {
  if (isFilled(p.desa)) return `${p.desa}, Kecamatan ${p.kecamatan}`;
  return `Kecamatan ${p.kecamatan}`;
}

/* --- Potongan HTML bersama ---------------------------------------------- */

/**
 * Alamat kanonis. Selama base_url di data/produsen.json masih null, dipakai
 * path dari akar situs. Setelah domain final diketahui, isi base_url sekali
 * dan seluruh halaman otomatis memakai URL lengkap.
 */
let BASE_URL = "";
const absolute = (path) =>
  BASE_URL ? `${BASE_URL.replace(/\/$/, "")}/${path}` : `/${path}`;

/**
 * Kerangka atas halaman: meta, stylesheet, dan navigasi.
 *
 * @param {string} prefix awalan path relatif ("" di akar, "../" di subfolder)
 * @param {string} active nama halaman aktif, untuk menandai menu
 */
function head({ prefix, active, title, description, url, image, extraHead = "" }) {
  const nav = [
    ["Beranda", "index.html", "beranda"],
    ["Tentang Sentra", "tentang.html", "tentang"],
    ["Proses Produksi", "proses.html", "proses"],
    ["Produsen", "produsen.html", "produsen"],
    ["Hubungi Kami", "kontak.html", "kontak"],
  ];

  const navLinks = nav
    .map(
      ([label, href, key]) =>
        `<a class="nav__link" href="${prefix}${href}"${
          key === active ? ' aria-current="page"' : ""
        }>${label}</a>`,
    )
    .join("\n          ");

  const mobileLinks = nav
    .map(
      ([label, href, key]) =>
        `<a class="mobile-nav__link" href="${prefix}${href}"${
          key === active ? ' aria-current="page"' : ""
        }>${label} <i class="ph ph-arrow-up-right" aria-hidden="true"></i></a>`,
    )
    .join("\n          ");

  const overHero = active === "beranda" ? " masthead--over-hero" : "";

  return `<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${esc(absolute(url))}">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Sentra Kerupuk Ikan Besuki">
  <meta property="og:locale" content="id_ID">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${esc(absolute(url))}">
  <meta property="og:image" content="${esc(absolute(image))}">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="icon" href="${prefix}img/logo.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">

  <link rel="stylesheet" href="${prefix}css/icons.css">
  <link rel="stylesheet" href="${prefix}css/tailwind.css">
  <link rel="stylesheet" href="${prefix}css/style.css">
${extraHead}  <script>
    // Dipasang lebih awal agar elemen tidak sempat terlihat lalu melompat
    // saat animasi masuk dijalankan.
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("js-motion");
    }
  </script>
</head>

<body>
  <a class="skip-link" href="#konten">Lompat ke konten utama</a>

  <header class="masthead${overHero}">
    <div class="wrap">
      <div class="masthead__inner">
        <a class="brand" href="${prefix}index.html">
          <span class="brand__mark" aria-hidden="true"><i class="ph ph-fish"></i></span>
          <span>
            <span class="brand__name">Sentra Kerupuk Ikan</span>
            <span class="brand__meta">Besuki, Situbondo</span>
          </span>
        </a>

        <nav class="nav" aria-label="Navigasi utama">
          ${navLinks}
        </nav>

        <button class="masthead__toggle" type="button" data-nav-open aria-expanded="false" aria-controls="mobile-nav">
          <span class="sr-only">Buka menu</span>
          <i class="ph ph-list" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </header>

  <div class="mobile-nav" id="mobile-nav">
    <div class="wrap">
      <div class="mobile-nav__head">
        <span class="brand__name">Menu</span>
        <button class="masthead__toggle" type="button" data-nav-close>
          <span class="sr-only">Tutup menu</span>
          <i class="ph ph-x" aria-hidden="true"></i>
        </button>
      </div>
      <nav class="mobile-nav__list" aria-label="Navigasi utama mobile">
          ${mobileLinks}
      </nav>
    </div>
  </div>

  <main id="konten">
`;
}

function foot({ prefix, extraScripts = "" }) {
  return `  </main>

  <footer class="footer">
    <div class="wrap">
      <div class="footer__grid section--tight">
        <div>
          <p class="text-lg font-extrabold tracking-tight text-white">Sentra Kerupuk Ikan Besuki</p>
          <p class="mt-2 max-w-[38ch] text-sm leading-relaxed">
            Direktori rumah produksi kerupuk ikan rumahan di Kecamatan Besuki, Kabupaten Situbondo, Jawa Timur.
          </p>
        </div>

        <nav class="footer__links" aria-label="Navigasi footer">
          <p class="text-sm font-semibold text-white">Jelajahi</p>
          <a class="text-sm" href="${prefix}tentang.html">Tentang Sentra</a>
          <a class="text-sm" href="${prefix}proses.html">Proses Produksi</a>
          <a class="text-sm" href="${prefix}produsen.html">Produsen</a>
          <a class="text-sm" href="${prefix}kontak.html">Hubungi Kami</a>
        </nav>

        <div class="footer__links">
          <p class="text-sm font-semibold text-white">Cara membeli</p>
          <p class="text-sm leading-relaxed">
            Pembelian dilakukan langsung kepada produsen melalui WhatsApp atau
            dengan datang ke rumah produksi. Website ini tidak melayani
            pemesanan maupun pembayaran.
          </p>
        </div>
      </div>

      <div class="footer__bottom">
        <p>&copy; 2026 Sentra Kerupuk Ikan Besuki</p>
        <p>Disusun sebagai program kerja KKN bidang ekonomi.</p>
      </div>
    </div>
  </footer>

  <!-- GSAP dan Lenis tidak dimuat di sini. Keduanya diunduh oleh main.js
       hanya bila animasi memang akan dijalankan. Lihat js/main.js. -->
  <script defer src="${prefix}js/main.js"></script>
${extraScripts}</body>

</html>
`;
}

/* --- Halaman profil produsen -------------------------------------------- */

function detailPage(p, sentra) {
  const prefix = "../";
  const nama = p.nama_usaha;
  const lokasi = lokasiSingkat(p);
  const wa = waLink(p.whatsapp, sentra.pesan_wa_default);
  const jasa = layanan(p);
  const terverifikasi = p.terverifikasi === true;

  const deskripsi = isFilled(p.deskripsi)
    ? p.deskripsi
    : `Profil ${nama} sedang dilengkapi. Cerita usaha akan ditampilkan setelah wawancara dengan pemilik selesai dan pemilik menyetujui isinya dipublikasikan.`;

  const metaDesc = isFilled(p.deskripsi)
    ? String(p.deskripsi).slice(0, 155)
    : `${nama}, rumah produksi kerupuk ikan rumahan di ${lokasi}. Hubungi produsen untuk menanyakan ketersediaan produk.`;

  /* Data terstruktur hanya ditulis untuk produsen yang datanya sudah
     dikonfirmasi. Menandai data placeholder sebagai bisnis nyata akan
     menyesatkan mesin pencari. */
  const jsonLd = terverifikasi
    ? `  <script type="application/ld+json">
${JSON.stringify(
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: nama,
    description: p.deskripsi || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: p.alamat || undefined,
      addressLocality: p.desa || undefined,
      addressRegion: "Jawa Timur",
      addressCountry: "ID",
    },
    telephone: p.whatsapp ? `+${String(p.whatsapp).replace(/[^0-9]/g, "")}` : undefined,
    hasMap: p.maps_url || undefined,
  },
  null,
  2,
)
  .split("\n")
  .map((l) => "    " + l)
  .join("\n")}
  </script>
`
    : "";

  const notice = terverifikasi
    ? ""
    : `        <div class="notice mt-8">
          <i class="ph ph-info" aria-hidden="true"></i>
          <p>
            Data profil ini masih berupa penempatan sementara. Nama usaha, nama
            pemilik, nomor WhatsApp, lokasi, dan foto akan diisi setelah
            wawancara lapangan selesai dan pemilik usaha memberikan persetujuan
            untuk dipublikasikan.
          </p>
        </div>
`;

  const waButton = wa
    ? `<a class="btn btn--primary" href="${esc(wa)}" target="_blank" rel="noopener">
            <i class="ph ph-whatsapp-logo" aria-hidden="true"></i> Hubungi Produsen
          </a>`
    : `<span class="btn" aria-disabled="true">
            <i class="ph ph-whatsapp-logo" aria-hidden="true"></i> Nomor belum tersedia
          </span>`;

  const mapsButton = isFilled(p.maps_url)
    ? `<a class="btn btn--outline" href="${esc(p.maps_url)}" target="_blank" rel="noopener">
            <i class="ph ph-map-pin" aria-hidden="true"></i> Kunjungi Rumah Produksi
          </a>`
    : `<span class="btn" aria-disabled="true">
            <i class="ph ph-map-pin" aria-hidden="true"></i> Lokasi belum tersedia
          </span>`;

  const dockWa = wa
    ? `<a class="btn btn--primary" href="${esc(wa)}" target="_blank" rel="noopener"><i class="ph ph-whatsapp-logo" aria-hidden="true"></i> WhatsApp</a>`
    : `<span class="btn" aria-disabled="true"><i class="ph ph-whatsapp-logo" aria-hidden="true"></i> WhatsApp</span>`;

  const dockMaps = isFilled(p.maps_url)
    ? `<a class="btn btn--outline" href="${esc(p.maps_url)}" target="_blank" rel="noopener"><i class="ph ph-map-pin" aria-hidden="true"></i> Lokasi</a>`
    : `<span class="btn" aria-disabled="true"><i class="ph ph-map-pin" aria-hidden="true"></i> Lokasi</span>`;

  const specItem = (key, value) => `          <div class="spec__item">
            <dt class="spec__key">${key}</dt>
            <dd class="spec__val${isFilled(value) ? "" : " spec__val--empty"}">${esc(
              isFilled(value) ? value : BELUM,
            )}</dd>
          </div>`;

  const specs = [
    specItem("Nama usaha", nama),
    specItem("Pemilik", p.nama_pemilik),
    specItem("Mulai usaha", p.tahun_mulai),
    specItem("Lokasi", isFilled(p.desa) ? lokasi : null),
    specItem("Sistem pembelian", jasa.length ? jasa.join(", ") : null),
    specItem("Pemesanan", isFilled(p.whatsapp) ? "WhatsApp" : null),
  ].join("\n");

  const produkBlok = p.produk && p.produk.length
    ? `      <section class="section">
        <div class="wrap">
          <h2 class="editorial__title" data-reveal>Produk kerupuk</h2>
          <div class="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
${p.produk
  .map(
    (produk) => `            <article data-reveal>
              <h3 class="text-xl font-bold tracking-tight text-strong">${esc(produk.nama)}</h3>
              <p class="mt-2 max-w-[42ch] text-body">${esc(produk.deskripsi || "Deskripsi produk sedang dilengkapi.")}</p>
            </article>`,
  )
  .join("\n")}
          </div>
        </div>
      </section>
`
    : `      <section class="section">
        <div class="wrap">
          <h2 class="editorial__title" data-reveal>Produk kerupuk</h2>
          <p class="mt-5 max-w-[52ch] text-lg text-body" data-reveal>
            Daftar produk akan ditampilkan setelah dikonfirmasi langsung kepada
            pemilik usaha. Untuk sementara, silakan tanyakan jenis kerupuk yang
            tersedia melalui WhatsApp.
          </p>
        </div>
      </section>
`;

  const galeri = (p.foto_galeri || []).length
    ? `      <section class="section surface-sunken">
        <div class="wrap">
          <h2 class="editorial__title" data-reveal>Dokumentasi</h2>
          <div class="gallery mt-10" data-reveal>
            <div class="gallery__item">
              <img src="${prefix}${esc(p.foto_utama)}" alt="Dokumentasi kegiatan produksi di ${esc(nama)}" loading="lazy" decoding="async" width="800" height="800">
            </div>
${p.foto_galeri
  .map(
    (src, i) => `            <div class="gallery__item">
              <img src="${prefix}${esc(src)}" alt="Dokumentasi ${esc(nama)} nomor ${i + 2}" loading="lazy" decoding="async" width="600" height="600">
            </div>`,
  )
  .join("\n")}
          </div>
          <p class="mt-6 text-sm text-muted">
            Foto pada halaman ini masih menggunakan gambar bawaan template dan
            akan diganti dengan dokumentasi asli rumah produksi.
          </p>
        </div>
      </section>
`
    : "";

  return (
    head({
      prefix,
      active: "produsen",
      title: `${nama} - Sentra Kerupuk Ikan Besuki`,
      description: metaDesc,
      url: `produsen/${p.id}.html`,
      image: `${p.foto_utama}`,
      extraHead: jsonLd,
    }) +
    `      <section class="page-head">
        <div class="wrap">
          <nav class="crumbs" aria-label="Remah roti">
            <a href="${prefix}index.html">Beranda</a>
            <i class="ph ph-caret-right" aria-hidden="true"></i>
            <a href="${prefix}produsen.html">Produsen</a>
          </nav>

          <div class="detail-hero">
            <div class="detail-hero__media" data-hero-in>
              <img src="${prefix}${esc(p.foto_utama)}" alt="Foto utama ${esc(nama)}" width="1000" height="750" fetchpriority="high" decoding="async">
            </div>
            <div>
              <h1 class="detail-hero__title" data-hero-in>${esc(nama)}</h1>
              <p class="producer-card__place mt-4 text-base" data-hero-in>
                <i class="ph ph-map-pin" aria-hidden="true"></i> ${esc(lokasi)}
              </p>
${jasa.length ? `              <div class="chip-row mt-5" data-hero-in>\n${jasa.map((j) => `                <span class="tag tag--accent">${j}</span>`).join("\n")}\n              </div>\n` : ""}              <div class="hero__actions mt-7 hidden lg:flex" data-hero-in>
          ${waButton}
          ${mapsButton}
              </div>
            </div>
          </div>
${notice}        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <div data-reveal>
              <h2 class="editorial__title">Tentang usaha</h2>
              <p class="mt-5 max-w-[54ch] text-lg leading-relaxed text-body">${esc(deskripsi)}</p>
              <p class="notice mt-8">
                <i class="ph ph-clock-countdown" aria-hidden="true"></i>
                <span>
                  Ketersediaan produk menyesuaikan proses produksi dan bahan
                  baku. Silakan hubungi produsen melalui WhatsApp untuk
                  mengetahui ketersediaan terbaru.
                </span>
              </p>
            </div>

            <dl class="spec" data-reveal>
${specs}
            </dl>
          </div>
        </div>
      </section>

${produkBlok}${galeri}      <section class="closer">
        <div class="closer__media" aria-hidden="true">
          <img src="${prefix}img/testimonial-bg.jpg" alt="" width="1920" height="1080" loading="lazy" decoding="async">
        </div>
        <div class="wrap closer__inner">
          <h2 class="closer__title">Tanyakan ketersediaan hari ini</h2>
          <p class="closer__lead">
            Produksi berjalan menyesuaikan bahan baku, jadi cara paling pasti
            adalah bertanya langsung kepada produsen.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            ${waButton}
            <a class="btn btn--on-invert" href="${prefix}produsen.html">
              <i class="ph ph-storefront" aria-hidden="true"></i> Lihat produsen lain
            </a>
          </div>
        </div>
      </section>

      <!-- Tombol WhatsApp dan Maps menempel di dasar layar ponsel supaya
           selalu terjangkau tanpa menggulir kembali ke atas. Di layar besar
           dock disembunyikan karena tombol di bagian atas sudah terlihat. -->
      <div class="action-dock">
        ${dockWa}
        ${dockMaps}
      </div>
` +
    foot({ prefix })
  );
}

/* --- Halaman utama ------------------------------------------------------
   Isi setiap halaman ditulis di src/pages/*.html sebagai potongan <main>.
   Kerangka (navigasi, footer, meta, skrip) ditambahkan di sini supaya hanya
   ada satu tempat untuk mengubah navigasi dan footer seluruh website.
   ------------------------------------------------------------------------ */

const PAGES = [
  {
    file: "index.html",
    active: "beranda",
    title: "Sentra Kerupuk Ikan Besuki - Direktori Produsen Kerupuk Ikan Rumahan",
    description:
      "Kenali rumah produksi kerupuk ikan rumahan di Kecamatan Besuki, Situbondo. Lihat profil produsen, hubungi lewat WhatsApp, dan temukan lokasi rumah produksi.",
    image: "img/carousel-1.jpg",
  },
  {
    file: "tentang.html",
    active: "tentang",
    title: "Tentang Sentra - Sentra Kerupuk Ikan Besuki",
    description:
      "Cerita di balik sentra kerupuk ikan rumahan di Kecamatan Besuki, Situbondo, dan mengapa potensi ini layak dikenal lebih luas.",
    image: "img/about-1.jpg",
  },
  {
    file: "proses.html",
    active: "proses",
    title: "Proses Produksi - Sentra Kerupuk Ikan Besuki",
    description:
      "Gambaran umum tahapan pembuatan kerupuk ikan rumahan di Besuki, dari pemilihan bahan baku sampai pengemasan.",
    image: "img/about-4.jpg",
  },
  {
    file: "produsen.html",
    active: "produsen",
    title: "Temukan Produsen - Sentra Kerupuk Ikan Besuki",
    description:
      "Daftar rumah produksi kerupuk ikan di Kecamatan Besuki, Situbondo. Cari berdasarkan nama usaha, desa, atau sistem pembelian.",
    image: "img/product-1.jpg",
    scripts: `  <script defer src="js/direktori.js"></script>\n`,
  },
  {
    file: "kontak.html",
    active: "kontak",
    title: "Hubungi Kami - Sentra Kerupuk Ikan Besuki",
    description:
      "Kontak pengelola Sentra Kerupuk Ikan Besuki untuk informasi sentra, kerja sama, dan dokumentasi program.",
    image: "img/about-3.jpg",
  },
  {
    file: "404.html",
    active: "",
    title: "Halaman tidak ditemukan - Sentra Kerupuk Ikan Besuki",
    description: "Halaman yang Anda cari tidak tersedia.",
    image: "img/carousel-1.jpg",
    noindex: true,
  },
];

/** Kartu produsen. Bentuknya sama di beranda dan di halaman direktori. */
function cardHtml(p, prefix = "") {
  const jasa = layanan(p);
  const cari = [p.nama_usaha, p.nama_pemilik, p.desa, p.kecamatan]
    .filter(isFilled)
    .join(" ")
    .toLowerCase();

  return `            <article class="producer-card" data-reveal data-card data-cari="${esc(cari)}" data-layanan="${esc(
    jasa.map((j) => j.toLowerCase()).join(","),
  )}">
              <a class="producer-card__media" href="${prefix}produsen/${p.id}.html" tabindex="-1" aria-hidden="true">
                <img class="producer-card__img" src="${prefix}${esc(p.foto_utama)}" alt="" width="600" height="450" loading="lazy" decoding="async">
              </a>
              <div class="producer-card__body">
                <h3 class="producer-card__name">
                  <a href="${prefix}produsen/${p.id}.html">${esc(p.nama_usaha)}</a>
                </h3>
                <p class="producer-card__place">
                  <i class="ph ph-map-pin" aria-hidden="true"></i> ${esc(lokasiSingkat(p))}
                </p>
${jasa.length ? `                <div class="chip-row mt-1">\n${jasa.map((j) => `                  <span class="tag">${j}</span>`).join("\n")}\n                </div>\n` : ""}                <div class="producer-card__foot">
                  <span class="link-arrow">Lihat profil <i class="ph ph-arrow-right" aria-hidden="true"></i></span>
                  ${
                    isFilled(p.whatsapp)
                      ? '<i class="ph ph-whatsapp-logo text-accent text-xl" title="Tersedia kontak WhatsApp" aria-hidden="true"></i>'
                      : ""
                  }
                </div>
              </div>
            </article>`;
}

async function buildMainPages(produsen) {
  for (const page of PAGES) {
    let body = await readFile(at(`src/pages/${page.file}`), "utf8");

    if (body.includes("<!--FEATURED-->")) {
      body = body.replace(
        "<!--FEATURED-->",
        produsen.slice(0, 3).map((p) => cardHtml(p)).join("\n"),
      );
    }

    // Kartu ditulis langsung ke HTML, bukan dirender di browser, supaya
    // seluruh produsen tetap terbaca mesin pencari dan tetap tampil bila
    // JavaScript gagal dimuat. Skrip penyaring hanya menyembunyikan kartu.
    if (body.includes("<!--SEMUA-PRODUSEN-->")) {
      body = body.replace(
        "<!--SEMUA-PRODUSEN-->",
        produsen.map((p) => cardHtml(p)).join("\n"),
      );
    }

    const html =
      head({
        prefix: "",
        active: page.active,
        title: page.title,
        description: page.description,
        url: page.file,
        image: page.image,
        extraHead: page.noindex ? '  <meta name="robots" content="noindex">\n' : "",
      }) +
      body +
      foot({ prefix: "", extraScripts: page.scripts || "" });

    await writeFile(at(page.file), html, "utf8");
    console.log(`  page    ${page.file}`);
  }
}

/* --- Jalankan ------------------------------------------------------------ */

async function run() {
  const raw = await readFile(at("data/produsen.json"), "utf8");
  const { sentra, produsen } = JSON.parse(raw);
  BASE_URL = isFilled(sentra.base_url) ? sentra.base_url : "";

  await buildMainPages(produsen);

  await rm(at("produsen"), { recursive: true, force: true });
  await mkdir(at("produsen"), { recursive: true });

  for (const p of produsen) {
    await writeFile(at(`produsen/${p.id}.html`), detailPage(p, sentra), "utf8");
    console.log(`  page    produsen/${p.id}.html`);
  }

  // Penyaringan di halaman direktori membaca langsung atribut data pada kartu
  // yang sudah tertulis di HTML, jadi tidak perlu salinan data terpisah
  // untuk browser.

  // Sitemap sederhana untuk membantu pengindeksan.
  const halaman = [
    "index.html",
    "tentang.html",
    "proses.html",
    "produsen.html",
    "kontak.html",
    ...produsen.map((p) => `produsen/${p.id}.html`),
  ];
  await writeFile(
    at("sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${halaman.map((h) => `  <url><loc>${absolute(h)}</loc></url>`).join("\n")}
</urlset>
`,
    "utf8",
  );
  console.log("  data    sitemap.xml");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
