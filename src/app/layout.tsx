import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { InitialLoader } from "@/components/motion/InitialLoader";
import { PageTransition } from "@/components/motion/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { sentra } from "@/lib/produsen";
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
  title: {
    default: `${sentra.nama} | Direktori UMKM Kerupuk Ikan`,
    template: `%s | ${sentra.nama}`,
  },
  description:
    "Kenali rumah produksi kerupuk ikan rumahan di Kecamatan Besuki, Situbondo. Temukan produsen, lihat produk, lalu hubungi langsung lewat WhatsApp.",
  openGraph: {
    title: sentra.nama,
    description: sentra.tagline,
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
