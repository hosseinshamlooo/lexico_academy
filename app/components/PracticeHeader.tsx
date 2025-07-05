import React from "react";
import TimerPractice from "@/app/components/TimerPractice";

interface PracticeHeaderProps {
  title: string;
}

function PracticeHeader({ title }: PracticeHeaderProps) {
  return (
    <div
      className="bg-gray-100 border-b border-gray-300"
      style={{ borderBottomWidth: "3px" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1D5554] tracking-tighter">
              {title}
            </h1>
            <p className="text-gray-700 mt-1">
              Practice your skills with this passage
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <TimerPractice duration={300} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticeHeader;
