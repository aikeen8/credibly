import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, BookOpen, GraduationCap, Lightbulb, Zap, Target, Map, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const BADGE_DEFINITIONS = [
  { id: 1, title: "First Steps", desc: "Log your first planned credential in the system.", icon: <BookOpen size={32} /> },
  { id: 2, title: "Elite Scholar", desc: "Successfully complete 3 academic certifications.", icon: <GraduationCap size={32} /> },
  { id: 3, title: "Versatile Mind", desc: "Accumulate at least 10 distinct technical skills.", icon: <Lightbulb size={32} /> },
  { id: 4, title: "Momentum Master", desc: "Finish 5 manual tasks or prep steps.", icon: <Zap size={32} /> },
  { id: 5, title: "Pathfinder", desc: "Create a roadmap with at least 5 milestones.", icon: <Map size={32} /> },
  { id: 6, title: "Consistency King", desc: "Log at least 7 goals in the system.", icon: <Target size={32} /> },
  { id: 7, title: "Knowledge Seeker", desc: "Complete your first course.", icon: <Award size={32} /> },
  { id: 8, title: "Goal Crusher", desc: "Accumulate 5 completed goals.", icon: <Zap size={32} /> },
];

type Goal = {
  _id: string;
  title: string;
  status: string;
  skills: string[];
  roadmap: { isCompleted: boolean }[];
  isAutomated?: boolean;
};

export default function Rewards() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [goals, setGoals] = useState<Goal[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchRewardsData = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch(`${API_URL}/api/goals`, {
                headers: { "x-auth-token": token }
            });
            if (res.ok) {
                const data = await res.json();
                setGoals(data);
            }
        } catch (err) {
            console.error(err);
        }
    };
    fetchRewardsData();
  }, [navigate]);

  // FIX: Purely check isAutomated. Old data needs to be deleted manually.
  const manualGoals = goals.filter(g => !g.isAutomated);
  
  const completedGoals = goals.filter(g => g.status === "Completed").length;
  
  const uniqueSkills = new Set<string>();
  goals.forEach(g => g.skills?.forEach(s => uniqueSkills.add(s.toLowerCase().trim())));
  
  const totalStepsCompleted = goals.reduce((acc, g) => acc + (g.roadmap?.filter(r => r.isCompleted).length || 0), 0);
  const hasLongRoadmap = goals.some(g => (g.roadmap?.length || 0) >= 5);

  const badges = BADGE_DEFINITIONS.map(badge => {
    let earned = false;
    switch(badge.id) {
        case 1: earned = manualGoals.length >= 1; break; 
        case 2: earned = completedGoals >= 3; break;
        case 3: earned = uniqueSkills.size >= 10; break;
        case 4: earned = totalStepsCompleted >= 5; break;
        case 5: earned = hasLongRoadmap; break;
        case 6: earned = manualGoals.length >= 7; break;
        case 7: earned = completedGoals >= 1; break;
        case 8: earned = completedGoals >= 5; break;
        default: earned = false;
    }
    return { ...badge, earned };
  });

  const earnedCount = badges.filter(b => b.earned).length;
  const progressPercent = Math.round((earnedCount / badges.length) * 100);

  const nextSlide = () => setSlideIndex(1);
  const prevSlide = () => setSlideIndex(0);

  return (
    <div className="flex flex-col min-h-full gap-10 pb-10">
      
      <div className="shrink-0">
        <div className="flex items-end justify-between border-b-2 border-black pb-6 mb-8">
            <div className="flex flex-col gap-2">
                <h2 className="font-header text-3xl uppercase tracking-tight font-black">
                    Rewards
                </h2>
                <p className="text-sm text-gray-600 max-w-md">
                    Collect digital proof of your mastery and track your experience points.
                </p>
            </div>
            <div className="font-header font-black uppercase text-xl text-black">
                Badges Earned: {earnedCount}/{badges.length}
            </div>
        </div>

        <div className="flex items-center justify-between mb-4">
             <h3 className="font-header font-black uppercase text-xl">
                Badge Collection
            </h3>
            <div className="flex gap-2">
                <button 
                    onClick={prevSlide}
                    disabled={slideIndex === 0}
                    className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-brand-lime disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ChevronLeft size={20} strokeWidth={3} />
                </button>
                <button 
                    onClick={nextSlide}
                    disabled={slideIndex === 1}
                    className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-brand-lime disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ChevronRight size={20} strokeWidth={3} />
                </button>
            </div>
        </div>

        <div className="relative overflow-hidden py-8 -my-8 px-2 -mx-2"> 
            <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${slideIndex * 50}%)`, width: '200%' }}
            >
                <div className="w-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pr-6 pl-1">
                    {badges.slice(0, 4).map(badge => <BadgeCard key={badge.id} badge={badge} />)}
                </div>
                
                <div className="w-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pr-6 pl-1">
                    {badges.slice(4, 8).map(badge => <BadgeCard key={badge.id} badge={badge} />)}
                </div>
            </div>
        </div>
      </div>

      <div className="mt-auto bg-black text-white border-4 border-brand-lime p-8 md:p-10 shadow-[8px_8px_0_0_#000]">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            
            <div className="flex flex-col gap-4 max-w-2xl">
                <h3 className="font-header italic font-black text-2xl md:text-3xl uppercase tracking-tighter leading-none">
                    Consistency is your greatest asset
                </h3>
                <p className="text-brand-lime font-bold text-[10px] md:text-xs uppercase tracking-wide leading-relaxed">
                    You have successfully cleared {progressPercent}% of the current milestone rewards. Continue logging your academic progress to reveal hidden achievements and system optimizations.
                </p>
            </div>

            <div className="w-full md:w-64 flex flex-col gap-2 shrink-0">
                <div className="flex justify-between items-end text-[9px] font-bold uppercase tracking-widest text-white">
                    <span>Progress</span>
                    <span className="text-brand-lime">{progressPercent}%</span>
                </div>
                <div className="h-3 w-full bg-gray-800">
                    <div 
                        className="h-full bg-brand-lime shadow-[0_0_10px_rgba(197,255,85,0.5)] transition-all duration-1000"
                        style={{ width: `${progressPercent}%` }} 
                    />
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

function BadgeCard({ badge }: { badge: any }) {
  return (
    <div className={`
      group relative border-2 border-black bg-white p-6 flex flex-col items-center text-center gap-6 h-96 justify-center
      transition-all duration-300
      ${badge.earned ? 'hover:-translate-y-2 hover:rotate-1 hover:shadow-[8px_8px_0_0_#000] z-0 hover:z-10' : 'opacity-70 grayscale'} 
    `}>
        
        <div className={`
            relative w-24 h-24 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110
            ${badge.earned ? 'bg-brand-lime border-2 border-black' : 'bg-gray-100 border-2 border-gray-300'}
        `}>
            {badge.earned && <div className="absolute -top-2 -right-2 bg-black text-brand-lime text-[10px] font-black px-1 py-0.5 z-10">!</div>}
            <div className={badge.earned ? "text-black" : "text-gray-400"}>{badge.icon}</div>
        </div>

        <div className="flex flex-col gap-3">
            <h4 className={`font-header font-black uppercase text-xl leading-none ${badge.earned ? 'text-black' : 'text-gray-400'}`}>
                {badge.title}
            </h4>
            <p className={`text-[10px] font-bold uppercase tracking-wide leading-relaxed ${badge.earned ? 'text-gray-500' : 'text-gray-300'}`}>
                {badge.desc}
            </p>
        </div>

        {!badge.earned && (
            <div className="mt-4 text-[9px] font-black uppercase text-gray-300 tracking-widest border border-gray-300 px-3 py-1">
                Locked
            </div>
        )}
        
        {badge.earned && (
             <button className="mt-4 bg-black text-white text-[9px] font-black uppercase px-4 py-2 hover:bg-brand-lime hover:text-black transition-colors">
                Unlocked
             </button>
        )}
    </div>
  );
}