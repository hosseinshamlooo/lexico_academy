// CardPracticeQuestionsMCQ.tsx
// Renders all MCQ questions in a single card, styled like CardPracticeQuestionsItem, with multi/single answer support.

"use client";
import React, { useState } from "react";
import InstructionBox from "@/app/components/InstructionBox";
import CorrectionDisplay from "@/app/components/CorrectionDisplay";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string[] | string;
  instructions?: string;
}

interface CardPracticeQuestionsMCQProps {
  questionSet: {
    questions: MCQQuestion[];
    instructions?: string;
  };
}

export default function CardPracticeQuestionsMCQ({
  questionSet,
}: CardPracticeQuestionsMCQProps) {
  const { questions, instructions } = questionSet;
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string[];
  }>(() => {
    const initial: { [key: string]: string[] } = {};
    questions.forEach((q) => {
      initial[q.id] = [];
    });
    return initial;
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSelect(question: MCQQuestion, option: string) {
    if (submitted) return;
    const isMulti =
      Array.isArray(question.answer) && question.answer.length > 1;
    setSelectedAnswers((prev) => {
      const prevSelected = prev[question.id] || [];
      if (isMulti) {
        if (prevSelected.includes(option)) {
          return {
            ...prev,
            [question.id]: prevSelected.filter((o) => o !== option),
          };
        } else if (prevSelected.length < (question.answer as string[]).length) {
          return { ...prev, [question.id]: [...prevSelected, option] };
        } else {
          return prev;
        }
      } else {
        return { ...prev, [question.id]: [option] };
      }
    });
  }

  function getCorrectOptions(question: MCQQuestion): string[] {
    // If answer is an array of letters, map to options
    if (Array.isArray(question.answer)) {
      if (
        typeof question.answer[0] === "string" &&
        question.answer[0].length === 1 &&
        /[A-Z]/i.test(question.answer[0])
      ) {
        // Array of letters
        return question.answer.map((letter) => {
          const idx = letter.toUpperCase().charCodeAt(0) - 65;
          return question.options[idx];
        });
      } else {
        // Array of option strings
        return question.answer as string[];
      }
    } else if (
      typeof question.answer === "string" &&
      question.answer.length === 1 &&
      /[A-Z]/i.test(question.answer)
    ) {
      // Single letter
      const idx = question.answer.toUpperCase().charCodeAt(0) - 65;
      return [question.options[idx]];
    } else if (typeof question.answer === "string") {
      // Single option string
      return [question.answer];
    }
    return [];
  }

  function getOptionStyle(question: MCQQuestion, option: string) {
    if (!submitted) {
      return selectedAnswers[question.id]?.includes(option)
        ? "bg-[var(--color-primary-selected)] border-[var(--color-primary-selected)] text-white hover:bg-[var(--color-primary-selected)] focus:bg-[var(--color-primary-selected)]"
        : "bg-white border-gray-300 hover:bg-[var(--color-primary-bg,#e6f4f3)] focus:bg-[var(--color-primary-bg,#e6f4f3)] text-gray-900";
    }
    const correctOptions = getCorrectOptions(question);
    const correct = correctOptions.includes(option);
    const selected = selectedAnswers[question.id]?.includes(option);
    if (correct) {
      return "bg-emerald-50 border-emerald-600 text-emerald-800";
    } else if (selected && !correct) {
      return "bg-rose-50 border-rose-600 text-rose-800";
    } else {
      return "bg-white border-gray-300";
    }
  }

  function allAnswered() {
    return questions.every((q) => {
      const required = Array.isArray(q.answer) ? q.answer.length : 1;
      return selectedAnswers[q.id]?.length === required;
    });
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function calculateScore() {
    let correct = 0;
    let total = 0;
    questions.forEach((q) => {
      const correctOptions = getCorrectOptions(q);
      total += correctOptions.length;
      const selected = selectedAnswers[q.id] || [];
      // Count how many correct options were selected (per answer)
      correct += correctOptions.filter((opt) => selected.includes(opt)).length;
    });
    return { correct, total };
  }

  return (
    <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col">
      <div className="mb-4 flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Questions</h2>
        {instructions && (
          <InstructionBox className="mb-3">{instructions}</InstructionBox>
        )}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${
                (Object.values(selectedAnswers).filter((a) => a.length > 0)
                  .length /
                  questionSet.questions.length) *
                100
              }%`,
              backgroundColor: "#1D5554",
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {Object.values(selectedAnswers).filter((a) => a.length > 0).length} of{" "}
          {questions.length} questions answered
        </p>
      </div>
      <div className="space-y-6 flex-1 overflow-y-auto scrollbar-hide">
        {questions.map((question) => {
          const isMulti =
            Array.isArray(question.answer) && question.answer.length > 1;
          const requiredSelections = isMulti
            ? (question.answer as string[]).length
            : 1;
          return (
            <div key={question.id} className="rounded-lg p-4 bg-white">
              <InstructionBox className="mb-3">
                {question.question}
              </InstructionBox>
              <div className="space-y-2">
                {question.options.map((option, optIdx) => {
                  const correctOptions = getCorrectOptions(question);
                  const correct = correctOptions.includes(option);
                  const selected =
                    selectedAnswers[question.id]?.includes(option);

                  return (
                    <div key={optIdx}>
                      <label
                        className={
                          "flex items-center gap-2 cursor-pointer p-2 rounded transition-all duration-200 border-2 text-base " +
                          getOptionStyle(question, option)
                        }
                      >
                        {isMulti ? (
                          <input
                            type="checkbox"
                            className="appearance-none w-0 h-0"
                            checked={
                              selectedAnswers[question.id]?.includes(option) ||
                              false
                            }
                            onChange={() => handleSelect(question, option)}
                            disabled={
                              submitted ||
                              (!selectedAnswers[question.id]?.includes(
                                option
                              ) &&
                                selectedAnswers[question.id]?.length >=
                                  requiredSelections)
                            }
                          />
                        ) : (
                          <input
                            type="radio"
                            className="appearance-none w-0 h-0"
                            checked={
                              selectedAnswers[question.id]?.includes(option) ||
                              false
                            }
                            onChange={() => handleSelect(question, option)}
                            name={`mcq-${question.id}`}
                          />
                        )}
                        <span
                          className={
                            `font-bold text-base mr-2 ` +
                            (submitted
                              ? (() => {
                                  if (correct) {
                                    return "text-emerald-600";
                                  } else if (selected && !correct) {
                                    return "text-rose-600";
                                  } else {
                                    return "text-gray-400";
                                  }
                                })()
                              : selectedAnswers[question.id]?.includes(option)
                              ? "text-[var(--color-primary-bg,#e6f4f3)]"
                              : "text-[var(--color-primary)]")
                          }
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {submitted && (
                          <div className="flex-shrink-0">
                            {correct && selected ? (
                              <FaCircleCheck className="text-green-500 text-lg" />
                            ) : selected && !correct ? (
                              <FaCircleXmark className="text-red-500 text-lg" />
                            ) : correct ? (
                              <FaCircleCheck className="text-green-500 text-lg" />
                            ) : (
                              <div className="w-5 h-5" />
                            )}
                          </div>
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200 flex-shrink-0">
        {!submitted ? (
          <button
            type="button"
            disabled={!allAnswered()}
            onClick={handleSubmit}
            className="w-full bg-[#1D5554] text-white py-3 px-4 rounded-lg font-medium text-base hover:bg-[#174342] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Submit Answers
          </button>
        ) : (
          <CorrectionDisplay
            correct={calculateScore().correct}
            total={calculateScore().total}
          />
        )}
      </div>
    </div>
  );
}
