import { NextApiRequest, NextApiResponse } from 'next'
import reading from '../../../data/reading.json'
// import listening later if needed

// Type definitions
interface Question {
  id: string
  question: string
  options?: string[]
  answer: string
}

interface QuestionSet {
  type: string
  instructions: string
  questions: Question[]
}

interface Passage {
  passageId: string
  title: string
  passage: string
  questionSets: QuestionSet[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { skill, type } = req.query

  let data: Passage[] = []

  if (skill === 'reading') {
    data = reading as Passage[]
  } else {
    return res.status(400).json({ error: 'Skill not supported yet' })
  }

  const passages = data.filter(p =>
    p.questionSets.some((qs: QuestionSet) => qs.type === type)
  )

  if (passages.length === 0) {
    return res.status(404).json({ error: 'No questions found' })
  }

  const randomPassage = passages[Math.floor(Math.random() * passages.length)]
  const questionSet = randomPassage.questionSets.find((qs: QuestionSet) => qs.type === type)
  const randomQuestion = questionSet?.questions[Math.floor(Math.random() * questionSet.questions.length)]

  return res.status(200).json({
    passageId: randomPassage.passageId,
    title: randomPassage.title,
    passage: randomPassage.passage,
    questionSetType: questionSet?.type,
    instructions: questionSet?.instructions,
    question: randomQuestion
  })
}
