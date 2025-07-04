"use client";

import React, { useState } from "react";

interface Question {
  id: number;
  question: string;
  answer: string | string[];
}

interface CardPracticeQuestionsCompletionProps {
  questionSet: {
    questions: Question[];
    mode: string;
  };
}

export default function CardPracticeQuestionsCompletion({
  questionSet,
}: CardPracticeQuestionsCompletionProps) {
  if (questionSet.mode !== "input") return null;

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
      acc +
      ((userAnswers[idx] ?? "").trim().toLowerCase() ===
      (answer ?? "").trim().toLowerCase()
        ? 1
        : 0),
    0
  );

  const answeredCount = userAnswers.filter((a) => a && a.trim() !== "").length;
  const total = totalBlanks;

  // Render
  let globalBlankIdx = 0;
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Summary Completion
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / total) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {answeredCount} of {total} blanks filled
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questionSet.questions.map((q, qIdx) => {
          const parts = q.question.split(/(\[blank\])/g);
          // Find all global blank indices for this question
          const numBlanks = (q.question.match(/\[blank\]/g) || []).length;
          const globalBlankIndices = Array.from(
            { length: numBlanks },
            (_, i) => {
              let idx = 0;
              for (let j = 0; j < qIdx; j++) idx += blankCounts[j];
              return idx + i;
            }
          );
          return (
            <div key={q.id} className="py-2 px-0 w-full">
              <div className="text-gray-900 mb-3 text-base">
                <span className="font-medium mr-2">Question {q.id}:</span>
                <span className="inline">
                  {parts.map((part, i) =>
                    part === "[blank]" ? (
                      (() => {
                        const thisGlobalIdx = globalBlankIdx;
                        globalBlankIdx++;
                        return (
                          <input
                            key={`blank-${q.id}-${i}`}
                            type="text"
                            className={`inline-block w-20 align-middle px-1 py-0.5 rounded border border-gray-300 bg-gray-50 focus:border-blue-500 hover:border-blue-500 text-sm transition-all duration-200 ${
                              submitted
                                ? (userAnswers[thisGlobalIdx] ?? "")
                                    .trim()
                                    .toLowerCase() ===
                                  (flatAnswers[thisGlobalIdx] ?? "")
                                    .trim()
                                    .toLowerCase()
                                  ? "border-green-500 bg-green-50"
                                  : "border-red-500 bg-red-50"
                                : ""
                            }`}
                            value={userAnswers[thisGlobalIdx] ?? ""}
                            onChange={(e) =>
                              handleChange(thisGlobalIdx, e.target.value)
                            }
                            disabled={submitted}
                            aria-label={`Blank for question ${q.id}`}
                            style={{ minWidth: "3rem", maxWidth: "6rem" }}
                          />
                        );
                      })()
                    ) : (
                      <React.Fragment key={`text-${q.id}-${i}`}>
                        {part}
                      </React.Fragment>
                    )
                  )}
                </span>
              </div>
              {/* Correction box: only show if at least one blank in this question is wrong */}
              {submitted &&
                globalBlankIndices.some(
                  (idx) =>
                    (userAnswers[idx] ?? "").trim().toLowerCase() !==
                    (flatAnswers[idx] ?? "").trim().toLowerCase()
                ) && (
                  <div className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 mt-2 text-sm text-gray-700">
                    <span className="font-semibold text-gray-600">
                      Correct answer{globalBlankIndices.length > 1 ? "s" : ""}:{" "}
                    </span>
                    {globalBlankIndices.map((idx, i) => (
                      <span key={idx} className="inline-block mr-2">
                        <span className="text-green-700 font-semibold">
                          {flatAnswers[idx] || "—"}
                        </span>
                        {i < globalBlankIndices.length - 1 && <span>, </span>}
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
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Submit Answers
            </button>
          ) : (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {score}/{total}
              </div>
              <div className="text-sm text-gray-600">
                {Math.round((score / total) * 100)}% correct
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
