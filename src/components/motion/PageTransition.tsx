"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Transisi antar halaman: satu tirai kertas yang meredup masuk, menutupi
 * pergantian rute, lalu meredup keluar.
 *
 * Versi sebelumnya menumpuk tiga sistem yang berjalan sendiri-sendiri pada satu
 * peristiwa yang sama. Halaman lama dilepas, penanda tunggu bawaan App Router
 * mengisi layar dengan cincin berputar, halaman baru memutar fade masuknya
 * sendiri, lalu setiap bagian ber-data-reveal memudar naik satu per satu. Empat
 * gerakan berurutan untuk satu klik. Yang terasa bukan transisi, melainkan
 * halaman yang berkedip beberapa kali.
 *
 * Sekarang hanya ada satu pemilik pergantian rute. Klik pada tautan internal
 * ditahan, tirai menutup, barulah rute berganti di baliknya, dan tirai membuka
 * setelah halaman baru terpasang. Karena pergantiannya terjadi di balik tirai,
 * gerakan lain yang menyertai pemasangan halaman baru selesai tanpa terlihat.
 *
 * Dua hal yang dijaga:
 *
 * 1. Tirai tidak boleh mengurung pengunjung. Ada batas waktu keras yang
 *    membukanya apa pun keadaan rutenya, dan tirai selalu menghilang dari
 *    pohon DOM setelah terbuka, bukan sekadar menjadi transparan.
 *
 * 2. Yang dianimasikan hanya opacity, tidak pernah transform. Elemen dengan
 *    transform menjadi containing block bagi anak yang position: fixed, dan
 *    itu akan membuat masthead melompat selama transisi berjalan.
 */

/** Lama tirai meredup masuk sebelum rute didorong. */
const TUTUP_MS = 260;
/** Lama tirai meredup keluar setelah halaman baru terpasang. */
const BUKA_MS = 420;
/** Jarak minimum klik sampai tirai mulai membuka, supaya tidak terasa berkedip. */
const MINIMUM_MS = 520;
/** Batas keras. Lewat dari ini tirai dibuka apa pun keadaan rutenya. */
const BATAS_MS = 4000;

type Fase = "masuk" | "menutup" | "keluar";

/**
 * Mengembalikan tujuan navigasi bila klik ini memang navigasi internal biasa.
 * Semua yang bukan itu, misalnya klik tengah, tautan luar, unduhan, atau
 * lompatan tagar di halaman yang sama, dibiarkan berjalan seperti biasa.
 */
function tujuanInternal(peristiwa: MouseEvent): string | null {
  if (
    peristiwa.defaultPrevented ||
    peristiwa.button !== 0 ||
    peristiwa.metaKey ||
    peristiwa.ctrlKey ||
    peristiwa.shiftKey ||
    peristiwa.altKey
  ) {
    return null;
  }

  const tautan = (peristiwa.target as Element | null)?.closest("a");
  if (!tautan) return null;
  if (tautan.target && tautan.target !== "_self") return null;
  if (tautan.hasAttribute("download")) return null;

  const alamat = new URL(tautan.href, window.location.href);
  if (alamat.origin !== window.location.origin) return null;
  if (alamat.pathname === window.location.pathname) return null;

  return alamat.pathname + alamat.search + alamat.hash;
}

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const [fase, setFase] = useState<Fase | null>(null);
  const menunggu = useRef<string | null>(null);
  const sejak = useRef(0);
  const pewaktu = useRef<number[]>([]);
  const tirai = useRef<HTMLDivElement>(null);

  const hapusPewaktu = () => {
    pewaktu.current.forEach((id) => window.clearTimeout(id));
    pewaktu.current = [];
  };

  const buka = useCallback(() => {
    menunggu.current = null;
    hapusPewaktu();
    setFase((sekarang) => (sekarang === null ? null : "keluar"));
  }, []);

  // Fase tangkap berjalan sebelum penangan milik next/link. preventDefault
  // membuat Link membatalkan navigasinya sendiri, sehingga rute baru menunggu
  // sampai tirai benar-benar menutupi halaman lama.
  useEffect(() => {
    const saatKlik = (peristiwa: MouseEvent) => {
      const tujuan = tujuanInternal(peristiwa);
      if (!tujuan || menunggu.current) return;
      peristiwa.preventDefault();

      menunggu.current = tujuan.split(/[?#]/)[0];
      sejak.current = performance.now();
      setFase("masuk");

      pewaktu.current.push(
        window.setTimeout(() => router.push(tujuan), TUTUP_MS),
        window.setTimeout(buka, BATAS_MS),
      );
    };

    document.addEventListener("click", saatKlik, true);
    return () => document.removeEventListener("click", saatKlik, true);
  }, [router, buka]);

  // Transisi hanya berjalan bila peramban sempat melukis keadaan awalnya
  // lebih dulu, jadi opacity baru dinaikkan pada frame setelah tirai terpasang.
  //
  // Pewaktu di sebelahnya bukan hiasan. requestAnimationFrame berhenti
  // dipanggil selama tab tidak terlihat, dan tanpa penjaga ini fase "masuk"
  // akan menggantung sampai batas keras berjalan. Yang menang normalnya tetap
  // frame, karena satu frame datang lebih cepat daripada pewaktu di bawah;
  // pewaktu hanya mengambil alih ketika frame memang tidak pernah datang, dan
  // pada keadaan itu tidak ada yang menonton transisinya.
  useEffect(() => {
    if (fase !== "masuk") return;
    const lanjut = () => setFase("menutup");
    const frame = requestAnimationFrame(lanjut);
    const penjaga = window.setTimeout(lanjut, 32);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(penjaga);
    };
  }, [fase]);

  // Rute sudah berganti di balik tirai. Tunggu sisa jarak minimum, lalu buka.
  useEffect(() => {
    if (!menunggu.current || pathname !== menunggu.current) return;
    const sisa = Math.max(MINIMUM_MS - (performance.now() - sejak.current), 0);
    pewaktu.current.push(window.setTimeout(buka, sisa));
  }, [pathname, buka]);

  // Tirai dilepas dari DOM begitu meredupnya selesai. Pewaktu di bawah adalah
  // cadangan untuk peristiwa yang terlewat dan untuk prefers-reduced-motion,
  // yang memangkas durasi transisi sampai nyaris nol.
  useEffect(() => {
    if (fase !== "keluar") return;

    const selesai = () => setFase(null);
    const simpul = tirai.current;
    const saatSelesai = (peristiwa: TransitionEvent) => {
      if (peristiwa.propertyName === "opacity") selesai();
    };

    simpul?.addEventListener("transitionend", saatSelesai);
    const id = window.setTimeout(selesai, BUKA_MS + 200);

    return () => {
      simpul?.removeEventListener("transitionend", saatSelesai);
      window.clearTimeout(id);
    };
  }, [fase]);

  useEffect(() => hapusPewaktu, []);

  if (fase === null) return null;

  // Klik ditahan selama tirai menutup supaya tidak ada navigasi kedua yang
  // menyusul, lalu dilepas begitu tirai mulai membuka: halaman baru sudah
  // terpasang di baliknya dan boleh langsung dipakai.
  return (
    <div
      ref={tirai}
      aria-hidden
      data-fase={fase}
      className={`fixed inset-0 z-[75] bg-kertas ${
        fase === "keluar" ? "pointer-events-none" : "pointer-events-auto"
      }`}
      style={{
        opacity: fase === "menutup" ? 1 : 0,
        transitionProperty: "opacity",
        transitionTimingFunction: "var(--ease-keluar)",
        transitionDuration: `${fase === "keluar" ? BUKA_MS : TUTUP_MS}ms`,
      }}
    />
  );
}
