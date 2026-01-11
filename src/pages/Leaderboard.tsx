import { useState, useEffect } from "react";
import { User as UserIcon, Medal, Crown, Star } from "lucide-react";
import { API_URL } from "../config";
import { useUser } from "../context/UserContext";

type LeaderboardEntry = {
  _id: string;
  username: string;
  role: string;
  avatar: string;
  points: number;
};

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user: currentUser } = useUser();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${API_URL}/api/leaderboard`, {
          headers: { "x-auth-token": token },
        });
        if (res.ok) {
          const data = await res.json();
          setLeaders(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="flex flex-col gap-2 border-b-2 border-black pb-6">
        <h2 className="font-header text-3xl uppercase tracking-tight font-black">
          Community Leaderboard
        </h2>
        <p className="text-sm text-gray-600 max-w-md">
          See who's leading the movement. Compete for the top spot by completing manual goals.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="text-center font-bold text-gray-400 uppercase py-10">Loading rankings...</div>
        ) : leaders.length === 0 ? (
          <div className="text-center font-bold text-gray-400 uppercase py-10">
            No active achievers yet. Be the first!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {leaders.map((leader, index) => (
              <LeaderboardCard 
                key={leader._id} 
                leader={leader} 
                rank={index + 1} 
                isMe={currentUser.username === leader.username}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LeaderboardCard({ leader, rank, isMe }: { leader: LeaderboardEntry; rank: number; isMe: boolean }) {
  let rankIcon = <span className="font-black text-xl w-8 text-center">{rank}</span>;
  let borderClass = "border-black";
  let bgClass = "bg-white";

  if (rank === 1) {
    rankIcon = <Crown size={32} className="text-black fill-[#bef264]" />;
    bgClass = "bg-[#bef264]";
  } else if (rank === 2) {
    rankIcon = <Medal size={28} className="text-gray-500" />;
  } else if (rank === 3) {
    rankIcon = <Medal size={28} className="text-orange-700" />;
  }

  if (isMe) {
    borderClass = "border-black ring-4 ring-black/20";
  }

  return (
    <div className={`flex items-center gap-4 p-4 border-2 ${borderClass} ${bgClass} transition-transform hover:-translate-y-1 shadow-[4px_4px_0_0_#000]`}>
      
      <div className="flex items-center justify-center w-12 shrink-0">
        {rankIcon}
      </div>

      <div className="w-12 h-12 border-2 border-black shrink-0 overflow-hidden bg-gray-100 flex items-center justify-center">
        {leader.avatar ? (
            <img src={leader.avatar} alt={leader.username} className="w-full h-full object-cover" />
        ) : (
            <UserIcon size={24} className="text-gray-400" />
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2">
            <span className="font-header font-black uppercase text-lg leading-none">
                {leader.username}
            </span>
            {isMe && (
                <span className="text-[9px] font-bold bg-black text-white px-2 py-0.5 uppercase">You</span>
            )}
        </div>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
            {leader.role || "Achiever"}
        </span>
      </div>

      <div className="flex flex-col items-end px-4">
        <span className="font-header font-black text-2xl leading-none">{leader.points}</span>
        <span className="text-[9px] font-bold uppercase text-gray-500">Goals</span>
      </div>

    </div>
  );
}