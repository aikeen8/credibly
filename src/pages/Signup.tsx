import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { API_URL } from "../config";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // <--- NEW: Loading State
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double clicks
    if (isLoading) return;

    setIsLoading(true); // <--- Start Loading

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
      } else {
        alert(data.message || "Failed to create account");
      }
    } catch (error) {
      alert("Something went wrong. Please check your connection.");
    } finally {
      setIsLoading(false); // <--- Stop Loading (tapos na)
    }
  };

  if (sent) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#bef264]">
            <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0_0_#000] text-center max-w-md">
                <h1 className="text-3xl font-black uppercase mb-4">Check Your Inbox</h1>
                <p className="mb-6 font-medium">We sent a verification link to <strong>{email}</strong>.</p>
                <Button onClick={() => navigate("/")} className="w-full justify-center">BACK TO LOGIN</Button>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#bef264] p-4">
      <div className="w-full max-w-md bg-white border-2 border-black p-8 shadow-[8px_8px_0_0_#000]">
        <h1 className="text-4xl font-black uppercase mb-6 leading-none">Join the<br/>Movement.</h1>
        
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div>
            <label className="font-black text-xs uppercase">Email</label>
            <input type="email" required className="w-full border-2 border-black p-3 font-bold focus:bg-[#fdfbf6]" 
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="font-black text-xs uppercase">Username</label>
            <input type="text" required className="w-full border-2 border-black p-3 font-bold focus:bg-[#fdfbf6]" 
              value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label className="font-black text-xs uppercase">Password</label>
            <input type="password" required className="w-full border-2 border-black p-3 font-bold focus:bg-[#fdfbf6]" 
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          
          {/* UPDATED BUTTON: May Loading Text at Disabled state */}
          <Button 
            className="w-full justify-center py-6 mt-2" 
            disabled={isLoading}
          >
            {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </Button>

        </form>

        <p className="mt-6 text-center text-sm font-bold text-gray-500">
          Already have an account? <Link to="/" className="text-black underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}