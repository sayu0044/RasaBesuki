"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Transisi antar halaman.
 *
 * Kunci pada pathname membuat React memasang ulang pembungkus setiap kali rute
 * berganti, sehingga animasi masuknya terputar lagi. Animasinya sendiri murni
 * CSS: yang menyembunyikan dan yang memunculkan berada di sistem yang sama,
 * jadi tidak bisa terjadi keadaan setengah jalan yang meninggalkan halaman
 * dalam keadaan transparan.
 *
 * Yang dianimasikan hanya opacity, tidak pernah transform. Elemen dengan
 * transform menjadi containing block bagi anak yang position: fixed, dan itu
 * akan membuat masthead melompat selama transisi berjalan.
 *
 * Contoh yang dirujuk memakai tirai dua panel yang menyadap klik tautan.
 * Cara itu perlu penjagaan tambahan agar pengunjung tidak terkurung bila rute
 * gagal dimuat. Di sini navigasinya dibiarkan apa adanya dan hanya hasil
 * akhirnya yang dianimasikan, sehingga tidak ada yang perlu dijaga.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-page-in">
      {children}
    </div>
  );
}
