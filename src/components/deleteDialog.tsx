import { deleteWorkspace } from "@/api/workspaceApi";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import { Trash, TriangleAlert, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteDialog({ workspaceName, workspaceId, count }: { workspaceName: string, workspaceId: string, count: number }) {
    const router = useNavigate()
    const [iwtdtw, setIwtdtw] = useState(true);
    const [cta, setCta] = useState(true)
    const [inputValue, setInputValue] = useState("");
    const confirmationText = workspaceName
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleDelete = async () => {
        deleteWorkspace({ id: workspaceId })
        toast.success("Workspace deleted successfully");
        router({ to: '/' })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete <Trash size={10} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete {workspaceName}</DialogTitle>
                </DialogHeader>
                <Separator orientation="horizontal" className="w-full" />
                {
                    cta ? (
                        (iwtdtw ? (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                                {workspaceName}
                                <div className="flex flex-row gap-2">
                                    <User /> <span>{count}</span>
                                </div>
                            </div>
                        ) : (<div className="w-full h-full flex flex-col">
                            <div className="p-2 w-full  border border-yellow-500 bg-yellow-500/55 rounded-md flex flex-row items-center gap-2">
                                <TriangleAlert className="text-yellow-500" size={15} />
                                <span className="text-[13px]  font-newCustom">
                                    Unexpected bad things will happen if you don’t read this!
                                </span>
                            </div>
                            <div className="p-2">
                                <span className="text-[13px]  font-newCustom text-muted-foreground">
                                    This will permanently delete the <span className="text-black dark:text-white font-bold">{workspaceName}</span> workplace, all workspaces, tasks, and members.
                                </span>
                            </div>

                        </div>))) : (<div className="w-full h-full flex flex-col">
                            <span className="font-newCustom text-[14px] mb-2">To confirm, type <strong>"{confirmationText}"</strong> in the bow below</span>
                            <Input
                                className="w-full border-red-500"
                                onChange={handleChange}
                                value={inputValue}
                            />
                        </div>)
                }
                <DialogFooter>
                    {
                        cta ? (
                            iwtdtw ? (
                                <Button onClick={() => { setIwtdtw(false) }} className="w-full mt-2" size="sm">I want to delete this workplace</Button>
                            ) : (
                                <Button onClick={() => { setCta(false) }} className="w-full" size="sm">I have read and understand these effects.</Button>
                            )
                        ) : (<Button onClick={handleDelete} className="w-full" size="sm" variant="destructive" disabled={
                            inputValue !== confirmationText
                        }>Delete this workspace</Button>)

                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}