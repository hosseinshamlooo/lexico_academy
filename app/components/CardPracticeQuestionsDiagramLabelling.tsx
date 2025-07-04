import React, { useState } from "react";
import Image from "next/image";
import InstructionBox from "@/app/components/InstructionBox";

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
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Questions</h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / total) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {answeredCount} of {total} questions answered
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questionSet.instructions && (
          <InstructionBox className="mb-3">
            {questionSet.instructions}
          </InstructionBox>
        )}
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
                        <input
                          key={`blank-${idx}-${i}`}
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
                      ) : (
                        <React.Fragment key={`text-${idx}-${i}`}>
                          {part}
                        </React.Fragment>
                      )
                    )}
                  </span>
                  {submitted && (
                    <span
                      className={
                        feedback[idx] ? "text-success ml-2" : "text-error ml-2"
                      }
                    >
                      {feedback[idx] ? "✔" : "✗"}
                    </span>
                  )}
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
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Submit Answers
            </button>
          ) : (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {score}/{total}
              </div>
              <div className="text-sm text-gray-600">
                {Math.round((score / total) * 100)}% correct
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default CardPracticeQuestionsDiagramLabelling;
