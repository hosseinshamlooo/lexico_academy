"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaBrain } from "react-icons/fa";
import Image from "next/image";

export default function ReadingPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params?.testId;

  const handleExit = () => {
    router.push(`/mock-test/${testId}`);
  };

  const handleStartTest = () => {
    router.push(`/mock-test/${testId}/reading`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full flex items-center px-8 py-4 bg-white shadow-sm relative">
        <button
          onClick={handleExit}
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
            IELTS Academic Reading
          </h1>

          {/* Duration */}
          <p className="text-lg text-gray-600 text-center mb-8">
            You will have 60 minutes to do the Reading test.
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
                <span>There are three passages to read.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  You can read the passages as many times as you need.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  You can move between questions and passages during the test.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Make sure to read the instructions for each question type
                  carefully.
                </span>
              </li>
            </ul>
          </div>

          {/* Start Test Button */}
          <div className="text-center">
            <button
              onClick={handleStartTest}
              className="bg-[#1D5554] text-white px-12 py-4 text-lg font-bold rounded-xl shadow-[0_6px_0_#17403f] hover:bg-[#17403f] transition-all duration-200 active:transform active:translate-y-1 active:shadow-[0_2px_0_#17403f]"
            >
              START TEST
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
