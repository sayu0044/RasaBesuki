import { sentra } from "./produsen";

/**
 * Alamat situs, satu-satunya sumber kebenaran.
 *
 * Empat hal memerlukan alamat lengkap yang sama persis: metadataBase di root
 * layout, sitemap.xml, robots.txt, dan data terstruktur JSON-LD. Kalau
 * keempatnya menyimpan alamatnya sendiri-sendiri, pindah domain nanti berarti
 * mengubah empat tempat, dan yang terlewat tidak akan menimbulkan error apa
 * pun. Ia hanya diam-diam menunjuk alamat lama, dan Google mengikutinya.
 *
 * Urutan pengambilan:
 *
 * 1. NEXT_PUBLIC_SITE_URL, supaya deployment preview bisa memakai alamatnya
 *    sendiri tanpa mengubah kode.
 * 2. base_url di data sentra, tempat yang memang disediakan untuk ini.
 * 3. Alamat produksi saat ini, sebagai jaring pengaman terakhir.
 */
const cadangan = "https://kerupukbesuki.vercel.app";

/** Tanpa garis miring di ujung. Penggabungan di bawah yang menambahkannya. */
export const ALAMAT_SITUS = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  sentra.base_url ??
  cadangan
).replace(/\/+$/, "");

/**
 * Menggabungkan path menjadi alamat lengkap.
 *
 * Sitemap dan JSON-LD sama-sama mensyaratkan alamat absolut; path relatif
 * diterima tanpa keluhan lalu diabaikan diam-diam oleh mesin pencari.
 *
 * Memakai konstruktor URL, bukan perangkaian teks. Nama berkas di public/
 * ditulis apa adanya oleh manusia dan sebagiannya memuat spasi, misalnya
 * "img/logo (2).png". Spasi mentah membuat URL tidak sah, dan perayap boleh
 * saja menolaknya. Konstruktor URL meng-encode spasi menjadi %20 sekaligus
 * membiarkan %XX yang sudah ada tetap utuh, jadi ia aman dipanggil pada path
 * yang sudah maupun belum di-encode.
 */
export function urlPenuh(path: string): string {
  return new URL(path.startsWith("/") ? path : `/${path}`, ALAMAT_SITUS).href;
}
