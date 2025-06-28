"use client";

import { useState } from "react";
import DashboardHeader from "@/app/components/DashboardHeader";
import ProgressBarOnboarding from "@/app/components/ProgressBarOnboarding";
import OnboardingContinueButton from "@/app/components/OnboardingContinueButton";

export default function PageTestingOnboarding() {
  const [testDate, setTestDate] = useState("");
  const [hasTakenTest, setHasTakenTest] = useState<string | null>(null);
  const [previousScores, setPreviousScores] = useState("");
  const [targetScores, setTargetScores] = useState({
    listening: "",
    reading: "",
    writing: "",
    speaking: "",
  });

  const isContinueEnabled =
    testDate &&
    hasTakenTest !== null &&
    targetScores.listening &&
    targetScores.reading &&
    targetScores.writing &&
    targetScores.speaking;

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 py-8 flex-1">
        <ProgressBarOnboarding step={4} total={5} />
        <div className="w-full bg-white p-8 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1D5554] text-center tracking-tight whitespace-nowrap mt-8">
            Test History & Goals
          </h1>
          <p className="text-2xl text-gray-600 mb-10 mt-8 text-center font-bold tracking-tighter">
            Help us understand your timeline and targets.
          </p>
          <div className="w-full flex flex-col gap-8 mb-8">
            {/* Test Date */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-2">
                When&apos;s your test date?
              </label>
              <input
                type="date"
                className="w-full max-w-xs px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1D5554] focus:outline-none text-lg"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
              />
            </div>
            {/* Test History */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-2">
                Have you taken the test before?
              </label>
              <div className="flex gap-6 mb-2">
                <button
                  type="button"
                  className={`px-6 py-3 rounded-xl border-2 font-bold text-lg transition-all duration-200 ${
                    hasTakenTest === "yes"
                      ? "border-[#1D5554] bg-[#D9F061]/80 text-[#1D5554]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#1D5554] hover:bg-[#D9F061]/40"
                  }`}
                  onClick={() => setHasTakenTest("yes")}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`px-6 py-3 rounded-xl border-2 font-bold text-lg transition-all duration-200 ${
                    hasTakenTest === "no"
                      ? "border-[#1D5554] bg-[#D9F061]/80 text-[#1D5554]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#1D5554] hover:bg-[#D9F061]/40"
                  }`}
                  onClick={() => setHasTakenTest("no")}
                >
                  No
                </button>
              </div>
              {hasTakenTest === "yes" && (
                <input
                  type="text"
                  className="w-full max-w-xs px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1D5554] focus:outline-none text-lg mt-2"
                  placeholder="Your previous scores (optional)"
                  value={previousScores}
                  onChange={(e) => setPreviousScores(e.target.value)}
                />
              )}
            </div>
            {/* Target Scores */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-2">
                What are your target scores?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1D5554] focus:outline-none text-lg"
                  placeholder="Listening"
                  value={targetScores.listening}
                  onChange={(e) =>
                    setTargetScores({
                      ...targetScores,
                      listening: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1D5554] focus:outline-none text-lg"
                  placeholder="Reading"
                  value={targetScores.reading}
                  onChange={(e) =>
                    setTargetScores({
                      ...targetScores,
                      reading: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1D5554] focus:outline-none text-lg"
                  placeholder="Writing"
                  value={targetScores.writing}
                  onChange={(e) =>
                    setTargetScores({
                      ...targetScores,
                      writing: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1D5554] focus:outline-none text-lg"
                  placeholder="Speaking"
                  value={targetScores.speaking}
                  onChange={(e) =>
                    setTargetScores({
                      ...targetScores,
                      speaking: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <OnboardingContinueButton
            onClick={() => {}}
            disabled={!isContinueEnabled}
          >
            Continue
          </OnboardingContinueButton>
        </div>
      </main>
    </div>
  );
}
