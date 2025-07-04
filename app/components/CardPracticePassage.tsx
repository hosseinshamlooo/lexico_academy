import React from "react";

interface CardPracticePassageProps {
  title: string;
  passage: string;
}

function CardPracticePassage({ title, passage }: CardPracticePassageProps) {
  // Split by double newlines for paragraphs
  const paragraphs = passage.split(/\n\s*\n/);
  // Detect if any paragraph starts with a letter
  const hasLetters = paragraphs.some((para) => /^([A-Z])\.\s+/.test(para));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="text-gray-800 space-y-6">
        {hasLetters
          ? paragraphs.map((para, idx) => {
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
            })
          : paragraphs.map((para, idx) => (
              <p key={idx} className="text-base leading-relaxed">
                {para}
              </p>
            ))}
      </div>
    </div>
  );
}

export default CardPracticePassage;
