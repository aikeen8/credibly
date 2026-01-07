import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { type Course } from "./CourseDetailView";
import { useState, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
};

export function EditCourseModal({ isOpen, onClose, course }: Props) {
  const [formData, setFormData] = useState({
    title: course.title,
    issuer: course.issuer,
    date: course.date || "",
    status: course.status,
    skills: course.skills.join(", "),
    credentialUrl: course.credentialUrl || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({
        title: course.title,
        issuer: course.issuer,
        date: course.date || "",
        status: course.status,
        skills: course.skills.join(", "),
        credentialUrl: course.credentialUrl || "",
    });
  }, [course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const skillsArray = formData.skills.split(",").map((s) => s.trim());

      const response = await fetch(`/api/goals/${course.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          skills: skillsArray,
        }),
      });

      if (response.ok) {
        alert("Changes Saved!");
        onClose();
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Failed to update: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating goal:", error);
      alert("Something went wrong.");
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
                        type="text" 
                        value={formData.date} 
                        onChange={(e) => setFormData({...formData, date: e.target.value})} 
                        className="bg-white border-2 border-black px-3 py-2 text-sm outline-none focus:shadow-[3px_3px_0_#000] rounded-none" 
                    />
                </div>
                <div className="flex flex-col gap-1">
                     <label className="text-[10px] font-header uppercase">Status</label>
                     <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                        className="bg-white border-2 border-black px-3 py-2 text-sm outline-none focus:shadow-[3px_3px_0_#000] appearance-none rounded-none cursor-pointer"
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