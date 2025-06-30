import React from "react";

interface CardPracticePassageProps {
  title: string;
  passage: string;
}

function CardPracticePassage({ title, passage }: CardPracticePassageProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="text-gray-800 whitespace-pre-line">{passage}</p>
    </div>
  );
}

export default CardPracticePassage;
