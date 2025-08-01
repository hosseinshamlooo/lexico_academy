"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaPlay,
  FaVolumeUp,
  FaEllipsisV,
  FaBrain,
} from "react-icons/fa";
import Image from "next/image";

// Mock test data - in a real app, this would come from an API
const mockTests = [
  {
    id: 1,
    title: "IELTS Full Mock Test 1",
    description:
      "Complete IELTS mock test covering all four sections: Reading, Listening, Writing, and Speaking.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Medium",
    status: "available",
    score: null,
    maxScore: 120,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 2,
    title: "IELTS Full Mock Test 2",
    description:
      "Simulate the real IELTS exam with a full-length test: Reading, Listening, Writing, and Speaking.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Hard",
    status: "completed",
    score: 98,
    maxScore: 120,
    completedAt: "2024-01-15",
    estimatedScore: null,
  },
  {
    id: 3,
    title: "IELTS Full Mock Test 3",
    description:
      "Practice all IELTS skills in one go: Reading, Listening, Writing, and Speaking.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Easy",
    status: "available",
    score: null,
    maxScore: 120,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 4,
    title: "IELTS Full Mock Test 4",
    description: "Authentic IELTS exam simulation for all four sections.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Hard",
    status: "locked",
    score: null,
    maxScore: 120,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 5,
    title: "IELTS Full Mock Test 5",
    description:
      "Full-length IELTS test with new question types and updated topics.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Medium",
    status: "available",
    score: null,
    maxScore: 120,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 6,
    title: "IELTS Full Mock Test 6",
    description: "Challenging IELTS mock test for advanced learners.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Hard",
    status: "locked",
    score: null,
    maxScore: 120,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 7,
    title: "IELTS Full Mock Test 7",
    description: "Comprehensive IELTS test with a focus on time management.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Medium",
    status: "available",
    score: null,
    maxScore: 120,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 8,
    title: "IELTS Full Mock Test 8",
    description: "Realistic IELTS exam experience with authentic materials.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Easy",
    status: "available",
    score: null,
    maxScore: 120,
    completedAt: null,
    estimatedScore: null,
  },
];

type TestStep = "listening-preview" | "mic-check";

export default function MockTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = parseInt(params?.testId as string);
  const [currentStep, setCurrentStep] = useState<TestStep>("listening-preview");
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  const test = mockTests.find((t) => t.id === testId);

  const handleBack = () => {
    if (currentStep === "listening-preview") {
      router.push("/dashboard");
    } else if (currentStep === "mic-check") {
      setCurrentStep("listening-preview");
    }
  };

  const handleStartListening = () => {
    setCurrentStep("mic-check");
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setHasRecording(true);
      setTimeout(() => {
        setNextEnabled(true);
      }, 5000);
    }, 3000);
  };

  const handleNext = () => {
    router.push(`/mock-test/${testId}/listening/mocktest`);
  };

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1D5554] mb-4">
            Test Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The requested test could not be found.
          </p>
          <button
            onClick={handleBack}
            className="bg-[#1D5554] text-white px-6 py-3 rounded-xl hover:bg-[#17403f] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Render Listening Preview Step
  if (currentStep === "listening-preview") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="w-full flex items-center px-8 py-4 bg-white shadow-sm relative">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#1D5554] hover:text-[#17403f] transition-colors z-10"
          >
            <FaArrowLeft className="text-lg" />
            <span className="font-semibold">EXIT</span>
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            <Image
              src="/img/duo-picmain.svg"
              alt="Lexico Logo"
              width={32}
              height={32}
            />
            <span className="text-2xl font-extrabold text-[#1D5554] tracking-tighter">
              Lexico Academy
            </span>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
          <div className="bg-white rounded-3xl shadow-[0_8px_0_0_#1D5554] border-3 border-[#1D5554] p-8 max-w-2xl w-full">
            {/* Title */}
            <h1 className="text-3xl font-extrabold text-center text-[#1D5554] mb-6">
              IELTS Academic Listening
            </h1>

            {/* Duration */}
            <p className="text-lg text-gray-600 text-center mb-8">
              You will have approximately 30 minutes to do the Listening test.
            </p>

            {/* Instructions Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#1D5554] mb-4">
                Instructions to Test Takers
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Answer all the questions.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    You can change your answers at any time during the test.
                  </span>
                </li>
              </ul>
            </div>

            {/* Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#1D5554] mb-4">
                Information for Test Takers
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>There are 40 questions in this test.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Each question carries one mark.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>There are four parts to the test.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You will hear each part once.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    For each part of the test there will be time for you to look
                    through the questions and time for you to check your
                    answers.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    You can prepare a piece of paper and a pencil to take notes
                    during this test.
                  </span>
                </li>
              </ul>
            </div>

            {/* Start Test Button */}
            <div className="text-center">
              <button
                onClick={handleStartListening}
                className="bg-[#1D5554] text-white px-12 py-4 text-lg font-bold rounded-xl shadow-[0_6px_0_#17403f] hover:bg-[#17403f] transition-all duration-200 active:transform active:translate-y-1 active:shadow-[0_2px_0_#17403f]"
              >
                Test Microphone
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Right Icon */}
        <div className="fixed bottom-4 right-4">
          <FaBrain className="text-gray-400 text-2xl" />
        </div>
      </div>
    );
  }

  // Render Mic Check Step
  if (currentStep === "mic-check") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="w-full flex items-center px-8 py-4 bg-white shadow-sm relative">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#1D5554] hover:text-[#17403f] transition-colors z-10"
          >
            <FaArrowLeft className="text-lg" />
            <span className="font-semibold">EXIT</span>
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            <Image
              src="/img/duo-picmain.svg"
              alt="Lexico Logo"
              width={32}
              height={32}
            />
            <span className="text-2xl font-extrabold text-[#1D5554] tracking-tighter">
              Lexico Academy
            </span>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
          <div className="bg-white rounded-3xl shadow-[0_8px_0_0_#1D5554] border-3 border-[#1D5554] p-8 max-w-2xl w-full">
            {/* Title */}
            <h1 className="text-3xl font-extrabold text-center text-[#1D5554] mb-6">
              Microphone Test
            </h1>

            {/* Prompt Box */}
            <div className="bg-gray-100 rounded-xl p-6 mb-8 border border-gray-200">
              <p className="text-lg text-gray-700 text-center">
                &ldquo;Briefly introduce yourself.&rdquo;
              </p>
            </div>

            {/* Start Recording Button */}
            <div className="text-center mb-8">
              <button
                onClick={handleStartRecording}
                disabled={isRecording}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                  isRecording
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-[#FF5A5F] hover:bg-red-600 text-white shadow-lg"
                }`}
              >
                {isRecording ? "Recording..." : "Start Recording"}
              </button>
            </div>

            {/* Audio Player */}
            <div className="bg-gray-50 rounded-xl p-4 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaPlay className="text-gray-400 text-xl" />
                  <span className="text-gray-600 font-medium">
                    {hasRecording ? "0:03 / 0:03" : "0:00 / 0:00"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaVolumeUp className="text-gray-400" />
                  <FaEllipsisV className="text-gray-400" />
                </div>
              </div>
              {/* Audio Waveform */}
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gray-400 transition-all duration-300 ${
                    hasRecording ? "w-full" : "w-0"
                  }`}
                ></div>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="bg-[#1D5554] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-gray-700">
                  Record yourself answering the statement above.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-[#1D5554] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-gray-700">
                  Check your recording and make sure you can&apos;t hear any
                  background noise.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-[#1D5554] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-gray-700">
                  If you can hear yourself clearly, click the &ldquo;Next&rdquo;
                  button. The &ldquo;Next&rdquo; button will be activated after
                  5 seconds.
                </p>
              </div>
            </div>

            {/* Next Button */}
            <div className="text-center">
              <button
                onClick={handleNext}
                disabled={!nextEnabled}
                className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-200 ${
                  nextEnabled
                    ? "bg-[#1D5554] text-white shadow-[0_6px_0_#17403f] hover:bg-[#17403f] active:transform active:translate-y-1 active:shadow-[0_2px_0_#17403f]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Begin Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
