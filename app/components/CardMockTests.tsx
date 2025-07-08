import React from "react";
import {
  FaPlay,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";

const mockTests = [
  {
    id: 1,
    title: "IELTS Academic Reading Test 1",
    description: "Complete reading test with 40 questions across 3 passages",
    duration: "60 minutes",
    questions: 40,
    difficulty: "Medium",
    status: "available", // available, completed, locked
    score: null,
    maxScore: 40,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 2,
    title: "IELTS Academic Reading Test 2",
    description: "Advanced reading comprehension with academic texts",
    duration: "60 minutes",
    questions: 40,
    difficulty: "Hard",
    status: "completed",
    score: 32,
    maxScore: 40,
    completedAt: "2024-01-15",
    estimatedScore: null,
  },
  {
    id: 3,
    title: "IELTS Academic Reading Test 3",
    description: "Comprehensive test covering all question types",
    duration: "60 minutes",
    questions: 40,
    difficulty: "Easy",
    status: "available",
    score: null,
    maxScore: 40,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 4,
    title: "IELTS Academic Reading Test 4",
    description: "Real exam simulation with authentic materials",
    duration: "60 minutes",
    questions: 40,
    difficulty: "Hard",
    status: "locked",
    score: null,
    maxScore: 40,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 5,
    title: "IELTS Academic Reading Test 5",
    description: "Practice test focusing on diagram completion",
    duration: "60 minutes",
    questions: 40,
    difficulty: "Medium",
    status: "available",
    score: null,
    maxScore: 40,
    completedAt: null,
    estimatedScore: null,
  },
  {
    id: 6,
    title: "IELTS Academic Reading Test 6",
    description: "Advanced vocabulary and inference questions",
    duration: "60 minutes",
    questions: 40,
    difficulty: "Hard",
    status: "locked",
    score: null,
    maxScore: 40,
    completedAt: null,
    estimatedScore: null,
  },
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
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#1D5554] mb-2">
            {test.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">{test.description}</p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
            test.difficulty
          )}`}
        >
          {test.difficulty}
        </div>
      </div>

      <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FaClock className="text-gray-400" />
          <span>{test.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaStar className="text-gray-400" />
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm font-medium text-gray-700">
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
  return (
    <div className="flex justify-center items-start w-full min-h-screen">
      <div
        className="bg-white rounded-2xl p-10 w-full flex flex-col"
        style={{ maxWidth: "1200px" }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#1D5554] mb-2 tracking-tighter">
            Mock Tests
          </h1>
          <p className="text-gray-600 text-lg">
            Practice with full-length IELTS Academic Reading tests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
          <h3 className="text-lg font-bold text-[#1D5554] mb-2">Test Tips</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              • Complete tests in one sitting to simulate real exam conditions
            </li>
            <li>• Review your answers and explanations after each test</li>
            <li>
              • Focus on time management - you have 60 minutes for 40 questions
            </li>
            <li>• Unlock harder tests by completing easier ones first</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
