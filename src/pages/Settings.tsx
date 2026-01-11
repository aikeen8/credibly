import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Upload, Save, Download, UploadCloud, Trash2, Bell, Shield, User, Database } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "../context/ToastContext";
import { useUser } from "../context/UserContext"; 
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const { toast } = useToast();
  const { refreshUser } = useUser();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    username: "",
    role: "",
    avatar: "",
    notifications: {
        expiringCertificates: true,
        goalDeadlines: true,
        weeklyInsights: false
    }
  });

  const [passwords, setPasswords] = useState({
      current: "",
      new: "",
      confirm: ""
  });

  const [isLoading, setIsLoading] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
        const token = localStorage.getItem("token");
        
        // FIX: Redirect if no token instead of hanging
        if (!token) {
            setIsLoading(false);
            navigate("/"); 
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/auth/profile`, {
                headers: { "x-auth-token": token }
            });
            if (res.ok) {
                const data = await res.json();
                setUserData({
                    username: data.username,
                    role: data.role || "Achiever", // Default fallback just in case
                    avatar: data.avatar || "",
                    notifications: data.notifications || {
                        expiringCertificates: true,
                        goalDeadlines: true,
                        weeklyInsights: false
                    }
                });
            } else {
                // If token invalid, logout
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/");
                }
            }
        } catch (err) {
            console.error(err);
            toast("Failed to load profile", "error");
        } finally {
            // FIX: Always turn off loading
            setIsLoading(false);
        }
    };
    fetchProfile();
  }, [navigate, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setUserData(prev => ({ ...prev, avatar: reader.result as string }));
          };
          reader.readAsDataURL(file);
      }
  };

  const handleToggle = (key: keyof typeof userData.notifications) => {
      setUserData(prev => ({
          ...prev,
          notifications: {
              ...prev.notifications,
              [key]: !prev.notifications[key]
          }
      }));
  };

  const handleSave = async () => {
      const token = localStorage.getItem("token");
      try {
          const res = await fetch(`${API_URL}/api/auth/profile`, {
              method: "PUT",
              headers: { 
                  "Content-Type": "application/json",
                  "x-auth-token": token || ""
              },
              body: JSON.stringify({
                  avatar: userData.avatar,
                  role: userData.role,
                  notifications: userData.notifications
              })
          });
          
          if (res.ok) {
              toast("Profile Settings Saved!", "success");
              refreshUser(); 
          }
      } catch (err) {
          console.error(err);
          toast("Failed to save settings.", "error");
      }
  };

  const handleUpdatePassword = async () => {
      if (!passwords.current || !passwords.new || !passwords.confirm) {
          toast("Please fill in all password fields.", "error");
          return;
      }

      if (passwords.new !== passwords.confirm) {
          toast("New passwords do not match.", "error");
          return;
      }

      const token = localStorage.getItem("token");
      try {
          const res = await fetch(`${API_URL}/api/auth/update-password`, {
              method: "PUT",
              headers: { 
                  "Content-Type": "application/json",
                  "x-auth-token": token || ""
              },
              body: JSON.stringify({
                  currentPassword: passwords.current,
                  newPassword: passwords.new
              })
          });

          const data = await res.json();

          if (res.ok) {
              toast("Password updated successfully!", "success");
              setPasswords({ current: "", new: "", confirm: "" });
          } else {
              toast(data.message || "Failed to update password", "error");
          }
      } catch (error) {
          toast("Server error", "error");
      }
  };

  const handleExport = async () => {
      const token = localStorage.getItem("token");
      try {
          const res = await fetch(`${API_URL}/api/data/export`, {
              headers: { "x-auth-token": token || "" }
          });
          
          if (res.ok) {
              const blob = await res.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `credibly_backup_${new Date().toISOString().split('T')[0]}.json`;
              document.body.appendChild(a);
              a.click();
              a.remove();
              toast("Data Exported Successfully!", "success");
          } else {
              toast("Export failed.", "error");
          }
      } catch (error) {
          console.error(error);
          toast("Network error.", "error");
      }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
          try {
              const json = JSON.parse(event.target?.result as string);
              const token = localStorage.getItem("token");

              if (!json.data || !Array.isArray(json.data)) {
                  toast("Invalid backup file format.", "error");
                  return;
              }

              const res = await fetch(`${API_URL}/api/data/import`, {
                  method: "POST",
                  headers: { 
                      "Content-Type": "application/json",
                      "x-auth-token": token || "" 
                  },
                  body: JSON.stringify({ data: json.data })
              });

              const msg = await res.json();
              if (res.ok) {
                  toast("Data Imported Successfully!", "success");
                  setTimeout(() => window.location.reload(), 1500);
              } else {
                  toast("Import failed: " + msg.message, "error");
              }

          } catch (err) {
              toast("Error parsing file.", "error");
          }
      };
      reader.readAsText(file);
  };

  return (
    <div className="flex flex-col gap-10 pb-10">
      
      <div className="flex flex-col gap-2 border-b-2 border-black pb-6">
        <h2 className="font-header text-3xl uppercase tracking-tight font-black">
          Settings
        </h2>
        <p className="text-sm text-gray-600 max-w-md">
          Configure your Credibly experience and manage your personal data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        <div className="lg:col-span-2 flex flex-col gap-8">
            
            <Card className="shadow-[8px_8px_0_0_#000]">
                <CardHeader className="bg-brand-lime border-b-2 border-black flex items-center gap-2">
                    <User size={18} /> Profile Information
                </CardHeader>
                <CardContent className="flex flex-col gap-6 p-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 border-2 border-black bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                            {userData.avatar ? (
                                <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <User size={40} className="text-gray-400" />
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <Button 
                                variant="secondary" 
                                className="flex items-center gap-2 text-xs"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload size={14} /> Upload Photo
                            </Button>
                            <span className="text-[10px] font-bold text-gray-500 uppercase">
                                Max size 2MB. JPG or PNG.
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1">
                        <Input 
                            label="Username" 
                            placeholder="username" 
                            // FIX: Check isLoading properly
                            value={isLoading ? "Loading..." : userData.username}
                            readOnly 
                        />
                    </div>

                    <Input 
                        label="Role / Title" 
                        placeholder="e.g. Achiever" 
                        value={userData.role}
                        onChange={(e) => setUserData({...userData, role: e.target.value})}
                    />

                    <div className="pt-2">
                        <Button 
                            className="w-full md:w-auto flex items-center justify-center gap-2"
                            onClick={handleSave}
                        >
                            <Save size={16} /> Save Profile
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex items-center gap-2 bg-black text-white">
                    <Shield size={18} /> Security & Auth
                </CardHeader>
                <CardContent className="flex flex-col gap-6 p-6">
                    <div className="space-y-4">
                        <Input 
                            label="Current Password" 
                            type="password" 
                            placeholder="••••••••" 
                            value={passwords.current}
                            onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input 
                                label="New Password" 
                                type="password" 
                                value={passwords.new}
                                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                            />
                            <Input 
                                label="Confirm New Password" 
                                type="password" 
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                            />
                        </div>
                    </div>
                    
                    <div className="pt-2">
                        <Button 
                            variant="secondary" 
                            className="w-full md:w-auto flex items-center justify-center gap-2"
                            onClick={handleUpdatePassword}
                        >
                            Update Password
                        </Button>
                    </div>
                </CardContent>
            </Card>

        </div>

        <div className="flex flex-col gap-8">

            <Card>
                <CardHeader className="flex items-center gap-2">
                    <Bell size={18} /> Notifications
                </CardHeader>
                <CardContent className="p-6 flex flex-col gap-4">
                    <ToggleItem 
                        label="Expiring Certificates" 
                        desc="Get notified 30 days before expiration." 
                        checked={userData.notifications.expiringCertificates}
                        onChange={() => handleToggle("expiringCertificates")}
                    />
                    <ToggleItem 
                        label="Goal Deadlines" 
                        desc="Receive alerts for upcoming deadlines." 
                        checked={userData.notifications.goalDeadlines}
                        onChange={() => handleToggle("goalDeadlines")}
                    />
                    <ToggleItem 
                        label="Weekly AI Insights" 
                        desc="Receive career path suggestions." 
                        checked={userData.notifications.weeklyInsights}
                        onChange={() => handleToggle("weeklyInsights")}
                    />
                </CardContent>
            </Card>

            <Card className="border-red-500">
                <CardHeader className="flex items-center gap-2 text-red-500 border-red-500">
                    <Database size={18} /> Data Management
                </CardHeader>
                <CardContent className="p-6 flex flex-col gap-3">
                    <Button 
                        variant="secondary" 
                        className="w-full flex items-center justify-between group"
                        onClick={handleExport}
                    >
                        <span className="flex items-center gap-2"><Download size={16}/> Export Data</span>
                    </Button>

                    <input 
                        type="file" 
                        ref={importInputRef} 
                        className="hidden" 
                        accept=".json"
                        onChange={handleImport}
                    />
                    <Button 
                        variant="secondary" 
                        className="w-full flex items-center justify-between group"
                        onClick={() => importInputRef.current?.click()}
                    >
                        <span className="flex items-center gap-2"><UploadCloud size={16}/> Import Data</span>
                    </Button>
                    
                    <div className="h-px bg-gray-200 my-2" />

                    <button className="flex items-center justify-center gap-2 w-full border-2 border-red-500 bg-red-500 text-white p-3 font-header text-xs uppercase hover:bg-white hover:text-red-500 transition-colors">
                        <Trash2 size={16} /> Delete Account
                    </button>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}

function ToggleItem({ label, desc, checked, onChange }: { label: string, desc: string, checked: boolean, onChange: () => void }) {
    return (
        <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative shrink-0">
                <input 
                    type="checkbox" 
                    className="peer sr-only" 
                    checked={checked} 
                    onChange={onChange}
                />
                <div className="w-6 h-6 border-2 border-black bg-white peer-checked:bg-brand-lime transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center text-black opacity-0 peer-checked:opacity-100 pointer-events-none">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
            </div>
            <div className="flex flex-col select-none">
                <span className="font-header font-bold text-sm uppercase group-hover:underline decoration-2 decoration-brand-lime underline-offset-4">{label}</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase">{desc}</span>
            </div>
        </label>
    )
}