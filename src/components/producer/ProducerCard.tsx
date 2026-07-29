import Image from "next/image";
import Link from "next/link";
import {
  fotoUtama,
  jenisProduk,
  layananPembelian,
  lokasiSingkat,
  type Produsen,
} from "@/lib/produsen";

/**
 * Kartu rumah produksi.
 *
 * Kartu ini harus tetap enak dilihat saat datanya belum masuk, karena saat ini
 * kesepuluh produsen masih berupa placeholder: nama pemilik, desa, produk, dan
 * nomor WhatsApp semuanya masih null. Karena itu logika "belum tersedia"
 * ditaruh di sini, di satu tempat, bukan disebar ke tiap halaman.
 */
export function ProducerCard({ produsen }: { produsen: Produsen }) {
  const foto = fotoUtama(produsen);
  const layanan = layananPembelian(produsen);
  const jenis = jenisProduk(produsen);
  // Kategori produk lebih berguna bagi pembeli daripada sistem pembelian,
  // jadi ia yang tampil lebih dulu bila keduanya sudah terisi.
  const label = jenis.length > 0 ? jenis : layanan;
  const adaData = label.length > 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-kartu border border-garis bg-permukaan transition-colors duration-300 hover:border-garis-tegas">
      <div className="relative aspect-[4/3] overflow-hidden bg-kertas-tenggelam">
        {foto ? (
          <Image
            src={foto}
            alt={`Dokumentasi ${produsen.nama_usaha}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-teks-samar">
            Dokumentasi belum tersedia
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="display text-[1.375rem] text-tinta">
          {produsen.nama_usaha}
        </h3>

        <p className="text-sm text-teks-samar">{lokasiSingkat(produsen)}</p>

        <div className="flex flex-wrap gap-1.5">
          {adaData ? (
            label.map((teks) => (
              <span
                key={teks}
                className="rounded-chip bg-bata-lembut px-2.5 py-1 text-xs font-medium text-bata-gelap"
              >
                {teks}
              </span>
            ))
          ) : (
            <span className="rounded-chip border border-dashed border-garis-tegas px-2.5 py-1 text-xs font-medium text-teks-samar">
              Detail menyusul
            </span>
          )}
        </div>

        <div className="mt-auto pt-4">
          <Link
            href={`/produsen/${produsen.id}`}
            className={`inline-flex min-h-12 w-full items-center justify-center rounded-tombol px-6 text-[0.9375rem] font-semibold leading-none transition-colors duration-200 active:translate-y-px ${
              adaData
                ? "bg-laut-950 text-white hover:bg-laut-800"
                : "border border-garis-tegas text-tinta hover:border-tinta hover:bg-kertas"
            }`}
          >
            Lihat Profil
          </Link>
        </div>
      </div>
    </article>
  );
}
