import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // PANSAMANTALA: Diretso dashboard muna habang wala pang backend
    console.log("Login clicked:", username, password);
    navigate("/dashboard"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf6] p-4">
      <div className="w-full max-w-md bg-white border-2 border-black p-8 shadow-[8px_8px_0_0_#000]">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">Credibly</h1>
          <p className="text-gray-600 font-medium">Welcome back, achiever.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-black text-xs uppercase tracking-wider">Username</label>
            <input 
              type="text" 
              className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:bg-[#bef264] transition-colors"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-black text-xs uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:bg-[#bef264] transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button className="w-full justify-center py-6 text-lg mt-2">
            LOG IN
          </Button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm font-bold text-gray-500">
          New here? <Link to="/signup" className="text-black underline hover:text-[#bef264] decoration-2">Create an account</Link>
        </p>
      </div>
    </div>
  );
}