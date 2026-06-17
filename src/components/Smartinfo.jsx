import React from "react";
import { FiArrowRight } from "react-icons/fi";

const SmartSaveLogo = ({ className = "h-10 w-40" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 320 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Smart Save"
      role="img"
    >
      <circle cx="40" cy="40" r="28" fill="#00D492" />

      <path
        d="M28 46L40 34L49 43L58 24"
        stroke="white"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M52 24H60V32"
        stroke="white"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />

      <text
        x="85"
        y="38"
        fontSize="18"
        fontFamily="Inter, Arial"
        fontWeight="500"
        fill="#64748B"
      >
        Smart
      </text>

      <text
        x="85"
        y="58"
        fontSize="30"
        fontFamily="Inter, Arial"
        fontWeight="800"
        fill="#0F172A"
      >
        Save
      </text>
    </svg>
  );
};

const Smartinfo = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="grid min-h-screen overflow-hidden lg:grid-cols-[37%_63%]">
        <aside className="relative flex min-h-[46vh] flex-col justify-between bg-black px-6 py-8 sm:px-10 lg:min-h-screen lg:px-14 lg:py-12">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-40 place-items-center rounded-2xl bg-white shadow-[0_0_40px_rgba(52,211,153,0.35)]">
              <SmartSaveLogo className="h-10 w-40" />
            </div>
            <h1 className="text-3xl font-black tracking-normal sm:text-4xl">
              Goals
            </h1>
          </div>

          <div className="mx-auto flex w-full max-w-md flex-1 items-center justify-center py-10">
            <div className="relative aspect-square w-full max-w-[320px]">
              <div className="absolute inset-6 rounded-full border border-emerald-300/20" />
              <div className="absolute inset-12 rounded-full border border-white/10" />
              <div className="absolute left-1/2 top-1/2 grid h-32 w-52 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl bg-white shadow-[0_0_70px_rgba(52,211,153,0.38)]">
                <SmartSaveLogo className="h-14 w-48" />
              </div>
              <div className="absolute right-4 top-10 rounded-full bg-white px-4 py-2 text-sm font-bold text-black">
                1 Goal
              </div>
              <div className="absolute bottom-9 left-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                Focus mode
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-12 rounded-full bg-emerald-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/45" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/45" />
          </div>
        </aside>

        <section className="flex items-center bg-white px-6 py-12 text-slate-950 sm:px-10 lg:px-20">
          <div className="mx-auto w-full max-w-2xl ml-[5rem]">
            <div className="mb-10 inline-grid h-14 w-40 place-items-center rounded-2xl bg-emerald-50">
              <SmartSaveLogo className="h-10 w-36" />
            </div>

            <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-emerald-600">
                  Smart saving
                </p>
                <h2
                  className="max-w-none tracking-normal lg:whitespace-nowrap"
                  style={{
                    color: "oklch(0.279 0.041 260.031)",
                    fontFamily:
                      'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    fontSize: "28px",
                    fontWeight: 700,
                    lineHeight: "35.75px",
                  }}
                >
                  Save With Purpose, Achieve With <br></br>Confidence.
                </h2>
              </div>

              <div className="hidden h-28 w-28 place-items-center rounded-full border border-slate-200 lg:grid">
                <span className="h-16 w-16 rounded-full bg-emerald-400 shadow-[0_18px_45px_rgba(16,185,129,0.3)]" />
              </div>
            </div>

            <p
              className="mt-8 max-w-xl"
              style={{
                color: "oklch(0.554 0.046 257.417)",
                fontFamily:
                  'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                fontSize: "13.5px",
                fontWeight: 400,
                lineHeight: "21.9375px",
              }}
            >
              Turn your financial goals into achievable milestones. Smart Save
              helps you focus on a single savings target at a time, giving you a
              clear path forward, better control of your money, and the
              confidence to reach your goals faster.
            </p>

            <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
              <button
                type="button"
                className="group flex h-16 w-1/3 items-center justify-center rounded-2xl bg-emerald-400 px-8 text-lg font-bold text-black shadow-[0_16px_45px_rgba(52,211,153,0.28)] transition hover:bg-emerald-300 sm:max-w-sm"
                aria-label="Continue"
              >
                <FiArrowRight className="text-2xl transition group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                className="h-16 rounded-2xl px-6 text-lg font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              >
                Skip
              </button>
            </div>

            <div className="mt-11 flex items-center gap-3">
              <span className="h-1.5 w-12 rounded-full bg-emerald-400" />
              <span className="h-2 w-2 rounded-full bg-slate-300" />
              <span className="h-2 w-2 rounded-full bg-slate-300" />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Smartinfo;
