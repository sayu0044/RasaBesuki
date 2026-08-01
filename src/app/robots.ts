import type { MetadataRoute } from "next";
import { urlPenuh } from "@/lib/situs";

/**
 * Izin perayapan dan penunjuk sitemap.
 *
 * Namanya menyesatkan: berkas ini bukan pemblokir, melainkan hal pertama yang
 * diminta perayap sebelum menyentuh halaman mana pun. Situs ini sebelumnya
 * menjawab 404 di sana. Itu tidak menghalangi perayapan, tapi juga tidak
 * memberi tahu apa-apa, termasuk keberadaan sitemap.
 *
 * Baris Sitemap di bawah adalah alasan utama berkas ini ada. Ia jalur
 * penemuan yang berlaku untuk semua mesin pencari sekaligus, termasuk yang
 * tidak punya perkakas pendaftaran seperti Search Console.
 *
 * Tidak ada yang dilarang. Situs ini seluruhnya publik dan memang ingin
 * ditemukan; melarang sesuatu di sini hanya akan menimbulkan pertanyaan yang
 * tidak perlu saat ada halaman yang tak kunjung terindeks.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: urlPenuh("/sitemap.xml"),
  };
}
