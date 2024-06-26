import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CreateAndEditTaskSchema, Status, Priority, CreateAndEditTask } from "@/utils/type"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCreateTask } from "@/api/mutations"
import { Loader } from 'lucide-react';
import { SheetClose } from "./ui/sheet";
interface TaskFormProps {
    mode: 'create' | 'edit';
}

const CreateTaskForm = ({ mode }: TaskFormProps) => {
    const { mutate, isPending } = useCreateTask()
    const form = useForm<z.infer<typeof CreateAndEditTaskSchema>>({
        resolver: zodResolver(CreateAndEditTaskSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: Priority.Low,
            status: Status.Todo,
        }
    });
    const priorities = Object.values(Priority);
    const status = Object.values(Status);

    const onSubmit = (task: CreateAndEditTask) => {
        mutate(task)
    }
    return (
        <Form {...form}>
            <form
                className='flex flex-col justify-start gap-10 w-[50%] m-auto pt-10'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Summary
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task Priority</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {priorities.map((priority) => (
                                        <SelectItem key={priority} value={priority}>
                                            {priority}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task Stauts</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {status.map((item) => (
                                        <SelectItem key={item} value={item}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Description
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={10}
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {mode === "create" ? (
                    <Button type='submit' className="text-base">
                        {renderButtonContent(isPending, mode)}
                    </Button>
                ) : (
                    <SheetClose asChild>
                        <Button type='submit' className="text-base">
                            {renderButtonContent(isPending, mode)}
                        </Button>
                    </SheetClose>
                )}


            </form>
        </Form>)
}
export default CreateTaskForm


const renderButtonContent = (isPending: boolean, mode: 'create' | 'edit') => (
    isPending ? (
        <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Please wait
        </>
    ) : (
        mode === 'create' ? 'Create Task' : 'Edit Task'
    )
);