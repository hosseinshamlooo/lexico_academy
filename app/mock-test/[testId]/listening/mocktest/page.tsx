"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaDoorOpen,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaVolumeUp,
} from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

// Mock test data
const testData = {
  currentPart: 3,
  totalParts: 4,
  currentQuestion: 25,
  totalQuestions: 40,
  timeLeft: 28 * 60 + 38, // 28:38 in seconds
  audioUrl: "/401542__conarb13__pop-sound.mp3", // Mock audio file
  instructions:
    "Listen to the audio recording and answer the questions that follow. You will hear the recording only once.",
  questions: [
    {
      id: 25,
      type: "mcq",
      text: "Beverly is familiar with spiny leaf insects because",
      options: [
        "She used to live near their native habitat.",
        "She watched a documentary about that species.",
        "She saw some of them in a museum in Sydney.",
      ],
    },
    {
      id: 26,
      type: "mcq",
      text: "Why had Beverly never held a spiny leaf insect?",
      options: [
        "She was injured when she tried to pick one up.",
        "The insects that she saw were too far above the ground.",
        "She thought they might be venomous.",
      ],
    },
    {
      id: 27,
      type: "mcq",
      text: "How are female and male spiny leaf insects different?",
      options: [
        "The males are larger.",
        "The males have more spikes.",
        "The males can use their wings to fly.",
      ],
    },
    {
      id: 28,
      type: "mcq",
      text: "What does Beverly imply about the relationship between stick insects and praying mantises?",
      options: [
        "Mantises are predators that evolved from herbivorous stick insects.",
        "The two kinds of insects responded similarly to the same environmental pressure.",
        "They use the same kinds of camouflage because they are related.",
      ],
    },
    {
      id: 29,
      type: "fill-blank",
      text: "The spiny leaf insect's camouflage is most effective when it _________.",
      answer: "",
    },
    {
      id: 30,
      type: "fill-blank",
      text: "Beverly suggests that the insects' survival depends on their ability to _________.",
      answer: "",
    },
  ],
};

export default function ListeningTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params?.testId;
  const [timeLeft, setTimeLeft] = useState(testData.timeLeft);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
      // Navigate to reading preview after submission
      setTimeout(() => {
        router.push(`/mock-test/${testId}/reading-preview`);
      }, 2000);
    }
  };

  const handleAudioPlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(progress);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setAudioProgress(0);
  };

  const allQuestionsAnswered = () => {
    return testData.questions.every(
      (question) =>
        selectedAnswers[question.id] &&
        selectedAnswers[question.id].trim() !== ""
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Bar */}
      <header className="w-full flex items-center px-42 py-4 bg-white relative border-2 border-gray-300">
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
          {/* Listening Card */}
          <div className="h-[650px]">
            <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-center flex-shrink-0">
                Part {testData.currentPart} - Listening
              </h2>

              {/* Instructions */}
              <div className="mb-6 flex-shrink-0">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm leading-relaxed">
                    {testData.instructions}
                  </p>
                </div>
              </div>

              {/* Audio Player */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="mb-4">
                      <FaVolumeUp className="text-4xl text-gray-400 mx-auto mb-2" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        Audio Recording
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Questions {testData.currentQuestion} -{" "}
                        {testData.currentQuestion +
                          testData.questions.length -
                          1}
                      </p>
                    </div>

                    {/* Audio Controls */}
                    <div className="space-y-4">
                      <button
                        onClick={handleAudioPlay}
                        className="w-16 h-16 bg-[#1D5554] text-white rounded-full flex items-center justify-center hover:bg-[#174342] transition-colors"
                      >
                        {isPlaying ? (
                          <FaPause size={20} />
                        ) : (
                          <FaPlay size={20} />
                        )}
                      </button>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 bg-[#1D5554] rounded-full transition-all duration-300"
                          style={{ width: `${audioProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hidden Audio Element */}
              <audio
                ref={audioRef}
                src={testData.audioUrl}
                onTimeUpdate={handleAudioTimeUpdate}
                onEnded={handleAudioEnded}
                preload="metadata"
              />
            </div>
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
                        testData.questions.length) *
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
                of {testData.questions.length} questions answered
              </p>

              {/* Questions */}
              <div className="space-y-6 flex-1 overflow-y-auto scrollbar-hide">
                {testData.questions.map((question) => (
                  <div
                    key={question.id}
                    className="border-b border-gray-200 pb-6"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Question {question.id}
                    </h4>

                    {question.type === "mcq" ? (
                      <div>
                        <p className="text-gray-700 mb-4">{question.text}</p>
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
                                checked={
                                  selectedAnswers[question.id] === option
                                }
                                onChange={(e) =>
                                  handleAnswerChange(
                                    question.id,
                                    e.target.value
                                  )
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
                    ) : (
                      <div>
                        <p className="text-gray-700 mb-4">{question.text}</p>
                        <input
                          type="text"
                          value={selectedAnswers[question.id] || ""}
                          onChange={(e) =>
                            handleAnswerChange(question.id, e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Type your answer here..."
                        />
                      </div>
                    )}
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
                      Answers submitted successfully!
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
          {[1, 2, 3, 4].map((part) => (
            <div key={part} className="flex flex-col items-center">
              <span className="text-[var(--color-primary)] text-sm font-semibold mb-2">
                Part {part}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: 10 }, (_, i) => {
                  const questionNumber = (part - 1) * 10 + i + 1;
                  const isCurrentQuestion =
                    questionNumber === testData.currentQuestion;
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
