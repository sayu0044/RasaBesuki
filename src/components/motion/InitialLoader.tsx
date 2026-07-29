"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/Spinner";

/** Batas keras. Lewat dari ini, penutup dibuka apa pun keadaan halamannya. */
const BATAS_MS = 2500;

/**
 * Penutup layar saat halaman pertama kali dibuka.
 *
 * Aturan utamanya: penutup ini tidak boleh mengurung pengunjung. Karena itu
 * ada dua jalan untuk membukanya, yaitu peristiwa load dan batas waktu keras,
 * dan begitu salah satunya berjalan penutup langsung kehilangan pointer-events.
 * Walaupun transisi opacity-nya belum selesai, halaman sudah bisa diklik.
 *
 * Isi halaman tetap dirender di bawahnya, bukan ditahan sampai penutup hilang,
 * sehingga mesin pencari dan pembaca layar tidak pernah melihat halaman kosong.
 */
export function InitialLoader() {
  const [selesai, setSelesai] = useState(false);

  useEffect(() => {
    let sudah = false;
    const tutup = () => {
      if (sudah) return;
      sudah = true;
      setSelesai(true);
    };

    // Jeda pendek supaya cincinnya tidak berkedip sekilas pada muat yang cepat.
    const batas = window.setTimeout(tutup, BATAS_MS);
    let singkat: number | undefined;

    if (document.readyState === "complete") {
      singkat = window.setTimeout(tutup, 250);
    } else {
      window.addEventListener("load", tutup, { once: true });
    }

    return () => {
      window.clearTimeout(batas);
      if (singkat) window.clearTimeout(singkat);
      window.removeEventListener("load", tutup);
    };
  }, []);

  return (
    <div
      aria-hidden={selesai}
      className={`fixed inset-0 z-[70] grid place-items-center bg-kertas transition-opacity duration-500 ${
        selesai ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <Spinner label="Memuat situs" />
    </div>
  );
}
