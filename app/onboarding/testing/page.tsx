"use client";

import { useState } from "react";
import OnboardingContinueButton from "@/app/components/OnboardingContinueButton";
import { useRouter } from "next/navigation";

export default function PageTestingOnboarding() {
  const [testDate, setTestDate] = useState("");
  const [hasTakenTest, setHasTakenTest] = useState<string | null>(null);
  const [previousScores, setPreviousScores] = useState({
    listening: "",
    reading: "",
    writing: "",
    speaking: "",
  });
  const [targetScores, setTargetScores] = useState({
    listening: "",
    reading: "",
    writing: "",
    speaking: "",
  });
  const router = useRouter();

  const targetScoreOptions = ["6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"];
  const previousScoreOptions = [
    "0",
    "0.5",
    "1.0",
    "1.5",
    "2.0",
    "2.5",
    "3.0",
    "3.5",
    "4.0",
    "4.5",
    "5.0",
    "5.5",
    "6.0",
    "6.5",
    "7.0",
    "7.5",
    "8.0",
    "8.5",
    "9.0",
  ];

  const isContinueEnabled =
    testDate &&
    hasTakenTest !== null &&
    targetScores.listening &&
    targetScores.reading &&
    targetScores.writing &&
    targetScores.speaking;

  const handleContinue = () => {
    if (isContinueEnabled) {
      router.push("/onboarding/plan");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 py-8 flex-1">
        <div className="w-full bg-white p-8 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1D5554] text-center tracking-tight whitespace-nowrap">
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
                  className={`relative rounded-3xl p-3 w-[80px] transition-all duration-300 border shadow-md flex items-center justify-center gap-3 group focus:outline-none ${
                    hasTakenTest === "yes"
                      ? "bg-[#1D5554] border-[#1D5554] text-white scale-105 shadow-2xl"
                      : "bg-white border-gray-200 text-gray-700 hover:shadow-2xl hover:bg-[#1D5554] hover:border-[#1D5554] hover:text-white"
                  }`}
                  onClick={() => setHasTakenTest("yes")}
                  aria-pressed={hasTakenTest === "yes"}
                >
                  <span className="font-bold text-base">Yes</span>
                </button>
                <button
                  type="button"
                  className={`relative rounded-3xl p-3 w-[80px] transition-all duration-300 border shadow-md flex items-center justify-center gap-3 group focus:outline-none ${
                    hasTakenTest === "no"
                      ? "bg-[#1D5554] border-[#1D5554] text-white scale-105 shadow-2xl"
                      : "bg-white border-gray-200 text-gray-700 hover:shadow-2xl hover:bg-[#1D5554] hover:border-[#1D5554] hover:text-white"
                  }`}
                  onClick={() => setHasTakenTest("no")}
                  aria-pressed={hasTakenTest === "no"}
                >
                  <span className="font-bold text-base">No</span>
                </button>
              </div>
              {hasTakenTest === "yes" && (
                <div className="mt-4">
                  <label className="block text-lg font-bold text-gray-800 mb-2">
                    What were your previous scores?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1D5554] focus:outline-none text-lg"
                      value={previousScores.listening}
                      onChange={(e) =>
                        setPreviousScores({
                          ...previousScores,
                          listening: e.target.value,
                        })
                      }
                    >
                      <option value="">Listening</option>
                      {previousScoreOptions.map((score) => (
                        <option key={score} value={score}>
                          {score}
                        </option>
                      ))}
                    </select>
                    <select
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1D5554] focus:outline-none text-lg"
                      value={previousScores.reading}
                      onChange={(e) =>
                        setPreviousScores({
                          ...previousScores,
                          reading: e.target.value,
                        })
                      }
                    >
                      <option value="">Reading</option>
                      {previousScoreOptions.map((score) => (
                        <option key={score} value={score}>
                          {score}
                        </option>
                      ))}
                    </select>
                    <select
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1D5554] focus:outline-none text-lg"
                      value={previousScores.writing}
                      onChange={(e) =>
                        setPreviousScores({
                          ...previousScores,
                          writing: e.target.value,
                        })
                      }
                    >
                      <option value="">Writing</option>
                      {previousScoreOptions.map((score) => (
                        <option key={score} value={score}>
                          {score}
                        </option>
                      ))}
                    </select>
                    <select
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1D5554] focus:outline-none text-lg"
                      value={previousScores.speaking}
                      onChange={(e) =>
                        setPreviousScores({
                          ...previousScores,
                          speaking: e.target.value,
                        })
                      }
                    >
                      <option value="">Speaking</option>
                      {previousScoreOptions.map((score) => (
                        <option key={score} value={score}>
                          {score}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
            {/* Target Scores */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-2">
                What are your target scores?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1D5554] focus:outline-none text-lg"
                  value={targetScores.listening}
                  onChange={(e) =>
                    setTargetScores({
                      ...targetScores,
                      listening: e.target.value,
                    })
                  }
                >
                  <option value="">Listening</option>
                  {targetScoreOptions.map((score) => (
                    <option key={score} value={score}>
                      {score}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1D5554] focus:outline-none text-lg"
                  value={targetScores.reading}
                  onChange={(e) =>
                    setTargetScores({
                      ...targetScores,
                      reading: e.target.value,
                    })
                  }
                >
                  <option value="">Reading</option>
                  {targetScoreOptions.map((score) => (
                    <option key={score} value={score}>
                      {score}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1D5554] focus:outline-none text-lg"
                  value={targetScores.writing}
                  onChange={(e) =>
                    setTargetScores({
                      ...targetScores,
                      writing: e.target.value,
                    })
                  }
                >
                  <option value="">Writing</option>
                  {targetScoreOptions.map((score) => (
                    <option key={score} value={score}>
                      {score}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#1D5554] focus:outline-none text-lg"
                  value={targetScores.speaking}
                  onChange={(e) =>
                    setTargetScores({
                      ...targetScores,
                      speaking: e.target.value,
                    })
                  }
                >
                  <option value="">Speaking</option>
                  {targetScoreOptions.map((score) => (
                    <option key={score} value={score}>
                      {score}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <OnboardingContinueButton
            onClick={handleContinue}
            disabled={!isContinueEnabled}
          >
            Continue
          </OnboardingContinueButton>
        </div>
      </main>
    </div>
  );
}
