import { useState } from "react";
import {
  FaHeadphones,
  FaBookOpen,
  FaPencilAlt,
  FaMicrophone,
} from "react-icons/fa";
import CardPracticeType from "./CardPracticeType";
import { useRouter } from "next/navigation";

interface PracticeTypeData {
  title: string;
  progress: string;
  questionTypes: string[];
}

const tabs = [
  {
    label: "Listening",
    icon: <FaHeadphones className="text-xl" />,
    heading: "Practice Listening Questions",
    description:
      "Sharpen your listening skills with AI-recommended questions tailored to your learning profile. Improve your comprehension and accuracy by practicing the types of listening questions you need most.",
    active: true,
  },
  {
    label: "Reading",
    icon: <FaBookOpen className="text-xl" />,
    heading: "Practice Reading Questions",
    description:
      "Boost your reading comprehension with targeted questions. The AI analyzes your performance and suggests reading exercises to help you master complex texts and question types.",
    active: true,
  },
  {
    label: "Writing",
    icon: <FaPencilAlt className="text-xl" />,
    heading: "Practice Writing Questions",
    description:
      "Enhance your writing abilities with personalized prompts and exercises. The AI identifies your weak points and provides writing questions to help you express ideas clearly and effectively.",
    active: false,
  },
  {
    label: "Speaking",
    icon: <FaMicrophone className="text-xl" />,
    heading: "Practice Speaking Questions",
    description:
      "Develop your speaking skills with AI-driven practice questions. Get feedback and suggestions to improve your fluency, pronunciation, and confidence in real-world conversations.",
    active: false,
  },
];

const listeningPracticeTypesData = [
  {
    title: "Multiple Choice",
    progress: "0/110",
    questionTypes: [
      "Detail Listening",
      "Distractor Spotting",
      "Option Paraphrasing",
      "Main Idea Focus",
    ],
  },
  {
    title: "Matching",
    progress: "0/80",
    questionTypes: [
      "Speaker ID",
      "Viewpoint Linking",
      "Synonym Spotting",
      "Comparison",
    ],
  },
  {
    title: "Plan, Map, Diagram Labelling",
    progress: "0/55",
    questionTypes: [
      "Direction Following",
      "Layout Visualizing",
      "Spatial Clues",
      "Sequencing",
    ],
  },
  {
    title: "Form, Note, Table, Flowchart, Summary Completion",
    progress: "0/220",
    questionTypes: [
      "Fact Extraction",
      "Gap Filling",
      "Order Tracking",
      "Paraphrase Matching",
    ],
  },
  {
    title: "Sentence Completion",
    progress: "0/55",
    questionTypes: [
      "Phrase Listening",
      "Grammar Check",
      "Tense Match",
      "Synonym Use",
    ],
  },
  {
    title: "Short-Answer Questions",
    progress: "0/30",
    questionTypes: ["Fact Location", "Word Limit", "Spelling", "Keyword Focus"],
  },
];

const readingPracticeTypesData = [
  {
    title: "Fact/Opinion Judgement",
    progress: "0/100",
    questionTypes: ["True/False/Not Given", "Yes/No/Not Given"],
  },
  {
    title: "Multiple Choice",
    progress: "0/100",
    questionTypes: ["Single Option", "Multiple Options"],
  },
  {
    title: "Matching Headings",
    progress: "0/135",
    questionTypes: ["Matching Headings"],
  },
  {
    title: "Matching Information",
    progress: "0/65",
    questionTypes: ["Matching Information", "Matching Features"],
  },
  {
    title: "Matching Sentence Endings",
    progress: "0/45",
    questionTypes: ["Matching Sentence Endings"],
  },
  {
    title: "Short Completion",
    progress: "0/35",
    questionTypes: ["Sentence Completion", "Short Answer", "Note Completion"],
  },
  {
    title: "Summary & Table Completion",
    progress: "0/55",
    questionTypes: ["Table Completion", "Summary Completion"],
  },
  {
    title: "Visual Completion",
    progress: "0/65",
    questionTypes: ["Flowchart Completion", "Diagram Label Completion"],
  },
];

// Mapping from card titles to API route types
const titleToRouteTypeMap = {
  // Reading mappings
  "Fact/Opinion Judgement": "fact-opinion-judgement",
  "Multiple Choice": "multiple-choice",
  "Matching Headings": "matching-headings",
  "Matching Information": "matching-info",
  "Matching Sentence Endings": "matching-sentence-endings",
  "Short Completion": "short-completion",
  "Summary & Table Completion": "summary-table-completion",
  "Visual Completion": "visual-completion",

  // Listening mappings (placeholder - these would need corresponding API routes)
  "Plan, Map, Diagram Labelling": "diagram-labelling",
  "Form, Note, Table, Flowchart, Summary Completion":
    "summary-table-completion",
  "Sentence Completion": "sentence-completion",
  "Short-Answer Questions": "short-answer",
};

function toKebabCase(str: string): string {
  return (
    (str &&
      str
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        ?.map((x: string) => x.toLowerCase())
        .join("-")) ||
    ""
  );
}

function CardPracticeQuestions() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Get the appropriate data based on active tab
  const getPracticeData = () => {
    switch (activeTab) {
      case 0: // Listening
        return listeningPracticeTypesData;
      case 1: // Reading
        return readingPracticeTypesData;
      default:
        return listeningPracticeTypesData;
    }
  };

  const currentData = getPracticeData();
  const visibleCards = showAll ? currentData : currentData.slice(0, 6);
  const hasMoreThan6Cards = currentData.length > 6;

  const handleTabClick = (idx: number) => {
    // Only allow clicking on active tabs
    if (tabs[idx].active) {
      setActiveTab(idx);
    }
  };

  const handleCardClick = (item: PracticeTypeData) => {
    const skill = activeTab === 0 ? "listening" : "reading";

    // Get the route type from the mapping
    const routeType =
      titleToRouteTypeMap[item.title as keyof typeof titleToRouteTypeMap];

    if (routeType) {
      router.push(`/practice/${skill}/${routeType}`);
    } else {
      // Fallback to kebab case if no mapping exists
      router.push(`/practice/${skill}/${toKebabCase(item.title)}`);
    }
  };

  return (
    <div className="flex justify-center items-start w-full min-h-screen">
      <div
        className="bg-white rounded-2xl p-10 w-full flex flex-col"
        style={{ maxWidth: "1200px" }}
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#1D5554] mb-2 tracking-tighter">
            Practice
          </h1>
          <p className="text-gray-600 text-lg">
            Sharpen your skills with targeted practice questions across all
            IELTS sections
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-row gap-4 justify-center mb-8">
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              className={`flex items-center gap-2 px-6 py-3 rounded-3xl font-bold transition-all duration-300 border-3 text-lg tracking-tight relative
                ${
                  !tab.active
                    ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed opacity-60"
                    : activeTab === idx
                    ? "bg-[#1D5554] border-[#1D5554] text-white scale-105 z-10"
                    : "bg-white border-[#1D5554] text-[#1D5554] hover:bg-[#17403f] hover:text-white hover:border-[#17403f]"
                }
              `}
              onClick={() => handleTabClick(idx)}
              disabled={!tab.active}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        {/* Practice Type Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleCards.map((item: PracticeTypeData) => {
            return (
              <CardPracticeType
                key={item.title}
                title={item.title}
                progress={item.progress}
                questionTypes={item.questionTypes}
                onClick={() => handleCardClick(item)}
              />
            );
          })}
        </div>
        {/* See All / Hide Button - Only show if more than 6 cards */}
        {hasMoreThan6Cards && (
          <div className="flex justify-center mt-10">
            <button
              className="flex flex-col items-center text-[#1D5554] font-bold text-sm tracking-widest select-none focus:outline-none"
              onClick={() => setShowAll((prev) => !prev)}
            >
              <span>{showAll ? "HIDE" : "SEE ALL"}</span>
              <svg
                className={`w-6 h-6 mt-1 transition-transform duration-300 ${
                  showAll ? "rotate-180" : "rotate-0"
                }`}
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
  );
}

export default CardPracticeQuestions;
