import React, { useState } from "react";
import InstructionBox from "@/app/components/InstructionBox";

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
      "inline-block w-24 px-2 py-1 border rounded text-center mx-1 focus:outline-none focus:ring-2 focus:ring-primary transition-all " +
      (submitted
        ? correct
          ? "bg-green-100 border-green-500"
          : "bg-red-100 border-red-500"
        : "bg-yellow-50 border-yellow-300"),
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.value),
    disabled: submitted,
    id: `blank-${idx}`,
    autoComplete: "off",
  };
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

  const blanks = content.flatMap((item) => {
    if (!item) return [];
    if (item.type === "blank") {
      return [item];
    }
    if (item.type === "bullet" && Array.isArray(item.content)) {
      return item.content.filter((c) => c && c.type === "blank");
    }
    return [];
  }) as TableContentBlank[];

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

  function BlankInput({ id }: { id: string }) {
    return (
      <input
        type="text"
        {...getBlankInputProps(
          id,
          userAnswers[id] || "",
          (v) => handleChange(id, v),
          submitted,
          isCorrect(id)
        )}
      />
    );
  }

  function renderContent(content: TableContent[]) {
    if (!Array.isArray(content)) return null;

    return content.map((item, idx) => {
      if (!item) return null;

      if (item.type === "text") {
        return <span key={idx}>{item.text}</span>;
      }
      if (item.type === "blank") {
        return <BlankInput key={item.id} id={item.id} />;
      }
      if (item.type === "bullet" && Array.isArray(item.content)) {
        return (
          <li key={idx} className="mb-1">
            {renderContent(item.content)}
          </li>
        );
      }
      return null;
    });
  }

  // Split top-level content into bullets and non-bullets with safety checks
  const bullets = content.filter(
    (c) => c && c.type === "bullet"
  ) as TableContentBullet[];
  const nonBullets = content.filter((c) => c && c.type !== "bullet");

  return (
    <div className="w-full">
      {questionSet.title && (
        <h2 className="text-2xl font-bold text-center mb-4">
          {questionSet.title}
        </h2>
      )}
      {questionSet.instructions && (
        <InstructionBox className="mb-4">
          {questionSet.instructions}
        </InstructionBox>
      )}
      <div className="bg-base-100 rounded-lg p-6 shadow space-y-4">
        <div className="text-lg">{renderContent(nonBullets)}</div>
        {bullets.length > 0 && (
          <ul className="list-disc ml-6 mt-2 space-y-1">
            {bullets.map((b, idx) => (
              <React.Fragment key={idx}>{renderContent([b])}</React.Fragment>
            ))}
          </ul>
        )}
        <div className="mt-6 flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() => setSubmitted(true)}
            disabled={submitted}
          >
            Submit
          </button>
          {submitted && (
            <span className="text-sm text-gray-600 mt-2">
              Score: {blanks.filter((b) => isCorrect(b.id)).length} /{" "}
              {blanks.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
