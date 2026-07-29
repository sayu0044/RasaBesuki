"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { loadMotionLibs, prefersReducedMotion } from "@/lib/motion";

/**
 * Gerakan di situs ini dibatasi pada dua hal: smooth scroll dari Lenis, dan
 * reveal ringan saat elemen masuk viewport untuk membangun urutan baca.
 * Tidak ada parallax, pinning, scroll hijack, maupun angka yang menghitung
 * naik, sesuai PLAN.md butir 22.
 *
 * Dua aturan penting yang lahir dari bug sebelumnya:
 *
 * 1. Pendaftaran reveal mengikuti rute, bukan mount komponen.
 *    Provider ini tinggal di root layout, dan root layout tidak pernah
 *    di-mount ulang saat navigasi antar halaman. Versi sebelumnya memakai
 *    daftar dependensi kosong, sehingga hanya elemen yang ada pada muat
 *    pertama yang pernah didaftarkan. Setiap halaman berikutnya tidak pernah
 *    dianimasikan dan tetap tak terlihat sampai halaman dimuat ulang.
 *
 * 2. Yang menyembunyikan dan yang memunculkan harus pihak yang sama.
 *    Versi sebelumnya menyembunyikan lewat aturan CSS global dan memunculkan
 *    lewat GSAP. Begitu sisi JavaScript-nya gagal, konten hilang permanen.
 *    Sekarang GSAP sendiri yang menyembunyikan, jadi bila GSAP gagal dimuat
 *    konten tetap terbaca. Konten yang gagal tampil lebih buruk daripada
 *    konten yang tampil tanpa animasi.
 */
export function MotionProvider() {
  const pathname = usePathname();

  // Lenis dipasang sekali saja. Smooth scroll adalah milik dokumen, bukan
  // milik rute, dan memasangnya ulang tiap navigasi akan mematahkan posisi
  // scroll.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let batal = false;
    let hentikan: (() => void) | null = null;

    loadMotionLibs().then(({ gsap, ScrollTrigger, Lenis }) => {
      if (batal) return;

      const lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      // ScrollTrigger harus membaca posisi scroll milik Lenis, bukan native,
      // kalau tidak trigger akan meleset saat scroll sedang dihaluskan.
      lenis.on("scroll", ScrollTrigger.update);

      const tick = (waktu: number) => lenis.raf(waktu * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      hentikan = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => {
      batal = true;
      hentikan?.();
    };
  }, []);

  // Reveal didaftarkan ulang setiap rute berganti, karena elemen bertanda
  // data-reveal pada halaman baru adalah elemen yang sama sekali berbeda.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let batal = false;
    let bersihkan: (() => void) | null = null;

    loadMotionLibs().then(({ gsap, ScrollTrigger }) => {
      if (batal) return;

      const ctx = gsap.context(() => {
        const target = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        if (target.length === 0) return;

        // GSAP yang menyembunyikan, sesaat sebelum ia juga yang memunculkan.
        gsap.set(target, { opacity: 0, y: 8 });

        target.forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              // 88% membuat elemen selesai muncul saat benar-benar dibaca.
              start: "top 88%",
              once: true,
            },
          });
        });
      });

      // Tinggi halaman baru berbeda dari halaman sebelumnya, jadi posisi
      // trigger yang lama sudah tidak berlaku.
      ScrollTrigger.refresh();

      bersihkan = () => {
        // revert() menghapus gaya inline yang dipasang GSAP, sehingga elemen
        // kembali ke keadaan terlihat, bukan tertinggal transparan.
        ctx.revert();
      };
    });

    return () => {
      batal = true;
      bersihkan?.();
    };
  }, [pathname]);

  return null;
}
