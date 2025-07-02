import { promises as fs } from 'fs';
import path from 'path';

interface Question {
  id: string;
  question: string;
  // Add other fields as needed
}

interface QuestionSet {
  type: string;
  diagramUrl?: string;
  questions: Question[];
  answers?: string[];
  // Add other fields as needed
}

interface Passage {
  passageId: string;
  title: string;
  passage: string;
  questionSets: QuestionSet[];
}

export async function GET(
  req: Request,
  { params }: { params: { type: string } }
) {
  const typeStr = params.type;

  // Dynamically read the JSON file
  const filePath = path.join(process.cwd(), 'app', 'data', 'reading.json');
  let fileContents: string;
  try {
    fileContents = await fs.readFile(filePath, 'utf-8');
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({ error: `Could not read data file: ${(error as Error).message}` }),
      { status: 500 }
    );
  }

  let data: Passage[];
  try {
    data = JSON.parse(fileContents) as Passage[];
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({ error: `Invalid JSON format: ${(error as Error).message}` }),
      { status: 500 }
    );
  }

  const passages: Passage[] = data.filter((p: Passage) =>
    Array.isArray(p.questionSets) &&
    p.questionSets.some((qs: QuestionSet) => qs.type === typeStr)
  );

  if (passages.length === 0) {
    return new Response(JSON.stringify({ error: 'No questions found' }), { status: 404 });
  }

  const randomPassage: Passage = passages[Math.floor(Math.random() * passages.length)];
  const questionSet: QuestionSet | undefined = randomPassage.questionSets.find((qs: QuestionSet) => qs.type === typeStr);

  return new Response(
    JSON.stringify({
      passageId: randomPassage.passageId,
      title: randomPassage.title,
      passage: randomPassage.passage,
      questionSet: questionSet,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
