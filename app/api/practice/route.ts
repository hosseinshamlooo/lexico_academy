import { NextResponse } from 'next/server';
import readingData from '@/app/data/reading.json';

interface QuestionData {
  id: string;
  question: string;
  options?: string[];
  answer: string | string[];
}

interface QuestionSet {
  type: string;
  instructions: string;
  questions: QuestionData[];
}

interface Passage {
  passageId: string;
  title: string;
  passage: string;
  questionSets: QuestionSet[];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    let passage: Passage | undefined;
    let questionSet: QuestionSet | undefined;

    if (type) {
      passage = (readingData as Passage[]).find((p) =>
        p.questionSets.some((qs) => qs.type === type)
      );
      if (!passage) {
        return NextResponse.json(
          { error: `No passage found for type '${type}'` },
          { status: 404 }
        );
      }
      questionSet = passage.questionSets.find((qs) => qs.type === type);
      if (!questionSet) {
        return NextResponse.json(
          { error: `No question set found for type '${type}'` },
          { status: 404 }
        );
      }
    } else {
      passage = (readingData as Passage[])[0];
      questionSet = passage.questionSets[0];
    }

    const responseData = {
      passage: {
        title: passage.title,
        passage: passage.passage
      },
      questionSet: {
        questions: questionSet.questions.map((q: QuestionData) => ({
          id: parseInt(q.id.replace('q', '')),
          question: q.question,
          options: q.options,
          answer: q.answer
        }))
      }
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching practice data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch practice data' },
      { status: 500 }
    );
  }
}