import { NextResponse } from 'next/server';
import readingData from '@/app/data/reading.json';

interface QuestionData {
  id: string;
  question: string;
  options?: string[];
  answer: string;
}

export async function GET() {
  try {
    // Get the first passage from the reading data
    const passage = readingData[0];
    
    // For now, let's use the first question set (TrueFalseNotGiven)
    const questionSet = passage.questionSets[0];
    
    // Transform the data to match the frontend's expected format
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