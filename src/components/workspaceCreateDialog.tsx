import { createWorkspace } from "@/api/workspaceApi"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useUserStore } from "@/store/store"
import { AudioWaveform, Command, GalleryVerticalEnd, Network, Sparkles } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { createWorkspaceUser } from "@/api/workspaceUsers.api"
import { useNavigate } from "@tanstack/react-router"
import { UpgradeButton } from "./upgradeButton"

export function WorkspaceCreateDialog({ trigger }: { trigger?: React.ReactNode }) {
    const navigate = useNavigate()
    const [name, setName] = useState<string>("")
    const [color, setColor] = useState<string>("")
    const [icon, setIcon] = useState<string>("")
    const userId = useUserStore((state) => state.userId ?? "")

    const iconComponents = {
        GalleryVerticalEnd: <GalleryVerticalEnd className="h-8 w-8" />,
        AudioWaveform: <AudioWaveform className="h-8 w-8" />,
        Command: <Command className="h-8 w-8" />,
        Network: <Network className="h-8 w-8" />
    };

    const handleSubmit = async () => {
        await createWorkspace({ name, admin_id: userId, color, icon }).then((res) => {
            createWorkspaceUser(res[0].id, userId, "Admin")
            toast.success("Workspace created successfully")
            navigate({ to: '/workspaces/' + res[0].id })
        })

        setName("")
        setColor("")
        setIcon("")
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger || <div className="font-medium text-muted-foreground">Add workspace</div>}
            </DialogTrigger>
            <DialogContent className="max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Workspace</DialogTitle>
                    <DialogDescription>
                        Create a new workspace to get started. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col  gap-2 ">
                        <div className={`w-30 h-30 border rounded-lg  flex items-center justify-center`} style={{ backgroundColor: color }}>
                            {icon && iconComponents[icon as keyof typeof iconComponents]}
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <UpgradeButton />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>More workspaces, more projects, more users, more customizations.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Input type="text" placeholder="Workspace name" size={20} value={name} onChange={(e) => setName(e.target.value)} />
                        <div className="flex flex-col gap-2 items-start">
                            <p className="text-sm text-muted-foreground">Icon</p>
                            <div className="flex flex-row gap-1 items-center">
                                <Button variant="outline" size="icon" onClick={() => setIcon("GalleryVerticalEnd")}>
                                    <GalleryVerticalEnd className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => setIcon("AudioWaveform")}>
                                    <AudioWaveform className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => setIcon("Command")}>
                                    <Command className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => setIcon("GalleryVerticalEnd")}>
                                    <GalleryVerticalEnd className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => setIcon("Network")}>
                                    <Network className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <p className="text-sm text-muted-foreground">Color</p>
                            <div className="flex flex-row gap-1 items-center">
                                <Button variant="outline" size="sm" className="bg-[#8338ec]! h-6 w-6" onClick={() => setColor("#8338ec")} />
                                <Button variant="outline" size="sm" className="bg-[#3b82f6]! h-6 w-6" onClick={() => setColor("#3b82f6")} />
                                <Button variant="outline" size="sm" className="bg-[#10b981]! h-6 w-6" onClick={() => setColor("#10b981")} />
                                <Button variant="outline" size="sm" className="bg-[#f59e0b]! h-6 w-6" onClick={() => setColor("#f59e0b")} />
                                <Button variant="outline" size="sm" className="bg-[#f43f5e]! h-6 w-6" onClick={() => setColor("#f43f5e")} />
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
