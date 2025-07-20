import React from "react";

export default function PracticeSkeleton() {
  return (
    <div className="min-h-screen pb-10 bg-white">
      {/* Header Skeleton */}
      <div className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-48 mt-2 animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-gray-200" />
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-10 px-4">
        {/* Left Column - Passage Skeleton */}
        <div className="h-[650px]">
          <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col">
            {/* Title */}
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
            {/* Passage content */}
            <div className="space-y-3 flex-1">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="flex gap-2">
                  <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Questions Skeleton */}
        <div className="h-[650px]">
          <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
              {/* Instructions */}
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
            {/* Questions - with overflow handling */}
            <div className="space-y-4 flex-1 overflow-y-auto scrollbar-hide">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="rounded-lg p-4 bg-gray-100">
                  <div className="h-5 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, j) => (
                      <div
                        key={j}
                        className="h-4 bg-gray-200 rounded w-full animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Submit button */}
            <div className="mt-6 pt-4 flex-shrink-0">
              <div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
