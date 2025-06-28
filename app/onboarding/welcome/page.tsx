"use client";

import { useState } from "react";
import DashboardHeader from "@/app/components/DashboardHeader";

// Progress bar component
function ProgressBarOnboarding({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  const percent = (step / total) * 100;
  return (
    <div className="w-full flex justify-center">
      <div className="w-full h-3 bg-gray-200 rounded-full">
        <div
          className="h-3 bg-[#1D5554] transition-all duration-500 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

const options = [
  { label: "Friends/Family", value: "friends-family", icon: "🧑‍🤝‍🧑" },
  { label: "TV", value: "tv", icon: "📺" },
  { label: "YouTube", value: "youtube", icon: "📺" },
  { label: "Instagram/Facebook", value: "instagram-facebook", icon: "📱" },
  { label: "Google Search", value: "google-search", icon: "🌐" },
  { label: "TikTok", value: "tiktok", icon: "🎵" },
  { label: "News, Articles, Blogs", value: "news-articles-blogs", icon: "📰" },
  { label: "Other", value: "other", icon: "✨" },
];

export default function PageWelcomeOnboarding() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex flex-col items-center w-full max-w-xl mx-auto px-4 py-8 flex-1">
        <ProgressBarOnboarding step={1} total={5} />
        <div className="w-full bg-white p-8 flex flex-col items-center animate-pop">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1D5554] text-center tracking-tight whitespace-nowrap mt-8">
            Welcome to Lexico Academy!
          </h1>
          <p className="text-3xl text-gray-600 mb-4 mt-8 text-center font-bold tracking-tighter">
            Let&apos;s tailor your IELTS journey.
          </p>
          <div className="w-full mb-6">
            <div className="text-2xl md:text-2xl font-bold tracking-tight text-gray-800 mb-8 text-center">
              How did you hear about Lexico?
            </div>
            <div className="grid grid-cols-2 gap-x-60 gap-y-6 w-full max-w-4xl mx-auto justify-items-center">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelected(opt.value)}
                  className={`flex items-center gap-3 px-8 py-5 rounded-2xl border-2 transition-all duration-200 font-bold text-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D9F061] focus:border-[#D9F061] bg-white w-[340px] break-words
                    ${
                      selected === opt.value
                        ? "border-[#1D5554] bg-[#D9F061]/80 text-[#1D5554] scale-105 shadow-lg"
                        : "border-gray-200 text-gray-700 hover:border-[#1D5554] hover:bg-[#D9F061]/40"
                    }
                  `}
                  aria-pressed={selected === opt.value}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="flex-1 text-left break-words">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className={`w-[450px] h-[60px] mt-4 btn-lifted-green rounded-xl py-6 text-2xl font-bold transition-all duration-200 mx-auto ${
              !selected ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={!selected}
            // TODO: handle navigation to next onboarding step
          >
            <span className="text-xl">Continue</span>
          </button>
        </div>
      </main>
    </div>
  );
}
