import Image from "next/image";
import { TombolTautan } from "@/components/ui/Button";
import { sentra } from "@/lib/produsen";

/**
 * Hero memakai foto dokumentasi sebagai visual utama, sesuai PLAN.md butir 23
 * yang meminta fotografi, tipografi, dan ruang kosong sebagai kekuatan visual,
 * bukan ilustrasi ikan atau kerupuk di setiap section.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-end overflow-hidden bg-laut-950 pt-24 pb-14 lg:pb-20">
      <div className="absolute inset-0">
        <Image
          src="/img/carousel-1.jpg"
          alt="Suasana rumah produksi kerupuk ikan di Kecamatan Besuki"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradien gelap dari bawah supaya teks putih tetap lolos kontras AA */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(7,26,33,0.94) 10%, rgba(7,26,33,0.72) 45%, rgba(7,26,33,0.45) 100%)",
          }}
        />
      </div>

      <div className="wrap relative z-10">
        <p className="text-xs font-semibold tracking-[0.16em] text-white/70 uppercase">
          {sentra.nama}
        </p>

        {/*
          Ukuran teks dan lebar baris diatur bersamaan supaya judul berhenti
          di dua baris pada layar besar. Membiarkannya jatuh ke tiga baris
          membuat hero terasa penuh dan mendorong tombol ke bawah.
        */}
        <h1 className="display mt-4 max-w-[15ch] text-[2.75rem] text-white sm:text-6xl lg:max-w-[24ch] lg:text-[4.25rem]">
          {sentra.tagline}
        </h1>

        <p className="mt-5 max-w-[44ch] text-white/85">
          Kenali lebih dekat para pelaku UMKM kerupuk ikan rumahan di Kecamatan
          Besuki, Situbondo.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <TombolTautan href="/produsen" ragam="kertas">
            Jelajahi Produsen
          </TombolTautan>
          <TombolTautan href="/tentang" ragam="terang">
            Tentang Sentra
          </TombolTautan>
        </div>
      </div>
    </section>
  );
}
