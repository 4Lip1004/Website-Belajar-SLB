import { Link, useSearchParams } from "react-router-dom";

const videoUrls = {
  A: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337688/A.mp4",
  B: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337687/B.mp4",
  C: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337688/C.mp4",
  D: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337689/D.mp4",
  E: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337689/E.mp4",
  F: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337693/F.mp4",
  G: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337689/G.mp4",
  H: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337690/H.mp4",
  I: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337690/I.mp4",
  J: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337690/J.mp4",
  K: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337693/K.mp4",
  L: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337691/L.mp4",
  M: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337689/M.mov",
  N: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337687/N.mp4",
  O: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337693/O.mp4",
  P: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337689/P.mp4",
  Q: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337690/Q.mp4",
  R: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337692/R.mp4",
  S: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337695/S.mp4",
  T: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337692/T.mp4",
  U: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337693/U.mp4",
  V: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337692/V.mp4",
  W: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337693/W.mp4",
  X: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337692/X.mp4",
  Y: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337694/Y.mp4",
  Z: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337694/Z.mp4",
};

// =====================================
// DAFTAR HURUF
// =====================================

const abjadList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// =====================================
// KOMPONEN DETAIL ABJAD
// =====================================

export default function DetailAbjad() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Mengambil huruf dari URL
  const selectedLetter = (searchParams.get("huruf") || "A").toUpperCase();

  // Memastikan huruf valid
  const currentIndex = abjadList.includes(selectedLetter)
    ? abjadList.indexOf(selectedLetter)
    : 0;

  const currentLetter = abjadList[currentIndex];

  // URL video berdasarkan huruf
  const currentVideo = videoUrls[currentLetter];

  // =====================================
  // FUNGSI NAVIGASI
  // =====================================

  const handlePrevious = () => {
    const previousIndex =
      (currentIndex - 1 + abjadList.length) % abjadList.length;

    setSearchParams({
      huruf: abjadList[previousIndex],
    });
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % abjadList.length;

    setSearchParams({
      huruf: abjadList[nextIndex],
    });
  };

  // =====================================
  // TAMPILAN
  // =====================================

  return (
    <div className="flex min-h-screen flex-col bg-[#fff9ef] font-sans">
      <main className="relative flex min-h-[calc(100vh-48px)] flex-1 flex-col">
        {/* ================================= */}
        {/* TOMBOL KEMBALI */}
        {/* ================================= */}

        <div className="absolute right-5 top-3 z-10 sm:right-8">
          <Link
            to="/abjad"
            className="flex items-center justify-center gap-2 rounded-full bg-[#278477] px-3 py-1.5 text-[10px] font-medium text-white transition hover:bg-[#1c6b60] active:scale-95 sm:px-5 sm:py-2 sm:text-[15px]"
          >
            <span className="me-2">‹</span>
            Kembali
          </Link>
        </div>

        {/* ================================= */}
        {/* KONTEN DETAIL */}
        {/* ================================= */}

        <section className="flex flex-1 items-center justify-center px-3">
          <div className="grid w-full max-w-160 -translate-y-10 sm:-translate-y-20 grid-cols-[34px_minmax(0,1fr)_34px] items-center gap-2 sm:grid-cols-[40px_minmax(0,1fr)_40px] sm:gap-4">
            {/* TOMBOL SEBELUMNYA */}
            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Huruf sebelumnya"
              className="flex size-8 items-center justify-center rounded-full bg-[#f8d568] text-[#174d45] transition hover:bg-[#edc44c] active:scale-90 sm:size-10 -ml-15"
            >
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {/* KARTU ABJAD */}
            <div className="mx-auto flex aspect-[1.52/1] w-full max-w-200 flex-col items-center rounded-2xl border border-[#87948e] bg-white px-3 pt-2 shadow-[0_2px_3px_rgba(0,0,0,0.15)] sm:pt-3">
              <h1
                key={currentLetter}
                className="text-[29px] font-bold leading-tight text-[#278477] sm:text-[36px]"
              >
                {currentLetter}
              </h1>

              {/* VIDEO */}
              <div
                key={`media-${currentLetter}`}
                className="mt-2 flex aspect-[1.45/1] w-[65%] max-w-200 items-center justify-center overflow-hidden rounded-2xl border border-[#87948e] bg-[#e8f1ef] shadow-[0_2px_3px_rgba(0,0,0,0.2)]"
              >
                {currentVideo && (
                  <video
                    key={currentVideo}
                    src={currentVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    controls={false}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* TOMBOL SELANJUTNYA */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Huruf berikutnya"
              className="flex size-8 items-center justify-center rounded-full bg-[#f8d568] text-[#174d45] transition hover:bg-[#edc44c] active:scale-90 sm:size-10 ml-15"
            >
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
