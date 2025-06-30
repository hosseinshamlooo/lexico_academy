import React, { useState } from "react";

interface Question {
  id: number;
  question: string;
  answer: string;
}

interface CardPracticeQuestionsCompletionProps {
  questionSet: {
    questions: Question[];
  };
}

function CardPracticeQuestionsCompletion({
  questionSet,
}: CardPracticeQuestionsCompletionProps) {
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(questionSet.questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState(false);

  function handleChange(idx: number, value: string) {
    const updated = [...userAnswers];
    updated[idx] = value;
    setUserAnswers(updated);
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  const score = questionSet.questions.reduce(
    (acc, q, idx) =>
      acc +
      (userAnswers[idx].trim().toLowerCase() === q.answer.trim().toLowerCase()
        ? 1
        : 0),
    0
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Questions</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-6"
      >
        {questionSet.questions.map((q, idx) => (
          <div key={q.id} className="mb-4">
            <div className="font-medium mb-2">{q.question}</div>
            <input
              type="text"
              className={`input input-bordered w-full max-w-xs ${
                submitted
                  ? userAnswers[idx].trim().toLowerCase() ===
                    q.answer.trim().toLowerCase()
                    ? "input-success"
                    : "input-error"
                  : ""
              }`}
              value={userAnswers[idx]}
              onChange={(e) => handleChange(idx, e.target.value)}
              disabled={submitted}
            />
            {submitted && (
              <div className="mt-1 text-sm">
                {userAnswers[idx].trim().toLowerCase() ===
                q.answer.trim().toLowerCase() ? (
                  <span className="text-green-600">Correct!</span>
                ) : (
                  <span className="text-red-600">
                    Incorrect. Correct answer: <b>{q.answer}</b>
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
        {!submitted && (
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        )}
        {submitted && (
          <div className="mt-4 text-lg font-bold">
            Score: {score} / {questionSet.questions.length}
          </div>
        )}
      </form>
    </div>
  );
}

export default CardPracticeQuestionsCompletion;
