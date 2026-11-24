
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Semua halaman pembelajaran, termasuk halaman detail
  const learningPages = [
    "/materi",
    "/abjad",
    "/latihan",
    "/latihan-detail",
    "/detail-abjad",
    "/detail-materi",
  ];

  const isLearningPage = learningPages.some(
    (path) =>
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
  );

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login", { replace: true });
  };

  const navLinkClass = (path) => {
    const isActive =
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`);

    return `text-sm font-medium transition-colors duration-200 ${isActive
      ? "font-bold text-[#194c45]"
      : "text-[#263b38] hover:text-[#298477]"
      }`;
  };

  return (
    <nav className="relative z-50 flex h-12.5 w-full items-center justify-between border-b border-[#e7e3d9] bg-white px-6 md:px-8.5">

      {/* Logo dan Nama */}
      <Link
        to="/beranda"
        className="text-lg font-bold tracking-tight text-[#194c45]"
      >
        SLB-B Negeri Karya Mulia Surabaya
      </Link>

      {/* Navbar Kondisional */}
      {isLearningPage ? (
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
        <div className="ml-auto flex items-center gap-5">

          <Link to="/beranda" className={navLinkClass("/beranda")}>
            Beranda
          </Link>

          <Link to="/profil" className={navLinkClass("/profil")}>
            Profil
          </Link>

        </div>
      )}

      {/* Tombol Logout - Selalu Tampil */}
      <button
        type="button"
        onClick={handleLogout}
        className={`rounded-full bg-[#298477] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#206d62] active:scale-95 ${isLearningPage ? "ml-auto" : "ml-5"
          }`}
      >
        Logout
      </button>

    </nav>
  );
}
