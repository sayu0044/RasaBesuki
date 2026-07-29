# PROJECT BRIEF — WEBSITE SENTRA KERUPUK IKAN BESUKI

## 0. IMPORTANT INSTRUCTION — EXISTING TEMPLATE & MOBILE-FIRST

**PENTING: SAYA SUDAH MEMILIKI TEMPLATE / PROJECT WEBSITE YANG SUDAH TERSEDIA.**

Jangan membuat website atau project baru dari awal.

Tugas utama adalah **menyesuaikan, mengembangkan, dan mengimplementasikan kebutuhan website di bawah ini ke dalam template/project yang sudah saya miliki.**

Sebelum melakukan perubahan:

1. Inspect seluruh struktur project yang sudah ada.
2. Identifikasi framework yang digunakan.
3. Identifikasi styling system yang digunakan.
4. Identifikasi component/library yang sudah tersedia.
5. Identifikasi routing yang sudah tersedia.
6. Identifikasi assets yang sudah tersedia.
7. Identifikasi design system atau visual style yang sudah diterapkan.
8. Pahami struktur template terlebih dahulu sebelum mengubah kode.

### Jangan melakukan hal berikut tanpa alasan yang kuat:

- Jangan mengganti framework.
- Jangan menghapus template yang sudah ada.
- Jangan membuat project baru.
- Jangan mengganti struktur project secara keseluruhan.
- Jangan mengganti design system yang sudah tersedia secara sembarangan.
- Jangan menginstal dependency baru jika sebenarnya fitur dapat dibuat menggunakan dependency yang sudah tersedia.
- Jangan membangun ulang komponen yang sebenarnya sudah tersedia di template.

**Pertahankan struktur dan karakter template yang sudah ada, kemudian sesuaikan template tersebut dengan kebutuhan website Sentra Kerupuk Ikan Besuki.**

Jika terdapat bagian template yang tidak sesuai dengan kebutuhan website, lakukan modifikasi secara terukur dan tetap pertahankan konsistensi desain.

---

## 0.1 MOBILE-FIRST DEVELOPMENT

**WEBSITE HARUS DIKEMBANGKAN DENGAN PENDEKATAN MOBILE-FIRST.**

Urutan prioritas responsive design:

**Mobile → Tablet → Desktop**

Jangan mendesain desktop terlebih dahulu lalu sekadar mengecilkannya ke mobile.

Mulai dari ukuran layar mobile terlebih dahulu.

Pastikan pada mobile:

- navigation nyaman digunakan;
- typography readable;
- spacing tidak terlalu padat;
- CTA WhatsApp mudah ditemukan dan ditekan;
- CTA Google Maps mudah ditemukan dan ditekan;
- card UMKM nyaman dibaca;
- foto tidak terlalu besar sehingga memperlambat halaman;
- tidak ada horizontal scrolling;
- tidak ada elemen yang keluar dari viewport;
- tombol memiliki touch target yang nyaman;
- section tidak terasa terlalu panjang atau berantakan;
- content hierarchy tetap jelas.

Setelah tampilan mobile sudah baik, lanjutkan adaptasi ke:

1. Tablet
2. Desktop

### Responsive principle

Gunakan prinsip:

> **Design for mobile first, enhance for larger screens.**

Jangan hanya menggunakan responsive breakpoint untuk mengecilkan layout desktop.

Layout, typography, spacing, navigation, grid, image ratio, dan CTA harus dipikirkan sejak awal untuk mobile.

### Testing priority

Saat melakukan testing visual, prioritaskan:

**1. Mobile**
**2. Tablet**
**3. Desktop**

Jika terdapat konflik antara tampilan desktop dan mobile, **prioritaskan pengalaman mobile terlebih dahulu**, selama tidak merusak usability desktop.

---

# 1. PROJECT OVERVIEW

Saya ingin membangun sebuah website digital directory untuk memperkenalkan dan mempromosikan UMKM kerupuk ikan rumahan di Kecamatan Besuki, Situbondo.

Nama sementara website:

**Sentra Kerupuk Ikan Besuki**

Website ini BUKAN marketplace dan BUKAN e-commerce.

Website berfungsi sebagai:

- digital directory;
- company/profile directory untuk UMKM;
- media branding;
- media storytelling;
- media promosi;
- penghubung antara calon pelanggan dengan produsen melalui WhatsApp;
- penghubung antara calon pelanggan dengan lokasi rumah produksi melalui Google Maps.

Tujuan utama:

> Membantu masyarakat menemukan, mengenal, dan menghubungi produsen kerupuk ikan rumahan di Kecamatan Besuki dengan cara yang sederhana dan mudah digunakan.

Website harus terasa seperti **website brand lokal modern**, bukan seperti dashboard admin atau marketplace.

---

# 2. TARGET USERS

Website memiliki dua target pengguna utama.

### A. Calon pelanggan

Mereka ingin:

- mengetahui kerupuk ikan yang diproduksi di Besuki;
- mengenal produsen;
- melihat produk;
- mengetahui lokasi rumah produksi;
- menghubungi produsen;
- menanyakan ketersediaan produk;
- membeli secara langsung atau melalui kesepakatan dengan produsen.

### B. Produsen UMKM

Mereka ingin:

- memiliki identitas digital;
- memperkenalkan usaha;
- memperkenalkan produk;
- mendapatkan exposure;
- memudahkan pelanggan menemukan WhatsApp;
- memudahkan pelanggan menemukan lokasi rumah produksi.

---

# 3. BUSINESS MODEL / TRANSACTION MODEL

JANGAN membuat website seperti marketplace.

Tidak perlu:

- shopping cart;
- checkout;
- payment gateway;
- sistem pembayaran;
- sistem stok real-time;
- akun pelanggan;
- sistem pesanan;
- marketplace integration;
- e-commerce dashboard.

Alur transaksi yang diinginkan:

**Website → Profil UMKM → WhatsApp → Transaksi**

atau:

**Website → Profil UMKM → Google Maps → Pembelian langsung**

Website hanya menjadi penghubung.

---

# 4. IMPORTANT BUSINESS CONTEXT

Para produsen sudah memiliki pelanggan tetap dan beberapa memiliki reseller.

Produksi tidak selalu tersedia karena:

- bahan baku ikan tidak selalu tersedia;
- jenis ikan yang digunakan dapat berbeda;
- jumlah produksi dapat berubah;
- waktu produksi tidak selalu sama.

Karena itu:

### JANGAN menampilkan stok real-time.

Jangan menggunakan informasi seperti:

> "Stok tersedia: 20 kg"

Gunakan informasi:

> "Ketersediaan produk menyesuaikan proses produksi dan bahan baku. Silakan hubungi produsen melalui WhatsApp untuk informasi terbaru."

Harga juga tidak perlu menjadi informasi utama.

Jika harga belum dikonfirmasi oleh pemilik UMKM, jangan mengarang harga.

---

# 5. WEBSITE STRUCTURE

Gunakan struktur navigasi utama:

1. Beranda
2. Tentang Sentra
3. Proses Produksi
4. Produsen
5. Hubungi Kami

WhatsApp dan Google Maps BUKAN menu utama.

Keduanya muncul sebagai CTA pada halaman masing-masing UMKM.

---

# 6. PAGE: BERANDA / HOME

Home adalah halaman pertama yang dilihat pengunjung.

Tujuan halaman:

- menjelaskan website dalam beberapa detik;
- menunjukkan identitas Besuki;
- memperkenalkan sentra kerupuk;
- mengarahkan pengunjung ke daftar produsen.

## 6.1 Hero Section

Gunakan copy:

### SENTRA KERUPUK IKAN BESUKI

**Cerita rasa dari rumah-rumah produksi Besuki.**

Deskripsi:

> Kenali lebih dekat para pelaku UMKM kerupuk ikan rumahan di Kecamatan Besuki, Situbondo.

CTA:

**Jelajahi Produsen**

Secondary CTA:

**Tentang Sentra**

Gunakan foto asli dari rumah produksi/proses pembuatan jika tersedia.

JANGAN menggunakan foto produk generik dari internet sebagai foto utama.

---

## 6.2 Quick Statistics

Tampilkan informasi ringkas seperti:

**10+**
Rumah Produksi

**Besuki**
Situbondo

**Produksi Rumahan**
Produk Lokal

Catatan:

Jangan membuat angka atau klaim yang belum diverifikasi.

Jika data final belum tersedia, gunakan placeholder.

---

## 6.3 Intro Section

Judul:

### Dibuat dari Rumah, Tumbuh dari Besuki

Isi berupa 2–3 paragraf mengenai sentra kerupuk ikan dan pelaku UMKM.

Gunakan data hasil survei/observasi yang diberikan nanti.

Jangan membuat fakta baru tanpa sumber.

CTA:

**Baca Cerita Sentra**

---

## 6.4 Featured Producers

Tampilkan 3–4 UMKM sebagai preview.

Contoh card:

**Kerupuk Bu Siti**

Kerupuk Ikan
Desa X, Besuki

CTA:

**Lihat Profil**

Di bawahnya:

**+ 7 produsen lainnya**

CTA:

**Lihat Semua Produsen**

Pada mobile, card harus tetap nyaman dibaca dan tidak terlalu kecil.

Jika menggunakan grid pada desktop, grid dapat disederhanakan menjadi satu kolom atau layout yang sesuai pada mobile.

---

## 6.5 How To Buy

Judul:

### Bagaimana Cara Membeli?

Buat tiga langkah:

### 01 — Pilih Produsen

Temukan rumah produksi yang ingin Anda kenal.

### 02 — Hubungi

Klik WhatsApp untuk menanyakan produk dan ketersediaan.

### 03 — Ambil / Pesan

Lakukan pembelian langsung atau sesuai kesepakatan dengan produsen.

Tujuan section ini adalah menjelaskan bahwa website bukan marketplace.

---

# 7. PAGE: TENTANG SENTRA

Halaman ini menggunakan pendekatan storytelling.

Buat section:

## 7.1 Tentang Sentra

Jelaskan:

- bagaimana usaha kerupuk berkembang;
- siapa pelakunya;
- lokasi;
- kondisi usaha;
- bagaimana produk dipasarkan;
- karakter usaha rumahan.

Hanya gunakan data yang benar-benar tersedia.

---

## 7.2 Cerita di Balik Kerupuk

Gunakan storytelling.

Contoh konsep:

> Bagi sebagian orang, kerupuk mungkin hanya menjadi pelengkap makanan. Namun bagi para produsen di Besuki, kerupuk merupakan bagian dari aktivitas ekonomi keluarga.

Tambahkan foto pemilik UMKM jika tersedia dan sudah mendapatkan izin publikasi.

---

## 7.3 Potensi Lokal

Judul:

### Mengapa Kerupuk Ikan?

Bahas:

- ikan sebagai bahan baku;
- keterampilan masyarakat;
- produksi rumahan;
- pelanggan dan reseller;
- potensi branding;
- potensi pemasaran digital.

---

## 7.4 Rumah Produksi

Tampilkan angka:

**10**

**Rumah Produksi yang Tergabung**

Kemudian tampilkan preview produsen.

---

# 8. PAGE: PROSES PRODUKSI

Tujuan halaman:

Menceritakan proses dan manusia di balik produk.

Jangan membuatnya terlalu teknis.

Buat visual timeline/step-by-step:

### 01

Pemilihan Bahan Baku

### 02

Pengolahan

### 03

Pembuatan Adonan

### 04

Pengukusan

### 05

Pemotongan

### 06

Penjemuran

### 07

Penggorengan

### 08

Pengemasan

Setiap step dapat memiliki:

- nomor;
- judul;
- deskripsi singkat;
- foto.

PENTING:

Jangan menganggap semua UMKM memiliki proses yang sama.

Jika proses antar-UMKM berbeda, tampilkan sebagai **gambaran umum berdasarkan hasil observasi**, bukan sebagai proses wajib untuk semua produsen.

Closing text:

> Dari rumah-rumah produksi Besuki, lahir kerupuk yang membawa cerita lokal.

---

# 9. PAGE: PRODUSEN

Ini adalah halaman terpenting.

Judul:

### Temukan Produsen

Subtitle:

> Kenali rumah produksi kerupuk ikan di Kecamatan Besuki.

Tampilkan 10 UMKM dalam bentuk responsive cards.

Setiap card minimal memiliki:

- foto;
- nama usaha;
- lokasi/desa;
- kategori produk;
- tombol "Lihat Profil".

Contoh:

```text
[ FOTO ]

Kerupuk Bu Siti
Desa X, Besuki
Kerupuk Ikan

[ Lihat Profil ]
```

Pada mobile, prioritaskan:

- foto;
- nama usaha;
- lokasi;
- kategori;
- CTA.

Jangan membuat card terlalu padat.

---

# 10. SEARCH AND FILTER

Search tidak wajib untuk versi pertama jika hanya ada 10 UMKM, tetapi struktur website harus memungkinkan fitur ini ditambahkan.

Jika memungkinkan, implementasikan:

### Search

Placeholder:

> Cari produsen...

### Filter berdasarkan kebutuhan

**Saya ingin membeli:**

- Eceran
- Grosir
- Reseller

Contoh:

Jika pengguna memilih **Reseller**, tampilkan hanya UMKM yang melayani reseller.

### Filter tambahan

Jika datanya tersedia:

**Desa**

- Pesisir
- Besuki
- desa lainnya

**Jenis Produk**

- Kerupuk ikan
- Kerupuk mentah
- produk lainnya

Jangan membuat filter untuk data yang belum tersedia.

Pada mobile, filter harus mudah digunakan. Jika menggunakan filter panel/drawer, pastikan dapat dibuka dan ditutup dengan nyaman.

---

# 11. PAGE: DETAIL / PROFILE SETIAP UMKM

Setiap UMKM memiliki halaman detail sendiri.

Contoh:

### Kerupuk Bu Siti

**Rumah Produksi Kerupuk Ikan**

Informasi lokasi:

**Desa X, Kecamatan Besuki**

CTA:

**Hubungi Produsen**

**Kunjungi Rumah Produksi**

Pada mobile, CTA utama harus mudah terlihat tanpa harus melakukan banyak scrolling.

---

## 11.1 Hero / Main Photo

Tampilkan foto:

- produk;
- atau pemilik;
- atau rumah produksi.

Prioritaskan foto asli hasil dokumentasi KKN.

Pastikan gambar responsive dan tidak menyebabkan horizontal overflow.

---

## 11.2 Tentang Usaha

Tampilkan cerita singkat mengenai usaha.

Contoh:

> Kerupuk Bu Siti merupakan usaha produksi kerupuk ikan rumahan yang menjalankan kegiatan produksi di Kecamatan Besuki. Produk dipasarkan kepada pelanggan langsung maupun reseller.

Gunakan data aktual dari hasil wawancara.

Jangan mengarang sejarah usaha.

---

## 11.3 Informasi Usaha

Gunakan informasi:

| Field            | Value                      |
| ---------------- | -------------------------- |
| Nama usaha       | ...                        |
| Pemilik          | ...                        |
| Lokasi           | ...                        |
| Produk           | ...                        |
| Sistem pembelian | Eceran / Grosir / Reseller |
| Produksi         | Menyesuaikan bahan baku    |
| Pemesanan        | WhatsApp                   |

Jika data belum tersedia, gunakan placeholder atau kosongkan.

Jangan mengarang.

Pada mobile, tabel boleh diubah menjadi stacked information/card layout agar mudah dibaca.

---

# 12. PRODUCT SECTION

Judul:

### Produk Kerupuk

Setiap produk dapat memiliki:

- foto;
- nama produk;
- deskripsi singkat.

Contoh:

### Kerupuk Ikan

> Kerupuk ikan produksi rumahan dengan ketersediaan yang menyesuaikan proses produksi dan bahan baku.

Jika satu UMKM memiliki beberapa jenis produk, tampilkan:

- Kerupuk Ikan A
- Kerupuk Ikan B
- Kerupuk Mentah

Jangan menampilkan produk yang belum dikonfirmasi.

---

# 13. PRICE POLICY

JANGAN menampilkan harga sebagai informasi utama jika harga belum dikonfirmasi.

Default text:

> Harga dan ketersediaan dapat berubah sesuai kondisi produksi. Silakan hubungi produsen melalui WhatsApp untuk informasi terbaru.

Jika pemilik UMKM memberikan harga dan mengizinkan harga tersebut dipublikasikan, barulah harga boleh ditampilkan.

---

# 14. WHATSAPP CTA

WhatsApp harus menjadi CTA utama pada halaman UMKM.

Button:

### Hubungi Produsen

Saat diklik, buka WhatsApp dengan pesan otomatis:

> Halo, saya mengetahui usaha Anda melalui website Sentra Kerupuk Ikan Besuki. Saya ingin mengetahui informasi mengenai ketersediaan kerupuk saat ini.

Nomor WhatsApp harus berasal dari data UMKM.

Jangan membuat nomor palsu.

Pada mobile:

- button harus memiliki ukuran touch target yang nyaman;
- jangan membuat button terlalu kecil;
- CTA harus mudah ditemukan;
- jika menggunakan sticky CTA, pastikan tidak menutupi konten.

---

# 15. GOOGLE MAPS CTA

Button:

### Kunjungi Rumah Produksi

Secondary action:

**Buka Google Maps**

Gunakan koordinat atau link Google Maps yang diberikan/ditentukan oleh pemilik UMKM.

PENTING:

- jangan membuat lokasi palsu;
- jangan menebak koordinat;
- jangan mempublikasikan alamat rumah pribadi tanpa persetujuan;
- jika pemilik tidak nyaman alamat rumah ditampilkan secara publik, gunakan informasi lokasi yang lebih umum atau jangan tampilkan lokasi detail.

---

# 16. PAGE: HUBUNGI KAMI

Buat halaman sederhana.

Judul:

### Hubungi Sentra Kerupuk Ikan Besuki

Tujuan:

- informasi sentra;
- kerja sama;
- dokumentasi;
- informasi program;
- pertanyaan umum.

Tampilkan:

**WhatsApp Admin Sentra**

Jika pengguna ingin membeli produk, arahkan mereka ke halaman masing-masing produsen.

CTA:

**Temukan Produsen**

---

# 17. FOOTER

Footer harus sederhana.

Tampilkan:

**SENTRA KERUPUK IKAN BESUKI**

_Rasa Lokal, Cerita dari Besuki._

Navigation:

- Tentang Sentra
- Produsen
- Proses Produksi
- Hubungi Kami

Copyright:

**© 2026 Sentra Kerupuk Ikan Besuki**

Jika website dibuat sebagai program KKN, nama universitas/kelompok dapat ditampilkan secara proporsional.

Branding KKN tidak boleh mengambil alih branding sentra/UMKM.

Pada mobile, footer boleh ditata secara vertikal agar lebih mudah dibaca.

---

# 18. DATA MODEL

Siapkan struktur data agar 10 UMKM dapat dikelola secara konsisten.

Setiap UMKM minimal memiliki:

```text
id
nama_usaha
nama_pemilik
tahun_mulai
desa
kecamatan
alamat
latitude
longitude
google_maps_url
whatsapp
deskripsi
produk
jenis_produk
sistem_pembelian
melayani_eceran
melayani_grosir
melayani_reseller
ketersediaan
foto_pemilik
foto_produk
foto_kemasan
foto_rumah_produksi
foto_proses
```

Jika menggunakan data statis terlebih dahulu, struktur tersebut tetap harus dibuat modular agar mudah dipindahkan ke database/CMS nantinya.

---

# 19. DATA YANG AKAN DIINPUT NANTI

Saya akan memberikan data aktual 10 UMKM secara bertahap.

Data yang perlu disiapkan:

## Identitas

- Nama usaha
- Nama pemilik
- Tahun mulai usaha
- Desa
- Kecamatan
- Nomor WhatsApp
- Alamat
- Google Maps

## Produk

- Nama produk
- Jenis kerupuk
- Jenis ikan/bahan baku jika pemilik bersedia menyebutkan
- Bentuk produk
- Mentah/goreng
- Sistem pembelian
- Eceran/grosir/reseller

## Operasional

- Hari produksi
- Frekuensi produksi
- Ketersediaan produk
- Faktor yang memengaruhi produksi
- Cara memperoleh bahan baku

## Cerita

- Bagaimana usaha dimulai?
- Sudah berapa lama?
- Siapa yang mengelola?
- Siapa pelanggan utama?
- Apakah memiliki reseller?
- Apa tantangan terbesar?

## Dokumentasi

- Foto pemilik
- Foto rumah produksi
- Foto produk
- Foto kemasan
- Foto bahan baku
- Foto proses
- Foto produk jadi

Jangan mengarang data yang belum saya berikan.

---

# 20. PRIVACY AND CONSENT

Sebelum informasi dipublikasikan, pastikan pemilik UMKM memberikan persetujuan untuk:

- nama usaha;
- nama pemilik;
- nomor WhatsApp;
- foto;
- alamat;
- lokasi Google Maps;
- informasi produk;
- cerita usaha.

Jangan mengasumsikan semua informasi boleh dipublikasikan.

---

# 21. USER JOURNEY

Website harus mendukung alur berikut:

```text
Pengguna mencari:
"Kerupuk ikan Besuki"
        ↓
Masuk website
        ↓
Melihat Sentra Kerupuk Ikan Besuki
        ↓
Membaca cerita sentra
        ↓
Melihat daftar produsen
        ↓
Memilih salah satu UMKM
        ↓
Melihat profil + produk + foto
        ↓
Klik "Hubungi Produsen"
        ↓
WhatsApp
        ↓
Menanyakan ketersediaan
        ↓
Transaksi
```

Alternatif:

```text
Website
   ↓
Profil UMKM
   ↓
Kunjungi Rumah Produksi
   ↓
Google Maps
   ↓
Pembelian langsung
```

---

# 22. DESIGN DIRECTION

Website harus memiliki karakter:

- modern;
- aesthetic;
- clean;
- warm;
- lokal;
- human-centered;
- premium tetapi tetap approachable;
- tidak terlihat seperti marketplace;
- tidak terlihat seperti website pemerintahan;
- tidak terlihat seperti template UMKM generik.

Gunakan:

- whitespace yang cukup;
- typography yang kuat;
- foto dokumentasi sebagai visual utama;
- card layout yang bersih;
- subtle animation;
- rounded corners secukupnya;
- hierarchy yang jelas;
- responsive design.

Hindari:

- terlalu banyak warna;
- gradient berlebihan;
- animasi berlebihan;
- card yang terlalu ramai;
- icon yang terlalu banyak;
- layout dashboard;
- desain seperti marketplace;
- stok palsu;
- data dummy yang terlihat seperti data asli.

**PENTING: Jangan mengubah visual style template yang sudah saya berikan tanpa alasan.**

Gunakan design language dari template sebagai fondasi utama.

Jika template memiliki:

- typography;
- spacing;
- color palette;
- button style;
- card style;
- border radius;
- animation;
- navigation style;

pertahankan dan adaptasikan agar sesuai dengan konsep Sentra Kerupuk Ikan Besuki.

---

# 23. VISUAL IDENTITY

Website harus mengangkat unsur:

- Besuki;
- kerupuk;
- ikan;
- rumah produksi;
- masyarakat lokal;
- cerita;
- produk rumahan.

Namun jangan membuat desain terlalu literal.

Jangan memenuhi website dengan ilustrasi ikan/kerupuk di setiap section.

Prioritaskan:

**fotografi + typography + whitespace + warna natural.**

---

# 24. CONTENT RULES

Gunakan bahasa Indonesia.

Tone:

- hangat;
- informatif;
- sederhana;
- tidak terlalu formal;
- tidak terlalu marketing-heavy.

Jangan membuat klaim seperti:

- "terbaik";
- "nomor satu";
- "paling enak";
- "100% asli";
- "paling terkenal";

kecuali ada data yang benar-benar mendukung.

Jangan mengarang:

- harga;
- jumlah produksi;
- sejarah;
- bahan baku;
- alamat;
- nomor WhatsApp;
- jumlah reseller;
- jam operasional;
- jenis produk.

Jika data belum tersedia, gunakan placeholder yang jelas.

---

# 25. RESPONSIVE DESIGN — MOBILE FIRST

**Ini adalah requirement wajib.**

Website harus responsive untuk:

1. Mobile — PRIORITAS UTAMA
2. Tablet
3. Desktop

Implementasikan responsive design dengan pendekatan **mobile-first**.

### Mobile harus menjadi baseline design.

Artinya:

- mulai dari layout mobile;
- mulai dari typography mobile;
- mulai dari spacing mobile;
- mulai dari card mobile;
- mulai dari navigation mobile;
- mulai dari CTA mobile;
- kemudian scale/enhance ke tablet;
- kemudian enhance ke desktop.

Jangan membuat desktop layout terlebih dahulu lalu memaksanya menjadi mobile.

### Mobile requirements

Pastikan:

- tidak ada horizontal scroll;
- semua text readable;
- navigation nyaman;
- hamburger/mobile navigation jika dibutuhkan;
- CTA WhatsApp mudah ditemukan;
- CTA Maps mudah ditekan;
- card UMKM tidak terlalu kecil;
- grid dapat berubah menjadi single-column bila diperlukan;
- image ratio tetap proporsional;
- button memiliki touch target yang cukup;
- spacing tidak terlalu sempit;
- section tidak terlalu padat;
- footer nyaman dibaca;
- modal/drawer/filter nyaman digunakan;
- tidak ada elemen yang keluar viewport.

### Tablet

Setelah mobile stabil, adaptasikan layout untuk tablet.

### Desktop

Setelah mobile dan tablet stabil, gunakan ruang layar desktop secara optimal.

Desktop boleh menggunakan:

- multi-column layout;
- wider container;
- larger typography;
- larger imagery;
- expanded navigation;

selama tetap mempertahankan visual language dari template.

---

# 26. ACCESSIBILITY

Implementasikan minimal:

- semantic HTML;
- alt text untuk gambar;
- keyboard navigation;
- visible focus state;
- sufficient contrast;
- button yang jelas;
- heading hierarchy yang benar;
- link yang memiliki label jelas.

Pastikan accessibility tetap baik pada mobile.

---

# 27. SEO BASIC

Website harus SEO-friendly.

Setiap halaman harus memiliki:

- title;
- meta description;
- semantic heading;
- Open Graph metadata;
- descriptive URL;
- alt text;
- structured content.

Target pencarian yang relevan:

- kerupuk ikan Besuki;
- kerupuk Besuki;
- UMKM kerupuk Besuki;
- kerupuk ikan Situbondo;
- produsen kerupuk Besuki;
- rumah produksi kerupuk Besuki.

Jangan melakukan keyword stuffing.

---

# 28. PERFORMANCE

Prioritaskan:

- image optimization;
- lazy loading;
- responsive images;
- minimal JavaScript;
- fast initial load;
- no unnecessary dependencies.

Foto UMKM kemungkinan berukuran besar, jadi optimalkan sebelum ditampilkan.

Karena mobile adalah prioritas utama, **performance pada perangkat mobile harus menjadi perhatian utama**.

Pastikan website tetap terasa ringan meskipun menggunakan banyak foto dokumentasi UMKM.

---

# 29. IMPORTANT DEVELOPMENT WORKFLOW

## STEP 1 — Inspect existing template/project

**SANGAT PENTING: PROJECT SUDAH MEMILIKI TEMPLATE.**

Sebelum melakukan coding, periksa:

- framework;
- package manager;
- existing components;
- existing styling;
- routing;
- assets;
- configuration;
- linting;
- testing setup;
- design system;
- responsive utilities;
- existing breakpoints.

Pahami template terlebih dahulu.

**Jangan membuat project baru.**

---

## STEP 2 — Analyze the template

Identifikasi:

- bagaimana template mengatur layout;
- bagaimana template mengatur typography;
- bagaimana template mengatur colors;
- bagaimana template mengatur spacing;
- bagaimana template mengatur responsive breakpoint;
- komponen apa yang dapat digunakan kembali;
- komponen apa yang perlu dimodifikasi;
- halaman apa yang sudah tersedia.

Kemudian tentukan bagaimana kebutuhan website Sentra Kerupuk Ikan Besuki dapat diintegrasikan ke dalam template.

---

## STEP 3 — Buat implementation plan

Sebelum coding, jelaskan secara singkat:

- struktur halaman;
- component architecture;
- data model;
- routing;
- asset strategy;
- template integration strategy;
- mobile-first responsive strategy;
- responsive breakpoint strategy.

**Tampilkan implementation plan terlebih dahulu sebelum melakukan perubahan besar.**

---

## STEP 4 — Implement

Bangun website secara bertahap.

Prioritaskan:

1. Existing template integration
2. Mobile layout
3. Navigation
4. Homepage
5. Producer directory
6. Producer detail
7. WhatsApp
8. Maps
9. Tablet adaptation
10. Desktop adaptation
11. SEO
12. Accessibility
13. Performance

Jangan mengorbankan mobile demi desktop.

---

## STEP 5 — Test

Setelah implementasi:

- jalankan project;
- cek build;
- cek lint;
- cek type errors;
- cek console errors;
- cek responsive layout;
- **test mobile terlebih dahulu**;
- test tablet;
- test desktop;
- cek semua link;
- cek WhatsApp CTA;
- cek Google Maps CTA;
- cek semua route.

Jika ada error, perbaiki sebelum selesai.

### Visual QA priority:

**Mobile → Tablet → Desktop**

---

# 30. ACCEPTANCE CRITERIA

Website dianggap selesai jika:

### General

- [ ] Website dapat dijalankan tanpa error.
- [ ] Existing template tetap digunakan.
- [ ] Tidak membuat project baru.
- [ ] Responsive dengan pendekatan mobile-first.
- [ ] Mobile menjadi prioritas utama.
- [ ] Tablet dan desktop mengikuti layout mobile yang sudah matang.
- [ ] Navigation berfungsi.
- [ ] Tidak ada broken link.
- [ ] Tidak ada console error.
- [ ] Tidak ada data palsu yang disajikan sebagai fakta.

### Home

- [ ] Hero section tersedia.
- [ ] CTA ke daftar produsen tersedia.
- [ ] Intro sentra tersedia.
- [ ] Featured producers tersedia.
- [ ] How-to-buy tersedia.
- [ ] Mobile layout nyaman digunakan.

### Tentang

- [ ] Informasi sentra tersedia.
- [ ] Storytelling tersedia.
- [ ] Potensi lokal tersedia.
- [ ] Daftar/angka rumah produksi dapat ditampilkan berdasarkan data aktual.
- [ ] Mobile layout nyaman dibaca.

### Proses

- [ ] Proses produksi divisualisasikan.
- [ ] Setiap tahap memiliki deskripsi.
- [ ] Foto dapat digunakan jika tersedia.
- [ ] Tidak mengklaim proses yang belum diverifikasi.
- [ ] Timeline tetap nyaman digunakan pada mobile.

### Produsen

- [ ] 10 UMKM dapat ditampilkan.
- [ ] Card produsen responsive.
- [ ] Card nyaman digunakan di mobile.
- [ ] Detail produsen dapat dibuka.
- [ ] Search/filter dapat digunakan jika diimplementasikan.

### Detail UMKM

- [ ] Foto utama.
- [ ] Nama usaha.
- [ ] Nama pemilik.
- [ ] Deskripsi.
- [ ] Produk.
- [ ] Sistem pembelian.
- [ ] Informasi ketersediaan.
- [ ] WhatsApp CTA.
- [ ] Google Maps CTA.
- [ ] Layout nyaman digunakan di mobile.

### WhatsApp

- [ ] Nomor berasal dari data aktual.
- [ ] CTA membuka WhatsApp.
- [ ] Pesan otomatis sudah disiapkan.
- [ ] CTA mudah ditemukan pada mobile.

### Maps

- [ ] Link Maps berasal dari data aktual.
- [ ] Tidak ada lokasi yang dibuat-buat.
- [ ] Privacy consent diperhatikan.
- [ ] CTA mudah digunakan pada mobile.

### Responsive

- [ ] Mobile-first.
- [ ] Mobile tested.
- [ ] Tablet tested.
- [ ] Desktop tested.
- [ ] Tidak ada horizontal overflow.
- [ ] Tidak ada layout yang rusak pada mobile.
- [ ] Semua CTA memiliki touch target yang nyaman.
- [ ] Semua gambar responsive.

---

# 31. IMPORTANT: DO NOT OVERENGINEER

Ini adalah proyek KKN dengan tujuan keberlanjutan.

Jangan membuat sistem yang terlalu kompleks.

Tidak perlu:

- authentication;
- admin dashboard kompleks;
- payment gateway;
- shopping cart;
- real-time inventory;
- order management;
- unnecessary backend;
- unnecessary database.

Jika website dapat dibuat dengan static data/content yang terstruktur dan mudah diperbarui, prioritaskan solusi tersebut.

Yang paling penting adalah:

**mudah digunakan + cepat + mudah dirawat + mudah diteruskan setelah KKN selesai.**

Selain itu:

**Jangan menambahkan teknologi baru hanya untuk membuat project terlihat lebih kompleks.**

Gunakan teknologi dan komponen yang sudah tersedia di template/project selama masih sesuai dengan kebutuhan.

---

# 32. FINAL PRODUCT VISION

Bayangkan seorang pengguna mencari:

> "Kerupuk ikan Besuki"

Mereka menemukan website:

# SENTRA KERUPUK IKAN BESUKI

**Cerita rasa dari rumah-rumah produksi Besuki.**

Mereka kemudian dapat:

**Mengenal sentra**
→ **Melihat proses**
→ **Menemukan 10 produsen**
→ **Membuka profil UMKM**
→ **Melihat produk**
→ **Menghubungi WhatsApp**
→ **Menemukan lokasi rumah produksi**

Website bukan menggantikan cara jualan UMKM yang sudah berjalan.

Website hanya membuat produsen menjadi:

**lebih mudah ditemukan, lebih mudah dikenali, dan lebih mudah dihubungi.**

Website juga harus memberikan pengalaman terbaik terlebih dahulu kepada pengguna mobile.

---

# 33. FIRST TASK FOR CLAUDE CODE

**JANGAN LANGSUNG CODING.**

Saya sudah memiliki template/project website.

Pertama:

1. Inspect project yang ada.
2. Identifikasi framework dan struktur project.
3. Identifikasi design system/component library.
4. Identifikasi asset yang tersedia.
5. Identifikasi struktur routing.
6. Identifikasi styling system.
7. Identifikasi responsive breakpoint yang sudah digunakan.
8. Identifikasi komponen yang dapat digunakan kembali.
9. Pahami bagaimana template bekerja.
10. Buat implementation plan berdasarkan brief ini.
11. Pastikan plan menggunakan template yang sudah tersedia, bukan membuat project baru.
12. Pastikan strategi responsive menggunakan **mobile-first**.
13. Tampilkan plan terlebih dahulu.
14. Jangan melakukan perubahan besar sebelum plan disetujui.

Setelah plan jelas, baru implementasikan website.

Jika ada informasi teknis yang belum tersedia, gunakan asumsi yang paling sederhana dan jelaskan asumsi tersebut sebelum implementasi.

**Prioritaskan solusi yang maintainable, mobile-first, cepat, mudah dirawat, dan mudah diteruskan setelah program KKN selesai.**

---

# 34. FINAL REMINDER

Sebelum mulai coding, ingat tiga hal utama:

### 1. EXISTING TEMPLATE

> **Saya sudah memiliki template. Sesuaikan website dengan template yang sudah ada. Jangan membuat dari nol.**

### 2. MOBILE-FIRST

> **Bangun dan validasi pengalaman mobile terlebih dahulu, kemudian adaptasikan ke tablet dan desktop.**

### 3. DO NOT OVERENGINEER

> **Buat solusi yang sederhana, clean, maintainable, dan sesuai kebutuhan nyata UMKM. Jangan membuat marketplace.**
