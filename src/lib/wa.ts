import { sentra, type Produsen } from "./produsen";

/**
 * Tautan WhatsApp hanya dibuat bila nomornya benar-benar ada di data.
 * Mengembalikan null bila pemilik usaha belum memberikan nomor atau belum
 * bersedia nomornya dipublikasikan. Pemanggil wajib menangani kasus null,
 * bukan menampilkan tombol yang tidak berfungsi.
 */
export function waLink(nomor: string | null, pesan?: string): string | null {
  if (!nomor || nomor.trim().length === 0) return null;
  const bersih = nomor.replace(/\D/g, "");
  if (bersih.length < 8) return null;
  const teks = encodeURIComponent(pesan ?? sentra.pesan_wa_default);
  return `https://wa.me/${bersih}?text=${teks}`;
}

export function waProdusen(p: Produsen): string | null {
  return waLink(p.whatsapp);
}

export function waAdminSentra(): string | null {
  return waLink(sentra.whatsapp_admin);
}
