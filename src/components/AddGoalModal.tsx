import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddGoalModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log New Goal">
      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
            <Input label="Course / Certification Title" placeholder="e.g. AWS Solutions Architect" />
            <Input label="Issuing Organization" placeholder="e.g. Amazon Web Services" />
            
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-header uppercase">Target Date</label>
                    <input type="date" className="bg-white border-2 border-black px-3 py-2 text-sm outline-none focus:shadow-[3px_3px_0_#000]" />
                </div>
                <div className="flex flex-col gap-1">
                     <label className="text-[10px] font-header uppercase">Status</label>
                     <select className="bg-white border-2 border-black px-3 py-2 text-sm outline-none focus:shadow-[3px_3px_0_#000] appearance-none rounded-none">
                        <option>Planned</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                     </select>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-header uppercase">Skills (Comma Separated)</label>
                <textarea 
                    className="bg-white border-2 border-black p-3 text-sm outline-none focus:shadow-[3px_3px_0_#000] min-h-[80px] resize-none"
                    placeholder="e.g. React, TypeScript, Cloud Computing"
                />
            </div>
        </div>

        <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                Cancel
            </Button>
            <Button type="submit" className="flex-1">
                Save Goal
            </Button>
        </div>
      </form>
    </Modal>
  );
}