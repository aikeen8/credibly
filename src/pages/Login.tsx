import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.username);
      navigate("/dashboard");
    } else {
      alert(data.message);
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
            <label className="font-black text-xs uppercase tracking-wider">Username or Email</label>
            <input 
              type="text" 
              className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:bg-[#bef264] transition-colors"
              placeholder="Enter username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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