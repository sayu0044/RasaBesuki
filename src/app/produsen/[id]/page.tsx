import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/layout/Masthead";
import { TombolTautan } from "@/components/ui/Button";
import {
  fotoUtama,
  getAllProdusen,
  getProdusenById,
  isFilled,
  layananPembelian,
  lokasiSingkat,
} from "@/lib/produsen";
import { waProdusen } from "@/lib/wa";

export function generateStaticParams() {
  return getAllProdusen().map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  props: PageProps<"/produsen/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const produsen = getProdusenById(id);
  if (!produsen) return {};

  return {
    title: produsen.nama_usaha,
    description:
      produsen.deskripsi ??
      `Profil ${produsen.nama_usaha}, rumah produksi kerupuk ikan di Kecamatan Besuki, Situbondo.`,
  };
}

/**
 * Profil satu rumah produksi.
 *
 * Setiap field yang belum dikonfirmasi pemilik usaha ditampilkan sebagai
 * "Belum tersedia". Tombol WhatsApp dan Google Maps hanya muncul bila
 * datanya benar-benar ada, karena tombol yang mengarah ke nomor kosong lebih
 * buruk daripada tidak ada tombol sama sekali.
 */
export default async function ProfilProdusenPage(
  props: PageProps<"/produsen/[id]">,
) {
  const { id } = await props.params;
  const produsen = getProdusenById(id);
  if (!produsen) notFound();

  const foto = fotoUtama(produsen);
  const wa = waProdusen(produsen);
  const layanan = layananPembelian(produsen);

  const informasi: Array<{ kunci: string; nilai: string | null }> = [
    { kunci: "Nama usaha", nilai: produsen.nama_usaha },
    { kunci: "Pemilik", nilai: produsen.nama_pemilik },
    { kunci: "Lokasi", nilai: produsen.alamat ?? produsen.desa },
    {
      kunci: "Sistem pembelian",
      nilai: layanan.length > 0 ? layanan.join(", ") : null,
    },
    { kunci: "Produksi", nilai: produsen.catatan_produksi },
  ];

  return (
    <>
      <Masthead />

      <div className="wrap pt-32 pb-14 lg:pt-40">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-kartu bg-kertas-tenggelam">
            {foto ? (
              <Image
                src={foto}
                alt={`Dokumentasi ${produsen.nama_usaha}`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-teks-samar">
                Dokumentasi belum tersedia
              </div>
            )}
          </div>

          <div>
            <h1 className="display text-[2rem] text-tinta sm:text-[2.75rem]">
              {produsen.nama_usaha}
            </h1>
            <p className="mt-3 text-teks-samar">{lokasiSingkat(produsen)}</p>

            <p className="mt-6 max-w-[52ch]">
              {isFilled(produsen.deskripsi)
                ? produsen.deskripsi
                : "Cerita usaha ini belum tersedia. Keterangannya akan ditambahkan setelah wawancara dengan pemilik selesai."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {wa ? (
                <TombolTautan href={wa} ragam="utama">
                  Hubungi Produsen
                </TombolTautan>
              ) : (
                <p className="rounded-tombol border border-dashed border-garis-tegas px-5 py-3 text-sm text-teks-samar">
                  Nomor WhatsApp belum tersedia
                </p>
              )}

              {isFilled(produsen.maps_url) && (
                <TombolTautan href={produsen.maps_url as string} ragam="garis">
                  Kunjungi Rumah Produksi
                </TombolTautan>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="wrap border-t border-garis py-14 md:py-20">
        <h2 className="display text-[1.75rem] text-tinta">Informasi Usaha</h2>

        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          {informasi.map((baris) => (
            <div key={baris.kunci}>
              <dt className="text-sm text-teks-samar">{baris.kunci}</dt>
              <dd
                className={`mt-1 text-[1.0625rem] ${
                  isFilled(baris.nilai)
                    ? "font-medium text-tinta"
                    : "text-teks-samar"
                }`}
              >
                {isFilled(baris.nilai) ? baris.nilai : "Belum tersedia"}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 max-w-[58ch] border-l-2 border-bata bg-permukaan py-4 pr-5 pl-5 text-sm">
          Harga dan ketersediaan dapat berubah sesuai kondisi produksi. Silakan
          hubungi produsen melalui WhatsApp untuk informasi terbaru.
        </p>
      </section>
    </>
  );
}
