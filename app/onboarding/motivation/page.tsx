"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingContinueButton from "@/app/components/OnboardingContinueButton";
import {
  FaGraduationCap,
  FaGlobe,
  FaBriefcase,
  FaLeaf,
  FaFaceLaughBeam,
} from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";

const options = [
  {
    label: "For Study Abroad",
    value: "study-abroad",
    icon: <FaGraduationCap className="w-6 h-6" />,
  },
  {
    label: "Immigration",
    value: "immigration",
    icon: <FaGlobe className="w-6 h-6" />,
  },
  { label: "Work", value: "work", icon: <FaBriefcase className="w-6 h-6" /> },
  {
    label: "Personal Growth",
    value: "personal-growth",
    icon: <FaLeaf className="w-6 h-6" />,
  },
  {
    label: "For Shits and Giggles",
    value: "for-shits-and-giggles",
    icon: <FaFaceLaughBeam className="w-6 h-6" />,
  },
  { label: "Other", value: "other", icon: <IoSparkles className="w-6 h-6" /> },
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
      <main className="flex flex-col items-center w-full max-w-xl mx-auto px-4 py-8 flex-1">
        <div className="w-full bg-white p-8 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1D5554] text-center tracking-tight whitespace-nowrap">
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
                  className={`relative rounded-3xl p-6 w-[340px] transition-all duration-300 border shadow-md flex items-center gap-3 group focus:outline-none
                    ${
                      selected === opt.value
                        ? "bg-[#1D5554] border-[#1D5554] text-white scale-105 shadow-2xl -translate-y-2"
                        : "bg-white border-gray-200 text-gray-700 hover:-translate-y-2 hover:shadow-2xl hover:bg-[#1D5554] hover:border-[#1D5554] hover:text-white"
                    }
                  `}
                  aria-pressed={selected === opt.value}
                >
                  <span
                    className={`transition-all duration-300 ${
                      selected === opt.value
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
