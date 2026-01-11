import { Routes, Route, useLocation } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { UserProvider } from "./context/UserContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Pathways from "./pages/Pathways";
import Rewards from "./pages/Rewards";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard";


function App() {
  const location = useLocation();
  const hideSidebarRoutes = ["/", "/signup", "/onboarding"];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <ToastProvider>
      <UserProvider>
        <div className="flex min-h-screen bg-[#fdfbf6] font-sans text-black">
          {showSidebar && <Sidebar />}
          
          {/* UPDATED MARGIN LOGIC HERE: pt-20 added for mobile header spacing */}
          <main className={`flex-1 ${showSidebar ? "p-4 pt-24 md:p-8 md:pt-8 md:ml-64" : ""}`}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/onboarding" element={<Onboarding />} />
              
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pathways" element={<Pathways />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
        </div>
      </UserProvider>
    </ToastProvider>
  );
}

export default App;