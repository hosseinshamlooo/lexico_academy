import React, { useState, useEffect } from "react";
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

// Custom hook for counting animation
function useCountUp(endValue: number, duration: number, delay: number = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const startValue = 0;

      const updateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Exponential easing that slows down much earlier
        const exponentialEase = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(
          startValue + (endValue - startValue) * exponentialEase
        );

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      updateCount();
    }, delay);

    return () => clearTimeout(timer);
  }, [endValue, duration, delay]);

  return count;
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

  // Animated values
  const animatedXP = useCountUp(xp, 1500, 100); // Start 100ms after component mounts
  const animatedPercentage = useCountUp(calculatedPercentage, 2000, 1500); // Start 1.5s after component mounts

  // Audio effects
  useEffect(() => {
    const audio = new Audio("/433649__dersuperanton__plopp-bubble-popping.wav");

    // Play sound when XP box appears (exactly when it mounts)
    const xpTimer = setTimeout(() => {
      audio.play().catch((e) => console.log("Audio play failed:", e));
    }, 0);

    // Play sound when grade box appears (exactly when it mounts)
    const gradeTimer = setTimeout(() => {
      audio.play().catch((e) => console.log("Audio play failed:", e));
    }, 1000);

    return () => {
      clearTimeout(xpTimer);
      clearTimeout(gradeTimer);
    };
  }, []);

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
      <style jsx>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(20px);
          }
          50% {
            transform: scale(1.1) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .xp-box {
          animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .grade-box {
          animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1s both;
        }
      `}</style>
      {/* XP Box */}
      <div
        className="xp-box"
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
            <FaBoltLightning style={{ color: "#FFD65A" }} size={20} />
            <span
              style={{
                fontSize: "20px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              {animatedXP}
            </span>
          </div>
        </div>
      </div>
      {/* Grade Box */}
      <div
        className="grade-box"
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
              {animatedPercentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
