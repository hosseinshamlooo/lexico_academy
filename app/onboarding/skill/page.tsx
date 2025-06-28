"use client";

import { useState } from "react";
import DashboardHeader from "@/app/components/DashboardHeader";
import ProgressBarOnboarding from "@/app/components/ProgressBarOnboarding";
import OnboardingContinueButton from "@/app/components/OnboardingContinueButton";
import { useRouter } from "next/navigation";

const englishLevels = [
  { label: "I'm new to English", value: "beginner", icon: "📶" },
  { label: "I know some common words", value: "common-words", icon: "📶" },
  {
    label: "I can have basic conversations",
    value: "basic-conversations",
    icon: "📶",
  },
  {
    label: "I can talk about various topics",
    value: "various-topics",
    icon: "📶",
  },
  {
    label: "I can discuss most topics in detail",
    value: "detailed-topics",
    icon: "📶",
  },
];

const ieltsFamiliarity = [
  { label: "Never heard of it", value: "never-heard", icon: "❓" },
  { label: "Know a little", value: "know-little", icon: "📖" },
  { label: "Taken prep classes", value: "prep-classes", icon: "🏫" },
];

export default function PageSkillOnboarding() {
  const [english, setEnglish] = useState<string | null>(null);
  const [ielts, setIelts] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (english && ielts) {
      router.push("/onboarding/plan");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 py-8 flex-1">
        <ProgressBarOnboarding step={3} total={5} />
        <div className="w-full bg-white p-8 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1D5554] text-center tracking-tight whitespace-nowrap mt-8">
            Your English & IELTS Skills
          </h1>
          <p className="text-2xl text-gray-600 mb-10 mt-8 text-center font-bold tracking-tighter">
            Help us get a sense of your starting point.
          </p>
          <div className="w-full mb-8 flex flex-col items-center">
            <div className="flex flex-row justify-center gap-24">
              {/* English Level Column */}
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold tracking-tight text-gray-800 text-center whitespace-nowrap mb-6">
                  How much English do you know?
                </div>
                <div className="flex flex-col gap-4 w-full items-center">
                  {englishLevels.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setEnglish(opt.value)}
                      className={`flex items-center gap-4 px-8 py-5 rounded-2xl border-2 transition-all duration-200 font-bold text-lg shadow-sm w-[400px] text-left
                        ${
                          english === opt.value
                            ? "border-[#1D5554] bg-[#D9F061]/80 text-[#1D5554]"
                            : "border-gray-200 bg-white text-gray-700 hover:border-[#1D5554] hover:bg-[#D9F061]/40"
                        }
                      `}
                      aria-pressed={english === opt.value}
                    >
                      <span className="text-2xl text-blue-400">{opt.icon}</span>
                      <span className="flex-1 font-semibold">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* IELTS Familiarity Column */}
              <div
                className={`flex flex-col items-center ${
                  !english ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="text-2xl font-bold tracking-tight text-gray-800 text-center whitespace-nowrap mb-6">
                  How familiar are you with the IELTS?
                </div>
                <div className="flex flex-col gap-4 w-full items-center">
                  {ieltsFamiliarity.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => english && setIelts(opt.value)}
                      className={`flex items-center gap-3 px-8 py-5 rounded-2xl border-2 transition-all duration-200 font-bold text-lg shadow-sm w-[400px] focus:outline-none focus:ring-2 focus:ring-[#D9F061] focus:border-[#D9F061] bg-white 
                        ${
                          ielts === opt.value
                            ? "border-[#1D5554] bg-[#D9F061]/80 text-[#1D5554]"
                            : "border-gray-200 text-gray-700 hover:border-[#1D5554] hover:bg-[#D9F061]/40"
                        }
                      `}
                      aria-pressed={ielts === opt.value}
                      disabled={!english}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="flex-1 text-left font-semibold">
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <OnboardingContinueButton
            onClick={handleContinue}
            disabled={!(english && ielts)}
          >
            Continue
          </OnboardingContinueButton>
        </div>
      </main>
    </div>
  );
}
