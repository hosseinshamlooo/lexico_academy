import React from "react";

export default function OnboardingContinueButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[450px] h-[60px] mt-4 btn-lifted-green rounded-xl py-6 text-2xl font-bold transition-all duration-200 mx-auto ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      <span className="text-xl">{children}</span>
    </button>
  );
}
