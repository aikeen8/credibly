import { PieChart, Pie, Cell } from "recharts";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardContent } from "../components/ui/Card";

type CompletionStatus = "Completed" | "In Progress" | "Planned";

const completionData: { name: CompletionStatus; value: number }[] = [
  { name: "Completed", value: 4 },
  { name: "In Progress", value: 2 },
  { name: "Planned", value: 3 },
];

const COMPLETION_COLORS: Record<CompletionStatus, string> = {
  Completed: "#c5ff55",
  "In Progress": "#000000",
  Planned: "#9ca3af",
};

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex items-start justify-between border-b-2 border-black pb-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-header text-3xl uppercase tracking-tight">
            Dashboard
          </h2>
          <p className="text-sm text-gray-600 max-w-md">
            Track your certifications and skill progress in one place.
          </p>
        </div>
        <Button>+ Log New Certificate</Button>
      </div>

      {/* COMPLETION INDEX */}
      <div className="grid grid-cols-2 gap-8">
        <Card>
          <CardHeader>Completion Index</CardHeader>
          <CardContent>
            {/* Donut */}
            <div className="h-64 flex items-center justify-center">
              <PieChart width={220} height={220}>
                <Pie
                  data={completionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={100}
                  stroke="#000"
                  strokeWidth={2}
                >
                  {completionData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={COMPLETION_COLORS[entry.name]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {completionData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-black" style={{
                      backgroundColor: COMPLETION_COLORS[item.name],
                    }}/>
                  <span className="text-xs uppercase">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
