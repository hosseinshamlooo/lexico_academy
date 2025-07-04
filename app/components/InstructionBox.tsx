import React from "react";

interface InstructionBoxProps {
  children: React.ReactNode;
  className?: string;
}

export default function InstructionBox({
  children,
  className = "",
}: InstructionBoxProps) {
  // Convert string children to JSX with line breaks
  const renderContent = () => {
    if (typeof children === "string") {
      return children.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < children.split("\n").length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return children;
  };

  return (
    <div
      className={`bg-[#e6f4f3] border-l-4 border-[#1D5554] px-3 py-2 mb-3 text-[#1D5554] text-base font-medium rounded-lg w-full ${className}`}
    >
      {renderContent()}
    </div>
  );
}
