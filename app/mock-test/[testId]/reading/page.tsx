"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaDoorOpen, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import PracticeHeader from "@/app/components/PracticeHeader";
import CardPracticePassage from "@/app/components/CardPracticePassage";
import CardPracticeQuestionsMCQ from "@/app/components/CardPracticeQuestionsMCQ";
import CardPracticeQuestionsWordBankCompletion from "@/app/components/CardPracticeQuestionsWordBankCompletion";
import CardPracticeQuestionsMatchingInfo from "@/app/components/CardPracticeQuestionsMatchingInfo";
import CardPracticeQuestionsDiagramLabelling from "@/app/components/CardPracticeQuestionsDiagramLabelling";
import CardPracticeQuestionsCompletion from "@/app/components/CardPracticeQuestionsCompletion";
import CardPracticeQuestionsMatchingHeadings from "@/app/components/CardPracticeQuestionsMatchingHeadings";
import CardPracticeQuestionsTable from "@/app/components/CardPracticeQuestionsTable";

// Mock reading test data
const readingTestData = {
  title: "The Future of Renewable Energy",
  passage: `The transition to renewable energy sources represents one of the most significant challenges and opportunities of the 21st century. As the world grapples with climate change and the need to reduce greenhouse gas emissions, renewable energy technologies have emerged as viable alternatives to fossil fuels.

Solar power, once considered expensive and inefficient, has seen dramatic improvements in both cost and performance. The cost of solar panels has decreased by more than 80% over the past decade, making solar energy competitive with traditional power sources in many regions. Advances in photovoltaic technology have also increased efficiency, with modern panels converting up to 22% of sunlight into electricity.

Wind energy has also experienced remarkable growth, particularly in offshore installations where wind speeds are more consistent and higher. Modern wind turbines can generate enough electricity to power thousands of homes, and floating wind farms are opening up new areas for development in deeper waters.

Hydropower remains the largest source of renewable electricity globally, providing about 16% of the world's electricity. While large-scale hydroelectric dams have faced environmental concerns, smaller run-of-river projects and pumped storage facilities offer more sustainable alternatives.

The integration of renewable energy into existing power grids presents both technical and economic challenges. Energy storage technologies, particularly batteries, are crucial for managing the intermittent nature of solar and wind power. Grid modernization and smart grid technologies are enabling better management of renewable energy sources.

Despite the progress, significant barriers remain. The initial capital costs of renewable energy projects can be high, though they are often offset by lower operating costs over time. Political and regulatory frameworks also play a crucial role in determining the pace of adoption.

The future of renewable energy depends not only on technological advances but also on policy decisions, market forces, and public acceptance. As costs continue to decline and technology improves, renewable energy is expected to play an increasingly dominant role in the global energy mix.`,
  questionSet: {
    questions: [
      {
        id: 1,
        question:
          "What has been the most significant change in solar power over the past decade?",
        options: [
          "The development of new solar panel materials",
          "A dramatic decrease in cost",
          "An increase in panel size",
          "The invention of solar tracking systems",
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question:
          "According to the passage, what percentage of the world's electricity does hydropower provide?",
        options: ["About 10%", "About 16%", "About 22%", "About 30%"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question:
          "What is mentioned as a key challenge for renewable energy integration?",
        options: [
          "Lack of public interest",
          "Energy storage technologies",
          "Insufficient government funding",
          "Limited research and development",
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question:
          "What type of wind energy installation is mentioned as particularly promising?",
        options: [
          "Onshore wind farms",
          "Offshore installations",
          "Urban wind turbines",
          "Mountain wind farms",
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question:
          "What is described as crucial for managing the intermittent nature of solar and wind power?",
        options: [
          "Nuclear power plants",
          "Fossil fuel backup",
          "Energy storage technologies",
          "Grid expansion",
        ],
        correctAnswer: 2,
      },
    ],
    instructions: "Read the passage and answer the questions that follow.",
  },
};

export default function ReadingTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params?.testId;
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
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

  const handleAnswerChange = (questionId: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleQuestionNavigation = (questionIndex: number) => {
    // This function is used in the footer navigation
    console.log("Navigate to question:", questionIndex);
  };

  const handleSubmitAnswers = () => {
    if (confirm("Are you sure you want to submit your answers?")) {
      setSubmitted(true);
      // Navigate to next section or finish test
      setTimeout(() => {
        router.push(`/mock-test/${testId}/writing-preview`);
      }, 2000);
    }
  };

  const allQuestionsAnswered = () => {
    return readingTestData.questionSet.questions.every(
      (question) =>
        selectedAnswers[question.id] &&
        selectedAnswers[question.id].trim() !== ""
    );
  };

  // Prepare question set for MCQ component
  const mcqQuestionSet = {
    questions: readingTestData.questionSet.questions.map((q, index) => ({
      id: String(index + 1),
      question: q.question,
      options: q.options || [],
      correctAnswer: q.correctAnswer || 0,
      answer: "",
    })),
    instructions: readingTestData.questionSet.instructions,
  };

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
          {/* Reading Passage Card */}
          <div className="h-[650px]">
            <CardPracticePassage
              title={readingTestData.title}
              passage={readingTestData.passage}
            />
          </div>

          {/* Questions Card */}
          <div className="h-[650px]">
            <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Questions
              </h2>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      (Object.values(selectedAnswers).filter(
                        (a) => a.length > 0
                      ).length /
                        readingTestData.questionSet.questions.length) *
                      100
                    }%`,
                    backgroundColor: "#1D5554",
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {
                  Object.values(selectedAnswers).filter((a) => a.length > 0)
                    .length
                }{" "}
                of {readingTestData.questionSet.questions.length} questions
                answered
              </p>

              {/* Questions */}
              <div className="space-y-6 flex-1 overflow-y-auto scrollbar-hide">
                {readingTestData.questionSet.questions.map((question) => (
                  <div
                    key={question.id}
                    className="border-b border-gray-200 pb-6"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Question {question.id}
                    </h4>

                    <div>
                      <p className="text-gray-700 mb-4">{question.question}</p>
                      <div className="space-y-3">
                        {question.options?.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 ${
                              selectedAnswers[question.id] === option
                                ? "bg-[var(--color-primary-bg,#e6f4f3)] border-[var(--color-primary)] text-[var(--color-primary)]"
                                : "bg-white border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={option}
                              checked={selectedAnswers[question.id] === option}
                              onChange={(e) =>
                                handleAnswerChange(question.id, e.target.value)
                              }
                              className="w-4 h-4 text-[#1D5554] border-gray-300 focus:ring-[#1D5554] accent-[#1D5554]"
                            />
                            <span className="font-bold text-base mr-2 text-[var(--color-primary)]">
                              {String.fromCharCode(65 + optionIndex)}
                            </span>
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Answers Button */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex-shrink-0">
                {!submitted ? (
                  <button
                    onClick={handleSubmitAnswers}
                    disabled={!allQuestionsAnswered()}
                    className="w-full bg-[#1D5554] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#174342] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Answers
                  </button>
                ) : (
                  <div className="text-center py-3">
                    <span className="text-green-600 font-medium">
                      Answers submitted successfully! Moving to next section...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <header className="w-full flex items-center px-8 py-4 bg-white shadow-sm relative sticky bottom-0 z-50">
        <div className="flex items-center gap-6">
          {[1, 2, 3].map((passage) => (
            <div key={passage} className="flex flex-col items-center">
              <span className="text-[var(--color-primary)] text-sm font-semibold mb-2">
                Passage {passage}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: 13 }, (_, i) => {
                  const questionNumber = (passage - 1) * 13 + i + 1;
                  const isCurrentQuestion = questionNumber <= 5; // For demo, showing first 5 questions as current
                  const isAnswered = selectedAnswers[questionNumber];

                  return (
                    <button
                      key={i}
                      onClick={() => handleQuestionNavigation(i)}
                      className={`w-6 h-6 rounded-full text-xs font-bold transition-colors ${
                        isCurrentQuestion
                          ? "bg-[#1D5554] text-white"
                          : isAnswered
                          ? "bg-[#1D5554] text-white"
                          : "bg-gray-300 text-gray-600 hover:bg-gray-400"
                      }`}
                    >
                      {questionNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
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
