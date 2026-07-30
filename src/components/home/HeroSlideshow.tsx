import Image from "next/image";

const DETIK_PER_FOTO = 6;
const DETIK_TRANSISI = 1.5;

/**
 * Crossfade murni CSS: tiap foto punya jendela tampil yang sama panjang,
 * digeser lewat animation-delay sebesar urutannya. Delay positif pada
 * animasi infinite hanya menunda mulainya sekali di awal, sesudah itu fase
 * antar-lapisan tetap berbeda selamanya, jadi urutannya tidak pernah
 * saling menimpa.
 *
 * Tanpa JavaScript sama sekali supaya slideshow tetap jalan walau GSAP/Lenis
 * gagal dimuat, dan aturan prefers-reduced-motion global di globals.css
 * otomatis membekukannya ke satu foto bagi pengguna yang meminta itu.
 */
export function HeroSlideshow({ images }: { images: string[] }) {
  const total = images.length * DETIK_PER_FOTO;
  const slotPersen = 100 / images.length;
  const fadePersen = (DETIK_TRANSISI / total) * 100;
  const fadeMasuk = Math.min(fadePersen, slotPersen / 2);
  const fadeKeluar = slotPersen - fadeMasuk;

  return (
    <>
      <style>{`
        @keyframes hero-slideshow {
          0% { opacity: 0; }
          ${fadeMasuk.toFixed(3)}% { opacity: 1; }
          ${fadeKeluar.toFixed(3)}% { opacity: 1; }
          ${slotPersen.toFixed(3)}% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover object-center"
          style={{
            animationName: "hero-slideshow",
            animationDuration: `${total}s`,
            animationDelay: `${index * DETIK_PER_FOTO}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
            opacity: index === 0 ? 1 : 0,
          }}
        />
      ))}
    </>
  );
}
