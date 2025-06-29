"use client";
import React, { useEffect, useRef, useState } from "react";

export default function ProgressBarOnboarding(props: {
  step: number;
  total: number;
  forceZeroStart?: boolean;
}) {
  const { step, total, forceZeroStart = false } = props;
  const percent = (step / total) * 100;
  const [fill, setFill] = useState(forceZeroStart ? 0 : percent);
  const prevPercent = useRef(forceZeroStart ? 0 : percent);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (forceZeroStart && isFirstRender.current) {
      setFill(0);
      const timeout = setTimeout(() => {
        setFill(percent);
        prevPercent.current = percent;
        isFirstRender.current = false;
      }, 120);
      return () => clearTimeout(timeout);
    } else if (!isFirstRender.current) {
      setFill(prevPercent.current);
      const timeout = setTimeout(() => {
        setFill(percent);
        prevPercent.current = percent;
      }, 120);
      return () => clearTimeout(timeout);
    } else {
      setFill(percent);
      prevPercent.current = percent;
      isFirstRender.current = false;
    }
  }, [step, percent, forceZeroStart]);

  return (
    <div className="w-full">
      <div className="w-[600px] mx-auto h-3 bg-gray-200 rounded-full mt-12">
        <div
          className="h-3 bg-[#1D5554] transition-all duration-[900ms] rounded-full"
          style={{ width: `${fill}%` }}
        />
      </div>
    </div>
  );
}
