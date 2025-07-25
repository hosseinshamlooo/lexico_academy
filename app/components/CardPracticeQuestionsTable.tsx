import React, { useState } from "react";
import InstructionBox from "@/app/components/InstructionBox";
import ProgressBarOnboarding from "@/app/components/ProgressBarOnboarding";
import CorrectionDisplay from "@/app/components/CorrectionDisplay";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

interface TableContentText {
  type: "text";
  text: string;
}
interface TableContentBlank {
  type: "blank";
  id: string;
  answer: string;
}
interface TableContentBullet {
  type: "bullet";
  content: TableContent[];
}

type TableContent = TableContentText | TableContentBlank | TableContentBullet;

interface CardPracticeQuestionsTableProps {
  questionSet: {
    title?: string;
    instructions: string;
    content: TableContent[];
  };
}

function getBlankInputProps(
  idx: string,
  value: string,
  onChange: (v: string) => void,
  submitted: boolean,
  correct: boolean
) {
  return {
    className:
      "inline-block w-24 h-8 px-2 py-1 border-2 rounded text-center mx-1 focus:outline-none focus:ring-2 transition-all text-sm font-medium " +
      (submitted
        ? correct
          ? "bg-green-50 border-green-500 text-green-800"
          : "bg-red-50 border-red-500 text-red-800"
        : "bg-[#e6f4f3] border-[#1D5554] text-[#1D5554] hover:bg-[#d0eae8] focus:bg-white"),
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.value),
    disabled: submitted,
    id: `blank-${idx}`,
    autoComplete: "off",
    placeholder: idx,
  };
}

// Add a regex-based parser for [blank:id:answer] in strings
function parseBlanksInString(str: string) {
  // Returns an array of { type: 'text', text } and { type: 'blank', id, answer }
  const regex = /\[blank:([\w-]+):([^\]]+)\]/g;
  let lastIndex = 0;
  let match;
  const parts: Array<
    | { type: "text"; text: string }
    | { type: "blank"; id: string; answer: string }
  > = [];
  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", text: str.slice(lastIndex, match.index) });
    }
    parts.push({ type: "blank", id: match[1], answer: match[2] });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < str.length) {
    parts.push({ type: "text", text: str.slice(lastIndex) });
  }
  return parts;
}

// Recursively extract all blanks from content
function extractBlanks(content: unknown[]): { id: string; answer: string }[] {
  const blanks: { id: string; answer: string }[] = [];
  for (const item of content) {
    if (!item) continue;
    if (typeof item === "string") {
      const parts = parseBlanksInString(item);
      blanks.push(
        ...(parts.filter((p) => p.type === "blank") as {
          id: string;
          answer: string;
        }[])
      );
    } else if (
      typeof item === "object" &&
      item !== null &&
      "type" in item &&
      (item as { type: string }).type === "bullet" &&
      Array.isArray((item as unknown as { content: unknown[] }).content)
    ) {
      blanks.push(
        ...extractBlanks((item as unknown as { content: unknown[] }).content)
      );
    }
  }
  return blanks;
}

export default function CardPracticeQuestionsTable(
  props: CardPracticeQuestionsTableProps
) {
  // All hooks must be called first

  const [userAnswers, setUserAnswers] = useState<{ [id: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Comprehensive runtime guards
  if (!props.questionSet) {
    return <div className="text-red-500">Question set is missing.</div>;
  }

  if (!Array.isArray(props.questionSet.content)) {
    return (
      <div className="text-red-500">Table data is missing or malformed.</div>
    );
  }

  const { questionSet } = props;
  const content = questionSet.content;

  // Ensure content is valid before processing
  if (!content || content.length === 0) {
    return <div className="text-red-500">No content available.</div>;
  }

  // New blank extraction
  const blanks = extractBlanks(content);

  function handleChange(id: string, value: string) {
    setUserAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function isCorrect(id: string) {
    const blank = blanks.find((b) => b.id === id);
    if (!blank) return false;
    return (
      (userAnswers[id] || "").trim().toLowerCase() ===
      blank.answer.trim().toLowerCase()
    );
  }

  function allAnswered() {
    return blanks.every((b) => (userAnswers[b.id] || "").trim().length > 0);
  }

  // New renderContent: handles string, bullet, and arrays recursively
  function renderContent(content: unknown[]): React.ReactNode {
    if (!Array.isArray(content)) return null;
    return content.map((item, idx) => {
      if (!item) return null;
      if (typeof item === "string") {
        // Parse and render blanks in string
        const parts = parseBlanksInString(item);
        return (
          <span key={idx}>
            {parts.map((part, i) =>
              part.type === "text" ? (
                <span key={i}>{part.text}</span>
              ) : (
                <span
                  key={`${idx}-${i}-${part.id}`}
                  className="inline-flex items-center gap-1 relative"
                >
                  <input
                    type="text"
                    {...getBlankInputProps(
                      part.id,
                      userAnswers[part.id] || "",
                      (v) => handleChange(part.id, v),
                      submitted,
                      isCorrect(part.id)
                    )}
                  />
                  {submitted &&
                    (userAnswers[part.id] || "").trim().length > 0 && (
                      <div className="flex-shrink-0">
                        {isCorrect(part.id) ? (
                          <FaCircleCheck className="text-green-500 text-sm" />
                        ) : (
                          <FaCircleXmark className="text-red-500 text-sm" />
                        )}
                      </div>
                    )}
                  {/* Show only the grey correction box for wrong answers */}
                  {submitted &&
                    (userAnswers[part.id] || "").trim().length > 0 &&
                    !isCorrect(part.id) && (
                      <div className="absolute top-full left-0 mt-1 bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 whitespace-nowrap z-10">
                        <span className="font-semibold text-gray-600">
                          Correct answer:
                        </span>{" "}
                        <span className="text-green-700 font-semibold">
                          {part.answer}
                        </span>
                      </div>
                    )}
                </span>
              )
            )}
          </span>
        );
      }
      if (
        typeof item === "object" &&
        item !== null &&
        "type" in item &&
        (item as { type: string }).type === "bullet" &&
        Array.isArray((item as unknown as { content: unknown[] }).content)
      ) {
        return (
          <li key={idx} className="mb-1 ml-2 md:ml-4">
            {renderContent((item as unknown as { content: unknown[] }).content)}
          </li>
        );
      }
      return null;
    });
  }

  // Progress calculation
  const numAnswered = blanks.filter(
    (b) => (userAnswers[b.id] || "").trim().length > 0
  ).length;
  const totalBlanks = blanks.length;

  return (
    <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 flex flex-col max-w-2xl mx-auto max-h-[80vh] h-full">
      {/* H1 Questions */}
      <h1 className="text-xl font-semibold text-gray-900 mb-2 text-left">
        Questions
      </h1>
      {/* Progress Bar */}
      <div className="mb-4 flex-shrink-0">
        <ProgressBarOnboarding step={numAnswered} total={totalBlanks} />
        <p className="text-sm text-gray-600 mt-2 text-left">
          {numAnswered} of {totalBlanks} blanks filled
        </p>
      </div>
      {/* Instructions always shown */}
      <InstructionBox className="mb-3">
        {questionSet.instructions || ""}
      </InstructionBox>
      {/* Title */}
      {questionSet.title && (
        <h2 className="text-xl font-bold text-center mb-4">
          {questionSet.title}
        </h2>
      )}
      {/* Content (scrollable, ordered) */}
      <div className="bg-base-100 rounded-lg p-4 md:p-6 shadow-none space-y-4 flex-1 overflow-y-auto scrollbar-hide">
        <div className="text-base leading-8 flex flex-col gap-2">
          {renderContent(content)}
        </div>
      </div>
      {/* Submit & Score (sticky at bottom) */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex-shrink-0">
        {!submitted ? (
          <button
            type="button"
            disabled={!allAnswered()}
            onClick={() => setSubmitted(true)}
            className="w-full bg-[#1D5554] text-white py-3 px-4 rounded-lg font-medium text-base hover:bg-[#174342] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Submit Answers
          </button>
        ) : (
          <CorrectionDisplay
            correct={blanks.filter((b) => isCorrect(b.id)).length}
            total={blanks.length}
          />
        )}
      </div>
    </div>
  );
}
