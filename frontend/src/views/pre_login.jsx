
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PreLogin() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const navigate = useNavigate();


  const handleStart = () => {
    if (isFadingOut) return;

    setIsFadingOut(true);

    setTimeout(() => {
      navigate("/login");
    }, 900);
  };

  return (
    <div
      className={`landing-page relative min-h-screen overflow-x-hidden bg-[#fffaf0] font-sans text-[#194c45] ${isFadingOut ? "page-exit" : "page-enter"
        }`}
    >

      <main className="relative z-10 flex min-h-[calc(100svh-62px)] items-center px-6 py-10 md:px-10 ">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center md:grid-cols-2">

          {/* BAGIAN KIRI */}
          <section className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left ms-10 -mt-20">

            <div className="space-y-1">
              <p className="text-2xl font-bold leading-tight text-[#194c45] md:text-[40px] animate-text">
                Selamat datang di!
              </p>

              <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-[#194c45] sm:text-5xl lg:text-[50px] animate-title">
                SLB-B Negeri
                <span className="block text-[#298477]">
                  Karya Mulia Surabaya
                </span>
              </h1>
            </div>

            <p className="mt-5 max-w-87.5 text-base font-medium leading-relaxed text-[#194c45] md:text-lg animate-description">
              Mari belajar kosakata dengan
              <br />
              bahasa isyarat.
            </p>

            <button
              type="button"
              onClick={handleStart}
              disabled={isFadingOut}
              className="start-button group mt-6 inline-flex items-center justify-center gap-5 rounded-full bg-[#298477] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#298477]/20 md:text-lg animate-button"
            >
              <span>
                {isFadingOut ? "Memulai..." : "Mulai Belajar"}
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-2"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </section>

          {/* BAGIAN KANAN */}
          <section className="relative mt-8 flex items-center justify-center md:mt-0 md:min-h-full">
            {/* Lingkaran dekoratif di belakang gambar */}
            <div className="illustration-glow" />

            <div className="absolute right-10 top-10 z-0 h-16 w-16 rounded-full border-[5px] border-[#f3c969]/70 animate-ring" />

            <img
              src="https://res.cloudinary.com/yzlryyr3/image/upload/v1795358969/Cheerful_Schoolboy_Pointing_Up_1.png"
              alt="Ilustrasi anak sedang belajar bahasa isyarat"
              className="illustration relative z-10 block h-auto w-full max-w-97.5 object-contain md:max-w-150 md:-me-20"
            />

            <span className="image-sparkle image-sparkle-one">✦</span>
            <span className="image-sparkle image-sparkle-two">✧</span>
            <span className="image-sparkle image-sparkle-three">✦</span>

          </section>

        </div>
      </main>
    </div>
  );
}

