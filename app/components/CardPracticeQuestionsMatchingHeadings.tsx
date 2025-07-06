import React, { useState } from "react";
import InstructionBox from "@/app/components/InstructionBox";
import ProgressBarOnboarding from "./ProgressBarOnboarding";
import CorrectionDisplay from "@/app/components/CorrectionDisplay";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

interface MatchingHeadingsQuestion {
  id: string | number;
  question: string;
  answer: string; // e.g. 'iv', 'vii', etc.
}

interface CardPracticeQuestionsMatchingHeadingsProps {
  questionSet: {
    headings: { id: string; text: string }[];
    questions: MatchingHeadingsQuestion[];
    instructions?: string;
  };
}

export default function CardPracticeQuestionsMatchingHeadings({
  questionSet,
}: CardPracticeQuestionsMatchingHeadingsProps) {
  const { headings, questions, instructions } = questionSet;
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState(false);

  function handleSelect(idx: number, value: string) {
    const updated = [...userAnswers];
    updated[idx] = value;
    setUserAnswers(updated);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const score = questions.reduce(
    (acc, q, idx) => acc + (userAnswers[idx] === q.answer ? 1 : 0),
    0
  );

  const answered = userAnswers.filter((a) => a && a.trim() !== "").length;

  return (
    <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Questions</h2>
        <div className="mb-4 w-full max-w-xl mx-auto">
          <ProgressBarOnboarding step={answered} total={questions.length} />
          <div className="text-sm text-gray-700 mt-1 text-left">
            {answered} of {questions.length} questions answered
          </div>
        </div>
        {instructions && (
          <InstructionBox className="mb-4">{instructions}</InstructionBox>
        )}
        <div className="rounded-xl bg-gray-100 p-3 flex flex-col items-center gap-1 mb-4 border border-gray-200 shadow-sm max-h-24 overflow-y-auto scrollbar-hide">
          <h3 className="text-sm font-semibold text-gray-700 mb-1 flex-shrink-0">
            List of Headings
          </h3>
          <div className="flex flex-col gap-0.5 w-full">
            {headings.map((h) => (
              <div key={h.id} className="flex items-baseline gap-2 w-full">
                <span className="font-bold text-[var(--color-primary)] min-w-[1.5rem] text-right text-sm">
                  {h.id}.
                </span>
                <span className="text-gray-700 flex-1 text-sm">{h.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6 text-base leading-8 text-gray-900 space-y-4">
            {questions.map((q, idx) => (
              <div key={q.id} className="flex flex-col gap-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <span className="font-semibold w-8 text-gray-500 text-right flex-shrink-0 pt-0.1">
                    {idx + 1}.
                  </span>
                  <span className="flex-1 text-gray-900">{q.question}</span>
                  <div className="flex items-center gap-1">
                    <select
                      className={`w-full sm:w-28 h-9 text-center border-2 rounded-lg text-base font-bold focus:outline-none transition-all flex-shrink-0
                          ${
                            submitted
                              ? userAnswers[idx] === q.answer
                                ? "border-green-500 bg-green-50 text-green-800"
                                : "border-red-500 bg-red-50 text-red-800"
                              : "border-[#1D5554] bg-white text-[#1D5554] focus:border-[#1D5554]"
                          }
                        `}
                      value={userAnswers[idx]}
                      onChange={(e) => handleSelect(idx, e.target.value)}
                      disabled={submitted}
                      aria-label={`Heading for question ${idx + 1}`}
                    >
                      <option value="">Select</option>
                      {headings.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.id}
                        </option>
                      ))}
                    </select>
                    {submitted && userAnswers[idx] && (
                      <div className="flex-shrink-0">
                        {userAnswers[idx] === q.answer ? (
                          <FaCircleCheck className="text-green-500 text-sm" />
                        ) : (
                          <FaCircleXmark className="text-red-500 text-sm" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* Correction box if wrong */}
                {submitted && userAnswers[idx] !== q.answer && (
                  <div className="w-full bg-red-50 border border-red-300 text-red-800 rounded-lg px-4 py-2 mt-2 text-sm">
                    <span className="font-semibold">Correct:</span> {q.answer} -{" "}
                    {headings.find((h) => h.id === q.answer)?.text || ""}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            {!submitted ? (
              <button
                type="submit"
                disabled={userAnswers.some((a) => !a)}
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
    </div>
  );
}
