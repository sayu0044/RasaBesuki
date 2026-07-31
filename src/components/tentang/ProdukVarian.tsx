import Image from "next/image";

const VARIAN = [
  {
    foto: "/img/product/mentah.JPG",
    nama: "Kerupuk Mentah",
    teks: "Sudah dijemur kering dan siap digoreng sendiri di rumah.",
  },
  {
    foto: "/img/product/dibungkus.JPG",
    nama: "Kerupuk Matang",
    teks: "Sudah digoreng dan siap dinikmati langsung.",
  },
];

const JANGKAUAN = ["Besuki", "Pasuruan", "Malang", "Toko-toko sekitar"];

/**
 * Bentuk produk dan jangkauan pemasaran, sesuai naskah sentra. Tidak memuat
 * harga maupun cara pemesanan karena situs ini bukan marketplace.
 */
export function ProdukVarian() {
  return (
    <section className="bg-kertas-tenggelam py-14 md:py-20 lg:py-28">
      <div className="wrap">
        <div data-reveal>
          <p className="text-xs font-semibold tracking-[0.16em] text-bata uppercase">
            Produk
          </p>
          <h2 className="display mt-4 max-w-[18ch] text-[2rem] text-tinta sm:text-[2.5rem]">
            Tersedia Mentah Maupun Matang
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {VARIAN.map((item) => (
            <div key={item.nama} data-reveal className="flex items-start gap-4">
              <div className="relative aspect-4/3 w-40 shrink-0 overflow-hidden rounded-kartu bg-permukaan sm:w-48">
                <Image
                  src={item.foto}
                  alt={item.nama}
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
              <div className="pt-1">
                <h3 className="display text-[1.375rem] text-tinta">
                  {item.nama}
                </h3>
                <p className="mt-1.5 max-w-[36ch] text-[0.9375rem] text-teks-samar">
                  {item.teks}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-12 border-t border-garis-tegas pt-8">
          <p className="text-xs font-semibold tracking-[0.12em] text-teks-samar uppercase">
            Sudah Menjangkau
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {JANGKAUAN.map((kota) => (
              <span
                key={kota}
                className="rounded-chip bg-bata-lembut px-2.5 py-1 text-xs font-medium text-bata-gelap"
              >
                {kota}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
