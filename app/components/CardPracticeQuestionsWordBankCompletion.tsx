import React, { useState } from "react";

interface Question {
  id: string | number;
  question: string;
  answer: string;
}

interface CardPracticeQuestionsWordBankCompletionProps {
  questionSet: {
    wordBank: string[];
    questions: Question[];
  };
}

function extractBlankSentence(str: string) {
  // Extract the sentence containing [blank]
  const blankIdx = str.indexOf("[blank]");
  if (blankIdx === -1) return str;
  // Find previous period
  let start = str.lastIndexOf(".", blankIdx);
  start = start === -1 ? 0 : start + 1;
  // Find next period
  let end = str.indexOf(".", blankIdx + 7);
  end = end === -1 ? str.length : end + 1;
  return str.slice(start, end).trim();
}

function CardPracticeQuestionsWordBankCompletion({
  questionSet,
}: CardPracticeQuestionsWordBankCompletionProps) {
  // Deduplicate based on the sentence containing [blank]
  const uniqueQuestions: { q: Question; idx: number; sentence: string }[] = [];
  const seenCores = new Set<string>();
  questionSet.questions.forEach((q, idx) => {
    const sentence = extractBlankSentence(q.question);
    const core = sentence
      .replace(/\[blank\]/g, "___")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
    if (!seenCores.has(core)) {
      uniqueQuestions.push({ q, idx, sentence });
      seenCores.add(core);
    }
  });

  const blankCount = uniqueQuestions.length;
  const answers = uniqueQuestions.map(({ q }) => q.answer);

  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(
    Array(blankCount).fill(null)
  );
  const [bank, setBank] = useState<string[]>([...questionSet.wordBank]);
  const [submitted, setSubmitted] = useState(false);
  const [draggedWord, setDraggedWord] = useState<string | null>(null);

  function handleDrop(idx: number) {
    if (submitted || !draggedWord) return;
    const updatedAnswers = [...userAnswers];
    const updatedBank = bank.filter((w) => w !== draggedWord);
    // If there was already a word in this blank, return it to the bank
    if (updatedAnswers[idx]) {
      updatedBank.push(updatedAnswers[idx]!);
    }
    updatedAnswers[idx] = draggedWord;
    setUserAnswers(updatedAnswers);
    setBank(updatedBank);
    setDraggedWord(null);
  }

  function handleRemove(idx: number) {
    if (submitted) return;
    const updatedAnswers = [...userAnswers];
    const updatedBank = [...bank, updatedAnswers[idx]!];
    updatedAnswers[idx] = null;
    setUserAnswers(updatedAnswers);
    setBank(updatedBank);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const score = answers.reduce(
    (acc, answer, idx) =>
      acc +
      (userAnswers[idx]?.trim().toLowerCase() === answer.trim().toLowerCase()
        ? 1
        : 0),
    0
  );

  const answeredCount = userAnswers.filter((a) => a && a.trim() !== "").length;
  const total = blankCount;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Word Bank Box */}
      <div className="mb-6">
        <div className="rounded-xl bg-gray-100 p-4 flex flex-wrap gap-2 justify-center mb-4 border border-gray-200">
          {bank.length === 0 ? (
            <span className="text-gray-400 italic">All words used</span>
          ) : (
            bank.map((word, i) => (
              <button
                key={`${word}-${i}`}
                type="button"
                className={`px-3 py-1 rounded-lg border font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-blue-800 border-blue-400 hover:bg-blue-100`}
                draggable={!submitted}
                onDragStart={() => setDraggedWord(word)}
                onDragEnd={() => setDraggedWord(null)}
                disabled={submitted}
                tabIndex={0}
                aria-label={`Drag ${word}`}
              >
                {word}
              </button>
            ))
          )}
        </div>
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
        <div className="mb-6 text-base leading-8 text-gray-900 space-y-4">
          {uniqueQuestions.map(({ sentence }, uniqueIdx) => {
            const parts = sentence.split(/(\[blank\])/g);
            return (
              <div key={uniqueIdx} className="flex flex-row items-start gap-2">
                <span>
                  {parts.map((part, i) =>
                    part === "[blank]" ? (
                      <span
                        key={`blank-${uniqueIdx}`}
                        className="inline-block align-middle mx-1"
                        onDragOver={(e) => {
                          if (!submitted) e.preventDefault();
                        }}
                        onDrop={() => handleDrop(uniqueIdx)}
                      >
                        <button
                          type="button"
                          className={`inline-block w-24 h-8 rounded border-2 align-middle text-center transition-all
                            ${
                              userAnswers[uniqueIdx]
                                ? submitted
                                  ? userAnswers[uniqueIdx]
                                      ?.trim()
                                      .toLowerCase() ===
                                    answers[uniqueIdx].trim().toLowerCase()
                                    ? "border-green-500 bg-green-50 text-green-800"
                                    : "border-red-500 bg-red-50 text-red-800"
                                  : "border-blue-400 bg-blue-100 text-blue-800 hover:bg-blue-200"
                                : draggedWord
                                ? "border-blue-600 bg-blue-50 text-blue-600 animate-pulse"
                                : "border-blue-300 bg-blue-50 text-blue-400"
                            }
                          `}
                          onClick={() => handleRemove(uniqueIdx)}
                          disabled={submitted || !userAnswers[uniqueIdx]}
                        >
                          {userAnswers[uniqueIdx] ? (
                            <span>
                              {userAnswers[uniqueIdx]}
                              {!submitted && (
                                <span className="ml-2 text-lg">×</span>
                              )}
                            </span>
                          ) : (
                            <span className="text-gray-400 font-semibold">
                              {uniqueIdx + 1}
                            </span>
                          )}
                        </button>
                      </span>
                    ) : (
                      <React.Fragment key={`text-${uniqueIdx}-${i}`}>
                        {part}
                      </React.Fragment>
                    )
                  )}
                </span>
              </div>
            );
          })}
        </div>
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
        {/* Show correct answers below passage after submit */}
        {submitted && (
          <div className="mt-8">
            <h3 className="font-semibold text-gray-800 mb-2">
              Correct Answers:
            </h3>
            <ul className="list-decimal list-inside text-gray-700">
              {answers.map((answer, idx) => (
                <li key={idx}>
                  <span className="font-medium">{idx + 1}:</span> {answer}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}

export default CardPracticeQuestionsWordBankCompletion;
