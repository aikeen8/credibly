import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { API_URL } from "../config";
import { useToast } from "../context/ToastContext"; // <--- Import Toast

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast(); // <--- Enable Toast

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.username);
        
        toast("Login successful!", "success"); // <--- SUCCESS TOAST
        
        if (data.isOnboarded) {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
        
      } else {
        toast(data.message || "Login failed", "error"); // <--- ERROR TOAST
      }
    } catch (error) {
      toast("Cannot connect to server", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf6] p-4">
      <div className="w-full max-w-md bg-white border-2 border-black p-8 shadow-[8px_8px_0_0_#000]">
        
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">Credibly</h1>
          <p className="text-gray-600 font-medium">Welcome back, achiever.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-black text-xs uppercase tracking-wider">Username</label>
            <input 
              type="text" 
              className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:bg-[#bef264] transition-colors"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-black text-xs uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:bg-[#bef264] transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button className="w-full justify-center py-6 text-lg mt-2">
            LOG IN
          </Button>
        </form>

        <p className="mt-8 text-center text-sm font-bold text-gray-500">
          New here? <Link to="/signup" className="text-black underline hover:text-[#bef264] decoration-2">Create an account</Link>
        </p>
      </div>
    </div>
  );
}