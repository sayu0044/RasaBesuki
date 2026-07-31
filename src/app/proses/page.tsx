import type { Metadata } from "next";
import { Masthead } from "@/components/layout/Masthead";
import { ProduksiHero } from "@/components/proses/ProduksiHero";
import { ProsesSingkat } from "@/components/proses/ProsesSingkat";

export const metadata: Metadata = {
  title: "Proses Produksi",
  description:
    "Gambaran umum proses pembuatan kerupuk ikan rumahan di Kecamatan Besuki berdasarkan hasil observasi.",
};

export default function ProsesPage() {
  return (
    <>
      <Masthead diAtasHero />
      {/*
        Penanda tak terlihat setinggi banner. Masthead mengamatinya lewat
        IntersectionObserver untuk tahu kapan harus berubah menjadi solid,
        mengikuti pola yang sama dengan Hero di halaman Tentang.
      */}
      <div
        id="sentinel-masthead"
        aria-hidden
        className="pointer-events-none absolute top-0 h-[62vh] w-px"
      />
      <ProduksiHero />
      <ProsesSingkat />
    </>
  );
}
