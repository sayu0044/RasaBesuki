import { getAllProdusen, sentra } from "@/lib/produsen";

/**
 * Ringkasan sentra.
 *
 * Versi lama menampilkan tiga kotak bergaris dengan nilai sebesar angka.
 * Masalahnya, dua dari tiga nilai itu bukan angka: "Besuki" dan "Rumahan"
 * adalah kata. Mata membaca barisnya sebagai statistik lalu tersandung.
 *
 * Di sini labelnya dipindah ke atas nilai, sehingga terbaca sebagai
 * "Lokasi: Besuki", dan kotaknya diganti garis vertikal tipis.
 *
 * Jumlah rumah produksi dihitung dari data, bukan ditulis tangan, supaya
 * tidak pernah berbeda dengan isi direktori.
 */
export function Figures() {
  const jumlah = getAllProdusen().length;

  const ringkasan = [
    {
      label: "Rumah Produksi",
      nilai: String(jumlah),
      keterangan: "tergabung dalam sentra",
    },
    {
      label: "Lokasi",
      nilai: sentra.kecamatan,
      keterangan: `${sentra.kabupaten}, ${sentra.provinsi}`,
    },
    {
      label: "Skala Produksi",
      nilai: "Rumahan",
      keterangan: "dikerjakan sendiri, bukan pabrik",
    },
  ];

  return (
    <section className="wrap py-14 md:py-20">
      <div className="grid gap-8 border-t border-garis pt-10 md:grid-cols-3 md:gap-0">
        {ringkasan.map((item, i) => (
          <div
            key={item.label}
            data-reveal
            className={
              i === 0
                ? "md:pr-8"
                : "md:border-l md:border-garis md:pr-8 md:pl-8"
            }
          >
            <p className="text-xs font-semibold tracking-[0.12em] text-teks-samar uppercase">
              {item.label}
            </p>
            <p className="display mt-3 text-[2.5rem] text-tinta lg:text-[3rem]">
              {item.nilai}
            </p>
            <p className="mt-1.5 text-sm text-teks-samar">{item.keterangan}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
