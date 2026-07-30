import fs from "node:fs";
import path from "node:path";

const HERO_DIR = path.join(process.cwd(), "public/img/hero");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/**
 * Sumber gambar Hero adalah isi folder public/img/hero, bukan daftar nama
 * berkas yang ditulis tangan. Menambah atau menghapus foto di folder itu
 * otomatis terpantul ke slideshow tanpa menyentuh kode.
 */
export function getHeroImages(): string[] {
  return fs
    .readdirSync(HERO_DIR)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => `/img/hero/${file}`);
}
