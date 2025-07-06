import React, { useState } from "react";
import Image from "next/image";
import InstructionBox from "@/app/components/InstructionBox";
import ProgressBarOnboarding from "./ProgressBarOnboarding";
import CorrectionDisplay from "@/app/components/CorrectionDisplay";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

interface DiagramLabellingQuestion {
  diagramUrl?: string;
  questions: Array<{ id: string | number; question: string }>;
  answers: string[];
  instructions?: string;
}

interface CardPracticeQuestionsDiagramLabellingProps {
  questionSet: DiagramLabellingQuestion;
  onSubmit?: (inputs: string[], result: boolean[]) => void;
}

function CardPracticeQuestionsDiagramLabelling({
  questionSet,
  onSubmit,
}: CardPracticeQuestionsDiagramLabellingProps) {
  const { diagramUrl, questions, answers } = questionSet;
  const [inputs, setInputs] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<boolean[]>([]);

  function handleChange(idx: number, value: string) {
    const newInputs = [...inputs];
    newInputs[idx] = value;
    setInputs(newInputs);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const result = inputs.map(
      (input, i) =>
        input.trim().toLowerCase() === (answers[i] || "").trim().toLowerCase()
    );
    setFeedback(result);
    if (onSubmit) onSubmit(inputs, result);
  }

  const answeredCount = inputs.filter((a) => a && a.trim() !== "").length;
  const total = questions.length;
  const score = feedback.filter(Boolean).length;

  return (
    <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Questions</h2>
        <div className="mb-4 w-full max-w-xl mx-auto">
          <ProgressBarOnboarding
            step={answeredCount}
            total={questions.length}
          />
          <div className="text-sm text-gray-700 mt-1 text-left">
            {answeredCount} of {questions.length} questions answered
          </div>
        </div>
        {questionSet.instructions && (
          <InstructionBox className="w-full max-w-xl mx-auto mb-3">
            {questionSet.instructions}
          </InstructionBox>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 flex-1 overflow-y-auto scrollbar-hide"
      >
        {diagramUrl && (
          <Image
            src={diagramUrl}
            alt="Diagram"
            className="mb-4 w-full h-auto rounded"
            width={600}
            height={400}
          />
        )}
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const parts = q.question.split(/(\[blank\])/g);
            return (
              <div key={q.id} className="flex flex-col gap-1 py-2 px-0">
                <div className="text-gray-900 mb-1 text-base flex items-center flex-wrap gap-2">
                  <span className="inline">
                    {parts.map((part, i) =>
                      part === "[blank]" ? (
                        <span
                          key={`blank-${idx}-${i}`}
                          className="inline-flex items-center gap-1 relative"
                        >
                          <input
                            type="text"
                            className={`inline-block w-20 align-middle px-1 py-0.5 rounded border border-gray-300 bg-gray-50 focus:border-blue-500 hover:border-blue-500 text-sm transition-all duration-200 ${
                              submitted
                                ? inputs[idx]?.trim().toLowerCase() ===
                                  (answers[idx] || "").trim().toLowerCase()
                                  ? "border-green-500 bg-green-50"
                                  : "border-red-500 bg-red-50"
                                : ""
                            }`}
                            value={inputs[idx]}
                            onChange={(e) => handleChange(idx, e.target.value)}
                            disabled={submitted}
                            aria-label={`Blank for question ${idx + 1}`}
                            style={{ minWidth: "3rem", maxWidth: "6rem" }}
                          />
                          {submitted && inputs[idx] && (
                            <div className="flex-shrink-0">
                              {inputs[idx]?.trim().toLowerCase() ===
                              (answers[idx] || "").trim().toLowerCase() ? (
                                <FaCircleCheck className="text-green-500 text-sm" />
                              ) : (
                                <FaCircleXmark className="text-red-500 text-sm" />
                              )}
                            </div>
                          )}
                          {/* Show correction for wrong answers */}
                          {submitted &&
                            inputs[idx] &&
                            inputs[idx]?.trim().toLowerCase() !==
                              (answers[idx] || "").trim().toLowerCase() && (
                              <div className="absolute top-full left-0 mt-1 p-1 bg-gray-100 border border-gray-200 rounded text-xs text-gray-700 whitespace-nowrap z-10">
                                <span className="font-medium">Correct:</span>{" "}
                                {answers[idx]}
                              </div>
                            )}
                        </span>
                      ) : (
                        <React.Fragment key={`text-${idx}-${i}`}>
                          {part}
                        </React.Fragment>
                      )
                    )}
                  </span>
                </div>
                {submitted && (
                  <div className="mt-1 p-2 rounded bg-gray-50">
                    <span className="text-sm text-gray-700 font-medium">
                      Correct answer:
                    </span>{" "}
                    {answers[idx]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200">
          {!submitted ? (
            <button
              type="submit"
              disabled={answeredCount < total}
              className="w-full bg-[#1D5554] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#174342] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Submit Answers
            </button>
          ) : (
            <CorrectionDisplay correct={score} total={total} />
          )}
        </div>
      </form>
    </div>
  );
}

export default CardPracticeQuestionsDiagramLabelling;
