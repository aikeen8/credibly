import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { type Course } from "./CourseDetailView";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
};

export function EditCourseModal({ isOpen, onClose, course }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Record">
      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
            <Input label="Course Title" defaultValue={course.title} />
            <Input label="Issuing Organization" defaultValue={course.issuer} />
            
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-header uppercase">Target Date</label>
                    <input 
                        type="text" 
                        defaultValue={course.date} 
                        className="bg-white border-2 border-black px-3 py-2 text-sm outline-none focus:shadow-[3px_3px_0_#000] rounded-none" 
                    />
                </div>
                <div className="flex flex-col gap-1">
                     <label className="text-[10px] font-header uppercase">Status</label>
                     <select 
                        defaultValue={course.status}
                        className="bg-white border-2 border-black px-3 py-2 text-sm outline-none focus:shadow-[3px_3px_0_#000] appearance-none rounded-none cursor-pointer"
                    >
                        <option>Planned</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                     </select>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-header uppercase">Skills (Comma Separated)</label>
                <textarea 
                    className="bg-white border-2 border-black p-3 text-sm outline-none focus:shadow-[3px_3px_0_#000] min-h-[80px] resize-none rounded-none"
                    defaultValue={course.skills.join(", ")}
                />
            </div>
        </div>

        <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                Cancel
            </Button>
            <Button type="submit" className="flex-1">
                Save Changes
            </Button>
        </div>
      </form>
    </Modal>
  );
}