"use client";

import { useState } from "react";
import OnboardingContinueButton from "@/app/components/OnboardingContinueButton";
import { useRouter } from "next/navigation";
import {
  TbAntennaBars1,
  TbAntennaBars2,
  TbAntennaBars3,
  TbAntennaBars4,
  TbAntennaBars5,
} from "react-icons/tb";
import { FaCircleQuestion, FaLightbulb, FaBookOpen } from "react-icons/fa6";

const englishLevels = [
  {
    label: "I'm new to English",
    value: "beginner",
    icon: <TbAntennaBars1 className="w-10 h-10" strokeWidth={3} />,
  },
  {
    label: "I know some common words",
    value: "common-words",
    icon: <TbAntennaBars2 className="w-10 h-10" strokeWidth={3} />,
  },
  {
    label: "I can have basic conversations",
    value: "basic-conversations",
    icon: <TbAntennaBars3 className="w-10 h-10" strokeWidth={3} />,
  },
  {
    label: "I can talk about various topics",
    value: "various-topics",
    icon: <TbAntennaBars4 className="w-10 h-10" strokeWidth={3} />,
  },
  {
    label: "I can discuss most topics in detail",
    value: "detailed-topics",
    icon: <TbAntennaBars5 className="w-10 h-10" strokeWidth={3} />,
  },
];

const ieltsFamiliarity = [
  {
    label: "Never heard of it",
    value: "never-heard",
    icon: <FaCircleQuestion className="w-8 h-8" />,
  },
  {
    label: "Know a little",
    value: "know-little",
    icon: <FaLightbulb className="w-8 h-8" />,
  },
  {
    label: "Taken prep classes",
    value: "prep-classes",
    icon: <FaBookOpen className="w-8 h-8" />,
  },
];

export default function PageSkillOnboarding() {
  const [english, setEnglish] = useState<string | null>(null);
  const [ielts, setIelts] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (english && ielts) {
      router.push("/onboarding/testing");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 py-8 flex-1">
        <div className="w-full bg-white p-8 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1D5554] text-center tracking-tight whitespace-nowrap">
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
                      className={`relative rounded-3xl p-6 w-[400px] transition-all duration-300 border shadow-md flex items-center gap-4 group focus:outline-none
                        ${
                          english === opt.value
                            ? "bg-[#1D5554] border-[#1D5554] text-white scale-105 shadow-2xl -translate-y-2"
                            : "bg-white border-gray-200 text-gray-700 hover:-translate-y-2 hover:shadow-2xl hover:bg-[#1D5554] hover:border-[#1D5554] hover:text-white"
                        }
                      `}
                      aria-pressed={english === opt.value}
                    >
                      <span
                        className={`transition-all duration-300 ${
                          english === opt.value
                            ? "text-white"
                            : "text-gray-600 group-hover:text-white"
                        }`}
                      >
                        {opt.icon}
                      </span>
                      <span className="flex-1 text-left break-words font-bold text-xl">
                        {opt.label}
                      </span>
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
                      className={`relative rounded-3xl p-6 w-[400px] transition-all duration-300 border shadow-md flex items-center gap-4 group focus:outline-none
                        ${
                          ielts === opt.value
                            ? "bg-[#1D5554] border-[#1D5554] text-white scale-105 shadow-2xl -translate-y-2"
                            : "bg-white border-gray-200 text-gray-700 hover:-translate-y-2 hover:shadow-2xl hover:bg-[#1D5554] hover:border-[#1D5554] hover:text-white"
                        }
                      `}
                      aria-pressed={ielts === opt.value}
                      disabled={!english}
                    >
                      <span
                        className={`transition-all duration-300 ${
                          ielts === opt.value
                            ? "text-white"
                            : "text-gray-600 group-hover:text-white"
                        }`}
                      >
                        {opt.icon}
                      </span>
                      <span className="flex-1 text-left break-words font-bold text-xl">
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
