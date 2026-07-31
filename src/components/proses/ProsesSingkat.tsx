import Image from "next/image";

const TAHAPAN = [
  {
    nomor: "01",
    judul: "Racik Adonan",
    teks: "Ikan tenggiri diolah bersama tepung dan bumbu-bumbu sederhana hingga menjadi adonan padat.",
    foto: "/img/product/adonan.PNG",
    alt: "Adonan kerupuk kipas yang sudah dicampur, siap dibentuk",
  },
  {
    nomor: "02",
    judul: "Jemur di Bawah Matahari",
    teks: "Kerupuk yang sudah dipotong dijemur di atas para-para hingga benar-benar kering.",
    foto: "/img/product/dijemur.PNG",
    alt: "Kerupuk kipas dijemur di atas para-para di bawah sinar matahari",
  },
  {
    nomor: "03",
    judul: "Kerupuk Mentah Siap Dikemas",
    teks: "Setelah kering, kerupuk mentah ditimbang dan disortir sebelum dikemas atau digoreng.",
    foto: "/img/product/mentah.JPG",
    alt: "Tumpukan kerupuk kipas mentah yang sudah kering, ditimbang untuk dikemas",
  },
  {
    nomor: "04",
    judul: "Digoreng & Dikemas",
    teks: "Kerupuk yang sudah digoreng dikemas dalam kantong plastik, siap dipasarkan.",
    foto: "/img/product/dibungkus.JPG",
    alt: "Kerupuk kipas yang sudah digoreng dikemas dalam kantong plastik",
  },
];

const CUACA = [
  {
    label: "Cuaca Cerah",
    nilai: "1–2 Hari",
    keterangan: "waktu pengeringan biasanya selesai",
  },
  {
    label: "Musim Hujan",
    nilai: "Hingga 1 Minggu",
    keterangan: "karena pengeringan masih mengandalkan sinar matahari",
  },
];

/**
 * Empat tahap pembuatan kerupuk kipas, dipindah dari halaman Tentang ke sini
 * karena secara topik lebih tepat berada di halaman Proses Produksi.
 *
 * Setiap tahap dipasangkan dengan foto dokumentasi asli, bukan foto acak:
 * cuma empat foto proses yang tersedia (public/img/product), jadi tahapan di
 * halaman ini sengaja dibatasi empat agar setiap kartu punya foto yang benar
 *-benar cocok, bukan kartu tanpa gambar.
 */
export function ProsesSingkat() {
  return (
    <section className="wrap py-14 md:py-20 lg:py-28">
      <div data-reveal>
        <p className="text-xs font-semibold tracking-[0.16em] text-bata uppercase">
          Cara Pembuatan
        </p>
        <h2 className="display mt-4 max-w-[16ch] text-[2rem] text-tinta sm:text-[2.5rem]">
          Empat Tahap, Cara Rumahan
        </h2>
      </div>

      <div className="mt-12 flex flex-col gap-12 md:gap-16">
        {TAHAPAN.map((tahap, i) => (
          <div
            key={tahap.nomor}
            className="grid items-center gap-6 border-t border-garis pt-10 sm:grid-cols-2 sm:gap-10 lg:gap-14"
          >
            <div
              data-reveal
              className={`relative mx-auto aspect-4/3 w-full max-w-xs overflow-hidden rounded-kartu bg-kertas-tenggelam sm:mx-0 ${
                i % 2 === 1 ? "sm:order-2" : ""
              }`}
            >
              <Image
                src={tahap.foto}
                alt={tahap.alt}
                fill
                sizes="(min-width: 640px) 20rem, 20rem"
                className="object-cover"
              />
            </div>

            <div data-reveal className={i % 2 === 1 ? "sm:order-1" : ""}>
              <span className="font-mono text-sm text-teks-samar tabular-nums">
                {tahap.nomor}
              </span>
              <h3 className="display mt-2 text-[1.5rem] text-tinta">
                {tahap.judul}
              </h3>
              <p className="mt-2 max-w-[36ch] text-[0.9375rem] text-teks-samar">
                {tahap.teks}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-8 border-t border-garis pt-10 sm:grid-cols-2 sm:gap-0">
        {CUACA.map((item, i) => (
          <div
            key={item.label}
            data-reveal
            className={i === 0 ? "sm:pr-8" : "sm:border-l sm:border-garis sm:pl-8"}
          >
            <p className="text-xs font-semibold tracking-[0.12em] text-teks-samar uppercase">
              {item.label}
            </p>
            <p className="display mt-3 text-[2.25rem] text-tinta lg:text-[2.5rem]">
              {item.nilai}
            </p>
            <p className="mt-1.5 text-sm text-teks-samar">
              {item.keterangan}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
