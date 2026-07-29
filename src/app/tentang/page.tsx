import type { Metadata } from "next";
import { PageStub } from "@/components/layout/PageStub";

export const metadata: Metadata = {
  title: "Tentang Sentra",
  description:
    "Mengenal sentra kerupuk ikan rumahan di Kecamatan Besuki, Situbondo.",
};

export default function TentangPage() {
  return (
    <PageStub
      judul="Tentang Sentra"
      keterangan="Cerita tentang rumah-rumah produksi kerupuk ikan di Kecamatan Besuki dan orang-orang yang menjalankannya."
    />
  );
}
