import React, { useState } from "react";
import InstructionBox from "@/app/components/InstructionBox";
import CorrectionDisplay from "@/app/components/CorrectionDisplay";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

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
  // Move hooks before early return
  // Debug log (must be before any hooks)
  console.log(
    "WordBankCompletion mode:",
    questionSet.mode,
    "questions:",
    questionSet.questions
  );

  // For word bank, do NOT deduplicate questions
  const uniqueQuestions = questionSet.questions.map((q, idx) => ({
    q,
    idx,
    sentence: extractBlankSentence(q.question),
  }));

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

  if (questionSet.mode !== "word-bank") return null;

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
    console.log("Submit triggered");
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

  // Precompute blank indices for each question to avoid mutation during render
  const questionBlankIndices = uniqueQuestions.map(({ q }, qIdx) => {
    const numBlanks = (
      extractBlankSentence(q.question).match(/\[blank\]/g) || []
    ).length;
    const indices = [];
    let start = 0;
    for (let i = 0, count = 0; i < qIdx; i++) {
      count += (
        extractBlankSentence(uniqueQuestions[i].q.question).match(
          /\[blank\]/g
        ) || []
      ).length;
      start = count;
    }
    for (let i = 0; i < numBlanks; i++) {
      indices.push(start + i);
    }
    return indices;
  });

  // Render
  console.log("Render: submitted =", submitted);
  return (
    <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col">
      <div className="flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Questions</h2>
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
      </div>
      {/* Scrollable questions area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6 text-base leading-8 text-gray-900 space-y-4">
            {uniqueQuestions.map(({ sentence }, qIdx) => {
              const parts = sentence.split(/(\[blank\])/g);
              const numBlanks = (sentence.match(/\[blank\]/g) || []).length;
              // For summary correction: collect userVals and correctAnswers for this question's blanks
              const blankIndices = questionBlankIndices[qIdx];
              const userVals = blankIndices.map((idx) => userAnswers[idx]);
              const correctAnswers = blankIndices.map(
                (idx) => blankMap[idx]?.answer ?? ""
              );
              let blankCounter = 0; // Local counter for this question's blanks
              const jsx = (
                <div
                  key={qIdx}
                  className="flex flex-col items-start gap-2 w-full"
                >
                  <span>
                    {parts.map((part, i) =>
                      part === "[blank]" ? (
                        (() => {
                          const blankIdx = blankIndices[blankCounter++];
                          const blankObj = blankMap[blankIdx];
                          const userVal = userAnswers[blankIdx];
                          const correctAnswer = blankObj?.answer ?? "";
                          return (
                            <span
                              key={`blank-${qIdx}-${i}`}
                              className="inline-block align-middle mx-1"
                              onDragOver={(e) => {
                                if (!submitted) e.preventDefault();
                              }}
                              onDrop={() => handleDrop(blankIdx)}
                            >
                              {questionSet.mode === "word-bank" ? (
                                <span className="inline-flex items-center gap-1 relative">
                                  <button
                                    type="button"
                                    className={`inline-block w-24 h-8 rounded border-2 align-middle text-center transition-all
                                      ${
                                        userVal
                                          ? submitted
                                            ? userVal?.trim().toLowerCase() ===
                                              correctAnswer.trim().toLowerCase()
                                              ? "border-green-500 bg-green-50 text-green-800"
                                              : "border-red-500 bg-red-50 text-red-800"
                                            : "border-[#1D5554] text-[#1D5554] bg-white"
                                          : draggedWord
                                          ? "border-[#1D5554] bg-[#e6f4f3] text-[#1D5554] animate-pulse"
                                          : "border-[#1D5554] bg-[#e6f4f3] text-[#1D5554]"
                                      }
                                    `}
                                    onClick={() => handleRemove(blankIdx)}
                                    disabled={submitted || !userVal}
                                  >
                                    {userVal ? (
                                      <span>
                                        {userVal}
                                        {!submitted && (
                                          <span className="ml-2 text-lg">
                                            ×
                                          </span>
                                        )}
                                      </span>
                                    ) : (
                                      <span className="font-semibold text-[#1D5554]">
                                        {blankIdx + 1}
                                      </span>
                                    )}
                                  </button>
                                  {submitted && userVal && (
                                    <div className="flex-shrink-0">
                                      {userVal?.trim().toLowerCase() ===
                                      correctAnswer.trim().toLowerCase() ? (
                                        <FaCircleCheck className="text-green-500 text-sm" />
                                      ) : (
                                        <FaCircleXmark className="text-red-500 text-sm" />
                                      )}
                                    </div>
                                  )}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 relative">
                                  <input
                                    type="text"
                                    className={`inline-block w-20 align-middle px-1 py-0.5 rounded border border-gray-300 bg-gray-50 focus:border-blue-500 hover:border-blue-500 text-sm transition-all duration-200 ${
                                      submitted
                                        ? userVal?.trim().toLowerCase() ===
                                          correctAnswer.trim().toLowerCase()
                                          ? "border-green-500 bg-green-50"
                                          : "border-red-500 bg-red-50"
                                        : ""
                                    }`}
                                    value={userVal || ""}
                                    onChange={(e) =>
                                      handleInput(blankIdx, e.target.value)
                                    }
                                    disabled={submitted}
                                    aria-label={`Blank for question ${
                                      qIdx + 1
                                    }`}
                                    style={{
                                      minWidth: "3rem",
                                      maxWidth: "6rem",
                                    }}
                                  />
                                  {submitted && userVal && (
                                    <div className="flex-shrink-0">
                                      {userVal?.trim().toLowerCase() ===
                                      correctAnswer.trim().toLowerCase() ? (
                                        <FaCircleCheck className="text-green-500 text-sm" />
                                      ) : (
                                        <FaCircleXmark className="text-red-500 text-sm" />
                                      )}
                                    </div>
                                  )}
                                </span>
                              )}
                            </span>
                          );
                        })()
                      ) : (
                        <React.Fragment key={i}>{part}</React.Fragment>
                      )
                    )}
                  </span>
                  {/* Show correct answers in a full-width box under each question after submit, but only if at least one answer is wrong */}
                  {submitted &&
                    userVals.some(
                      (val, i) =>
                        val?.trim().toLowerCase() !==
                        correctAnswers[i].trim().toLowerCase()
                    ) && (
                      <div className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 mt-2 text-sm text-gray-700">
                        <span className="font-semibold text-gray-600">
                          Correct answer{numBlanks > 1 ? "s" : ""}:{" "}
                        </span>
                        {correctAnswers.map((ans, i) => (
                          <span key={i} className="inline-block mr-2">
                            <span className="text-green-700 font-semibold">
                              {ans}
                            </span>
                            {i < correctAnswers.length - 1 && <span>, </span>}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              );
              return jsx;
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
              <CorrectionDisplay correct={score} total={total} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
