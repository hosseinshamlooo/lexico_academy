import Image from "next/image";
import { FaFireAlt } from "react-icons/fa";

interface CardProfileSummaryProps {
  avatarUrl?: string;
  name: string;
  username: string;
  streak: number;
  xp: number;
  level?: number;
  skillsUnlocked?: number;
  totalSkills?: number;
}

export default function CardProfileSummary({
  avatarUrl,
  name,
  username,
  streak,
  xp,
  level,
  skillsUnlocked,
  totalSkills,
}: CardProfileSummaryProps) {
  // Calculate progress as a fraction of skills unlocked
  const progress = totalSkills > 0 ? skillsUnlocked / totalSkills : 0;

  return (
    <div className="w-full bg-gray-50 rounded-none px-4 md:px-12 py-6 flex flex-row justify-between items-start gap-8 border-b border-gray-100">
      {/* Left: Avatar and Welcome */}
      <div className="flex flex-row items-start gap-6 flex-1 min-w-0 ml-40">
        <div className="w-20 h-20 overflow-hidden flex-shrink-0">
          <Image
            src={avatarUrl || "/img/duo-picmain.svg"}
            alt="User avatar"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-center text-left min-w-0 mt-3">
          <div className="text-3xl font-extrabold text-[#1D5554] truncate tracking-tighter">
            Welcome back, {name}!
          </div>
          <div className="text-gray-500 text-lg truncate font-semibold">
            @{username}
          </div>
        </div>
      </div>
      {/* Right: Streak, XP, Level */}
      <div className="flex flex-col items-end gap-4 flex-shrink-0 w-full max-w-xl mr-40 mt-4">
        {/* Top row: Streak, divider, XP, divider, level/skills/progress */}
        <div className="flex items-center gap-6 w-full justify-end">
          {/* Streak */}
          <div className="flex items-center gap-2 text-gray-500">
            <FaFireAlt className="text-3xl text-orange-500" />
            <span className="text-2xl font-extrabold text-gray-700">
              {streak}
            </span>
            <span className="text-base text-gray-400 font-semibold">
              Day Streak
            </span>
          </div>
          {/* Divider */}
          <div className="w-px h-10 bg-gray-300" />
          {/* XP */}
          <div className="flex items-center gap-1 text-gray-500">
            <span className="text-2xl font-extrabold text-[#1D5554]">
              {xp.toLocaleString()}
            </span>
            <span className="text-lg text-gray-400 font-semibold">XP</span>
          </div>
          {/* Divider */}
          <div className="w-px h-10 bg-gray-300" />
          {/* Level/skills/progress */}
          <div className="flex flex-col items-start min-w-[240px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-extrabold text-[#1D5554]">
                Level {level}
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
                    width: `${progress * 100}%`,
                    background: "#1D5554",
                    transition: "width 0.3s",
                  }}
                />
                {/* Knob */}
                <div
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{
                    left: `calc(${progress * 100}% - 10px)`,
                  }}
                >
                  <div className="w-5 h-5 bg-[#1D5554] border-2 border-white rounded-full shadow" />
                </div>
              </div>
              {/* Skills Count */}
              <span className="text-lg font-extrabold text-gray-900">
                {skillsUnlocked}
              </span>
              <span className="text-base text-gray-400">
                / {totalSkills} skills
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
