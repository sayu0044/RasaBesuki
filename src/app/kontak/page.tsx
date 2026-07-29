import type { Metadata } from "next";
import { PageStub } from "@/components/layout/PageStub";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Hubungi pengelola Sentra Kerupuk Ikan Besuki untuk informasi sentra, kerja sama, dan dokumentasi.",
};

export default function KontakPage() {
  return (
    <PageStub
      judul="Hubungi Sentra Kerupuk Ikan Besuki"
      keterangan="Untuk informasi sentra, kerja sama, dan dokumentasi. Bila Anda ingin membeli produk, hubungi langsung rumah produksinya lewat halaman produsen."
    />
  );
}
