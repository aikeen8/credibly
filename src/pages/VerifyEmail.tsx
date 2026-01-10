import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (token) verify();
  }, [token]);

  const verify = async () => {
    try {
        const res = await fetch("http://localhost:5000/api/auth/verify-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });
        
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.username);
            setStatus("success");
        } else {
            setStatus("error");
        }
    } catch {
        setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf6]">
      <div className="bg-white border-2 border-black p-8 text-center shadow-[8px_8px_0_0_#000]">
        {status === "loading" && <h2 className="text-2xl font-black">VERIFYING...</h2>}
        
        {status === "success" && (
            <>
                <h2 className="text-2xl font-black text-[#bef264] mb-4">VERIFIED!</h2>
                <Button onClick={() => navigate("/onboarding")}>CONTINUE</Button>
            </>
        )}

        {status === "error" && (
            <>
                <h2 className="text-2xl font-black text-red-500 mb-4">FAILED</h2>
                <Button onClick={() => navigate("/")}>BACK TO LOGIN</Button>
            </>
        )}
      </div>
    </div>
  );
}