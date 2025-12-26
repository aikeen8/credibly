import { BookOpen } from 'lucide-react';

function App() {
  return (
    <div className="flex min-h-screen bg-brand-bg">
      {/* Sidebar */}
      <aside className="w-64 border-2 border-black flex-col bg-white">
        <div className="p-6 border-b-2 border-black flex items-center justify-center gap-3">
          <div className="w-7 h-7 bg-brand-lime border-2 border-black flex items-center justify-center">
            <BookOpen size={13} strokeWidth={2}/>
          </div>
            <h1 className="font-header text-xl tracking-tighter">Credibly</h1>
        </div>
      </aside>  
    </div>
  )
}

export default App