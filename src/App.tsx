import { BookOpen, LayoutDashboard, Map, Trophy, Settings, User } from "lucide-react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Pathways from "./pages/Pathways";
import Rewards from "./pages/Rewards";
import SettingsPage from "./pages/Settings";

function App() {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} strokeWidth={2} /> },
    { name: "Pathways", path: "/pathways", icon: <Map size={20} strokeWidth={2} /> },
    { name: "Rewards", path: "/rewards", icon: <Trophy size={20} strokeWidth={2} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} strokeWidth={2} /> },
  ];

  return (
    <div className="flex h-screen bg-brand-bg overflow-hidden">
      <aside className="w-64 border-r-2 border-black flex flex-col bg-white h-full shrink-0 overflow-y-auto">
        <div className="p-6 border-b-2 border-black flex items-center justify-center gap-3 sticky top-0 bg-white z-10">
          <div className="w-7 h-7 bg-brand-lime border-2 border-black flex items-center justify-center">
            <BookOpen size={13} strokeWidth={2} />
          </div>
          <h1 className="font-header text-xl tracking-tighter font-bold">Credibly</h1>
        </div>

        <nav className="flex-1 flex flex-col">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 p-5 border-b-2 border-black text-xs font-bold uppercase transition-colors text-left
                  ${
                    isActive 
                      ? "bg-brand-lime text-black" 
                      : "text-gray-500 hover:bg-brand-lime hover:text-black"
                  }
                `}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 bg-black text-white flex items-center gap-3 mt-auto sticky bottom-0 z-10">
          <div className="w-8 h-8 bg-brand-lime flex items-center justify-center border border-white">
            <User size={18} color="black" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-header font-bold uppercase text-brand-lime">
              Kate Aikeen
            </span>
            <span className="text-[10px] text-gray-400 uppercase">
              Student
            </span>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto h-full">
        <div className="max-w-7xl mx-auto h-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pathways" element={<Pathways />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;