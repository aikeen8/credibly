import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddGoalModal({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    status: "Planned",
    skills: "",
    credentialUrl: "", 
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const skillsArray = formData.skills.split(",").map((s) => s.trim());

      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          skills: skillsArray,
        }),
      });

      if (response.ok) {
        alert("Goal Saved to Database!");
        setFormData({ title: "", issuer: "", date: "", status: "Planned", skills: "", credentialUrl: "" });
        onClose();
        window.location.reload(); 
      } else {
        const errorData = await response.json(); 
        console.error("Server Error Details:", errorData); 
        alert(`Failed to save: ${errorData.message || "Unknown Error"}`);
      }

    } catch (error) {
      console.error("Error saving goal:", error);
      alert("Something went wrong (Network Error). Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log New Goal">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="space-y-4">
          <Input
            label="Course / Goal Title"
            placeholder="e.g. AWS Solutions Architect"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Input
            label="Issuing Organization"
            placeholder="e.g. Amazon Web Services"
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-header uppercase">Target Date</label>
              <input
                type="text"
                placeholder="e.g. Dec 2026"
                className="bg-white border-2 border-black px-3 py-2 text-sm outline-none focus:shadow-[3px_3px_0_#000] rounded-none"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-header uppercase">Status</label>
              <select
                className="bg-white border-2 border-black px-3 py-2 text-sm outline-none focus:shadow-[3px_3px_0_#000] appearance-none rounded-none cursor-pointer"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <Input
            label="Credential / Course URL (Optional)"
            placeholder="e.g. https://coursera.org/verify/..."
            value={formData.credentialUrl}
            onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
          />

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-header uppercase">
              Skills (Comma Separated)
            </label>
            <textarea
              className="bg-white border-2 border-black p-3 text-sm outline-none focus:shadow-[3px_3px_0_#000] min-h-[80px] resize-none rounded-none"
              placeholder="e.g. Cloud Computing, Architecture, Security"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Goal"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}