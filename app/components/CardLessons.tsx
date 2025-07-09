import React from "react";
import {
  FaPlay,
  FaCheckCircle,
  FaLock,
  FaUnlock,
  FaBook,
  FaGraduationCap,
  FaClock,
} from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";

const mockLessons = [
  {
    id: 1,
    title: "Introduction to IELTS Reading",
    description:
      "Learn the basics of IELTS Academic Reading test format and strategies",
    duration: "15 minutes",
    difficulty: "Beginner",
    status: "completed", // available, completed, locked
    progress: 100,
    skills: ["Test Format", "Time Management", "Skimming"],
    estimatedScore: null,
  },
  {
    id: 2,
    title: "Skimming and Scanning Techniques",
    description:
      "Master the essential reading techniques for quick information retrieval",
    duration: "20 minutes",
    difficulty: "Beginner",
    status: "completed",
    progress: 100,
    skills: ["Skimming", "Scanning", "Speed Reading"],
    estimatedScore: null,
  },
  {
    id: 3,
    title: "Understanding Question Types",
    description:
      "Learn to identify and approach different IELTS question formats",
    duration: "25 minutes",
    difficulty: "Intermediate",
    status: "available",
    progress: 0,
    skills: ["MCQ", "True/False", "Matching", "Completion"],
    estimatedScore: null,
  },
  {
    id: 4,
    title: "Academic Vocabulary Building",
    description: "Expand your academic vocabulary for better comprehension",
    duration: "30 minutes",
    difficulty: "Intermediate",
    status: "locked",
    progress: 0,
    skills: ["Vocabulary", "Context Clues", "Word Families"],
    estimatedScore: null,
  },
  {
    id: 5,
    title: "Complex Sentence Analysis",
    description: "Learn to break down complex academic sentences",
    duration: "35 minutes",
    difficulty: "Advanced",
    status: "locked",
    progress: 0,
    skills: ["Grammar", "Sentence Structure", "Comprehension"],
    estimatedScore: null,
  },
  {
    id: 6,
    title: "Critical Reading Strategies",
    description:
      "Develop critical thinking skills for advanced reading comprehension",
    duration: "40 minutes",
    difficulty: "Advanced",
    status: "locked",
    progress: 0,
    skills: ["Critical Thinking", "Inference", "Analysis"],
    estimatedScore: null,
  },
];

function LessonCard({ lesson }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "text-green-600 bg-green-100";
      case "intermediate":
        return "text-yellow-600 bg-yellow-100";
      case "advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = () => {
    switch (lesson.status) {
      case "completed":
        return <FaCheckCircle className="text-green-500 text-2xl" />;
      case "locked":
        return <FaLock className="text-gray-400 text-2xl" />;
      default:
        return <FaPlay className="text-[#1D5554] text-2xl" />;
    }
  };

  const getStatusText = () => {
    switch (lesson.status) {
      case "completed":
        return "Completed";
      case "locked":
        return "Locked";
      default:
        return "Start Lesson";
    }
  };

  const getStatusButtonClass = () => {
    switch (lesson.status) {
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
            {lesson.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
            lesson.difficulty
          )}`}
        >
          {lesson.difficulty}
        </div>
      </div>

      <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FaClock className="text-gray-400" />
          <span>{lesson.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaBook className="text-gray-400" />
          <span>{lesson.skills.length} skills</span>
        </div>
      </div>

      {lesson.status === "completed" && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">
              Progress: {lesson.progress}%
            </span>
            <FaGraduationCap className="text-green-500" />
          </div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${lesson.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {lesson.status === "available" && lesson.progress > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">
              Progress: {lesson.progress}%
            </span>
            <FaBook className="text-blue-500" />
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${lesson.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {lesson.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm font-medium text-gray-700">
            {getStatusText()}
          </span>
        </div>
        <button
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${getStatusButtonClass()}`}
          disabled={lesson.status === "locked"}
        >
          {lesson.status === "completed" ? (
            <>
              <span>Review</span>
              <FaCircleArrowRight className="text-sm" />
            </>
          ) : lesson.status === "locked" ? (
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

export default function CardLessons() {
  return (
    <div className="flex justify-center items-start w-full min-h-screen">
      <div
        className="bg-white rounded-2xl p-10 w-full flex flex-col"
        style={{ maxWidth: "1200px" }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#1D5554] mb-2 tracking-tighter">
            Learning Path
          </h1>
          <p className="text-gray-600 text-lg">
            Master IELTS Academic Reading through structured lessons
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
          <h3 className="text-lg font-bold text-[#1D5554] mb-2">
            Learning Tips
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Complete lessons in order to unlock advanced content</li>
            <li>• Practice the skills you learn in the Practice section</li>
            <li>• Review completed lessons to reinforce your learning</li>
            <li>• Each lesson builds upon the previous ones</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
