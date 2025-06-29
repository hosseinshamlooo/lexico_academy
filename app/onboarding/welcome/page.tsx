"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingContinueButton from "@/app/components/OnboardingContinueButton";
import { FaUserFriends } from "react-icons/fa";
import { FaTv } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { MdArticle } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";

const options = [
  {
    label: "Friends/Family",
    value: "friends-family",
    icon: <FaUserFriends className="w-6 h-6" />,
  },
  { label: "TV", value: "tv", icon: <FaTv className="w-6 h-6" /> },
  {
    label: "YouTube",
    value: "youtube",
    icon: <FaYoutube className="w-6 h-6" />,
  },
  {
    label: "Instagram/Facebook",
    value: "instagram-facebook",
    icon: <AiFillInstagram className="w-6 h-6" />,
  },
  {
    label: "Google Search",
    value: "google-search",
    icon: <FaGoogle className="w-6 h-6" />,
  },
  { label: "TikTok", value: "tiktok", icon: <FaTiktok className="w-6 h-6" /> },
  {
    label: "News, Articles, Blogs",
    value: "news-articles-blogs",
    icon: <MdArticle className="w-6 h-6" />,
  },
  { label: "Other", value: "other", icon: <IoSparkles className="w-6 h-6" /> },
];

export default function PageWelcomeOnboarding() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selected) {
      // TODO: Save the selected value to state management or API
      router.push("/onboarding/motivation");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col items-center w-full max-w-xl mx-auto px-4 py-8 flex-1">
        <div className="w-full bg-white p-8 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1D5554] text-center tracking-tight whitespace-nowrap">
            Welcome to Lexico Academy!
          </h1>
          <p className="text-3xl text-gray-600 mb-4 mt-8 text-center font-bold tracking-tighter">
            Let&apos;s tailor your IELTS journey.
          </p>
          <div className="w-full mb-6">
            <div className="text-2xl md:text-2xl font-bold tracking-tight text-gray-800 mb-8 text-center">
              How did you hear about Lexico?
            </div>
            <div className="grid grid-cols-2 gap-x-60 gap-y-6 w-full max-w-4xl mx-auto justify-items-center">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelected(opt.value)}
                  className={`relative rounded-3xl p-6 w-[340px] transition-all duration-300 border shadow-md flex items-center gap-3 group focus:outline-none
                    ${
                      selected === opt.value
                        ? "bg-[#1D5554] border-[#1D5554] text-white scale-105 shadow-2xl -translate-y-2"
                        : "bg-white border-gray-200 text-gray-700 hover:-translate-y-2 hover:shadow-2xl hover:bg-[#1D5554] hover:border-[#1D5554] hover:text-white"
                    }
                  `}
                  aria-pressed={selected === opt.value}
                >
                  <span
                    className={`transition-all duration-300 ${
                      selected === opt.value
                        ? "text-white"
                        : "text-gray-600 group-hover:text-white"
                    }`}
                  >
                    {opt.icon}
                  </span>
                  <span className="flex-1 text-left break-words font-bold text-xl">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <OnboardingContinueButton
            onClick={handleContinue}
            disabled={!selected}
          >
            Continue
          </OnboardingContinueButton>
        </div>
      </main>
    </div>
  );
}
