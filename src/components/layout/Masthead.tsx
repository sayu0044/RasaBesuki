"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";

export const NAVIGASI = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/proses", label: "Produksi" },
  { href: "/produsen", label: "UMKM" },
  // Halaman kontak dinonaktifkan. Kodenya masih ada di src/app/_kontak,
  // dikeluarkan dari routing lewat awalan garis bawah. Entri ini dibiarkan
  // sebagai komentar supaya urutan tautan tidak perlu disusun ulang saat
  // halamannya dihidupkan lagi.
  // { href: "/kontak", label: "Kontak" },
] as const;

/**
 * Masthead menempel di atas dan berubah menjadi solid setelah pengguna
 * melewati hero. Di atas hero yang gelap, teksnya putih; setelah itu ia
 * kembali ke tinta gelap di atas kertas.
 */
export function Masthead({ diAtasHero = false }: { diAtasHero?: boolean }) {
  const [menempel, setMenempel] = useState(false);
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const pathname = usePathname();

  // IntersectionObserver, bukan listener scroll: tidak ada pekerjaan
  // per-frame di thread utama. Pengamatan hanya perlu dilakukan di halaman
  // yang punya hero; di halaman lain masthead memang selalu solid.
  useEffect(() => {
    if (!diAtasHero) return;
    const sentinel = document.getElementById("sentinel-masthead");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setMenempel(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [diAtasHero]);

  // Kunci scroll dan sediakan jalan keluar lewat Escape selama menu terbuka.
  useEffect(() => {
    if (!menuTerbuka) return;
    const sebelumnya = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuTerbuka(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = sebelumnya;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuTerbuka]);

  // Di halaman tanpa hero, masthead solid sejak awal. Nilainya diturunkan di
  // sini, bukan dikoreksi lewat effect, supaya tidak ada render berantai.
  const solid = !diAtasHero || menempel;
  const terang = diAtasHero && !menempel;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          solid
            ? "border-garis bg-kertas/90 backdrop-blur-md"
            : "border-transparent"
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-4 lg:h-[5.0rem]">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <Image
              src="/img/logo-mark.png"
              alt=""
              aria-hidden
              width={670}
              height={528}
              priority
              className="h-8 w-auto shrink-0 object-contain lg:h-10"
            />
            <span className="min-w-0">
              <span
                className={`display block text-[1.1875rem] leading-tight transition-colors ${
                  terang ? "text-white" : "text-tinta"
                }`}
              >
                Sentra Kerupuk Kipas Besuki
              </span>
              {/* <span
                className={`block text-xs transition-colors ${
                  terang ? "text-white/70" : "text-teks-samar"
                }`}
              >
                Kecamatan Besuki, Situbondo
              </span> */}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAVIGASI.map((item) => {
              const aktif =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={aktif ? "page" : undefined}
                  className={`relative text-[0.9375rem] transition-colors ${
                    terang
                      ? "text-white/60 hover:text-white/90 aria-[current=page]:text-white"
                      : "text-teks hover:text-tinta aria-[current=page]:text-bata"
                  }`}
                >
                  {item.label}
                  {/*
                    Penanda halaman aktif dibuat dari garis, bukan dari warna
                    saja. Di atas hero, satu-satunya warna yang tersedia adalah
                    putih di atas foto gelap, dan beda antara putih 80% dan
                    putih penuh tidak terbaca sebagai "yang ini sedang dibuka".
                    Garis punya keberadaan yang tidak bergantung pada seberapa
                    terang latar fotonya.

                    Garisnya diposisikan absolut supaya tidak ikut menambah
                    tinggi tautan. Kalau ia ikut mengalir, item yang aktif akan
                    lebih tinggi dari tetangganya dan seluruh baris navigasi
                    bergeser setiap kali halaman berganti.
                  */}
                  {aktif && (
                    <span
                      aria-hidden
                      className={`absolute -bottom-1.5 left-0 right-0 h-px ${
                        terang ? "bg-white" : "bg-bata"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setMenuTerbuka(true)}
            aria-label="Buka menu navigasi"
            aria-expanded={menuTerbuka}
            className={`-mr-2 grid h-12 w-12 place-items-center rounded-tombol transition-colors lg:hidden ${
              terang ? "text-white" : "text-tinta"
            }`}
          >
            <List size={26} weight="regular" />
          </button>
        </div>
      </header>

      {menuTerbuka && (
        <div className="fixed inset-0 z-60 flex flex-col bg-kertas lg:hidden">
          <div className="wrap flex h-16 items-center justify-between">
            <span className="flex items-center gap-2.5">
              <Image
                src="/img/logo-mark.png"
                alt=""
                aria-hidden
                width={670}
                height={528}
                className="h-8 w-auto shrink-0 object-contain"
              />
              <span className="display text-[1.1875rem] text-tinta">
                Sentra Kerupuk Kipas Besuki
              </span>
            </span>
            <button
              type="button"
              onClick={() => setMenuTerbuka(false)}
              aria-label="Tutup menu navigasi"
              className="-mr-2 grid h-12 w-12 place-items-center rounded-tombol text-tinta"
            >
              <X size={24} weight="regular" />
            </button>
          </div>
          <nav className="wrap flex flex-1 flex-col justify-center gap-1 pb-16">
            {NAVIGASI.map((item) => {
              const aktif =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={aktif ? "page" : undefined}
                  // Ditutup di sini, pada klik yang memicu navigasi, bukan
                  // lewat effect yang mengintip perubahan pathname.
                  onClick={() => setMenuTerbuka(false)}
                  className={`display border-b border-garis py-4 text-[1.75rem] ${
                    aktif ? "text-bata" : "text-tinta"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
