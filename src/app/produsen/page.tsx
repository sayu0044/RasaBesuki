import type { Metadata } from "next";
import { MapPin, Storefront } from "@phosphor-icons/react/dist/ssr";
import { Masthead } from "@/components/layout/Masthead";
import { ProducerCard } from "@/components/producer/ProducerCard";
import { ProdusenHero } from "@/components/producer/ProdusenHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { jsonLdDirektori } from "@/lib/jsonld";
import { embedMapsSrc } from "@/lib/maps";
import { getAllProdusen, sentra } from "@/lib/produsen";

export const metadata: Metadata = {
  title: "Temukan Produsen",
  description:
    "Daftar rumah produksi kerupuk kipas rumahan di Kecamatan Besuki, Situbondo.",
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
      {/*
        Menyatakan halaman ini sebagai daftar usaha, bukan artikel yang
        kebetulan menyebut banyak nama. Tiap butir hanya menunjuk ke halaman
        detailnya; datanya sendiri tetap tinggal di sana.
      */}
      <JsonLd data={jsonLdDirektori(produsen)} />

      <Masthead diAtasHero />
      {/*
        Penanda tak terlihat setinggi banner. Masthead mengamatinya lewat
        IntersectionObserver untuk tahu kapan harus berubah menjadi solid,
        mengikuti pola yang sama dengan Hero di halaman Tentang dan Proses.
      */}
      <div
        id="sentinel-masthead"
        aria-hidden
        className="pointer-events-none absolute top-0 h-[62vh] w-px"
      />
      <ProdusenHero />

      <div className="wrap py-14 md:py-20">
        <h2 className="display flex items-center gap-2.5 text-[1.75rem] text-tinta">
          <Storefront size={28} weight="fill" className="shrink-0 text-bata" />
          Daftar UMKM Kerupuk
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {produsen.map((item) => (
            <div key={item.id} data-reveal suppressHydrationWarning>
              <ProducerCard produsen={item} />
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-[58ch] border-l-2 border-bata bg-permukaan py-4 pr-5 pl-5 text-sm">
          Ketersediaan produk menyesuaikan proses produksi dan bahan baku.
          Silakan hubungi produsen melalui WhatsApp untuk informasi terbaru.
        </p>

        <div className="mt-14 flex items-center gap-2 text-teks-samar">
          <MapPin size={18} weight="fill" className="shrink-0 text-bata" />
          <span className="text-sm">Lokasi kawasan produksi</span>
        </div>
        <p className="mt-3 max-w-[58ch] text-teks-samar">
          Seluruh rumah produksi di direktori ini berada dalam satu kawasan
          yang sama, di Kecamatan {sentra.kecamatan}, Kabupaten{" "}
          {sentra.kabupaten}, {sentra.provinsi}.
        </p>
        <div className="mt-5 h-70 w-full overflow-hidden rounded-kartu border border-garis bg-kertas-tenggelam sm:h-90 lg:h-105">
          <iframe
            src={embedMapsSrc()}
            title={`Peta kawasan produksi ${sentra.nama}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </>
  );
}
