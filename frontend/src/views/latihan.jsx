
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Latihan() {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleNavigate = (path) => {
    if (isLeaving) return;
    setIsLeaving(true);
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  return (
    <div
      className={`relative min-h-[calc(100vh-68px)] overflow-hidden bg-[#fffaf0] font-sans text-[#194c45] transition-all duration-500 ${isLeaving
        ? "translate-y-3 scale-[0.99] opacity-0 blur-sm"
        : "translate-y-0 scale-100 opacity-100 blur-0"
        }`}
    >
      {/* dekorasi */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#d8eee3]/40 blur-3xl" />
        <div className="absolute -bottom-40 left-10 h-80 w-80 rounded-full bg-[#f7e7b8]/30 blur-3xl" />
        <div className="absolute left-[8%] top-[30%] h-12 w-12 rounded-full border-2 border-[#298477]/20 animate-[bounce_5s_ease-in-out_infinite]" />
        <div className="absolute right-[12%] top-[20%] h-16 w-16 rounded-full border-4 border-[#f3c969]/50 animate-[bounce_4s_ease-in-out_infinite]" />
        <span className="absolute left-[42%] top-[20%] text-3xl text-[#e8b94f]/60 animate-pulse">
          ✦
        </span>
        <span className="absolute bottom-[15%] right-[12%] text-2xl text-[#298477]/40 animate-pulse">
          ✧
        </span>
      </div>


      {/* main */}

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-68px)] w-full max-w-7xl flex-col px-6 py-8 md:px-10 md:py-10">
        <div
          className={`flex flex-col gap-5 transition-all duration-700 ease-out sm:flex-row sm:items-start sm:justify-between ${isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
            }`}
        >
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#194c45] sm:text-4xl md:text-[40px]">
              Latihan Interaktif
            </h1>
            <p className="mt-1 text-lg font-medium text-[#194c45] sm:text-xl md:text-[22px]">
              Ayo, kita mulai latihan sekarang!
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleNavigate("/beranda")}
            disabled={isLeaving}
            className="group mx-auto inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#298477] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#206d62] hover:shadow-lg active:scale-95 disabled:opacity-70 sm:mx-0 sm:mt-1 sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path d="m15 18-6-6 6-6" />
            </svg> Kembali
          </button>
        </div>


        {/* card latihan */}
        <div className="grid flex-1 grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-5">

          {/* kiri */}
          <section
            className={` ms-30 relative z-10 flex items-center justify-center transition-all duration-1000 delay-200 ease-out md:justify-start ${isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
              }`}
          >
            <div className="group flex w-full max-w-85 flex-col items-center rounded-3xl border-[1.5px] border-[#687c73] bg-white px-6 py-7 shadow-[2px_4px_5px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(25,76,69,0.12)] sm:max-w-92.5">
              <div className="relative flex h-36.25 w-full items-center justify-center">
                <img
                  src="https://res.cloudinary.com/yzlryyr3/image/upload/v1795359174/Kartu_Kuis_Edukasi_Ceria_1.png"
                  alt="Ilustrasi kuis latihan"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <button
                type="button"
                onClick={() => handleNavigate("/latihan-detail")}
                disabled={isLeaving}
                className="group/button mt-4 inline-flex items-center justify-center gap-3 rounded-full bg-[#298477] px-7 py-3 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#206d62] hover:shadow-lg active:scale-95 disabled:opacity-70"
              >
                Mulai Latihan!
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover/button:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </section>

          {/* kanan */}
          <section
            className={`relative flex items-end justify-center transition-all duration-1000 delay-300 ease-out md:min-h-100 md:justify-end ${isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-16 opacity-0"
              }`}
          >
            <div className="absolute bottom-[10%] right-[5%] h-70 w-70 rounded-full bg-[#d8eee3]/60 blur-3xl sm:h-87.5 sm:w-87.5" />
            <span className="absolute left-[12%] top-[20%] z-10 text-4xl text-[#e8b94f] animate-pulse">
              ✦
            </span>
            <span className="absolute right-[8%] top-[15%] z-10 text-3xl text-[#e8b94f] animate-pulse">
              ✧
            </span>
            <img
              src="https://res.cloudinary.com/yzlryyr3/image/upload/v1795359175/Anak_Sekolah_Ceria_Menunjuk_Ide_1.png"
              alt="Anak sedang memberikan petunjuk belajar"
              className="relative z-10 h-auto w-full max-w-75 origin-bottom object-contain drop-shadow-sm animate-[bounce_4s_ease-in-out_infinite] sm:max-w-95 md:max-w-110 lg:max-w-122.5"
            />
          </section>

        </div>
      </main>
    </div>
  );
}
