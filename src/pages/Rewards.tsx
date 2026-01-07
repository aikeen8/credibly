import { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen, GraduationCap, Lightbulb, Zap, Target, Map, Award } from "lucide-react";

const BADGES = [
  { id: 1, title: "First Steps", desc: "Log your first planned credential in the system.", icon: <BookOpen size={32} />, earned: true },
  { id: 2, title: "Elite Scholar", desc: "Successfully complete 3 academic certifications.", icon: <GraduationCap size={32} />, earned: true },
  { id: 3, title: "Versatile Mind", desc: "Accumulate at least 10 distinct technical skills.", icon: <Lightbulb size={32} />, earned: true },
  { id: 4, title: "Momentum Master", desc: "Finish 5 manual tasks or prep steps.", icon: <Zap size={32} />, earned: false },
  { id: 5, title: "Pathfinder", desc: "Create a roadmap with at least 5 milestones.", icon: <Map size={32} />, earned: false },
  { id: 6, title: "Consistency King", desc: "Log activity for 7 consecutive days.", icon: <Target size={32} />, earned: false },
  { id: 7, title: "Knowledge Seeker", desc: "Complete a course in under 30 days.", icon: <Award size={32} />, earned: false },
  { id: 8, title: "Goal Crusher", desc: "Mark 3 goals as completed in one month.", icon: <Zap size={32} />, earned: false },
];

export default function Rewards() {
  const [slideIndex, setSlideIndex] = useState(0);
  const earnedCount = BADGES.filter(b => b.earned).length;

  const nextSlide = () => setSlideIndex(1);
  const prevSlide = () => setSlideIndex(0);

  return (
    <div className="flex flex-col min-h-full gap-10 pb-10">
      
      <div className="shrink-0">
        {/* HEADER SECTION */}
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
                Badges Earned: {earnedCount}/{BADGES.length}
            </div>
        </div>

        {/* CAROUSEL CONTROLS & TITLE */}
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

        {/* CAROUSEL BODY */}
        <div className="relative overflow-hidden py-8 -my-8 px-2 -mx-2"> 
            <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${slideIndex * 50}%)`, width: '200%' }}
            >
                <div className="w-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pr-6 pl-1">
                    {BADGES.slice(0, 4).map(badge => <BadgeCard key={badge.id} badge={badge} />)}
                </div>
                
                <div className="w-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pr-6 pl-1">
                    {BADGES.slice(4, 8).map(badge => <BadgeCard key={badge.id} badge={badge} />)}
                </div>
            </div>
        </div>
      </div>

      {/* FOOTER SECTION (CONSISTENCY) */}
      <div className="mt-auto bg-black text-white border-4 border-brand-lime p-8 md:p-10 shadow-[8px_8px_0_0_#000]">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            
            <div className="flex flex-col gap-4 max-w-2xl">
                <h3 className="font-header italic font-black text-2xl md:text-3xl uppercase tracking-tighter leading-none">
                    Consistency is your greatest asset
                </h3>
                <p className="text-brand-lime font-bold text-[10px] md:text-xs uppercase tracking-wide leading-relaxed">
                    You have successfully cleared 25% of the current milestone rewards. Continue logging your academic progress to reveal hidden achievements and system optimizations.
                </p>
            </div>

            <div className="w-full md:w-64 flex flex-col gap-2 shrink-0">
                <div className="flex justify-between items-end text-[9px] font-bold uppercase tracking-widest text-white">
                    <span>Progress</span>
                    <span className="text-brand-lime">25%</span>
                </div>
                <div className="h-3 w-full bg-gray-800">
                    <div className="h-full w-[25%] bg-brand-lime shadow-[0_0_10px_rgba(197,255,85,0.5)]" />
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

function BadgeCard({ badge }: { badge: typeof BADGES[0] }) {
  return (
    <div className={`
      group relative border-2 border-black bg-white p-6 flex flex-col items-center text-center gap-6 h-96 justify-center
      transition-all duration-300
      hover:-translate-y-2 hover:rotate-1 hover:shadow-[8px_8px_0_0_#000] z-0 hover:z-10
      ${!badge.earned ? 'opacity-100' : ''} 
    `}>
        
        <div className={`
            relative w-24 h-24 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110
            ${badge.earned ? 'bg-brand-lime border-2 border-black' : 'bg-gray-100'}
        `}>
            {badge.earned && <div className="absolute -top-2 -right-2 bg-black text-brand-lime text-[10px] font-black px-1 py-0.5 z-10">!</div>}
            {badge.earned ? <div className="text-black">{badge.icon}</div> : <div className="text-gray-300">{badge.icon}</div>}
        </div>

        <div className="flex flex-col gap-3">
            <h4 className={`font-header font-black uppercase text-xl leading-none ${badge.earned ? 'text-black' : 'text-gray-300'}`}>
                {badge.title}
            </h4>
            <p className={`text-[10px] font-bold uppercase tracking-wide leading-relaxed ${badge.earned ? 'text-gray-500' : 'text-gray-200'}`}>
                {badge.desc}
            </p>
        </div>

        {!badge.earned && (
            <div className="mt-4 text-[9px] font-black uppercase text-gray-200 tracking-widest">
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