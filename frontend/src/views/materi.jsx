import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// =====================================
// DATA MATERI
// =====================================

const materiList = [
  {
    id: 1,
    title: "Buku",
    slug: "buku",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795273818/Frame_18.png",
  },
  {
    id: 2,
    title: "Kursi",
    slug: "kursi",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795273908/Frame_18_1.png",
  },
  {
    id: 3,
    title: "Penggaris",
    slug: "penggaris",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795284349/pexels-jef-k-1518692548-29279407_1.png",
  },
  {
    id: 4,
    title: "Meja",
    slug: "meja",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795284348/WhatsApp_Image_2026-10-11_at_14.12.41_1.png",
  },
  {
    id: 5,
    title: "Tas",
    slug: "tas",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795284349/Frame_18_2.png",
  },
  {
    id: 6,
    title: "Lemari",
    slug: "lemari",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795284348/Frame_18_3.png",
  },
  {
    id: 7,
    title: "Jendela",
    slug: "jendela",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795284347/WhatsApp_Image_2026-10-11_at_14.12.43_1.png",
  },
  {
    id: 8,
    title: "Lampu",
    slug: "lampu",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795284347/Frame_18_4.png",
  },
];

// =====================================
// KOMPONEN MATERI
// =====================================

export default function Materi() {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const mainRef = useRef(null);

  // =====================================
  // FILTER PENCARIAN
  // =====================================

  const filteredMateri = materiList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  // Tampilan awal 3 gambar
  const displayedMateri = showAll ? filteredMateri : materiList.slice(0, 3);

  // =====================================
  // TOMBOL SEMUA
  // =====================================

  const handleShowAll = () => {
    setShowAll(true);

    mainRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================
  // TOMBOL KEMBALI
  // =====================================

  const handleBack = () => {
    if (showAll) {
      // Kembali ke tampilan awal (3 gambar)
      setShowAll(false);
      setSearchTerm("");

      // Scroll kembali ke atas
      mainRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Jika sudah tampilan awal, kembali ke Beranda
      navigate("/beranda");
    }
  };

  // =====================================
  // TAMPILAN
  // =====================================

  return (
    <div
      ref={mainRef}
      className="h-dvh w-full overflow-x-hidden overflow-y-auto overscroll-y-contain bg-[#fff9ef] font-sans"
    >
      {/* ================================= */}
      {/* AREA SCROLL KHUSUS MATERI */}
      {/* ================================= */}

      <main className="mx-auto w-full max-w-6xl px-6 pt-2 pb-10 sm:px-8">
        <div className="mx-auto w-full max-w-6xl px-6 pt-2 pb-10 sm:px-8">
          {/* ================================= */}
          {/* HEADER */}
          {/* ================================= */}

          <section className="mb-3 flex items-start justify-between gap-3">
            {/* JUDUL */}

            <div>
              <h1 className="text-[22px] font-bold leading-tight text-[#174d45] sm:text-[30px]">
                Materi Kosakata Benda
              </h1>

              <p className="mt-1 text-[14px] text-[#214f49] sm:text-base">
                Pilih kategori benda yang akan dipelajari.
              </p>
            </div>

            {/* TOMBOL KEMBALI */}

            <button
              type="button"
              onClick={handleBack}
              className="mt-1 flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#278477] px-4 py-2 text-[15px] font-medium text-white transition hover:bg-[#1c6b60] active:scale-95 sm:px-5"
            >
              <span className="me-2">‹</span>
              Kembali
            </button>
          </section>

          {/* ================================= */}
          {/* SEARCH BAR */}
          {/* MUNCUL KETIKA SEMUA DIKLIK */}
          {/* ================================= */}

          {showAll && (
            <div className="mb-2 w-full max-w-45 animate-in fade-in duration-200">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari"
                  className="h-8 w-full rounded-xl border border-[#b9beb5] bg-white px-4 pr-9 text-[15px] text-[#174d45] outline-none transition placeholder:text-[#66817a] focus:border-[#278477] focus:ring-1 focus:ring-[#278477]"
                />

                {/* ICON SEARCH */}

                <svg
                  className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#278477]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>
              </div>
            </div>
          )}

          {/* ================================= */}
          {/* GRID GAMBAR MATERI */}
          {/* ================================= */}

          <section
            className={`grid gap-2 sm:gap-3 ${
              showAll ? "grid-cols-2 min-[420px]:grid-cols-4" : "grid-cols-3"
            }`}
          >
            {displayedMateri.map((item) => (
              <Link
                key={item.id}
                to={`/detail-materi?materi=${item.slug}`}
                className="group relative aspect-[1.15/1] min-w-0 overflow-hidden rounded-xl border border-[#d4d4c9] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </Link>
            ))}
          </section>

          {/* ================================= */}
          {/* JIKA PENCARIAN TIDAK DITEMUKAN */}
          {/* ================================= */}

          {showAll && displayedMateri.length === 0 && (
            <div className="flex min-h-32 flex-col items-center justify-center text-center">
              <p className="text-sm font-semibold text-[#174d45]">
                Materi tidak ditemukan
              </p>

              <p className="mt-1 text-xs text-[#66817a]">
                Coba gunakan kata kunci lainnya.
              </p>
            </div>
          )}

          {/* ================================= */}
          {/* TOMBOL SEMUA / TAMPILKAN SEDIKIT */}
          {/* ================================= */}

          {!showAll && (
            <div className="sticky bottom-0 z-20 mt-4 mb-5 flex justify-center bg-[#fff9ef]/95 py-3 backdrop-blur-sm">
              <button
                type="button"
                onClick={handleShowAll}
                className="flex min-w-37.5 items-center justify-center rounded-full bg-[#278477] px-5 py-2.5 text-[12px] font-medium text-white shadow-md transition duration-200 hover:bg-[#1c6b60] active:scale-95"
              >
                Semua
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
