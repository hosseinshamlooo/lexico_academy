// CardPracticeQuestionsMCQ.tsx
// Renders all MCQ questions in a single card, styled like CardPracticeQuestionsItem, with multi/single answer support.

"use client";
import React, { useState } from "react";
import InstructionBox from "@/app/components/InstructionBox";

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
  };
}

export default function CardPracticeQuestionsMCQ({
  questionSet,
}: CardPracticeQuestionsMCQProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string[];
  }>(() => {
    const initial: { [key: string]: string[] } = {};
    questionSet.questions.forEach((q) => {
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
        ? "bg-blue-100 border-blue-500"
        : "bg-white border-gray-300 hover:bg-gray-50";
    }
    const correctOptions = getCorrectOptions(question);
    const correct = correctOptions.includes(option);
    const selected = selectedAnswers[question.id]?.includes(option);
    if (correct) {
      return "bg-green-100 border-green-500 text-green-700";
    } else if (selected && !correct) {
      return "bg-red-100 border-red-500 text-red-700";
    } else {
      return "bg-white border-gray-300";
    }
  }

  function allAnswered() {
    return questionSet.questions.every((q) => {
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
    questionSet.questions.forEach((q) => {
      const correctOptions = getCorrectOptions(q);
      total += correctOptions.length;
      const selected = selectedAnswers[q.id] || [];
      // Count how many correct options were selected (per answer)
      correct += correctOptions.filter((opt) => selected.includes(opt)).length;
    });
    return { correct, total };
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Multiple Choice
        </h2>
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
          {questionSet.questions.length} questions answered
        </p>
      </div>
      <div className="space-y-6">
        {questionSet.questions.map((question) => {
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
                {question.options.map((option, optIdx) => (
                  <label
                    key={optIdx}
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
                          (!selectedAnswers[question.id]?.includes(option) &&
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
                    <span className="font-bold text-base mr-2 text-[#1D5554]">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200">
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
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {calculateScore().correct}/{calculateScore().total}
            </div>
            <div className="text-sm text-gray-600">
              {Math.round(
                (calculateScore().correct / calculateScore().total) * 100
              )}
              % correct
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
