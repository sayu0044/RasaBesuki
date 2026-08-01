import type { MetadataRoute } from "next";
import { getAllProdusen } from "@/lib/produsen";
import { urlPenuh } from "@/lib/situs";

/**
 * Daftar halaman yang diserahkan ke mesin pencari.
 *
 * Ini bagian yang menjawab keluhan "kok tidak muncul di Google". Google
 * menemukan situs baru terutama lewat tautan dari situs lain, dan situs ini
 * belum punya satu pun. Tanpa sitemap, tidak ada jalan bagi Google untuk tahu
 * halaman apa saja yang ada di sini. Sitemap menggantikan penemuan lewat
 * tautan dengan daftar yang diserahkan langsung.
 *
 * Halaman produsen dibangkitkan dari data, bukan ditulis manual. Menambah
 * rumah produksi di produsen.json berarti halamannya ikut masuk sitemap tanpa
 * ada yang perlu diingat, dan daftar yang ketinggalan adalah cara paling umum
 * sitemap menjadi tidak berguna.
 *
 * Halaman kontak sengaja tidak ada di sini. Rutenya sudah dinonaktifkan lewat
 * folder _kontak, dan menyerahkan alamat yang menjawab 404 ke Google hanya
 * membuang jatah perayapan.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Satu tanggal untuk seluruh entri. Situs ini statis dan seluruh isinya
  // dibangun ulang bersamaan, jadi tanggal per halaman akan mengaku tahu
  // sesuatu yang sebenarnya tidak diketahui.
  const diperbarui = new Date();

  const halamanTetap: MetadataRoute.Sitemap = [
    {
      url: urlPenuh("/"),
      lastModified: diperbarui,
      changeFrequency: "monthly",
      // Prioritas bersifat relatif terhadap halaman lain di situs yang sama,
      // bukan terhadap situs lain. Beranda tertinggi, lalu direktori
      // produsen, karena keduanya pintu masuk yang dituju pengunjung.
      priority: 1,
    },
    {
      url: urlPenuh("/produsen"),
      lastModified: diperbarui,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: urlPenuh("/tentang"),
      lastModified: diperbarui,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: urlPenuh("/proses"),
      lastModified: diperbarui,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const halamanProdusen: MetadataRoute.Sitemap = getAllProdusen().map((p) => ({
    url: urlPenuh(`/produsen/${p.id}`),
    lastModified: diperbarui,
    changeFrequency: "monthly",
    // Halaman profil adalah tujuan akhir pencarian: di sinilah pengunjung
    // menemukan nomor WhatsApp yang dicarinya.
    priority: 0.8,
  }));

  return [...halamanTetap, ...halamanProdusen];
}
