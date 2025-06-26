"use client";

import { useUser, RedirectToSignIn, UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;
  if (!isSignedIn) return <RedirectToSignIn />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyan-100/70 relative">
      <div className="absolute top-6 right-6">
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-10 border-2 border-cyan-200 max-w-lg w-full text-center">
        <h1 className="text-3xl font-extrabold text-[#1D5554] mb-4">
          Welcome, {user?.firstName || user?.username || "User"}!
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          This is your dashboard. You are signed in.
        </p>
        <div className="mt-6">
          <span className="block text-gray-400 text-sm">Email:</span>
          <span className="block text-[#1D5554] font-bold">
            {user?.emailAddresses?.[0]?.emailAddress}
          </span>
        </div>
      </div>
    </div>
  );
}
