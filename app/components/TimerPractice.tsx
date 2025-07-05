import React, { useEffect, useRef, useState } from "react";

interface TimerPracticeProps {
  duration: number; // in seconds
  onComplete?: () => void;
}

function pad(num: number) {
  return num.toString().padStart(2, "0");
}

export default function TimerPractice({
  duration,
  onComplete,
}: TimerPracticeProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      if (onComplete) onComplete();
      setRunning(false);
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, running, onComplete]);

  // Circle math (smaller)
  const radius = 16;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = Math.max(0, timeLeft) / duration;
  const offset = circumference * (1 - progress);

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${pad(minutes)}:${pad(seconds)}`;

  // Click handler
  function handleClick() {
    if (timeLeft <= 0) return;
    setRunning((r) => !r);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center space-x-2 cursor-pointer group bg-transparent p-0 border-none focus:outline-none"
      aria-label={running ? "Pause timer" : "Start timer"}
      tabIndex={0}
    >
      <svg
        width={36}
        height={36}
        className="transition-opacity duration-150 group-hover:opacity-80"
        style={{ display: "block", transform: "rotate(-90deg)" }}
      >
        <circle
          cx={18}
          cy={18}
          r={normalizedRadius}
          fill="#f3f4f6" // Tailwind bg-gray-100
        />
        <circle
          cx={18}
          cy={18}
          r={normalizedRadius}
          fill="none"
          stroke="var(--color-primary, #1D5554)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <span className="text-lg font-extrabold text-[#1D5554] tracking-tighter tabular-nums select-none">
        {timeString}
      </span>
    </button>
  );
}
