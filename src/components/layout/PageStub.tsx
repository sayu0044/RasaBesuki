import { Masthead } from "@/components/layout/Masthead";
import { TombolTautan } from "@/components/ui/Button";

/**
 * Kerangka halaman untuk rute yang isinya dibangun pada tahap berikutnya.
 *
 * Halaman ini sengaja dibuat, bukan dibiarkan kosong, supaya seluruh tautan
 * di navigasi tetap hidup. PLAN.md butir 30 mensyaratkan tidak ada broken link.
 * Halaman juga menyatakan terus terang bahwa isinya belum lengkap, bukan
 * menampilkan konten karangan.
 */
export function PageStub({
  judul,
  keterangan,
}: {
  judul: string;
  keterangan: string;
}) {
  return (
    <>
      <Masthead />
      <div className="wrap border-b border-garis pt-32 pb-16 lg:pt-40 lg:pb-24">
        <h1 className="display max-w-[18ch] text-[2.25rem] text-tinta sm:text-[3rem]">
          {judul}
        </h1>
        <p className="mt-5 max-w-[52ch]">{keterangan}</p>
      </div>

      <div className="wrap py-16">
        <div className="rounded-kartu border border-dashed border-garis-tegas bg-permukaan p-8">
          <h2 className="display text-[1.5rem] text-tinta">
            Halaman ini sedang disiapkan
          </h2>
          <p className="mt-3 max-w-[52ch] text-teks-samar">
            Isinya menunggu data hasil survei dan dokumentasi dari rumah
            produksi. Sementara itu, daftar produsen sudah bisa dibuka.
          </p>
          <div className="mt-6">
            <TombolTautan href="/" ragam="garis">
              Kembali ke Beranda
            </TombolTautan>
          </div>
        </div>
      </div>
    </>
  );
}
