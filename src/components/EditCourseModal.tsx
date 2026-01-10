import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { type Course } from "./CourseDetailView";
import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { API_URL } from "../config";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
};

export function EditCourseModal({ isOpen, onClose, course }: Props) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    status: "Planned",
    skills: "",
    credentialUrl: "", 
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cleanDate = (course.date || "").replace(/(Target:\s*)+/gi, "").trim();

    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(cleanDate);
    if (!isValidDate) {
        cleanDate = ""; 
    }

    setFormData({
        title: course.title,
        issuer: course.issuer,
        date: cleanDate, 
        status: course.status as string,
        skills: course.skills.join(", "),
        credentialUrl: course.credentialUrl || "",
    });
  }, [course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const skillsArray = formData.skills.split(",").map((s) => s.trim());
      const token = localStorage.getItem("token");

      if (!token) {
        toast("Session expired. Please log in again.", "error");
        return;
      }

      const response = await fetch(`${API_URL}/api/goals/${course.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token 
        },
        body: JSON.stringify({
          ...formData,
          date: formData.date, 
          skills: skillsArray,
        }),
      });

      if (response.ok) {
        toast("Changes Saved Successfully!", "success");
        onClose();
        setTimeout(() => window.location.reload(), 1000);
      } else if (response.status === 401) {
         toast("Session expired. Please log out and log in.", "error");
      } else {
        const errorData = await response.json();
        toast(`Failed to update: ${errorData.message}`, "error");
      }
    } catch (error) {
      console.error("Error updating goal:", error);
      toast("Something went wrong.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Record">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
            <Input 
                label="Course Title" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            <Input 
                label="Issuing Organization" 
                value={formData.issuer} 
                onChange={(e) => setFormData({...formData, issuer: e.target.value})}
            />
            
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-header uppercase">Target Date</label>
                    <input 
                        type="date" 
                        value={formData.date} 
                        onChange={(e) => setFormData({...formData, date: e.target.value})} 
                        className="bg-white border-2 border-black px-3 py-2 text-sm outline-none focus:shadow-[3px_3px_0_#000] rounded-none w-full" 
                    />
                </div>
                <div className="flex flex-col gap-1">
                     <label className="text-[10px] font-header uppercase">Status</label>
                     <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="bg-white border-2 border-black px-3 py-2 text-sm outline-none focus:shadow-[3px_3px_0_#000] appearance-none rounded-none cursor-pointer w-full"
                    >
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                     </select>
                </div>
            </div>

             <Input
                label="Credential / Course URL"
                placeholder="https://..."
                value={formData.credentialUrl}
                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
            />

            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-header uppercase">Skills (Comma Separated)</label>
                <textarea 
                    className="bg-white border-2 border-black p-3 text-sm outline-none focus:shadow-[3px_3px_0_#000] min-h-[80px] resize-none rounded-none"
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                />
            </div>
        </div>

        <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
            </Button>
        </div>
      </form>
    </Modal>
  );
}