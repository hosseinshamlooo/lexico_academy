"use client";

import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import DashboardHeader from "../components/DashboardHeader";
import CardProfileSummary from "../components/CardProfileSummary";
import SidebarMenu from "../components/SidebarMenu";
import CardPracticeQuestions from "../components/CardPracticeQuestions";
import LeaderboardMain from "../components/LeaderboardMain";
import React from "react";

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [activeView, setActiveView] = React.useState("Practice");

  if (!isLoaded) return null;
  if (!isSignedIn) return <RedirectToSignIn />;

  return (
    <div className="min-h-screen">
      {/* Header at the top */}
      <DashboardHeader
        userName={
          user?.username ||
          user?.firstName ||
          user?.emailAddresses?.[0]?.emailAddress
        }
      />
      <CardProfileSummary
        name={user?.firstName || user?.username || "User"}
        username={user?.username || "User"}
        streak={10}
        xp={100}
        level={2}
        skillsUnlocked={3}
        totalSkills={10}
      />
      {/* Flex container for sidebar and main content */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="md:w-1/4">
          <SidebarMenu onSelectView={setActiveView} activeView={activeView} />
        </div>
        <div className="flex-1">
          {activeView === "Leaderboards" ? (
            <LeaderboardMain />
          ) : (
            <CardPracticeQuestions />
          )}
        </div>
      </div>
    </div>
  );
}
