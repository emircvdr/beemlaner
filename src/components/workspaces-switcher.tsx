import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import * as LucideIcons from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { WorkspaceCreateDialog } from "./workspaceCreateDialog"
import { useNavigate, } from "@tanstack/react-router"
import { useUserStore } from "@/store/store"
import { Badge } from "./ui/badge"


export function WorkspacesSwitcher({
    workspaces,
    firstWorkspace,
    currentWorkspace
}: {
    workspaces: {
        workplace_uuid: string
        name: string
        color: string
        icon: string
        plan: string
        admin_id: string
    }[]
    firstWorkspace: string
    currentWorkspace: string
}) {
    const userId = useUserStore((state) => state.userId || "")
    const navigate = useNavigate()
    const { isMobile } = useSidebar()
    const [activeWorkspace, setActiveWorkspace] = React.useState(currentWorkspace ? currentWorkspace : firstWorkspace || "")

    const getIconComponent = (iconName: string) => {
        return LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.FileIcon
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="sm"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            {activeWorkspace ? (
                                <>
                                    <div
                                        className="flex aspect-square size-6.5 items-center justify-center rounded-md text-sidebar-primary-foreground"
                                        style={{ backgroundColor: workspaces.find((workspace) => workspace.workplace_uuid === activeWorkspace)?.color }}
                                    >
                                        {React.createElement(getIconComponent(workspaces.find((workspace) => workspace.workplace_uuid === activeWorkspace)?.icon as string) as React.ElementType, { className: 'size-3.5' })}
                                    </div>
                                    <div className="grid flex-1 text-left text-xs leading-tight">
                                        <span className="truncate font-semibold">
                                            {
                                                workspaces.find((workspace) => workspace.workplace_uuid === activeWorkspace)?.name
                                            }
                                        </span>
                                        <span className="truncate text-[10px] text-muted-foreground capitalize ">{workspaces.find((workspace) => workspace.workplace_uuid === activeWorkspace)?.plan}</span>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 text-left text-sm leading-tight">
                                    <span className="font-semibold">No workspaces</span>
                                    <span className="block text-xs text-muted-foreground">Create one to get started</span>
                                </div>
                            )}
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Workspace
                        </DropdownMenuLabel>
                        {workspaces.length > 0 || activeWorkspace.length > 0 || firstWorkspace.length > 0 || currentWorkspace.length > 0 ? (
                            workspaces.map((workspace, index) => (
                                <DropdownMenuItem
                                    key={workspace.name}
                                    onClick={() => {
                                        setActiveWorkspace(workspace.workplace_uuid)
                                        navigate({
                                            to: "/$id",
                                            params: {
                                                id: workspace.workplace_uuid
                                            }
                                        })
                                    }}
                                    className="gap-2 p-2"
                                >
                                    <div
                                        className="flex size-5.5 items-center justify-center rounded-sm border"
                                        style={{ backgroundColor: workspace.color }}
                                    >
                                        {React.createElement(getIconComponent(workspace.icon) as React.ElementType, { className: 'size-3 text-white' })}
                                    </div>
                                    {workspace.name} {userId === workspace.admin_id && <Badge variant="outline"><LucideIcons.Crown className="size-4 text-amber-500/80 dark:text-amber-500/80" /></Badge>}
                                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            ))
                        ) : (
                            <DropdownMenuItem disabled className="p-2 text-sm text-muted-foreground">
                                No workspaces available
                            </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2" onSelect={(e) => e.preventDefault()}>
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className="size-4" />
                            </div>
                            <WorkspaceCreateDialog trigger={
                                <div className="font-medium text-muted-foreground">Add workspace</div>
                            } />
                        </DropdownMenuItem>
                        {activeWorkspace && userId === workspaces.find((workspace) => workspace.workplace_uuid === activeWorkspace)?.admin_id && (
                            <DropdownMenuItem
                                className="gap-2 p-2"
                                onSelect={() =>
                                    navigate({
                                        to: "/workspaces/$id",
                                        params: {
                                            id: currentWorkspace
                                        }
                                    })
                                }
                            >
                                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <LucideIcons.Settings className="size-4" />
                                </div>
                                <div className="font-medium text-muted-foreground">Settings and Manage Members</div>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
