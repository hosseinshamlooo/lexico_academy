import { useState } from "react";
import {
  FaHeadphones,
  FaBookOpen,
  FaPencilAlt,
  FaMicrophone,
} from "react-icons/fa";
import CardPracticeType from "./CardPracticeType";

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
    title: "Matching Headings",
    progress: "0/100",
    questionTypes: ["Main ideas", "gist", "structure", "skimming", "hierarchy"],
  },
  {
    title: "Multiple Choice",
    progress: "0/100",
    questionTypes: ["Details", "inference", "paraphrasing", "distractors"],
  },
  {
    title: "T/F/NG or Y/N/NG",
    progress: "0/135",
    questionTypes: [
      "Fact-checking",
      "contradiction",
      "implied info",
      "writer's view",
    ],
  },
  {
    title: "Matching Information",
    progress: "0/65",
    questionTypes: ["Locate details", "scan examples", "synonyms"],
  },
  {
    title: "Matching Features",
    progress: "0/45",
    questionTypes: ["Compare sources", "viewpoints", "details"],
  },
  {
    title: "Matching Sentence Endings",
    progress: "0/35",
    questionTypes: ["Grammar logic", "flow", "cause/effect"],
  },
  {
    title: "Sentence Completion",
    progress: "0/55",
    questionTypes: ["Find phrases", "word limit", "synonyms"],
  },
  {
    title: "Summary/Table/Flowchart",
    progress: "0/65",
    questionTypes: ["Summarize", "sequence", "paraphrase"],
  },
  {
    title: "Diagram Label",
    progress: "0/25",
    questionTypes: ["Visual link", "spatial understanding"],
  },
  {
    title: "Short Answer",
    progress: "0/40",
    questionTypes: ["Locate fact", "word limit", "precise detail"],
  },
];

function CardPracticeQuestions() {
  const [activeTab, setActiveTab] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const { heading, description } = tabs[activeTab];

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

  return (
    <div className="w-full rounded-none px-4 md:px-10 py-6 mr-30">
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
      {/* Content */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-extrabold text-[#1D5554] tracking-tighter">
          {heading}
        </h2>
      </div>
      <p className="text-lg text-gray-600 font-semibold mb-14">{description}</p>
      {/* Practice Type Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleCards.map((item: PracticeTypeData) => (
          <CardPracticeType
            key={item.title}
            title={item.title}
            progress={item.progress}
            questionTypes={item.questionTypes}
          />
        ))}
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
  );
}

export default CardPracticeQuestions;
