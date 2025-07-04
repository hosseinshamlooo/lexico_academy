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
    <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-center flex-shrink-0">
        {title}
      </h2>
      <div className="text-gray-800 space-y-6 flex-1 overflow-y-auto scrollbar-hide">
        {hasLetters
          ? paragraphs.map((para, idx) => {
              const match = para.match(/^([A-Z])\.\s+(.*)$/);
              return (
                <div key={idx} className="flex items-start gap-3">
                  {match ? (
                    <>
                      <span
                        className="flex-shrink-0 text-xl font-extrabold leading-none pt-1 min-w-[2.5rem] text-center"
                        style={{ color: "#1D5554" }}
                      >
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
