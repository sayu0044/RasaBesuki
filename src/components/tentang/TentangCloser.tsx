/**
 * Dulu section ini penutup halaman; isinya sudah dipindah ke Komunitas.
 * Sekarang jadi tempat video proses pembuatan.
 *
 * <video> dipakai langsung, bukan next/image: next/image hanya mengoptimasi
 * berkas gambar, bukan video, dan pemutar bawaan browser (lewat atribut
 * controls) sudah cukup tanpa perlu state atau JavaScript tambahan di sisi
 * kita.
 */
export function TentangCloser() {
  return (
    <section className="wrap py-14 md:py-20 lg:py-28">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-[0.16em] text-bata uppercase">
          Video
        </p>
        <p className="mt-4 text-teks-samar">
          Video singkat proses pembuatan kerupuk kipas dari salah satu rumah
          produksi di Besuki.
        </p>
      </div>

      <div
        data-reveal
        className="relative mx-auto mt-10 aspect-video w-full max-w-3xl overflow-hidden rounded-kartu bg-laut-950"
      >
        <video
          src="/video/Video%20UMKM.mp4"
          controls
          preload="metadata"
          className="h-full w-full object-cover"
        >
          Peramban Anda tidak mendukung pemutaran video ini.
        </video>
      </div>
    </section>
  );
}
