import React, { useState } from "react";

interface Question {
  id: number;
  question: string;
  options?: string[];
  correctAnswer: number;
  answer?: string; // For completion types
}

interface CardPracticeQuestionsItemProps {
  questionSet: {
    questions: Question[];
  };
  type: string;
}

function CardPracticeQuestionsItem({
  questionSet,
  type,
}: CardPracticeQuestionsItemProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number | string;
  }>({});
  const [submitted, setSubmitted] = useState(false);

  // Accept value as number (for MCQ) or string (for completion)
  const handleAnswerSelect = (questionId: number, value: number | string) => {
    if (!submitted) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: value,
      }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getOptionStyle = (questionId: number, optionIndex: number) => {
    if (!submitted) {
      return selectedAnswers[questionId] === optionIndex
        ? "bg-blue-100 border-blue-500"
        : "bg-white border-gray-300 hover:bg-gray-50";
    }

    const isCorrect =
      optionIndex === questionSet.questions[questionId - 1].correctAnswer;
    const isSelected = selectedAnswers[questionId] === optionIndex;

    if (isCorrect) {
      return "bg-green-100 border-green-500";
    } else if (isSelected && !isCorrect) {
      return "bg-red-100 border-red-500";
    } else {
      return "bg-white border-gray-300";
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questionSet.questions.forEach((question) => {
      if (type === "NoteCompletion" || type === "TableCompletion") {
        if (
          (selectedAnswers[question.id] || "")
            .toString()
            .trim()
            .toLowerCase() === (question.answer || "").trim().toLowerCase()
        ) {
          correct++;
        }
      } else {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correct++;
        }
      }
    });
    return { correct, total: questionSet.questions.length };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Questions</h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                (Object.keys(selectedAnswers).length /
                  questionSet.questions.length) *
                100
              }%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {Object.keys(selectedAnswers).length} of{" "}
          {questionSet.questions.length} questions answered
        </p>
      </div>

      <div className="space-y-6">
        {questionSet.questions.map((question) => (
          <div
            key={question.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <h3 className="font-medium text-gray-900 mb-3">
              Question {question.id}: {question.question}
            </h3>

            <div className="space-y-2">
              {(type === "TrueFalseNotGiven" || type === "MatchingHeadings") &&
                question.options &&
                question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(question.id, index)}
                    disabled={submitted}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${getOptionStyle(
                      question.id,
                      index
                    )}`}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                ))}
              {type === "NoteCompletion" && (
                <input
                  type="text"
                  value={selectedAnswers[question.id] || ""}
                  onChange={(e) =>
                    handleAnswerSelect(question.id, e.target.value)
                  }
                  disabled={submitted}
                  className="w-full p-3 rounded-lg border-2 border-gray-300 hover:border-blue-500 focus:border-blue-500"
                />
              )}
            </div>

            {submitted && (
              <div className="mt-3 p-3 rounded-lg bg-green-100">
                <p className="text-sm text-green-700">
                  <span className="font-medium">Correct answer:</span>{" "}
                  {type === "NoteCompletion" || type === "TableCompletion"
                    ? question.answer
                    : question.options &&
                      question.options[question.correctAnswer] !== undefined
                    ? question.options[question.correctAnswer]
                    : null}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={
              Object.keys(selectedAnswers).length < questionSet.questions.length
            }
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Submit Answers
          </button>
        ) : (
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {calculateScore().correct}/{calculateScore().total}
            </div>
            <div className="text-sm text-gray-600">
              {Math.round(
                (calculateScore().correct / calculateScore().total) * 100
              )}
              % correct
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardPracticeQuestionsItem;
