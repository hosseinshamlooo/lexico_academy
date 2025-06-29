import React from "react";

interface PracticeHeaderProps {
  title: string;
}

function PracticeHeader({ title }: PracticeHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-1">
              Practice your skills with this passage
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Time remaining</div>
              <div className="text-lg font-semibold text-gray-900">15:00</div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">P</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticeHeader;
