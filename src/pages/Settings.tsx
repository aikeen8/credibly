import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Upload, Save, Download, UploadCloud, Trash2, Bell, Shield, User, Database } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-10 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col gap-2 border-b-2 border-black pb-6">
        <h2 className="font-header text-3xl uppercase tracking-tight font-black">
          Settings
        </h2>
        <p className="text-sm text-gray-600 max-w-md">
          Configure your Credibly experience and manage your personal data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN (Profile & Security) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* 1. PROFILE SECTION */}
            <Card className="shadow-[8px_8px_0_0_#000]">
                <CardHeader className="bg-brand-lime border-b-2 border-black flex items-center gap-2">
                    <User size={18} /> Profile Information
                </CardHeader>
                <CardContent className="flex flex-col gap-6 p-6">
                    {/* Avatar Row */}
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 border-2 border-black bg-gray-100 flex items-center justify-center shrink-0">
                            <User size={40} className="text-gray-400" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button variant="secondary" className="flex items-center gap-2 text-xs">
                                <Upload size={14} /> Upload Photo
                            </Button>
                            <span className="text-[10px] font-bold text-gray-500 uppercase">
                                Max size 2MB. JPG or PNG.
                            </span>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Full Name" placeholder="e.g. Jane Doe" />
                        <Input label="Email Address" placeholder="name@example.com" type="email" />
                    </div>

                    {/* Role Input - Changed from Select to Input */}
                    <Input label="Role / Title" placeholder="e.g. Product Designer" />

                    <div className="pt-2">
                        <Button className="w-full md:w-auto flex items-center justify-center gap-2">
                            <Save size={16} /> Save Profile
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* 2. SECURITY SECTION */}
            <Card>
                <CardHeader className="flex items-center gap-2 bg-black text-white">
                    <Shield size={18} /> Security & Auth
                </CardHeader>
                <CardContent className="flex flex-col gap-6 p-6">
                    <div className="space-y-4">
                        <Input label="Current Password" type="password" placeholder="••••••••" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="New Password" type="password" />
                            <Input label="Confirm New Password" type="password" />
                        </div>
                    </div>
                    
                    <div className="pt-2">
                        <Button variant="secondary" className="w-full md:w-auto flex items-center justify-center gap-2">
                            Update Password
                        </Button>
                    </div>
                </CardContent>
            </Card>

        </div>

        {/* RIGHT COLUMN (Notifications & Data) */}
        <div className="flex flex-col gap-8">

            {/* 3. NOTIFICATIONS SECTION */}
            <Card>
                <CardHeader className="flex items-center gap-2">
                    <Bell size={18} /> Notifications
                </CardHeader>
                <CardContent className="p-6 flex flex-col gap-4">
                    <ToggleItem 
                        label="Expiring Certificates" 
                        desc="Get notified 30 days before expiration." 
                        defaultChecked={true}
                    />
                    <ToggleItem 
                        label="Goal Deadlines" 
                        desc="Receive alerts for upcoming deadlines." 
                        defaultChecked={true}
                    />
                    <ToggleItem 
                        label="Weekly AI Insights" 
                        desc="Receive career path suggestions." 
                        defaultChecked={false}
                    />
                </CardContent>
            </Card>

            {/* 4. DATA ZONE */}
            <Card className="border-red-500">
                <CardHeader className="flex items-center gap-2 text-red-500 border-red-500">
                    <Database size={18} /> Data Management
                </CardHeader>
                <CardContent className="p-6 flex flex-col gap-3">
                    <Button variant="secondary" className="w-full flex items-center justify-between group">
                        <span className="flex items-center gap-2"><Download size={16}/> Export Data</span>
                    </Button>
                    <Button variant="secondary" className="w-full flex items-center justify-between group">
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

function ToggleItem({ label, desc, defaultChecked }: { label: string, desc: string, defaultChecked: boolean }) {
    return (
        <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative shrink-0">
                <input type="checkbox" className="peer sr-only" defaultChecked={defaultChecked} />
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