/**
 * Cincin berputar sederhana.
 *
 * Sengaja dibuat dari CSS saja, tanpa JavaScript dan tanpa pustaka animasi.
 * Penanda tunggu adalah hal terakhir yang boleh ikut gagal ketika ada yang
 * bermasalah dengan pemuatan halaman.
 */
export function Spinner({ label = "Memuat" }: { label?: string }) {
  return (
    <span role="status" aria-live="polite" className="inline-flex items-center">
      <span
        aria-hidden
        className="size-8 animate-spin rounded-full border-2 border-garis border-t-bata"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
