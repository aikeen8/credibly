import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import { AddGoalModal } from "../components/AddGoalModal";
import { useState } from "react";
import {
  Trophy,
  Clock,
  CheckCircle,
  Loader,
  Calendar,
  Sparkles,
  Plus,
} from "lucide-react";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="flex items-start justify-between border-b-2 border-black pb-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-header text-3xl uppercase tracking-tight font-black">
            Dashboard
          </h2>
          <p className="text-sm text-gray-600 max-w-md">
            Track your certifications and skill progress in one place.
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
              <div className="h-full bg-brand-lime w-[60%] border-r-2 border-black" />
            </div>
            <span className="font-black text-lg">60%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <StatTile
              icon={<Trophy size={18} />}
              label="Total Achievements"
              value="12"
            />
            <StatTile
              icon={<Loader size={18} />}
              label="In Progress"
              value="4"
            />
            <StatTile
              icon={<Calendar size={18} />}
              label="This Month"
              value="2"
            />
            <StatTile
              icon={<CheckCircle size={18} />}
              label="Trophies"
              value="6"
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
                <button className="text-xs underline text-gray-600 hover:text-black">
                  View details
                </button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              <div className="flex flex-col gap-4">
                <ActivityItem
                  title="Google Data Analytics"
                  status="Completed"
                  date="Jan 2, 2026"
                />
                <ActivityItem
                  title="Scrum Fundamentals"
                  status="In Progress"
                />
                <ActivityItem
                  title="Python for Everybody"
                  status="Planned"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col">
          <Card className="h-full flex flex-col border-black overflow-hidden shadow-none p-0">
            <CardHeader className="border-b-2 border-black z-10 bg-white relative">
              AI Recommendations
            </CardHeader>
            
            <CardContent className="flex-1 bg-brand-lime p-6 flex flex-col justify-center">
              <div className="bg-white border-2 border-black p-5 flex flex-col gap-4">
                <Sparkles size={20} className="text-black" />
                <p className="text-sm font-medium leading-relaxed">
                  Let AI analyze your certifications and suggest what you should
                  pursue next to maximize your growth.
                </p>
                <Button>Analyze my profile</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddGoalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
      <span className="text-3xl font-black">{value}</span>
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
          <span className="font-black text-sm uppercase tracking-tight">{title}</span>
          {status === "Completed" && (
            <span className="text-[10px] font-bold text-gray-500">{date}</span>
          )}
        </div>
      </div>

      <span
        className={`text-[10px] font-black px-3 py-1 border-2 border-black uppercase ${statusStyles}`}
      >
        {status}
      </span>
    </div>
  );
}