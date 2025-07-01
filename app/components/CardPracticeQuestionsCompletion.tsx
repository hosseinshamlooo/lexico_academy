"use client";

import React, { useState } from "react";

interface Question {
  id: number;
  question: string;
  answer: string;
}

interface CardPracticeQuestionsCompletionProps {
  questionSet: {
    questions: Question[];
  };
}

function CardPracticeQuestionsCompletion({
  questionSet,
}: CardPracticeQuestionsCompletionProps) {
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(questionSet.questions.length).fill("")
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

  const score = questionSet.questions.reduce(
    (acc, q, idx) =>
      acc +
      (userAnswers[idx]?.trim().toLowerCase() === q.answer.trim().toLowerCase()
        ? 1
        : 0),
    0
  );

  const answeredCount = userAnswers.filter((a) => a && a.trim() !== "").length;
  const total = questionSet.questions.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Questions</h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / total) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {answeredCount} of {total} questions answered
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questionSet.questions.map((q, idx) => {
          const parts = q.question.split(/(\[blank\])/g);
          return (
            <div key={q.id} className="py-2 px-0">
              <div className="text-gray-900 mb-3 text-base">
                <span className="font-medium mr-2">Question {q.id}:</span>
                <span className="inline">
                  {parts.map((part, i) =>
                    part === "[blank]" ? (
                      <input
                        key={`blank-${idx}-${i}`}
                        type="text"
                        className={`inline-block w-20 align-middle px-1 py-0.5 rounded border border-gray-300 bg-gray-50 focus:border-blue-500 hover:border-blue-500 text-sm transition-all duration-200 ${
                          submitted
                            ? userAnswers[idx]?.trim().toLowerCase() ===
                              q.answer.trim().toLowerCase()
                              ? "border-green-500 bg-green-50"
                              : "border-red-500 bg-red-50"
                            : ""
                        }`}
                        value={userAnswers[idx]}
                        onChange={(e) => handleChange(idx, e.target.value)}
                        disabled={submitted}
                        aria-label={`Blank for question ${idx + 1}`}
                        style={{ minWidth: "3rem", maxWidth: "6rem" }}
                      />
                    ) : (
                      <React.Fragment key={`text-${idx}-${i}`}>
                        {part}
                      </React.Fragment>
                    )
                  )}
                </span>
              </div>
              {submitted && (
                <div className="mt-2 p-2 rounded bg-gray-50">
                  <span className="text-sm text-gray-700 font-medium">
                    Correct answer:
                  </span>{" "}
                  {q.answer}
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

export default CardPracticeQuestionsCompletion;
