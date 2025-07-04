import React, { useState } from "react";
import InstructionBox from "@/app/components/InstructionBox";

interface Question {
  id: string | number;
  question: string;
  answer: string;
}

interface CardPracticeQuestionsWordBankCompletionProps {
  questionSet: {
    wordBank: string[];
    questions: Question[];
    mode: string;
    instructions?: string;
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

// Only renders if questionSet.mode === 'word-bank'
export default function CardPracticeQuestionsWordBankCompletion({
  questionSet,
}: CardPracticeQuestionsWordBankCompletionProps) {
  if (questionSet.mode !== "word-bank") return null;

  // Debug log (must be before any hooks)
  console.log(
    "WordBankCompletion mode:",
    questionSet.mode,
    "questions:",
    questionSet.questions
  );

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

  // Build a flat list of all blanks across all questions
  const blankMap: { qIdx: number; blankIdx: number; answer: string }[] = [];
  let totalBlanks = 0;
  uniqueQuestions.forEach(({ q }, qIdx) => {
    const answersArr = Array.isArray(q.answer) ? q.answer : [q.answer];
    for (let i = 0; i < answersArr.length; i++) {
      blankMap.push({ qIdx, blankIdx: i, answer: answersArr[i] });
      totalBlanks++;
    }
  });

  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(
    Array(totalBlanks).fill(null)
  );
  const [bank, setBank] = useState<string[]>([...questionSet.wordBank]);
  const [submitted, setSubmitted] = useState(false);
  const [draggedWord, setDraggedWord] = useState<string | null>(null);

  function handleDrop(globalIdx: number) {
    if (submitted || !draggedWord) return;
    console.log("Dropping", draggedWord, "into blank", globalIdx);
    const updatedAnswers = [...userAnswers];
    const updatedBank = bank.filter((w) => w !== draggedWord);
    if (updatedAnswers[globalIdx]) {
      updatedBank.push(updatedAnswers[globalIdx]!);
    }
    updatedAnswers[globalIdx] = draggedWord;
    setUserAnswers(updatedAnswers);
    setBank(updatedBank);
    setDraggedWord(null);
    console.log("userAnswers:", userAnswers, "bank:", bank);
  }

  function handleRemove(globalIdx: number) {
    if (submitted) return;
    const updatedAnswers = [...userAnswers];
    const updatedBank = [...bank, updatedAnswers[globalIdx]!];
    updatedAnswers[globalIdx] = null;
    setUserAnswers(updatedAnswers);
    setBank(updatedBank);
  }

  function handleInput(globalIdx: number, value: string) {
    const updated = [...userAnswers];
    updated[globalIdx] = value;
    setUserAnswers(updated);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const score = blankMap.reduce(
    (acc, { answer }, idx) =>
      acc +
      (userAnswers[idx]?.trim().toLowerCase() === answer.trim().toLowerCase()
        ? 1
        : 0),
    0
  );

  const answeredCount = userAnswers.filter((a) => a && a.trim() !== "").length;
  const total = totalBlanks;

  // Helper to map (qIdx, blankIdx) to global blank index
  function getBlankIndex(qIdx: number, blankIdx: number) {
    let idx = 0;
    for (let i = 0; i < qIdx; i++) {
      const numBlanks = (
        uniqueQuestions[i].q.question.match(/\[blank\]/g) || []
      ).length;
      idx += numBlanks;
    }
    return idx + blankIdx;
  }

  // Render
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Summary Completion
      </h2>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: `${(answeredCount / total) * 100}%`,
            backgroundColor: "#1D5554",
          }}
        ></div>
        <p className="text-sm text-gray-600 mt-2 mb-4">
          {answeredCount} of {total} blanks filled
        </p>
      </div>

      {/* Render instructions under progress bar */}
      {questionSet.instructions && (
        <InstructionBox className="mb-4 mt-10">
          {questionSet.instructions}
        </InstructionBox>
      )}

      {/* Word Bank Box */}
      {questionSet.mode === "word-bank" && (
        <div className="mb-6 mt-6">
          <div className="rounded-xl bg-gray-100 p-4 flex flex-wrap gap-2 justify-center mb-4 border border-gray-200">
            {bank.length === 0 ? (
              <span className="text-[#1D5554] italic">All words used</span>
            ) : (
              bank.map((word, i) => (
                <button
                  key={`${word}-${i}`}
                  type="button"
                  className={`px-3 py-1 rounded-lg border font-medium shadow-sm transition-all focus:outline-none focus:ring-2 bg-[#e6f4f3] text-[#1D5554] border-[#1D5554] hover:bg-[#d0eae8]`}
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
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6 text-base leading-8 text-gray-900 space-y-4">
          {uniqueQuestions.map(({ sentence }, qIdx) => {
            // Compute the blank indices for this question
            const parts = sentence.split(/(\[blank\])/g);
            let localBlank = 0;
            // Find all global blank indices for this question
            const numBlanks = (sentence.match(/\[blank\]/g) || []).length;
            const globalBlankIndices = Array.from(
              { length: numBlanks },
              (_, i) => getBlankIndex(qIdx, i)
            );
            return (
              <div
                key={qIdx}
                className="flex flex-col items-start gap-2 w-full"
              >
                <span>
                  {parts.map((part, i) =>
                    part === "[blank]" ? (
                      (() => {
                        const globalBlankIdx = getBlankIndex(qIdx, localBlank);
                        const blankLabel = qIdx + 1;
                        localBlank++;
                        return (
                          <span
                            key={`blank-${qIdx}-${i}`}
                            className="inline-block align-middle mx-1"
                            onDragOver={(e) => {
                              if (!submitted) e.preventDefault();
                            }}
                            onDrop={() => handleDrop(globalBlankIdx)}
                          >
                            {questionSet.mode === "word-bank" ? (
                              <button
                                type="button"
                                className={`inline-block w-24 h-8 rounded border-2 align-middle text-center transition-all
                                    ${
                                      userAnswers[globalBlankIdx]
                                        ? submitted
                                          ? userAnswers[globalBlankIdx]
                                              ?.trim()
                                              .toLowerCase() ===
                                            blankMap[globalBlankIdx].answer
                                              .trim()
                                              .toLowerCase()
                                            ? "border-green-500 bg-green-50 text-green-800"
                                            : "border-red-500 bg-red-50 text-red-800"
                                          : "border-[#1D5554] text-[#1D5554] bg-white"
                                        : draggedWord
                                        ? "border-[#1D5554] bg-[#e6f4f3] text-[#1D5554] animate-pulse"
                                        : "border-[#1D5554] bg-[#e6f4f3] text-[#1D5554]"
                                    }
                                  `}
                                onClick={() => handleRemove(globalBlankIdx)}
                                disabled={
                                  submitted || !userAnswers[globalBlankIdx]
                                }
                              >
                                {userAnswers[globalBlankIdx] ? (
                                  <span>
                                    {userAnswers[globalBlankIdx]}
                                    {!submitted && (
                                      <span className="ml-2 text-lg">×</span>
                                    )}
                                  </span>
                                ) : (
                                  <span className="font-semibold text-[#1D5554]">
                                    {blankLabel}
                                  </span>
                                )}
                              </button>
                            ) : (
                              <input
                                type="text"
                                className={`inline-block w-20 align-middle px-1 py-0.5 rounded border border-gray-300 bg-gray-50 focus:border-blue-500 hover:border-blue-500 text-sm transition-all duration-200 ${
                                  submitted
                                    ? userAnswers[globalBlankIdx]
                                        ?.trim()
                                        .toLowerCase() ===
                                      blankMap[globalBlankIdx].answer
                                        .trim()
                                        .toLowerCase()
                                      ? "border-green-500 bg-green-50"
                                      : "border-red-500 bg-red-50"
                                    : ""
                                }`}
                                value={userAnswers[globalBlankIdx] || ""}
                                onChange={(e) =>
                                  handleInput(globalBlankIdx, e.target.value)
                                }
                                disabled={submitted}
                                aria-label={`Blank for question ${qIdx + 1}`}
                                style={{ minWidth: "3rem", maxWidth: "6rem" }}
                              />
                            )}
                          </span>
                        );
                      })()
                    ) : (
                      <React.Fragment key={`text-${qIdx}-${i}`}>
                        {part}
                      </React.Fragment>
                    )
                  )}
                </span>
                {/* Show correct answers in a full-width box under each question after submit, but only if at least one answer is wrong */}
                {submitted &&
                  globalBlankIndices.some(
                    (idx) =>
                      userAnswers[idx]?.trim().toLowerCase() !==
                      blankMap[idx].answer.trim().toLowerCase()
                  ) && (
                    <div className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 mt-2 text-sm text-gray-700">
                      <span className="font-semibold text-gray-600">
                        Correct answer{globalBlankIndices.length > 1 ? "s" : ""}
                        :{" "}
                      </span>
                      {globalBlankIndices.map((idx, i) => (
                        <span key={idx} className="inline-block mr-2">
                          <span className="text-green-700 font-semibold">
                            {blankMap[idx].answer}
                          </span>
                          {i < globalBlankIndices.length - 1 && <span>, </span>}
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
        </div>
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
