import Image from "next/image";
// Entry ssr, bukan entry utama: komponen ini dirender di server, dan entry
// utama @phosphor-icons/react ditandai "use client".
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { TombolTautan } from "@/components/ui/Button";
import { waAdminSentra } from "@/lib/wa";

/**
 * Penutup halaman sengaja tidak mengulang ajakan ke direktori produsen.
 * Ajakan itu sudah muncul di hero dan di section sorotan; mengulangnya untuk
 * ketiga kali hanya membuat halaman terasa memaksa. Penutup ini memegang jalur
 * satunya lagi, yaitu menghubungi pengelola sentra.
 */

/**
 * Pesan pembuka yang berbeda dari pesan bawaan.
 *
 * Yang menekan tombol di sini bukan calon pembeli, melainkan pemilik usaha
 * yang ingin mendaftar atau orang yang menanyakan kerja sama.
 */
const PESAN =
  "Halo, saya ingin bertanya mengenai Sentra Kerupuk Kipas Besuki.";

export function Closer() {
  const wa = waAdminSentra(PESAN);

  return (
    <section className="relative overflow-hidden bg-laut-950">
      <div className="absolute inset-0">
        <Image
          src="/img/hero/krupuk9.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
      </div>

      <div className="wrap relative z-10 py-20 text-center md:py-28">
        <h2
          data-reveal
          suppressHydrationWarning
          className="display mx-auto max-w-[20ch] text-[2rem] text-white sm:text-[2.75rem]"
        >
          Punya usaha kerupuk di Besuki?
        </h2>
        <p
          data-reveal
          suppressHydrationWarning
          className="mx-auto mt-5 max-w-[48ch] text-white/75"
        >
          Rumah produksi yang belum terdaftar masih bisa bergabung. Begitu juga
          pertanyaan seputar kerja sama dan dokumentasi sentra.
        </p>
        {/*
          Tombol hanya dirender bila nomornya benar-benar ada. Sebelumnya
          nomor mentah "081358287685" ditulis langsung sebagai href, dan
          TombolTautan memperlakukan apa pun yang tidak diawali http sebagai
          rute internal. Akibatnya tombol ini menunjuk ke /081358287685,
          sebuah halaman yang tidak pernah ada, dan tidak ada yang berbunyi
          karena secara teknis tautannya sah.
        */}
        {wa && (
          <div
            data-reveal
            suppressHydrationWarning
            className="mt-8 flex justify-center"
          >
            <TombolTautan href={wa} ragam="kertas">
              <WhatsappLogo size={20} weight="fill" aria-hidden />
              Hubungi Kami
            </TombolTautan>
          </div>
        )}
      </div>
    </section>
  );
}
