"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/app/components/DashboardHeader";
import ProgressBarOnboarding from "@/app/components/ProgressBarOnboarding";
import OnboardingContinueButton from "@/app/components/OnboardingContinueButton";

const options = [
  { label: "For Study Abroad", value: "study-abroad", icon: "🎓" },
  { label: "Immigration", value: "immigration", icon: "🏠" },
  { label: "Work", value: "work", icon: "💼" },
  { label: "Personal Growth", value: "personal-growth", icon: "🌱" },
  {
    label: "For Shits and Giggles",
    value: "for-shits-and-giggles",
    icon: "🤪",
  },
  { label: "Other", value: "other", icon: "✨" },
];

export default function PageMotivationOnboarding() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selected) {
      // TODO: Save the selected value to state management or API
      router.push("/onboarding/skill");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex flex-col items-center w-full max-w-xl mx-auto px-4 py-8 flex-1">
        <ProgressBarOnboarding step={2} total={5} />
        <div className="w-full bg-white p-8 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1D5554] text-center tracking-tight whitespace-nowrap mt-8">
            What&apos;s Your Motivation?
          </h1>
          <p className="text-3xl text-gray-600 mb-4 mt-8 text-center font-bold tracking-tighter">
            Let&apos;s understand your IELTS goals.
          </p>
          <div className="w-full mb-6">
            <div className="text-2xl md:text-2xl font-bold tracking-tight text-gray-800 mb-8 text-center">
              Why are you preparing for the IELTS?
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
          <OnboardingContinueButton
            onClick={handleContinue}
            disabled={!selected}
          >
            Continue
          </OnboardingContinueButton>
        </div>
      </main>
    </div>
  );
}
