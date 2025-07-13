"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaPlay, FaFireAlt } from "react-icons/fa";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

interface Unit {
  title: string;
  description?: string;
  duration?: number;
  lessons: string[];
  mastery: number;
}

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
    ],
  },
];

function LearningSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="h-16 bg-white border-b animate-pulse" />
      <div className="flex flex-1">
        <div className="w-72 bg-white border-r p-6 hidden md:block">
          <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse" />
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-6 bg-gray-200 rounded mb-3 animate-pulse"
            />
          ))}
        </div>
        <div className="flex-1 p-8">
          <div className="h-80 bg-gray-200 rounded-xl mb-8 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-1/2 mb-4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function LearnUnitPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const skill = params?.skill as string;
  const unitTitle = params?.unit as string;

  const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);
  const [currentModule, setCurrentModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"about" | "transcript">("about");
  const [userXP, setUserXP] = useState(0);

  useEffect(() => {
    const foundModule = modules.find((m) => m.key === skill);
    if (foundModule) {
      setCurrentModule(foundModule);
      const unit = foundModule.units.find(
        (u) => u.title.toLowerCase().replace(/\s+/g, "-") === unitTitle
      );
      if (unit) {
        setCurrentUnit(unit);
      }
    }
    setTimeout(() => setLoading(false), 600); // Simulate loading
  }, [skill, unitTitle]);

  useEffect(() => {
    async function fetchUserXP() {
      try {
        const response = await fetch("/api/user/xp");
        if (response.ok) {
          const data = await response.json();
          setUserXP(data.xp);
        }
      } catch (error) {
        console.error("Failed to fetch user XP:", error);
      }
    }

    if (user) {
      fetchUserXP();
    }
  }, [user]);

  const handleBack = () => {
    router.push("/dashboard");
  };

  if (loading) return <LearningSkeleton />;

  if (!currentUnit || !currentModule) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Unit Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The requested unit could not be found.
          </p>
          <button
            onClick={handleBack}
            className="bg-[#1D5554] text-white px-6 py-3 rounded-lg hover:bg-[#17403f] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Dashboard Header */}
      <header className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        {/* Left: Back button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#1D5554] hover:text-[#17403f] transition-colors"
        >
          <FaArrowLeft className="text-lg" />
          <span className="font-semibold">Back to Dashboard</span>
        </button>
        {/* Center: Logo and Title */}
        <div className="flex items-center gap-2 justify-center">
          <Image
            src="/img/duo-picmain.svg"
            alt="Lexico Logo"
            width={32}
            height={32}
          />
          <span className="text-2xl font-extrabold text-[#1D5554] tracking-tighter">
            Lexico Academy
          </span>
        </div>
        {/* Right: User Info */}
        <div className="flex items-center gap-2">
          <span className="text-blue-700 font-semibold">
            {user?.username ||
              user?.firstName ||
              user?.emailAddresses?.[0]?.emailAddress}
          </span>
        </div>
      </header>
      {/* Profile Summary Bar */}
      <div className="w-full bg-gray-200 px-4 md:px-12 py-6 flex flex-row justify-between items-start gap-8">
        {/* Left: Empty for spacing (removed welcome message) */}
        <div className="flex-1" />
        {/* Right: Streak, XP, Level */}
        <div className="flex flex-col items-end gap-4 flex-shrink-0 w-full max-w-xl mr-40 mt-4">
          {/* Top row: Streak, divider, XP, divider, level/skills/progress */}
          <div className="flex items-center gap-6 w-full justify-end">
            {/* Streak */}
            <div className="flex items-center gap-2 text-gray-500">
              <FaFireAlt className="text-3xl text-orange-500" />
              <span className="text-2xl font-extrabold text-gray-700">10</span>
              <span className="text-base text-gray-400 font-semibold">
                Day Streak
              </span>
            </div>
            {/* Divider */}
            <div className="w-px h-10 bg-gray-300" />
            {/* XP */}
            <div className="flex items-center gap-1 text-gray-500">
              <span className="text-2xl font-extrabold text-[#1D5554]">
                {userXP.toLocaleString()}
              </span>
              <span className="text-lg text-gray-400 font-semibold">XP</span>
            </div>
            {/* Divider */}
            <div className="w-px h-10 bg-gray-300" />
            {/* Level/skills/progress */}
            <div className="flex flex-col items-start min-w-[240px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl font-extrabold text-[#1D5554]">
                  Level 2
                  <span
                    className="ml-2 text-base text-gray-400 cursor-pointer"
                    title="Level is based on skills unlocked."
                  >
                    ⓘ
                  </span>
                </span>
              </div>
              <div className="flex items-center w-full gap-3">
                {/* Progress Bar */}
                <div className="relative flex-1 h-3 rounded-full bg-gray-300">
                  <div
                    className="absolute left-0 top-0 h-3 rounded-full"
                    style={{
                      width: "30%",
                      background: "#1D5554",
                      transition: "width 0.3s",
                    }}
                  />
                  {/* Knob */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      left: "calc(30% - 10px)",
                    }}
                  >
                    <div className="w-5 h-5 bg-[#1D5554] border-2 border-white rounded-full shadow" />
                  </div>
                </div>
                {/* Skills Count */}
                <span className="text-lg font-extrabold text-gray-900">3</span>
                <span className="text-base text-gray-400">/ 10 skills</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        {/* Sidebar: Lesson Navigation */}
        <aside className="w-96 max-w-sm min-w-[350px] bg-white p-0 hidden md:flex flex-col items-stretch">
          <div className="rounded-2xl shadow-lg m-4 flex flex-col h-full bg-white">
            {/* Breadcrumbs and navigation */}
            <div className="px-6 pt-6 pb-2">
              <div className="text-xs text-gray-500 font-semibold mb-1">
                COURSE: IELTS {currentModule.label?.toUpperCase()} &gt; UNIT 1
              </div>
              <div className="flex items-center gap-2 mb-2">
                <button
                  className="p-1 rounded hover:bg-gray-100 text-gray-400"
                  title="Previous Lesson"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M15 19l-7-7 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <span className="text-sm font-bold text-[#1D5554] truncate">
                  Lesson 1: {currentUnit.lessons[0]}
                </span>
                <button
                  className="p-1 rounded hover:bg-gray-100 text-gray-400"
                  title="Next Lesson"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M9 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Lessons List */}
            <ul className="flex-1 overflow-y-auto px-2 py-2">
              {currentUnit.lessons.map((lesson, idx) => (
                <li key={lesson} className="py-1">
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-left ${
                      idx === 0
                        ? "bg-[#e6f4f3] border-l-4 border-[#1D5554] text-[#1D5554] font-bold shadow-sm"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                    disabled={idx > 1}
                  >
                    {/* Icon */}
                    <span className="inline-flex items-center justify-center w-6 h-6">
                      {idx === 0 ? (
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="16"
                            height="16"
                            rx="4"
                            fill="#1D5554"
                          />
                          <path
                            d="M8 12.5l2.5 2.5 5-5"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : idx === 1 ? (
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="16"
                            height="16"
                            rx="4"
                            fill="#e6f4f3"
                          />
                          <path
                            d="M9 12l2 2 4-4"
                            stroke="#1D5554"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="16"
                            height="16"
                            rx="4"
                            fill="#f3f4f6"
                          />
                          <path
                            d="M12 8v4l2 2"
                            stroke="#9ca3af"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="flex-1 truncate">{lesson}</span>
                    {/* Status badge */}
                    {idx === 0 && (
                      <span className="ml-2 text-xs font-semibold bg-[#1D5554] text-white px-2 py-0.5 rounded-full">
                        Mastered
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
            {/* Footer breadcrumbs/links */}
            <div className="px-6 py-4 text-xs text-gray-400">
              <div className="mb-2">
                Test prep &gt; IELTS {currentModule.label} &gt; Unit 1 &gt;{" "}
                {currentUnit.title}
              </div>
              <div className="flex gap-2 flex-wrap">
                <a href="#" className="hover:underline">
                  Terms of use
                </a>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="hover:underline">
                  Cookie Notice
                </a>
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Video/Main Content */}
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center mb-6">
            <div className="relative w-full aspect-video bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
              <Image
                src="/img/duo-pic1.webp"
                alt="Lesson preview"
                width={1280}
                height={720}
                className="object-cover w-full h-full opacity-90"
              />
              <button className="absolute inset-0 flex items-center justify-center group">
                <span className="bg-white rounded-full shadow-lg p-5 group-hover:scale-110 transition-transform">
                  <FaPlay className="text-[#1D5554] text-4xl" />
                </span>
              </button>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1D5554] mt-6 mb-2 text-center">
              {currentUnit.title}
            </h1>
            <p className="text-gray-600 text-lg text-center mb-2">
              {currentUnit.description ||
                "Master this lesson with strategies, examples, and practice."}
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-500 mb-2">
              <span className="bg-[#e6f4f3] px-3 py-1 rounded-full">
                {currentUnit.lessons.length} lessons
              </span>
              {currentUnit.duration && (
                <span className="bg-[#e6f4f3] px-3 py-1 rounded-full">
                  {currentUnit.duration} min
                </span>
              )}
              <span className="bg-[#e6f4f3] px-3 py-1 rounded-full">
                {currentUnit.mastery}% complete
              </span>
            </div>
          </div>
          {/* Tabs */}
          <div className="mb-6 flex gap-8 justify-center">
            <button
              className={`pb-2 px-2 font-semibold text-lg border-b-2 transition-all ${
                tab === "about"
                  ? "border-[#1D5554] text-[#1D5554]"
                  : "border-transparent text-gray-500 hover:text-[#1D5554]"
              }`}
              onClick={() => setTab("about")}
            >
              About
            </button>
            <button
              className={`pb-2 px-2 font-semibold text-lg border-b-2 transition-all ${
                tab === "transcript"
                  ? "border-[#1D5554] text-[#1D5554]"
                  : "border-transparent text-gray-500 hover:text-[#1D5554]"
              }`}
              onClick={() => setTab("transcript")}
            >
              Transcript
            </button>
          </div>
          {/* Tab Content */}
          {tab === "about" ? (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h2 className="font-bold text-xl mb-2 text-[#1D5554]">
                  Lesson Summary
                </h2>
                <p className="text-gray-700 mb-2">
                  Learn the best way to approach this lesson. Start by
                  identifying the claim, then restate it in your own words, then
                  find the best support in the choices.
                </p>
                <ul className="list-disc ml-6 text-gray-600">
                  <li>Identify the claim</li>
                  <li>Create a phrase</li>
                  <li>Test the choices</li>
                </ul>
              </div>
              {/* Q&A Section */}
              <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h3 className="font-semibold mb-2 text-[#1D5554]">
                  Questions & Answers
                </h3>
                <input
                  className="w-full border rounded p-2 mb-2"
                  placeholder="Ask a question..."
                />
                <div className="text-gray-500 text-sm mb-2">
                  No questions yet.
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-bold text-xl mb-2 text-[#1D5554]">
                  Transcript
                </h2>
                <p className="text-gray-700">
                  This is a placeholder transcript for the lesson video. The
                  full transcript will appear here for accessibility and review.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
