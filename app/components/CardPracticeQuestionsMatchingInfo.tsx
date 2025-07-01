import React, { useState } from "react";

interface Person {
  id: string;
  name: string;
}

interface Question {
  id: string | number;
  question: string;
  answer: string; // Person id (A, B, C)
}

interface CardPracticeQuestionsMatchingInfoProps {
  questionSet: {
    people: Person[];
    questions: Question[];
  };
}

function CardPracticeQuestionsMatchingInfo({
  questionSet,
}: CardPracticeQuestionsMatchingInfoProps) {
  const [userMatches, setUserMatches] = useState<(string | null)[]>(
    Array(questionSet.questions.length).fill(null)
  );
  const [bank, setBank] = useState<string[]>(
    questionSet.people.map((p) => p.id)
  );
  const [submitted, setSubmitted] = useState(false);

  function handleDrop(idx: number, personId: string) {
    if (submitted) return;
    const updatedMatches = [...userMatches];
    const updatedBank = bank.filter((id) => id !== personId);
    // If there was already a person in this blank, return it to the bank
    if (updatedMatches[idx]) {
      updatedBank.push(updatedMatches[idx]!);
    }
    updatedMatches[idx] = personId;
    setUserMatches(updatedMatches);
    setBank(updatedBank);
  }

  function handleRemove(idx: number) {
    if (submitted) return;
    const updatedMatches = [...userMatches];
    const updatedBank = [...bank, updatedMatches[idx]!];
    updatedMatches[idx] = null;
    setUserMatches(updatedMatches);
    setBank(updatedBank);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const score = questionSet.questions.reduce(
    (acc, q, idx) => (userMatches[idx] === q.answer ? acc + 1 : acc),
    0
  );
  const answeredCount = userMatches.filter((a) => a).length;
  const total = questionSet.questions.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Match the Person
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / total) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {answeredCount} of {total} statements matched
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {bank.map((id) => {
              const person = questionSet.people.find((p) => p.id === id);
              return (
                <button
                  key={id}
                  type="button"
                  className="px-3 py-1 rounded bg-blue-100 border border-blue-400 text-blue-800 font-medium shadow-sm hover:bg-blue-200 transition-all"
                  onClick={() => {
                    // Find first empty blank
                    const idx = userMatches.findIndex((a) => !a);
                    if (idx !== -1) handleDrop(idx, id);
                  }}
                  disabled={submitted}
                >
                  {id}. {person?.name}
                </button>
              );
            })}
          </div>
        </div>
        {questionSet.questions.map((q, idx) => (
          <div key={q.id} className="py-2 px-0">
            <div className="text-gray-900 mb-3 text-base flex items-center gap-2">
              <span className="font-medium mr-2">Statement {idx + 1}:</span>
              <span className="flex-1">{q.question}</span>
              {userMatches[idx] ? (
                <button
                  type="button"
                  className={`px-3 py-1 rounded border font-medium transition-all ${
                    submitted
                      ? userMatches[idx] === q.answer
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-red-500 bg-red-50 text-red-800"
                      : "border-blue-400 bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
                  onClick={() => handleRemove(idx)}
                  disabled={submitted}
                >
                  {userMatches[idx]}
                  {!submitted && <span className="ml-2">×</span>}
                </button>
              ) : (
                <span className="inline-block w-16 h-8 border-b-2 border-blue-300 align-middle bg-blue-50 text-blue-400 text-center">
                  (blank)
                </span>
              )}
            </div>
            {submitted && (
              <div className="mt-2 p-2 rounded bg-gray-50">
                <span className="text-sm text-gray-700 font-medium">
                  Correct answer:
                </span>{" "}
                {q.answer} (
                {questionSet.people.find((p) => p.id === q.answer)?.name})
              </div>
            )}
          </div>
        ))}
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

export default CardPracticeQuestionsMatchingInfo;
