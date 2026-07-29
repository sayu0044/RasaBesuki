import type { Metadata } from "next";
import { PageStub } from "@/components/layout/PageStub";

export const metadata: Metadata = {
  title: "Proses Produksi",
  description:
    "Gambaran umum proses pembuatan kerupuk ikan rumahan di Kecamatan Besuki berdasarkan hasil observasi.",
};

export default function ProsesPage() {
  return (
    <PageStub
      judul="Proses Produksi"
      keterangan="Gambaran umum tahapan pembuatan kerupuk ikan berdasarkan hasil observasi. Setiap rumah produksi bisa memiliki cara yang berbeda."
    />
  );
}
