import React from "react";
import { FaBoltLightning } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";

interface CorrectionDisplayProps {
  correct: number;
  total: number;
  percentage?: number;
}

function getGradeLabel(percentage: number) {
  if (percentage >= 90) return "EXCELLENT!";
  if (percentage >= 80) return "SUPERB!";
  if (percentage >= 70) return "GREAT!";
  if (percentage >= 60) return "NICE!";
  return "GOOD EFFORT";
}

export default function CorrectionDisplay({
  correct,
  total,
  percentage,
}: CorrectionDisplayProps) {
  const calculatedPercentage =
    percentage ?? Math.round((correct / total) * 100);
  const xp = correct * 10;
  const gradeLabel = getGradeLabel(calculatedPercentage);

  // Shared box style
  const boxStyle = {
    width: "140px",
    height: "72px",
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    position: "relative" as const,
    overflow: "hidden",
    border: "4px solid",
  };

  return (
    <div className="flex justify-center items-center gap-8 py-4 bg-transparent">
      {/* XP Box */}
      <div
        style={{
          ...boxStyle,
          borderColor: "#FFD65A",
          borderTopWidth: 8,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "16px",
            background: "#FFD65A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: "11px",
            color: "#fff",
            letterSpacing: "0.05em",
            position: "absolute",
            top: 0,
            left: 0,
            borderBottom: "1px solid #FFD65A",
            zIndex: 2,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          TOTAL XP
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            width: "100%",
            marginBottom: 10,
          }}
        >
          <div
            className="flex items-center gap-2 font-semibold"
            style={{ color: "#FFD65A", fontSize: "16px" }}
          >
            <FaBoltLightning style={{ color: "#FFD65A" }} size={24} />
            <span
              style={{
                fontSize: "20px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              {xp}
            </span>
          </div>
        </div>
      </div>
      {/* Grade Box */}
      <div
        style={{
          ...boxStyle,
          borderColor: "#3A7C7B",
          borderTopWidth: 8,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "16px",
            background: "#3A7C7B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: "11px",
            color: "#fff",
            letterSpacing: "0.05em",
            position: "absolute",
            top: 0,
            left: 0,
            borderBottom: "1px solid #3A7C7B",
            zIndex: 2,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          {gradeLabel}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            width: "100%",
            marginBottom: 10,
          }}
        >
          <div
            className="flex items-center gap-2 font-semibold"
            style={{ color: "#3A7C7B", fontSize: "16px" }}
          >
            <TbTargetArrow style={{ color: "#3A7C7B" }} size={24} />
            <span
              style={{
                fontSize: "20px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              {calculatedPercentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
