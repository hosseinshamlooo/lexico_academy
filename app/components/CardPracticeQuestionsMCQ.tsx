import React, { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface CardPracticeQuestionsMCQProps {
  questionSet: {
    questions: Question[];
  };
}

function CardPracticeQuestionsMCQ({
  questionSet,
}: CardPracticeQuestionsMCQProps) {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(questionId: number, value: number) {
    if (!submitted) {
      setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const calculateScore = () => {
    let correct = 0;
    questionSet.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
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
                (Object.keys(userAnswers).length /
                  questionSet.questions.length) *
                100
              }%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {Object.keys(userAnswers).length} of {questionSet.questions.length}{" "}
          questions answered
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questionSet.questions.map((q) => (
          <div key={q.id} className="rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">
              Question {q.id}: {q.question}
            </h3>
            <div className="space-y-2">
              {q.options.map((option, idxOption) => {
                let optionStyle = "bg-white border-gray-300 hover:bg-gray-50";
                if (!submitted) {
                  if (userAnswers[q.id] === idxOption) {
                    optionStyle = "bg-blue-100 border-blue-500";
                  }
                } else {
                  const isCorrect = idxOption === q.correctAnswer;
                  const isSelected = userAnswers[q.id] === idxOption;
                  if (isCorrect) {
                    optionStyle = "bg-green-100 border-green-500";
                  } else if (isSelected && !isCorrect) {
                    optionStyle = "bg-red-100 border-red-500";
                  }
                }
                return (
                  <button
                    key={idxOption}
                    type="button"
                    onClick={() => handleChange(q.id, idxOption)}
                    disabled={submitted}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${optionStyle}`}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + idxOption)}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div className="mt-3 p-3 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Correct answer:</span>{" "}
                  {q.options[q.correctAnswer]}
                </p>
              </div>
            )}
          </div>
        ))}
        <div className="mt-6 pt-4 border-t border-gray-200">
          {!submitted ? (
            <button
              type="submit"
              disabled={
                Object.keys(userAnswers).length < questionSet.questions.length
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
      </form>
    </div>
  );
}

export default CardPracticeQuestionsMCQ;
