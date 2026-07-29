"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";

export const NAVIGASI = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang Sentra" },
  { href: "/proses", label: "Proses Produksi" },
  { href: "/produsen", label: "Produsen" },
  { href: "/kontak", label: "Hubungi Kami" },
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
        <div className="wrap flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link href="/" className="min-w-0">
            <span
              className={`display block text-[1.0625rem] leading-tight transition-colors ${
                terang ? "text-white" : "text-tinta"
              }`}
            >
              Sentra Kerupuk Ikan Besuki
            </span>
            <span
              className={`block text-xs transition-colors ${
                terang ? "text-white/70" : "text-teks-samar"
              }`}
            >
              Kecamatan Besuki, Situbondo
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
                  className={`text-[0.9375rem] transition-colors ${
                    terang
                      ? "text-white/80 hover:text-white aria-[current=page]:text-white"
                      : "text-teks hover:text-tinta aria-[current=page]:text-bata"
                  }`}
                >
                  {item.label}
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
            <span className="display text-[1.0625rem] text-tinta">
              Sentra Kerupuk Ikan Besuki
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
