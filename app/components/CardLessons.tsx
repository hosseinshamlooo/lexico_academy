import React, { useState, useRef } from "react";
import {
  FaCheckCircle,
  FaLock,
  FaHeadphones,
  FaBookOpen,
  FaPencilAlt,
  FaMicrophone,
} from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const modules = [
  {
    key: "listening",
    label: "Listening",
    units: [
      {
        title: "Introduction to IELTS Listening",
        mastery: 100,
        lessons: [
          "Introduction to IELTS Listening",
          "Understanding the Test Format",
          "Time Management",
        ],
      },
      {
        title: "Skimming and Scanning Techniques",
        mastery: 0,
        lessons: [
          "Skimming and Scanning Techniques",
          "Speed Reading",
          "Information Retrieval",
        ],
      },
      {
        title: "Understanding Question Types",
        mastery: 0,
        lessons: [
          "Understanding Question Types",
          "MCQ Listening",
          "True/False Listening",
        ],
      },
      {
        title: "Academic Vocabulary Building",
        mastery: 0,
        lessons: [
          "Academic Vocabulary Building",
          "Context Clues",
          "Word Families",
        ],
      },
      {
        title: "Complex Sentence Analysis",
        mastery: 0,
        lessons: ["Complex Sentence Analysis", "Grammar", "Comprehension"],
      },
      {
        title: "Critical Reading Strategies",
        mastery: 0,
        lessons: ["Critical Reading Strategies", "Inference", "Analysis"],
      },
      {
        title: "Paraphrasing Skills",
        mastery: 0,
        lessons: ["Paraphrasing Skills", "Rewording", "Vocabulary"],
      },
      {
        title: "Identifying Main Ideas",
        mastery: 0,
        lessons: ["Identifying Main Ideas", "Summarizing", "Main Idea"],
      },
      {
        title: "Inference Questions",
        mastery: 0,
        lessons: ["Inference Questions", "Context Clues", "Inference"],
      },
      {
        title: "Matching Headings",
        mastery: 0,
        lessons: ["Matching Headings", "Headings", "Matching"],
      },
      {
        title: "True/False/Not Given",
        mastery: 0,
        lessons: ["True/False/Not Given", "True/False", "Logic"],
      },
      {
        title: "Yes/No/Not Given",
        mastery: 0,
        lessons: ["Yes/No/Not Given", "Yes/No", "Logic"],
      },
      {
        title: "Matching Information",
        mastery: 0,
        lessons: ["Matching Information", "Information", "Matching"],
      },
      {
        title: "Matching Features",
        mastery: 0,
        lessons: ["Matching Features", "Features", "Matching"],
      },
      {
        title: "Matching Sentence Endings",
        mastery: 0,
        lessons: ["Matching Sentence Endings", "Sentence Endings", "Matching"],
      },
      {
        title: "Sentence Completion",
        mastery: 0,
        lessons: ["Sentence Completion", "Grammar", "Completion"],
      },
      {
        title: "Short Answer Questions",
        mastery: 0,
        lessons: ["Short Answer Questions", "Detail Finding", "Short Answer"],
      },
      {
        title: "Table Completion",
        mastery: 0,
        lessons: ["Table Completion", "Data Extraction", "Table"],
      },
      {
        title: "Summary Completion",
        mastery: 0,
        lessons: ["Summary Completion", "Completion", "Summary"],
      },
      {
        title: "Diagram Label Completion",
        mastery: 0,
        lessons: ["Diagram Label Completion", "Labeling", "Diagram"],
      },
      {
        title: "Flowchart Completion",
        mastery: 0,
        lessons: ["Flowchart Completion", "Completion", "Flowchart"],
      },
      {
        title: "Note Completion",
        mastery: 0,
        lessons: ["Note Completion", "Key Points", "Note"],
      },
      {
        title: "Form Completion",
        mastery: 0,
        lessons: ["Form Completion", "Details", "Form"],
      },
      {
        title: "Multiple Choice Questions",
        mastery: 0,
        lessons: ["Multiple Choice Questions", "Options", "Multiple Choice"],
      },
      {
        title: "Word Limit Practice",
        mastery: 0,
        lessons: ["Word Limit Practice", "Conciseness", "Word Limit"],
      },
      {
        title: "Spelling and Grammar",
        mastery: 0,
        lessons: ["Spelling and Grammar", "Spelling", "Grammar"],
      },
      {
        title: "Reading for Detail",
        mastery: 0,
        lessons: ["Reading for Detail", "Detail", "Comprehension"],
      },
      {
        title: "Understanding Synonyms",
        mastery: 0,
        lessons: ["Understanding Synonyms", "Synonyms", "Vocabulary"],
      },
      {
        title: "Order Tracking",
        mastery: 0,
        lessons: ["Order Tracking", "Sequencing", "Order"],
      },
      {
        title: "Fact Extraction",
        mastery: 0,
        lessons: ["Fact Extraction", "Key Points", "Fact"],
      },
      {
        title: "Gap Filling",
        mastery: 0,
        lessons: ["Gap Filling", "Vocabulary", "Gap"],
      },
      {
        title: "Grammar Check",
        mastery: 0,
        lessons: ["Grammar Check", "Correction", "Grammar"],
      },
      {
        title: "Tense Match",
        mastery: 0,
        lessons: ["Tense Match", "Grammar", "Tense"],
      },
      {
        title: "Phrase Listening",
        mastery: 0,
        lessons: ["Phrase Listening", "Listening", "Phrases"],
      },
      {
        title: "Speaker Identification",
        mastery: 0,
        lessons: ["Speaker Identification", "Listening", "Speaker ID"],
      },
      {
        title: "Viewpoint Linking",
        mastery: 0,
        lessons: ["Viewpoint Linking", "Linking", "Viewpoint"],
      },
    ],
  },
  {
    key: "reading",
    label: "Reading",
    units: [
      {
        title: "Introduction to IELTS Reading",
        mastery: 0,
        lessons: [
          "Introduction to IELTS Reading",
          "Understanding the Test Format",
          "Time Management",
        ],
      },
      {
        title: "Skimming and Scanning Techniques",
        mastery: 0,
        lessons: [
          "Skimming and Scanning Techniques",
          "Speed Reading",
          "Information Retrieval",
        ],
      },
      {
        title: "Understanding Question Types",
        mastery: 0,
        lessons: [
          "Understanding Question Types",
          "MCQ Reading",
          "True/False Reading",
        ],
      },
      {
        title: "Academic Vocabulary Building",
        mastery: 0,
        lessons: [
          "Academic Vocabulary Building",
          "Context Clues",
          "Word Families",
        ],
      },
      {
        title: "Complex Sentence Analysis",
        mastery: 0,
        lessons: ["Complex Sentence Analysis", "Grammar", "Comprehension"],
      },
      {
        title: "Critical Reading Strategies",
        mastery: 0,
        lessons: ["Critical Reading Strategies", "Inference", "Analysis"],
      },
      {
        title: "Paraphrasing Skills",
        mastery: 0,
        lessons: ["Paraphrasing Skills", "Rewording", "Vocabulary"],
      },
      {
        title: "Identifying Main Ideas",
        mastery: 0,
        lessons: ["Identifying Main Ideas", "Summarizing", "Main Idea"],
      },
      {
        title: "Inference Questions",
        mastery: 0,
        lessons: ["Inference Questions", "Context Clues", "Inference"],
      },
      {
        title: "Matching Headings",
        mastery: 0,
        lessons: ["Matching Headings", "Headings", "Matching"],
      },
      {
        title: "True/False/Not Given",
        mastery: 0,
        lessons: ["True/False/Not Given", "True/False", "Logic"],
      },
      {
        title: "Yes/No/Not Given",
        mastery: 0,
        lessons: ["Yes/No/Not Given", "Yes/No", "Logic"],
      },
      {
        title: "Matching Information",
        mastery: 0,
        lessons: ["Matching Information", "Information", "Matching"],
      },
      {
        title: "Matching Features",
        mastery: 0,
        lessons: ["Matching Features", "Features", "Matching"],
      },
      {
        title: "Matching Sentence Endings",
        mastery: 0,
        lessons: ["Matching Sentence Endings", "Sentence Endings", "Matching"],
      },
      {
        title: "Sentence Completion",
        mastery: 0,
        lessons: ["Sentence Completion", "Grammar", "Completion"],
      },
      {
        title: "Short Answer Questions",
        mastery: 0,
        lessons: ["Short Answer Questions", "Detail Finding", "Short Answer"],
      },
      {
        title: "Table Completion",
        mastery: 0,
        lessons: ["Table Completion", "Data Extraction", "Table"],
      },
      {
        title: "Summary Completion",
        mastery: 0,
        lessons: ["Summary Completion", "Completion", "Summary"],
      },
      {
        title: "Diagram Label Completion",
        mastery: 0,
        lessons: ["Diagram Label Completion", "Labeling", "Diagram"],
      },
      {
        title: "Flowchart Completion",
        mastery: 0,
        lessons: ["Flowchart Completion", "Completion", "Flowchart"],
      },
      {
        title: "Note Completion",
        mastery: 0,
        lessons: ["Note Completion", "Key Points", "Note"],
      },
      {
        title: "Form Completion",
        mastery: 0,
        lessons: ["Form Completion", "Details", "Form"],
      },
      {
        title: "Multiple Choice Questions",
        mastery: 0,
        lessons: ["Multiple Choice Questions", "Options", "Multiple Choice"],
      },
      {
        title: "Word Limit Practice",
        mastery: 0,
        lessons: ["Word Limit Practice", "Conciseness", "Word Limit"],
      },
      {
        title: "Spelling and Grammar",
        mastery: 0,
        lessons: ["Spelling and Grammar", "Spelling", "Grammar"],
      },
      {
        title: "Reading for Detail",
        mastery: 0,
        lessons: ["Reading for Detail", "Detail", "Comprehension"],
      },
      {
        title: "Understanding Synonyms",
        mastery: 0,
        lessons: ["Understanding Synonyms", "Synonyms", "Vocabulary"],
      },
      {
        title: "Order Tracking",
        mastery: 0,
        lessons: ["Order Tracking", "Sequencing", "Order"],
      },
      {
        title: "Fact Extraction",
        mastery: 0,
        lessons: ["Fact Extraction", "Key Points", "Fact"],
      },
      {
        title: "Gap Filling",
        mastery: 0,
        lessons: ["Gap Filling", "Vocabulary", "Gap"],
      },
      {
        title: "Grammar Check",
        mastery: 0,
        lessons: ["Grammar Check", "Correction", "Grammar"],
      },
      {
        title: "Tense Match",
        mastery: 0,
        lessons: ["Tense Match", "Grammar", "Tense"],
      },
      {
        title: "Phrase Listening",
        mastery: 0,
        lessons: ["Phrase Listening", "Listening", "Phrases"],
      },
      {
        title: "Speaker Identification",
        mastery: 0,
        lessons: ["Speaker Identification", "Listening", "Speaker ID"],
      },
      {
        title: "Viewpoint Linking",
        mastery: 0,
        lessons: ["Viewpoint Linking", "Linking", "Viewpoint"],
      },
    ],
  },
  {
    key: "writing",
    label: "Writing",
    units: [
      {
        title: "Introduction to IELTS Writing",
        mastery: 0,
        lessons: [
          "Introduction to IELTS Writing",
          "Understanding the Test Format",
          "Time Management",
        ],
      },
      {
        title: "Task 1: Letter Writing",
        mastery: 0,
        lessons: ["Task 1: Letter Writing", "Letter Writing", "Structure"],
      },
      {
        title: "Task 2: Essay Writing",
        mastery: 0,
        lessons: ["Task 2: Essay Writing", "Essay Writing", "Structure"],
      },
      {
        title: "Academic Vocabulary Building",
        mastery: 0,
        lessons: [
          "Academic Vocabulary Building",
          "Context Clues",
          "Word Families",
        ],
      },
      {
        title: "Complex Sentence Analysis",
        mastery: 0,
        lessons: ["Complex Sentence Analysis", "Grammar", "Comprehension"],
      },
      {
        title: "Critical Reading Strategies",
        mastery: 0,
        lessons: ["Critical Reading Strategies", "Inference", "Analysis"],
      },
      {
        title: "Paraphrasing Skills",
        mastery: 0,
        lessons: ["Paraphrasing Skills", "Rewording", "Vocabulary"],
      },
      {
        title: "Identifying Main Ideas",
        mastery: 0,
        lessons: ["Identifying Main Ideas", "Summarizing", "Main Idea"],
      },
      {
        title: "Inference Questions",
        mastery: 0,
        lessons: ["Inference Questions", "Context Clues", "Inference"],
      },
      {
        title: "Matching Headings",
        mastery: 0,
        lessons: ["Matching Headings", "Headings", "Matching"],
      },
      {
        title: "True/False/Not Given",
        mastery: 0,
        lessons: ["True/False/Not Given", "True/False", "Logic"],
      },
      {
        title: "Yes/No/Not Given",
        mastery: 0,
        lessons: ["Yes/No/Not Given", "Yes/No", "Logic"],
      },
      {
        title: "Matching Information",
        mastery: 0,
        lessons: ["Matching Information", "Information", "Matching"],
      },
      {
        title: "Matching Features",
        mastery: 0,
        lessons: ["Matching Features", "Features", "Matching"],
      },
      {
        title: "Matching Sentence Endings",
        mastery: 0,
        lessons: ["Matching Sentence Endings", "Sentence Endings", "Matching"],
      },
      {
        title: "Sentence Completion",
        mastery: 0,
        lessons: ["Sentence Completion", "Grammar", "Completion"],
      },
      {
        title: "Short Answer Questions",
        mastery: 0,
        lessons: ["Short Answer Questions", "Detail Finding", "Short Answer"],
      },
      {
        title: "Table Completion",
        mastery: 0,
        lessons: ["Table Completion", "Data Extraction", "Table"],
      },
      {
        title: "Summary Completion",
        mastery: 0,
        lessons: ["Summary Completion", "Completion", "Summary"],
      },
      {
        title: "Diagram Label Completion",
        mastery: 0,
        lessons: ["Diagram Label Completion", "Labeling", "Diagram"],
      },
      {
        title: "Flowchart Completion",
        mastery: 0,
        lessons: ["Flowchart Completion", "Completion", "Flowchart"],
      },
      {
        title: "Note Completion",
        mastery: 0,
        lessons: ["Note Completion", "Key Points", "Note"],
      },
      {
        title: "Form Completion",
        mastery: 0,
        lessons: ["Form Completion", "Details", "Form"],
      },
      {
        title: "Multiple Choice Questions",
        mastery: 0,
        lessons: ["Multiple Choice Questions", "Options", "Multiple Choice"],
      },
      {
        title: "Word Limit Practice",
        mastery: 0,
        lessons: ["Word Limit Practice", "Conciseness", "Word Limit"],
      },
      {
        title: "Spelling and Grammar",
        mastery: 0,
        lessons: ["Spelling and Grammar", "Spelling", "Grammar"],
      },
      {
        title: "Reading for Detail",
        mastery: 0,
        lessons: ["Reading for Detail", "Detail", "Comprehension"],
      },
      {
        title: "Understanding Synonyms",
        mastery: 0,
        lessons: ["Understanding Synonyms", "Synonyms", "Vocabulary"],
      },
      {
        title: "Order Tracking",
        mastery: 0,
        lessons: ["Order Tracking", "Sequencing", "Order"],
      },
      {
        title: "Fact Extraction",
        mastery: 0,
        lessons: ["Fact Extraction", "Key Points", "Fact"],
      },
      {
        title: "Gap Filling",
        mastery: 0,
        lessons: ["Gap Filling", "Vocabulary", "Gap"],
      },
      {
        title: "Grammar Check",
        mastery: 0,
        lessons: ["Grammar Check", "Correction", "Grammar"],
      },
      {
        title: "Tense Match",
        mastery: 0,
        lessons: ["Tense Match", "Grammar", "Tense"],
      },
      {
        title: "Phrase Listening",
        mastery: 0,
        lessons: ["Phrase Listening", "Listening", "Phrases"],
      },
      {
        title: "Speaker Identification",
        mastery: 0,
        lessons: ["Speaker Identification", "Listening", "Speaker ID"],
      },
      {
        title: "Viewpoint Linking",
        mastery: 0,
        lessons: ["Viewpoint Linking", "Linking", "Viewpoint"],
      },
    ],
  },
  {
    key: "speaking",
    label: "Speaking",
    units: [
      {
        title: "Introduction to IELTS Speaking",
        mastery: 0,
        lessons: [
          "Introduction to IELTS Speaking",
          "Understanding the Test Format",
          "Time Management",
        ],
      },
      {
        title: "Task 1: Speaking",
        mastery: 0,
        lessons: ["Task 1: Speaking", "Speaking", "Structure"],
      },
      {
        title: "Task 2: Speaking",
        mastery: 0,
        lessons: ["Task 2: Speaking", "Speaking", "Structure"],
      },
      {
        title: "Academic Vocabulary Building",
        mastery: 0,
        lessons: [
          "Academic Vocabulary Building",
          "Context Clues",
          "Word Families",
        ],
      },
      {
        title: "Complex Sentence Analysis",
        mastery: 0,
        lessons: ["Complex Sentence Analysis", "Grammar", "Comprehension"],
      },
      {
        title: "Critical Reading Strategies",
        mastery: 0,
        lessons: ["Critical Reading Strategies", "Inference", "Analysis"],
      },
      {
        title: "Paraphrasing Skills",
        mastery: 0,
        lessons: ["Paraphrasing Skills", "Rewording", "Vocabulary"],
      },
      {
        title: "Identifying Main Ideas",
        mastery: 0,
        lessons: ["Identifying Main Ideas", "Summarizing", "Main Idea"],
      },
      {
        title: "Inference Questions",
        mastery: 0,
        lessons: ["Inference Questions", "Context Clues", "Inference"],
      },
      {
        title: "Matching Headings",
        mastery: 0,
        lessons: ["Matching Headings", "Headings", "Matching"],
      },
      {
        title: "True/False/Not Given",
        mastery: 0,
        lessons: ["True/False/Not Given", "True/False", "Logic"],
      },
      {
        title: "Yes/No/Not Given",
        mastery: 0,
        lessons: ["Yes/No/Not Given", "Yes/No", "Logic"],
      },
      {
        title: "Matching Information",
        mastery: 0,
        lessons: ["Matching Information", "Information", "Matching"],
      },
      {
        title: "Matching Features",
        mastery: 0,
        lessons: ["Matching Features", "Features", "Matching"],
      },
      {
        title: "Matching Sentence Endings",
        mastery: 0,
        lessons: ["Matching Sentence Endings", "Sentence Endings", "Matching"],
      },
      {
        title: "Sentence Completion",
        mastery: 0,
        lessons: ["Sentence Completion", "Grammar", "Completion"],
      },
      {
        title: "Short Answer Questions",
        mastery: 0,
        lessons: ["Short Answer Questions", "Detail Finding", "Short Answer"],
      },
      {
        title: "Table Completion",
        mastery: 0,
        lessons: ["Table Completion", "Data Extraction", "Table"],
      },
      {
        title: "Summary Completion",
        mastery: 0,
        lessons: ["Summary Completion", "Completion", "Summary"],
      },
      {
        title: "Diagram Label Completion",
        mastery: 0,
        lessons: ["Diagram Label Completion", "Labeling", "Diagram"],
      },
      {
        title: "Flowchart Completion",
        mastery: 0,
        lessons: ["Flowchart Completion", "Completion", "Flowchart"],
      },
      {
        title: "Note Completion",
        mastery: 0,
        lessons: ["Note Completion", "Key Points", "Note"],
      },
      {
        title: "Form Completion",
        mastery: 0,
        lessons: ["Form Completion", "Details", "Form"],
      },
      {
        title: "Multiple Choice Questions",
        mastery: 0,
        lessons: ["Multiple Choice Questions", "Options", "Multiple Choice"],
      },
      {
        title: "Word Limit Practice",
        mastery: 0,
        lessons: ["Word Limit Practice", "Conciseness", "Word Limit"],
      },
      {
        title: "Spelling and Grammar",
        mastery: 0,
        lessons: ["Spelling and Grammar", "Spelling", "Grammar"],
      },
      {
        title: "Reading for Detail",
        mastery: 0,
        lessons: ["Reading for Detail", "Detail", "Comprehension"],
      },
      {
        title: "Understanding Synonyms",
        mastery: 0,
        lessons: ["Understanding Synonyms", "Synonyms", "Vocabulary"],
      },
      {
        title: "Order Tracking",
        mastery: 0,
        lessons: ["Order Tracking", "Sequencing", "Order"],
      },
      {
        title: "Fact Extraction",
        mastery: 0,
        lessons: ["Fact Extraction", "Key Points", "Fact"],
      },
      {
        title: "Gap Filling",
        mastery: 0,
        lessons: ["Gap Filling", "Vocabulary", "Gap"],
      },
      {
        title: "Grammar Check",
        mastery: 0,
        lessons: ["Grammar Check", "Correction", "Grammar"],
      },
      {
        title: "Tense Match",
        mastery: 0,
        lessons: ["Tense Match", "Grammar", "Tense"],
      },
      {
        title: "Phrase Listening",
        mastery: 0,
        lessons: ["Phrase Listening", "Listening", "Phrases"],
      },
      {
        title: "Speaker Identification",
        mastery: 0,
        lessons: ["Speaker Identification", "Listening", "Speaker ID"],
      },
      {
        title: "Viewpoint Linking",
        mastery: 0,
        lessons: ["Viewpoint Linking", "Linking", "Viewpoint"],
      },
    ],
  },
];

function ProgressBar({
  percent,
  completed,
}: {
  percent: number;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            completed ? "bg-gray-400" : "bg-[#1D5554]"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span
        className={`text-sm font-bold ${
          completed ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {percent}%
      </span>
    </div>
  );
}

function formatDuration(minutes: number) {
  return `${minutes || 25}min`;
}

// Define a type for Unit
interface Unit {
  title: string;
  description?: string;
  duration?: number;
  lessons: string[];
  mastery: number;
}

function LessonCard({
  unit,
  completed,
  locked,
  action,
  idx,
}: {
  unit: Unit;
  completed: boolean;
  locked?: boolean;
  action?: "review" | "start" | null;
  idx: number;
}) {
  // For the first card, always show 100% completed
  const percent = idx === 0 ? 100 : unit.mastery || 0;
  return (
    <div
      className={`relative ${
        completed
          ? "bg-[#1D5554] border-4 border-[#1D5554]"
          : "bg-white border border-gray-300"
      } shadow p-6 w-full max-w-2xl mx-auto flex flex-col mb-3 mt-3 min-h-[320px] max-h-[440px] ${
        completed ? "opacity-100" : ""
      } ${locked ? "opacity-60" : ""}`}
      style={{ borderRadius: "18px", overflow: "hidden" }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h3
            className={`text-2xl font-extrabold pr-2 break-words ${
              completed ? "text-gray-200" : "text-[#1D5554]"
            }`}
            title={unit.title}
          >
            {unit.title}
          </h3>
          {completed && (
            <span className="flex items-center gap-1 font-bold text-sm bg-gray-700/30 text-gray-200 px-3 py-1 rounded-full border border-gray-400">
              <FaCheckCircle className="text-gray-300" /> Completed
            </span>
          )}
        </div>
        <span
          className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
            completed
              ? "border-gray-400 bg-[#223c3b] text-gray-200"
              : "border-gray-200 bg-white"
          }`}
        >
          <span
            className={`text-sm font-bold flex items-center justify-center w-full h-full text-center ${
              completed ? "text-gray-200" : ""
            }`}
          >
            {formatDuration(unit.duration ?? 25)}
          </span>
        </span>
      </div>
      <hr
        className={`mb-3 ${completed ? "border-gray-200" : "border-gray-200"}`}
      />
      <p
        className={`text-sm mb-3 break-words ${
          completed ? "text-gray-300 font-semibold" : "text-gray-600"
        }`}
      >
        {unit.description || ""}
      </p>
      {/* Render lessons with divider every 6 */}
      <div className="flex flex-wrap gap-2 mb-4 w-full">
        {unit.lessons.map((skill: string, i: number) => (
          <React.Fragment key={i}>
            <span
              className={`px-4 py-1 rounded-full text-base font-bold ${
                completed
                  ? "bg-gray-700/30 text-gray-200 border border-gray-400"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {skill}
            </span>
            {(i + 1) % 6 === 0 && i !== unit.lessons.length - 1 && (
              <div className="w-full flex items-center my-4">
                <div className="flex-grow h-px bg-gray-200" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 mb-2">
        <ProgressBar percent={percent} completed={completed} />
        {locked && (
          <span className="flex items-center gap-1 text-gray-500 font-bold text-sm bg-gray-100 px-3 py-1 rounded-full">
            <FaLock className="text-gray-400" /> Locked
          </span>
        )}
      </div>
      <div className="flex justify-end mt-4">
        {action === "review" && (
          <button className="bg-gray-200 text-[#1D5554] font-bold px-6 py-2 rounded-xl shadow hover:bg-gray-300 transition-all">
            Review
          </button>
        )}
        {action === "start" && (
          <button className="bg-[#1D5554] text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-[#17403f] transition-all">
            Start
          </button>
        )}
      </div>
    </div>
  );
}

const moduleIcons = {
  Listening: <FaHeadphones className="text-xl text-[#1D5554]" />,
  Reading: <FaBookOpen className="text-xl text-[#1D5554]" />,
  Writing: <FaPencilAlt className="text-xl text-[#1D5554]" />,
  Speaking: <FaMicrophone className="text-xl text-[#1D5554]" />,
};

export default function CardLessons() {
  const [showAll, setShowAll] = useState(false); // default is collapsed (show more)
  const [moduleIdx, setModuleIdx] = useState(0);
  const currentModule = modules[moduleIdx];
  const visibleUnits = showAll
    ? currentModule.units
    : currentModule.units.slice(0, 2);

  // Divider titles for Listening
  const listeningUnitTitles = [
    "Introduction to IELTS Listening",
    "Social Survival",
    "Social Context",
    "Academic Discussion",
    "Academic Lecture",
  ];

  // Divider titles for Reading
  const readingUnitTitles = [
    "Introduction to IELTS Reading",
    "Skimming & Scanning",
    "Detailed Reading Skills",
    "Advanced Strategies",
    "Practice & Review",
  ];

  // Divider titles for Writing
  const writingUnitTitles = [
    "Introduction to IELTS Writing",
    "How to Write",
    "Fundamentals of Task 1",
    "Fundamentals of Task 2",
    "Advanced Writing Strategies",
  ];

  // Divider titles for Speaking
  const speakingUnitTitles = [
    "Introduction to IELTS Speaking",
    "Introduction & Interview",
    "Long Turn (Cue Card)",
    "Discussion",
    "Pronunciation & Advanced Speaking",
  ];

  // For Listening, Reading, Writing, and Speaking, only show the first 30 units/cards and 5 dividers
  const cardLimit = 30;
  let limitedVisibleUnits = visibleUnits;
  let dividerTitles: string[] = [];
  if (currentModule.key === "listening") {
    limitedVisibleUnits = visibleUnits.slice(0, cardLimit);
    dividerTitles = listeningUnitTitles;
  } else if (currentModule.key === "reading") {
    limitedVisibleUnits = visibleUnits.slice(0, cardLimit);
    dividerTitles = readingUnitTitles;
  } else if (currentModule.key === "writing") {
    limitedVisibleUnits = visibleUnits.slice(0, cardLimit);
    dividerTitles = writingUnitTitles;
  } else if (currentModule.key === "speaking") {
    limitedVisibleUnits = visibleUnits.slice(0, cardLimit);
    dividerTitles = speakingUnitTitles;
  }

  // Ref for the scrollable journey container
  const journeyRef = useRef<HTMLDivElement>(null);

  const handlePrev = () =>
    setModuleIdx((idx) => (idx === 0 ? modules.length - 1 : idx - 1));
  const handleNext = () =>
    setModuleIdx((idx) => (idx === modules.length - 1 ? 0 : idx + 1));

  // Handler for Hide button: jump to top (no smooth)
  const handleHide = () => {
    setShowAll(false);
    if (journeyRef.current) {
      journeyRef.current.scrollTo({ top: 0 });
    }
  };

  return (
    <div className="flex justify-center items-start w-full min-h-screen overflow-hidden">
      <div
        className="bg-white rounded-2xl p-10 w-full flex flex-col"
        style={{
          maxWidth: "900px",
          height: "calc(100vh - 48px)",
          minHeight: 480,
          overflow: "hidden",
        }}
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#1D5554] mb-2 tracking-tighter">
            Learn
          </h1>
          <p className="text-gray-600 text-lg">
            Master IELTS Academic Reading, Listening, Writing, and Speaking
            through structured lessons
          </p>
        </div>
        {/* Module Switcher with Arrows */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={handlePrev}
            className="flex-shrink-0 p-1 rounded-full bg-white/70 hover:bg-white/90 text-[#1D5554] transition-all"
            style={{ minWidth: 40, minHeight: 40 }}
          >
            <MdKeyboardArrowLeft size={28} />
          </button>
          <span
            className="flex items-center gap-2 text-lg font-semibold text-[#1D5554] px-4 py-2 rounded-xl bg-white/70 min-w-[180px] justify-center"
            style={{ letterSpacing: "-0.5px", minHeight: 40 }}
          >
            {moduleIcons[currentModule.label as keyof typeof moduleIcons]}
            <span>{currentModule.label}</span>
          </span>
          <button
            onClick={handleNext}
            className="flex-shrink-0 p-1 rounded-full bg-white/70 hover:bg-white/90 text-[#1D5554] transition-all"
            style={{ minWidth: 40, minHeight: 40 }}
          >
            <MdKeyboardArrowRight size={28} />
          </button>
        </div>
        {/* Journey Path and Cards - scrollable only when showAll is true */}
        <div
          className="relative flex flex-col items-center w-full flex-1"
          style={{ minHeight: 0 }}
        >
          <div
            ref={journeyRef}
            className={`relative flex flex-col items-center w-full ${
              showAll ? "overflow-y-auto" : ""
            } scrollbar-hide`}
            style={{
              maxHeight: showAll ? "calc(100vh - 320px)" : "900px",
              minHeight: "360px",
              transition: "max-height 0.4s",
            }}
          >
            {limitedVisibleUnits.map((unit, idx) => (
              <React.Fragment key={unit.title}>
                {/* Insert the first divider before the first card */}
                {idx === 0 && dividerTitles.length > 0 && (
                  <div className="flex items-center w-full my-8">
                    <div className="flex-grow h-1.5 bg-gray-300 rounded-full" />
                    <span className="mx-4 text-xl font-bold text-gray-400 whitespace-nowrap select-none">
                      {dividerTitles[0]}
                    </span>
                    <div className="flex-grow h-1.5 bg-gray-300 rounded-full" />
                  </div>
                )}
                {/* Insert divider every 6 cards, except before the first card */}
                {idx % 6 === 0 && idx !== 0 && dividerTitles.length > 0 && (
                  <div className="flex items-center w-full my-8">
                    <div className="flex-grow h-1.5 bg-gray-300 rounded-full" />
                    <span className="mx-4 text-xl font-bold text-gray-400 whitespace-nowrap select-none">
                      {dividerTitles[Math.floor(idx / 6)]}
                    </span>
                    <div className="flex-grow h-1.5 bg-gray-300 rounded-full" />
                  </div>
                )}
                {/* Render the LessonCard as before */}
                <LessonCard
                  unit={unit}
                  completed={idx === 0}
                  locked={idx >= 2}
                  action={idx === 0 ? "review" : idx === 1 ? "start" : null}
                  idx={idx}
                />
                {/* Lines between cards: solid after first, dashed after others */}
                {idx !== limitedVisibleUnits.length - 1 && (
                  <div className="flex flex-col items-center w-full">
                    <div className="flex justify-center w-full">
                      <div
                        className={`h-20 w-1 mx-auto border-l-4 transition-all duration-500 ${
                          idx === 0
                            ? "border-[#1D5554] border-solid"
                            : "border-gray-300 border-dashed"
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
            {/* Show More/Hide sticky button at the bottom */}
            {/* Show More button after the last visible card (not sticky) */}
            {!showAll && currentModule.units.length > 2 && (
              <div className="flex justify-center mt-6">
                <button
                  className="flex flex-col items-center text-[#1D5554] font-bold text-sm tracking-widest select-none focus:outline-none bg-white/80 px-4 py-2 rounded-xl"
                  style={{ boxShadow: "none", border: "none" }}
                  onClick={() => setShowAll(true)}
                >
                  <span>SHOW MORE</span>
                  <svg
                    className="w-6 h-6 mt-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}
            {/* Hide button only after the last card when showAll is true */}
            {showAll && currentModule.units.length > 2 && (
              <div className="flex justify-center mt-6">
                <button
                  className="flex flex-col items-center text-[#1D5554] font-bold text-sm tracking-widest select-none focus:outline-none bg-white/80 px-4 py-2 rounded-xl"
                  style={{ boxShadow: "none", border: "none" }}
                  onClick={handleHide}
                >
                  <span>HIDE</span>
                  <svg
                    className="w-6 h-6 mt-1 transition-transform duration-300 rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
