import { Spinner } from "@/components/ui/Spinner";

/**
 * Tampilan tunggu bawaan App Router. Next.js menampilkannya sendiri saat
 * sebuah rute belum siap, lalu menggantinya dengan halaman begitu siap.
 * Karena kerangka yang mengatur, tidak ada state yang bisa tersangkut dan
 * membuat penanda tunggu ini menutupi halaman selamanya.
 */
export default function Loading() {
  return (
    <div className="grid min-h-[60dvh] place-items-center">
      <Spinner label="Memuat halaman" />
    </div>
  );
}
