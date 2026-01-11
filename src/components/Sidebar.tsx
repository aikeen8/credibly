import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map, 
  Trophy, 
  Settings, 
  LogOut, 
  User as UserIcon,
  Users,
  Menu, 
  X
} from "lucide-react";
import { useUser } from "../context/UserContext";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;
  const { user } = useUser();
  
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload(); 
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  // --- UPDATED LOGO COMPONENT ---
  const CrediblyLogo = () => (
    <div className="flex items-center select-none group cursor-default">
      {/* THE BOX "C" */}
      <div className="w-10 h-10 bg-[#bef264] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_0_#000] mr-1 group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
         {/* Added 'font-header' here to match the font style */}
         <span className="font-header font-black text-2xl text-black leading-none pt-1 pr-0.5">C</span>
      </div>
      
      {/* THE REST "REDIBLY" */}
      <span className="font-header text-3xl font-black tracking-tighter text-black leading-none mt-1">
        REDIBLY
      </span>
    </div>
  );

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b-2 border-black flex items-center justify-between px-4 z-50">
        <CrediblyLogo />
        <button onClick={toggleMenu} className="p-2 border-2 border-transparent active:bg-gray-100">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed left-0 top-0 h-screen w-64 bg-white border-r-2 border-black flex flex-col justify-between z-50 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:top-0 
      `}>
        
        {/* LOGO AREA (Desktop) */}
        <div className="hidden md:flex p-6 border-b-2 border-black justify-center bg-white items-center h-24">
            <CrediblyLogo />
        </div>

        {/* Mobile Sidebar Label */}
        <div className="md:hidden h-16 border-b-2 border-black flex items-center px-6 bg-[#fdfbf6]">
            <span className="font-bold text-gray-500 uppercase text-xs">Menu</span>
        </div>

        <nav className="flex-1 flex flex-col p-4 gap-2 overflow-y-auto bg-[#fdfbf6]">
            <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active={isActive("/dashboard")} onClick={() => setIsOpen(false)} />
            <SidebarLink to="/pathways" icon={<Map size={20} />} label="Pathways" active={isActive("/pathways")} onClick={() => setIsOpen(false)} />
            <SidebarLink to="/leaderboard" icon={<Users size={20} />} label="Community" active={isActive("/leaderboard")} onClick={() => setIsOpen(false)} />
            <SidebarLink to="/rewards" icon={<Trophy size={20} />} label="Rewards" active={isActive("/rewards")} onClick={() => setIsOpen(false)} />
            <SidebarLink to="/settings" icon={<Settings size={20} />} label="Settings" active={isActive("/settings")} onClick={() => setIsOpen(false)} />
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
    </>
  );
}

function SidebarLink({ 
  to, 
  icon, 
  label, 
  active,
  onClick
}: { 
  to: string; 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
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