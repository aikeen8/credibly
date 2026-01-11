import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map, 
  Trophy, 
  Settings, 
  LogOut, 
  User as UserIcon,
  Users // <--- Added Icon
} from "lucide-react";
import { useUser } from "../context/UserContext";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;
  
  const { user } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload(); 
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r-2 border-black flex flex-col justify-between z-50">
      
      <div className="p-6 border-b-2 border-black flex justify-center bg-white">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-[#bef264] border-2 border-black flex items-center justify-center font-black text-black">
             C
           </div>
           <span className="font-header text-2xl font-black tracking-tighter">CREDIBLY</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col p-4 gap-2 overflow-y-auto bg-[#fdfbf6]">
        <SidebarLink 
          to="/dashboard" 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          active={isActive("/dashboard")} 
        />
        <SidebarLink 
          to="/pathways" 
          icon={<Map size={20} />} 
          label="Pathways" 
          active={isActive("/pathways")} 
        />
        <SidebarLink 
          to="/leaderboard" 
          icon={<Users size={20} />} 
          label="Community" 
          active={isActive("/leaderboard")} 
        />
        <SidebarLink 
          to="/rewards" 
          icon={<Trophy size={20} />} 
          label="Rewards" 
          active={isActive("/rewards")} 
        />
        <SidebarLink 
          to="/settings" 
          icon={<Settings size={20} />} 
          label="Settings" 
          active={isActive("/settings")} 
        />
      </nav>

      <div className="p-4 border-t-2 border-black bg-white">
        <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center shrink-0 overflow-hidden">
                {user.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <UserIcon size={24} className="text-black" />
                )}
            </div>
            
            <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-black uppercase truncate max-w-[120px]" title={user.username}>
                    {user.username}
                </span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">
                    {user.role}
                </span>
            </div>
        </div>

        <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border-2 border-black bg-white p-2 text-xs font-black uppercase hover:bg-red-100 hover:text-red-600 transition-all"
        >
            <LogOut size={16} /> Log Out
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ 
  to, 
  icon, 
  label, 
  active 
}: { 
  to: string; 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
}) {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 px-4 py-3 border-2 transition-all
        ${active 
          ? "bg-[#bef264] border-black shadow-[4px_4px_0_0_#000] -translate-y-1" 
          : "bg-white border-transparent hover:border-black hover:bg-gray-50"
        }
      `}
    >
      {icon}
      <span className="font-bold text-sm tracking-wide uppercase">{label}</span>
    </Link>
  );
}