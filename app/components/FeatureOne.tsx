"use client";

import Image from "next/image";

export default function FeatureOne() {
  return (
    <section className="w-full py-16 bg-cyan-100/70 flex justify-center">
      <div className="max-w-5xl w-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0 px-7 md:px-0">
        {/* Left: GIF */}
        <div className="flex-1 max-w-md flex items-center justify-center">
          <Image
            src="/img/duo-gif1.gif"
            alt="Animated practice illustration"
            width={400}
            height={400}
            className="w-full max-w-md rounded-3xl object-cover shadow-lg"
            priority={false}
          />
        </div>
        {/* Right: Text */}
        <div className="flex-1 max-w-lg flex flex-col items-start justify-center space-y-7">
          <h2 className="font-extrabold tracking-tight leading-tight text-4xl md:text-5xl text-primary text-left font-[var(--font-body)]">
            Smarter Practice, Better Results
          </h2>
          <p className="text-gray-500 max-w-2xl text-left text-base md:text-lg font-medium">
            Lexico gives you instant feedback, personalized analytics, and
            targeted practice based on your strengths and weaknesses. From band
            score predictions to skill-specific recommendations, everything is
            built to help you study smarter — not harder — and reach your target
            faster.
          </p>
        </div>
      </div>
    </section>
  );
}
