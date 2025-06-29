import React from "react";

interface CardPracticePassageProps {
  title: string;
  passage: string;
}

function CardPracticePassage({ title, passage }: CardPracticePassageProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: "25%" }}
          ></div>
        </div>
      </div>

      <div className="prose prose-sm max-w-none">
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {passage}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Reading passage</span>
          <span>Word count: {passage.split(" ").length}</span>
        </div>
      </div>
    </div>
  );
}

export default CardPracticePassage;
