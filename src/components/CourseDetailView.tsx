import { ArrowLeft, ExternalLink, CheckSquare, Square, Trash2, Edit2 } from "lucide-react";
import { Button } from "./ui/Button";
import { useState, useEffect } from "react";
import { EditCourseModal } from "./EditCourseModal";
import { useToast } from "../context/ToastContext";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

export type Course = {
  id: string;
  title: string;
  issuer: string;
  status: "Completed" | "In Progress" | "Planned";
  date?: string;
  skills: string[];
  image?: string;
  credentialUrl?: string;
  roadmap: { _id?: string; title: string; isCompleted: boolean }[];
};

type Props = {
  course: Course;
  onBack: () => void;
};

export function CourseDetailView({ course, onBack }: Props) {
  const { toast } = useToast();
  const [roadmap, setRoadmap] = useState(course.roadmap || []);
  const [status, setStatus] = useState(course.status);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newStep, setNewStep] = useState("");

  useEffect(() => {
    setRoadmap(course.roadmap || []);
    setStatus(course.status);
  }, [course]);

  const updateRoadmap = async (updatedRoadmap: typeof roadmap) => {
    setRoadmap(updatedRoadmap);

    const allChecked = updatedRoadmap.length > 0 && updatedRoadmap.every((item) => item.isCompleted);
    let newStatus = status;

    if (allChecked) {
      newStatus = "Completed";
    } else if (status === "Completed" && !allChecked) {
      newStatus = "In Progress";
    }

    setStatus(newStatus);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/goals/${course.id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "x-auth-token": token || "" 
        },
        body: JSON.stringify({ 
          roadmap: updatedRoadmap,
          status: newStatus 
        }),
      });

      if (!response.ok) {
          throw new Error("Failed to save");
      }
    } catch (error) {
      console.error("Failed to sync roadmap", error);
      toast("Failed to save progress", "error");
    }
  };

  const toggleStep = (index: number) => {
    const updated = [...roadmap];
    updated[index] = { 
        ...updated[index], 
        isCompleted: !updated[index].isCompleted 
    };
    updateRoadmap(updated);
  };

  const handleAddStep = () => {
    if (!newStep.trim()) return;
    const updated = [...roadmap, { title: newStep, isCompleted: false }];
    setNewStep("");
    updateRoadmap(updated);
  };

  const handleDeleteStep = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); 
    const updated = roadmap.filter((_, i) => i !== index);
    updateRoadmap(updated);
  };

  const completedCount = roadmap.filter((s) => s.isCompleted).length;

  const handleOpenUrl = () => {
    if (course.credentialUrl) {
      window.open(course.credentialUrl, "_blank", "noopener,noreferrer");
    } else {
      toast("No credential URL provided.", "error");
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/goals/${course.id}`, {
        method: "DELETE",
        headers: {
            "x-auth-token": token || ""
        }
      });

      if (response.ok) {
        toast("Goal Deleted!", "success");
        window.location.reload();
      } else {
        toast("Failed to delete goal.", "error");
      }
    } catch (error) {
      console.error(error);
      toast("Something went wrong.", "error");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300 h-full">
        <div className="flex items-center justify-between shrink-0">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-black uppercase text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} /> Back to Path
          </button>
          <button 
            onClick={() => setIsEditOpen(true)}
            className="text-xs font-black uppercase underline decoration-2 underline-offset-4 text-gray-500 hover:text-black decoration-gray-300 hover:decoration-brand-lime transition-all"
          >
            Edit Details
          </button>
        </div>

        <div className="border-2 border-black bg-white p-8 md:p-12 relative shadow-[8px_8px_0_0_#000] flex-1 flex flex-col overflow-hidden">
          <div className="flex flex-col gap-8 mb-8 border-b-2 border-black pb-8 shrink-0">
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 text-[10px] font-black uppercase border-2 border-black ${
                  status === 'Completed' ? 'bg-brand-lime' : 'bg-gray-200'
                }`}>
                  {status}
                </span>
                <span className="text-xs font-bold text-gray-500">{course.date}</span>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-header font-black uppercase tracking-tight leading-[0.9] line-clamp-2">
                  {course.title}
                </h1>
                <p className="text-lg font-bold text-gray-500 uppercase tracking-widest truncate">
                  {course.issuer}
                </p>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 flex-1 overflow-hidden">
            <div className="lg:col-span-2 flex flex-col gap-6 h-full overflow-hidden">
              <div className="flex items-center justify-between border-b-2 border-black pb-2 shrink-0">
                <span className="font-black text-xs uppercase">Roadmap & Milestones</span>
                <span className="font-black text-xs uppercase">{completedCount}/{roadmap.length} Done</span>
              </div>

              <div className="flex flex-col gap-4 flex-1 overflow-y-auto p-2 no-scrollbar">
                {roadmap.map((step, index) => (
                  <div
                    key={index}
                    onClick={() => toggleStep(index)}
                    className={`group flex items-center justify-between gap-4 p-4 border-2 border-black cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] shrink-0 ${
                      step.isCompleted ? "bg-brand-lime" : "bg-brand-bg"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                        {step.isCompleted ? (
                        <CheckSquare size={24} className="stroke-2" />
                        ) : (
                        <Square size={24} className="stroke-2" />
                        )}
                        <span className={`font-bold text-sm uppercase ${step.isCompleted ? "line-through" : ""}`}>
                        {step.title}
                        </span>
                    </div>
                    <button 
                        onClick={(e) => handleDeleteStep(index, e)}
                        className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition-all p-1"
                    >
                        <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex border-2 border-black mt-2 bg-white shrink-0">
                  <input 
                    type="text" 
                    placeholder="DEFINE NEXT STEP..." 
                    value={newStep}
                    onChange={(e) => setNewStep(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddStep()}
                    className="flex-1 px-4 py-3 outline-none text-sm font-bold uppercase placeholder:text-gray-400 bg-transparent"
                  />
                  <button 
                    onClick={handleAddStep}
                    className="bg-black text-brand-lime px-6 font-black text-xs uppercase hover:bg-brand-lime hover:text-black transition-colors"
                  >
                    Add
                  </button>
                </div>
            </div>

            <div className="flex flex-col gap-8 shrink-0">
              <div className="border-2 border-black bg-brand-bg p-6 flex flex-col gap-4 max-h-[300px] overflow-y-auto no-scrollbar">
                <span className="font-black text-[10px] uppercase text-gray-500 shrink-0">Stack & Skills</span>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, i) => (
                    <span key={i} className="bg-black text-white border-2 border-black text-[10px] font-bold px-2 py-1 uppercase">
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
                  onClick={handleOpenUrl}
                >
                   Open Credential URL <ExternalLink size={14}/>
                </Button>
                <button 
                  onClick={() => setIsDeleteModalOpen(true)}
                  disabled={isDeleting}
                  className="w-full border-2 border-red-500 text-red-500 py-3 font-black text-[10px] uppercase hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete Log"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditCourseModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        course={course} 
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </>
  );
}