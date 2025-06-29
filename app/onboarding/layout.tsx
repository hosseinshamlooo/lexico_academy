"use client";

import DashboardHeader from "@/app/components/DashboardHeader";
import ProgressBarOnboarding from "@/app/components/ProgressBarOnboarding";
import { usePathname } from "next/navigation";

const stepMap: Record<string, number> = {
  welcome: 1,
  motivation: 2,
  skill: 3,
  testing: 4,
  plan: 5,
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Get the last segment after /onboarding/
  const segment = pathname.split("/")[2] || "welcome";
  const step = stepMap[segment] || 1;

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <ProgressBarOnboarding
        step={step}
        total={5}
        forceZeroStart={step === 1}
      />
      {children}
    </div>
  );
}
