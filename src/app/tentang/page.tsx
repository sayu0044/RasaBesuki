import type { Metadata } from "next";
import { Masthead } from "@/components/layout/Masthead";
import { TentangHero } from "@/components/tentang/TentangHero";
import { Sejarah } from "@/components/tentang/Sejarah";
import { ProdukVarian } from "@/components/tentang/ProdukVarian";
import { Komunitas } from "@/components/tentang/Komunitas";
import { TentangCloser } from "@/components/tentang/TentangCloser";

export const metadata: Metadata = {
  title: "Tentang Sentra",
  description:
    "Mengenal sentra kerupuk ikan rumahan di Kecamatan Besuki, Situbondo.",
};

export default function TentangPage() {
  return (
    <>
      <Masthead diAtasHero />
      {/*
        Penanda tak terlihat setinggi banner. Masthead mengamatinya lewat
        IntersectionObserver untuk tahu kapan harus berubah menjadi solid,
        mengikuti pola yang sama dengan Hero beranda.
      */}
      <div
        id="sentinel-masthead"
        aria-hidden
        className="pointer-events-none absolute top-0 h-[62vh] w-px"
      />
      <TentangHero />
      <Sejarah />
      <ProdukVarian />
      <TentangCloser />
      <Komunitas />
    </>
  );
}
