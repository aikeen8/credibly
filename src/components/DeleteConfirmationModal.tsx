import { AlertTriangle } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, isLoading }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-white border-2 border-black shadow-[8px_8px_0_0_#000] animate-in fade-in zoom-in duration-200">
        
        <div className="bg-red-500 p-4 border-b-2 border-black flex items-center gap-2">
           <AlertTriangle size={24} className="text-white" />
           <h3 className="font-header text-lg font-black uppercase text-white tracking-wide">
             Delete Goal?
           </h3>
        </div>

        <div className="p-6">
            <p className="font-bold text-sm uppercase text-gray-700 leading-relaxed">
                Are you sure you want to delete this goal? This action cannot be undone.
            </p>
        </div>

        <div className="flex border-t-2 border-black">
            <button 
                onClick={onClose}
                className="flex-1 p-4 font-header font-black uppercase hover:bg-gray-100 transition-colors border-r-2 border-black"
                disabled={isLoading}
            >
                Cancel
            </button>
            <button 
                onClick={onConfirm}
                className="flex-1 p-4 font-header font-black uppercase bg-red-500 text-white hover:bg-red-600 transition-colors"
                disabled={isLoading}
            >
                {isLoading ? "Deleting..." : "Yes, Delete"}
            </button>
        </div>
      </div>
    </div>
  );
}