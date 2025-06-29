"use client";

import { useState } from "react";
import OnboardingContinueButton from "@/app/components/OnboardingContinueButton";

const planOptions = [
  { value: "30", label: "30 min / day", tag: "Casual" },
  { value: "60", label: "60 min / day", tag: "Regular" },
  { value: "90", label: "90 min / day", tag: "Serious" },
  { value: "120", label: "120 min / day", tag: "Intense" },
];

export default function PagePlanOnboarding() {
  const [selected, setSelected] = useState<string | null>(null);

  // Conditional motivational text based on selected study time
  const getMotivationText = (selectedValue: string | null) => {
    if (!selectedValue) {
      return "With 30 mins a day, you could boost your score by 0.25 bands by your test date!";
    }

    const timeMap: { [key: string]: string } = {
      "30": "0.25 band increase",
      "60": "0.5 band increase",
      "90": "1 band increase",
      "120": "1.5 band increase",
    };

    const bandIncrease = timeMap[selectedValue];
    const selectedOption = planOptions.find(
      (opt) => opt.value === selectedValue
    );

    return `With ${selectedOption?.label}, you could boost your score by ${bandIncrease} by your test date!`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col items-center w-full max-w-xl mx-auto px-4 py-8 flex-1">
        <div className="w-full bg-white p-8 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1D5554] text-center tracking-tight whitespace-nowrap">
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
                  className={`relative rounded-3xl p-6 w-full transition-all duration-300 border shadow-md flex items-center justify-between group focus:outline-none
                    ${
                      selected === opt.value
                        ? "bg-[#1D5554] border-[#1D5554] text-white scale-105 shadow-2xl -translate-y-2"
                        : "bg-white border-gray-200 text-gray-700 hover:-translate-y-2 hover:shadow-2xl hover:bg-[#1D5554] hover:border-[#1D5554] hover:text-white"
                    }
                  `}
                  aria-pressed={selected === opt.value}
                >
                  <span className="flex-1 text-left font-bold text-xl">
                    {opt.label}
                  </span>
                  <span
                    className={`text-lg font-bold ml-8 transition-all duration-300 ${
                      selected === opt.value
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    {opt.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col items-center mb-8">
            <div className="text-xl md:text-2xl font-bold text-[#1D5554] text-center bg-[#D9F061]/60 rounded-xl px-6 py-4 shadow mt-2 tracking-tighter motivation-text">
              {getMotivationText(selected)}
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
