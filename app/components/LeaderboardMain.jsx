import React from "react";
import { FaMedal, FaShield, FaLock, FaCircleArrowUp, FaCircleArrowDown } from "react-icons/fa6";
import { PiKeyholeFill } from "react-icons/pi";

const dummyLeaderboard = {
  league: "Ruby League",
  badges: [
    { color: "silver", filled: true },
    { color: "gold", filled: true },
    { color: "blue", filled: true },
    { color: "red", filled: true },
    { color: "gray", filled: false },
    { color: "gray", filled: false },
    { color: "gray", filled: false },
  ],
  timer: "5 days",
  promotionCount: 5,
  demotionCount: 3,
  users: [
    { rank: 1, name: "teresa", xp: 153, highlight: false },
    { rank: 2, name: "adeeba Fatima", xp: 85, highlight: false },
    { rank: 3, name: "Hossein", xp: 78, highlight: true },
    { rank: 4, name: "ecem^^♥", xp: 75, highlight: false },
    { rank: 5, name: "Алексей", xp: 69, highlight: false },
    { rank: 6, name: "Таня Сафенина", xp: 63, highlight: false },
    { rank: 7, name: "Misheck Kabugi", xp: 62, highlight: false },
    { rank: 8, name: "Ельжан Базарбаев", xp: 62, highlight: false },
    { rank: 11, name: "sara", xp: 58, highlight: false },
    { rank: 12, name: "Ами5а", xp: 48, highlight: false },
    { rank: 13, name: "Maria", xp: 43, highlight: false },
    { rank: 14, name: "subham", xp: 38, highlight: false },
    { rank: 15, name: "Zeynep Ferhan ünalır", xp: 36, highlight: false },
    { rank: 16, name: "Hasibul Hasan", xp: 29, highlight: false },
    { rank: 17, name: "regina phalange", xp: 25, highlight: false },
    { rank: 18, name: "Mahmood", xp: 25, highlight: false },
  ],
};

function LeagueBadges({ badges }) {
  // Index 3 is the current league (Ruby)
  return (
    <div className="flex gap-10 mb-2 justify-center items-end">
      {badges.map((b, i) => {
        // Color mapping for shields
        let color = "text-gray-300";
        if (b.filled) {
          if (b.color === "silver") color = "text-gray-400";
          else if (b.color === "gold") color = "text-yellow-400";
          else if (b.color === "blue") color = "text-blue-400";
          else if (b.color === "red") color = "text-red-400";
        }
        // Current league is index 3 (Ruby)
        const isCurrent = i === 3;
        return (
          <span
            key={i}
            className={`relative flex items-center justify-center ${isCurrent ? "text-4xl" : "text-3xl"} ${color}`}
            style={{ minWidth: isCurrent ? 44 : 36, minHeight: isCurrent ? 44 : 36 }}
          >
            <FaShield className={`${isCurrent ? "text-7xl" : "text-6xl"}`} />
            {!b.filled && (
              <PiKeyholeFill className="absolute text-gray-500 text-2xl" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
            )}
          </span>
        );
      })}
    </div>
  );
}

function LeaderboardRow({ user }) {
  // Medal colors for top 3
  const medalColors = [
    "text-yellow-400 drop-shadow-sm", // gold
    "text-gray-400 drop-shadow-sm",   // silver
    "text-orange-500 drop-shadow-sm", // bronze
  ];

  // Remove highlight logic
  let rowClass = "transition-all hover:bg-[#1D5554]/5 cursor-pointer";
  return (
    <tr className={rowClass}>
      <td className="py-3 px-4 text-center w-12">
        {user.rank <= 3 ? (
          <FaMedal className={`mx-auto text-3xl ${medalColors[user.rank - 1]}`} />
        ) : (
          <span className="text-lg text-[#1D5554] font-bold">{user.rank}</span>
        )}
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-2xl font-bold uppercase">
            {user.name.charAt(0)}
          </span>
          <span className="truncate max-w-[180px] font-bold text-lg">{user.name}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-right font-light text-lg w-24 whitespace-nowrap">{user.xp} XP</td>
    </tr>
  );
}

function PromotionZoneRow() {
  return (
    <tr>
      <td colSpan={3} className="py-2 px-4 text-center">
        <span className="text-green-600 font-bold flex items-center justify-center gap-2 text-lg">
          <FaCircleArrowUp className="text-green-500 text-2xl" />
          <span className="mx-2">PROMOTION ZONE</span>
          <FaCircleArrowUp className="text-green-500 text-2xl" />
        </span>
      </td>
    </tr>
  );
}

function DemotionZoneRow() {
  return (
    <tr>
      <td colSpan={3} className="py-2 px-4 text-center">
        <span className="text-red-600 font-bold flex items-center justify-center gap-2 text-lg">
          <FaCircleArrowDown className="text-red-500 text-2xl" />
          <span className="mx-2">DEMOTION ZONE</span>
          <FaCircleArrowDown className="text-red-500 text-2xl" />
        </span>
      </td>
    </tr>
  );
}

export default function LeaderboardMain() {
  const { league, badges, timer, promotionCount, users } = dummyLeaderboard;
  return (
    <div className="flex justify-center items-start w-full min-h-[1000px]">
      <div
        className="bg-white rounded-2xl p-10 w-full mr-10 flex flex-col items-center"
        style={{ maxWidth: "1800px" }}
      >
        <LeagueBadges badges={badges} />
        <h1 className="text-4xl font-extrabold text-[#1D5554] mb-2 mt-2 tracking-tighter">{league}</h1>
        <div className="text-yellow-600 font-normal text-xl mb-2">Top {promotionCount} advance to the next league</div>
        <div className="text-gray-500 text-xl font-bold mb-4">{timer}</div>
        <hr className="border-t-4 border-[#1D5554] opacity-10 w-full mb-4" />
        <div className="w-full" style={{ maxWidth: "1800px" }}>
          <div className="overflow-y-auto rounded-lg scrollbar-hide" style={{ maxHeight: 900 }}>
            <table className="min-w-full mx-auto divide-y divide-gray-200" style={{ maxWidth: "1800px" }}>
              <tbody>
                {users.map((user, idx) => (
                  <React.Fragment key={user.rank}>
                    {idx === 5 && <PromotionZoneRow />}
                    {idx === 14 && <DemotionZoneRow />}
                    <LeaderboardRow user={user} />
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 