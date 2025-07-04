import React from "react";

interface CardPracticePassageProps {
  title: string;
  passage: string;
}

function CardPracticePassage({ title, passage }: CardPracticePassageProps) {
  // Split by double newlines for paragraphs
  const paragraphs = passage.split(/\n\s*\n/);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="text-gray-800 space-y-6">
        {paragraphs.map((para, idx) => {
          // Match a leading letter and dot (e.g., 'A. ')
          const match = para.match(/^([A-Z])\.\s+(.*)$/);
          return (
            <div key={idx} className="flex items-start gap-3">
              {match ? (
                <>
                  <span className="flex-shrink-0 text-xl font-extrabold text-green-700 leading-none pt-1 min-w-[2.5rem] text-center">
                    {match[1]}
                  </span>
                  <span className="block text-base leading-relaxed">
                    {match[2]}
                  </span>
                </>
              ) : (
                <>
                  <span className="flex-shrink-0 min-w-[2.5rem]"></span>
                  <span className="block text-base leading-relaxed">
                    {para}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CardPracticePassage;
