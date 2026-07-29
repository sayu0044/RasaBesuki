import Link from "next/link";
import { sentra } from "@/lib/produsen";

const TAUTAN = [
  { href: "/tentang", label: "Tentang Sentra" },
  { href: "/produsen", label: "Produsen" },
  { href: "/proses", label: "Proses Produksi" },
  { href: "/kontak", label: "Hubungi Kami" },
];

export function Footer() {
  return (
    <footer className="bg-laut-950 text-white/70">
      <div className="wrap grid gap-10 py-16 md:grid-cols-[1.4fr_1fr] md:py-20">
        <div>
          <p className="display text-[1.75rem] text-white">{sentra.nama}</p>
          <p className="mt-2 max-w-[38ch] text-white/60">{sentra.tagline}</p>
        </div>

        {/*
          py-2 di tiap tautan membuat area sentuhnya mencapai 44px. Tanpa itu
          tingginya hanya setinggi baris teks, terlalu kecil untuk ditekan
          dengan nyaman.
        */}
        <nav className="flex flex-col">
          {TAUTAN.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-fit py-2 text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="wrap flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {sentra.tahun} {sentra.nama}
        </p>
        <p>{sentra.penyelenggara}</p>
      </div>
    </footer>
  );
}
