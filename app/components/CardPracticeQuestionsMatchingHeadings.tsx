import React, { useState } from "react";

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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Matching Headings
        </h2>
        {instructions && <p className="mb-2 text-gray-700">{instructions}</p>}
        <div className="rounded-xl bg-gray-100 p-4 flex flex-col items-center gap-2 mb-4 border border-gray-200 shadow-sm">
          <h3 className="text-base font-semibold text-gray-700 mb-2">
            List of Headings
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            {headings.map((h) => (
              <li key={h.id}>
                <span className="font-bold mr-2">{h.id}.</span> {h.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6 text-base leading-8 text-gray-900 space-y-4">
          {questions.map((q, idx) => (
            <div key={q.id} className="flex items-center gap-3">
              <span className="font-semibold w-8 text-gray-500 text-right flex-shrink-0 pt-0.1">
                {idx + 1}.
              </span>
              <span className="flex-1 text-left">{q.question}</span>
              <select
                className={`w-28 h-9 text-center border-2 rounded-lg text-base font-bold focus:outline-none transition-all
                  ${
                    submitted
                      ? userAnswers[idx] === q.answer
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-red-500 bg-red-50 text-red-800"
                      : "border-blue-300 bg-white text-blue-800 focus:border-blue-500"
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
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200">
          {!submitted ? (
            <button
              type="submit"
              disabled={userAnswers.some((a) => !a)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Submit Answers
            </button>
          ) : (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-sm text-gray-600">
                {Math.round((score / questions.length) * 100)}% correct
              </div>
            </div>
          )}
        </div>
        {/* Show correct answers below after submit */}
        {submitted && (
          <div className="mt-8">
            <h3 className="font-semibold text-gray-800 mb-2">
              Correct Answers:
            </h3>
            <ul className="list-decimal list-inside text-gray-700">
              {questions.map((q, idx) => (
                <li key={q.id}>
                  <span className="font-medium">{idx + 1}:</span> {q.answer} -{" "}
                  {headings.find((h) => h.id === q.answer)?.text || ""}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}
