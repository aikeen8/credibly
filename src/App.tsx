import { BookOpen, LayoutDashboard, Medal, Trophy, Settings, User } from 'lucide-react';
import { Button } from "./components/ui/Button";
import { Card, CardHeader, CardContent } from "./components/ui/Card";
import { Input } from "./components/ui/Input";


function App() {
  const navLinks = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} strokeWidth={2}/> },
    { name: 'Credentials', icon: <Medal size={20} strokeWidth={2}/> },
    { name: 'Rewards', icon: <Trophy size={20} strokeWidth={2}/> },
    { name: 'Settings', icon: <Settings size={20} strokeWidth={2}/> },
  ];

  return (
    <div className="flex min-h-screen bg-brand-bg">
      {/* Sidebar */}
      <aside className="w-64 border-2 border-black flex flex-col bg-white">
        <div className="p-6 border-b-2 border-black flex items-center justify-center gap-3">
          <div className="w-7 h-7 bg-brand-lime border-2 border-black flex items-center justify-center">
            <BookOpen size={13} strokeWidth={2}/>
          </div>
            <h1 className="font-header text-xl tracking-tighter">Credibly</h1>
        </div>

        <nav className="flex-1 flex flex-col">
          {navLinks.map((link) => (
            <button
              key={link.name}
              className="flex items-center gap-3 p-5 border-b-2 border-black text-gray-400 text-xs font-bold uppercase hover:bg-brand-lime hover:text-black transition-colors text-left">
              {link.icon}
              {link.name}
            </button>
          ))}
        </nav>

        <div className="p-4 bg-black text-white flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-lime flex items-center justify-center">
            <User size={18} color="black"/>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-header font-bold uppercase">Kate Aikeen</span>
            <span className="text-[10px] text-gray-400 uppercase">Student</span>
          </div>
        </div>
      </aside>  

      <main className="flex-1 p-10 flex flex-col gap-10">
        {/* Dashboard Header */}
        <div className="flex items-start justify-between border-b-2 border-black pb-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-header text-3xl uppercase tracking-tight">Dashboard</h2>
            <p className="text-sm text-gray-600 max-w-md">Track your certifications and skill progress in one place.</p>
          </div>

          <Button>+ Log New Certificate</Button>
        </div>
      </main>
    </div>
  )
}

export default App