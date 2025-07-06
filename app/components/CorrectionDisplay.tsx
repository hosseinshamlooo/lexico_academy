import React from "react";

interface CorrectionDisplayProps {
  correct: number;
  total: number;
  percentage?: number;
}

export default function CorrectionDisplay({
  correct,
  total,
  percentage,
}: CorrectionDisplayProps) {
  const calculatedPercentage =
    percentage ?? Math.round((correct / total) * 100);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="text-2xl font-bold text-gray-900">
          {correct}/{total}
        </div>
      </div>
      <div className="text-sm text-gray-600">
        {calculatedPercentage}% correct
      </div>
    </div>
  );
}
