import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // PANSAMANTALA: Diretso login o dashboard muna
    console.log("Signup clicked:", username, password);
    alert("Account created! (UI Demo)");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#bef264] p-4">
      <div className="w-full max-w-md bg-white border-2 border-black p-8 shadow-[8px_8px_0_0_#000]">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 leading-none">
            Join the<br/>Movement.
          </h1>
          <p className="text-gray-600 font-medium mt-4">Start tracking your goals today.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-black text-xs uppercase tracking-wider">Choose Username</label>
            <input 
              type="text" 
              className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:bg-[#fdfbf6] transition-colors"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-black text-xs uppercase tracking-wider">Set Password</label>
            <input 
              type="password" 
              className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:bg-[#fdfbf6] transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button className="w-full justify-center py-6 text-lg mt-2 shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:shadow-none transition-all">
            CREATE ACCOUNT
          </Button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm font-bold text-gray-500">
          Already have an account? <Link to="/" className="text-black underline hover:text-[#bef264] decoration-2">Log in</Link>
        </p>
      </div>
    </div>
  );
}