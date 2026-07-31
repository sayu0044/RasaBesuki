import Image from "next/image";
import { TombolTautan } from "@/components/ui/Button";

/**
 * Penutup halaman sengaja tidak mengulang ajakan ke direktori produsen.
 * Ajakan itu sudah muncul di hero dan di section sorotan; mengulangnya untuk
 * ketiga kali hanya membuat halaman terasa memaksa. Penutup ini memegang jalur
 * satunya lagi, yaitu menghubungi pengelola sentra.
 */
export function Closer() {
  return (
    <section className="relative overflow-hidden bg-laut-950">
      <div className="absolute inset-0">
        <Image
          src="/img/hero/krupuk9.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
      </div>

      <div className="wrap relative z-10 py-20 text-center md:py-28">
        <h2
          data-reveal
          className="display mx-auto max-w-[20ch] text-[2rem] text-white sm:text-[2.75rem]"
        >
          Punya usaha kerupuk di Besuki?
        </h2>
        <p data-reveal className="mx-auto mt-5 max-w-[48ch] text-white/75">
          Rumah produksi yang belum terdaftar masih bisa bergabung. Begitu juga
          pertanyaan seputar kerja sama dan dokumentasi sentra.
        </p>
        <div data-reveal className="mt-8 flex justify-center">
          <TombolTautan href="081358287685" ragam="kertas">
            Hubungi Kami
          </TombolTautan>
        </div>
      </div>
    </section>
  );
}
