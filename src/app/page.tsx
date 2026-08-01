import { Masthead } from "@/components/layout/Masthead";
import { Hero } from "@/components/home/Hero";
import { Figures } from "@/components/home/Figures";
import { Editorial } from "@/components/home/Editorial";
import { FeaturedProducers } from "@/components/home/FeaturedProducers";
import { HowToBuy } from "@/components/home/HowToBuy";
import { Closer } from "@/components/home/Closer";
import { JsonLd } from "@/components/seo/JsonLd";
import { jsonLdSentra } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      {/*
        Identitas sentra dan situs, dinyatakan sekali di beranda. Tiap halaman
        produsen merujuk balik ke @id sentra lewat memberOf, jadi bagian ini
        yang membuat rujukan itu punya sasaran yang benar-benar ada.
      */}
      <JsonLd data={jsonLdSentra()} />

      <Masthead diAtasHero />
      {/*
        Penanda tak terlihat setinggi hero. Masthead mengamatinya lewat
        IntersectionObserver untuk tahu kapan harus berubah menjadi solid,
        sehingga tidak ada perhitungan scroll per-frame.
      */}
      <div
        id="sentinel-masthead"
        aria-hidden
        className="pointer-events-none absolute top-0 h-[90svh] w-px"
      />
      <Hero />
      <Figures />
      <Editorial />
      <FeaturedProducers />
      <HowToBuy />
      <Closer />
    </>
  );
}
