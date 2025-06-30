"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PracticeHeader from "@/app/components/PracticeHeader";
import CardPracticePassage from "@/app/components/CardPracticePassage";
import CardPracticeQuestions from "@/app/components/CardPracticeQuestionsItem";

interface PracticeData {
  passage: {
    title: string;
    passage: string;
  };
  questionSet: {
    questions: Array<{
      id: number;
      question: string;
      options?: string[];
      answer: string;
    }>;
  };
}

type Question = PracticeData["questionSet"]["questions"][0];

export default function PracticePage() {
  const [data, setData] = useState<PracticeData | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const type = params?.type as string;

  useEffect(() => {
    async function fetchPracticeData() {
      try {
        const response = await fetch(`/api/practice?type=${type}`);
        const practiceData = await response.json();
        setData(practiceData);
      } catch (error) {
        console.error("Failed to fetch practice data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (type) {
      fetchPracticeData();
    }
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

  if (!data) {
    return (
      <div className="min-h-screen bg-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load practice data</p>
        </div>
      </div>
    );
  }

  const { passage, questionSet } = data;

  // Transform the data to match the component's expected format
  const transformedQuestionSet = {
    questions: questionSet.questions.map((q: Question, index: number) => ({
      id: index + 1,
      question: q.question,
      options: q.options || [q.answer], // For table completion, use answer as option
      correctAnswer: q.options ? q.options.indexOf(q.answer) : 0,
    })),
  };

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
          <CardPracticeQuestions questionSet={transformedQuestionSet} />
        </div>
      </div>
    </div>
  );
}
