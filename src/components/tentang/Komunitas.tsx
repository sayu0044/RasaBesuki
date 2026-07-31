import Image from "next/image";
import { TombolTautan } from "@/components/ui/Button";
import { getAllProdusen } from "@/lib/produsen";

/**
 * Komunitas + penutup lama digabung jadi satu section bergaya foto penuh,
 * senada dengan Hero beranda: foto latar gelap, label kecil, judul besar,
 * lalu ajakan bertindak. Paguyuban pengrajin jadi teks pendukung, bukan
 * section terpisah, supaya alur halaman tidak terasa berulang.
 *
 * Jumlah rumah produksi dihitung dari data, bukan ditulis tangan, supaya
 * tidak pernah berbeda dengan isi direktori.
 */
export function Komunitas() {
  const jumlah = getAllProdusen().length;

  return (
    <section className="relative overflow-hidden bg-laut-950">
      <div className="absolute inset-0">
        <Image
          src="/img/hero/krupuk6.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
      </div>

      <div className="wrap relative z-10 py-20 text-center md:py-28">
        <p
          data-reveal
          suppressHydrationWarning
          className="text-xs font-semibold tracking-[0.16em] text-white/70 uppercase"
        >
          Kerupuk Kipas Khas Besuki
        </p>
        <h2
          data-reveal
          suppressHydrationWarning
          className="display mx-auto mt-5 max-w-[22ch] text-[2rem] text-white sm:text-[2.75rem]"
        >
          "Bukan Sekadar Cita Rasa, Melainkan Warisan yang Terus Bercerita"
        </h2>
        {/* <p data-reveal className="mx-auto mt-6 max-w-[48ch] text-white/75">
          Warisan itu dijaga bersama oleh para pengrajin yang tergabung dalam
          satu paguyuban, saling mendukung untuk menjaga kualitas dan cita
          rasa yang sudah dikenal puluhan tahun.
        </p> */}
        <p
          data-reveal
          suppressHydrationWarning
          className="mx-auto mt-3 max-w-[48ch] text-white/75"
        >
          {jumlah} rumah produksi bersatu menjaga tradisi dan kualitas kerupuk
          kipas. Temukan kisah mereka di halaman produsen.
        </p>
        <div
          data-reveal
          suppressHydrationWarning
          className="mt-8 flex justify-center"
        >
          <TombolTautan href="/produsen" ragam="kertas">
            Lihat Produsen
          </TombolTautan>
        </div>
      </div>
    </section>
  );
}
