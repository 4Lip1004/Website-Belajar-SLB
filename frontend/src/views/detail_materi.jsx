
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

// =====================================
// DATA GAMBAR DAN VIDEO MATERI
// =====================================

const materiList = [
  {
    id: 1,
    title: "Buku",
    slug: "buku",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795273818/Frame_18.png",
    videoUrl:
      "https://res.cloudinary.com/yzlryyr3/video/upload/v1795274430/BUKU.mp4",
  },
  {
    id: 2,
    title: "Kursi",
    slug: "kursi",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795273908/Frame_18_1.png",
    videoUrl:
      "https://res.cloudinary.com/yzlryyr3/video/upload/v1795280201/KURSI.mp4",
  },
  {
    id: 3,
    title: "Penggaris",
    slug: "penggaris",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795284349/pexels-jef-k-1518692548-29279407_1.png",
    videoUrl:
      "https://res.cloudinary.com/yzlryyr3/video/upload/v1795284602/PENGGARIS_3.mp4",
  },
  {
    id: 4,
    title: "Meja",
    slug: "meja",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795284348/WhatsApp_Image_2026-10-11_at_14.12.41_1.png",
    videoUrl:
      "https://res.cloudinary.com/yzlryyr3/video/upload/v1795283077/MEJA.mp4",
  },
  {
    id: 5,
    title: "Tas",
    slug: "tas",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795284349/Frame_18_2.png",
    videoUrl:
      "https://res.cloudinary.com/yzlryyr3/video/upload/v1795282867/TAS.mp4",
  },
  {
    id: 6,
    title: "Lemari",
    slug: "lemari",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795284348/Frame_18_3.png",
    videoUrl:
      "https://res.cloudinary.com/yzlryyr3/video/upload/v1795283100/Almari.mp4",
  },
  {
    id: 7,
    title: "Jendela",
    slug: "jendela",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795284347/WhatsApp_Image_2026-10-11_at_14.12.43_1.png",
    videoUrl:
      "https://res.cloudinary.com/yzlryyr3/video/upload/v1795283115/JENDELA.mp4",
  },
  {
    id: 8,
    title: "Lampu",
    slug: "lampu",
    image:
      "https://res.cloudinary.com/yzlryyr3/image/upload/v1795284347/Frame_18_4.png",
    videoUrl:
      "https://res.cloudinary.com/yzlryyr3/video/upload/v1795284635/LAMPU_1.mp4",
  },
];

// =====================================
// FUNGSI KONVERSI LINK YOUTUBE
// =====================================

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");

    let videoId = "";

    if (hostname === "youtu.be") {
      videoId = parsedUrl.pathname.split("/")[1];
    } else if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com"
    ) {
      if (parsedUrl.pathname === "/watch") {
        videoId = parsedUrl.searchParams.get("v");
      } else if (
        parsedUrl.pathname.startsWith("/embed/") ||
        parsedUrl.pathname.startsWith("/shorts/")
      ) {
        videoId = parsedUrl.pathname.split("/")[2];
      }
    }

    if (!videoId) return null;

    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      loop: "1",
      playlist: videoId,
      controls: "0",
      rel: "0",
      playsinline: "1",
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  } catch {
    return null;
  }
};

// =====================================
// KOMPONEN DETAIL MATERI
// =====================================

export default function DetailMateri() {

  // =====================================
  // MEMBACA MATERI DARI URL
  // =====================================

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSlug = searchParams.get("materi");

  // Mencari indeks materi berdasarkan URL
  const foundIndex = materiList.findIndex(
    (item) => item.slug === selectedSlug
  );

  // Jika materi tidak ditemukan, tampilkan materi pertama
  const currentIndex = foundIndex >= 0 ? foundIndex : 0;

  // Materi yang sedang aktif
  const currentMateri = materiList[currentIndex];

  // State popup video
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Konversi link YouTube
  const youtubeEmbedUrl = getYouTubeEmbedUrl(
    currentMateri.videoUrl
  );

  // =====================================
  // MENUTUP POPUP DENGAN TOMBOL ESC
  // =====================================

  useEffect(() => {
    if (!isVideoOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleEscape);
    };
  }, [isVideoOpen]);

  // =====================================
  // PAGINATION GAMBAR
  // =====================================

  const handlePrevious = () => {
    const nextIndex =
      (currentIndex - 1 + materiList.length) % materiList.length;

    // Mengubah URL sesuai materi sebelumnya
    setSearchParams(
      { materi: materiList[nextIndex].slug },
      { replace: true }
    );

    setIsVideoOpen(false);
  };

  const handleNext = () => {
    const nextIndex =
      (currentIndex + 1) % materiList.length;

    // Mengubah URL sesuai materi berikutnya
    setSearchParams(
      { materi: materiList[nextIndex].slug },
      { replace: true }
    );

    setIsVideoOpen(false);
  };

  // =====================================
  // TAMPILAN
  // =====================================

  return (
    <div className="min-h-screen bg-[#fff9ef] font-sans">

      <main className="relative mx-auto min-h-[calc(100vh-50px)] w-full max-w-6xl px-4 pt-9 sm:px-8">

        {/* ================================= */}
        {/* TOMBOL KEMBALI */}
        {/* ================================= */}

        <Link
          to="/materi"
          className="absolute right-4 top-9 z-10 flex items-center justify-center gap-2 rounded-full bg-[#278477] px-5 py-2 text-[15px] font-medium text-white transition hover:bg-[#1c6b60] sm:right-8"
        >
          <span className="me-2">‹</span>
          Kembali
        </Link>

        {/* ================================= */}
        {/* CONTENT UTAMA */}
        {/* ================================= */}

        <section className="mx-auto grid w-full max-w-200 grid-cols-[minmax(0,1fr)_100px] items-end gap-2 sm:grid-cols-[minmax(0,1fr)_160px] sm:gap-6">

          {/* ================================= */}
          {/* GALERI MATERI */}
          {/* ================================= */}

          <div className="min-w-0">

            {/* IMAGE SLIDER */}

            <div className="flex w-full items-center justify-between gap-2 sm:gap-4">

              {/* TOMBOL SEBELUMNYA */}

              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Gambar sebelumnya"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f8d568] text-[25px] leading-none text-[#174d45] transition hover:bg-[#edc44c] active:scale-95"
              >
                <span className="-mt-2">‹</span>
              </button>

              {/* GAMBAR MATERI */}

              <div className="aspect-3/2 min-w-0 flex-1 overflow-hidden rounded-2xl border border-[#d4d4c9] bg-white shadow-sm">

                <img
                  key={currentMateri.id}
                  src={currentMateri.image}
                  alt={currentMateri.title}
                  className="h-full w-full object-cover transition-opacity duration-300"
                />

              </div>

              {/* TOMBOL BERIKUTNYA */}

              <button
                type="button"
                onClick={handleNext}
                aria-label="Gambar berikutnya"
                className="relative z-20 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f8d568] text-[25px] leading-none text-[#174d45] transition hover:bg-[#edc44c] active:scale-95"
              >
                <span className="-mt-2">›</span>
              </button>

            </div>

            {/* ================================= */}
            {/* NAMA DAN PAGINATION */}
            {/* ================================= */}

            <div className="mt-3 flex flex-col items-center">

              {/* NAMA MATERI */}

              <div className="rounded-xl bg-[#f8d568] px-4 py-2 text-[20px] font-bold text-[#174d45]">
                {currentMateri.title}
              </div>

              {/* INDIKATOR HALAMAN */}

              <p className="mt-1.5 text-[10px] text-[#78918a]">
                {currentIndex + 1} / {materiList.length}
              </p>

              {/* TOMBOL LIHAT ISYARAT */}

              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="mt-2 flex items-center justify-center rounded-full bg-[#278477] px-5 py-4 text-[15px] font-medium text-white transition hover:bg-[#1c6b60] active:scale-95"
              >
                Lihat Isyarat
              </button>

            </div>

          </div>

          {/* ================================= */}
          {/* ILUSTRASI ANAK */}
          {/* ================================= */}

          <div className="flex w-150 items-end justify-center">

            <img
              src="https://res.cloudinary.com/yzlryyr3/image/upload/v1795273818/Thoughtful_Schoolboy_with_Question_Mark_1_1.png"
              alt="Ilustrasi anak sedang berpikir"
              className="h-auto w-full max-w-35 object-contain sm:max-w-120 -ms-100 -mb-15"
            />

          </div>

        </section>

      </main>

      {/* ===================================== */}
      {/* POPUP VIDEO BAHASA ISYARAT */}
      {/* ===================================== */}

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
        >

          {/* MODAL */}

          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Video bahasa isyarat ${currentMateri.title}`}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-[#fff9ef] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="bg-black">

              {currentMateri.videoUrl ? (

                youtubeEmbedUrl ? (

                  // VIDEO YOUTUBE

                  <iframe
                    key={currentMateri.id}
                    src={youtubeEmbedUrl}
                    title={`Video bahasa isyarat ${currentMateri.title}`}
                    className="aspect-video w-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />

                ) : (

                  // VIDEO MP4 / CLOUDINARY

                  <video
                    key={currentMateri.id}
                    src={currentMateri.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    preload="auto"
                    className="aspect-video w-full object-contain"
                  >
                    Browser kamu tidak mendukung pemutaran video.
                  </video>

                )

              ) : (

                // VIDEO BELUM TERSEDIA

                <div className="flex aspect-video flex-col items-center justify-center bg-[#f7f1e6] px-4 text-center">

                  <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-[#e4eee9] text-2xl text-[#278477]">
                    ▶
                  </div>

                  <h3 className="text-sm font-bold text-[#174d45]">
                    Video Belum Tersedia
                  </h3>

                  <p className="mt-1 text-xs text-[#66817a]">
                    Video bahasa isyarat untuk materi{" "}
                    {currentMateri.title} belum ditambahkan.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
