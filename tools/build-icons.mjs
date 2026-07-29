/**
 * build-icons.mjs
 *
 * Membuat berkas CSS ikon yang hanya berisi ikon yang benar-benar dipakai.
 *
 * Alasan: paket ikon lengkap dari Phosphor berukuran sekitar 225 KB (font
 * ditambah stylesheet-nya), padahal website ini hanya memakai belasan ikon.
 * Di jaringan seluler pedesaan, selisih itu terasa. Berkas hasil skrip ini
 * berukuran beberapa kilobyte saja.
 *
 * Cara kerja: mengambil berkas SVG resmi dari @phosphor-icons/core, lalu
 * menuliskannya sebagai mask-image. Warna ikon otomatis mengikuti warna teks
 * di sekitarnya (currentColor), sama seperti saat memakai font ikon.
 *
 * Menambah ikon baru: tambahkan namanya ke daftar IKON di bawah, lalu
 * jalankan `npm run build`. Nama mengikuti katalog di https://phosphoricons.com
 *
 * Jalankan: npm run build:icons
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Ikon yang dipakai di seluruh halaman. Berat: regular, satu gaya saja. */
const IKON = [
  "arrow-right",
  "arrow-up-right",
  "caret-right",
  "clock-countdown",
  "fish",
  "info",
  "list",
  "magnifying-glass",
  "map-pin",
  "storefront",
  "whatsapp-logo",
  "x",
];

/** Memadatkan SVG agar muat sebagai data URI tanpa menambah berat. */
function toDataUri(svg) {
  const compact = svg
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+/g, " ")
    .replace(/> </g, "><")
    .trim();

  const encoded = compact
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E");

  return `url("data:image/svg+xml,${encoded}")`;
}

async function run() {
  const bagian = [
    `/* Dibuat otomatis oleh tools/build-icons.mjs. Jangan disunting langsung.`,
    `   Tambah ikon lewat daftar IKON di berkas tersebut, lalu jalankan npm run build. */`,
    ``,
    `.ph {`,
    `  display: inline-block;`,
    `  width: 1em;`,
    `  height: 1em;`,
    `  flex: none;`,
    `  vertical-align: -0.125em;`,
    `  background-color: currentColor;`,
    `  -webkit-mask-repeat: no-repeat;`,
    `  mask-repeat: no-repeat;`,
    `  -webkit-mask-position: center;`,
    `  mask-position: center;`,
    `  -webkit-mask-size: contain;`,
    `  mask-size: contain;`,
    `}`,
    ``,
  ];

  for (const nama of IKON) {
    const svg = await readFile(
      resolve(root, `node_modules/@phosphor-icons/core/assets/regular/${nama}.svg`),
      "utf8",
    );
    const uri = toDataUri(svg);
    bagian.push(
      `.ph-${nama} {`,
      `  -webkit-mask-image: ${uri};`,
      `  mask-image: ${uri};`,
      `}`,
      ``,
    );
  }

  const out = resolve(root, "css/icons.css");
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, bagian.join("\n"), "utf8");

  const kb = (Buffer.byteLength(bagian.join("\n")) / 1024).toFixed(1);
  console.log(`  icons   css/icons.css (${IKON.length} ikon, ${kb} KB)`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
