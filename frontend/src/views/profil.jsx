
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profil() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("loggedInUser"));
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { replace: true });
      return;
    }

    const frame = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const handleChangePassword = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (newPassword.length < 6) {
      setErrorMessage("Password minimal 6 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Konfirmasi password tidak sama!");
      return;
    }
    try {
      const registeredUsers = JSON.parse(
        localStorage.getItem("dummyUsers") || "[]"
      );
      const userIndex = registeredUsers.findIndex(
        (user) => user.nis === currentUser.nis
      );
      if (userIndex !== -1) {
        registeredUsers[userIndex] = {
          ...registeredUsers[userIndex],
          password: newPassword,
        };
        localStorage.setItem(
          "dummyUsers",
          JSON.stringify(registeredUsers)
        );
      } else {
        const passwordOverrides = JSON.parse(
          localStorage.getItem("passwordOverrides") || "{}"
        );
        passwordOverrides[currentUser.nis] = newPassword;
        localStorage.setItem(
          "passwordOverrides",
          JSON.stringify(passwordOverrides)
        );
      }
      setSuccessMessage("Password berhasil diperbarui!");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setErrorMessage("Gagal menyimpan password.");
    }
  };
  const entrance = (visibleClass, hiddenClass) =>
    `${visibleClass} ${isVisible ? "opacity-100" : hiddenClass
    } motion-reduce:transition-none`;

  return (
    <main className="relative min-h-[calc(100vh-50px)] overflow-hidden bg-[#fffaf0] px-5 py-8 font-sans text-[#194c45] sm:px-8 md:px-10">

      <div className="relative z-10 mx-auto w-full max-w-7xl">

        {/* header */}
        <div
          className={`mb-5 grid grid-cols-3 items-center gap-2 transition-opacity duration-500 motion-reduce:transition-none ${isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => navigate("/beranda")}
              className="inline-flex items-center gap-2 rounded-full bg-[#298477] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#206d62] active:bg-[#194c45]"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Kembali
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-extrabold sm:text-2xl">
              Profil Saya
            </h1>
            <p className="mt-1 hidden text-xs sm:block sm:text-sm">
              Informasi akun dan pengaturan profil.
            </p>
          </div>
          {/* <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/beranda")}
              className="inline-flex items-center gap-2 rounded-full bg-[#298477] px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#206d62] active:bg-[#194c45] sm:px-4 sm:text-sm"
            >
              Lanjut belajar
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div> */}
        </div>

        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_1fr] md:gap-2 lg:gap-4">

          {/* kiri */}
          <section className="mx-auto flex w-200 max-w-130 flex-col gap-4 ms-30 -mt-20">
            <div
              className={`rounded-[15px] border border-[#71847b] bg-white px-5 py-3 shadow-[1px_3px_5px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out delay-100 motion-reduce:transition-none ${isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
                }`}
            >
              <div className="flex min-h-16.5 items-center gap-4">
                <div className="flex h-16.25 w-16.25 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f5f3e9]">
                  <img
                    src="https://res.cloudinary.com/yzlryyr3/image/upload/v1795359000/Analysis_output_1_2.png"
                    alt="Avatar siswa"
                    className="h-full w-full object-contain"
                  />
                </div>
                {/* INFORMASI SISWA */}
                <div className="grid grid-cols-[55px_10px_1fr] gap-y-1 text-xs sm:text-sm">
                  <span className="font-bold">Nama</span>
                  <span>:</span>
                  <span className="font-medium">
                    {currentUser?.nama || "Muhammad"}
                  </span>
                  <span className="font-bold">Kelas</span>
                  <span>:</span>
                  <span className="font-medium">
                    {currentUser?.kelas || "1 SDLB"}
                  </span>
                  <span className="font-bold">Sekolah</span>
                  <span>:</span>
                  <span className="font-medium">
                    {currentUser?.sekolah || "SDLB"}
                  </span>
                  <span className="font-bold">Materi</span>
                  <span>:</span>
                  <span className="font-medium">
                    {currentUser?.materi || "Kosakata Bahasa Indonesia"}
                  </span>
                </div>
              </div>
            </div>

            {/* form */}
            <div
              className={`rounded-[15px] border border-[#71847b] bg-white px-5 py-4 shadow-[1px_3px_5px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out delay-200 motion-reduce:transition-none sm:px-8 ${isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
                }`}
            >
              <h2 className="mb-4 text-center text-lg font-extrabold sm:text-xl">
                Ubah Password
              </h2>
              <form
                onSubmit={handleChangePassword}
                className="flex flex-col gap-2"
              >
                <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[88px_1fr]">
                  <label className="text-xs font-bold sm:text-sm">
                    Ubah Password
                  </label>
                  <input
                    type="password"
                    placeholder="Masukkan password baru"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="h-9.75 w-full rounded-[10px] border border-[#b8d5cc] bg-[#eaf2ef] px-3 text-xs outline-none transition-colors duration-200 placeholder:text-[#83938d] focus:border-[#298477] focus:bg-white focus:ring-2 focus:ring-[#298477]/10"
                  />
                </div>
                <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[88px_1fr]">
                  <label className="text-xs font-bold sm:text-sm">
                    Konfirmasi
                  </label>
                  <input
                    type="password"
                    placeholder="Konfirmasi password baru"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="h-9.75 w-full rounded-[10px] border border-[#b8d5cc] bg-[#eaf2ef] px-3 text-xs outline-none transition-colors duration-200 placeholder:text-[#83938d] focus:border-[#298477] focus:bg-white focus:ring-2 focus:ring-[#298477]/10"
                  />
                </div>
                {errorMessage && (
                  <p
                    role="alert"
                    className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600"
                  >
                    {errorMessage}
                  </p>
                )}
                {successMessage && (
                  <p
                    role="status"
                    className="rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700"
                  >
                    ✓ {successMessage}
                  </p>
                )}
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-xl bg-[#929292] px-4 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#298477] active:bg-[#206d62] sm:px-5 sm:py-2.5 sm:text-sm"
                  >
                    Simpan perubahan
                  </button>
                </div>
              </form>
            </div>
          </section>


          {/* kanan */}
          <section
            className={`-mt-18 -ms-30 relative flex min-h-125 w-full items-center justify-center overflow-visible transition-all duration-700 ease-out delay-200 motion-reduce:transition-none ${isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-4 opacity-0"
              }`}
          >
            <img
              src="https://res.cloudinary.com/yzlryyr3/image/upload/v1795359000/Analysis_output_1_2.png"
              alt="Ilustrasi anak"
              className="relative z-10 h-auto w-180 max-w-500 object-contain md:max-w-500 lg:max-w-500"
            />
          </section>

        </div>
      </div>

    </main>
  );
}
