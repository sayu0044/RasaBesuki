/**
 * Menyisipkan data terstruktur ke dalam halaman.
 *
 * Perayap membaca isi tag script ini, jadi ia harus sudah ada di HTML yang
 * dikirim server, bukan ditambahkan belakangan lewat JavaScript. Komponen ini
 * sengaja tidak memakai "use client" agar tetap dirender di server.
 *
 * JSON.stringify, bukan template string. Deskripsi usaha datang dari data dan
 * bisa memuat tanda kutip atau garis miring; merangkainya sendiri akan
 * menghasilkan JSON rusak yang diabaikan diam-diam oleh mesin pencari.
 *
 * Garis miring pada </script> di dalam teks dilarikan. Tanpa itu, sebuah
 * deskripsi yang kebetulan memuat potongan tersebut akan menutup tag script
 * lebih awal dan sisanya bocor ke halaman sebagai teks biasa.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
