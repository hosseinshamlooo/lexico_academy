import React, { useState } from "react";
import ProgressBarOnboarding from "@/app/components/ProgressBarOnboarding";
import InstructionBox from "@/app/components/InstructionBox";
import CorrectionDisplay from "@/app/components/CorrectionDisplay";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

interface MatchingInfoPerson {
  id: string; // 'A', 'B', 'C'
  name: string;
}

interface MatchingInfoQuestion {
  id: string | number;
  question: string;
  answer: string; // 'A', 'B', or 'C'
}

interface CardPracticeQuestionsMatchingInfoProps {
  people: MatchingInfoPerson[];
  questions: MatchingInfoQuestion[];
  instructions?: string;
  mode?: string;
}

function CardPracticeQuestionsMatchingInfo({
  people,
  questions,
  instructions,
  mode = "people",
}: CardPracticeQuestionsMatchingInfoProps) {
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(idx: number, value: string) {
    // Only allow a single uppercase letter (A-Z)
    const letter = value.toUpperCase();
    if (letter === "" || /^[A-Z]$/.test(letter)) {
      const updated = [...userAnswers];
      updated[idx] = letter;
      setUserAnswers(updated);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const score = questions.reduce(
    (acc, q, idx) =>
      acc + (userAnswers[idx].toUpperCase() === q.answer.toUpperCase() ? 1 : 0),
    0
  );

  const answered = userAnswers.filter((a) => a && a.trim() !== "").length;

  return (
    <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col">
      <div className="flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Questions</h2>
        <div className="mb-4 w-full max-w-xl mx-auto">
          <ProgressBarOnboarding step={answered} total={questions.length} />
          <div className="text-sm text-gray-700 mt-1 text-left">
            {answered} of {questions.length} questions answered
          </div>
        </div>
        {instructions && (
          <InstructionBox className="w-full max-w-xl mx-auto mb-3">
            {instructions}
          </InstructionBox>
        )}
        {/* Names Box: only render if mode is 'people' */}
        {mode === "people" && people.length > 0 && (
          <div className="mb-6">
            <div className="rounded-xl bg-gray-100 p-6 flex flex-col items-center gap-2 mb-4 border border-gray-200 shadow-sm">
              <h3 className="text-base font-semibold text-gray-700 mb-2">
                List
              </h3>
              <table className="min-w-max border border-gray-300 rounded-lg bg-white">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 border-b text-left">Letter</th>
                    <th className="px-4 py-2 border-b text-left">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {people.map((person) => (
                    <tr key={person.id}>
                      <td className="px-4 py-2 font-bold text-[var(--color-primary)]">
                        {person.id}
                      </td>
                      <td className="px-4 py-2">{person.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 flex-1 overflow-y-auto scrollbar-hide"
      >
        <div className="mb-6 text-base leading-8 text-gray-900 space-y-4">
          {questions.map((q, idx) => {
            const isCorrect =
              userAnswers[idx].toUpperCase() === q.answer.toUpperCase();
            const hasAnswer =
              userAnswers[idx] && userAnswers[idx].trim() !== "";
            return (
              <div key={q.id} className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold w-7 text-gray-500 text-right flex-shrink-0 text-base mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="flex-1 ml-1">{q.question}</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      maxLength={1}
                      className={`w-12 h-9 text-center border-2 rounded-lg text-lg font-bold uppercase focus:outline-none transition-all
                        ${
                          submitted
                            ? isCorrect
                              ? "border-green-500 bg-green-50 text-green-800"
                              : "border-red-500 bg-red-50 text-red-800"
                            : "border-[#1D5554] text-[#1D5554] focus:border-[#1D5554] bg-white"
                        }
                      `}
                      value={userAnswers[idx]}
                      onChange={(e) => handleInputChange(idx, e.target.value)}
                      disabled={submitted}
                      aria-label={`Answer for question ${idx + 1}`}
                      autoComplete="off"
                    />
                    {submitted && userAnswers[idx] && (
                      <div className="flex-shrink-0">
                        {isCorrect ? (
                          <FaCircleCheck className="text-green-500 text-sm" />
                        ) : (
                          <FaCircleXmark className="text-red-500 text-sm" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* Correction box under wrong answers only */}
                {submitted && !isCorrect && hasAnswer && (
                  <div className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 mt-2 text-sm text-gray-700">
                    <span className="font-semibold text-gray-600">
                      Correct answer:
                    </span>{" "}
                    <span className="text-green-700 font-semibold">
                      {q.answer} (
                      {people.find((p) => p.id === q.answer)?.name || ""})
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200 w-full max-w-xl mx-auto">
          {!submitted ? (
            <button
              type="submit"
              disabled={userAnswers.some(
                (a) => !["A", "B", "C"].includes(a.toUpperCase())
              )}
              className="w-full bg-[#1D5554] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#174342] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Submit Answers
            </button>
          ) : (
            <CorrectionDisplay correct={score} total={questions.length} />
          )}
        </div>
      </form>
    </div>
  );
}

export default CardPracticeQuestionsMatchingInfo;
