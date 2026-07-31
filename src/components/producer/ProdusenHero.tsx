import Image from "next/image";
import { sentra } from "@/lib/produsen";

/**
 * Banner halaman Temukan Produsen. Strukturnya disamakan dengan TentangHero
 * dan ProduksiHero (tinggi section, overlay, tipografi label) supaya
 * direktori UMKM terasa satu desain yang sama dengan halaman lain, alih-alih
 * judul polos di atas kertas putih seperti sebelumnya.
 *
 * Halaman ini masih membutuhkan h1 yang terlihat (SEO direktori), jadi judul
 * tetap tampil di sini, tidak dikomentari seperti pada TentangHero.
 */
export function ProdusenHero() {
  return (
    <section className="relative flex min-h-[56vh] items-end overflow-hidden bg-laut-950 pt-32 pb-14 lg:min-h-[62vh] lg:pt-40 lg:pb-20">
      <div className="absolute inset-0">
        <Image
          src="/img/hero/krupuk11.JPG"
          alt="Rumah produksi kerupuk kipas di Kecamatan Besuki"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(7,26,33,0.94) 15%, rgba(7,26,33,0.72) 50%, rgba(7,26,33,0.4) 100%)",
          }}
        />
      </div>

      <div className="wrap relative z-10">
        <p className="text-base font-bold tracking-[0.16em] text-white/90 uppercase sm:text-lg">
          {sentra.nama}
        </p>
        <h1 className="display mt-4 max-w-[16ch] text-[2.25rem] text-white sm:text-[3rem]">
          Temukan Produsen
        </h1>
        <p className="mt-5 max-w-[52ch] text-white/85">
          Kenali rumah produksi kerupuk kipas di Kecamatan Besuki.
        </p>
      </div>
    </section>
  );
}
