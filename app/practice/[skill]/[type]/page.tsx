"use client";

import React, { useState, useEffect } from "react";
import PracticeHeader from "@/app/components/PracticeHeader";
import { useParams } from "next/navigation";
import CardPracticePassage from "@/app/components/CardPracticePassage";
import CardPracticeQuestionsMCQ from "@/app/components/CardPracticeQuestionsMCQ";
import CardPracticeQuestionsWordBankCompletion from "@/app/components/CardPracticeQuestionsWordBankCompletion";
import CardPracticeQuestionsMatchingInfo from "@/app/components/CardPracticeQuestionsMatchingInfo";
import CardPracticeQuestionsDiagramLabelling from "@/app/components/CardPracticeQuestionsDiagramLabelling";
import CardPracticeQuestionsCompletion from "@/app/components/CardPracticeQuestionsCompletion";
import CardPracticeQuestionsMatchingHeadings from "@/app/components/CardPracticeQuestionsMatchingHeadings";

interface QuestionSet {
  type?: string;
  questions: Array<{
    id: number;
    question: string;
    options?: string[];
    answer?: string;
    correctAnswer?: number;
  }>;
  wordBank?: string[];
  people?: string[];
  // Add these for diagram labelling
  diagramUrl?: string;
  labels?: string[];
  answers?: string[];
  mode?: string;
  headings?: { id: string; text: string }[];
  instructions?: string;
}

interface PracticeData {
  passage: {
    title: string;
    passage: string;
  };
  questionSet: QuestionSet;
}

type Question = PracticeData["questionSet"]["questions"][0];

export default function PracticePage() {
  const params = useParams();
  const type = params?.type as string;
  const [data, setData] = useState<PracticeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPracticeData() {
      try {
        const response = await fetch(`/api/questions/${type}?skill=reading`);
        const practiceData = await response.json();
        setData({
          passage: {
            title: practiceData.title,
            passage: practiceData.passage,
          },
          questionSet: practiceData.questionSet,
        });
      } catch (error) {
        console.error("Failed to fetch practice data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (type) fetchPracticeData();
  }, [type]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading practice questions...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.questionSet) {
    return (
      <div className="min-h-screen bg-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load practice data</p>
        </div>
      </div>
    );
  }

  const { passage, questionSet } = data;

  // Map kebab-case route types to expected type strings
  function normalizeType(type: string) {
    if (!type) return "mcq";
    if (type === "multiple-choice") return "MultipleChoice";
    if (type === "t-f-ng-or-y-n-ng") return "TrueFalseNotGiven";
    if (type === "word-bank-completion") return "WordBankCompletion";
    if (type === "matching-info") return "MatchingInfo";
    if (type === "diagram-labelling") return "DiagramLabelling";
    return type;
  }

  const normalizedType = normalizeType(type);
  const isMCQType = ["MultipleChoice", "TrueFalseNotGiven", "mcq"].includes(
    normalizedType
  );
  const isWordBankType = normalizedType === "WordBankCompletion";
  const isSummaryCompletionType =
    questionSet.type === "form-note-table-flowchart-summary-completion";
  const isMatchingInfoType = normalizedType === "MatchingInfo";
  const isDiagramLabellingType = normalizedType === "DiagramLabelling";
  const isSentenceCompletionType = questionSet.type === "sentence-completion";
  const isMatchingHeadingsType =
    normalizedType === "MatchingHeadings" ||
    normalizedType === "matching-headings";

  // Prepare question sets for each type
  let mcqQuestionSet = undefined;
  if (isMCQType) {
    mcqQuestionSet = {
      questions: questionSet.questions.map((q: Question, index: number) => ({
        id: String(index + 1),
        question: q.question,
        options: q.options || [],
        correctAnswer:
          typeof q.correctAnswer === "number"
            ? q.correctAnswer
            : q.options
            ? q.options.indexOf(typeof q.answer === "string" ? q.answer : "")
            : 0,
        answer:
          typeof q.answer === "string" || Array.isArray(q.answer)
            ? q.answer
            : "",
      })),
    };
  }

  const wordBankQuestionSet = {
    mode: questionSet.mode || "",
    wordBank: questionSet.wordBank || [],
    questions: questionSet.questions.map((q: Question, index: number) => ({
      id: index + 1,
      question: q.question,
      answer: q.answer ?? "",
    })),
    instructions: questionSet.instructions,
  };

  // For matching-info type
  function isPeopleObjectArray(
    arr: unknown[]
  ): arr is { id: string; name: string }[] {
    return (
      arr.length > 0 &&
      typeof arr[0] === "object" &&
      arr[0] !== null &&
      "id" in arr[0] &&
      "name" in arr[0]
    );
  }
  const matchingInfoPeople = Array.isArray(questionSet.people)
    ? isPeopleObjectArray(questionSet.people)
      ? questionSet.people
      : questionSet.people.map((p: string) => ({ id: p, name: p }))
    : [];
  const matchingInfoQuestions = questionSet.questions.map(
    (
      q: { id: string | number; question: string; answer?: string },
      index: number
    ) => ({
      id: index + 1,
      question: q.question,
      answer: typeof q.answer === "string" ? q.answer : "",
    })
  );

  return (
    <div className="min-h-screen bg-cyan-50 pb-10">
      <PracticeHeader title={passage.title} />
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto mt-10 px-4">
        <div className="flex-1">
          <CardPracticePassage
            title={passage.title}
            passage={passage.passage}
          />
        </div>
        <div className="flex-1">
          {isMCQType && mcqQuestionSet ? (
            <CardPracticeQuestionsMCQ questionSet={mcqQuestionSet} />
          ) : isWordBankType ? (
            <CardPracticeQuestionsWordBankCompletion
              questionSet={wordBankQuestionSet}
            />
          ) : isSummaryCompletionType ? (
            questionSet.mode === "word-bank" ? (
              <CardPracticeQuestionsWordBankCompletion
                questionSet={wordBankQuestionSet}
              />
            ) : questionSet.mode === "input" ? (
              <CardPracticeQuestionsCompletion
                questionSet={wordBankQuestionSet}
              />
            ) : null
          ) : isSentenceCompletionType ? (
            <CardPracticeQuestionsCompletion
              questionSet={wordBankQuestionSet}
            />
          ) : isMatchingInfoType ? (
            <CardPracticeQuestionsMatchingInfo
              people={matchingInfoPeople}
              questions={matchingInfoQuestions}
              instructions={questionSet.instructions}
              mode={questionSet.mode}
            />
          ) : isDiagramLabellingType ? (
            <CardPracticeQuestionsDiagramLabelling
              questionSet={{
                diagramUrl: questionSet.diagramUrl,
                questions: questionSet.questions,
                answers: questionSet.answers || [],
              }}
            />
          ) : isMatchingHeadingsType ? (
            <CardPracticeQuestionsMatchingHeadings
              questionSet={{
                headings: questionSet.headings || [
                  { id: "i", text: "Heading i" },
                  { id: "ii", text: "Heading ii" },
                  { id: "iii", text: "Heading iii" },
                  { id: "iv", text: "Heading iv" },
                  { id: "v", text: "Heading v" },
                  { id: "vi", text: "Heading vi" },
                  { id: "vii", text: "Heading vii" },
                  { id: "viii", text: "Heading viii" },
                ],
                questions: (questionSet.questions || []).map((q, idx) => ({
                  id: q.id ?? idx + 1,
                  question: q.question,
                  answer: typeof q.answer === "string" ? q.answer : "",
                })),
                instructions: questionSet.instructions,
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
