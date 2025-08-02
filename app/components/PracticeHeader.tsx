import React from "react";
import Image from "next/image";
import { FaClock } from "react-icons/fa6";

function PracticeHeader() {
  return (
    <div
      className="bg-gray-100 border-b border-gray-300"
      style={{ borderBottomWidth: "3px" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-5 relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 text-sm">
              Practice your skills with this passage
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-[var(--color-primary)] text-xl" />
            <span className="font-extrabold tracking-tighter text-[var(--color-primary)]">
              05:00
            </span>
          </div>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Image
              src="/img/duo-picmain.svg"
              alt="Lexico Logo"
              width={32}
              height={32}
            />
            <span className="text-2xl font-extrabold text-[var(--color-primary)] tracking-tighter">
              Lexico Academy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticeHeader;
