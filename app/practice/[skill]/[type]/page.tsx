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
import CardPracticeQuestionsTable from "@/app/components/CardPracticeQuestionsTable";

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
  title?: string;
}

interface PracticeData {
  passage: {
    title: string;
    passage: string;
  };
  questionSet: QuestionSet;
}

type Question = PracticeData["questionSet"]["questions"][0];

// Add this type above the component
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
interface TableQuestionSet extends Partial<QuestionSet> {
  title?: string;
  instructions: string;
  mode: "table" | "input";
  content: TableContent[];
  questions?: QuestionSet["questions"];
}

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading practice questions...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.questionSet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    if (type === "fact-opinion-judgement") return "FactOpinionJudgement";
    if (type === "summary-table-completion") return "SummaryTableCompletion";
    if (type === "short-completion") return "ShortCompletion";
    if (type === "visual-completion") return "VisualCompletion";
    if (type === "matching-headings") return "MatchingHeadings";
    if (type === "matching-info") return "MatchingInfo";
    if (type === "diagram-labelling") return "DiagramLabelling";
    if (type === "word-bank-completion") return "WordBankCompletion";
    return type;
  }

  const normalizedType = normalizeType(type);

  // Check if it's an MCQ type (including fact-opinion-judgement which has options)
  const isMCQType =
    ["MultipleChoice", "FactOpinionJudgement", "mcq"].includes(
      normalizedType
    ) ||
    questionSet.type === "fact-opinion-judgement" ||
    questionSet.type === "multiple-choice";

  // Check if it's a completion type (excluding visual-completion which is handled separately)
  const isCompletionType =
    ["SummaryTableCompletion", "ShortCompletion"].includes(normalizedType) ||
    questionSet.type === "summary-table-completion" ||
    questionSet.type === "short-completion";

  const isWordBankType =
    normalizedType === "WordBankCompletion" ||
    (questionSet.type === "summary-table-completion" &&
      questionSet.mode === "word-bank");
  const isMatchingInfoType =
    normalizedType === "MatchingInfo" || questionSet.type === "matching-info";
  const isDiagramLabellingType =
    normalizedType === "DiagramLabelling" ||
    questionSet.type === "visual-completion";
  const isMatchingHeadingsType =
    normalizedType === "MatchingHeadings" ||
    questionSet.type === "matching-headings";

  // Prepare question sets for each type
  let mcqQuestionSet = undefined;
  if (isMCQType && Array.isArray(questionSet.questions)) {
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
      instructions: questionSet.instructions,
    };
  }

  const wordBankQuestionSet = {
    mode: questionSet.mode || "",
    wordBank: questionSet.wordBank || [],
    questions: Array.isArray(questionSet.questions)
      ? questionSet.questions.map((q: Question, index: number) => ({
          id: index + 1,
          question: q.question,
          answer: q.answer ?? "",
        }))
      : [],
    instructions: questionSet.instructions,
    title: questionSet.title,
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
  const matchingInfoQuestions = Array.isArray(questionSet.questions)
    ? questionSet.questions.map(
        (
          q: { id: string | number; question: string; answer?: string },
          index: number
        ) => ({
          id: index + 1,
          question: q.question,
          answer: typeof q.answer === "string" ? q.answer : "",
        })
      )
    : [];

  return (
    <div className="min-h-screen pb-10 bg-white">
      <PracticeHeader title={passage.title} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-10 px-4">
        <div className="h-[650px]">
          <CardPracticePassage
            title={passage.title}
            passage={passage.passage}
          />
        </div>
        <div className="h-[650px]">
          {questionSet.mode === "table" ||
          (questionSet.type === "summary-table-completion" &&
            Array.isArray((questionSet as { content?: unknown }).content)) ? (
            <CardPracticeQuestionsTable
              questionSet={questionSet as TableQuestionSet}
            />
          ) : isMCQType && mcqQuestionSet ? (
            <CardPracticeQuestionsMCQ questionSet={mcqQuestionSet} />
          ) : isWordBankType ? (
            <CardPracticeQuestionsWordBankCompletion
              questionSet={wordBankQuestionSet}
            />
          ) : isCompletionType ? (
            questionSet.mode === "word-bank" ? (
              <CardPracticeQuestionsWordBankCompletion
                questionSet={wordBankQuestionSet}
              />
            ) : questionSet.mode === "input" ? (
              <CardPracticeQuestionsCompletion
                questionSet={wordBankQuestionSet}
              />
            ) : (
              <CardPracticeQuestionsCompletion
                questionSet={wordBankQuestionSet}
              />
            )
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
                questions: Array.isArray(questionSet.questions)
                  ? questionSet.questions
                  : [],
                answers: questionSet.answers || [],
                instructions: questionSet.instructions,
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
                questions: Array.isArray(questionSet.questions)
                  ? (questionSet.questions || []).map((q, idx) => ({
                      id: q.id ?? idx + 1,
                      question: q.question,
                      answer: typeof q.answer === "string" ? q.answer : "",
                    }))
                  : [],
                instructions: questionSet.instructions,
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
