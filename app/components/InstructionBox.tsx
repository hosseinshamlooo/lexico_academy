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
      className={`bg-yellow-50 border-l-4 border-yellow-400 px-3 py-2 mb-3 text-yellow-900 text-base font-medium rounded-lg w-full ${className}`}
    >
      {children}
    </div>
  );
}
