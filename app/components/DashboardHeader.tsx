"use client";

import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function DashboardHeader({ userName }: { userName?: string }) {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b border-gray-100">
      {/* Left: Empty for spacing */}
      <div className="flex-1" />
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
      <div className="flex-1 flex items-center justify-end gap-2">
        <span className="text-blue-700 font-semibold">{userName}</span>
        <UserButton redirectUrl="/" />
      </div>
    </header>
  );
}
