"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaBrain } from "react-icons/fa";

export default function ListeningPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params?.testId;

  const handleExit = () => {
    router.push(`/mock-test/${testId}`);
  };

  const handleStartTest = () => {
    router.push(`/mock-test/${testId}/listening/mic-check`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Bar */}
      <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
        <button
          onClick={handleExit}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <FaArrowLeft className="text-lg" />
          <span className="font-semibold">EXIT</span>
        </button>
        <div className="flex-1" />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            IELTS Academic Listening
          </h1>

          {/* Duration */}
          <p className="text-lg text-gray-700 text-center mb-8">
            You will have approximately 30 minutes to do the Listening test.
          </p>

          {/* Instructions Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">
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
                  through the questions and time for you to check your answers.
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
              onClick={handleStartTest}
              className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors shadow-lg"
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
