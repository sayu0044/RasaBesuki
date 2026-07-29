/**
 * Tujuan section ini bukan menjual, melainkan menjelaskan bahwa situs ini
 * bukan marketplace. Transaksi terjadi langsung antara pembeli dan produsen.
 */
const LANGKAH = [
  {
    nomor: "01",
    judul: "Pilih Produsen",
    teks: "Temukan rumah produksi yang ingin Anda kenal lebih dekat.",
  },
  {
    nomor: "02",
    judul: "Hubungi",
    teks: "Buka WhatsApp produsen untuk menanyakan produk dan ketersediaannya.",
  },
  {
    nomor: "03",
    judul: "Ambil atau Pesan",
    teks: "Lakukan pembelian langsung atau sesuai kesepakatan dengan produsen.",
  },
];

export function HowToBuy() {
  return (
    <section className="bg-laut-950 py-16 md:py-24">
      <div className="wrap">
        <h2
          data-reveal
          className="display max-w-[16ch] text-[2rem] text-white sm:text-[2.5rem]"
        >
          Bagaimana Cara Membeli?
        </h2>
        <p data-reveal className="mt-4 max-w-[50ch] text-white/70">
          Situs ini tidak memproses pesanan maupun pembayaran. Pembelian
          dilakukan langsung dengan produsen.
        </p>

        <div className="mt-12 grid gap-0 md:grid-cols-3">
          {LANGKAH.map((langkah) => (
            <div
              key={langkah.nomor}
              data-reveal
              className="flex flex-col gap-2.5 border-t border-white/15 py-8 md:pr-10"
            >
              {/* white/60, bukan white/50: pada 14px yang terakhir hanya pas
                  di ambang kontras AA terhadap latar tinta laut. */}
              <span className="font-mono text-sm text-white/60 tabular-nums">
                {langkah.nomor}
              </span>
              <h3 className="display text-[1.5rem] text-white">
                {langkah.judul}
              </h3>
              <p className="max-w-[34ch] text-[0.9375rem] text-white/70">
                {langkah.teks}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
