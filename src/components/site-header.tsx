import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ToggleThemeButton } from "./toggle-theme-button"
import { Bell, Check, X } from "lucide-react"
import { DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { DropdownMenu, DropdownMenuContent } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { acceptInvite, getWorkspaceInvites } from "@/api/inviteApi"
import { useState } from "react"
import { useEffect } from "react"
import { useUserStore } from "@/store/store"
import { createWorkspaceUser } from "@/api/workspaceUsers.api"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

export function SiteHeader() {
    const userId = useUserStore((state) => state.userId || "")
    const navigate = useNavigate()

    const [invites, setInvites] = useState<any[]>([]);

    useEffect(() => {
        getWorkspaceInvites(userId).then((data) => {
            setInvites(data);
        });
    }, []);

    const handleAcceptInvite = (invite_id: string, workspace_id: string, receiver_id: string) => {
        acceptInvite(invite_id).then(() => {
            createWorkspaceUser(workspace_id, receiver_id, "User")
            toast.success("Invite accepted")
            navigate({ to: "/workspaces/$id", params: { id: workspace_id } })

        });
    }
    return (
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-base font-medium">Dashboard</h1>
                    <div className="flex items-center gap-5">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className="relative">
                                    <Bell className="size-4 cursor-pointer" />
                                    <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                                        {invites.length}
                                    </span>
                                </div>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="flex flex-col gap-2">
                                    {
                                        invites.map((invite) => (
                                            <div className="w-full border rounded-md p-2 flex flex-row justify-between items-center gap-2">
                                                <p className="text-xs"><span className="font-bold">{invite.name || invite.fullname}</span> invite you to join the workspace <span className="font-bold">{invite.workspace_name}</span></p>
                                                <div className="flex flex-row gap-1">
                                                    <Button variant="ghost" size="icon" className=" w-6! h-6! text-green-500 bg-green-50!" onClick={() => handleAcceptInvite(invite.id, invite.workspace_id, userId)}>
                                                        <Check className="size-3" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className=" w-6! h-6! text-red-500 bg-red-50!">
                                                        <X className="size-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>

                            </DropdownMenuContent>
                        </DropdownMenu>
                        <ToggleThemeButton />
                    </div>
                </div>

            </div>
        </header>
    )
}
