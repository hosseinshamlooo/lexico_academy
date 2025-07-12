import React, { useState, useEffect, useCallback } from "react";
import { FaBoltLightning } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";

interface CorrectionDisplayProps {
  correct: number;
  total: number;
  percentage?: number;
}

// Confetti particle interface
interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  gravity: number;
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

// Confetti hook
function useConfetti() {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  const createConfetti = useCallback(() => {
    const colors = [
      "#FFD65A", // Gold
      "#3A7C7B", // Primary green
      "#D9F061", // Accent yellow
      "#FF5A5F", // Red
      "#1D5554", // Dark green
      "#E5E7E3", // Light gray
    ];

    const newParticles: ConfettiParticle[] = [];
    const particleCount = 80; // Much more particles for explosive effect

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 200, // Start higher above viewport for more dramatic effect
        vx: (Math.random() - 0.5) * 25, // Much more horizontal spread
        vy: Math.random() * 15 + 5, // Much faster initial velocity
        size: Math.random() * 6 + 3, // Smaller particles (3-9px) for more explosive look
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 30, // Faster rotation
        opacity: 1,
        gravity: 0.4 + Math.random() * 0.3, // Slightly stronger gravity for faster fall
      });
    }

    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;

    const animationFrame = requestAnimationFrame(() => {
      setParticles((prevParticles) =>
        prevParticles
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + particle.gravity,
            rotation: particle.rotation + particle.rotationSpeed,
            opacity: particle.opacity > 0.1 ? particle.opacity - 0.008 : 0, // Faster fade out for more explosive feel
          }))
          .filter(
            (particle) =>
              particle.opacity > 0 && particle.y < window.innerHeight + 100
          )
      );
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [particles]);

  return { particles, createConfetti };
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

  // Confetti system
  const { particles, createConfetti } = useConfetti();

  // Audio effects and confetti trigger - only run once on mount
  useEffect(() => {
    const audio = new Audio("/401542__conarb13__pop-sound.mp3");

    // Play sound and trigger confetti when XP box appears
    const xpTimer = setTimeout(() => {
      audio.play().catch((e) => console.log("Audio play failed:", e));
      createConfetti(); // Trigger confetti explosion
    }, 0);

    // Play sound when grade box appears
    const gradeTimer = setTimeout(() => {
      audio.play().catch((e) => console.log("Audio play failed:", e));
      // Second confetti burst for grade
      setTimeout(() => createConfetti(), 200);
    }, 1000);

    return () => {
      clearTimeout(xpTimer);
      clearTimeout(gradeTimer);
    };
  }, []); // Empty dependency array - only run once on mount

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
    <div className="flex justify-center items-center gap-8 py-4 bg-transparent relative">
      {/* Confetti Canvas */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: "50%",
              transform: `rotate(${particle.rotation}deg)`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size / 2}px ${particle.color}`,
            }}
          />
        ))}
      </div>

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
