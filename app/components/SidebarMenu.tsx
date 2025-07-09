import React from "react";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { FaNoteSticky, FaMedal, FaComments, FaDumbbell } from "react-icons/fa6";

const mainMenuItems = [
  {
    label: "Lessons",
    icon: <FaHome className="text-2xl" />,
  },
  {
    label: "Practice",
    icon: <FaDumbbell className="text-2xl" />,
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

interface SidebarMenuProps {
  onSelectView?: (view: string) => void;
  activeView?: string;
}

export default function SidebarMenu({
  onSelectView,
  activeView,
}: SidebarMenuProps) {
  return (
    <aside className="h-full min-h-screen w-64 bg-white flex flex-col py-8 px-4 text-[#1D5554] border-r border-gray-100 ml-44">
      {/* Main Menu */}
      <nav className="flex flex-col gap-2 mt-4">
        {mainMenuItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-bold transition-all duration-200
              ${
                activeView === item.label
                  ? "bg-[#1D5554] text-white shadow-md"
                  : "hover:bg-[#E8F5F5] hover:text-[#1D5554]"
              }
            `}
            onClick={() => onSelectView && onSelectView(item.label)}
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
            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-bold transition-all duration-200
              hover:bg-[#E8F5F5] hover:text-[#1D5554]
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
