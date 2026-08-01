import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { InitialLoader } from "@/components/motion/InitialLoader";
import { PageTransition } from "@/components/motion/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { sentra } from "@/lib/produsen";
import { ALAMAT_SITUS } from "@/lib/situs";
import "./globals.css";

/*
  Instrument Serif hanya untuk judul, Inter untuk seluruh teks yang dibaca.
  Keduanya di-host sendiri lewat next/font sehingga tidak ada permintaan ke
  Google saat halaman dibuka, dan tidak ada pergeseran layout saat font dimuat.
*/
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  /*
    metadataBase mengubah setiap path relatif di metadata menjadi alamat
    lengkap. Tanpa ini, og:image dan canonical ditulis sebagai path relatif,
    dan keduanya diabaikan diam-diam: WhatsApp maupun Facebook tidak
    menampilkan gambar apa-apa saat tautan situs ini dibagikan, dan itu persis
    jalur yang paling sering dipakai orang untuk menyebarkan alamat situs ini.
  */
  metadataBase: new URL(ALAMAT_SITUS),
  title: {
    default: `${sentra.nama} | Direktori UMKM Kerupuk Ikan`,
    template: `%s | ${sentra.nama}`,
  },
  description:
    "Kenali rumah produksi kerupuk ikan rumahan di Kecamatan Besuki, Situbondo. Temukan produsen, lihat produk, lalu hubungi langsung lewat WhatsApp.",
  /*
    Canonical menyatakan alamat resmi sebuah halaman. Situs ini bisa dicapai
    lewat beberapa alamat sekaligus, misalnya alamat produksi dan alamat
    preview tiap deployment Vercel. Tanpa canonical, mesin pencari melihat
    beberapa salinan halaman yang sama dan memilih sendiri mana yang
    ditampilkan, dan pilihannya belum tentu alamat yang Anda sebarkan.
  */
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: sentra.nama,
    description: sentra.tagline,
    url: "/",
    siteName: sentra.nama,
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${instrumentSerif.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <MotionProvider />
        <InitialLoader />
        <PageTransition />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
