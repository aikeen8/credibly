import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import { AddGoalModal } from "../components/AddGoalModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Clock,
  CheckCircle,
  Loader,
  Calendar,
  Sparkles,
  Plus,
  ExternalLink,
} from "lucide-react";
import { API_URL } from "../config";

type Goal = {
  _id: string;
  title: string;
  status: "Completed" | "In Progress" | "Planned";
  date: string;
  skills?: string[];
  roadmap?: { isCompleted: boolean }[];
  isAutomated?: boolean;
};

type Recommendation = {
  title: string;
  url: string;
  reason: string;
};

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/");
        return;
    }

    try {
      const response = await fetch(`${API_URL}/api/goals`, {
        headers: {
            "x-auth-token": token
        }
      });

      if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
          return;
      }

      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/ai/recommend`, { 
            method: 'POST',
            headers: {
                "x-auth-token": token || ""
            }
        });
        const data = await res.json();
        
        if (data.title) {
            setRecommendation(data);
        } else {
            alert("AI couldn't find a recommendation right now.");
        }
    } catch (error) {
        console.error(error);
        alert("Server error.");
    } finally {
        setIsAnalyzing(false);
    }
  };

  // FIX: Purely check isAutomated
  const manualGoals = goals.filter(g => !g.isAutomated);
  
  const completedCount = goals.filter((g) => g.status === "Completed").length;
  const inProgressCount = goals.filter((g) => g.status === "In Progress").length;
  const plannedCount = goals.filter((g) => g.status === "Planned").length;
  const totalGoals = goals.length;
  const completionRate = totalGoals === 0 ? 0 : Math.round((completedCount / totalGoals) * 100);

  const uniqueSkills = new Set<string>();
  goals.forEach(g => g.skills?.forEach(s => uniqueSkills.add(s.toLowerCase().trim())));
  const totalStepsCompleted = goals.reduce((acc, g) => acc + (g.roadmap?.filter(r => r.isCompleted).length || 0), 0);
  const hasLongRoadmap = goals.some(g => (g.roadmap?.length || 0) >= 5);

  let badgesEarned = 0;
  if (manualGoals.length >= 1) badgesEarned++;
  if (completedCount >= 3) badgesEarned++;
  if (uniqueSkills.size >= 10) badgesEarned++;
  if (totalStepsCompleted >= 5) badgesEarned++;
  if (hasLongRoadmap) badgesEarned++;
  if (manualGoals.length >= 7) badgesEarned++;
  if (completedCount >= 1) badgesEarned++;
  if (completedCount >= 5) badgesEarned++;

  const recentActivity = [...goals].reverse().slice(0, 3);

  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="flex items-start justify-between border-b-2 border-black pb-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-header text-3xl uppercase tracking-tight font-black">
            Dashboard
          </h2>
          <p className="text-sm text-gray-600 max-w-md">
            Track your skill progress in one place.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <div className="flex items-center gap-2">
             <Plus size={16} /> Log New Goal
          </div>
        </Button>
      </div>

      <Card className="shadow-none">
        <CardHeader>Completion Index</CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-6 border-2 border-black bg-white relative">
              <div 
                className="h-full bg-brand-lime border-r-2 border-black transition-all duration-1000" 
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <span className="font-black text-lg">{completionRate}%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <StatTile
              icon={<CheckCircle size={18} />}
              label="Completed"
              value={completedCount.toString()}
            />
            <StatTile
              icon={<Loader size={18} />}
              label="In Progress"
              value={inProgressCount.toString()}
            />
            <StatTile
              icon={<Calendar size={18} />}
              label="Planned"
              value={plannedCount.toString()}
            />
            <StatTile
              icon={<Trophy size={18} />}
              label="Badges Earned"
              value={badgesEarned.toString()} 
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <div className="lg:col-span-2 flex flex-col">
          <Card className="h-full flex flex-col shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <span>Recent Activity</span>
                <button 
                  onClick={() => navigate("/pathways")}
                  className="text-xs underline text-gray-600 hover:text-black"
                >
                  View details
                </button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              <div className="flex flex-col gap-4">
                {isLoading ? (
                    <div className="text-xs font-bold uppercase text-gray-400">Loading activity...</div>
                ) : recentActivity.length === 0 ? (
                    <div className="text-xs font-bold uppercase text-gray-400">No activity yet. Log a goal to start!</div>
                ) : (
                    recentActivity.map((goal) => (
                        <ActivityItem
                            key={goal._id}
                            title={goal.title}
                            status={goal.status}
                            date={goal.date}
                        />
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col">
          <Card className="h-full flex flex-col border-black overflow-hidden shadow-none p-0">
            <CardHeader className="border-b-2 border-black z-10 bg-white relative">
              AI Recommendations
            </CardHeader>
            
            <CardContent className="flex-1 bg-brand-lime p-6 flex flex-col justify-center transition-all">
              <div className="bg-white border-2 border-black p-5 flex flex-col gap-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)]">
                
                {!recommendation ? (
                    <>
                        <Sparkles size={24} className="text-black fill-brand-lime" />
                        <p className="text-sm font-medium leading-relaxed">
                            {isAnalyzing 
                                ? "Analyzing your skills and searching for the best course..." 
                                : "Let AI analyze your skills and suggest what you should pursue next."}
                        </p>
                        <Button onClick={(e) => handleAnalyze(e)} disabled={isAnalyzing}>
                            {isAnalyzing ? "Searching..." : "Analyze my profile"}
                        </Button>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between items-start">
                             <Sparkles size={24} className="text-black fill-brand-lime" />
                             <button onClick={() => setRecommendation(null)} className="text-[10px] font-black underline uppercase text-gray-500 hover:text-red-500">Reset</button>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase text-gray-500">Recommended for you:</span>
                            <h4 className="font-header text-xl uppercase leading-tight font-black">{recommendation.title}</h4>
                        </div>
                        
                        <p className="text-xs text-gray-600 leading-snug">
                            {recommendation.reason}
                        </p>

                        <Button 
                            onClick={() => window.open(recommendation.url, '_blank')} 
                            className="w-full flex items-center justify-center gap-2"
                        >
                            View Course <ExternalLink size={14} />
                        </Button>
                    </>
                )}

              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddGoalModal 
        isOpen={isModalOpen} 
        onClose={() => {
            setIsModalOpen(false);
            fetchGoals();
        }} 
       />
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="group border-2 border-black p-4 flex flex-col gap-2 bg-white transition-all hover:bg-brand-lime hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1 cursor-default">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[10px] uppercase font-black">{label}</span>
      </div>
      <span className="text-3xl font-medium">{value}</span>
    </div>
  );
}

function ActivityItem({
  title,
  status,
  date,
}: {
  title: string;
  status: "Completed" | "In Progress" | "Planned";
  date?: string;
}) {
  const statusStyles =
    status === "Completed"
      ? "bg-brand-lime"
      : status === "In Progress"
      ? "bg-gray-200"
      : "bg-white";

  return (
    <div className="flex items-center justify-between gap-4 p-4 border-2 border-black bg-white">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white border-2 border-black shadow-[3px_3px_0_0_#000] rotate-[-3deg] flex items-center justify-center shrink-0">
          <Clock size={16} />
        </div>

        <div className="flex flex-col">
          <span className="font-black text-sm uppercase tracking-tight line-clamp-1">{title}</span>
          {status === "Completed" && date && (
            <span className="text-[10px] font-bold text-gray-500">{date}</span>
          )}
        </div>
      </div>

      <span
        className={`text-[10px] font-black px-3 py-1 border-2 border-black uppercase whitespace-nowrap ${statusStyles}`}
      >
        {status}
      </span>
    </div>
  );
}