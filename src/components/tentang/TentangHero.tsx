import Image from "next/image";
import { sentra } from "@/lib/produsen";

/**
 * Banner halaman Tentang. Berbeda dari Hero beranda: satu foto statis, bukan
 * slideshow, karena halaman ini bukan pintu masuk utama situs.
 *
 * Masthead dan penanda IntersectionObserver-nya dipasang di page.tsx, bukan
 * di sini, mengikuti pola yang sama dengan Hero beranda.
 */
export function TentangHero() {
  return (
    <section className="relative flex min-h-[56vh] items-end overflow-hidden bg-laut-950 pt-32 pb-14 lg:min-h-[62vh] lg:pt-40 lg:pb-20">
      <div className="absolute inset-0">
        <Image
          src="/img/hero/krupuk7.jpg"
          alt="Kerupuk kipas khas Besuki yang dijemur di bawah sinar matahari"
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
        {/* <h1 className="display mt-4 max-w-[16ch] text-[2.5rem] text-white sm:text-6xl lg:text-[3.75rem]">
          Tentang Sentra
        </h1> */}
        <p className="mt-5 max-w-[52ch] text-white/85">
          Ada cerita yang tak pernah benar-benar usang, diwariskan dari satu
          generasi ke generasi berikutnya. Di Besuki, cerita itu hadir lewat
          kerupuk kipas yang telah dibuat secara rumahan sejak tahun 1970-an.
        </p>
      </div>
    </section>
  );
}
