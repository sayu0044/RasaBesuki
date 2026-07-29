/**
 * Pemuat GSAP dan Lenis.
 *
 * Ketiga pustaka ini hanya boleh diunduh sekali per sesi, sementara efek yang
 * memakainya berjalan ulang setiap kali rute berganti. Janji di bawah disimpan
 * di level modul supaya efek mana pun yang memanggil lebih dulu akan memicu
 * unduhan, dan pemanggil berikutnya ikut menunggu janji yang sama.
 */

type MotionLibs = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  Lenis: typeof import("lenis").default;
};

let libs: Promise<MotionLibs> | null = null;

export function loadMotionLibs(): Promise<MotionLibs> {
  if (!libs) {
    libs = Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]).then(([gsapMod, stMod, lenisMod]) => {
      const { gsap } = gsapMod;
      const { ScrollTrigger } = stMod;
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger, Lenis: lenisMod.default };
    });
  }
  return libs;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
