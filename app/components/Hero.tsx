// app/components/Hero.tsx
"use client";

import Image from "next/image";
import duoPicMain from "@/public/img/duo-picmain.svg";
export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 md:space-y-0 md:gap-2 text-left bg-gradient-to-b from-cyan-100/70">
      {/* Left: Text Content */}
      <div className="flex-1 max-w-lg flex flex-col items-start justify-center space-y-7">
        <h1 className="relative font-extrabold tracking-tight leading-tight text-4xl text-gray-800 text-left">
          Prep smart. Score hard.
          <br />
          Let&apos;s. Get.{" "}
          <span className="relative inline-block text-primary">
            Cookin&apos;.
          </span>
        </h1>

        <p className="text-gray-500 max-w-2xl text-left">
          Lexico turns IELTS prep into a game — unlock XP, track your streaks,
          <br />
          and climb the leaderboard while learning from expert instructors.{" "}
          <br />
          Study smarter, level up faster, and crush your goals.
        </p>

        {/* Buttons */}
        <div className="flex flex-row space-x-4 mt-2">
          <button className="hero-btn hero-btn-primary font-bold py-3 px-8 rounded-full cursor-pointer">
            Lets cook
          </button>
          <button className="hero-btn hero-btn-secondary font-bold py-3 px-8 rounded-full cursor-pointer">
            Learn more
          </button>
        </div>
      </div>

      {/* Right: Image */}
      <div className="flex-1 max-w-md flex items-center justify-center mt-8 md:mt-0 s">
        <Image
          src={duoPicMain}
          alt="hero image placeholder"
          width={400}
          height={400}
          className="w-full max-w-md rounded-3xl object-cover"
        />
      </div>
    </div>
  );
}
