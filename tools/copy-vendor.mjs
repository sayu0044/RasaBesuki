/**
 * copy-vendor.mjs
 *
 * Menyalin file library dari node_modules ke folder lib/ agar website tetap
 * dapat dijalankan sebagai file statis biasa (tanpa bundler, tanpa server Node).
 * Ini penting untuk keberlanjutan setelah program KKN selesai: cukup upload
 * seluruh folder ke hosting statis apa pun.
 *
 * Jalankan: npm run build:vendor
 */

import { cp, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const from = (p) => resolve(root, "node_modules", p);
const to = (p) => resolve(root, p);

const files = [
  ["lenis/dist/lenis.min.js", "lib/lenis/lenis.min.js"],
  ["gsap/dist/gsap.min.js", "lib/gsap/gsap.min.js"],
  ["gsap/dist/ScrollTrigger.min.js", "lib/gsap/ScrollTrigger.min.js"],
];

// Catatan: ikon TIDAK disalin sebagai font. Font ikon Phosphor lengkap
// berukuran sekitar 225 KB, sementara website ini hanya memakai belasan ikon.
// Lihat tools/build-icons.mjs yang membuat css/icons.css berisi ikon terpakai
// saja.

async function run() {
  for (const [src, dest] of files) {
    await mkdir(dirname(to(dest)), { recursive: true });
    await cp(from(src), to(dest));
    console.log(`  vendor  ${dest}`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
