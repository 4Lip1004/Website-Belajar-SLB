
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    type: "image",
    media: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795273818/Frame_18.png",
    question: "Apa nama benda tersebut?",
    options: [
      { id: "A", text: "Buku" },
      { id: "B", text: "Papan Tulis" },
      { id: "C", text: "Meja" },
      { id: "D", text: "Penghapus" },
    ],
    answer: "A",
    explanation: "Gambar tersebut menunjukkan sebuah buku.",
  },
  {
    id: 2,
    type: "video",
    media: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337689/G.mp4",
    question: "Pilih huruf dengan isyarat?",
    options: [
      { id: "A", text: "Huruf Z" },
      { id: "B", text: "Huruf D" },
      { id: "C", text: "Huruf G" },
      { id: "D", text: "Huruf J" },
    ],
    answer: "C",
    explanation: "Hebat! Gerakan tersebut merupakan bahasa isyarat Terima Kasih.",
  },
  {
    id: 3,
    type: "video",
    media: "https://res.cloudinary.com/yzlryyr3/video/upload/v1795337692/R.mp4",
    question: "Pilih huruf dengan isyarat?",
    options: [
      { id: "A", text: "Huruf A" },
      { id: "B", text: "Huruf R" },
      { id: "C", text: "Huruf Z" },
      { id: "D", text: "Huruf K" },
    ],
    answer: "B",
    explanation: "Betul! Benda tersebut adalah meja.",
  },
  {
    id: 4,
    type: "image",
    media: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795359325/Frame_21.png",
    question: "Apa nama benda tersebut?",
    options: [
      { id: "A", text: "Piala" },
      { id: "B", text: "Kalender" },
      { id: "C", text: "Bendera" },
      { id: "D", text: "Laptop" },
    ],
    answer: "C",
    explanation: "Bagus! Gerakan tersebut merupakan isyarat Halo.",
  },
  {
    id: 5,
    type: "image",
    media: "https://res.cloudinary.com/yzlryyr3/image/upload/v1795359324/Frame_21_1.png",
    question: "Apa nama benda tersebut?",
    options: [
      { id: "A", text: "Kursi" },
      { id: "B", text: "Tas" },
      { id: "C", text: "Bola" },
      { id: "D", text: "Piala" },
    ],
    answer: "D",
    explanation: "Bagus! Gerakan tersebut merupakan isyarat Halo.",
  },
];

export default function SoalLatihan() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentIndex];

  const selectedAnswer = answers[currentQuestion.id];

  const isAnswered = selectedAnswer !== undefined;

  // Memilih jawaban
  const handleAnswer = (optionId) => {
    if (isAnswered) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleQuestionChange = (index) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowResult(false);
  };

  const getOptionStyle = (optionId) => {
    if (!isAnswered) {
      return "border-[#b9b9a9] bg-[#fbf1d2] hover:border-[#298477] hover:bg-[#f8e8b4] hover:-translate-y-0.5";
    }
    if (optionId === currentQuestion.answer) {
      return "border-[#238b55] bg-[#d9f4df] text-[#17663a]";
    }
    if (optionId === selectedAnswer) {
      return "border-[#dc5252] bg-[#ffe0e0] text-[#b52d2d]";
    }
    return "border-[#deded5] bg-[#f5f3eb] opacity-60";
  };

  if (showResult) {
    return (
      <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-[#fffaf0] px-5 py-10">
        <div className="w-full max-w-md rounded-[26px] border border-[#687c73] bg-white p-8 text-center shadow-lg">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#e3f4e7]">
            <span className="text-5xl">🏆</span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold text-[#194c45]">
            Latihan Selesai!
          </h1>

          <p className="mt-2 text-[#66847d]">
            Hebat! Kamu sudah menyelesaikan semua soal.
          </p>

          <button
            onClick={handleRestart}
            className="mt-7 w-full rounded-full bg-[#298477] px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-[#206d62] active:scale-95"
          >
            Ulangi Latihan
          </button>

          <button
            onClick={() => navigate("/latihan")}
            className="mt-3 w-full rounded-full border border-[#298477] px-6 py-3.5 font-semibold text-[#298477] transition-colors hover:bg-[#e9f3e8]"
          >
            Kembali ke Latihan
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-[calc(100vh-68px)] overflow-hidden bg-[#fffaf0] px-5 py-7 font-sans text-[#194c45] sm:px-8 md:px-10 md:py-5">

      {/* dekorasi */}
      <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#d8eee3]/40 blur-3xl" />

      {/* header */}
      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4">
        <h1 className="text-lg font-semibold sm:text-xl md:text-[21px]">
          Ayo belajar sambil bermain!
        </h1>
        <button
          onClick={() => navigate("/latihan")}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#298477] px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#206d62] sm:px-6"
        >
          <svg
            width="18"
            height="18"
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

      {/* soal */}
      <section className="relative z-10 mx-auto mt-4 flex w-full max-w-275 flex-col rounded-3xl border-[1.5px] border-[#687c73] bg-white px-4 py-5 shadow-[2px_4px_5px_rgba(0,0,0,0.12)] sm:px-8 md:mt-3 md:min-h-81.75 md:px-10 md:py-5">
        {/* progres soal */}
        {/* <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-[#66847d] sm:text-sm">
            Soal {currentIndex + 1} dari {questions.length}
          </p>
          <p className="text-xs font-semibold text-[#298477] sm:text-sm">
            {Math.round(((currentIndex + 1) / questions.length) * 100)}%
          </p>
        </div>
        <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-[#e8eee9]">
          <div
            className="h-full rounded-full bg-[#298477] transition-all duration-500"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div> */}

        {/* media */}
        <div className="relative mx-auto flex h-36.25 w-full max-w-105 items-center justify-center sm:h-41.25">
          {currentQuestion.type === "image" ? (
            <img
              key={currentQuestion.id}
              src={currentQuestion.media}
              alt="Gambar soal latihan"
              className="h-full w-auto max-w-full rounded-[20px] border border-[#d6d6ca] object-contain shadow-md animate-[fadeIn_0.35s_ease-out]"
            />
          ) : (
            <video
              key={currentQuestion.id}
              src={currentQuestion.media}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              className="h-full w-auto max-w-full rounded-[20px] border border-[#d6d6ca] object-contain shadow-md"
            />
          )}
        </div>

        {/* soal */}
        <h2 className="mb-5 mt-3 text-center text-sm font-semibold text-[#194c45] sm:text-base">
          {currentQuestion.question}
        </h2>

        {/* pilihan jawaban */}
        <div className="mx-auto grid w-full max-w-137.5 grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-x-6">
          {currentQuestion.options.map((option) => {
            const isCorrect = option.id === currentQuestion.answer;
            const isSelected = option.id === selectedAnswer;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleAnswer(option.id)}
                disabled={isAnswered}
                aria-pressed={isSelected}
                className={`group flex min-h-11 items-center gap-2 text-left transition-all duration-200 sm:gap-2.5 ${!isAnswered ? "cursor-pointer" : "cursor-default"
                  }`}
              >
                <span
                  className={`flex h-9.75 w-9.75 shrink-0 items-center justify-center rounded-[11px] border text-lg font-extrabold shadow-sm transition-colors duration-200 ${!isAnswered
                    ? "border-[#b8a66e] bg-[#f5d76e] text-[#194c45]"
                    : isCorrect
                      ? "border-[#238b55] bg-[#238b55] text-white"
                      : isSelected
                        ? "border-[#dc5252] bg-[#dc5252] text-white"
                        : "border-[#deded5] bg-[#f5f3eb] text-[#8c8c80]"
                    }`}
                >
                  {option.id}
                </span>
                <span
                  className={`flex min-h-9.75 flex-1 items-center justify-between rounded-[11px] border px-3 text-xs font-bold shadow-sm transition-all duration-200 sm:text-sm ${getOptionStyle(option.id)
                    }`}
                >
                  <span>{option.text}</span>
                  {isAnswered && isCorrect && (
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 6-12 12M6 6l12 12" />
                    </svg>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* feedback jawaban */}
        {/* {isAnswered && (
          <div
            className={`mx-auto mt-4 w-full max-w-[550px] rounded-xl px-4 py-3 text-center text-sm font-semibold animate-[fadeIn_0.3s_ease-out] ${selectedAnswer === currentQuestion.answer
              ? "bg-[#e0f4e5] text-[#17663a]"
              : "bg-[#ffe5e5] text-[#b52d2d]"
              }`}
            role="status"
            aria-live="polite"
          >
            {selectedAnswer === currentQuestion.answer
              ? "✓ Benar! " + currentQuestion.explanation
              : "✕ Belum tepat. " + currentQuestion.explanation}
          </div>
        )} */}

        {/* pagination */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#eeeeE6] pt-4">

          {/* sebelumnya */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-[#298477] transition-colors hover:bg-[#e9f3e8] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Sebelumnya
          </button>

          {/* nomor soal */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {questions.map((question, index) => {
              const answered = answers[question.id] !== undefined;
              const correct = answers[question.id] === question.answer;
              return (
                <button
                  key={question.id}
                  onClick={() => handleQuestionChange(index)}
                  aria-label={`Buka soal ${index + 1}`}
                  aria-current={currentIndex === index ? "step" : undefined}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all duration-200 sm:h-9 sm:w-9 ${currentIndex === index
                    ? "bg-[#298477] text-white shadow-md"
                    : answered
                      ? correct
                        ? "bg-[#d9f4df] text-[#17663a]"
                        : "bg-[#ffe0e0] text-[#b52d2d]"
                      : "border border-[#d7d7ca] bg-[#fbf1d2] text-[#194c45] hover:bg-[#f5d76e]"
                    }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {/* selanjutnya */}
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="inline-flex items-center gap-1 rounded-full bg-[#298477] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#206d62] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {currentIndex === questions.length - 1
              ? "Selesai"
              : "Selanjutnya"}
            <svg
              width="18"
              height="18"
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
        </div>
      </section>
    </main>
  );
}
