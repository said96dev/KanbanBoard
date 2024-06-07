import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFetchTasks } from "@/api/querys";
import { CircleCheckIcon, GripIcon, LoaderIcon, SquareCheckIcon, CodeReviewIcon, TestingIcon } from "@/constants/icons/KanbanBoardIcon";


function KanbanBoard() {
    const { data, isLoading, isError } = useFetchTasks();
    const statusCategories = ["Todo", "Doing", "Code Review", "Testing", "Done"];
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error loading tasks</div>;
    }
    if (!data) {
        return <div>No tasks</div>;
    }
    const { GroupByStatus } = data

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Todo':
                return <SquareCheckIcon className="h-5 w-5" />;
            case 'Doing':
                return <LoaderIcon className="h-5 w-5 animate-spin" />;
            case 'Code Review':
                return <CodeReviewIcon className="h-5 w-5" />;
            case 'Testing':
                return <TestingIcon className="h-5 w-5" />;
            case 'Done':
                return <CircleCheckIcon className="h-5 w-5" />;
            default:
                return null;
        }
    };

    const groupedTasks = statusCategories.map((status: string) => {
        const group = GroupByStatus.find(group => group._id === status);
        return {
            _id: status,
            tasks: group ? group.tasks : []
        };
    });
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 grid grid-cols-5 gap-10 p-6 min-h-[500px] w-full m-auto">
                {groupedTasks.map((statusGroup) => (
                    <div key={statusGroup._id} className="bg-gray-100 dark:bg-[#27272a] rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
                            <span>{statusGroup._id}</span>
                            {getStatusIcon(statusGroup._id)}
                        </h2>
                        <div className="space-y-4">
                            {statusGroup.tasks.map((task) => (
                                <div
                                    key={task._id}
                                    className="bg-white dark:bg-gray-950 rounded-lg p-4 shadow-sm flex items-center justify-between"
                                    draggable="true"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Checkbox id={`task-${task._id}`} />
                                        <span className="font-medium">{task.title}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Button variant="ghost" size="icon">
                                            <GripIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default KanbanBoard;