import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
// Entry ssr, bukan entry utama. Halaman ini Server Component, sementara entry
// utama @phosphor-icons/react ditandai "use client" dan akan menyeret seluruh
// halaman ke sisi klien hanya demi ikon-ikon ini.
import {
  CalendarBlank,
  CheckCircle,
  MapPin,
  NotePencil,
  Storefront,
  Tag,
  User,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Masthead } from "@/components/layout/Masthead";
import { JsonLd } from "@/components/seo/JsonLd";
import { jsonLdProdusen } from "@/lib/jsonld";
import { TombolTautan } from "@/components/ui/Button";
import {
  fotoUtama,
  getAllProdusen,
  getProdusenById,
  isFilled,
  jenisProduk,
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
 * "Belum tersedia". Tombol WhatsApp hanya muncul bila nomornya benar-benar
 * ada, karena tombol yang mengarah ke nomor kosong lebih buruk daripada
 * tidak ada tombol sama sekali.
 *
 * Tautan Google Maps sengaja tidak lagi ditampilkan sebagai tombol terpisah
 * di sini: satu-satunya ajakan bertindak pada halaman ini adalah menghubungi
 * produsen lewat WhatsApp.
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
  const jenis = jenisProduk(produsen);

  const informasi: Array<{
    ikon: typeof User;
    label: string;
    nilai: string | null;
  }> = [
    { ikon: User, label: "Pemilik", nilai: produsen.nama_pemilik },
    {
      ikon: CalendarBlank,
      label: "Mulai produksi",
      nilai: isFilled(produsen.tahun_mulai)
        ? String(produsen.tahun_mulai)
        : null,
    },
    { ikon: MapPin, label: "Alamat", nilai: produsen.alamat ?? produsen.desa },
    {
      ikon: Storefront,
      label: "Sistem pembelian",
      nilai: layanan.length > 0 ? layanan.join(", ") : null,
    },
    { ikon: NotePencil, label: "Catatan produksi", nilai: produsen.catatan_produksi },
  ];

  return (
    <>
      {/*
        Diletakkan di halaman detail, bukan di daftar, karena hanya di sinilah
        seluruh yang dinyatakan JSON-LD benar-benar terlihat pengunjung: nama
        usaha, alamat, foto, dan nomor WhatsApp di tombol.
      */}
      <JsonLd data={jsonLdProdusen(produsen)} />

      <Masthead />

      <div className="wrap pt-32 pb-14 lg:pt-40">
        <div className="flex items-center gap-2 text-teks-samar">
          <MapPin size={18} weight="fill" className="shrink-0 text-bata" />
          <span className="text-sm">{lokasiSingkat(produsen)}</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="display text-[2rem] text-tinta sm:text-[2.75rem]">
            {produsen.nama_usaha}
          </h1>
          {produsen.terverifikasi && (
            <span className="inline-flex items-center gap-1.5 rounded-chip bg-bata-lembut px-2.5 py-1 text-xs font-medium text-bata-gelap">
              <CheckCircle size={14} weight="fill" />
              Terverifikasi
            </span>
          )}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-kartu bg-kertas-tenggelam lg:aspect-auto">
            {foto ? (
              <Image
                src={foto}
                alt={`Dokumentasi ${produsen.nama_usaha}`}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-teks-samar">
                Dokumentasi belum tersedia
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <p className="max-w-[52ch]">
              {isFilled(produsen.deskripsi)
                ? produsen.deskripsi
                : "Cerita usaha ini belum tersedia. Keterangannya akan ditambahkan setelah wawancara dengan pemilik selesai."}
            </p>

            {jenis.length > 0 && (
              <div className="mt-6">
                <p className="flex items-center gap-1.5 text-sm text-teks-samar">
                  <Tag size={16} />
                  Produk yang dihasilkan
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {jenis.map((teks) => (
                    <span
                      key={teks}
                      className="rounded-chip bg-bata-lembut px-2.5 py-1 text-xs font-medium text-bata-gelap"
                    >
                      {teks}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pt-8">
              {wa ? (
                <TombolTautan href={wa} ragam="utama" penuh>
                  {/*
                    Ikon dibiarkan mengikuti warna teks tombol, tidak diberi
                    hijau WhatsApp. Di atas tombol laut-950 hijau itu akan
                    bertabrakan dengan satu-satunya aksen situs ini, dan yang
                    perlu dikenali pengguna adalah bentuk logonya, bukan
                    warnanya. Jarak ke teks sudah ditangani gap-2 milik tombol.
                  */}
                  <WhatsappLogo size={20} weight="fill" aria-hidden />
                  Hubungi Produsen
                </TombolTautan>
              ) : (
                <p className="rounded-tombol border border-dashed border-garis-tegas px-5 py-3 text-center text-sm text-teks-samar">
                  Nomor WhatsApp belum tersedia
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="wrap border-t border-garis py-14 md:py-20">
        <h2 className="display text-[1.75rem] text-tinta">Informasi Usaha</h2>

        <dl className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2">
          {informasi.map((baris) => (
            <div key={baris.label} className="flex gap-3">
              <baris.ikon
                size={20}
                weight="regular"
                className="mt-0.5 shrink-0 text-teks-samar"
              />
              <div>
                <dt className="text-sm text-teks-samar">{baris.label}</dt>
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
