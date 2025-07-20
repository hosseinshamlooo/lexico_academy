"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaPlay,
  FaFireAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
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
      {/* Header Skeleton */}
      <div className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm animate-pulse">
        <div className="h-8 w-32 bg-gray-200 rounded" />
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="h-8 w-32 bg-gray-200 rounded" />
      </div>
      {/* Profile Summary Skeleton */}
      <div className="w-full bg-gray-50 px-4 md:px-12 py-6 flex flex-row justify-between items-start gap-8 border-b border-gray-100 animate-pulse">
        <div className="flex-1" />
        <div className="flex flex-col items-end gap-4 flex-shrink-0 w-full max-w-xl mr-40 mt-4">
          <div className="flex items-center gap-6 w-full justify-end">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-6 w-10 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="flex items-center gap-1">
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="flex flex-col items-start min-w-[240px]">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="flex items-center w-full gap-3">
                <div className="relative flex-1 h-3 rounded-full bg-gray-200" />
                <div className="w-5 h-5 bg-gray-200 rounded-full shadow animate-pulse" />
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar Skeleton */}
        <aside className="relative bg-white border border-gray-100 mx-auto mt-8 mb-12 ml-8 hidden md:flex flex-col items-stretch transition-all duration-300 rounded-2xl overflow-hidden min-w-[220px] max-w-xs w-64 h-[600px] animate-pulse">
          <div className="h-8 bg-gray-200 rounded m-6 mb-4" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded mx-6 mb-3" />
          ))}
          <div className="flex-1" />
          <div className="bg-gray-100 rounded-xl px-6 py-4 m-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </aside>
        {/* Main Content + Right Panel */}
        <main className="flex-1 flex flex-row gap-8 items-start justify-center ml-8 mr-8">
          {/* Main Content Skeleton */}
          <div className="bg-white w-full mx-auto flex flex-col relative rounded-2xl transition-all duration-300 max-w-7xl h-[600px] animate-pulse">
            <div className="w-full flex flex-col items-center mb-6 rounded-2xl">
              <div className="h-8 bg-gray-200 rounded w-2/3 mt-8 mb-6 animate-pulse" />
              <div className="relative w-full aspect-video bg-gray-200 mx-auto flex items-center justify-center overflow-hidden rounded-2xl max-w-3xl animate-pulse" />
            </div>
            <div className="mt-8 max-w-5xl w-full mx-auto">
              <div className="bg-gray-100 rounded-xl p-6 mb-8">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
              </div>
              <div className="bg-gray-100 rounded-xl p-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
              </div>
            </div>
          </div>
          {/* Notes/Status Card Skeleton */}
          <aside className="hidden lg:flex flex-col gap-6 bg-white border border-gray-200 rounded-xl p-4 min-w-[320px] max-w-lg h-[800px] mt-0 animate-pulse">
            <div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse" />
              <div className="h-24 bg-gray-100 rounded mb-2 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded w-full mb-2 animate-pulse" />
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded w-full mb-2 animate-pulse" />
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>
          </aside>
        </main>
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
  const [aboutTab, setAboutTab] = useState<"about" | "transcript">("about");
  const [qaTab, setQaTab] = useState<"questions" | "tips">("questions");
  const [userXP, setUserXP] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      <div className="w-full bg-gray-50 px-4 md:px-12 py-6 flex flex-row justify-between items-start gap-8">
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
        {sidebarOpen && (
          <aside
            className="relative bg-white border border-gray-100 mx-auto mt-8 mb-12 ml-8 hidden md:flex flex-col items-stretch transition-all duration-300 rounded-2xl overflow-hidden"
            style={{ width: 500, height: 600 }}
          >
            {/* Sidebar Content */}
            <div className="flex flex-col h-full bg-white overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-6 pt-6 pb-2">
                <Image
                  src="/img/duo-picmain.svg"
                  alt="Section Icon"
                  width={40}
                  height={40}
                />
                <span className="font-bold text-2xl text-[#1D5554]">
                  SAT Reading and Writing
                </span>
              </div>
              {/* Breadcrumbs and navigation */}
              <div className="px-6 pt-2 pb-1">
                <div className="text-base text-gray-500 font-semibold mb-1 text-center">
                  IELTS ACADEMIC {currentModule.label?.toUpperCase()} &gt; UNIT
                  1
                </div>
                <div className="flex items-center gap-1 mb-1 mt-2">
                  <button
                    className="p-1 rounded hover:bg-gray-100 text-gray-400"
                    title="Previous Lesson"
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M15 19l-7-7 7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <span className="text-lg font-bold text-[#1D5554] truncate">
                    Lesson 1: {currentUnit.lessons[0]}
                  </span>
                  <button
                    className="p-1 rounded hover:bg-gray-100 text-gray-400"
                    title="Next Lesson"
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
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
              <ul className="flex-1 overflow-y-auto px-2 py-2 divide-y divide-gray-100">
                {currentUnit.lessons.map((lesson, idx) => (
                  <li key={lesson} className="py-4 px-2">
                    <button
                      className={`w-full flex items-center gap-4 px-6 py-3 rounded-lg transition-all text-left ${
                        idx === 0
                          ? "bg-[#e6f4f3] border-l-4 border-[#1D5554] text-[#1D5554] font-bold shadow-sm"
                          : "hover:bg-gray-50 text-gray-700"
                      } text-lg font-medium`}
                      disabled={idx > 1}
                    >
                      {/* Icon */}
                      <span className="inline-flex items-center justify-center w-7 h-7">
                        {idx === 0 ? (
                          <svg
                            width="24"
                            height="24"
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
                            width="24"
                            height="24"
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
                            width="24"
                            height="24"
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
                      <span className="flex-1 truncate text-left text-lg font-medium">
                        {lesson}
                      </span>
                      {/* Status badge */}
                      {idx === 0 && (
                        <span className="ml-2 text-base font-semibold bg-[#1D5554] text-white px-3 py-1 rounded-full">
                          Mastered
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              {/* Footer breadcrumbs/links */}
              {/* Footer breadcrumbs/links */}
              <div className="bg-gray-100 rounded-xl px-6 py-4 mb-4 ml-4 mr-4 text-center">
                {/* Breadcrumbs as links */}
                <div className="mb-2 flex flex-wrap justify-center items-center gap-1 text-base">
                  <a
                    href="#"
                    className="text-[#1D5554] hover:underline font-light"
                  >
                    Test prep
                  </a>
                  <span>&gt;</span>
                  <a
                    href="#"
                    className="text-[#1D5554] hover:underline font-light"
                  >
                    IELTS {currentModule.label}
                  </a>
                  <span>&gt;</span>
                  <a
                    href="#"
                    className="text-[#1D5554] hover:underline font-light"
                  >
                    Unit 1
                  </a>
                  <span>&gt;</span>
                  <a
                    href="#"
                    className="text-[#1D5554] hover:underline font-light"
                  >
                    {currentUnit.title}
                  </a>
                </div>
              </div>
              {/* Copyright */}
              <div className="text-xs text-gray-400 mb-2 text-center">
                © 2025 Lexico Academy
              </div>
              {/* Terms/links */}
              <div className="flex flex-wrap justify-center gap-4 mb-6 text-xs text-gray-500">
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
          </aside>
        )}
        {/* Main Content + Right Panel */}
        <main className="flex-1 flex flex-row gap-8 items-start justify-center ml-8 mr-8">
          {/* Main Content */}
          <div
            className={`bg-white w-full mx-auto flex flex-col relative rounded-2xl transition-all duration-300 ${
              sidebarOpen ? "max-w-7xl" : "max-w-screen-2xl"
            } h-[600px]`}
          >
            {/* Sidebar toggle button inside the main card */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-2 bg-white border border-gray-200 rounded-r-full shadow-md hover:bg-gray-100 transition-all"
              title={sidebarOpen ? "Collapse sidebar" : "Open sidebar"}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <FaChevronLeft className="text-2xl text-gray-500" />
              ) : (
                <FaChevronRight className="text-2xl text-gray-500" />
              )}
            </button>
            {/* Video/Main Content */}
            <div className="w-full flex flex-col items-center mb-6 rounded-2xl">
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1D5554] mt-8 mb-6 text-center">
                {currentUnit.title}
              </h1>
              <div
                className={`relative w-full aspect-video bg-gray-200 mx-auto flex items-center justify-center overflow-hidden border rounded-2xl ${
                  sidebarOpen ? "max-w-4xl" : "max-w-6xl"
                }`}
              >
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
            </div>
            {/* Tabs and About/Transcript Section */}
            <div className="mt-8 max-w-5xl w-full mx-auto">
              <div className="bg-white rounded-xl p-6 mb-8">
                <div className="flex justify-left gap-8 mb-4">
                  <button
                    className={`pb-2 px-2 font-bold tracking-tight text-xl border-b-2 transition-all ${
                      aboutTab === "about"
                        ? "border-[#1D5554] text-[#1D5554]"
                        : "border-transparent text-gray-500 hover:text-[#1D5554]"
                    }`}
                    onClick={() => setAboutTab("about")}
                  >
                    About
                  </button>
                  <button
                    className={`pb-2 px-2 font-bold tracking-tight text-xl border-b-2 transition-all ${
                      aboutTab === "transcript"
                        ? "border-[#1D5554] text-[#1D5554]"
                        : "border-transparent text-gray-500 hover:text-[#1D5554]"
                    }`}
                    onClick={() => setAboutTab("transcript")}
                  >
                    Transcript
                  </button>
                </div>
                {aboutTab === "about" ? (
                  <>
                    <h2 className="font-bold text-xl mb-2 text-[#1D5554]">
                      Lesson Summary
                    </h2>
                    <p className="text-gray-700 mb-2 text-xl">
                      Learn the best way to approach this lesson. Start by
                      identifying the claim, then restate it in your own words,
                      then find the best support in the choices.
                    </p>
                    <ul className="list-disc ml-6 text-gray-600 mb-6 text-xl">
                      <li>Identify the claim</li>
                      <li>Create a phrase</li>
                      <li>Test the choices</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <h2 className="font-bold text-xl mb-2 text-[#1D5554]">
                      Transcript
                    </h2>
                    <p className="text-gray-700 text-xl">
                      This is a placeholder transcript for the lesson video. The
                      full transcript will appear here for accessibility and
                      review.
                    </p>
                  </>
                )}
              </div>
              {/* Questions/Tips & Thanks Section */}
              <div className="bg-white rounded-xl p-6">
                <div className="flex justify-left gap-8 mb-4">
                  <button
                    className={`pb-2 px-2 font-bold tracking-tight text-xl border-b-2 transition-all ${
                      qaTab === "questions"
                        ? "border-[#1D5554] text-[#1D5554]"
                        : "border-transparent text-gray-500 hover:text-[#1D5554]"
                    }`}
                    onClick={() => setQaTab("questions")}
                  >
                    Questions
                  </button>
                  <button
                    className={`pb-2 px-2 font-bold tracking-tight text-xl border-b-2 transition-all ${
                      qaTab === "tips"
                        ? "border-[#1D5554] text-[#1D5554]"
                        : "border-transparent text-gray-500 hover:text-[#1D5554]"
                    }`}
                    onClick={() => setQaTab("tips")}
                  >
                    Tips & Thanks
                  </button>
                </div>
                {qaTab === "questions" ? (
                  <>
                    <label
                      className="block text-gray-700 font-semibold mb-1 text-xl"
                      htmlFor="question-input"
                    >
                      Question
                    </label>
                    <div className="flex items-start gap-3 mb-2">
                      {user?.imageUrl ? (
                        <Image
                          src={user.imageUrl}
                          alt="User avatar"
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 border" />
                      )}
                      <textarea
                        id="question-input"
                        className="w-full border p-2 rounded resize-y min-h-[48px] text-base"
                        placeholder="Ask a question..."
                        rows={2}
                      />
                    </div>
                    <div className="text-gray-500 text-sm mb-2 text-lg mt-4 mb-4">
                      No questions yet.
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-gray-500 text-sm mb-4 mt-4 text-lg">
                      No tips or thanks yet.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Right Panel */}
          <aside
            className={`hidden lg:flex flex-col gap-6 bg-white border border-gray-200 rounded-xl p-4 mt-8 ml-2 transition-all duration-300 ${
              sidebarOpen
                ? "w-[420px] min-w-[320px] max-w-lg"
                : "w-[600px] min-w-[400px] max-w-2xl"
            } h-[800px]`}
          >
            <div>
              <label
                htmlFor="lesson-notes"
                className="block text-gray-700 font-semibold mb-2"
              >
                Notes
              </label>
              <textarea
                id="lesson-notes"
                className="w-full border rounded p-2 min-h-[120px] resize-y mb-2"
                placeholder="Write your notes here..."
              />
              <button className="w-full bg-[#1D5554] text-white font-semibold py-2 rounded-lg hover:bg-[#17403f] transition-colors mb-2">
                Save Entry
              </button>
            </div>
            <div className="border-t pt-4">
              <div className="text-gray-700 font-semibold mb-2">Status</div>
              <button className="w-full border border-[#1D5554] text-[#1D5554] font-semibold py-2 rounded-lg hover:bg-[#e6f4f3] transition-colors">
                Mark Lesson as Finished
              </button>
            </div>
            <div className="border-t pt-4">
              <div className="text-gray-700 font-semibold mb-2">
                Next Lesson
              </div>
              <div className="text-gray-500 text-sm">(Coming soon)</div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
