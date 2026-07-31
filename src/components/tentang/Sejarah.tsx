import Image from "next/image";

/**
 * Latar belakang kerupuk kipas, diringkas dari naskah sentra. Angka dan
 * detail bahan mengikuti naskah apa adanya, tidak ditambah-tambahi.
 */
export function Sejarah() {
  return (
    <section className="wrap py-14 md:py-20 lg:py-28">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <div
          data-reveal
          suppressHydrationWarning
          className="relative mx-auto aspect-4/5 w-full max-w-[14rem] overflow-hidden rounded-kartu bg-kertas-tenggelam lg:order-2 lg:max-w-[25rem]"
        >
          <Image
            src="/img/hero/krupuk2.jpg"
            alt="Kerupuk kipas mentah yang sudah dibentuk dan siap dikukus"
            fill
            sizes="(min-width: 1024px) 500rem, 500rem"
            className="object-cover"
          />
        </div>

        <div data-reveal suppressHydrationWarning className="lg:order-1 lg:pt-10">
          <p className="text-xs font-semibold tracking-[0.16em] text-bata uppercase">
            Sejarah
          </p>
          <h2 className="display mt-4 max-w-[18ch] text-[2rem] text-tinta sm:text-[2.5rem] lg:text-[3rem]">
            Diwariskan Sejak Tahun 1970-an
          </h2>

          <div className="mt-6 flex max-w-[54ch] flex-col gap-4">
            <p>
              Kerupuk kipas telah dibuat di Besuki sejak tahun 1970-an, dan
              hingga sekarang prosesnya masih dikerjakan secara rumahan, sama
              seperti generasi yang menurunkannya.
            </p>
            <p>
              Bahan utamanya ikan tenggiri, diolah menjadi adonan bersama
              tepung dan bumbu-bumbu sederhana. Adonan itu dibentuk memanjang,
              lalu dikukus di atas tungku kayu sebelum dipotong satu per satu
              dan dijemur hingga benar-benar kering.
            </p>
            {/* <p>
              Karena masih mengandalkan sinar matahari, lama pengeringannya
              menyesuaikan cuaca: bisa selesai dalam satu hingga dua hari saat
              cerah, atau memakan waktu hampir satu minggu ketika musim hujan
              tiba.
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
