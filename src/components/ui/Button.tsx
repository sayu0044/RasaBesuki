import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Satu-satunya bentuk tombol di situs ini.
 *
 * Situs statis sebelumnya memakai pola "link panah" (teks kecil dengan tanda
 * panah) sebagai aksi utama. Pola itu dihapus sepenuhnya dan tidak boleh
 * dihidupkan lagi: target sentuhnya kecil dan tidak terlihat seperti sesuatu
 * yang bisa ditekan, terutama bagi pengguna berusia lebih tua.
 *
 * Tinggi minimum 48px mengikuti ukuran target sentuh yang nyaman.
 */

type Ragam = "utama" | "garis" | "terang" | "kertas";

const dasar =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-tombol px-6 text-[0.9375rem] font-semibold leading-none transition-colors duration-200 active:translate-y-px";

const ragamKelas: Record<Ragam, string> = {
  // Tinta gelap di atas kertas terang. Kontras jauh di atas syarat AA.
  utama: "bg-laut-950 text-white hover:bg-laut-800",
  // Sekunder di atas latar terang
  garis:
    "border border-garis-tegas bg-transparent text-tinta hover:border-tinta hover:bg-permukaan",
  // Sekunder di atas foto atau latar gelap. Garis dibuat cukup tegas agar
  // tombol tetap terbaca sebagai tombol di atas foto, bukan sekadar teks.
  terang:
    "border border-white/60 bg-transparent text-white hover:border-white hover:bg-white/10",
  // Aksi utama di atas foto gelap. Tombol tinta akan tenggelam di sana,
  // jadi di atas hero polaritasnya dibalik.
  kertas: "bg-white text-laut-950 hover:bg-white/90",
};

type TombolTautanProps = {
  href: string;
  ragam?: Ragam;
  penuh?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function TombolTautan({
  href,
  ragam = "utama",
  penuh = false,
  children,
  ...rest
}: TombolTautanProps) {
  const luar = href.startsWith("http");
  const kelas = `${dasar} ${ragamKelas[ragam]}${penuh ? " w-full" : ""}`;

  if (luar) {
    return (
      <a
        href={href}
        className={kelas}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={kelas} {...rest}>
      {children}
    </Link>
  );
}

type TombolProps = {
  ragam?: Ragam;
  penuh?: boolean;
  children: ReactNode;
} & ComponentProps<"button">;

export function Tombol({
  ragam = "utama",
  penuh = false,
  children,
  ...rest
}: TombolProps) {
  return (
    <button
      className={`${dasar} ${ragamKelas[ragam]}${penuh ? " w-full" : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
