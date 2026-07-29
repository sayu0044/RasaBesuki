import data from "@/data/produsen.json";

/**
 * Satu-satunya sumber data produsen adalah src/data/produsen.json.
 * Berkas itu disalin apa adanya dari project statis sebelumnya, termasuk
 * aturan pengisiannya: field yang belum dikonfirmasi pemilik usaha tetap null,
 * dan website menampilkan "Belum tersedia" alih-alih mengarang isi.
 */

export type Produk = {
  nama: string | null;
  jenis: string | null;
  deskripsi: string | null;
  foto: string | null;
};

export type Produsen = {
  id: string;
  terverifikasi: boolean;
  nama_usaha: string;
  nama_pemilik: string | null;
  tahun_mulai: number | null;
  desa: string | null;
  kecamatan: string | null;
  alamat: string | null;
  maps_url: string | null;
  whatsapp: string | null;
  deskripsi: string | null;
  produk: Produk[];
  melayani_eceran: boolean | null;
  melayani_grosir: boolean | null;
  melayani_reseller: boolean | null;
  catatan_produksi: string | null;
  foto_utama: string | null;
  foto_galeri: string[];
};

export type Sentra = {
  nama: string;
  tagline: string;
  base_url: string | null;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  whatsapp_admin: string | null;
  email: string | null;
  pesan_wa_default: string;
  penyelenggara: string;
  tahun: string;
};

export const sentra = data.sentra as Sentra;

export function getAllProdusen(): Produsen[] {
  return data.produsen as Produsen[];
}

export function getProdusenById(id: string): Produsen | undefined {
  return getAllProdusen().find((p) => p.id === id);
}

/** Produsen yang ditampilkan sebagai sorotan di beranda. */
export function getFeaturedProdusen(limit = 4): Produsen[] {
  return getAllProdusen().slice(0, limit);
}

/** Jumlah produsen lain yang belum tampil di sorotan beranda. */
export function countSisaProdusen(ditampilkan: number): number {
  return Math.max(0, getAllProdusen().length - ditampilkan);
}

/** true bila nilainya benar-benar ada, bukan null / string kosong / array kosong. */
export function isFilled(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/** Teks lokasi sesingkat mungkin, tanpa mengarang desa yang belum diisi. */
export function lokasiSingkat(p: Produsen): string {
  const bagian = [p.desa, p.kecamatan].filter((v): v is string => isFilled(v));
  if (bagian.length === 0) return "Kecamatan Besuki";
  return bagian.join(" · ");
}

/**
 * Label sistem pembelian yang sudah dikonfirmasi.
 * Field bernilai null berarti belum dikonfirmasi, jadi tidak ikut ditampilkan.
 */
export function layananPembelian(p: Produsen): string[] {
  const label: string[] = [];
  if (p.melayani_eceran === true) label.push("Eceran");
  if (p.melayani_grosir === true) label.push("Grosir");
  if (p.melayani_reseller === true) label.push("Reseller");
  return label;
}

/** Jenis produk yang sudah dikonfirmasi, tanpa duplikat. */
export function jenisProduk(p: Produsen): string[] {
  const jenis = p.produk
    .map((item) => item.jenis ?? item.nama)
    .filter((v): v is string => isFilled(v));
  return Array.from(new Set(jenis));
}

/** Foto utama produsen, atau null bila dokumentasi belum tersedia. */
export function fotoUtama(p: Produsen): string | null {
  if (!isFilled(p.foto_utama)) return null;
  const src = p.foto_utama as string;
  return src.startsWith("/") ? src : `/${src}`;
}
