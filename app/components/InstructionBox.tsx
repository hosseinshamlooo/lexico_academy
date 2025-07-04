import React from "react";

interface InstructionBoxProps {
  children: React.ReactNode;
  className?: string;
}

export default function InstructionBox({
  children,
  className = "",
}: InstructionBoxProps) {
  return (
    <div
      className={`bg-[#e6f4f3] border-l-4 border-[#1D5554] px-3 py-2 mb-3 text-[#1D5554] text-base font-medium rounded-lg w-full ${className}`}
    >
      {children}
    </div>
  );
}
