"use client";

import React, { useState } from "react";
import InstructionBox from "@/app/components/InstructionBox";
import CorrectionDisplay from "@/app/components/CorrectionDisplay";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

interface Question {
  id: number;
  question: string;
  answer: string | string[];
}

interface CardPracticeQuestionsCompletionProps {
  questionSet: {
    questions: Question[];
    mode: string;
    instructions?: string;
  };
}

// Utility function to safely trim and lowercase
function safeTrim(val: string | undefined | null) {
  return (val ?? "").trim().toLowerCase();
}

export default function CardPracticeQuestionsCompletion({
  questionSet,
}: CardPracticeQuestionsCompletionProps) {
  // Build a flat array of all answers in order, matching the number of [blank]s in each question
  const flatAnswers: string[] = [];
  const blankCounts: number[] = [];
  questionSet.questions.forEach((q) => {
    const numBlanks = (q.question.match(/\[blank\]/g) || []).length;
    blankCounts.push(numBlanks);
    const answerArr = Array.isArray(q.answer) ? q.answer : [q.answer];
    for (let i = 0; i < numBlanks; i++) {
      flatAnswers.push(answerArr[i] ?? "");
    }
  });
  const totalBlanks = flatAnswers.length;

  // Count total number of blanks in all questions
  const totalBlanksInQuestions = blankCounts.reduce((a, b) => a + b, 0);
  if (totalBlanksInQuestions !== totalBlanks) {
    console.warn(
      `Mismatch: found ${totalBlanksInQuestions} blanks but ${totalBlanks} answers. Check your data!`
    );
  }

  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(totalBlanks).fill("")
  );
  const [submitted, setSubmitted] = useState(false);

  if (questionSet.mode !== "input") return null;

  function handleChange(idx: number, value: string) {
    const updated = [...userAnswers];
    updated[idx] = value;
    setUserAnswers(updated);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const score = flatAnswers.reduce(
    (acc, answer, idx) =>
      acc + (safeTrim(userAnswers[idx]) === safeTrim(answer) ? 1 : 0),
    0
  );

  const answeredCount = userAnswers.filter((a) => a && a.trim() !== "").length;
  const total = totalBlanks;

  // Render
  return (
    <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Questions</h2>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${(answeredCount / total) * 100}%`,
              backgroundColor: "#1D5554",
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {answeredCount} of {total} blanks filled
        </p>
      </div>
      {questionSet.instructions && (
        <InstructionBox className="mb-4 mt-4">
          {questionSet.instructions}
        </InstructionBox>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <form onSubmit={handleSubmit} className="space-y-6">
          {questionSet.questions.map((q, qIdx) => {
            const parts = q.question.split(/(\[blank\])/g);
            const numBlanks = (q.question.match(/\[blank\]/g) || []).length;
            // Compute the global blank indices for this question
            let startIdx = 0;
            for (let i = 0; i < qIdx; i++) startIdx += blankCounts[i];
            const blankIndices = Array.from(
              { length: numBlanks },
              (_, i) => startIdx + i
            );
            return (
              <div key={q.id} className="mb-6">
                <div className="text-gray-900 mb-3 text-base">
                  {parts.map((part, i) =>
                    part === "[blank]" ? (
                      (() => {
                        const thisGlobalIdx = startIdx;
                        startIdx++;
                        const isCorrect =
                          safeTrim(userAnswers[thisGlobalIdx]) ===
                          safeTrim(flatAnswers[thisGlobalIdx]);
                        const hasAnswer =
                          (userAnswers[thisGlobalIdx] || "").trim().length > 0;

                        return (
                          <span
                            key={`blank-${q.id}-${i}`}
                            className="inline-flex items-center gap-1 relative"
                          >
                            <input
                              type="text"
                              className={`inline-block w-20 align-middle px-1 py-0.5 rounded border transition-all duration-200 text-sm
                              ${
                                submitted
                                  ? isCorrect
                                    ? "border-green-500 bg-green-50"
                                    : "border-red-500 bg-red-50"
                                  : !userAnswers[thisGlobalIdx]
                                  ? "border-[#1D5554] bg-[#e6f4f3] text-[#1D5554] placeholder-[#1D5554]"
                                  : "border-[#1D5554] text-[#1D5554] bg-white"
                              }
                            `}
                              value={userAnswers[thisGlobalIdx] ?? ""}
                              onChange={(e) =>
                                handleChange(thisGlobalIdx, e.target.value)
                              }
                              disabled={submitted}
                              aria-label={`Blank for question ${q.id}`}
                              style={{ minWidth: "3rem", maxWidth: "6rem" }}
                              placeholder={
                                userAnswers[thisGlobalIdx]
                                  ? ""
                                  : `${thisGlobalIdx + 1}`
                              }
                            />
                            {submitted && hasAnswer && (
                              <div className="flex-shrink-0">
                                {isCorrect ? (
                                  <FaCircleCheck className="text-green-500 text-sm" />
                                ) : (
                                  <FaCircleXmark className="text-red-500 text-sm" />
                                )}
                              </div>
                            )}
                          </span>
                        );
                      })()
                    ) : (
                      <React.Fragment key={`text-${q.id}-${i}`}>
                        {part}
                      </React.Fragment>
                    )
                  )}
                </div>
                {/* Correction box: only show if at least one blank in this question is wrong */}
                {submitted &&
                  blankIndices.some(
                    (bIdx) =>
                      safeTrim(userAnswers[bIdx]) !==
                      safeTrim(flatAnswers[bIdx])
                  ) && (
                    <div className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 mt-2 text-sm text-gray-700">
                      <span className="font-semibold text-gray-600">
                        Correct answer{blankIndices.length > 1 ? "s" : ""}:
                      </span>
                      {blankIndices.map((bIdx, i) => (
                        <span key={bIdx} className="inline-block mr-2">
                          <span className="text-green-700 font-semibold">
                            {flatAnswers[bIdx] || "—"}
                          </span>
                          {i < blankIndices.length - 1 && <span>, </span>}
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
          <div className="mt-6 pt-4 border-t border-gray-200">
            {!submitted ? (
              <button
                type="submit"
                disabled={answeredCount < total}
                className="w-full bg-[#1D5554] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#174342] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Submit Answers
              </button>
            ) : (
              <CorrectionDisplay correct={score} total={total} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
