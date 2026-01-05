import { ArrowLeft, ExternalLink, CheckSquare, Square } from "lucide-react";
import { Button } from "./ui/Button";
import { useState } from "react";

export type Course = {
  id: string;
  title: string;
  issuer: string;
  status: "Completed" | "In Progress" | "Planned";
  date?: string;
  skills: string[];
  image?: string;
  roadmap: { id: string; label: string; isCompleted: boolean }[];
};

type Props = {
  course: Course;
  onBack: () => void;
};

export function CourseDetailView({ course, onBack }: Props) {
  const [roadmap, setRoadmap] = useState(course.roadmap);

  const toggleStep = (id: string) => {
    setRoadmap((prev) =>
      prev.map((step) =>
        step.id === id ? { ...step, isCompleted: !step.isCompleted } : step
      )
    );
  };

  const completedCount = roadmap.filter((s) => s.isCompleted).length;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-black uppercase text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft size={14} /> Back to Path
        </button>
        <button className="text-xs font-black uppercase underline decoration-2 underline-offset-4 text-gray-500 hover:text-black decoration-gray-300 hover:decoration-brand-lime transition-all">
          Edit Details
        </button>
      </div>

      <div className="border-2 border-black bg-white p-8 md:p-12 relative shadow-[8px_8px_0_0_#000]">
        <div className="flex flex-col gap-8 mb-12 border-b-2 border-black pb-8">
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 text-[10px] font-black uppercase border-2 border-black ${
                course.status === 'Completed' ? 'bg-brand-lime' : 'bg-gray-200'
              }`}>
                {course.status}
              </span>
              <span className="text-xs font-bold text-gray-500">{course.date}</span>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-header font-black uppercase tracking-tight leading-[0.9]">
                {course.title}
              </h1>
              <p className="text-lg font-bold text-gray-500 uppercase tracking-widest">
                {course.issuer}
              </p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <span className="font-black text-xs uppercase">Roadmap & Milestones</span>
              <span className="font-black text-xs uppercase">{completedCount}/{roadmap.length} Done</span>
            </div>

            <div className="flex flex-col gap-4">
              {roadmap.map((step) => (
                <div
                  key={step.id}
                  onClick={() => toggleStep(step.id)}
                  className={`group flex items-center gap-4 p-4 border-2 border-black cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] ${
                    step.isCompleted ? "bg-brand-lime" : "bg-brand-bg"
                  }`}
                >
                  {step.isCompleted ? (
                    <CheckSquare size={24} className="stroke-2" />
                  ) : (
                    <Square size={24} className="stroke-2" />
                  )}
                  <span className={`font-bold text-sm uppercase ${step.isCompleted ? "line-through" : ""}`}>
                    {step.label}
                  </span>
                </div>
              ))}

              <div className="flex border-2 border-black mt-2 bg-white">
                <input 
                  type="text" 
                  placeholder="DEFINE NEXT STEP..." 
                  className="flex-1 px-4 py-3 outline-none text-sm font-bold uppercase placeholder:text-gray-400 bg-transparent"
                />
                <button className="bg-black text-brand-lime px-6 font-black text-xs uppercase hover:bg-brand-lime hover:text-black transition-colors">
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="border-2 border-black bg-brand-bg p-6 flex flex-col gap-4">
              <span className="font-black text-[10px] uppercase text-gray-500">Stack & Skills</span>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill) => (
                  <span key={skill} className="bg-black text-white border-2 border-black text-[10px] font-bold px-2 py-1 uppercase">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-black text-[10px] uppercase text-gray-500">External Verification</span>
              <Button 
                variant="secondary"
                className="w-full flex justify-center gap-2 items-center shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                 Open Credential URL <ExternalLink size={14}/>
              </Button>
              <button className="w-full border-2 border-red-500 text-red-500 py-3 font-black text-[10px] uppercase hover:bg-red-500 hover:text-white transition-colors">
                Delete Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}