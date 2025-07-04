import React, { useState } from "react";
import ProgressBarOnboarding from "@/app/components/ProgressBarOnboarding";

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
    <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Matching Info
      </h2>
      <div className="mb-4 w-full max-w-xl mx-auto">
        <ProgressBarOnboarding step={answered} total={questions.length} />
        <div className="text-sm text-gray-700 mt-1 text-left">
          {answered} of {questions.length} questions answered
        </div>
      </div>
      {instructions && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 px-3 py-2 mb-3 text-yellow-900 text-base font-medium rounded-lg w-full max-w-xl mx-auto">
          {instructions}
        </div>
      )}
      {/* Names Box: only render if mode is 'people' */}
      {mode === "people" && people.length > 0 && (
        <div className="mb-6">
          <div className="rounded-xl bg-gray-100 p-6 flex flex-col items-center gap-2 mb-4 border border-gray-200 shadow-sm">
            <h3 className="text-base font-semibold text-gray-700 mb-2">List</h3>
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
                    <td className="px-4 py-2 font-bold text-blue-700">
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6 text-base leading-8 text-gray-900 space-y-4">
          {questions.map((q, idx) => (
            <div key={q.id} className="flex items-start gap-3">
              <span className="font-semibold w-8 text-gray-500 text-right flex-shrink-0 pt-0.1">
                {idx + 1}.
              </span>
              <span className="flex-1 text-left">{q.question}</span>
              <input
                type="text"
                maxLength={1}
                className={`w-12 h-9 text-center border-2 rounded-lg text-lg font-bold uppercase focus:outline-none transition-all
                  ${
                    submitted
                      ? userAnswers[idx].toUpperCase() ===
                        q.answer.toUpperCase()
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-red-500 bg-red-50 text-red-800"
                      : "border-blue-300 bg-white text-blue-800 focus:border-blue-500"
                  }
                `}
                value={userAnswers[idx]}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                disabled={submitted}
                aria-label={`Answer for question ${idx + 1}`}
                autoComplete="off"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200 w-full max-w-xl mx-auto">
          {!submitted ? (
            <button
              type="submit"
              disabled={userAnswers.some(
                (a) => !["A", "B", "C"].includes(a.toUpperCase())
              )}
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
                  <span className="font-medium">{idx + 1}:</span> {q.answer} (
                  {people.find((p) => p.id === q.answer)?.name || ""})
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}

export default CardPracticeQuestionsMatchingInfo;
