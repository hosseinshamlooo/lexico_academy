"use client";

import React from "react";

const features = [
  {
    icon: (
      <svg
        width="64"
        height="64"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2"
        viewBox="0 0 64 64"
      >
        <rect
          x="8"
          y="16"
          width="48"
          height="32"
          rx="4"
          stroke="var(--color-primary)"
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="16"
          y1="24"
          x2="48"
          y2="24"
          stroke="var(--color-primary)"
          strokeWidth="2"
        />
        <line
          x1="16"
          y1="32"
          x2="48"
          y2="32"
          stroke="var(--color-primary)"
          strokeWidth="2"
        />
        <line
          x1="16"
          y1="40"
          x2="48"
          y2="40"
          stroke="var(--color-primary)"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "1,000+ Question Sets",
    description:
      "Covering every skill, topic, and question type with instant feedback.",
  },
  {
    icon: (
      <svg
        width="64"
        height="64"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2"
        viewBox="0 0 64 64"
      >
        <circle
          cx="32"
          cy="32"
          r="24"
          stroke="var(--color-primary)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M32 16v32M16 32h32"
          stroke="var(--color-primary)"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "150+ Video Lessons",
    description:
      "Created by certified instructors to break down every part of the test.",
  },
  {
    icon: (
      <svg
        width="64"
        height="64"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2"
        viewBox="0 0 64 64"
      >
        <rect
          x="12"
          y="20"
          width="40"
          height="24"
          rx="4"
          stroke="var(--color-primary)"
          strokeWidth="2"
          fill="none"
        />
        <rect
          x="24"
          y="28"
          width="16"
          height="8"
          rx="2"
          stroke="var(--color-primary)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
    title: "8 Full Mock Tests",
    description:
      "Official-style practice exams with smart scoring and analytics.",
  },
];

const MainFeatures = () => {
  return (
    <section className="w-full py-16 bg-cyan-100/70 flex justify-center">
      <div className="max-w-5xl w-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0 px-7 md:px-0">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center flex-1 px-4"
          >
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-2xl md:text-2xl font-extrabold text-primary mb-2 font-[var(--font-body)] tracking-tight leading-tight">
              {feature.title}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm font-medium max-w-xs">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainFeatures;
