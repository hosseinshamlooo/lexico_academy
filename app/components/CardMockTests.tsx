import React from "react";
import {
  FaPlay,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaLock,
  FaBookOpen,
  FaHeadphones,
  FaPencilAlt,
  FaMicrophone,
} from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";

const mockTests = [
  {
    id: 1,
    title: "IELTS Full Mock Test 1",
    description:
      "Complete IELTS mock test covering all four sections: Reading, Listening, Writing, and Speaking.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Medium",
    status: "available",
    score: null,
    maxScore: 120,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 2,
    title: "IELTS Full Mock Test 2",
    description:
      "Simulate the real IELTS exam with a full-length test: Reading, Listening, Writing, and Speaking.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Hard",
    status: "completed",
    score: 98,
    maxScore: 120,
    completedAt: "2024-01-15",
    estimatedScore: null,
  },
  {
    id: 3,
    title: "IELTS Full Mock Test 3",
    description:
      "Practice all IELTS skills in one go: Reading, Listening, Writing, and Speaking.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Easy",
    status: "available",
    score: null,
    maxScore: 120,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 4,
    title: "IELTS Full Mock Test 4",
    description: "Authentic IELTS exam simulation for all four sections.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Hard",
    status: "locked",
    score: null,
    maxScore: 120,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 5,
    title: "IELTS Full Mock Test 5",
    description:
      "Full-length IELTS test with new question types and updated topics.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Medium",
    status: "available",
    score: null,
    maxScore: 120,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 6,
    title: "IELTS Full Mock Test 6",
    description: "Challenging IELTS mock test for advanced learners.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Hard",
    status: "locked",
    score: null,
    maxScore: 120,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 7,
    title: "IELTS Full Mock Test 7",
    description: "Comprehensive IELTS test with a focus on time management.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Medium",
    status: "available",
    score: null,
    maxScore: 120,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 8,
    title: "IELTS Full Mock Test 8",
    description: "Realistic IELTS exam experience with authentic materials.",
    duration: "2 hours 45 minutes",
    questions: 120,
    difficulty: "Easy",
    status: "available",
    score: null,
    maxScore: 120,
    completedAt: null,
    estimatedScore: null,
  },
];

const sectionIcons = [
  { icon: <FaBookOpen className="text-[#1D5554]" />, label: "Reading" },
  { icon: <FaHeadphones className="text-[#1D5554]" />, label: "Listening" },
  { icon: <FaPencilAlt className="text-[#1D5554]" />, label: "Writing" },
  { icon: <FaMicrophone className="text-[#1D5554]" />, label: "Speaking" },
];

function TestCard({ test }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = () => {
    switch (test.status) {
      case "completed":
        return <FaCheckCircle className="text-green-500 text-2xl" />;
      case "locked":
        return <FaLock className="text-gray-400 text-2xl" />;
      default:
        return <FaPlay className="text-[#1D5554] text-2xl" />;
    }
  };

  const getStatusText = () => {
    switch (test.status) {
      case "completed":
        return "Completed";
      case "locked":
        return "Locked";
      default:
        return "Start Test";
    }
  };

  const getStatusButtonClass = () => {
    switch (test.status) {
      case "completed":
        return "bg-green-100 text-green-700 hover:bg-green-200";
      case "locked":
        return "bg-gray-100 text-gray-500 cursor-not-allowed";
      default:
        return "bg-[#1D5554] text-white hover:bg-[#1D5554]/90";
    }
  };

  return (
    <div className="relative bg-white rounded-3xl p-6 w-full min-w-[320px] max-w-md transition-all duration-300 border border-gray-200 shadow-md flex flex-col group hover:scale-y-105 hover:-translate-y-2 hover:shadow-2xl hover:bg-[#1D5554] hover:border-[#1D5554] hover:text-white cursor-pointer">
      {/* Title and difficulty */}
      <div className="flex items-center justify-between mb-2">
        <h3
          className="text-2xl font-extrabold text-gray-900 pr-2 transition-all duration-200 break-words group-hover:text-white"
          title={test.title}
        >
          {test.title}
        </h3>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
            test.difficulty
          )}`}
        >
          {test.difficulty}
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-3 break-words group-hover:text-white">
        {test.description}
      </p>
      {/* Section Icons */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {sectionIcons.map((section) => (
          <span
            key={section.label}
            className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm font-bold group-hover:bg-white group-hover:text-[#1D5554] text-gray-700"
          >
            {section.icon}
            {section.label}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-6 mb-4 text-sm text-gray-600 group-hover:text-white">
        <div className="flex items-center gap-2">
          <FaClock className="text-gray-400 group-hover:text-white" />
          <span>{test.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaStar className="text-gray-400 group-hover:text-white" />
          <span>{test.questions} questions</span>
        </div>
      </div>
      {test.status === "completed" && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-700">
              Score: {test.score}/{test.maxScore}
            </span>
            <span className="text-xs text-green-600">
              {test.completedAt &&
                new Date(test.completedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(test.score / test.maxScore) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm font-medium text-gray-700 group-hover:text-white">
            {getStatusText()}
          </span>
        </div>
        <button
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${getStatusButtonClass()}`}
          disabled={test.status === "locked"}
        >
          {test.status === "completed" ? (
            <>
              <span>Review</span>
              <FaCircleArrowRight className="text-sm" />
            </>
          ) : test.status === "locked" ? (
            <>
              <span>Unlock</span>
              <FaLock className="text-sm" />
            </>
          ) : (
            <>
              <span>Start</span>
              <FaPlay className="text-sm" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function CardMockTests() {
  const [showAll, setShowAll] = React.useState(false);
  const visibleTests = showAll ? mockTests : mockTests.slice(0, 6);
  return (
    <div className="flex justify-center items-start w-full min-h-screen">
      <div
        className="bg-white rounded-2xl p-10 w-full flex flex-col"
        style={{ maxWidth: "1200px" }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#1D5554] mb-2 tracking-tighter">
            Test Yourself
          </h1>
          <p className="text-gray-600 text-lg">
            Practice with full-length IELTS mock tests (Reading, Listening,
            Writing, Speaking)
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
        {mockTests.length > 6 && (
          <div className="flex justify-center mt-10">
            <button
              className="flex flex-col items-center text-[#1D5554] font-bold text-sm tracking-widest select-none focus:outline-none"
              onClick={() => setShowAll((prev) => !prev)}
            >
              <span>{showAll ? "HIDE" : "SHOW MORE"}</span>
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
        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
          <h3 className="text-lg font-bold text-[#1D5554] mb-2">Test Tips</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              • Complete tests in one sitting to simulate real exam conditions
            </li>
            <li>• Review your answers and explanations after each test</li>
            <li>
              • Focus on time management - you have 2 hours 45 minutes for a
              full test
            </li>
            <li>• Unlock harder tests by completing easier ones first</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
