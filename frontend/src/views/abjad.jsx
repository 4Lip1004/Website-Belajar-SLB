import { useState } from "react";
import { Link } from "react-router-dom";

// =====================================
// DATA GAMBAR ABJAD A-Z
// =====================================

const imageUrls = {
  A: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334915/A.png",
  B: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334915/B.png",
  C: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334917/C.png",
  D: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334917/D.png",
  E: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334915/E.png",
  F: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334917/F.png",
  G: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334917/G.png",
  H: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334918/H.png",
  I: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334917/I.png",
  J: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334919/J.png",
  K: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334919/K.png",
  L: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334919/L.png",
  M: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334917/M.png",
  N: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334918/N.png",
  O: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334918/O.png",
  P: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334920/P.png",
  Q: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334920/Q.png",
  R: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334915/R.png",
  S: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334915/S.png",
  T: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334920/T.png",
  U: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334915/U.png",
  V: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334920/V.png",
  W: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334921/W.png",
  X: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334921/X.png",
  Y: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334922/Y.png",
  Z: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795334922/Z.png",
};

// =====================================
// DATA ABJAD
// =====================================

const abjadList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .map((letter, index) => ({
    id: index + 1,
    letter,
    image: imageUrls[letter],
  }));

// =====================================
// KOMPONEN ABJAD
// =====================================

export default function Abjad() {
  const [currentPage, setCurrentPage] = useState(1);

  // Jumlah huruf setiap halaman
  const itemsPerPage = 12;

  // Total halaman
  const totalPages = Math.ceil(abjadList.length / itemsPerPage);

  // Mengambil data berdasarkan halaman
  const startIndex = (currentPage - 1) * itemsPerPage;

  const displayedAbjad = abjadList.slice(startIndex, startIndex + itemsPerPage);

  // Mempertahankan jumlah slot grid sebanyak 12
  const gridAbjad = Array.from(
    { length: itemsPerPage },
    (_, index) => displayedAbjad[index] ?? null,
  );

  // =====================================
  // FUNGSI PAGINATION
  // =====================================

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // =====================================
  // TAMPILAN
  // =====================================

  return (
    <div className="flex min-h-screen flex-col bg-[#fff9ef] font-sans">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4.5 pt-5 pb-5 sm:px-8">
        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <section className="mb-2 flex items-start justify-between gap-2">
          {/* JUDUL */}

          <div className="min-w-0">
            <h1 className="text-[18px] font-bold leading-tight text-[#174d45] sm:text-[30px]">
              Abjad A - Z
            </h1>

            <p className="mt-1 text-[12px] leading-tight text-[#214f49] sm:text-base">
              Pilih huruf untuk melihat isyarat dan contoh benda.
            </p>
          </div>

          {/* TOMBOL KEMBALI */}

          <Link
            to="/beranda"
            className="mt-0.5 flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#278477] px-3 py-1.5 text-[10px] font-medium text-white transition hover:bg-[#1c6b60] active:scale-95 sm:px-5 sm:py-2 sm:text-[15px]"
          >
            <span className="me-2">‹</span>
            Kembali
          </Link>
        </section>

        {/* ================================= */}
        {/* GRID ABJAD */}
        {/* ================================= */}

        <section className="grid grid-cols-6 gap-x-1.5 gap-y-2 sm:gap-x-3 sm:gap-y-3">
          {gridAbjad.map((item, index) =>
            item ? (
              <Link
                key={item.id}
                to={`/detail-abjad?huruf=${item.letter}`}
                className="group flex min-w-0 flex-col items-center gap-1"
              >
                {/* GAMBAR ISYARAT */}
                <div className="flex aspect-[1.35/1] w-full items-center justify-center overflow-hidden rounded-[11px] border border-[#a4a99e] bg-white shadow-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
                  <img
                    src={item.image}
                    alt={`Isyarat huruf ${item.letter}`}
                    loading="lazy"
                    className="h-full w-full object-contain p-1 transition duration-200 group-hover:scale-105"
                  />
                </div>

                {/* LABEL HURUF */}
                <span className="flex h-5 min-w-7.5 items-center justify-center rounded-full bg-[#f8d568] px-3 text-[11px] font-bold text-[#000000] sm:h-6 sm:min-w-9 sm:text-[15px]">
                  {item.letter}
                </span>
              </Link>
            ) : (
              // SLOT KOSONG AGAR POSISI PAGINATION TETAP
              <div
                key={`empty-${index}`}
                aria-hidden="true"
                className="invisible flex min-w-0 flex-col items-center gap-1"
              >
                <div className="aspect-[1.35/1] w-full rounded-[11px]" />

                <span className="h-5 min-w-7.5 sm:h-6 sm:min-w-9">
                  &nbsp;
                </span>
              </div>
            ),
          )}
        </section>

        {/* ================================= */}
        {/* PAGINATION */}
        {/* ================================= */}

        <nav
          aria-label="Pagination abjad"
          className="mt-3 flex items-center justify-center gap-1.5 sm:mt-5"
        >
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                aria-label={`Halaman ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className={`flex h-6 w-8 items-center justify-center rounded-full border text-[9px] font-medium transition duration-200 active:scale-95 sm:h-9 sm:w-10 sm:text-sm ${
                  currentPage === page
                    ? "border-[#278477] bg-[#278477] text-white"
                    : "border-[#278477] bg-transparent text-[#278477] hover:bg-[#e3f0eb]"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </nav>
      </main>
    </div>
  );
}
