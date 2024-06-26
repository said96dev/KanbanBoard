import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import TaskForm from "./TaskForm"
import { Task } from "@/utils/type"

const EditSheet = ({ task }: { task: Task }) => {
    return (
        <div>
            <SheetContent className="md:min-w-[1000px] sm:min-w-[560px]">
                <SheetHeader>
                    <SheetTitle>Edit Task</SheetTitle>
                    <SheetDescription>
                        Make changes to your Task here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <TaskForm mode="edit" initialValues={task} />
                </div>
            </SheetContent>
        </div>
    )
}
export default EditSheet