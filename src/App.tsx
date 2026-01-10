import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// Import other pages if you have them (e.g. Pathways, Rewards)

function AppContent() {
  const location = useLocation();
  
  // Listahan ng mga pages na WALANG Sidebar
  const hideSidebarRoutes = ["/", "/signup"];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-[#fdfbf6] font-sans text-black">
      {/* Conditionally render Sidebar */}
      {showSidebar && <Sidebar />}
      
      {/* Adjust margin if Sidebar is present */}
      <main className={`flex-1 ${showSidebar ? "p-8 ml-64" : ""}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes here */}
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;