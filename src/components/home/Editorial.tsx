import Image from "next/image";
import { TombolTautan } from "@/components/ui/Button";

/**
 * Pengantar sentra.
 *
 * Naskah di bawah sengaja tidak memuat sejarah, tahun berdiri, jumlah pekerja,
 * maupun angka produksi. Semua itu termasuk data yang belum diberikan, dan
 * PLAN.md butir 24 melarang mengarangnya. Ganti isi paragraf ini setelah data
 * hasil survei tersedia.
 */
export function Editorial() {
  return (
    <section className="wrap py-14 md:py-20 lg:py-28">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-reveal className="lg:pt-10">
          <h2 className="display max-w-[16ch] text-[2rem] text-tinta sm:text-[2.5rem] lg:text-[3rem]">
            Dibuat dari Rumah, Tumbuh dari Besuki
          </h2>

          <div className="mt-6 flex max-w-[54ch] flex-col gap-4">
            <p>
              Bagi sebagian orang, kerupuk mungkin hanya menjadi pelengkap
              makanan. Namun bagi para produsen di Besuki, kerupuk merupakan
              bagian dari aktivitas ekonomi keluarga.
            </p>
            <p>
              Produksinya berjalan dari rumah, bukan dari pabrik. Karena itu
              ketersediaan produk menyesuaikan proses produksi dan bahan baku
              yang ada saat itu.
            </p>
            <p>
              Situs ini tidak menjual apa pun. Ia hanya membuat rumah-rumah
              produksi tersebut lebih mudah ditemukan, lebih mudah dikenali, dan
              lebih mudah dihubungi.
            </p>
          </div>

          <div className="mt-8">
            <TombolTautan href="/tentang" ragam="garis">
              Baca Cerita Sentra
            </TombolTautan>
          </div>
        </div>

        <div
          data-reveal
          className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4"
        >
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-kartu bg-kertas-tenggelam">
              <Image
                src="/img/hero/krupuk8.JPG"
                alt="Dokumentasi rumah produksi kerupuk kipas Besuki"
                fill
                sizes="(min-width: 768px) 22vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="relative ml-0 aspect-[3/4] w-full overflow-hidden rounded-kartu bg-kertas-tenggelam md:ml-auto md:w-3/5">
              <Image
                src="/img/hero/krupuk3.jpg"
                alt="Dokumentasi bahan baku produksi kerupuk kipas Besuki"
                fill
                sizes="(min-width: 768px) 13vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <div className="relative mr-0 aspect-[3/4] w-full overflow-hidden rounded-kartu bg-kertas-tenggelam md:mr-auto md:w-3/5">
              <Image
                src="/img/hero/krupuk7.JPG"
                alt="Dokumentasi proses produksi kerupuk kipas Besuki"
                fill
                sizes="(min-width: 768px) 13vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-kartu bg-kertas-tenggelam">
              <Image
                src="/img/hero/krupuk9.jpg"
                alt="Dokumentasi kerupuk Kipas Besuki"
                fill
                sizes="(min-width: 768px) 22vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
