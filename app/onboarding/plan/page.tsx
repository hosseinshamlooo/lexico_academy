"use client";

import { useState } from "react";
import DashboardHeader from "@/app/components/DashboardHeader";
import ProgressBarOnboarding from "@/app/components/ProgressBarOnboarding";
import OnboardingContinueButton from "@/app/components/OnboardingContinueButton";

const planOptions = [
  { value: "15", label: "15 min / day", tag: "Casual" },
  { value: "30", label: "30 min / day", tag: "Regular" },
  { value: "45", label: "45 min / day", tag: "Serious" },
  { value: "60", label: "1 hr+ / day", tag: "Intense" },
];

export default function PagePlanOnboarding() {
  const [selected, setSelected] = useState<string | null>(null);

  // Example motivational text (could be dynamic)
  const motivation = selected
    ? `With ${planOptions
        .find((o) => o.value === selected)
        ?.label.replace(
          " / day",
          ""
        )} a day, you could boost your score by 1.5 bands by your test date!`
    : "With 30 mins a day, you could boost your score by 1.5 bands by your test date!";

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex flex-col items-center w-full max-w-xl mx-auto px-4 py-8 flex-1">
        <ProgressBarOnboarding step={5} total={5} />
        <div className="w-full bg-white p-8 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1D5554] text-center tracking-tight whitespace-nowrap mt-8">
            Learning Plan
          </h1>
          <p className="text-2xl text-gray-600 mb-10 mt-8 text-center font-bold tracking-tighter">
            Build your daily habit and see your progress!
          </p>
          <div className="w-full flex flex-col items-center mb-8">
            <div className="text-2xl font-bold tracking-tight text-gray-800 text-center mb-6">
              What&apos;s your daily learning goal?
            </div>
            <div className="flex flex-col gap-4 w-full max-w-lg">
              {planOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelected(opt.value)}
                  className={`flex items-center justify-between px-8 py-5 rounded-2xl border-2 transition-all duration-200 font-bold text-xl shadow-sm w-full text-left
                    ${
                      selected === opt.value
                        ? "border-[#1D5554] bg-[#D9F061]/80 text-[#1D5554]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#1D5554] hover:bg-[#D9F061]/40"
                    }
                  `}
                  aria-pressed={selected === opt.value}
                >
                  <span className="font-semibold">{opt.label}</span>
                  <span className="text-lg font-bold text-gray-400 ml-8">
                    {opt.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col items-center mb-8">
            <div className="text-xl md:text-2xl font-bold text-[#1D5554] text-center bg-[#D9F061]/60 rounded-xl px-6 py-4 shadow mt-2">
              {motivation}
            </div>
          </div>
          <OnboardingContinueButton onClick={() => {}} disabled={!selected}>
            Let&apos;s get started!
          </OnboardingContinueButton>
        </div>
      </main>
    </div>
  );
}
