"use client";

import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import DashboardHeader from "../components/DashboardHeader";
import CardProfileSummary from "../components/CardProfileSummary";
import SidebarMenu from "../components/SidebarMenu";
import CardPracticeQuestions from "../components/CardPracticeQuestions";
import LeaderboardMain from "../components/LeaderboardMain";
import CardMockTests from "../components/CardMockTests";
import CardLessons from "../components/CardLessons";
import React, { useState, useEffect } from "react";

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [activeView, setActiveView] = React.useState("Lesson");
  const [userXP, setUserXP] = useState(0);

  useEffect(() => {
    async function fetchUserXP() {
      try {
        const response = await fetch("/api/user/xp");
        if (response.ok) {
          const data = await response.json();
          setUserXP(data.xp);
        }
      } catch (error) {
        console.error("Failed to fetch user XP:", error);
      }
    }

    if (isSignedIn) {
      fetchUserXP();
    }
  }, [isSignedIn]);

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
        xp={userXP}
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
          ) : activeView === "Test" ? (
            <CardMockTests />
          ) : activeView === "Practice" ? (
            <CardPracticeQuestions />
          ) : (
            <CardLessons />
          )}
        </div>
      </div>
    </div>
  );
}
