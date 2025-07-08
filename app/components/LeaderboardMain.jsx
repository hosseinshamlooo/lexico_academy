import React from "react";

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
    { rank: 4, name: "ecem^^♥", xp: 75, highlight: false, badge: "100" },
    { rank: 5, name: "Алексей", xp: 69, highlight: false, avatar: "A" },
    { rank: 6, name: "Таня Сафенина", xp: 63, highlight: false },
    { rank: 7, name: "Misheck Kabugi", xp: 62, highlight: false, avatar: "M" },
    { rank: 8, name: "Ельжан Базарбаев", xp: 62, highlight: false, avatar: "E", sunglasses: true },
    { rank: 11, name: "sara", xp: 58, highlight: false, sunglasses: true },
    { rank: 12, name: "Ами5а", xp: 48, highlight: false },
    { rank: 13, name: "Maria", xp: 43, highlight: false },
    { rank: 14, name: "subham", xp: 38, highlight: false },
    { rank: 15, name: "Zeynep Ferhan ünalır", xp: 36, highlight: false, badge: "100" },
    { rank: 16, name: "Hasibul Hasan", xp: 29, highlight: false, avatar: "H" },
    { rank: 17, name: "regina phalange", xp: 25, highlight: false, avatar: "R", sunglasses: true },
    { rank: 18, name: "Mahmood", xp: 25, highlight: false, avatar: "d", trophy: true },
  ],
};

function LeagueBadges({ badges }) {
  return (
    <div className="flex gap-2 mb-2 justify-center">
      {badges.map((b, i) => (
        <span
          key={i}
          className={`inline-block w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl
            ${b.filled ? (b.color === "red" ? "bg-red-400 border-red-400" : b.color === "blue" ? "bg-blue-400 border-blue-400" : b.color === "gold" ? "bg-yellow-300 border-yellow-300" : b.color === "silver" ? "bg-gray-300 border-gray-300" : "bg-gray-100") : "bg-gray-100"}
          `}
        >
          {b.filled ? "" : ""}
        </span>
      ))}
    </div>
  );
}

function LeaderboardRow({ user, promotionCount, demotionCount, idx }) {
  let rowClass = "";
  if (user.highlight) rowClass = "bg-green-100 text-[#1D5554] font-bold";
  else if (user.rank <= promotionCount) rowClass = "bg-green-50";
  else if (user.rank > user.promotionCount && user.rank > user.users.length - demotionCount) rowClass = "bg-red-50";

  return (
    <tr className={`transition-all ${rowClass}`}>
      <td className="py-2 px-3 text-center font-bold text-lg">{user.rank}</td>
      <td className="py-2 px-3">
        <div className="flex items-center gap-2">
          {/* Avatar or initial */}
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-lg font-bold">
            {user.avatar ? user.avatar : (
              <span role="img" aria-label="avatar">👤</span>
            )}
            {user.sunglasses && <span className="ml-1">🕶️</span>}
            {user.trophy && <span className="ml-1">🏆</span>}
          </span>
          <span>{user.name}</span>
          {user.badge && (
            <span className="ml-1 bg-pink-100 text-pink-700 rounded-full px-2 py-0.5 text-xs font-bold">{user.badge}</span>
          )}
        </div>
      </td>
      <td className="py-2 px-3 text-right font-mono font-bold">{user.xp} XP</td>
    </tr>
  );
}

export default function LeaderboardMain() {
  const { league, badges, timer, promotionCount, demotionCount, users } = dummyLeaderboard;
  return (
    <div className="bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-6 h-full flex flex-col">
      <div className="flex flex-col items-center mb-6">
        <LeagueBadges badges={badges} />
        <h1 className="text-3xl font-bold text-[#1D5554] mb-1">{league}</h1>
        <div className="text-yellow-600 font-semibold text-lg mb-2">Top {promotionCount} advance to the next league</div>
        <div className="text-gray-500 text-sm mb-2">{timer}</div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-3 text-center">#</th>
              <th className="py-2 px-3 text-left">User</th>
              <th className="py-2 px-3 text-right">XP</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <LeaderboardRow
                key={user.rank}
                user={user}
                promotionCount={promotionCount}
                demotionCount={demotionCount}
                idx={idx}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-bold">▲ PROMOTION ZONE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-600 font-bold">▼ DEMOTION ZONE</span>
        </div>
      </div>
    </div>
  );
} 