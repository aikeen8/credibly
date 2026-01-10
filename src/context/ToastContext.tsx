import { createContext, useContext, useState, type ReactNode } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

type ToastType = "success" | "error";

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("success");

  const toast = (msg: string, t: ToastType = "success") => {
    setMessage(msg);
    setType(t);
    setShow(true);
    setTimeout(() => setShow(false), 3000); 
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div 
        className={`fixed bottom-5 right-5 z-[100] transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-32"}`}
      >
        <div className={`flex items-center gap-3 border-2 border-black p-4 shadow-[4px_4px_0_0_#000] min-w-[300px] ${type === "success" ? "bg-[#bef264]" : "bg-red-500 text-white"}`}>
            {type === "success" ? <CheckCircle size={20} className="text-black"/> : <AlertCircle size={20} className="text-white"/>}
            <div className="flex-1 font-bold text-sm uppercase tracking-wide text-black">
                {message}
            </div>
            <button onClick={() => setShow(false)}>
                <X size={16} className={`text-black hover:scale-110 transition-transform ${type === "error" ? "text-white" : ""}`} />
            </button>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}