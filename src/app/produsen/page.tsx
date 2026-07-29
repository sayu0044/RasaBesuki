import type { Metadata } from "next";
import { Masthead } from "@/components/layout/Masthead";
import { ProducerCard } from "@/components/producer/ProducerCard";
import { getAllProdusen } from "@/lib/produsen";

export const metadata: Metadata = {
  title: "Temukan Produsen",
  description:
    "Daftar rumah produksi kerupuk ikan rumahan di Kecamatan Besuki, Situbondo.",
};

/**
 * Direktori produsen.
 *
 * Pencarian dan filter belum dipasang di tahap ini. PLAN.md butir 10 menyebut
 * fitur itu tidak wajib untuk versi pertama selama datanya baru sepuluh, dan
 * memfilter data yang seluruhnya masih placeholder tidak akan menyaring apa pun.
 * Datanya sudah dipisah di src/lib/produsen.ts sehingga filter bisa ditambahkan
 * tanpa membongkar halaman ini.
 */
export default function ProdusenPage() {
  const produsen = getAllProdusen();

  return (
    <>
      <Masthead />

      <div className="wrap border-b border-garis pt-32 pb-14 lg:pt-40 lg:pb-20">
        <h1 className="display max-w-[16ch] text-[2.25rem] text-tinta sm:text-[3rem]">
          Temukan Produsen
        </h1>
        <p className="mt-5 max-w-[50ch]">
          Kenali rumah produksi kerupuk ikan di Kecamatan Besuki.
        </p>
      </div>

      <div className="wrap py-14 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {produsen.map((item) => (
            <div key={item.id} data-reveal>
              <ProducerCard produsen={item} />
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-[58ch] border-l-2 border-bata bg-permukaan py-4 pr-5 pl-5 text-sm">
          Ketersediaan produk menyesuaikan proses produksi dan bahan baku.
          Silakan hubungi produsen melalui WhatsApp untuk informasi terbaru.
        </p>
      </div>
    </>
  );
}
