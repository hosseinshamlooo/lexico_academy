import { useState } from "react";
import {
  FaHeadphones,
  FaBookOpen,
  FaPencilAlt,
  FaMicrophone,
} from "react-icons/fa";
import CardPracticeType from "./CardPracticeType";

const tabs = [
  {
    label: "Listening",
    icon: <FaHeadphones className="text-xl" />, // replaced SVG
    heading: "Practice Listening Questions",
    description:
      "Sharpen your listening skills with AI-recommended questions tailored to your learning profile. Improve your comprehension and accuracy by practicing the types of listening questions you need most.",
  },
  {
    label: "Reading",
    icon: <FaBookOpen className="text-xl" />, // replaced SVG
    heading: "Practice Reading Questions",
    description:
      "Boost your reading comprehension with targeted questions. The AI analyzes your performance and suggests reading exercises to help you master complex texts and question types.",
  },
  {
    label: "Writing",
    icon: <FaPencilAlt className="text-xl" />, // replaced SVG
    heading: "Practice Writing Questions",
    description:
      "Enhance your writing abilities with personalized prompts and exercises. The AI identifies your weak points and provides writing questions to help you express ideas clearly and effectively.",
  },
  {
    label: "Speaking",
    icon: <FaMicrophone className="text-xl" />, // replaced SVG
    heading: "Practice Speaking Questions",
    description:
      "Develop your speaking skills with AI-driven practice questions. Get feedback and suggestions to improve your fluency, pronunciation, and confidence in real-world conversations.",
  },
];

const mockPracticeTypesData = [
  {
    title: "Matching Headings",
    progress: "0/100",
    questionTypes: ["Main ideas", "gist", "structure", "skimming", "hierarchy"],
    locked: false,
  },
  {
    title: "Multiple Choice",
    progress: "0/100",
    questionTypes: ["Details", "inference", "paraphrasing", "distractors"],
    locked: false,
  },
  {
    title: "T/F/NG or Y/N/NG",
    progress: "0/135",
    questionTypes: [
      "Fact-checking",
      "contradiction",
      "implied info",
      "writer’s view",
    ],
    locked: false,
  },
  {
    title: "Matching Information",
    progress: "0/65",
    questionTypes: ["Locate details", "scan examples", "synonyms"],
    locked: false,
  },
  {
    title: "Matching Features",
    progress: "0/45",
    questionTypes: ["Compare sources", "viewpoints", "details"],
    locked: false,
  },
  {
    title: "Matching Sentence Endings",
    progress: "0/35",
    questionTypes: ["Grammar logic", "flow", "cause/effect"],
    locked: false,
  },
  {
    title: "Sentence Completion",
    progress: "0/55",
    questionTypes: ["Find phrases", "word limit", "synonyms"],
    locked: false,
  },
  {
    title: "Summary/Table/Flowchart",
    progress: "0/65",
    questionTypes: ["Summarize", "sequence", "paraphrase"],
    locked: false,
  },
  {
    title: "Diagram Label",
    progress: "0/25",
    questionTypes: ["Visual link", "spatial understanding"],
    locked: false,
  },
  {
    title: "Short Answer",
    progress: "0/40",
    questionTypes: ["Locate fact", "word limit", "precise detail"],
    locked: false,
  },
];

function CardPracticeQuestions() {
  const [activeTab, setActiveTab] = useState(0);
  const { heading, description } = tabs[activeTab];

  return (
    <div className="w-full rounded-none px-4 md:px-12 py-6 border-b border-gray-100 mt-3">
      {/* Tab Navigation */}
      <div className="flex flex-row gap-4 justify-center mb-8">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold transition-colors duration-200 border-2 text-lg tracking-tight
              ${
                activeTab === idx
                  ? "bg-cyan-100 border-cyan-400 text-cyan-900 shadow"
                  : "bg-white border-transparent text-[#1D5554] hover:bg-cyan-50 hover:text-cyan-900"
              }
            `}
            onClick={() => setActiveTab(idx)}
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
        <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 text-[#1D5554] font-semibold hover:bg-cyan-50 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 6h14M5 12h14M5 18h14"
            />
          </svg>
          <span>Question Log</span>
        </button>
      </div>
      <p className="text-lg text-gray-600 font-semibold mb-6">{description}</p>
      {/* Practice Type Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockPracticeTypesData.map((item) => (
          <CardPracticeType
            key={item.title}
            title={item.title}
            progress={item.progress}
            questionTypes={item.questionTypes}
            locked={item.locked}
          />
        ))}
      </div>
    </div>
  );
}

export default CardPracticeQuestions;
