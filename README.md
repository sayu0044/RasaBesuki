# Sentra Kerupuk Ikan Besuki

Website profil dan direktori rumah produksi kerupuk ikan rumahan di Kecamatan
Besuki, Kabupaten Situbondo. Disusun sebagai program kerja KKN bidang ekonomi.

Website ini **bukan** toko online. Tidak ada keranjang belanja, pembayaran,
maupun stok. Perannya hanya menghubungkan calon pembeli dengan produsen melalui
WhatsApp dan Google Maps.

---

## Menjalankan di komputer sendiri

Butuh Node.js versi 18 ke atas.

```bash
npm install     # sekali saja, saat pertama kali
npm run build   # membangun seluruh halaman dan stylesheet
npm run serve   # membuka website di http://localhost:3000
```

Atau langsung keduanya:

```bash
npm run dev
```

---

## Menambah atau mengubah data produsen

**Semua data produsen ada di satu berkas: [`data/produsen.json`](data/produsen.json).**

Langkahnya:

1. Buka `data/produsen.json`.
2. Sunting entri yang ingin diubah, atau salin satu blok produsen untuk
   menambah yang baru. Pastikan `id` unik dan tanpa spasi.
3. Jalankan `npm run build`.
4. Halaman profil di folder `produsen/` dibuat ulang otomatis, begitu juga
   daftar di halaman `produsen.html`, kartu di beranda, dan `sitemap.xml`.

**Jangan menyunting berkas HTML di folder utama atau di folder `produsen/`
secara langsung.** Berkas-berkas itu dibuat otomatis dan perubahannya akan
hilang saat build berikutnya. Sunting sumbernya di `src/pages/`.

### Aturan pengisian data

| Kolom | Catatan |
| --- | --- |
| `terverifikasi` | Isi `true` hanya setelah data dikonfirmasi pemilik usaha **dan** pemilik setuju dipublikasikan. Data terstruktur untuk mesin pencari hanya ditulis bila `true`. |
| `whatsapp` | Format internasional tanpa tanda plus, contoh `62812xxxxxxx`. Isi `null` bila pemilik tidak bersedia nomornya dipublikasikan. |
| `maps_url` | Tautan Google Maps. Isi `null` bila pemilik tidak bersedia lokasinya dipublikasikan. |
| `base_url` | Di bagian `sentra`. Isi dengan alamat website setelah domain final diketahui. Alamat kanonis, Open Graph, dan sitemap otomatis mengikutinya. |

Kolom yang bernilai `null` akan tampil sebagai "Belum tersedia" di website, dan
tombolnya menjadi nonaktif. Ini disengaja: lebih baik jujur bahwa data belum ada
daripada mengarang nomor atau lokasi.

---

## Mengganti foto

Simpan foto di folder `img/`, lalu tulis nama berkasnya di `data/produsen.json`
pada kolom `foto_utama` dan `foto_galeri`.

Foto saat ini masih memakai gambar bawaan template dan perlu diganti dengan
dokumentasi asli. Sebelum diunggah, kecilkan ukuran foto (lebar sekitar 1600 px
sudah cukup) agar halaman tetap ringan di jaringan seluler.

---

## Struktur folder

```
data/produsen.json     <- SUMBER DATA. Satu-satunya tempat mengubah isi produsen.
src/pages/             <- Isi tiap halaman utama. Sunting di sini.
src/scss/              <- Stylesheet kustom (SCSS).
src/css/tailwind.css   <- Token warna, tipografi, dan konfigurasi Tailwind.
tools/                 <- Skrip build.
img/                   <- Foto.
js/                    <- JavaScript.

css/                   <- Hasil build. Jangan disunting langsung.
lib/                   <- Pustaka hasil salinan. Jangan disunting langsung.
produsen/              <- Hasil build. Jangan disunting langsung.
*.html                 <- Hasil build. Jangan disunting langsung.

_arsip-template/       <- Template asli Tea House dari HTML Codex, disimpan
                          sebagai arsip. Tidak dipakai dan tidak dimuat.
```

---

## Teknologi

| Bagian | Dipakai |
| --- | --- |
| Halaman | HTML statis, dibangkitkan oleh skrip Node |
| Utility CSS | Tailwind CSS v4 |
| Stylesheet kustom | SCSS, dikompilasi ke `css/style.css` |
| Smooth scroll | Lenis |
| Animasi | GSAP dan ScrollTrigger |
| Ikon | Phosphor Icons, hanya ikon yang dipakai |
| JavaScript | Vanilla, tanpa jQuery dan tanpa framework |

Hasil akhirnya tetap berupa berkas statis biasa, sehingga bisa diunggah ke
hosting statis mana pun tanpa perlu server khusus.

### Catatan performa

- Ikon dipangkas dari 225 KB menjadi sekitar 12 KB. Hanya ikon yang benar-benar
  dipakai yang ikut dibangun. Lihat daftar `IKON` di `tools/build-icons.mjs`.
- GSAP dan Lenis (sekitar 130 KB) tidak dimuat di awal. Keduanya baru diunduh
  oleh `js/main.js` bila animasi memang akan dijalankan. Pengguna yang
  mengaktifkan "kurangi gerakan" di perangkatnya tidak mengunduhnya sama sekali.
- Lenis tidak dipakai di layar sentuh, karena scroll bawaan sistem sudah halus
  dan terasa lebih responsif.
- Seluruh halaman tetap terbaca lengkap tanpa JavaScript.

---

## Menerbitkan website

Karena hasilnya statis, cukup jalankan `npm run build` lalu unggah seluruh isi
folder ini (kecuali `node_modules/`) ke layanan seperti Netlify, Vercel, GitHub
Pages, atau hosting biasa.

Setelah domain diketahui, isi `base_url` di `data/produsen.json` dan jalankan
build sekali lagi agar alamat kanonis dan sitemap memakai URL lengkap.

---

## Yang masih perlu dilengkapi

- [ ] Data 10 produsen: nama usaha, pemilik, desa, tahun mulai, deskripsi.
- [ ] Nomor WhatsApp tiap produsen, beserta persetujuan publikasinya.
- [ ] Tautan Google Maps tiap produsen, beserta persetujuan publikasinya.
- [ ] Daftar produk tiap produsen.
- [ ] Sistem pembelian tiap produsen (eceran, grosir, reseller).
- [ ] Foto dokumentasi asli: pemilik, rumah produksi, proses, produk, kemasan.
- [ ] Nomor WhatsApp dan surel pengelola sentra di halaman Hubungi Kami.
- [ ] `base_url` setelah domain final ditentukan.
- [ ] Logo sentra untuk mengganti `img/logo.png`.

---

## Kredit template

Kerangka awal berasal dari template **Tea House** oleh
[HTML Codex](https://htmlcodex.com/tea-shop-website-template), disimpan di
`_arsip-template/` beserta berkas lisensinya (`LICENSE.txt`).
