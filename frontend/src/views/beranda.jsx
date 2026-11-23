
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuBelajar = [
  {
    title: "Materi",
    description: "Belajar memahami kosakata benda.",
    button: "Belajar sekarang",
    img: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795272966/Belajar_Kosakata_Benda_Ceria_1.png",
    link: "/materi",
  },
  {
    title: "Abjad",
    description: "Belajar huruf A-Z dengan bahasa isyarat.",
    button: "Belajar sekarang",
    img: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795272966/Learn_Alphabet_with_Sign_Language_1.png",
    link: "/abjad",
  },
  {
    title: "Latihan",
    description: "Latihan mengenal kosakata benda.",
    button: "Latihan sekarang",
    img: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795272966/Kartu_Kuis_Edukasi_Ceria_2.png",
    link: "/latihan",
  },
];

export default function Beranda() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleNavigate = (e, link) => {
    e.preventDefault();

    if (isExiting) return;

    setIsExiting(true);

    setTimeout(() => {
      navigate(link);
    }, 900);
  };

  return (
    <div
      className={`landing-page min-h-screen bg-[#fff9ef] font-sans ${isExiting ? "page-exit" : "page-enter"
        }`}
    >
      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl px-6 pt-8 sm:px-8 sm:pt-5">

        {/* Heading */}
        <section className="mb-5">
          <h1 className="text-[23px] font-bold leading-tight text-[#174d45] sm:text-[40px]">
            Ayo mulai belajar!
          </h1>

          <p className="mt-1 text-[14px] text-[#214f49] sm:text-[20px]">
            Pilih salah satu menu di bawah ini
          </p>
        </section>

        {/* Menu Cards */}
        <section className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-3 sm:gap-4">

          {menuBelajar.map((item, index) => (
            <div
              key={index}
              className="flex min-h-42.5 flex-col items-center justify-between rounded-2xl border border-[#999b91] bg-white px-3 py-3 text-center transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Image */}
              <div className="flex h-50 w-full items-center justify-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-50 w-50 object-contain"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col items-center">
                <h2 className="text-[25px] font-bold leading-tight text-[#174d45]">
                  {item.title}
                </h2>

                <p className="mt-1 max-w-32.5 text-[15px] leading-5.75 text-[#31534e]">
                  {item.description}
                </p>
              </div>

              {/* Button */}
              <a
                href={item.link}
                onClick={(e) => handleNavigate(e, item.link)}
                aria-disabled={isExiting}
                className={`mt-3 flex w-full items-center justify-center gap-1 rounded-xl bg-[#278477] px-2 py-5 text-[15px] font-medium text-white transition hover:bg-[#1c6b60] focus:outline-none focus:ring-2 focus:ring-[#278477] focus:ring-offset-2 ${isExiting
                  ? "pointer-events-none"
                  : ""
                  }`}
              >
                {item.button}
                <span className="text-base leading-none">›</span>
              </a>
            </div>
          ))}

        </section>
      </main>
    </div>
  );
}
