import { fotoUtama, sentra, type Produsen } from "./produsen";
import { ALAMAT_SITUS, urlPenuh } from "./situs";
import { normalkanNomorWa } from "./wa";

/**
 * Data terstruktur schema.org.
 *
 * Halaman ini sudah menyebutkan nama usaha, alamat, dan nomor WhatsApp dalam
 * bentuk yang bisa dibaca manusia. Mesin pencari harus menebak arti dari
 * bentuk itu, dan tebakannya sering meleset. JSON-LD menyatakannya secara
 * eksplisit: yang ini nama usaha, yang ini nomor telepon, yang ini alamat di
 * Situbondo. Itulah yang memungkinkan sebuah usaha muncul sebagai usaha di
 * hasil pencarian, bukan sekadar sebagai halaman web.
 *
 * Yang dinyatakan di sini harus benar-benar ada di halamannya. Data
 * terstruktur yang menjanjikan sesuatu yang tidak terlihat pengunjung
 * melanggar pedoman Google dan bisa membuat seluruh situs kehilangan
 * kelayakan tampil. Karena itu setiap field di bawah hanya dipasang bila
 * datanya memang ada dan memang dirender.
 */

/** Buang field kosong. Schema.org lebih baik hening daripada bernilai null. */
function tanpaKosong<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== null && v !== undefined && v !== "",
    ),
  ) as T;
}

/** E.164, satu-satunya bentuk nomor telepon yang dimengerti schema.org. */
function telepon(nomor: string | null): string | null {
  const normal = normalkanNomorWa(nomor);
  return normal ? `+${normal}` : null;
}

function alamatPos(p: Produsen) {
  return tanpaKosong({
    "@type": "PostalAddress",
    streetAddress: p.alamat ?? undefined,
    addressLocality: p.desa ?? p.kecamatan ?? sentra.kecamatan,
    addressRegion: sentra.provinsi,
    addressCountry: "ID",
  });
}

/**
 * Satu rumah produksi sebagai usaha lokal.
 *
 * @id memakai tanda pagar supaya usaha ini punya identitas tersendiri, lepas
 * dari halaman yang memuatnya. Tanpa itu, usaha dan halaman web dianggap
 * benda yang sama, dan rujukan silang dari daftar di /produsen tidak
 * menemukan sasarannya.
 */
export function jsonLdProdusen(p: Produsen) {
  const foto = fotoUtama(p);

  return tanpaKosong({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${urlPenuh(`/produsen/${p.id}`)}#usaha`,
    name: p.nama_usaha,
    description: p.deskripsi ?? undefined,
    url: urlPenuh(`/produsen/${p.id}`),
    image: foto ? urlPenuh(foto) : undefined,
    telephone: telepon(p.whatsapp) ?? undefined,
    address: alamatPos(p),
    hasMap: p.maps_url ?? undefined,
    foundingDate: p.tahun_mulai ? String(p.tahun_mulai) : undefined,
    founder: p.nama_pemilik
      ? { "@type": "Person", name: p.nama_pemilik }
      : undefined,
    // Bagian dari sentra, bukan usaha yang berdiri sendiri tanpa kaitan.
    memberOf: { "@id": `${ALAMAT_SITUS}#sentra` },
  });
}

/**
 * Direktori sebagai daftar berurutan.
 *
 * ItemList memberi tahu Google bahwa /produsen adalah daftar usaha, bukan
 * artikel yang kebetulan menyebut banyak nama. Tiap butir hanya merujuk ke
 * @id milik halaman detailnya, tidak mengulang seluruh datanya, supaya hanya
 * ada satu tempat yang menjadi sumber kebenaran tiap usaha.
 */
export function jsonLdDirektori(daftar: Produsen[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Direktori UMKM ${sentra.nama}`,
    numberOfItems: daftar.length,
    itemListElement: daftar.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: urlPenuh(`/produsen/${p.id}`),
      name: p.nama_usaha,
    })),
  };
}

/**
 * Sentra sebagai penyelenggara, dan situs sebagai situs.
 *
 * Keduanya digabung dalam satu graf. WebSite yang menyebut publisher, dan
 * Organization yang punya @id tetap, membuat rujukan memberOf dari tiap
 * produsen punya sasaran yang benar-benar ada.
 */
export function jsonLdSentra() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      tanpaKosong({
        "@type": "Organization",
        "@id": `${ALAMAT_SITUS}#sentra`,
        name: sentra.nama,
        description: sentra.tagline,
        url: ALAMAT_SITUS,
        address: tanpaKosong({
          "@type": "PostalAddress",
          addressLocality: sentra.kecamatan,
          addressRegion: sentra.provinsi,
          addressCountry: "ID",
        }),
        email: sentra.email ?? undefined,
      }),
      {
        "@type": "WebSite",
        "@id": `${ALAMAT_SITUS}#situs`,
        url: ALAMAT_SITUS,
        name: sentra.nama,
        inLanguage: "id-ID",
        publisher: { "@id": `${ALAMAT_SITUS}#sentra` },
      },
    ],
  };
}
