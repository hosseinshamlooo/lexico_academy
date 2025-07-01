"use client";

import Image from "next/image";

export default function FeatureTwo() {
  return (
    <section className="w-full py-16 bg-cyan-100/70 flex justify-center">
      <div className="max-w-5xl w-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0 px-7 md:px-0">
        {/* Left: Text */}
        <div className="flex-1 max-w-lg flex flex-col items-start justify-center space-y-7 order-2 md:order-1">
          <h2 className="font-extrabold tracking-tight leading-tight text-4xl md:text-5xl text-primary text-left font-[var(--font-body)]">
            Bite-Sized Learning That Fits Your Life
          </h2>
          <p className="text-gray-500 max-w-2xl text-left text-base md:text-lg font-medium">
            Our expert-led video lessons break down each IELTS skill into clear,
            digestible chunks. You&apos;ll learn strategies that actually work,
            review real test questions, and feel your confidence grow with every
            session — no burnout, no fluff.
          </p>
        </div>
        {/* Right: GIF */}
        <div className="flex-1 max-w-md flex items-center justify-center order-1 md:order-2">
          <Image
            src="/img/duo-gif2.gif"
            alt="Bite-sized learning illustration"
            width={400}
            height={400}
            className="w-full max-w-md rounded-3xl object-cover shadow-lg"
            priority={false}
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
