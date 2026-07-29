import { ProducerCard } from "@/components/producer/ProducerCard";
import { TombolTautan } from "@/components/ui/Button";
import { countSisaProdusen, getFeaturedProdusen } from "@/lib/produsen";

const JUMLAH_SOROTAN = 4;

export function FeaturedProducers() {
  const sorotan = getFeaturedProdusen(JUMLAH_SOROTAN);
  const sisa = countSisaProdusen(sorotan.length);

  return (
    <section className="bg-permukaan py-14 md:py-20 lg:py-28">
      <div className="wrap">
        <h2
          data-reveal
          className="display max-w-[18ch] text-[2rem] text-tinta sm:text-[2.5rem]"
        >
          Rumah produksi yang bisa Anda kenali
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sorotan.map((produsen) => (
            <div key={produsen.id} data-reveal>
              <ProducerCard produsen={produsen} />
            </div>
          ))}
        </div>

        <div
          data-reveal
          className="mt-10 flex flex-col items-start gap-4 border-t border-garis pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          {sisa > 0 && (
            <p className="text-teks-samar">
              Masih ada {sisa} rumah produksi lainnya di direktori.
            </p>
          )}
          <TombolTautan href="/produsen" ragam="utama">
            Lihat Semua Produsen
          </TombolTautan>
        </div>
      </div>
    </section>
  );
}
