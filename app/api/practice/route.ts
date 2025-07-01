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
  wordBank?: string[];
  people?: { id: string; name: string }[];
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
      // Collect all passages with a question set matching the requested type
      const matches: { passage: Passage; questionSet: QuestionSet }[] = [];
      for (const p of readingData as Passage[]) {
        const qs = p.questionSets.find((qs) => qs.type === type);
        if (qs) {
          matches.push({ passage: p, questionSet: qs });
        }
      }
      if (matches.length === 0) {
        return NextResponse.json(
          { error: `No question set found for type '${type}'` },
          { status: 404 }
        );
      }
      // Pick a random match
      const randomIdx = Math.floor(Math.random() * matches.length);
      passage = matches[randomIdx].passage;
      questionSet = matches[randomIdx].questionSet;
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
        type: questionSet.type,
        questions: questionSet.questions.map((q: QuestionData, idx: number) => ({
          id: idx + 1,
          question: q.question,
          options: q.options,
          answer: q.answer
        })),
        ...(questionSet.wordBank ? { wordBank: questionSet.wordBank } : {}),
        ...(questionSet.people ? { people: questionSet.people } : {})
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