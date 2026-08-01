/**
 * Koordinat kawasan sentra, hasil resolusi tautan Google Maps pendek yang
 * dipakai di src/data/produsen.json (maps.app.goo.gl/g4kowHmK2PT2cT5K9).
 *
 * Tautan pendek itu sendiri tidak bisa ditanam lewat <iframe> (Google
 * menolak permintaan langsung ke maps.app.goo.gl di dalam frame), dan
 * me-resolvenya saat build atau runtime berarti menambah panggilan jaringan
 * yang bisa gagal. Koordinat hasil resolusinya dipakai untuk membangun URL
 * sematan yang stabil, tanpa kunci API dan tanpa bergantung pada layanan
 * pemendek tautan tetap hidup.
 *
 * Seluruh rumah produksi berbagi satu kawasan yang sama (lihat catatan di
 * halaman /produsen), jadi satu koordinat ini berlaku untuk semuanya.
 */
const KOORDINAT_SENTRA = { lat: -7.7324899, lng: 113.6863812 };

/** URL Google Maps yang bisa langsung ditanam lewat <iframe>, tanpa kunci API. */
export function embedMapsSrc(zoom = 17): string {
  const { lat, lng } = KOORDINAT_SENTRA;
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}
