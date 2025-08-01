"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaPlay, FaVolumeUp, FaEllipsisV } from "react-icons/fa";

export default function MicCheckPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params?.testId;
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  useEffect(() => {
    if (hasRecording) {
      const timer = setTimeout(() => {
        setNextEnabled(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasRecording]);

  const handleExit = () => {
    router.push(`/mock-test/${testId}/listening-preview`);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setHasRecording(true);
    }, 3000);
  };

  const handleNext = () => {
    router.push(`/mock-test/${testId}/listening/mocktest`);
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
            Microphone Test
          </h1>

          {/* Prompt Box */}
          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <p className="text-lg text-gray-700 text-center">
              &ldquo;Hello introduce yourself.&rdquo;
            </p>
          </div>

          {/* Start Recording Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleStartRecording}
              disabled={isRecording}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
                isRecording
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
              }`}
            >
              {isRecording ? "RECORDING..." : "START RECORDING"}
            </button>
          </div>

          {/* Audio Player */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
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
              <span className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                1
              </span>
              <p className="text-gray-700">
                Record yourself answering the statement above.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                2
              </span>
              <p className="text-gray-700">
                Check your recording and make sure you can&apos;t hear any
                background noise.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                3
              </span>
              <p className="text-gray-700">
                If you can hear yourself clearly, click the &ldquo;Next&rdquo;
                button. The &ldquo;Next&rdquo; button will be activated after 5
                seconds.
              </p>
            </div>
          </div>

          {/* Next Button */}
          <div className="text-center">
            <button
              onClick={handleNext}
              disabled={!nextEnabled}
              className={`px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200 ${
                nextEnabled
                  ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
