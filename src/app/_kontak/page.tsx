/*
  HALAMAN KONTAK DINONAKTIFKAN, KODENYA SENGAJA DISIMPAN UTUH.

  Folder ini diberi awalan garis bawah, dan App Router memperlakukan folder
  berawalan garis bawah sebagai detail internal: folder itu beserta seluruh
  isinya dikeluarkan dari routing. Jadi /kontak tidak lagi ada, tanpa satu
  baris pun dihapus.

  Cara ini dipilih karena permintaannya adalah mengomentari, bukan menghapus.
  Mengomentari isi berkas ini secara harfiah tidak bisa dilakukan: App Router
  mewajibkan setiap page.tsx punya default export, dan berkas yang seluruh
  isinya menjadi komentar akan menggagalkan build.

  Untuk menghidupkannya kembali: kembalikan nama folder menjadi "kontak", lalu
  buka kembali dua entri navigasi yang dikomentari di Masthead.tsx dan
  Footer.tsx.
*/

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
