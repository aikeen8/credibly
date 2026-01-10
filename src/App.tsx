import { Routes, Route, useLocation } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { UserProvider } from "./context/UserContext"; // <--- IMPORT THIS
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import VerifyEmail from "./pages/VerifyEmail";
import Pathways from "./pages/Pathways";
import Rewards from "./pages/Rewards";
import Settings from "./pages/Settings";

function App() {
  const location = useLocation();
  const hideSidebarRoutes = ["/", "/signup", "/onboarding", "/verify-email"];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <ToastProvider>
      <UserProvider> {/* <--- WRAP INSIDE TOASTPROVIDER */}
        <div className="flex min-h-screen bg-[#fdfbf6] font-sans text-black">
          {showSidebar && <Sidebar />}
          
          <main className={`flex-1 ${showSidebar ? "p-8 ml-64" : ""}`}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/onboarding" element={<Onboarding />} />
              
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pathways" element={<Pathways />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </UserProvider>
    </ToastProvider>
  );
}

export default App;