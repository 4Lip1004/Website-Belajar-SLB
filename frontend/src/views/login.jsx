
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [isChanging, setIsChanging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    nis: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    nis: "",
    nama: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const changeMode = (newMode) => {
    if (mode === newMode || isChanging) return;
    setIsChanging(true);
    setTimeout(() => {
      setMode(newMode);
      setIsChanging(false);
    }, 250);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const registeredUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    );
    const user = registeredUsers.find(
      (item) =>
        item.nis === loginData.nis.trim() &&
        item.password === loginData.password
    );
    if (!user) {
      setErrorMessage(
        "NIS atau password salah. Silakan daftar terlebih dahulu jika belum memiliki akun."
      );
      return;
    }
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        nis: user.nis,
        nama: user.nama,
      })
    );
    setSuccessMessage(
      "Login berhasil! Mengalihkan halaman..."
    );
    setIsExiting(true);
    setTimeout(() => {
      navigate("/beranda", { replace: true });
    }, 800);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage("Konfirmasi password tidak sama!");
      return;
    }
    const registeredUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    );
    const existingUser = registeredUsers.find(
      (user) => user.nis === registerData.nis.trim()
    );
    if (existingUser) {
      setErrorMessage(
        "NIS sudah terdaftar. Silakan gunakan NIS lain."
      );
      return;
    }
    const newUser = {
      nis: registerData.nis.trim(),
      nama: registerData.nama.trim(),
      password: registerData.password,
    };
    localStorage.setItem(
      "users",
      JSON.stringify([...registeredUsers, newUser])
    );
    setSuccessMessage(
      "Pendaftaran berhasil! Silakan masuk."
    );
    setTimeout(() => {
      setRegisterData({
        nis: "",
        nama: "",
        password: "",
        confirmPassword: "",
      });
      setSuccessMessage("");
      setMode("login");
    }, 1000);
  };

  return (
    <div
      className={`landing-page relative min-h-dvh w-full overflow-x-hidden bg-[#fffaf0] font-sans text-[#194c45] ${isExiting ? "page-exit" : "page-enter"
        }`}
    >

      {/* dekorasi */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#cce9df]/40 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#f7e7b8]/40 blur-3xl" />
        <div className="absolute left-[12%] top-[18%] h-12 w-12 rounded-full border-2 border-[#298477]/20 animate-[bounce_5s_ease-in-out_infinite]" />
        <div className="absolute right-[10%] top-[15%] h-16 w-16 rounded-full border-4 border-[#f3c969]/50 animate-pulse" />
        <span className="absolute left-[45%] top-[20%] text-2xl text-[#e8b94f] animate-pulse">
          ✦
        </span>
        <span className="absolute bottom-[15%] left-[10%] text-2xl text-[#e8b94f] animate-pulse">
          ✧
        </span>
      </div>

      {/* main */}
      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl items-center justify-center px-6 py-10 md:px-10">
        <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-5">

          {/* ilustrasi */}
          <section
            className={`order-2 flex items-center justify-center transition-all duration-1000 ease-out md:order-1 ${isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-16 opacity-0"
              }`}
          >
            <img
              src="https://res.cloudinary.com/yzlryyr3/image/upload/v1795358969/Analysis_output_1_1_1.png"
              alt="Ilustrasi anak sedang menunjuk"
              className="h-auto w-full max-w-70ct-contain drop-shadow-sm sm:masm:max-w-87.5ax-w-[530px] md:scale-105"
            />
          </section>

          {/* form */}
          <section className="order-1 flex items-center justify-center md:order-2">
            <div
              className={`w-full max-w-92.5 rounded-[26px] border border-[#298477] bg-[#e9f3e8] px-6 py-9 shadow-[0_10px_35px_rgba(25,76,69,0.06)] transition-all duration-300 ease-out sm:px-8 ${isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
                } ${isChanging
                  ? "scale-[0.97] translate-y-3 opacity-0"
                  : "scale-100 opacity-100"
                }`}
            >
              <div className="mb-7 text-center">
                <h1 className="text-[26px] font-extrabold tracking-tight text-[#194c45] transition-all duration-300">
                  {mode === "login" ? "Masuk" : "Buat Akun"}
                </h1>
                <p className="mt-1 text-sm text-[#66847d]">
                  {mode === "login"
                    ? "Selamat datang kembali!"
                    : "Daftarkan akun belajar kamu"}
                </p>
              </div>
              {errorMessage && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600 animate-pulse">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700">
                  {successMessage}
                </div>
              )}

              {/* login */}
              {mode === "login" && (
                <form
                  key="login"
                  onSubmit={handleLogin}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="text"
                    placeholder="Masukkan NIS"
                    value={loginData.nis}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        nis: e.target.value,
                      })
                    }
                    required
                    className="h-12.5 w-full rounded-[17px] border border-[#b8d5cc] bg-white/50 px-5 text-sm font-medium text-[#194c45] outline-none transition-all duration-300 placeholder:text-[#bdcec8] hover:border-[#298477] focus:border-[#298477] focus:bg-white focus:ring-4 focus:ring-[#298477]/10"
                  />

                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        })
                      }
                      required
                      className="h-12.5 w-full rounded-[17px] border border-[#b8d5cc] bg-white/50 px-5 pr-12 text-sm font-medium text-[#194c45] outline-none transition-all duration-300 placeholder:text-[#bdcec8] hover:border-[#298477] focus:border-[#298477] focus:bg-white focus:ring-4 focus:ring-[#298477]/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#66847d] hover:text-[#298477]"
                      aria-label={showLoginPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                      {showLoginPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 3l18 18" />
                          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                          <path d="M9.9 5.2A10.5 10.5 0 0 1 12 5c5 0 9 5 9 7a11.5 11.5 0 0 1-3 3.8" />
                          <path d="M6.2 6.2C3.9 7.7 2 10.2 2 12c0 2 4 7 10 7a10 10 0 0 0 4-.8" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="group relative mt-4 h-12.5 w-full overflow-hidden rounded-2xl border border-[#194c45] bg-[#298477] text-[15px] font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#206d62] hover:shadow-lg active:scale-[0.97]"
                  >
                    <span className="relative z-10">
                      Masuk
                    </span>
                  </button>

                </form>
              )}

              {/* regist */}
              {mode === "register" && (
                <form
                  key="register"
                  onSubmit={handleRegister}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="text"
                    placeholder="Masukkan NIS"
                    value={registerData.nis}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        nis: e.target.value,
                      })
                    }
                    required
                    className="h-12 w-full rounded-2xl border border-[#b8d5cc] bg-white/50 px-5 text-sm text-[#194c45] outline-none transition-all duration-300 placeholder:text-[#bdcec8] focus:border-[#298477] focus:bg-white focus:ring-4 focus:ring-[#298477]/10"
                  />
                  <input
                    type="text"
                    placeholder="Nama lengkap"
                    value={registerData.nama}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        nama: e.target.value,
                      })
                    }
                    required
                    className="h-12 w-full rounded-2xl border border-[#b8d5cc] bg-white/50 px-5 text-sm text-[#194c45] outline-none transition-all duration-300 placeholder:text-[#bdcec8] focus:border-[#298477] focus:bg-white focus:ring-4 focus:ring-[#298477]/10"
                  />
                  <div className="relative">
                    <input
                      type={showRegisterPassword ? "text" : "password"}
                      placeholder="Buat password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      required
                      minLength={6}
                      className="h-12 w-full rounded-2xl border border-[#b8d5cc] bg-white/50 px-5 pr-12 text-sm text-[#194c45] outline-none transition-all duration-300 placeholder:text-[#bdcec8] focus:border-[#298477] focus:bg-white focus:ring-4 focus:ring-[#298477]/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#66847d] hover:text-[#298477]"
                      aria-label={showRegisterPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                      {showRegisterPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 3l18 18" />
                          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                          <path d="M9.9 5.2A10.5 10.5 0 0 1 12 5c5 0 9 5 9 7a11.5 11.5 0 0 1-3 3.8" />
                          <path d="M6.2 6.2C3.9 7.7 2 10.2 2 12c0 2 4 7 10 7a10 10 0 0 0 4-.8" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Konfirmasi password"
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                      minLength={6}
                      className="h-12 w-full rounded-2xl border border-[#b8d5cc] bg-white/50 px-5 pr-12 text-sm text-[#194c45] outline-none transition-all duration-300 placeholder:text-[#bdcec8] focus:border-[#298477] focus:bg-white focus:ring-4 focus:ring-[#298477]/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#66847d] hover:text-[#298477]"
                      aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                      {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 3l18 18" />
                          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                          <path d="M9.9 5.2A10.5 10.5 0 0 1 12 5c5 0 9 5 9 7a11.5 11.5 0 0 1-3 3.8" />
                          <path d="M6.2 6.2C3.9 7.7 2 10.2 2 12c0 2 4 7 10 7a10 10 0 0 0 4-.8" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="mt-3 h-12.5 w-full rounded-2xl border border-[#194c45] bg-[#298477] text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#206d62] hover:shadow-lg active:scale-[0.97]"
                  >
                    Daftar Sekarang
                  </button>

                </form>
              )}

              {/* ganti mode */}
              <div className="mt-5 text-center text-[13px] text-[#263b38]">
                {mode === "login" ? (
                  <p>
                    Belum memiliki akun?{" "}
                    <button
                      type="button"
                      disabled={isChanging}
                      onClick={() => changeMode("register")}
                      className="font-bold text-[#194c45] transition-colors duration-200 hover:text-[#298477]"
                    >
                      Buat akun
                    </button>
                  </p>
                ) : (
                  <p>
                    Sudah memiliki akun?{" "}
                    <button
                      type="button"
                      disabled={isChanging}
                      onClick={() => changeMode("login")}
                      className="font-bold text-[#194c45] transition-colors duration-200 hover:text-[#298477]"
                    >
                      Masuk
                    </button>
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
