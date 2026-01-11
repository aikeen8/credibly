import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Code, Shield, Palette, Database, Smartphone, Terminal } from "lucide-react";
import { API_URL } from "../config";

const INTERESTS = [
  { id: "web_dev", label: "Web Development", icon: <Code size={32} /> },
  { id: "cybersec", label: "Cybersecurity", icon: <Shield size={32} /> },
  { id: "design", label: "UI/UX Design", icon: <Palette size={32} /> },
  { id: "data", label: "Data Science", icon: <Database size={32} /> },
  { id: "mobile", label: "Mobile Apps", icon: <Smartphone size={32} /> },
  { id: "devops", label: "DevOps", icon: <Terminal size={32} /> },
];

export default function Onboarding() {
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async () => {
    if (!selected) return;
    setIsLoading(true);

    const interestLabel = INTERESTS.find(i => i.id === selected)?.label;
    const token = localStorage.getItem("token");

    try {
        if (token) {
            await fetch(`${API_URL}/api/goals`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "x-auth-token": token
                },
                body: JSON.stringify({
                    title: `Master ${interestLabel}`,
                    status: "Planned",
                    date: new Date().toISOString().split('T')[0],
                    skills: [interestLabel], 
                    roadmap: [
                        { title: "Research basics", isCompleted: false },
                        { title: "Build first project", isCompleted: false }
                    ]
                }),
            });
        }
        
        navigate("/dashboard");
    } catch (error) {
        console.error("Setup error", error);
        navigate("/dashboard");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf6] flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center mb-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">
          What's your focus?
        </h1>
        <p className="text-gray-600 text-lg">
          Select one path to personalize your AI recommendations immediately.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl w-full mb-10">
        {INTERESTS.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item.id)}
            className={`
              flex flex-col items-center justify-center gap-4 p-8 border-2 border-black transition-all
              ${selected === item.id 
                ? "bg-[#bef264] shadow-[4px_4px_0_0_#000] -translate-y-1" 
                : "bg-white hover:bg-gray-50 hover:border-gray-800"
              }
            `}
          >
            {item.icon}
            <span className="font-bold uppercase text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <Button 
        disabled={!selected || isLoading} 
        onClick={handleFinish}
        className="px-12 py-4 text-xl"
      >
        {isLoading ? "SETTING UP..." : "START JOURNEY"}
      </Button>
    </div>
  );
}