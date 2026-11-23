
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // Deteksi halaman pembelajaran
  const learningPages = ["/materi", "/abjad", "/latihan"];

  const isLearningPage = learningPages.some(
    (path) =>
      location.pathname === path ||
      location.pathname.startsWith(path + "/")
  );

  const navLinkClass = (path) =>
    `text-sm font-medium transition-colors duration-200 ${location.pathname === path
      ? "text-[#194c45] font-bold"
      : "text-[#263b38] hover:text-[#298477]"
    }`;

  return (
    <nav className="relative z-50 flex h-12.5 w-full items-center justify-between border-b border-[#e7e3d9] bg-white px-6 md:px-8.5">

      {/* Logo dan Nama */}
      <Link
        to="/beranda"
        className="text-lg font-bold tracking-tight text-[#194c45]"
      >
        SLB-B Negeri Karya Mulia Surabaya
      </Link>

      {/* NAVBAR KONDISIONAL */}

      {isLearningPage ? (

        /* NAVBAR HALAMAN PEMBELAJARAN */
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-5">

          <Link to="/abjad" className={navLinkClass("/abjad")}>
            Abjad
          </Link>

          <Link to="/materi" className={navLinkClass("/materi")}>
            Materi
          </Link>

          <Link to="/latihan" className={navLinkClass("/latihan")}>
            Latihan
          </Link>

        </div>

      ) : (

        /* NAVBAR HALAMAN UTAMA */
        <div className="flex items-center gap-5">

          <Link to="/beranda" className={navLinkClass("/beranda")}>
            Beranda
          </Link>

          <Link to="/profil" className={navLinkClass("/profil")}>
            Profil
          </Link>

        </div>

      )}

    </nav>
  );
}
