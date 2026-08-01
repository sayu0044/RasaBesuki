import { sentra, type Produsen } from "./produsen";

/**
 * Mengubah nomor Indonesia ke bentuk internasional yang dimengerti wa.me.
 *
 * Ini bukan kerapian, ini perbaikan bug. Seluruh nomor di data ditulis dalam
 * bentuk lokal, misalnya 081358287685. Versi sebelumnya hanya membuang
 * karakter bukan angka lalu menyerahkannya apa adanya ke wa.me, dan wa.me
 * selalu membaca deretan itu sebagai nomor internasional tanpa tanda plus.
 * Angka 81 di depan dibaca sebagai kode negara Jepang, sehingga tombol
 * "Hubungi Produsen" membuka percakapan ke +81 3-5828-7685, nomor asing yang
 * tidak ada hubungannya dengan pemilik usaha.
 *
 * Nol di depan adalah awalan panggilan dalam negeri; pada bentuk
 * internasional ia digantikan kode negara, bukan ditambahkan di depannya.
 * Karena itu nol dibuang lebih dulu, baru 62 dipasang.
 *
 * Tiga bentuk yang diterima, semuanya bermuara ke hasil yang sama:
 *   081358287685    -> 6281358287685
 *   6281358287685   -> 6281358287685
 *   81358287685     -> 6281358287685
 */
export function normalkanNomorWa(nomor: string | null): string | null {
  if (!nomor) return null;

  const angka = nomor.replace(/\D/g, "");
  if (angka.length === 0) return null;

  const nasional = angka.startsWith("62")
    ? angka.slice(2)
    : angka.startsWith("0")
      ? angka.slice(1)
      : angka;

  // Nomor seluler Indonesia berkisar 9 sampai 12 angka setelah kode negara.
  // Batas dilonggarkan sedikit di kedua sisi supaya nomor yang sah tidak
  // ikut tersaring, tapi tetap menolak data yang jelas bukan nomor.
  if (nasional.length < 8 || nasional.length > 13) return null;

  return `62${nasional}`;
}

/**
 * Tautan WhatsApp hanya dibuat bila nomornya benar-benar ada di data dan
 * bentuknya masuk akal. Mengembalikan null bila pemilik usaha belum
 * memberikan nomor, belum bersedia nomornya dipublikasikan, atau nomornya
 * tidak bisa dinormalkan. Pemanggil wajib menangani kasus null, bukan
 * menampilkan tombol yang tidak berfungsi.
 */
export function waLink(nomor: string | null, pesan?: string): string | null {
  const internasional = normalkanNomorWa(nomor);
  if (!internasional) return null;
  const teks = encodeURIComponent(pesan ?? sentra.pesan_wa_default);
  return `https://wa.me/${internasional}?text=${teks}`;
}

export function waProdusen(p: Produsen): string | null {
  return waLink(p.whatsapp);
}

export function waAdminSentra(): string | null {
  return waLink(sentra.whatsapp_admin);
}
