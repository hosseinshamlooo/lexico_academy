import React from "react";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { FaNoteSticky, FaMedal, FaComments } from "react-icons/fa6";

const mainMenuItems = [
  {
    label: "Practice",
    icon: <FaHome className="text-2xl" />,
    active: true,
  },
  {
    label: "Test",
    icon: <FaNoteSticky className="text-2xl" />,
  },
  {
    label: "Leaderboards",
    icon: <FaMedal className="text-2xl" />,
  },
  {
    label: "Profile",
    icon: <FaUser className="text-2xl" />,
  },
];

const bottomMenuItems = [
  {
    label: "Settings",
    icon: <FaCog className="text-2xl" />,
  },
  {
    label: "Feedback",
    icon: <FaComments className="text-2xl" />,
  },
];

export default function SidebarMenu() {
  return (
    <aside className="h-full min-h-screen w-64 bg-white flex flex-col py-8 px-4 text-[#1D5554] border-r border-gray-100 ml-44">
      {/* Main Menu */}
      <nav className="flex flex-col gap-2 mt-4">
        {mainMenuItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-bold transition-all duration-150
              ${
                item.active
                  ? "bg-cyan-100 border-2 border-cyan-400 text-cyan-900 shadow"
                  : "hover:bg-cyan-50 hover:text-cyan-900"
              }
            `}
          >
            {item.icon}
            <span className="tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Menu - Settings and Feedback */}
      <nav className="flex flex-col gap-2 mt-90 pt-8">
        {bottomMenuItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-bold transition-all duration-150
              hover:bg-cyan-50 hover:text-cyan-900
            `}
          >
            {item.icon}
            <span className="tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
