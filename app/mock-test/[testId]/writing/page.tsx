"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaDoorOpen, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

// Mock writing test data
const writingTestData = {
  task1: {
    title: "Writing Task 1",
    prompt: `The chart below shows the percentage of households in different income brackets in three countries in 2020.

Summarize the information by selecting and reporting the main features, and make comparisons where relevant.

Write at least 150 words.`,
    timeLimit: 20, // minutes
    wordLimit: 150,
  },
  task2: {
    title: "Writing Task 2",
    prompt: `Some people believe that the best way to reduce crime is to give longer prison sentences. Others believe that there are better alternative ways of reducing crime.

Discuss both views and give your opinion.

Write at least 250 words.`,
    timeLimit: 40, // minutes
    wordLimit: 250,
  },
};

export default function WritingTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params?.testId;
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [currentTask, setCurrentTask] = useState(1); // 1 or 2
  const [task1Answer, setTask1Answer] = useState("");
  const [task2Answer, setTask2Answer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - handle test completion
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleExit = () => {
    if (confirm("Are you sure you want to exit? Your progress will be lost.")) {
      router.push(`/mock-test/${testId}`);
    }
  };

  const handleTaskChange = (taskNumber: number) => {
    setCurrentTask(taskNumber);
  };

  const handleAnswerChange = (taskNumber: number, value: string) => {
    if (taskNumber === 1) {
      setTask1Answer(value);
    } else {
      setTask2Answer(value);
    }
  };

  const handleSubmitAnswers = () => {
    if (confirm("Are you sure you want to submit your answers?")) {
      setSubmitted(true);
      // Navigate to next section or finish test
      setTimeout(() => {
        router.push(`/mock-test/${testId}/speaking-preview`);
      }, 2000);
    }
  };

  const getCurrentTaskData = () => {
    return currentTask === 1 ? writingTestData.task1 : writingTestData.task2;
  };

  const getCurrentAnswer = () => {
    return currentTask === 1 ? task1Answer : task2Answer;
  };

  const getWordCount = (text: string) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const currentTaskData = getCurrentTaskData();
  const currentAnswer = getCurrentAnswer();
  const wordCount = getWordCount(currentAnswer);
  const isWordLimitMet = wordCount >= currentTaskData.wordLimit;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Bar */}
      <header
        className="w-full flex items-center px-8 py-4 bg-white relative border-b border-gray-300"
        style={{ borderBottomWidth: "3px" }}
      >
        <button
          onClick={handleExit}
          className="flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-selected)] transition-colors z-10"
        >
          <FaDoorOpen className="text-xl" />
          <span className="font-bold tracking-tighter">EXIT</span>
        </button>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Image
              src="/img/duo-picmain.svg"
              alt="Lexico Logo"
              width={32}
              height={32}
            />
            <span className="text-2xl font-extrabold text-[var(--color-primary)] tracking-tighter">
              Lexico Academy
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <FaClock className="text-[var(--color-primary)] text-xl" />
          <span className="font-extrabold tracking-tighter text-[var(--color-primary)]">
            {formatTime(timeLeft)}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Prompt Card */}
          <div className="h-[650px]">
            <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentTaskData.title}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleTaskChange(1)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      currentTask === 1
                        ? "bg-[#1D5554] text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    Task 1
                  </button>
                  <button
                    onClick={() => handleTaskChange(2)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      currentTask === 2
                        ? "bg-[#1D5554] text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    Task 2
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Time: {currentTaskData.timeLimit} minutes | Words:{" "}
                    {currentTaskData.wordLimit} minimum
                  </p>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {currentTaskData.prompt}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Answer Card */}
          <div className="h-[650px]">
            <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Answer
              </h2>

              {/* Text Area */}
              <div className="flex-1 flex flex-col">
                <textarea
                  value={currentAnswer}
                  onChange={(e) =>
                    handleAnswerChange(currentTask, e.target.value)
                  }
                  placeholder="Start writing your answer here..."
                  className="flex-1 w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#1D5554] focus:border-transparent text-gray-700 leading-relaxed"
                  style={{
                    fontFamily: "monospace",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                />
              </div>

              {/* Word Count and Submit */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm font-medium ${
                        isWordLimitMet ? "text-green-600" : "text-gray-600"
                      }`}
                    >
                      Words: {wordCount} / {currentTaskData.wordLimit}
                    </span>
                    <span className="text-sm text-gray-500">
                      Time: {currentTaskData.timeLimit} minutes
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmitAnswers}
                  disabled={!isWordLimitMet || submitted}
                  className="w-full bg-[#1D5554] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#174342] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {submitted ? "Submitted Successfully!" : "Submit Answers"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <header className="w-full flex items-center px-8 py-4 bg-white shadow-sm relative sticky bottom-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <span className="text-[var(--color-primary)] text-sm font-semibold mb-2">
              Writing Tasks
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleTaskChange(1)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-colors ${
                  currentTask === 1
                    ? "bg-[#1D5554] text-white"
                    : "bg-gray-300 text-gray-600 hover:bg-gray-400"
                }`}
              >
                1
              </button>
              <button
                onClick={() => handleTaskChange(2)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-colors ${
                  currentTask === 2
                    ? "bg-[#1D5554] text-white"
                    : "bg-gray-300 text-gray-600 hover:bg-gray-400"
                }`}
              >
                2
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-3 ml-auto">
          <button className="w-10 h-10 bg-[#1D5554] rounded-full flex items-center justify-center text-white hover:bg-[#174342] transition-colors">
            <FaChevronLeft />
          </button>
          <button className="w-10 h-10 bg-[#1D5554] rounded-full flex items-center justify-center text-white hover:bg-[#174342] transition-colors">
            <FaChevronRight />
          </button>
        </div>
      </header>
    </div>
  );
}
