import Image from "next/image";
import { sentra } from "@/lib/produsen";

/**
 * Banner halaman Proses Produksi. Strukturnya sengaja disamakan persis
 * dengan TentangHero (tinggi section, overlay, tipografi label) supaya
 * kedua halaman terasa satu desain yang sama. Yang berbeda hanya foto dan
 * naskahnya, disesuaikan untuk konteks proses produksi.
 */
export function ProduksiHero() {
  return (
    <section className="relative flex min-h-[56vh] items-end overflow-hidden bg-laut-950 pt-32 pb-14 lg:min-h-[62vh] lg:pt-40 lg:pb-20">
      <div className="absolute inset-0">
        <Image
          src="/img/product/dijemur.PNG"
          alt="Kerupuk kipas dijemur di atas para-para di bawah sinar matahari"
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
        <p className="mt-5 max-w-[52ch] text-white/85">
          Dari adonan ikan tenggiri hingga kerupuk kipas yang renyah, setiap
          tahap masih dikerjakan dengan tangan di rumah-rumah produksi Besuki.
        </p>
      </div>
    </section>
  );
}
