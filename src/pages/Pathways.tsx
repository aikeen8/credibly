import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Plus, MoreVertical, Calendar, Award } from "lucide-react";
import { CourseDetailView, type Course } from "../components/CourseDetailView";
import { AddGoalModal } from "../components/AddGoalModal";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export default function Pathways() {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
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
      
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
            id: item._id,
            title: item.title,
            issuer: item.issuer || "Self-Paced",
            status: item.status,
            date: item.date ? `Target: ${item.date}` : "No Date", 
            skills: item.skills || [],
            credentialUrl: item.credentialUrl || "",
            roadmap: item.roadmap || [],
        }));
        setCourses(formattedData);
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const activeCourse = courses.find((c) => c.id === selectedCourseId);

  if (selectedCourseId && activeCourse) {
    return (
      <CourseDetailView 
        course={activeCourse} 
        onBack={() => {
            setSelectedCourseId(null);
            fetchGoals(); 
        }} 
      />
    );
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex items-start justify-between border-b-2 border-black pb-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-header text-3xl uppercase tracking-tight font-black">
              Learning Path
            </h2>
            <p className="text-sm text-gray-600 max-w-md">
              Manage your progress, goals and verify your growth. 
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
              <div className="flex items-center gap-2">
                  <Plus size={16} /> Log New Goal
              </div>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length === 0 ? (
            <div className="col-span-full py-10 text-center text-gray-500 font-bold uppercase">
                No active pathways found. Start by logging a goal!
            </div>
          ) : (
            courses.map((course) => (
                <CourseTile 
                key={course.id} 
                course={course} 
                onClick={() => setSelectedCourseId(course.id)} 
                />
            ))
          )}
        </div>
      </div>

      <AddGoalModal 
        isOpen={isModalOpen} 
        onClose={() => {
            setIsModalOpen(false);
            fetchGoals();
        }} 
      />
    </>
  );
}

function CourseTile({ course, onClick }: { course: Course; onClick: () => void }) {
  const statusColors = {
    "Completed": "bg-brand-lime text-black",
    "In Progress": "bg-white text-black border-black",
    "Planned": "bg-gray-100 text-gray-400 border-gray-300 dashed",
  };

  const statusClass = statusColors[course.status as keyof typeof statusColors] || statusColors["Planned"];

  return (
    <div 
        onClick={onClick}
        className="group relative flex flex-col justify-between border-2 border-black bg-white p-5 h-64 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] cursor-pointer"
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
            <div className={`text-[10px] font-black uppercase px-2 py-1 border-2 border-black ${statusClass}`}>
                {course.status}
            </div>
            <MoreVertical size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="space-y-1">
            <h3 className="font-header text-xl font-bold leading-tight uppercase line-clamp-2">
                {course.title}
            </h3>
            <p className="text-xs font-bold text-gray-500 uppercase">{course.issuer}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-1">
            {course.skills.slice(0, 3).map(skill => (
                <span key={skill} className="text-[9px] uppercase font-bold bg-gray-100 px-1 border border-black">
                    {skill}
                </span>
            ))}
            {course.skills.length > 3 && (
                <span className="text-[9px] uppercase font-bold text-gray-500 px-1">+ {course.skills.length - 3}</span>
            )}
        </div>

        <div className="pt-4 border-t-2 border-black flex items-center justify-between text-xs font-bold text-gray-500">
             <div className="flex items-center gap-2">
                <Calendar size={14} /> {course.date}
             </div>
             <Award size={14} />
        </div>
      </div>
    </div>
  );
}